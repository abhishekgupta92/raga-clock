# Raga Clock

A tiny static web app. One catalogue of 589 verified YouTube recordings,
four ways of getting into it — chosen from the menu at the top:

- **Prahar** — plays the Hindustani classical raga traditionally associated with
  the current time of day (the "prahar" system), inspired by
  [ragya.com](https://ragya.com).
- **Raga** — the same recordings grouped by raga, one tile per raga, each with
  generated artwork.
- **Artists** — the same recordings grouped by performer, 111 of them, with
  portraits where a freely-licensed one exists.
- **Kabir** — a separate pool, organised by *kind of Kabir* rather than by the
  clock.

`data.js` is the only place recordings live. `catalog.js` flattens it once at
load and groups it by prahar, by raga and by artist, so the views are three
readings of one database rather than three copies of it. A recording credited to
several artists ("Mohammed Rafi, Lata Mangeshkar") shows up under each of them.

No build step, no dependencies, no backend — just `index.html`, `style.css`,
`script.js`, `data.js`, `kabir.js`, `artists.js` and `catalog.js`.

## Prahar

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
| 4:00 AM – 7:00 AM | Bhairav | 66 |
| 7:00 AM – 10:00 AM | Ahir Bhairav | 58 |
| 10:00 AM – 1:00 PM | Bilawal | 27 |
| 1:00 PM – 4:00 PM | Bhimpalasi | 44 |
| 4:00 PM – 7:00 PM | Puriya Dhanashri | 35 |
| 7:00 PM – 10:00 PM | Yaman | 73 |
| 10:00 PM – 1:00 AM | Kedar | 41 |
| 1:00 AM – 4:00 AM | Malkauns | 71 |

**Total: 415 verified performances** across all 8 praharas.

## Raga

Every raga in the catalogue gets a tile — **89 of them** — ordered by how many
recordings there are, and drawing from the classical and filmy pools together.
Picking one plays a random recording of that raga regardless of the hour.

The tile artwork is **generated, not fetched** — no image files ship with the
app, and the same raga always draws the same picture because everything is
seeded from its own name.

Two things decide what you see. The **palette** comes from the raga's prahar:
peach and indigo at dawn, amber in the morning, burnt orange at dusk, a crescent
on near-black after midnight. The **composition** comes from the raga's
character, and each character is drawn differently:

| Character | Drawn as | Ragas |
|---|---|---|
| `dawn` | rays fanning from the sun, temple arch on the skyline | Bhairav, Bhairavi, Ahir Bhairav, Lalit, Ramkali |
| `grave` | a heavy monolith, sky darkened, almost nothing bright | Malkauns, Darbari Kanada, Todi, Adana, Multani |
| `ascetic` | one stark vertical over an empty plain | Marwa, Puriya, Shri, Puriya Dhanashri, Sohni |
| `monsoon` | cloud masses and slanting rain | Megh, Miyan ki Malhar, Gaud Malhar, Desh |
| `romantic` | soft arcs and a wide glow | Yaman, Bihag, Kedar, Bageshri, Rageshri |
| `bright` | crisp peaks in full daylight | Bilawal, Shankara, Bhupali, the Sarangs |
| `playful` | a bouncing ribbon and scattered notes | Khamaj, Piloo, Jhinjhoti, Kafi, Pahadi |
| `spring` | petals adrift | Basant, Bahar |
| `yearning` | one long unresolved diagonal | Bhimpalasi, Madhuvanti, Charukeshi, Jog |

A raga not named in that map falls back to something reasonable for its hour.

Raga names are normalised in `catalog.js` as well, so spelling variants of one
raga (Pooriya/Puriya, Des/Desh, Sohoni/Sohni) share a tile instead of splitting
into two. Ragas that merely *look* alike are deliberately kept apart: Puriya,
Puriya Dhanashri and Puriya Kalyan are three different ragas, as are the Todi
family, the Bilawal prakars and the Malhars.
The eight **Prahar** tiles use the same engine, drawn in the character of the
raga family that names them.

## Artists

One tile per performer, **111 in all**, in a fresh random order every visit.
Names are matched with honorifics stripped, so "Pt. Bhimsen Joshi" and "Pandit
Bhimsen Joshi" are one artist rather than two tiles, plus a small alias map in
`catalog.js` for the cases stripping can't catch — spelling variants
(Chakrabarty / Chakraborty), and Rajan Mishra's few solo-credited recordings,
which sit on the Rajan & Sajan Mishra tile rather than a near-empty one of
their own.

70 of them have a portrait — a freely-licensed thumbnail hosted by Wikimedia,
hotlinked rather than re-hosted. The rest fall back to a generated initials tile
whose colour is derived from the name, so it is stable per artist. Most of the
gaps are artists for whom Wikipedia has no free image at all.

Both the Raga and Artists lists have a search box. Artists match on name *and*
gharana/discipline, so typing `kirana` finds the Kirana singers.

## Little Filmy mode

Toggle **Little Filmy** and each prahar plays something other than a straight
raga recital — mapped to the prahar by the raga it is built on where there is
one. Mostly that means Hindustani-classical-based *Bollywood* songs, from Baiju
Bawra to A.R. Rahman. It also holds the pieces that have no raga home of their
own: bhajans and abhangs, thumris, chaiti and kajri, ghazals, tabla solos and
fusion.

`data.js` gives every prahar a `filmy` pool of `{ song, film, year, artist,
raga, videoId, mood }` objects, currently **174** of them. `film`, `year` and
`raga` are optional — an entry without a film simply shows the artist, and one
with no raga drops the "inspired by" line. Like the classical pools it can grow;
just add more verified entries to a prahar's `filmy` array. A prahar with no
filmy songs yet falls back to Classical automatically.

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

Each style tile carries its own generated image too, in its own colours rather
than a prahar palette — since Kabir belongs to no hour. Nirgun is drawn as rings
opening around an absence (the formless one), the folk lineage as a row of
seated singers, the bands as an amplified waveform, Sufi as a whirl, and the
devotional pool as a lamp.

`kabir.js` holds the data as `{ label, blurb, accent, tracks: [{ title, artist,
videoId, note }] }`, and is loaded as a separate optional file — if it fails to
load, the Kabir menu item hides itself and Raga Clock carries on unaffected.
The pools can grow the same way the raga ones do. Sufi is the thinnest at two
entries, simply because few full Abida Parveen Kabir recordings are indexed as
individual tracks rather than as jukeboxes.

## Links and browsing

The address bar mirrors what is playing — `#/<section>/<selection>/<videoId>`:

```
#/raga/Darbari%20Kanada/ismOvvhQVKE
#/artist/kishori%20amonkar/
#/prahar/6/
#/kabir/fusion/BYFdcc0WHYk
```

Opening one of those restores that exact recording. Before this, the share
button composed a message naming a specific piece and then linked to the site
root, so whoever opened it got a random pick instead of the one they were sent;
now the link carries the recording. A link without a `videoId` opens that raga
/ artist / prahar on a random pick, which is the useful thing to send when you
mean "this artist" rather than "this recording".

State is written with `replaceState`, not `pushState`: shuffling is rapid-fire
and pushing every pick would bury the back button.

Each view also lists its whole pool under **All N recordings in this pool** —
previously a 73-deep prahar could only be explored by shuffling and hoping.
Rows lead with whatever distinguishes them: the performer inside a raga, the
piece (and its prahar) inside an artist.

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
