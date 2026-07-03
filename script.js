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

  function youtubeWatchUrl(videoId) {
    return "https://www.youtube.com/watch?v=" + videoId;
  }

  function youtubeEmbedUrl(videoId) {
    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0";
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

  function render() {
    const p = selected;
    els.praharLabel.textContent = p.label;
    els.timeRange.textContent = p.time;
    els.ragaName.textContent = "Raga " + p.raga;
    els.artist.textContent = p.artist;
    els.mood.textContent = p.mood;
    els.playerShell.innerHTML = "";
    els.playerShell.style.display = "none";

    els.actions.innerHTML = "";

    if (isAndroid) {
      const newPipeBtn = document.createElement("a");
      newPipeBtn.className = "btn btn-primary";
      newPipeBtn.textContent = "Open in NewPipe";
      newPipeBtn.href = newPipeIntentUrl(p.videoId);
      els.actions.appendChild(newPipeBtn);

      const ytBtn = document.createElement("a");
      ytBtn.className = "btn btn-secondary";
      ytBtn.textContent = "Open in YouTube";
      ytBtn.href = youtubeWatchUrl(p.videoId);
      ytBtn.target = "_blank";
      ytBtn.rel = "noopener";
      els.actions.appendChild(ytBtn);
    } else {
      const playBtn = document.createElement("button");
      playBtn.className = "btn-primary";
      playBtn.textContent = "Play " + p.raga;
      playBtn.onclick = function () {
        els.playerShell.style.display = "block";
        els.playerShell.innerHTML =
          '<iframe src="' +
          youtubeEmbedUrl(p.videoId) +
          '" allow="autoplay; encrypted-media" allowfullscreen title="Raga ' +
          p.raga +
          '"></iframe>';
      };
      els.actions.appendChild(playBtn);

      const ytBtn = document.createElement("a");
      ytBtn.className = "btn btn-ghost";
      ytBtn.textContent = "Open on YouTube.com";
      ytBtn.href = youtubeWatchUrl(p.videoId);
      ytBtn.target = "_blank";
      ytBtn.rel = "noopener";
      els.actions.appendChild(ytBtn);
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
        p.raga +
        '</div><div class="card-artist">' +
        p.artist +
        "</div>";
      card.onclick = function () {
        following = false;
        selected = p;
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
        render();
      }
    }
  }

  render();
  tick();
  setInterval(tick, 1000);
})();
