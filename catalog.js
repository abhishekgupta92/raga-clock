// One database, several views.
//
// data.js is the only place recordings are stored. This file flattens it into
// a single list of tracks and groups that list three ways — by prahar, by raga,
// and by artist — so the Prahar / Raga / Artists views are all reading the same
// rows rather than keeping parallel copies.
//
// A track can have several artists ("Mohammed Rafi, Lata Mangeshkar"), so it
// appears under each of them. Splitting is on commas only: "&" is part of a duo
// name like "Rajan & Sajan Mishra" and must not be broken apart.

const CATALOG = (function () {
  const HONORIFIC = /^(Pt\.|Pandit|Ustad|Vidushi|Smt\.|Dr\.|Padmashree|Padmshri)\s+/i;
  const TRAILING_PAREN = /\s*\([^)]*\)\s*$/;

  // Spelling variants of one person that stripping honorifics can't merge.
  const ALIAS = {
    "ajoy chakrabarty": "ajoy chakraborty",
    "manjiri asnare kelkar": "manjiri asanare kelkar",
    "manjiri asanare-kelkar": "manjiri asanare kelkar",
    "arati ankalikar-tikekar": "arati ankalikar tikekar",
    "rafi": "mohammed rafi",
    "shahid parvez": "shahid parvez khan",
    "m venkatesh kumar": "venkatesh kumar",
    "ks chitra": "k s chitra",
    "kj yesudas": "k j yesudas",
    "kl saigal": "k l saigal",
    "dv paluskar": "d v paluskar"
  };

  function splitArtists(s) {
    return String(s || "").split(",").map(function (x) { return x.trim(); })
      .filter(Boolean);
  }

  function artistKey(name) {
    let n = String(name || "").replace(TRAILING_PAREN, "").trim();
    let prev = null;
    while (prev !== n) { prev = n; n = n.replace(HONORIFIC, "").trim(); }
    n = n.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
    return ALIAS[n] || n;
  }

  // Flatten every pool in data.js into one uniform track shape.
  const tracks = [];
  PRAHARS.forEach(function (p) {
    p.options.forEach(function (e) {
      tracks.push({
        videoId: e.videoId,
        title: "Raga " + e.raga,
        raga: e.raga,
        credit: e.artist,
        artists: splitArtists(e.artist),
        mood: e.mood,
        prahar: p.id,
        pool: "classical"
      });
    });
    p.filmy.forEach(function (f) {
      tracks.push({
        videoId: f.videoId,
        title: f.song,
        raga: f.raga || null,
        credit: f.artist + (f.film ? " · " + f.film + " (" + f.year + ")" : ""),
        artists: splitArtists(f.artist),
        mood: f.mood,
        prahar: p.id,
        pool: "filmy"
      });
    });
  });

  // ---- group by raga ------------------------------------------------------
  const ragaMap = {};
  tracks.forEach(function (t) {
    if (!t.raga) return;              // bhajans, tabla solos, fusion: no raga
    if (!ragaMap[t.raga]) ragaMap[t.raga] = { name: t.raga, tracks: [] };
    ragaMap[t.raga].tracks.push(t);
  });
  const ragas = Object.keys(ragaMap).map(function (k) {
    const g = ragaMap[k];
    // Theme a raga by the prahar most of its recordings sit in.
    const counts = {};
    g.tracks.forEach(function (t) { counts[t.prahar] = (counts[t.prahar] || 0) + 1; });
    g.prahar = Number(Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || a - b;
    })[0]);
    g.key = k;
    return g;
  }).sort(function (a, b) {
    return b.tracks.length - a.tracks.length || a.name.localeCompare(b.name);
  });

  // ---- group by artist ----------------------------------------------------
  const info = {};
  if (typeof ARTIST_INFO !== "undefined" && ARTIST_INFO) {
    ARTIST_INFO.forEach(function (a) { info[a.key] = a; });
  }
  const artistMap = {};
  tracks.forEach(function (t) {
    t.artists.forEach(function (name) {
      const k = artistKey(name);
      if (!k) return;
      if (!artistMap[k]) {
        artistMap[k] = {
          key: k,
          name: (info[k] && info[k].name) || name.replace(TRAILING_PAREN, "").trim(),
          img: info[k] && info[k].img,
          discipline: info[k] && info[k].discipline,
          era: info[k] && info[k].era,
          tracks: [],
          seen: {}
        };
      }
      const a = artistMap[k];
      if (a.seen[t.videoId]) return;   // same recording credited twice
      a.seen[t.videoId] = 1;
      a.tracks.push(t);
    });
  });
  const artists = Object.keys(artistMap).map(function (k) {
    const a = artistMap[k];
    delete a.seen;
    return a;
  }).sort(function (a, b) {
    return b.tracks.length - a.tracks.length || a.name.localeCompare(b.name);
  });

  return { tracks: tracks, ragas: ragas, artists: artists, artistKey: artistKey };
})();
