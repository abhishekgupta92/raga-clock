# Raga Clock

A tiny static web app with two sections, chosen from the menu at the top:

- **Raga Clock** — plays the Hindustani classical raga traditionally associated
  with the current time of day (the "prahar" system), inspired by
  [ragya.com](https://ragya.com).
- **Kabir** — the same player, but organised by *kind of Kabir* rather than by
  the clock.

No build step, no dependencies, no backend — just `index.html`, `style.css`,
`script.js`, `data.js` and `kabir.js`.

## Raga Clock

- Every prahar has a pool of verified, named-artist performances (mostly
  female Hindustani classical musicians). A random one is picked whenever
  you load the page, the prahar changes, or you hit **Shuffle**.
- On desktop/web it autoplays inline via an embedded YouTube player, with
  sound on by default (some browsers block unmuted autoplay until you've
  clicked anywhere on the page once). When a track finishes, or if a video
  turns out to be unplayable (embedding disabled, taken down, etc.), it
  automatically advances to another random pick from the same prahar's pool.
- On Android, tap **Open in NewPipe** (falls back to YouTube if NewPipe
  isn't installed), or **Share on WhatsApp** to send the current pick to
  someone. You can also add Raga Clock to your home screen for one-tap
  access, as an installable app.
- You can also browse all 8 time slots manually.
- The whole page tints itself to match the hour: the ambient glow and accent
  colour shift through dawn, midday, dusk and night as the prahar changes.
  Honours `prefers-reduced-motion`.
- A live countdown shows how long until the next prahar begins, and pressing
  the **S** key shuffles without touching the mouse.
- A **Classical / Little Filmy** toggle: "Little Filmy" swaps the classical
  performance for a Bollywood song built on one of that prahar's ragas (e.g.
  *Man Tarpat Hari Darshan Ko Aaj* in Malkauns for Late Night, *Ehsan Tera
  Hoga Mujh Par* in Yaman for Evening). Same time-of-day logic, filmy flavour.

## The 8 praharas

Each prahar is a raga family, not a single fixed track — `data.js` gives it
a pool of `options`, and one is picked at random each time:

| Time slot | Raga family | Pool size |
|---|---|---|
| 4:00 AM – 7:00 AM | Bhairav | 24 |
| 7:00 AM – 10:00 AM | Ahir Bhairav | 29 |
| 10:00 AM – 1:00 PM | Bilawal | 27 |
| 1:00 PM – 4:00 PM | Bhimpalasi | 36 |
| 4:00 PM – 7:00 PM | Puriya Dhanashri | 27 |
| 7:00 PM – 10:00 PM | Yaman | 26 |
| 10:00 PM – 1:00 AM | Kedar | 29 |
| 1:00 AM – 4:00 AM | Malkauns | 38 |

**Total: 236 verified performances** across all 8 praharas.

## Little Filmy mode

Toggle **Little Filmy** and each prahar plays a Hindustani-classical-based
*Bollywood* song instead — mapped to the prahar by the raga the song is built
on. `data.js` gives every prahar a `filmy` pool of `{ song, film, year, artist,
raga, videoId, mood }` objects (currently 120 verified songs, all eras from
Baiju Bawra to A.R. Rahman). Like the classical pools, it can grow — just add
more verified entries to a prahar's `filmy` array. A prahar with no filmy songs
yet falls back to Classical automatically.

Pool sizes vary because not every raga family has that many distinct,
verifiable, named-artist performances actually indexed on YouTube — every
`videoId` here was pulled from a real search result, never guessed. The
"views" field in `data.js` is a rough estimate based on artist/channel
popularity, not a scraped exact count. Late Night has the deepest pool
simply because Malkauns/Bageshri/Darbari Kanada turned up the most verified
recordings; the others can grow the same way — just add more `{ raga,
artist, videoId, gender, views, mood }` objects to a prahar's `options`
array.

## Kabir

Kabir's poems carry no time-of-day association — there is no prahar system for
them — so this section drops the clock entirely. Instead the pools are
**styles**, and you pick the register you want:

| Style | Recordings | What it is |
|---|---|---|
| Nirgun Classical | 10 | Kabir as Hindustani classical — above all Kumar Gandharva, who rebuilt the nirguni bhajan after tuberculosis cost him a lung. |
| Malwa & Rajasthan Folk | 18 | The living tradition — Kabir sung in village courtyards on tambura and kartal, where the poems never stopped being folk songs. |
| Fusion & Rock | 19 | Kabir with a bass guitar and a drum kit — Neeraj Arya's Kabir Cafe put 15th-century verse on the festival circuit and it worked. |
| Sufi | 2 | Kabir read from the other side of the same argument — the Sufi voice that treats his verse as its own. |
| Popular & Devotional | 3 | Kabir as most people meet him first — bhajan albums, film playback, and dohe recited on a loop. |

**Total: 52 verified recordings** across 5 styles.

Everything else behaves exactly as in Raga Clock: a random track on load, the
same inline YouTube player with auto-advance, the same NewPipe/WhatsApp
hand-off on Android, the same <kbd>S</kbd> shuffle key. The page tint follows
the chosen style rather than the hour. Your section and style are remembered
across visits.

`kabir.js` holds the data as `{ label, blurb, accent, tracks: [{ title, artist,
videoId, note }] }`, and is loaded as a separate optional file — if it fails to
load, the Kabir menu item hides itself and Raga Clock carries on unaffected.
The pools can grow the same way the raga ones do. Sufi is the thinnest at two
entries, simply because few full Abida Parveen Kabir recordings are indexed as
individual tracks rather than as jukeboxes.

## Run it locally

Open `index.html` directly in a browser, or serve the folder:

```bash
cd raga-clock
python3 -m http.server 8000
# visit http://localhost:8000
```

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
