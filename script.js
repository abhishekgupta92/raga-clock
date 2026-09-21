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
    sectionRaga: document.getElementById("section-raga"),
    sectionKabir: document.getElementById("section-kabir"),
    modeToggle: document.getElementById("mode-toggle"),
    clockFoot: document.getElementById("clock-foot"),
    browseTitle: document.getElementById("browse-title"),
    footerNote: document.getElementById("footer-note"),
    brand: document.getElementById("brand"),
    pageTitle: document.getElementById("page-title"),
    pageSub: document.getElementById("page-sub")
  };

  // Footer copy differs per section: the raga notes talk about praharas and
  // the live clock, neither of which applies to Kabir.
  const FOOTER_RAGA = els.footerNote ? els.footerNote.innerHTML : "";
  const FOOTER_KABIR =
    'Kabir has no time of day — the poems were never tied to praharas, so these pools are ' +
    'styles instead: pick a register and it draws a random track from it (or press the ' +
    '<kbd>S</kbd> key to shuffle).<br />Every recording is a real, named performance — ' +
    'Kumar Gandharva\'s nirguni bhajans, the Malwa and Rajasthan folk lineage, and the ' +
    'bands that put Kabir on a festival stage.<br />' +
    'On Android, tap "Open in NewPipe" (falls back to YouTube if NewPipe isn\'t installed) ' +
    'or share the pick on WhatsApp.';

  // Accent colours per prahar, mirrored from style.css so the browser theme
  // colour (address bar / task switcher) matches the on-screen palette.
  const PRAHAR_ACCENTS = [
    "#ff9a6b", "#ffc24b", "#57c7ff", "#4fd1c5",
    "#ff7241", "#b58cff", "#6f8cff", "#8a7dff"
  ];

  // kabir.js is a separate file, so treat it as optional: if it fails to load
  // the Kabir section simply isn't offered and the raga clock works as before.
  const KABIR =
    (typeof KABIR_STYLES !== "undefined" && KABIR_STYLES && KABIR_STYLES.length)
      ? KABIR_STYLES
      : null;
  if (!KABIR && els.sectionKabir) els.sectionKabir.style.display = "none";

  let following = true; // true = always show whatever prahar matches the clock
  // Mode: Little Filmy is the default on a first visit; the choice is then
  // remembered across refreshes via localStorage.
  let filmy = true;
  try {
    var savedMode = localStorage.getItem("ragaClockMode");
    if (savedMode === "classical") filmy = false;
    else if (savedMode === "filmy") filmy = true;
  } catch (e) {}
  // Which top-level section is showing. Raga Clock follows the clock; Kabir
  // ignores it entirely and is browsed by style. Remembered across refreshes.
  let section = "raga";
  try {
    var savedSection = localStorage.getItem("ragaClockSection");
    if (savedSection === "kabir" || savedSection === "raga") section = savedSection;
    if (section === "kabir" && !KABIR) section = "raga";
  } catch (e) {}

  // The Kabir style currently being drawn from (the analogue of `selected`).
  let kabirStyle = KABIR ? KABIR[0] : null;
  try {
    var savedStyle = localStorage.getItem("ragaClockKabirStyle");
    var foundStyle = KABIR
      ? KABIR.filter(function (st) { return st.key === savedStyle; })[0]
      : null;
    if (foundStyle) kabirStyle = foundStyle;
  } catch (e) {}

  let selected = getCurrentPrahar();
  let currentPick = pickFrom(selected);

  // YouTube IFrame Player API state (desktop/web only — Android hands off to
  // NewPipe/YouTube instead of embedding a player).
  let ytPlayer = null;
  let apiReady = false;

  // "Add to Home screen" support (Android/Chrome). The browser fires this
  // event when the page meets install criteria (manifest + icons + a
  // registered service worker); we stash it and show an Install button
  // instead of the browser's own mini-infobar.
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
        // Non-fatal — the app still works fully without the service worker,
        // it just won't be installable on that browser.
      });
    });
  }

  if (!isAndroid) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Called automatically by the IFrame API once it has loaded.
  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
    syncPlayer(true);
  };

  function onPlayerStateChange(event) {
    if (window.YT && event.data === YT.PlayerState.PLAYING) {
      // A video is actually playing — reset the broken-video guard.
      consecutiveErrors = 0;
    }
    if (window.YT && event.data === YT.PlayerState.ENDED) {
      // Autoplay: once a track finishes, automatically switch to the next one.
      currentPick = newPick(selected);
      render();
    }
  }

  // Some videos block embedding on other websites ("Playback on other
  // websites has been disabled by the video owner") or have been taken
  // down/made private since they were added to the pool. YouTube reports
  // these as player errors (100/101/150 = not embeddable or unavailable,
  // 2 = bad video id, 5 = HTML5 player error) rather than throwing in JS,
  // so we listen for onError and quietly swap in another pick instead of
  // leaving the listener staring at a broken embed. Capped so a genuinely
  // bad run of luck doesn't loop forever — the "Open on YouTube.com" link
  // is always there as a manual fallback.
  let consecutiveErrors = 0;
  function onPlayerError() {
    consecutiveErrors++;
    if (consecutiveErrors > 5) return;
    currentPick = newPick(selected);
    render();
  }

  // Creates the player on first use, or reuses it for later renders — only
  // calling loadVideoById when the video actually needs to change. Always
  // unmuted: most browsers only allow unmuted autoplay once the visitor has
  // interacted with the site before, so on a cold first load some browsers
  // may still start it muted or paused until the listener clicks anywhere
  // on the page — there's no in-app mute toggle to work around that.
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
          onReady: function () {
            ytPlayer.__currentVideoId = videoId;
          },
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    }
  }

  function youtubeWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  // Explicit Android intent that targets the NewPipe package directly.
  // If NewPipe isn't installed, Chrome falls back to the plain YouTube URL.
  // NewPipe's own intent-filter (RouterActivity in its AndroidManifest.xml)
  // requires the android.intent.category.BROWSABLE category to match —
  // Chrome doesn't reliably add that category on its own on every
  // Android/Chrome version, so without it Android can fail to resolve the
  // intent to NewPipe at all (silently doing nothing, or dropping straight
  // to the browser fallback). Declaring it explicitly makes the hand-off
  // reliable.
  function newPipeIntentUrl(videoId) {
    const watchUrl = youtubeWatchUrl(videoId);
    return (
      "intent://www.youtube.com/watch?v=" +
      videoId +
      "#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=org.schabi.newpipe;S.browser_fallback_url=" +
      encodeURIComponent(watchUrl) +
      ";end"
    );
  }

  // The active pool depends on the mode: Filmy = Bollywood songs built on the
  // prahar's ragas; Classical = the Hindustani performances. Falls back to
  // classical if a prahar has no filmy songs yet.
  function activePool(prahar) {
    return (filmy && prahar.filmy && prahar.filmy.length) ? prahar.filmy : prahar.options;
  }

  // The pool the current section draws from. In Kabir mode the prahar argument
  // is irrelevant — the active style decides — so callers can keep passing one.
  function poolFor(prahar) {
    if (section === "kabir") return kabirStyle.tracks;
    return activePool(prahar || selected);
  }

  function pickFrom(prahar) {
    const pool = poolFor(prahar);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function newPick(prahar) {
    // Avoid repeating the same pick twice in a row when the pool has more than one.
    const pool = poolFor(prahar);
    if (pool.length <= 1) return pool[0];
    let next = pickFrom(prahar);
    let guard = 0;
    while (currentPick && next && next.videoId === currentPick.videoId && guard < 8) {
      next = pickFrom(prahar);
      guard++;
    }
    return next;
  }

  function updateModeButtons() {
    if (els.modeClassical) {
      els.modeClassical.classList.toggle("active", !filmy);
      els.modeClassical.setAttribute("aria-pressed", String(!filmy));
    }
    if (els.modeFilmy) {
      els.modeFilmy.classList.toggle("active", filmy);
      els.modeFilmy.setAttribute("aria-pressed", String(filmy));
    }
  }

  function setMode(toFilmy) {
    if (filmy === toFilmy) return;
    filmy = toFilmy;
    try { localStorage.setItem("ragaClockMode", toFilmy ? "filmy" : "classical"); } catch (e) {}
    currentPick = pickFrom(selected);
    render();
  }

  // Shift the whole page palette to match the prahar being shown, and keep the
  // browser theme colour in step with it.
  function applyTheme(prahar) {
    document.body.removeAttribute("data-kabir");
    document.body.setAttribute("data-prahar", String(prahar.id));
    if (els.themeColorMeta && PRAHAR_ACCENTS[prahar.id]) {
      els.themeColorMeta.setAttribute("content", PRAHAR_ACCENTS[prahar.id]);
    }
  }

  // Kabir has no hour to mirror, so the palette follows the chosen style
  // instead of the clock.
  function applyKabirTheme(style) {
    document.body.removeAttribute("data-prahar");
    document.body.setAttribute("data-kabir", String(style.id));
    if (els.themeColorMeta && style.accent) {
      els.themeColorMeta.setAttribute("content", style.accent);
    }
  }

  function setSection(next) {
    if (section === next) return;
    section = next;
    try { localStorage.setItem("ragaClockSection", next); } catch (e) {}
    if (next === "raga") {
      following = true;
      selected = getCurrentPrahar();
    }
    currentPick = pickFrom(selected);
    render();
  }

  function setKabirStyle(style) {
    kabirStyle = style;
    try { localStorage.setItem("ragaClockKabirStyle", style.key); } catch (e) {}
    currentPick = pickFrom();
    render();
  }

  function updateSectionButtons() {
    if (els.sectionRaga) {
      els.sectionRaga.classList.toggle("active", section === "raga");
      els.sectionRaga.setAttribute("aria-pressed", String(section === "raga"));
    }
    if (els.sectionKabir) {
      els.sectionKabir.classList.toggle("active", section === "kabir");
      els.sectionKabir.setAttribute("aria-pressed", String(section === "kabir"));
    }
  }

  // Show/hide the chrome that only makes sense for one section, and retitle
  // the page. Everything else (card, actions, player, grid) is shared.
  function renderChrome() {
    const isKabir = section === "kabir";
    if (els.modeToggle) els.modeToggle.style.display = isKabir ? "none" : "";
    if (els.clockFoot) els.clockFoot.style.display = isKabir ? "none" : "";
    if (els.brand) els.brand.textContent = isKabir ? "Kabir" : "Raga Clock";
    if (els.pageTitle) {
      els.pageTitle.textContent = isKabir
        ? "Kabir, in every voice that sings him"
        : "The right raga, for right now";
    }
    if (els.pageSub) {
      els.pageSub.innerHTML = isKabir
        ? "No clock here — Kabir's poems belong to no prahar. Pick the kind of Kabir you want instead."
        : 'Inspired by <a href="https://ragya.com" style="color:inherit">Ragya</a>\'s prahar system — 8 time-of-day segments, each paired with a raga.';
    }
    if (els.browseTitle) {
      els.browseTitle.textContent = isKabir
        ? "Browse Kabir by style"
        : "Browse all 8 praharas";
    }
    if (els.footerNote) els.footerNote.innerHTML = isKabir ? FOOTER_KABIR : FOOTER_RAGA;
    document.title = isKabir
      ? "Kabir — every voice that sings him"
      : "Raga Clock — the right raga for right now";
    updateSectionButtons();
  }

  function renderRagaHead() {
    const p = selected;
    const pick = currentPick;
    applyTheme(p);
    els.praharLabel.textContent = p.label;
    els.timeRange.textContent = p.time;
    if (filmy && pick.song) {
      els.ragaName.textContent = pick.song;
      els.artist.textContent = pick.artist + " · " + pick.film + " (" + pick.year + ")";
      els.mood.textContent = "Inspired by Raga " + pick.raga + ". " + pick.mood;
    } else {
      els.ragaName.textContent = "Raga " + pick.raga;
      els.artist.textContent = pick.artist;
      els.mood.textContent = pick.mood;
    }
    updateModeButtons();
  }

  function renderKabirHead() {
    const style = kabirStyle;
    const pick = currentPick;
    applyKabirTheme(style);
    els.praharLabel.textContent = style.label;
    els.timeRange.textContent =
      style.tracks.length + (style.tracks.length === 1 ? " recording" : " recordings");
    els.ragaName.textContent = pick.title;
    els.artist.textContent = pick.artist;
    els.mood.textContent = pick.note;
  }

  // Shared by both sections — WhatsApp needs a one-line description of
  // whatever is currently playing.
  function shareText(pick) {
    if (section === "kabir") {
      return "Kabir right now: " + pick.title + " — " + pick.artist +
        " (" + kabirStyle.label + ")";
    }
    return filmy && pick.song
      ? "Right now on Raga Clock (Filmy): " + pick.song + " (" + pick.film +
          ") — inspired by Raga " + pick.raga
      : "Right now on Raga Clock: Raga " + pick.raga + " by " + pick.artist;
  }

  function render() {
    const p = selected;
    const pick = currentPick;
    if (section === "kabir") renderKabirHead(); else renderRagaHead();
    renderChrome();

    els.actions.innerHTML = "";

    if (isAndroid) {
      const newPipeBtn = document.createElement("a");
      newPipeBtn.className = "btn btn-primary";
      newPipeBtn.textContent = "Open in NewPipe";
      // Direct intent link: launches NewPipe straight away, and the
      // browser_fallback_url baked into the intent opens plain YouTube only
      // when NewPipe isn't installed.
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
    shuffleBtn.setAttribute(
      "aria-label",
      section === "kabir"
        ? "Shuffle to another recording in this Kabir style"
        : "Shuffle to another performance from this prahar"
    );
    shuffleBtn.textContent = "Shuffle (" + poolFor(p).length + " in pool)";
    shuffleBtn.onclick = function () {
      currentPick = newPick(p);
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
    const current = getCurrentPrahar();
    if (selected.id === current.id) {
      els.followNote.textContent = "Showing the raga for right now.";
      return;
    }
    els.followNote.innerHTML = "";
    const text = document.createTextNode("Browsing " + selected.label + ". ");
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.textContent = "Back to now";
    backBtn.onclick = function () {
      following = true;
      selected = getCurrentPrahar();
      currentPick = pickFrom(selected);
      render();
    };
    els.followNote.appendChild(text);
    els.followNote.appendChild(backBtn);
  }

  function renderGrid() {
    if (section === "kabir") return renderKabirGrid();
    return renderPraharGrid();
  }

  function renderKabirGrid() {
    els.grid.innerHTML = "";
    KABIR.forEach(function (st) {
      const card = document.createElement("button");
      card.className = "card" + (st.id === kabirStyle.id ? " active" : "");
      card.type = "button";
      card.setAttribute("role", "listitem");
      card.setAttribute(
        "aria-label",
        st.label + ", " + st.tracks.length + " recordings. " + st.blurb
      );
      if (st.id === kabirStyle.id) card.setAttribute("aria-current", "true");
      const count = document.createElement("div");
      count.className = "card-time";
      count.textContent =
        st.tracks.length + (st.tracks.length === 1 ? " recording" : " recordings");
      const name = document.createElement("div");
      name.className = "card-raga";
      name.textContent = st.label;
      const blurb = document.createElement("div");
      blurb.className = "card-blurb";
      blurb.textContent = st.blurb;
      card.appendChild(count);
      card.appendChild(name);
      card.appendChild(blurb);
      card.onclick = function () { setKabirStyle(st); };
      els.grid.appendChild(card);
    });
  }

  function renderPraharGrid() {
    els.grid.innerHTML = "";
    PRAHARS.forEach(function (p) {
      const card = document.createElement("button");
      card.className = "card" + (p.id === selected.id ? " active" : "");
      card.type = "button";
      card.setAttribute("role", "listitem");
      card.setAttribute(
        "aria-label",
        p.label + ", " + p.time + ", raga " + p.familyRaga +
          ", " + p.options.length + " classical performances, " + p.filmy.length + " filmy songs"
      );
      if (p.id === selected.id) card.setAttribute("aria-current", "true");
      card.innerHTML =
        '<div class="card-time">' +
        p.time +
        '</div><div class="card-raga">' +
        p.familyRaga +
        '</div><div class="card-artist">' +
        p.options.length + " classical · " + p.filmy.length + " filmy" +
        "</div>";
      card.onclick = function () {
        following = false;
        selected = p;
        currentPick = pickFrom(p);
        render();
      };
      els.grid.appendChild(card);
    });
  }

  // Seconds until the next prahar begins (wrapping past midnight).
  function secondsToNextPrahar(now) {
    const boundaries = PRAHARS.map(function (p) { return p.start; });
    const cur = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let best = Infinity;
    boundaries.forEach(function (b) {
      let diff = b * 3600 - cur;
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
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    // Kabir ignores the clock entirely — no countdown, no auto-advance.
    if (section === "kabir") return;

    // Countdown shown only while following the live clock.
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
        currentPick = pickFrom(selected);
        render();
      }
    }
  }

  // Keyboard shortcut: press "S" (outside of any text field) to shuffle.
  document.addEventListener("keydown", function (e) {
    const tag = (e.target && e.target.tagName) || "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "s" || e.key === "S") {
      currentPick = newPick(selected);
      render();
    }
  });

  if (els.modeClassical) els.modeClassical.onclick = function () { setMode(false); };
  if (els.modeFilmy) els.modeFilmy.onclick = function () { setMode(true); };
  if (els.sectionRaga) els.sectionRaga.onclick = function () { setSection("raga"); };
  if (els.sectionKabir) els.sectionKabir.onclick = function () { setSection("kabir"); };

  // A remembered Kabir section needs its first pick drawn from the Kabir pool
  // rather than the prahar one that seeded currentPick above.
  if (section === "kabir") currentPick = pickFrom();

  render();

  // NOTE: we deliberately do NOT auto-redirect to NewPipe on load (even in the
  // installed / standalone app). Android only lets an app-intent launch happen
  // from a real user gesture (a tap); a programmatic navigation on page load is
  // blocked and silently falls back to the intent's browser_fallback_url — i.e.
  // it opens YouTube in the browser instead of NewPipe. So NewPipe is opened
  // only by tapping "Open in NewPipe", where the tap is a genuine gesture and
  // the intent reliably hands off to the app.

  tick();
  setInterval(tick, 1000);
})();
