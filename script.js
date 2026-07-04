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
    grid: document.getElementById("grid")
  };

  // Accent colours per prahar, mirrored from style.css so the browser theme
  // colour (address bar / task switcher) matches the on-screen palette.
  const PRAHAR_ACCENTS = [
    "#ff9a6b", "#ffc24b", "#57c7ff", "#4fd1c5",
    "#ff7241", "#b58cff", "#6f8cff", "#8a7dff"
  ];

  let following = true; // true = always show whatever prahar matches the clock
  let filmy = false;    // false = Classical mode, true = Little Filmy mode
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
      "#Intent;scheme=https;package=org.schabi.newpipe;category=android.intent.category.BROWSABLE;S.browser_fallback_url=" +
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

  function pickFrom(prahar) {
    const pool = activePool(prahar);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function newPick(prahar) {
    // Avoid repeating the same pick twice in a row when the pool has more than one.
    const pool = activePool(prahar);
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
    currentPick = pickFrom(selected);
    render();
  }

  // Shift the whole page palette to match the prahar being shown, and keep the
  // browser theme colour in step with it.
  function applyTheme(prahar) {
    document.body.setAttribute("data-prahar", String(prahar.id));
    if (els.themeColorMeta && PRAHAR_ACCENTS[prahar.id]) {
      els.themeColorMeta.setAttribute("content", PRAHAR_ACCENTS[prahar.id]);
    }
  }

  function render() {
    const p = selected;
    const pick = currentPick;
    applyTheme(p);
    els.praharLabel.textContent = p.label;
    els.timeRange.textContent = p.time;
    if (filmy) {
      els.ragaName.textContent = pick.song;
      els.artist.textContent = pick.artist + " · " + pick.film + " (" + pick.year + ")";
      els.mood.textContent = "Inspired by Raga " + pick.raga + ". " + pick.mood;
    } else {
      els.ragaName.textContent = "Raga " + pick.raga;
      els.artist.textContent = pick.artist;
      els.mood.textContent = pick.mood;
    }
    updateModeButtons();

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
      const shareText =
        (filmy
          ? "Right now on Raga Clock (Filmy): " + pick.song + " (" + pick.film +
              ") — inspired by Raga " + pick.raga
          : "Right now on Raga Clock: Raga " + pick.raga + " by " + pick.artist) +
        " — https://abhishekgupta92.github.io/raga-clock/";
      shareBtn.href = "https://wa.me/?text=" + encodeURIComponent(shareText);
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
    shuffleBtn.setAttribute("aria-label", "Shuffle to another performance from this prahar");
    shuffleBtn.textContent = "Shuffle (" + activePool(p).length + " in pool)";
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
