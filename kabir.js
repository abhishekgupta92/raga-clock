// Kabir — the same player, organised by the kind of Kabir rather than by the
// clock. Kabir's poems have no time-of-day association, so there is no prahar
// here: the pools are styles (classical nirguni, Malwa folk, band fusion,
// Sufi, popular devotional) and you pick the register you want.
//
// Same rule as data.js: every videoId was pulled from a real YouTube search
// result and confirmed live via the oEmbed endpoint. Never invented.

const KABIR_STYLES = [
  {
    "id": 0,
    "key": "nirgun",
    "label": "Nirgun Classical",
    "accent": "#b58cff",
    "blurb": "Kabir as Hindustani classical — above all Kumar Gandharva, who rebuilt the nirguni bhajan after tuberculosis cost him a lung.",
    "tracks": [
      {
        "title": "Nirbhay Nirgun Gun Re",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "V1tXJu-1O8U",
        "note": "Kabir's fearless formless one, in the voice that defined how these poems are sung."
      },
      {
        "title": "Kaun Thagva Nagariya Lutal Ho",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "DJpSr1bf1QQ",
        "note": "Who is this swindler looting the city? — Kabir's riddle of death, sung plain."
      },
      {
        "title": "Ud Jayega Hans Akela",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "2j8nx4pPqT4",
        "note": "The swan flies off alone. The best-known nirguni bhajan there is."
      },
      {
        "title": "Sunta Hai Guru Gyani",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "zHt2wqkTH64",
        "note": "The sound beyond sound — only the knowing guru hears it."
      },
      {
        "title": "Hirna Samajh Boojh Ban Charna",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "qYKAcw7eSLg",
        "note": "A warning to the deer: graze the forest with your wits about you."
      },
      {
        "title": "Avadhuta Gagan Ghata Gaharani Re",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "WJCEy4xG7zA",
        "note": "Clouds gathering in the inner sky — Kabir's monsoon is not the weather."
      },
      {
        "title": "Bhola Man Jane Amar Meri Kaya",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "lfSEHvZ8mi0",
        "note": "The foolish mind thinks this body will last forever. Set in Bhairavi."
      },
      {
        "title": "Naiya Mori Nike Nike Chalan Lagi",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "og16xgV9rF4",
        "note": "The boat moves sweetly — until Kabir reminds you where it is going."
      },
      {
        "title": "Nirguni Bhajans",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "us8Bwkeigh8",
        "note": "A longer sitting of nirguni bhajans, one after another."
      },
      {
        "title": "Nirguni Bhajan",
        "artist": "Pt. Kumar Gandharva",
        "videoId": "nuE6Rld6N_c",
        "note": "From the official archive of Kumar Gandharva's recordings."
      }
    ]
  },
  {
    "id": 1,
    "key": "folk",
    "label": "Malwa & Rajasthan Folk",
    "accent": "#ffc24b",
    "blurb": "The living tradition — Kabir sung in village courtyards on tambura and kartal, where the poems never stopped being folk songs.",
    "tracks": [
      {
        "title": "Zara Halke Gaadi Haanko",
        "artist": "Prahlad Singh Tipanya",
        "videoId": "5GrpLSbAc-8",
        "note": "Drive the cart gently — the Malwa Kabir song everyone knows."
      },
      {
        "title": "Kahaan Se Aaya Kahaan Jaaoge",
        "artist": "Prahlad Singh Tipanya",
        "videoId": "zRuOAjnY5aQ",
        "note": "Where did you come from, where will you go? Tipanya asks it as a folk song."
      },
      {
        "title": "Chadariya Jheeni Re Jheeni",
        "artist": "Mukhtiyar Ali",
        "videoId": "7z9dM2E1Zl8",
        "note": "The finely woven sheet — Kabir the weaver's most famous metaphor, sung Sufi-side."
      },
      {
        "title": "Songs of Kabir in the Malwa Tradition",
        "artist": "Kaluram Bamaniya",
        "videoId": "9z_Ngt4xYPA",
        "note": "A full concert of Malwa Kabir from the Padma Shri singer."
      },
      {
        "title": "Mann Mast Hua",
        "artist": "Kaluram Bamaniya",
        "videoId": "6JQYpYEQnvg",
        "note": "The mind turns drunk, and stops explaining itself."
      },
      {
        "title": "Mann Laago Fakiri Mein",
        "artist": "Kaluram Bamaniya",
        "videoId": "KrgqkHUJtsg",
        "note": "The heart settles into poverty and finds it was riches."
      },
      {
        "title": "Mat Kar Maya Ko Ahankar",
        "artist": "Kaluram Bamaniya",
        "videoId": "sjMJyBp2ZXQ",
        "note": "Don't be proud of your wealth — live in a Delhi cafe, still unanswerable."
      },
      {
        "title": "Bharyo Raam Ras Kaanso",
        "artist": "Kaluram Bamaniya",
        "videoId": "AN9-RsTSUsg",
        "note": "The cup filled with Ram's essence, in Malwi."
      },
      {
        "title": "Surta Ro Karno Hai Byaah",
        "artist": "Kaluram Bamaniya",
        "videoId": "bThFyA3JDzc",
        "note": "The wedding of awareness — Kabir's marriage metaphor turned inward."
      },
      {
        "title": "Ghana Din So Liyo Re",
        "artist": "Kaluram Bamaniya",
        "videoId": "VuldzsVdDZE",
        "note": "You have slept many days; wake now, traveller."
      },
      {
        "title": "Tera Mera Manwa Kaise Ek Hoe",
        "artist": "Kaluram Bamaniya",
        "videoId": "Gl0QIGJcdHE",
        "note": "How will your mind and mine ever be one? Kabir on the gap between people."
      },
      {
        "title": "Zara Halke Gaadi Haanko",
        "artist": "Kaluram Bamaniya",
        "videoId": "XVGgMPLmZg0",
        "note": "The same song as Tipanya's, in Bamaniya's rougher, closer voice."
      },
      {
        "title": "Latko Chhod De",
        "artist": "Kaluram Bamaniya",
        "videoId": "m6hVU7a2DUY",
        "note": "Drop the affectation — Kabir with no patience for performance."
      },
      {
        "title": "Govindo Gaayo Nahin",
        "artist": "Kaluram Bamaniya",
        "videoId": "GItXr-Z8UhQ",
        "note": "You never actually sang of Govind. A life's reckoning in one line."
      },
      {
        "title": "Milo Re Milo Re",
        "artist": "Kaluram Bamaniya",
        "videoId": "0XNCa-qCZb8",
        "note": "A call to meet, sung as invitation rather than instruction."
      },
      {
        "title": "Eda Main Kaam Kiya",
        "artist": "Mahesha Ram",
        "videoId": "r2m9ykUb31s",
        "note": "Rajasthani Kabir — sparser, higher, with the desert in it."
      },
      {
        "title": "Baahar Kyon Bhatke",
        "artist": "Mahesha Ram & Bhage Khan",
        "videoId": "ojVm7plVKqs",
        "note": "Why wander outside? The thing you want is in here."
      },
      {
        "title": "Malwi Folk Jugalbandi",
        "artist": "Kaluram Bamaniya & Kailash Kher",
        "videoId": "txZPxXaXz3k",
        "note": "The folk singer and the playback star trading lines, live."
      }
    ]
  },
  {
    "id": 2,
    "key": "fusion",
    "label": "Fusion & Rock",
    "accent": "#ff7241",
    "blurb": "Kabir with a bass guitar and a drum kit — Neeraj Arya's Kabir Cafe put 15th-century verse on the festival circuit and it worked.",
    "tracks": [
      {
        "title": "Panchrang (full album)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "AnGs5XJbd58",
        "note": "The album that made Kabir Cafe — all five colours end to end."
      },
      {
        "title": "Man Lago Mero Yaar (Fakiri)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "9clue76v3Rc",
        "note": "Fakiri live, the song that opens most of their sets."
      },
      {
        "title": "Fakiri ft. Vishal Dadlani",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "4hrBqCpsCks",
        "note": "The Dewarists session — Kabir and a Bollywood rock voice in the same room."
      },
      {
        "title": "Matkar Maya Ko Ahankar",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "mmc-QPQ74qc",
        "note": "Studio cut from Panchrang."
      },
      {
        "title": "Matkar Maya Ko Ahankar (live)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "tYRKCimTODI",
        "note": "The same warning, delivered to a festival crowd."
      },
      {
        "title": "Moko Kahaan Dhoonde Re Bande",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "CKspLh-UOi4",
        "note": "Where are you looking for me? I am right beside you."
      },
      {
        "title": "Moko Kahan Dhunde Re Bande (live)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "vUY89oce1tM",
        "note": "The live reading, slower and heavier."
      },
      {
        "title": "Charkha Charkha",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "tGEwkWNeHuw",
        "note": "The spinning wheel — Kabir's weaving trade as the shape of a life."
      },
      {
        "title": "Kya Leke Aaya Bande",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "cDqChal4TTE",
        "note": "What did you bring, what will you take? Sung as a rock question."
      },
      {
        "title": "Chadariya Jheeni Re Jheeni (live)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "p5WWwYyK1ys",
        "note": "The weaver's sheet, amplified."
      },
      {
        "title": "Chadariya Jhini",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "CQXWN2sD2e8",
        "note": "The studio version from their official catalogue."
      },
      {
        "title": "Chor Aavega (Nothing Lasts Forever)",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "Q0fQ6iwv9go",
        "note": "The thief is coming — Kabir's death, with a backbeat."
      },
      {
        "title": "Halke Gaadi Haako",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "C-RGn9vxTjw",
        "note": "The Malwa folk song rebuilt as contemporary folk fusion."
      },
      {
        "title": "Muniya Pinjre Wali",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "YeNwcHz7llM",
        "note": "The caged bird, which is of course you."
      },
      {
        "title": "Kya Bole Re",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "BYFdcc0WHYk",
        "note": "Official video — Kabir asking what exactly you plan to say."
      },
      {
        "title": "Chaurasi Ki Neend",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "YpsvnxqBGD0",
        "note": "The sleep of eighty-four lakh births, and the trouble of waking up."
      },
      {
        "title": "Live at Kasauli Rhythm & Blues",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "tw2ovmvUrAw",
        "note": "A full hill-station set, 2017."
      },
      {
        "title": "Live at GIFLIF",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "sfvWy72Q4H8",
        "note": "The band's long-running festival home."
      },
      {
        "title": "Live at Mahashivratri",
        "artist": "Neeraj Arya's Kabir Cafe",
        "videoId": "I9Vfl7B_6V0",
        "note": "Kabir Cafe to a very large crowd, 2020."
      }
    ]
  },
  {
    "id": 3,
    "key": "sufi",
    "label": "Sufi",
    "accent": "#4fd1c5",
    "blurb": "Kabir read from the other side of the same argument — the Sufi voice that treats his verse as its own.",
    "tracks": [
      {
        "title": "Kabir by Abida Parveen",
        "artist": "Abida Parveen",
        "videoId": "IU9uBMPqQdE",
        "note": "Abida sings Kabir, with Gulzar's readings between — the full collection."
      },
      {
        "title": "Kabir by Abida Parveen",
        "artist": "Abida Parveen",
        "videoId": "mNEh6TbkSYo",
        "note": "An earlier gathering of the same recordings."
      }
    ]
  },
  {
    "id": 4,
    "key": "popular",
    "label": "Popular & Devotional",
    "accent": "#6f8cff",
    "blurb": "Kabir as most people meet him first — bhajan albums, film playback, and dohe recited on a loop.",
    "tracks": [
      {
        "title": "Kabira (Kabir Dohe)",
        "artist": "Jubin Nautiyal",
        "videoId": "IptC7oeTNkE",
        "note": "The dohe given a contemporary playback arrangement."
      },
      {
        "title": "Chadariya Jhini Re Jhini",
        "artist": "Anup Jalota",
        "videoId": "WDysNQi0HlU",
        "note": "The bhajan-samrat reading — the version that sold the most cassettes."
      },
      {
        "title": "Kabir Amritwani",
        "artist": "Debashish Das Gupta",
        "videoId": "HH1PXnKg2LU",
        "note": "A long recitation of the best-known dohe, one after another."
      }
    ]
  }
];
