# Raga Clock

A tiny static web app that plays the Hindustani classical raga traditionally
associated with the current time of day (the "prahar" system), inspired by
[ragya.com](https://ragya.com).

- Every prahar has a pool of verified, named-artist performances (mostly
  female Hindustani classical musicians). A random one is picked whenever
  you load the page, the prahar changes, or you hit **Shuffle**.
- On desktop/web it autoplays inline via an embedded YouTube player, muted
  at first (browsers block sound before any user interaction) — tap
  **Unmute** to hear it.
- On Android, just opening the app hands off straight to **NewPipe** with
  no tap required (falls back to YouTube if NewPipe isn't installed). The
  on-screen "Open in NewPipe" / "Open in YouTube" buttons stay as a manual
  fallback.
- You can also browse all 8 time slots manually.

No build step, no dependencies, no backend — just `index.html`, `style.css`,
`script.js`, and `data.js`.

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
cd raga-clock
python3 -m http.server 8000
# visit http://localhost:8000
```

## The 8 praharas

Each prahar is a raga family, not a single fixed track — `data.js` gives it
a pool of `options`, and one is picked at random each time:

| Time slot | Raga family | Pool size |
|---|---|---|
| 4:00–7:00 AM | Bhairav | 9 |
| 7:00–10:00 AM | Ahir Bhairav | 9 |
| 10:00 AM–1:00 PM | Bilawal | 5 |
| 1:00–4:00 PM | Bhimpalasi | 7 |
| 4:00–7:00 PM | Puriya Dhanashri | 5 |
| 7:00–10:00 PM | Yaman | 5 |
| 10:00 PM–1:00 AM | Kedar | 4 |
| 1:00–4:00 AM | Malkauns | 26 |

Pool sizes vary because not every raga family has that many distinct,
verifiable, named-artist performances actually indexed on YouTube — every
`videoId` here was pulled from a real search result, never guessed. The
"views" field in `data.js` is a rough estimate based on artist/channel
popularity, not a scraped exact count. Late Night has the deepest pool
simply because Malkauns/Bageshri/Darbari Kanada turned up the most verified
recordings; the others can grow the same way — just add more `{ raga,
artist, videoId, gender, views, mood }` objects to a prahar's `options`
array.

## How the NewPipe link works

On Android, the "Open in NewPipe" button uses an explicit Android intent URL:

```
intent://www.youtube.com/watch?v=<ID>#Intent;scheme=https;package=org.schabi.newpipe;S.browser_fallback_url=<encoded YouTube URL>;end
```

This asks Android to open the YouTube URL specifically with the NewPipe app
(`org.schabi.newpipe`). If NewPipe isn't installed, the browser falls back to
the plain YouTube URL.

## Publish to GitHub Pages

From inside this `raga-clock` folder:

```bash
git init
git add .
git commit -m "Raga Clock: time-of-day raga player"
git branch -M main
git remote add origin https://github.com/<your-username>/raga-clock.git
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Deploy from a branch →
main / (root)**. The site will be live at
`https://<your-username>.github.io/raga-clock/` within a minute or two.

## Credits

Concept inspired by [Ragya](https://ragya.com), "Home of Hindustani Classical
Music." This project is unaffiliated with Ragya and simply reuses the public
idea of matching ragas to time-of-day praharas.
