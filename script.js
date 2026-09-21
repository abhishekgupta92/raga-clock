(function () {
  const isAndroid = /Android/i.test(navigator.userAgent);

  const els = {
    praharLabel: document.getElementById("prahar-label"),
    timeRange: document.getElementById("time-range"),
    ragaName: document.getElementById("raga-name"),
    artist: document.getElementById("artist"),
    mood: document.getElementById("mood"),
    liveClock: document.getElementById("live-clock"),
    actions: document.getElementById("actions"),
    playerShell: document.getElementById("player-shell"),
    followNote: document.getElementById("follow-note"),
    nextPrahar: document.getElementById("next-prahar"),
    themeColorMeta: document.getElementById("theme-color-meta"),
    modeClassical: document.getElementById("mode-classical"),
    modeFilmy: document.getElementById("mode-filmy"),
    grid: document.getElementById("grid"),
    sectionNav: document.getElementById("section-nav"),
    modeToggle: document.getElementById("mode-toggle"),
    clockFoot: document.getElementById("clock-foot"),
    browseTitle: document.getElementById("browse-title"),
    search: document.getElementById("grid-search"),
    searchEmpty: document.getElementById("search-empty"),
    footerNote: document.getElementById("footer-note"),
    brand: document.getElementById("brand"),
    pageTitle: document.getElementById("page-title"),
    pageSub: document.getElementById("page-sub")
  };

  // Accent colours per prahar, mirrored from style.css so the browser theme
  // colour (address bar / task switcher) matches the on-screen palette.
  const PRAHAR_ACCENTS = [
    "#ff9a6b", "#ffc24b", "#57c7ff", "#4fd1c5",
    "#ff7241", "#b58cff", "#6f8cff", "#8a7dff"
  ];

  // Kabir is a separate data file; if it fails to load, that section is simply
  // not offered and everything else works as before.
  const KABIR =
    (typeof KABIR_STYLES !== "undefined" && KABIR_STYLES && KABIR_STYLES.length)
      ? KABIR_STYLES
      : null;

  const FOOTER_RAGA = els.footerNote ? els.footerNote.innerHTML : "";
  const FOOTER_BY = {
    raga:
      'Every raga in the catalogue with more than one recording gets a tile, ' +
      'ordered by how many there are. Picking one plays a random recording of ' +
      'that raga — classical or filmy — regardless of the hour.<br />' +
      'Press <kbd>S</kbd> to shuffle within the raga.',
    artist:
      'Every artist in the catalogue gets a tile, in a new random order each ' +
      'visit. Picking one plays a random recording by them, drawn from both the ' +
      'classical and filmy pools.<br />' +
      'Portraits are freely-licensed images from Wikimedia where one exists; ' +
      'everyone else gets an initials tile. Press <kbd>S</kbd> to shuffle.',
    kabir:
      'Kabir has no time of day — the poems were never tied to praharas, so ' +
      'these pools are styles instead: pick a register and it draws a random ' +
      'track from it (or press the <kbd>S</kbd> key to shuffle).<br />' +
      'Every recording is a real, named performance — Kumar Gandharva\'s ' +
      'nirguni bhajans, the Malwa and Rajasthan folk lineage, and the bands ' +
      'that put Kabir on a festival stage.<br />' +
      'On Android, tap "Open in NewPipe" (falls back to YouTube if NewPipe ' +
      'isn\'t installed) or share the pick on WhatsApp.'
  };

  // ---------------------------------------------------------------- state --
  let section = "prahar";
  try {
    // New key: the old one stored "raga" to mean the clock view, which now
    // means the by-raga view. Ignoring it avoids sending old visitors astray.
    const saved = localStorage.getItem("ragaClockSection2");
    if (saved === "prahar" || saved === "raga" || saved === "artist" ||
        (saved === "kabir" && KABIR)) section = saved;
  } catch (e) {}

  let following = true;      // prahar view: track the wall clock
  let filmy = true;          // prahar view: Classical vs Little Filmy
  try {
    const m = localStorage.getItem("ragaClockMode");
    if (m === "classical") filmy = false;
    else if (m === "filmy") filmy = true;
  } catch (e) {}

  let selected = getCurrentPrahar();              // prahar view
  let selectedRaga = CATALOG.ragas[0];            // raga view
  let selectedArtist = null;                      // artist view
  let kabirStyle = KABIR ? KABIR[0] : null;       // kabir view

  // Artist tiles appear in a fresh random order every visit.
  const artistOrder = CATALOG.artists.slice();
  for (let i = artistOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = artistOrder[i]; artistOrder[i] = artistOrder[j]; artistOrder[j] = tmp;
  }
  selectedArtist = artistOrder[0];

  function restore(key, list, matchOn) {
    try {
      const v = localStorage.getItem(key);
      if (!v) return null;
      return list.filter(function (x) { return x[matchOn] === v; })[0] || null;
    } catch (e) { return null; }
  }
  selectedRaga = restore("ragaClockRaga", CATALOG.ragas, "key") || selectedRaga;
  selectedArtist = restore("ragaClockArtist", CATALOG.artists, "key") || selectedArtist;
  if (KABIR) kabirStyle = restore("ragaClockKabirStyle", KABIR, "key") || kabirStyle;

  let searchQuery = "";
  const SEARCHABLE = { raga: "Search ragas", artist: "Search artists" };

  let currentPick = pickFrom();

  // --------------------------------------------------------------- player --
  let ytPlayer = null;
  let apiReady = false;
  let deferredInstallPrompt = null;

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    render();
  });
  window.addEventListener("appinstalled", function () {
    deferredInstallPrompt = null;
    render();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        // Non-fatal — the app works fully without it, it just won't be
        // installable on that browser.
      });
    });
  }

  if (!isAndroid) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(tag, first);
  }

  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
    syncPlayer(true);
  };

  let consecutiveErrors = 0;

  function onPlayerStateChange(event) {
    if (window.YT && event.data === YT.PlayerState.PLAYING) consecutiveErrors = 0;
    if (window.YT && event.data === YT.PlayerState.ENDED) {
      currentPick = newPick();
      render();
    }
  }

  // Some videos block embedding, or have been taken down since they were added.
  // YouTube reports these via onError rather than throwing, so we quietly swap
  // in another pick. Capped so a bad run doesn't loop forever — the
  // "Open on YouTube.com" link is always there as a manual fallback.
  function onPlayerError() {
    consecutiveErrors++;
    if (consecutiveErrors > 5) return;
    currentPick = newPick();
    render();
  }

  function syncPlayer(forceLoad) {
    if (isAndroid || !apiReady) return;
    const videoId = currentPick.videoId;
    if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      if (forceLoad || ytPlayer.__currentVideoId !== videoId) {
        ytPlayer.loadVideoById(videoId);
        ytPlayer.__currentVideoId = videoId;
      }
    } else {
      ytPlayer = new YT.Player("yt-player-frame", {
        videoId: videoId,
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          onReady: function () { ytPlayer.__currentVideoId = videoId; },
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    }
  }

  function youtubeWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  // Explicit Android intent targeting the NewPipe package. NewPipe's
  // intent-filter (RouterActivity) requires the BROWSABLE category to match,
  // and Chrome doesn't reliably add it on its own on every Android version —
  // without it Android can fail to resolve the intent to NewPipe at all.
  // If NewPipe isn't installed, the browser_fallback_url opens YouTube.
  function newPipeIntentUrl(videoId) {
    return (
      "intent://www.youtube.com/watch?v=" + videoId +
      "#Intent;scheme=https;action=android.intent.action.VIEW;" +
      "category=android.intent.category.BROWSABLE;package=org.schabi.newpipe;" +
      "S.browser_fallback_url=" + encodeURIComponent(youtubeWatchUrl(videoId)) + ";end"
    );
  }

  // ---------------------------------------------------------------- pools --
  // Every view answers the same question: which list are we drawing from?
  function poolFor() {
    if (section === "kabir") return kabirStyle.tracks;
    if (section === "raga") return selectedRaga.tracks;
    if (section === "artist") return selectedArtist.tracks;
    return (filmy && selected.filmy && selected.filmy.length)
      ? selected.filmy : selected.options;
  }

  function pickFrom() {
    const pool = poolFor();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function newPick() {
    const pool = poolFor();
    if (pool.length <= 1) return pool[0];
    let next = pickFrom();
    let guard = 0;
    while (currentPick && next && next.videoId === currentPick.videoId && guard < 8) {
      next = pickFrom(); guard++;
    }
    return next;
  }

  // --------------------------------------------------------------- themes --
  function applyPraharTheme(id) {
    document.body.removeAttribute("data-kabir");
    document.body.setAttribute("data-prahar", String(id));
    if (els.themeColorMeta && PRAHAR_ACCENTS[id]) {
      els.themeColorMeta.setAttribute("content", PRAHAR_ACCENTS[id]);
    }
  }

  function applyKabirTheme(style) {
    document.body.removeAttribute("data-prahar");
    document.body.setAttribute("data-kabir", String(style.id));
    if (els.themeColorMeta && style.accent) {
      els.themeColorMeta.setAttribute("content", style.accent);
    }
  }

  // ------------------------------------------------------------ selection --
  function setSection(next) {
    if (section === next) return;
    section = next;
    try { localStorage.setItem("ragaClockSection2", next); } catch (e) {}
    if (next === "prahar") {
      following = true;
      selected = getCurrentPrahar();
    }
    searchQuery = "";
    if (els.search) els.search.value = "";
    currentPick = pickFrom();
    render();
  }

  function setMode(toFilmy) {
    if (filmy === toFilmy) return;
    filmy = toFilmy;
    try { localStorage.setItem("ragaClockMode", toFilmy ? "filmy" : "classical"); } catch (e) {}
    currentPick = pickFrom();
    render();
  }

  function choose(kind, item) {
    if (kind === "prahar") { following = false; selected = item; }
    if (kind === "raga") {
      selectedRaga = item;
      try { localStorage.setItem("ragaClockRaga", item.key); } catch (e) {}
    }
    if (kind === "artist") {
      selectedArtist = item;
      try { localStorage.setItem("ragaClockArtist", item.key); } catch (e) {}
    }
    if (kind === "kabir") {
      kabirStyle = item;
      try { localStorage.setItem("ragaClockKabirStyle", item.key); } catch (e) {}
    }
    currentPick = pickFrom();
    render();
  }

  // ---------------------------------------------------------------- chrome --
  const SECTION_LABELS = {
    prahar: { brand: "Prahar", title: "The right raga, for right now",
              browse: "Browse all 8 praharas" },
    raga:   { brand: "Raga", title: "Every raga in the catalogue",
              browse: "Browse by raga" },
    artist: { brand: "Artists", title: "Every voice in the catalogue",
              browse: "Browse by artist" },
    kabir:  { brand: "Kabir", title: "Kabir, in every voice that sings him",
              browse: "Browse Kabir by style" }
  };
  const SECTION_SUBS = {
    prahar: 'Inspired by <a href="https://ragya.com" style="color:inherit">Ragya</a>\'s ' +
            'prahar system — 8 time-of-day segments, each paired with a raga.',
    raga: "The same recordings, grouped by raga instead of by the clock. " +
          CATALOG.ragas.length + " ragas across the catalogue.",
    artist: "The same recordings, grouped by who is performing them. " +
            CATALOG.artists.length + " artists, in a different order each visit.",
    kabir: "No clock here — Kabir's poems belong to no prahar. Pick the kind of " +
           "Kabir you want instead."
  };

  function updateSectionButtons() {
    if (!els.sectionNav) return;
    const btns = els.sectionNav.querySelectorAll(".section-btn");
    for (let i = 0; i < btns.length; i++) {
      const on = btns[i].getAttribute("data-section") === section;
      btns[i].classList.toggle("active", on);
      btns[i].setAttribute("aria-pressed", String(on));
    }
  }

  function renderChrome() {
    const L = SECTION_LABELS[section];
    const isPrahar = section === "prahar";
    if (els.modeToggle) els.modeToggle.style.display = isPrahar ? "" : "none";
    if (els.clockFoot) els.clockFoot.style.display = isPrahar ? "" : "none";
    if (els.brand) els.brand.textContent = L.brand;
    if (els.pageTitle) els.pageTitle.textContent = L.title;
    if (els.pageSub) els.pageSub.innerHTML = SECTION_SUBS[section];
    if (els.browseTitle) els.browseTitle.textContent = L.browse;
    if (els.search) {
      const placeholder = SEARCHABLE[section];
      els.search.style.display = placeholder ? "" : "none";
      if (placeholder) els.search.placeholder = placeholder;
    }
    if (els.footerNote) {
      els.footerNote.innerHTML = isPrahar ? FOOTER_RAGA : FOOTER_BY[section];
    }
    document.title = isPrahar
      ? "Raga Clock — the right raga for right now"
      : L.brand + " — Raga Clock";
    updateSectionButtons();
  }

  // ------------------------------------------------------------------ head --
  function renderHead() {
    const pick = currentPick;

    if (section === "kabir") {
      applyKabirTheme(kabirStyle);
      els.praharLabel.textContent = kabirStyle.label;
      els.timeRange.textContent = countLabel(kabirStyle.tracks.length, "recording");
      els.ragaName.textContent = pick.title;
      els.artist.textContent = pick.artist;
      els.mood.textContent = pick.note;
      return;
    }

    if (section === "raga") {
      applyPraharTheme(selectedRaga.prahar);
      els.praharLabel.textContent = "Raga " + selectedRaga.name;
      els.timeRange.textContent = countLabel(selectedRaga.tracks.length, "recording");
      els.ragaName.textContent = pick.title;
      els.artist.textContent = pick.credit;
      els.mood.textContent = pick.mood;
      return;
    }

    if (section === "artist") {
      applyPraharTheme(pick.prahar);
      els.praharLabel.textContent = selectedArtist.name;
      els.timeRange.textContent =
        (selectedArtist.discipline ? selectedArtist.discipline + " · " : "") +
        countLabel(selectedArtist.tracks.length, "recording");
      els.ragaName.textContent = pick.title;
      els.artist.textContent = pick.credit;
      els.mood.textContent = pick.mood;
      return;
    }

    // prahar
    applyPraharTheme(selected.id);
    els.praharLabel.textContent = selected.label;
    els.timeRange.textContent = selected.time;
    if (filmy && pick.song) {
      els.ragaName.textContent = pick.song;
      els.artist.textContent = pick.film
        ? pick.artist + " · " + pick.film + " (" + pick.year + ")"
        : pick.artist;
      els.mood.textContent = pick.raga
        ? "Inspired by Raga " + pick.raga + ". " + pick.mood
        : pick.mood;
    } else {
      els.ragaName.textContent = "Raga " + pick.raga;
      els.artist.textContent = pick.artist;
      els.mood.textContent = pick.mood;
    }
    if (els.modeClassical) {
      els.modeClassical.classList.toggle("active", !filmy);
      els.modeClassical.setAttribute("aria-pressed", String(!filmy));
    }
    if (els.modeFilmy) {
      els.modeFilmy.classList.toggle("active", filmy);
      els.modeFilmy.setAttribute("aria-pressed", String(filmy));
    }
  }

  function countLabel(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  function shareText(pick) {
    if (section === "kabir") {
      return "Kabir right now: " + pick.title + " — " + pick.artist +
        " (" + kabirStyle.label + ")";
    }
    if (section === "raga" || section === "artist") {
      return "Right now on Raga Clock: " + pick.title + " — " + pick.credit;
    }
    if (filmy && pick.song) {
      return "Right now on Raga Clock: " + pick.song +
        (pick.film ? " (" + pick.film + ")" : " — " + pick.artist) +
        (pick.raga ? " — inspired by Raga " + pick.raga : "");
    }
    return "Right now on Raga Clock: Raga " + pick.raga + " by " + pick.artist;
  }

  // ---------------------------------------------------------------- render --
  function render() {
    const pick = currentPick;
    renderHead();
    renderChrome();

    els.actions.innerHTML = "";

    if (isAndroid) {
      const newPipeBtn = document.createElement("a");
      newPipeBtn.className = "btn btn-primary";
      newPipeBtn.textContent = "Open in NewPipe";
      newPipeBtn.href = newPipeIntentUrl(pick.videoId);
      els.actions.appendChild(newPipeBtn);

      const ytBtn = document.createElement("a");
      ytBtn.className = "btn btn-secondary";
      ytBtn.textContent = "Open in YouTube";
      ytBtn.href = youtubeWatchUrl(pick.videoId);
      ytBtn.target = "_blank";
      ytBtn.rel = "noopener";
      els.actions.appendChild(ytBtn);

      const shareBtn = document.createElement("a");
      shareBtn.className = "btn btn-whatsapp";
      shareBtn.textContent = "WhatsApp";
      const msg = shareText(pick) + " — https://abhishekgupta92.github.io/raga-clock/";
      shareBtn.href = "https://wa.me/?text=" + encodeURIComponent(msg);
      shareBtn.target = "_blank";
      shareBtn.rel = "noopener";
      els.actions.appendChild(shareBtn);

      if (deferredInstallPrompt) {
        const installBtn = document.createElement("button");
        installBtn.className = "btn-install";
        installBtn.textContent = "Install Raga Clock";
        installBtn.onclick = function () {
          deferredInstallPrompt.prompt();
          deferredInstallPrompt.userChoice.finally(function () {
            deferredInstallPrompt = null;
            render();
          });
        };
        els.actions.appendChild(installBtn);
      }
    } else {
      const ytBtn = document.createElement("a");
      ytBtn.className = "btn btn-ghost";
      ytBtn.textContent = "Open on YouTube.com";
      ytBtn.href = youtubeWatchUrl(pick.videoId);
      ytBtn.target = "_blank";
      ytBtn.rel = "noopener";
      els.actions.appendChild(ytBtn);
    }

    const shuffleBtn = document.createElement("button");
    shuffleBtn.className = "btn-secondary";
    shuffleBtn.type = "button";
    shuffleBtn.setAttribute("aria-label", "Shuffle to another recording from this pool");
    shuffleBtn.textContent = "Shuffle (" + poolFor().length + " in pool)";
    shuffleBtn.onclick = function () {
      currentPick = newPick();
      render();
    };
    els.actions.appendChild(shuffleBtn);

    if (!isAndroid) {
      els.playerShell.style.display = "block";
      if (!document.getElementById("yt-player-frame")) {
        els.playerShell.innerHTML = '<div id="yt-player-frame"></div>';
      }
      syncPlayer();
    }

    renderGrid();
    renderFollowNote();
  }

  function renderFollowNote() {
    if (section === "kabir") {
      els.followNote.textContent = kabirStyle.blurb;
      return;
    }
    if (section === "raga") {
      els.followNote.textContent =
        "Showing Raga " + selectedRaga.name + " — every recording of it in the catalogue.";
      return;
    }
    if (section === "artist") {
      const bits = [];
      if (selectedArtist.discipline) bits.push(selectedArtist.discipline);
      if (selectedArtist.era) bits.push(selectedArtist.era);
      els.followNote.textContent = bits.length
        ? bits.join(" · ")
        : "Every recording by " + selectedArtist.name + " in the catalogue.";
      return;
    }
    const current = getCurrentPrahar();
    if (selected.id === current.id) {
      els.followNote.textContent = "Showing the raga for right now.";
      return;
    }
    els.followNote.innerHTML = "";
    els.followNote.appendChild(document.createTextNode("Browsing " + selected.label + ". "));
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.textContent = "Back to now";
    backBtn.onclick = function () {
      following = true;
      selected = getCurrentPrahar();
      currentPick = pickFrom();
      render();
    };
    els.followNote.appendChild(backBtn);
  }

  // ----------------------------------------------------------------- grids --
  function card(active, ariaLabel, onClick) {
    const c = document.createElement("button");
    c.className = "card" + (active ? " active" : "");
    c.type = "button";
    c.setAttribute("role", "listitem");
    c.setAttribute("aria-label", ariaLabel);
    if (active) c.setAttribute("aria-current", "true");
    c.onclick = onClick;
    return c;
  }

  function line(cls, text) {
    const d = document.createElement("div");
    d.className = cls;
    d.textContent = text;
    return d;
  }

  // Deterministic hue so an artist's initials tile is the same colour every
  // time, without needing to store one.
  function hueFor(key) {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 360;
    return h;
  }

  function initialsFor(name) {
    const words = name.replace(/[^\w\s&-]/g, "").split(/\s+/).filter(Boolean);
    if (!words.length) return "?";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  function avatarFor(artist) {
    const wrap = document.createElement("div");
    wrap.className = "avatar";
    const mono = document.createElement("span");
    mono.className = "avatar-mono";
    mono.textContent = initialsFor(artist.name);
    mono.style.background =
      "linear-gradient(140deg, hsl(" + hueFor(artist.key) + " 45% 32%), hsl(" +
      ((hueFor(artist.key) + 40) % 360) + " 40% 22%))";
    wrap.appendChild(mono);
    if (artist.img) {
      const img = document.createElement("img");
      img.className = "avatar-img";
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      img.src = artist.img;
      // If the remote image fails, the monogram underneath is already there.
      img.onerror = function () { img.remove(); };
      wrap.appendChild(img);
    }
    return wrap;
  }

  function setEmpty(shown) {
    if (els.searchEmpty) els.searchEmpty.hidden = !(searchQuery && shown === 0);
  }

  function matchesSearch(text) {
    if (!searchQuery) return true;
    return text.toLowerCase().indexOf(searchQuery) !== -1;
  }


  // ---- Raga artwork -------------------------------------------------------
  // Each raga gets its own abstract image, drawn rather than fetched: a sky in
  // the palette of the prahar it belongs to, a sun or moon at the height that
  // hour implies, and a horizon whose shape is seeded from the raga's name. The
  // same raga therefore always renders identically, and nothing is downloaded.
  const SKY = [
    ["#3b2a4d", "#ff9a6b", "#ffd9b8"],  // 0 Early Morning — indigo into peach
    ["#8a5a1a", "#ffc24b", "#ffe9a8"],  // 1 Morning — amber
    ["#14506e", "#57c7ff", "#cdeeff"],  // 2 Late Morning — clear blue
    ["#14453a", "#4fd1c5", "#d8f5ef"],  // 3 Afternoon — teal
    ["#7a2412", "#ff7241", "#ffc59e"],  // 4 Dusk — burnt orange
    ["#2b1b52", "#b58cff", "#e6d9ff"],  // 5 Evening — violet
    ["#111a3d", "#6f8cff", "#c3cdff"],  // 6 Night — deep blue
    ["#0b0a1c", "#8a7dff", "#b9b2ff"]   // 7 Late Night — near black
  ];
  // How high the sun/moon sits, 0 = horizon, 1 = top of the frame.
  const DISC_HEIGHT = [0.14, 0.42, 0.78, 0.66, 0.20, 0.46, 0.70, 0.30];

  function seedFrom(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // Small deterministic PRNG so one raga always draws the same picture.
  function rng(seed) {
    let a = seed || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function svgEl(name, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function ragaArt(g) {
    const pal = SKY[g.prahar] || SKY[5];
    const rand = rng(seedFrom(g.name));
    const W = 120, H = 64;
    const svg = svgEl("svg", {
      viewBox: "0 0 " + W + " " + H, class: "raga-art",
      preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true", focusable: "false"
    });
    const uid = "rg" + seedFrom(g.name).toString(36);

    const defs = svgEl("defs", {});
    const grad = svgEl("linearGradient", { id: uid, x1: "0", y1: "0", x2: "0", y2: "1" });
    grad.appendChild(svgEl("stop", { offset: "0", "stop-color": pal[0] }));
    grad.appendChild(svgEl("stop", { offset: "0.62", "stop-color": pal[1] }));
    grad.appendChild(svgEl("stop", { offset: "1", "stop-color": pal[2] }));
    defs.appendChild(grad);
    svg.appendChild(defs);
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#" + uid + ")" }));

    // Sun or moon. Night ragas get a crescent, bitten out with a second disc.
    const cy = H - DISC_HEIGHT[g.prahar] * H * 0.9;
    const cx = 22 + rand() * (W - 44);
    const r = 7 + rand() * 5;
    const night = g.prahar >= 5;
    if (night) {
      const cres = svgEl("g", { opacity: "0.92" });
      const m = svgEl("mask", { id: uid + "m" });
      m.appendChild(svgEl("rect", { x: 0, y: 0, width: W, height: H, fill: "#fff" }));
      m.appendChild(svgEl("circle", { cx: cx + r * 0.55, cy: cy - r * 0.3, r: r, fill: "#000" }));
      defs.appendChild(m);
      cres.appendChild(svgEl("circle", {
        cx: cx, cy: cy, r: r, fill: pal[2], mask: "url(#" + uid + "m)"
      }));
      svg.appendChild(cres);
    } else {
      svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: r, fill: pal[2], opacity: "0.9" }));
      svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: r * 1.9, fill: pal[2], opacity: "0.13" }));
    }

    // Two horizon bands. Their crest positions come from the seeded PRNG, so
    // the silhouette is different for every raga but stable for each one.
    for (let layer = 0; layer < 2; layer++) {
      const base = H * (0.68 + layer * 0.15);
      const amp = (5 + rand() * 9) * (1 - layer * 0.35);
      let dPath = "M0," + H + " L0," + base.toFixed(1);
      const steps = 4;
      for (let i = 1; i <= steps; i++) {
        const x = (W / steps) * i;
        const y = base - amp * Math.sin(rand() * Math.PI * 2 + i);
        const cxq = x - W / (steps * 2);
        dPath += " Q" + cxq.toFixed(1) + "," + (y - amp * 0.6).toFixed(1) +
                 " " + x.toFixed(1) + "," + y.toFixed(1);
      }
      dPath += " L" + W + "," + H + " Z";
      svg.appendChild(svgEl("path", {
        d: dPath, fill: layer === 0 ? pal[0] : "#0d0d10",
        opacity: layer === 0 ? "0.55" : "0.78"
      }));
    }

    // A scatter of notes, denser for ragas with more recordings.
    const dots = 3 + Math.min(6, Math.floor(g.tracks.length / 6));
    for (let i = 0; i < dots; i++) {
      svg.appendChild(svgEl("circle", {
        cx: (rand() * W).toFixed(1), cy: (rand() * H * 0.6).toFixed(1),
        r: (0.6 + rand() * 1.1).toFixed(2), fill: pal[2],
        opacity: (0.25 + rand() * 0.45).toFixed(2)
      }));
    }
    return svg;
  }

  function renderGrid() {
    els.grid.innerHTML = "";
    els.grid.classList.toggle("grid-artists", section === "artist");
    els.grid.classList.toggle("grid-ragas", section === "raga");
    let shown = 0;

    if (section === "kabir") {
      setEmpty(1);
      KABIR.forEach(function (st) {
        const c = card(st.id === kabirStyle.id,
          st.label + ", " + countLabel(st.tracks.length, "recording") + ". " + st.blurb,
          function () { choose("kabir", st); });
        c.appendChild(line("card-time", countLabel(st.tracks.length, "recording")));
        c.appendChild(line("card-raga", st.label));
        c.appendChild(line("card-blurb", st.blurb));
        els.grid.appendChild(c);
      });
      return;
    }

    if (section === "raga") {
      CATALOG.ragas.forEach(function (g) {
        if (!matchesSearch(g.name)) return;
        shown++;
        const c = card(g.key === selectedRaga.key,
          "Raga " + g.name + ", " + countLabel(g.tracks.length, "recording"),
          function () { choose("raga", g); });
        c.classList.add("card-raga-tile");
        c.appendChild(ragaArt(g));
        c.appendChild(line("card-raga", g.name));
        c.appendChild(line("card-time", countLabel(g.tracks.length, "recording")));
        els.grid.appendChild(c);
      });
      setEmpty(shown);
      return;
    }

    if (section === "artist") {
      artistOrder.forEach(function (a) {
        if (!matchesSearch(a.name + " " + (a.discipline || ""))) return;
        shown++;
        const c = card(a.key === selectedArtist.key,
          a.name + ", " + countLabel(a.tracks.length, "recording") +
            (a.discipline ? ", " + a.discipline : ""),
          function () { choose("artist", a); });
        c.classList.add("card-artist-tile");
        c.appendChild(avatarFor(a));
        const meta = document.createElement("div");
        meta.className = "artist-meta";
        meta.appendChild(line("card-raga", a.name));
        meta.appendChild(line("card-time", countLabel(a.tracks.length, "recording")));
        c.appendChild(meta);
        els.grid.appendChild(c);
      });
      setEmpty(shown);
      return;
    }

    setEmpty(1);
    PRAHARS.forEach(function (p) {
      const c = card(p.id === selected.id,
        p.label + ", " + p.time + ", raga " + p.familyRaga + ", " +
          p.options.length + " classical performances, " + p.filmy.length + " filmy songs",
        function () { choose("prahar", p); });
      c.appendChild(line("card-time", p.time));
      c.appendChild(line("card-raga", p.familyRaga));
      c.appendChild(line("card-artist",
        p.options.length + " classical · " + p.filmy.length + " filmy"));
      els.grid.appendChild(c);
    });
  }

  // ------------------------------------------------------------------ tick --
  function secondsToNextPrahar(now) {
    const cur = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let best = Infinity;
    PRAHARS.forEach(function (p) {
      let diff = p.start * 3600 - cur;
      if (diff <= 0) diff += 24 * 3600;
      if (diff < best) best = diff;
    });
    return best;
  }

  function formatCountdown(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) return h + "h " + m + "m";
    if (m > 0) return m + "m";
    return (secs % 60) + "s";
  }

  function tick() {
    const now = new Date();
    els.liveClock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });

    // Only the Prahar view follows the clock.
    if (section !== "prahar") return;

    if (els.nextPrahar) {
      if (following) {
        const current = getCurrentPrahar(now);
        const next = PRAHARS[(current.id + 1) % PRAHARS.length];
        els.nextPrahar.textContent =
          "Next: " + next.label + " in " + formatCountdown(secondsToNextPrahar(now));
      } else {
        els.nextPrahar.textContent = "";
      }
    }

    if (following) {
      const current = getCurrentPrahar(now);
      if (current.id !== selected.id) {
        selected = current;
        currentPick = pickFrom();
        render();
      }
    }
  }

  // Keyboard shortcut: "S" (outside any text field) shuffles.
  document.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "s" || e.key === "S") {
      currentPick = newPick();
      render();
    }
  });

  if (els.search) {
    els.search.addEventListener("input", function () {
      searchQuery = els.search.value.trim().toLowerCase();
      renderGrid();
    });
    // Escape clears the filter rather than leaving a stale one behind.
    els.search.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        els.search.value = ""; searchQuery = ""; renderGrid();
      }
    });
  }

  if (els.modeClassical) els.modeClassical.onclick = function () { setMode(false); };
  if (els.modeFilmy) els.modeFilmy.onclick = function () { setMode(true); };
  if (els.sectionNav) {
    const btns = els.sectionNav.querySelectorAll(".section-btn");
    for (let i = 0; i < btns.length; i++) {
      (function (b) {
        const target = b.getAttribute("data-section");
        if (target === "kabir" && !KABIR) { b.style.display = "none"; return; }
        b.onclick = function () { setSection(target); };
      })(btns[i]);
    }
  }

  render();

  // NOTE: we deliberately do NOT auto-redirect to NewPipe on load (even in the
  // installed app). Android only lets an app-intent launch happen from a real
  // user gesture; a programmatic navigation on page load is blocked and falls
  // back to the intent's browser_fallback_url — i.e. it opens YouTube in the
  // browser instead. So NewPipe is opened only by tapping the button.

  tick();
  setInterval(tick, 1000);
})();
