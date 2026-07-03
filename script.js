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

  function youtubeWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  function youtubeEmbedUrl(videoId, startMuted) {
    return (
      "https://www.youtube.com/embed/" +
      videoId +
      "?autoplay=1&rel=0&enablejsapi=1&mute=" +
      (startMuted ? "1" : "0")
    );
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
        const iframe = els.playerShell.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: muted ? "mute" : "unMute", args: [] }),
            "*"
          );
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
      els.playerShell.innerHTML =
        '<iframe src="' +
        youtubeEmbedUrl(pick.videoId, muted) +
        '" allow="autoplay; encrypted-media" allowfullscreen title="Raga ' +
        pick.raga +
        '"></iframe>';
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
  // (faling back to YouTube if NewPipe isn't installed) — no tap required.
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
