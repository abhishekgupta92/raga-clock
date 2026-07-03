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
    grid: document.getElementById("grid")
  };

  let following = true; // true = always show whatever prahar matches the clock
  let selected = getCurrentPrahar();
  let currentPick = pickRandomOption(selected);
  let muted = true;
  let androidAutoLaunched = false;

  // YouTube IFrame Player API state (desktop/web only — Android hands off to
  // NewPipe/YouTube instead of embedding a player).
  let ytPlayer = null;
  let apiReady = false;

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
    if (window.YT && event.data === YT.PlayerState.ENDED) {
      // Autoplay: once a track finishes, automatically switch to the next one.
      currentPick = newPick(selected);
      render();
    }
  }

  // Creates the player on first use, or reuses it for later renders —
  // only calling loadVideoById when the video actually needs to change,
  // so muting/unmuting doesn't restart playback.
  function syncPlayer(forceLoad) {
    if (isAndroid || !apiReady) return;
    const videoId = currentPick.videoId;
    if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      if (forceLoad || ytPlayer.__currentVideoId !== videoId) {
        ytPlayer.loadVideoById(videoId);
        ytPlayer.__currentVideoId = videoId;
      }
      if (muted) ytPlayer.mute();
      else ytPlayer.unMute();
    } else {
      ytPlayer = new YT.Player("yt-player-frame", {
        videoId: videoId,
        playerVars: { autoplay: 1, rel: 0, mute: muted ? 1 : 0 },
        events: {
          onReady: function () {
            ytPlayer.__currentVideoId = videoId;
            if (muted) ytPlayer.mute();
            else ytPlayer.unMute();
          },
          onStateChange: onPlayerStateChange
        }
      });
    }
  }

  function youtubeWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  // Explicit Android intent that targets the NewPipe package directly.
  // If NewPipe isn't installed, Chrome falls back to the plain YouTube URL.
  function newPipeIntentUrl(videoId) {
    const watchUrl = youtubeWatchUrl(videoId);
    return (
      "intent://www.youtube.com/watch?v=" +
      videoId +
      "#Intent;scheme=https;package=org.schabi.newpipe;S.browser_fallback_url=" +
      encodeURIComponent(watchUrl) +
      ";end"
    );
  }

  function newPick(prahar) {
    // Avoid repeating the same pick twice in a row when there's more than one option.
    const opts = prahar.options;
    if (opts.length === 1) return opts[0];
    let next = pickRandomOption(prahar);
    let guard = 0;
    while (currentPick && next.videoId === currentPick.videoId && guard < 8) {
      next = pickRandomOption(prahar);
      guard++;
    }
    return next;
  }

  function render() {
    const p = selected;
    const pick = currentPick;
    els.praharLabel.textContent = p.label;
    els.timeRange.textContent = p.time;
    els.ragaName.textContent = "Raga " + pick.raga;
    els.artist.textContent = pick.artist;
    els.mood.textContent = pick.mood;

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
    } else {
      const ytBtn = document.createElement("a");
      ytBtn.className = "btn btn-ghost";
      ytBtn.textContent = "Open on YouTube.com";
      ytBtn.href = youtubeWatchUrl(pick.videoId);
      ytBtn.target = "_blank";
      ytBtn.rel = "noopener";
      els.actions.appendChild(ytBtn);

      const unmuteBtn = document.createElement("button");
      unmuteBtn.className = "btn-primary";
      unmuteBtn.textContent = muted ? "Unmute" : "Mute";
      unmuteBtn.onclick = function () {
        muted = !muted;
        if (ytPlayer) {
          if (muted) ytPlayer.mute();
          else ytPlayer.unMute();
        }
        render();
      };
      els.actions.appendChild(unmuteBtn);
    }

    const shuffleBtn = document.createElement("button");
    shuffleBtn.className = "btn-secondary";
    shuffleBtn.textContent = "Shuffle (" + p.options.length + " in pool)";
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
    backBtn.textContent = "Back to now";
    backBtn.onclick = function () {
      following = true;
      selected = getCurrentPrahar();
      currentPick = pickRandomOption(selected);
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
      card.innerHTML =
        '<div class="card-time">' +
        p.time +
        '</div><div class="card-raga">' +
        p.familyRaga +
        '</div><div class="card-artist">' +
        p.options.length +
        " performances</div>";
      card.onclick = function () {
        following = false;
        selected = p;
        currentPick = pickRandomOption(p);
        render();
      };
      els.grid.appendChild(card);
    });
  }

  function tick() {
    const now = new Date();
    els.liveClock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    if (following) {
      const current = getCurrentPrahar(now);
      if (current.id !== selected.id) {
        selected = current;
        currentPick = pickRandomOption(selected);
        render();
      }
    }
  }

  render();

  // On Android, opening the app should immediately try to hand off to NewPipe
  // (falling back to YouTube if NewPipe isn't installed) — no tap required.
  // This fires once, right after the first render, so the on-screen buttons
  // are still there as a manual fallback if the auto hand-off gets blocked.
  if (isAndroid && !androidAutoLaunched) {
    androidAutoLaunched = true;
    setTimeout(function () {
      window.location.href = newPipeIntentUrl(currentPick.videoId);
    }, 150);
  }

  tick();
  setInterval(tick, 1000);
})();
