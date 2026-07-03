# Raga Clock

A tiny static web app that plays the Hindustani classical raga traditionally
associated with the current time of day (the "prahar" system), inspired by
[ragya.com](https://ragya.com).

- On desktop/web it plays the raga inline via an embedded YouTube player.
- On Android it opens the video directly in **NewPipe** (falls back to
  YouTube if NewPipe isn't installed).
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

| Time slot | Raga | Reference performance |
|---|---|---|
| 4:00–7:00 AM | Bhairav | Ustad Rashid Khan |
| 7:00–10:00 AM | Ahir Bhairav | Kaushiki Chakraborty |
| 10:00 AM–1:00 PM | Bilawal | Kishori Amonkar |
| 1:00–4:00 PM | Bhimpalasi | Ustad Shahid Parvez Khan |
| 4:00–7:00 PM | Puriya Dhanashri | Saylee Talwalkar |
| 7:00–10:00 PM | Yaman | Pt. Rajan & Sajan Mishra |
| 10:00 PM–1:00 AM | Kedar | Pt. Ajoy Chakraborty |
| 1:00–4:00 AM | Malkauns | Vidushi Ashwini Bhide |

Edit `data.js` to swap in your own picks — each entry just needs a YouTube
`videoId`.

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
