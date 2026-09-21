// Ashta Prahar (8 three-hour segments) mapped to the Hindustani classical
// ragas traditionally sung/played during that time of day. Each prahar has:
//   - options: verified, named-artist YouTube performances (classical)
//   - filmy:   verified Bollywood songs built on a raga of that prahar
// One entry is picked at random on load / prahar change / Shuffle. Every
// videoId was pulled from a real search result and confirmed live via
// YouTube's oEmbed endpoint (never invented, never guessed).
//
// RAGA -> PRAHAR PLACEMENT GUIDE (so any raga-based piece has a home):
//   0 Early Morning (4-7)  : Bhairav, Bhairavi, Ramkali, Kalingada, Lalit, Jogia, Vibhas, Gunkali
//   1 Morning (7-10)       : Ahir Bhairav, Todi, Miyan ki Todi, Gujari Todi, Bilaskhani Todi, Jaunpuri, Asavari
//   2 Late Morning (10-13) : Bilawal, Alhaiya Bilawal, Deshkar, Shuddh Sarang, Gaud Sarang, Shankara, Devgiri
//   3 Afternoon (13-16)    : Bhimpalasi, Multani, Patdeep, Madhuvanti, Dhani, Brindavani Sarang, Piloo
//   4 Dusk / Sandhi (16-19): Puriya Dhanashri, Marwa, Puriya, Shri, Puriya Kalyan, Multani (late)
//   5 Evening (19-22)      : Yaman, Yaman Kalyan, Bhupali, Shuddh Kalyan, Kalyan, Khamaj, Jhinjhoti, Tilak Kamod, Desh, Kafi
//   6 Night (22-1)         : Kedar, Hameer, Bihag, Maru Bihag, Nand, Kamod, Chhayanat, Durga, Shankara, Rageshri, Jaijaiwanti
//   7 Late Night (1-4)     : Malkauns, Darbari Kanada, Bageshri, Adana, Chandrakauns, Kaunsi Kanada, Nayaki Kanada, Basant, Bahar, Sohni

const PRAHARS = [
  {
    "id": 0,
    "start": 4,
    "end": 7,
    "time": "4:00 AM – 7:00 AM",
    "label": "Early Morning",
    "familyRaga": "Bhairav",
    "mood": "Solemn and devotional — the classic raga family to greet sunrise.",
    "options": [
      {
        "raga": "Bhairav",
        "artist": "Ustad Rashid Khan",
        "videoId": "S6yYZqVHiVA",
        "gender": "male",
        "views": "200K",
        "mood": "Solemn and devotional — the classic raga to greet sunrise."
      },
      {
        "raga": "Nat Bhairav",
        "artist": "Kaushiki Chakraborty",
        "videoId": "YkJkwqJE0fU",
        "gender": "female",
        "views": "100K",
        "mood": "A sterner cousin of Bhairav, sung with disciplined gravity at first light."
      },
      {
        "raga": "Bhairavi",
        "artist": "Kaushiki Chakraborty",
        "videoId": "6_bfPzclL08",
        "gender": "female",
        "views": "90K",
        "mood": "A meditative Bhairavi filmed at dawn, still and unhurried."
      },
      {
        "raga": "Bhairavi",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "HJ326bBjtmU",
        "gender": "female",
        "views": "60K",
        "mood": "A tarana in Bhairavi, bright and rhythmic as the sky lightens."
      },
      {
        "raga": "Bhairavi",
        "artist": "Malini Rajurkar",
        "videoId": "dRQ5s1koDzg",
        "gender": "female",
        "views": "35K",
        "mood": "An archival tappa and tarana in Bhairavi, warm and unadorned."
      },
      {
        "raga": "Nat Bhairav",
        "artist": "B. Sivaramakrishna Rao (sitar)",
        "videoId": "bOO-mWDpgVQ",
        "gender": "male",
        "views": "40K",
        "mood": "A healing, contemplative sitar reading of Nat Bhairav."
      },
      {
        "raga": "Bhairav",
        "artist": "B. Sivaramakrishna Rao (sitar)",
        "videoId": "CBGbe0j7bSQ",
        "gender": "male",
        "views": "40K",
        "mood": "Sitar strings trace Bhairav's grave, temple-bell stillness."
      },
      {
        "raga": "Bhairavi",
        "artist": "Niladri Kumar & Subhankar Banerjee",
        "videoId": "ZtOQ49_hO8s",
        "gender": "male",
        "views": "70K",
        "mood": "Sitar and tabla in conversation, Bhairavi unfolding at daybreak."
      },
      {
        "raga": "Bhairavi",
        "artist": "Pt. Hariprasad Chaurasia (flute)",
        "videoId": "tLXNNejKhJs",
        "gender": "male",
        "views": "150K",
        "mood": "The bansuri's breath turns Bhairavi into pure morning air."
      },
      {
        "raga": "Bhairav",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "jYZZUnkj1F4",
        "gender": "female",
        "views": "60K",
        "mood": "Poised and radiant — a Jaipur-Atrauli voice unfolding Bhairav's grave dignity as the sky lightens."
      },
      {
        "raga": "Bhairavi",
        "artist": "Padma Talwalkar",
        "videoId": "0J-28jbc8hU",
        "gender": "female",
        "views": "25K",
        "mood": "Gentle and plaintive — Bhairavi's tender ache lingering as morning breaks."
      },
      {
        "raga": "Bhairavi",
        "artist": "N. Rajam (violin)",
        "videoId": "RqSTuW7j8LI",
        "gender": "female",
        "views": "150K",
        "mood": "Singing strings across three generations — a violin lineage bowing gracefully into sunrise."
      },
      {
        "raga": "Bhairavi",
        "artist": "Shubha Mudgal",
        "videoId": "NCpuMNk6DKs",
        "gender": "female",
        "views": "90K",
        "mood": "Soulful and grounded — a Kabir composition in Bhairavi that feels like dawn's quiet surrender."
      },
      {
        "raga": "Vibhas",
        "artist": "Manjiri Asnare Kelkar",
        "videoId": "2AvT3piOSkE",
        "gender": "female",
        "views": "12K",
        "mood": "Delicate and understated — the rarer dawn raga Vibhas rendered with Jaipur-Atrauli restraint."
      },
      {
        "raga": "Bhairavi",
        "artist": "Roopa Panesar (sitar)",
        "videoId": "IbwZOj9r7qo",
        "gender": "female",
        "views": "20K",
        "mood": "Sitar strings tracing a wistful Bhairavi dhun as the world slowly wakes."
      },
      {
        "raga": "Ramkali",
        "artist": "Pandit Bhimsen Joshi",
        "videoId": "-nTdi-rMgVQ",
        "gender": "male",
        "views": "250K",
        "mood": "Ancient and yearning — a booming voice opening the rare morning raga Ramkali in slow vilambit."
      },
      {
        "raga": "Bhairav",
        "artist": "Ustad Rashid Khan",
        "videoId": "b0dm0th5bnY",
        "gender": "male",
        "views": "350K",
        "mood": "Grand and resonant — the Rampur-Sahaswan master greeting sunrise with commanding Bhairav."
      },
      {
        "raga": "Bhairav",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "ARl1OlQoBzg",
        "gender": "male",
        "views": "80K",
        "mood": "The Banaras brothers' stately Bhairav khayal — grave, devotional dawn."
      },
      {
        "raga": "Lalit",
        "artist": "Pandit Bhimsen Joshi",
        "videoId": "J0IgCdLIseE",
        "gender": "male",
        "views": "120K",
        "mood": "Lalit's aching pre-dawn twilight, poised between night and morning."
      },
      {
        "raga": "Bhairav",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "3m63XbhE-rc",
        "gender": "male",
        "views": "40K",
        "mood": "The brothers open Dover Lane 2019 with Bhairav — grave, unhurried, exactly at dawn."
      },
      {
        "raga": "Vibhas",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "vBPYPhu7Gm8",
        "gender": "male",
        "views": "20K",
        "mood": "A rarer first-light raga, sung in Bangalore with the stillness Vibhas asks for."
      },
      {
        "raga": "Ramkali",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "Q02ZR_LNyUY",
        "gender": "male",
        "views": "15K",
        "mood": "Ramkali at daybreak — Bhairav's restless cousin, tightening as the sky turns."
      },
      {
        "raga": "Bhatiyar",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "ZMt77uS-vTE",
        "gender": "male",
        "views": "25K",
        "mood": "Bhatiyar in the last dark hour, the raga sung before the sun has quite committed."
      },
      {
        "raga": "Bhairavi",
        "artist": "Pt. Sajan Mishra & Swaransh Mishra",
        "videoId": "n1a6WP5huYA",
        "gender": "male",
        "views": "18K",
        "mood": "Sajan Mishra with his son Swaransh — Bhairavi as the traditional closing benediction."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ajoy Chakrabarty",
        "videoId": "PL5bTHFLCbo",
        "gender": "male",
        "views": "331K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Arati Ankalikar-Tikekar",
        "videoId": "-GlRSm__PjU",
        "gender": "female",
        "views": "14K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Agra / Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Bade Ghulam Ali Khan",
        "videoId": "YbZWV15k2MI",
        "gender": "male",
        "views": "997K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana."
      },
      {
        "raga": "Jangla Bhairavi",
        "artist": "Bade Ghulam Ali Khan",
        "videoId": "wX0hDA6u2Kw",
        "gender": "male",
        "views": "273K",
        "mood": "A brisk, festive Bhairavi, closer to celebration than farewell. Khayal, Patiala gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Begum Akhtar",
        "videoId": "DDpKShAFwaA",
        "gender": "female",
        "views": "2.1M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical."
      },
      {
        "raga": "Bhairavi",
        "artist": "Begum Akhtar",
        "videoId": "B6noCddu-7g",
        "gender": "female",
        "views": "1.3M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical."
      },
      {
        "raga": "Bhairavi",
        "artist": "Begum Parveen Sultana",
        "videoId": "n17Id8Cjzqs",
        "gender": "female",
        "views": "188K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Begum Parveen Sultana",
        "videoId": "XD9TSbEQpwU",
        "gender": "female",
        "views": "151K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Bhimsen Joshi",
        "videoId": "4rs7dG-0WcE",
        "gender": "male",
        "views": "12.1M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Devaki Pandit",
        "videoId": "jfEXYvSmpks",
        "gender": "female",
        "views": "126K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Jogiya",
        "artist": "Gangubai Hangal",
        "videoId": "OGqLBpoj_DQ",
        "gender": "female",
        "views": "73K",
        "mood": "The mendicant's raga, sung as the light comes up. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhairav",
        "artist": "Gangubai Hangal",
        "videoId": "JwqucNCXlAA",
        "gender": "female",
        "views": "14K",
        "mood": "Solemn and devotional, the classic raga to greet sunrise. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Girija Devi",
        "videoId": "8fW3b4OF6tk",
        "gender": "female",
        "views": "213K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Bhairavi",
        "artist": "Girija Devi",
        "videoId": "Cc1pjRZ9ztc",
        "gender": "female",
        "views": "156K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Bhairavi",
        "artist": "Hirabai Barodekar",
        "videoId": "TEsLpBxWrcM",
        "gender": "female",
        "views": "13K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Kala Ramnath",
        "videoId": "aVpRokrWUWU",
        "gender": "female",
        "views": "151K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On violin."
      },
      {
        "raga": "Bhairavi",
        "artist": "Kaushiki Chakraborty",
        "videoId": "-FuW2ZcgOmA",
        "gender": "female",
        "views": "13.2M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Kesarbai Kerkar",
        "videoId": "IX5cjrXMhec",
        "gender": "female",
        "views": "443K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Kesarbai Kerkar",
        "videoId": "yWWQJ5SCrWM",
        "gender": "female",
        "views": "89K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "M. Venkatesh Kumar",
        "videoId": "7uSg_dpobD8",
        "gender": "male",
        "views": "646K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Gwalior-Kirana gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Mallikarjun Mansur",
        "videoId": "s7rX67tNeD8",
        "gender": "male",
        "views": "52K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Lalit",
        "artist": "Mogubai Kurdikar",
        "videoId": "mOjbnYhfUHk",
        "gender": "female",
        "views": "4K",
        "mood": "Two madhyams pulling against each other in the last dark before dawn. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "N. Rajam",
        "videoId": "ivV7cX8z-EQ",
        "gender": "female",
        "views": "98K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On violin, in the gayaki ang."
      },
      {
        "raga": "Bhairavi",
        "artist": "Nikhil Banerjee",
        "videoId": "6UKoLTO8UyU",
        "gender": "male",
        "views": "221K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On sitar."
      },
      {
        "raga": "Bhairavi",
        "artist": "Omkarnath Thakur",
        "videoId": "gApWs6LO0Ww",
        "gender": "male",
        "views": "234K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Gwalior gharana."
      },
      {
        "raga": "Mishra Bhairavi",
        "artist": "Pandit Ram Narayan",
        "videoId": "7TWsIvJYiPs",
        "gender": "male",
        "views": "165K",
        "mood": "Bhairavi with borrowed notes, looser and more songlike. On sarangi."
      },
      {
        "raga": "Bhairavi",
        "artist": "Pandit Ram Narayan",
        "videoId": "X7fy-RZaHIk",
        "gender": "male",
        "views": "23K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On sarangi."
      },
      {
        "raga": "Bhairavi",
        "artist": "Prabha Atre",
        "videoId": "sRNg-v1Dg_4",
        "gender": "female",
        "views": "1.2M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Rajan & Sajan Mishra",
        "videoId": "IrfDg0cmMIg",
        "gender": "male",
        "views": "240K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Sung as a duet."
      },
      {
        "raga": "Sindhi Bhairavi",
        "artist": "Ravi Shankar",
        "videoId": "OVRZ64FBOcE",
        "gender": "male",
        "views": "180K",
        "mood": "A folk-leaning Bhairavi, warm and unguarded. On sitar."
      },
      {
        "raga": "Bhairavi",
        "artist": "Shobha Gurtu",
        "videoId": "l0Y_zLtv6wE",
        "gender": "female",
        "views": "60K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical."
      },
      {
        "raga": "Bhairavi",
        "artist": "Shruti Sadolikar",
        "videoId": "ax43IZgtNXo",
        "gender": "female",
        "views": "6K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Siddheshwari Devi",
        "videoId": "F8mgnKDChhA",
        "gender": "female",
        "views": "16K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Bhairavi",
        "artist": "Siddheshwari Devi",
        "videoId": "69gR5eIUwG8",
        "gender": "female",
        "views": "3K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ulhas Kashalkar",
        "videoId": "Ov1bygYy2CQ",
        "gender": "male",
        "views": "116K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Gwalior-Agra-Jaipur gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ustad Ali Akbar Khan",
        "videoId": "AvA-vog4srU",
        "gender": "male",
        "views": "309K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On sarod."
      },
      {
        "raga": "Sindhi Bhairavi",
        "artist": "Ustad Ali Akbar Khan",
        "videoId": "B6GcXBy1P3A",
        "gender": "male",
        "views": "62K",
        "mood": "A folk-leaning Bhairavi, warm and unguarded. On sarod."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ustad Amjad Ali Khan",
        "videoId": "23DVkaIaa_M",
        "gender": "male",
        "views": "234K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On sarod."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ustad Bismillah Khan",
        "videoId": "HPW--T34ELQ",
        "gender": "male",
        "views": "5.4M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On shehnai."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ustad Rashid Khan",
        "videoId": "DtMK9lTru74",
        "gender": "male",
        "views": "6M",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Rampur-Sahaswan gharana."
      },
      {
        "raga": "Bhairavi",
        "artist": "Ustad Vilayat Khan",
        "videoId": "hRVGUBYIiRU",
        "gender": "male",
        "views": "749K",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. On sitar."
      },
      {
        "raga": "Bhankar",
        "artist": "Ustad Vilayat Khan",
        "videoId": "Qim2av-SRwU",
        "gender": "male",
        "views": "148K",
        "mood": "A rare dawn raga, austere and little heard. On sitar."
      }
    ],
    "filmy": [
      {
        "song": "Mohe Bhool Gaye Sanwariya",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairav",
        "videoId": "hSserRefQCk",
        "mood": "Naushad's dawn lament in Bhairav — tender, aching devotion."
      },
      {
        "song": "Jago Mohan Pyare",
        "film": "Jagte Raho",
        "year": 1956,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairav",
        "videoId": "cFM7xqthtgM",
        "mood": "A luminous morning prayer in Bhairav, waking Krishna at first light."
      },
      {
        "song": "Bhor Bhaye Panghat Pe",
        "film": "Satyam Shivam Sundaram",
        "year": 1978,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairavi",
        "videoId": "a-iKo3fYgT8",
        "mood": "A Bhairavi thumri at the riverbank as morning breaks."
      },
      {
        "song": "Laaga Chunari Mein Daag",
        "film": "Dil Hi To Hai",
        "year": 1963,
        "artist": "Manna Dey",
        "raga": "Bhairavi",
        "videoId": "dYF356rIjhc",
        "mood": "Manna Dey's classical tour de force in Bhairavi, brimming with surrender."
      },
      {
        "song": "Tu Ganga Ki Mauj",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Mohammed Rafi, Lata Mangeshkar",
        "raga": "Bhairavi",
        "videoId": "T1a36ff7_m0",
        "mood": "Naushad's serene Bhairavi duet — the river and the morning as one."
      },
      {
        "song": "Mora Gora Ang Laile",
        "film": "Bandini",
        "year": 1963,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairavi",
        "videoId": "WmsTsSdms2o",
        "mood": "S.D. Burman & Gulzar's Bhairavi — a moonlit-to-dawn plea, tender and shy."
      },
      {
        "song": "Aayo Prabhat Sab Mil Gao",
        "film": "Sur Sangam",
        "year": 1985,
        "artist": "Pt. Rajan & Sajan Mishra, S. Janaki",
        "raga": "Bhatiyar",
        "videoId": "AJRrUAC9OLs",
        "mood": "The Mishra brothers' film playback — Bhatiyar greeting the very first light."
      },
      {
        "song": "Humein Tumse Pyar Kitna",
        "film": "Kudrat",
        "year": 1981,
        "artist": "Begum Parveen Sultana",
        "raga": "Mishra Bhairavi",
        "videoId": "79g8SRTozZU",
        "mood": "Parveen Sultana's towering Mishra Bhairavi — classical grandeur poured into a film love song."
      },
      {
        "song": "Ka Karoon Sajni Aaye Na Balam",
        "film": "Swami",
        "year": 1977,
        "artist": "K.J. Yesudas",
        "raga": "Bhairavi",
        "videoId": "5h4JxqgnymQ",
        "mood": "Yesudas in a Bhairavi thumri — a bride's morning ache that the beloved hasn't come."
      },
      {
        "song": "Ghar Aaya Mera Pardesi",
        "film": "Awara",
        "year": 1951,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairavi",
        "videoId": "PaXVU-DNqf0",
        "mood": "Shankar-Jaikishan's dream-sequence Bhairavi — the wanderer home at daybreak."
      },
      {
        "song": "Insaaf Ka Mandir Hai",
        "film": "Amar",
        "year": 1954,
        "artist": "Mohammed Rafi",
        "raga": "Bhairavi",
        "videoId": "E6D30Gl6NUU",
        "mood": "Naushad's Bhairavi hymn — this is the temple of justice, God's own house."
      },
      {
        "song": "Hothon Pe Sachhai Rehti Hai",
        "film": "Jis Desh Mein Ganga Behti Hai",
        "year": 1960,
        "artist": "Mukesh",
        "raga": "Bhairavi",
        "videoId": "wdbudoa5018",
        "mood": "Shankar-Jaikishan's Bhairavi — a morning creed of honesty and open hearts."
      },
      {
        "song": "Hum Bhi Hain Tum Bhi Ho",
        "film": "Jis Desh Mein Ganga Behti Hai",
        "year": 1960,
        "artist": "Mukesh",
        "raga": "Bhairavi",
        "videoId": "Ej_iyN6B6Bs",
        "mood": "A gentle Bhairavi of togetherness under the open morning sky."
      },
      {
        "song": "Ek Dil Aur Sau Afsane",
        "film": "Ek Dil Sau Afsane",
        "year": 1963,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairavi",
        "videoId": "1GJYDWUQ3uU",
        "mood": "A tender Bhairavi — one heart and a hundred tales, told at dawn."
      },
      {
        "song": "Is Bhari Duniya Mein",
        "film": "Bharosa",
        "year": 1963,
        "artist": "Mohammed Rafi",
        "raga": "Bhairavi",
        "videoId": "up4Gkxb66ac",
        "mood": "Ravi's plaintive Bhairavi — alone in a crowded world as morning breaks."
      },
      {
        "song": "Ek Tara Bole",
        "film": "Yaadgar",
        "year": 1970,
        "artist": "Mahendra Kapoor",
        "raga": "Bhairavi",
        "videoId": "MHlJ5DmPP-0",
        "mood": "A one-stringed ektara ringing a simple Bhairavi truth at first light."
      },
      {
        "song": "Aye Maalik Tere Bande Hum",
        "film": "Do Aankhen Barah Haath",
        "year": 1957,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairav",
        "videoId": "fFc9TMxRbQg",
        "mood": "Vasant Desai's Bhairav prayer — the dawn hymn of the redeemed, seeking strength and grace."
      },
      {
        "song": "Man Re Hari Ke Gun Ga",
        "film": "Musafir",
        "year": 1957,
        "artist": "Lata Mangeshkar",
        "raga": "Bhairav",
        "videoId": "c8QV1EJnK_E",
        "mood": "Salil Chowdhury's Bhairav — a morning call to the mind to sing the Lord's praise."
      },
      {
        "song": "Main Ek Raja Hoon",
        "film": "Uphaar",
        "year": 1971,
        "artist": "Mohammed Rafi",
        "raga": "Bhairav",
        "videoId": "8gCpXojxo_4",
        "mood": "Laxmikant-Pyarelal's Bhairav — a bright, playful morning of young romance."
      },
      {
        "song": "Abhang",
        "artist": "Arati Ankalikar-Tikekar",
        "videoId": "fsZpoMBxWhM",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Agra / Jaipur-Atrauli gharana.",
        "raga": "Bhairavi"
      },
      {
        "song": "Marathi Abhang",
        "artist": "Devaki Pandit",
        "videoId": "OeE6xk1Z2Zw",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana.",
        "raga": "Bhairavi"
      },
      {
        "song": "Avagha Rang Ek Jhala",
        "artist": "Kishori Amonkar",
        "videoId": "y0FjfEL6Cak",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Jaipur-Atrauli gharana.",
        "raga": "Bhairavi"
      },
      {
        "song": "Meera bhajan in Bhairavi",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "UXKrTuXOnDI",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Jaipur-Atrauli gharana.",
        "raga": "Bhairavi"
      },
      {
        "song": "Humein Tumse Pyar Kitna",
        "artist": "Begum Parveen Sultana",
        "videoId": "w-BbWJx05hg",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Patiala gharana.",
        "raga": "Bhairavi"
      },
      {
        "song": "Indrayani Kathi",
        "artist": "Bhimsen Joshi",
        "videoId": "I_QZVQ-3EG8",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Kirana gharana."
      },
      {
        "song": "Jo Bhaje Hari Ko Sada",
        "artist": "Bhimsen Joshi",
        "videoId": "EqlYN2hHYtY",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Kirana gharana."
      },
      {
        "song": "Jab Jankinath Sahay",
        "artist": "D. V. Paluskar",
        "videoId": "jpD-WR2hc5w",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Gwalior gharana."
      },
      {
        "song": "Barse Badariya Sawan Ki",
        "artist": "Devaki Pandit",
        "videoId": "AUIK9LFHJFY",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "song": "Babul Mora",
        "artist": "Kaushiki Chakraborty",
        "videoId": "kRRVvgFNd54",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Patiala gharana."
      },
      {
        "song": "Bolava Vitthal",
        "artist": "Kishori Amonkar",
        "videoId": "60xmh6lLIEQ",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "song": "Payoji Maine Ram Ratan Dhan Paayo",
        "artist": "M. Venkatesh Kumar",
        "videoId": "STMk3vvbVMM",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Gwalior-Kirana gharana."
      },
      {
        "song": "Govind Damodar Madhaveti",
        "artist": "Pandit Jasraj",
        "videoId": "NVE2qeBYvb4",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Mewati gharana."
      },
      {
        "song": "Om Namo Bhagavate Vasudevaya",
        "artist": "Pandit Jasraj",
        "videoId": "tujcCI6MLD0",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Mewati gharana."
      },
      {
        "song": "Mero Allah Meherban",
        "artist": "Pandit Jasraj",
        "videoId": "Rrg3iH37Gvg",
        "mood": "An early-morning piece, sung as the light arrives. Khayal, Mewati gharana."
      },
      {
        "song": "Ab Kripa Karo Shri Ram",
        "artist": "Rajan & Sajan Mishra",
        "videoId": "UqXStkfDsq0",
        "mood": "An early-morning piece, sung as the light arrives. Sung as a duet."
      },
      {
        "song": "Mangal Dhwani",
        "artist": "Ustad Bismillah Khan",
        "videoId": "-1BnrjyIoMs",
        "mood": "An early-morning piece, sung as the light arrives. On shehnai."
      },
      {
        "song": "Allah Hi Raham",
        "artist": "Ustad Rashid Khan",
        "videoId": "WgIBgC3a4Vs",
        "mood": "The raga that traditionally closes a concert — tender, resigned, all twelve notes in play. Khayal, Rampur-Sahaswan gharana.",
        "raga": "Bhairavi"
      }
    ]
  },
  {
    "id": 1,
    "start": 7,
    "end": 10,
    "time": "7:00 AM – 10:00 AM",
    "label": "Morning",
    "familyRaga": "Ahir Bhairav",
    "mood": "Warm and awakening, blending Bhairav with softer Kafi shades.",
    "options": [
      {
        "raga": "Ahir Bhairav",
        "artist": "Kaushiki Chakraborty",
        "videoId": "jNdHo4mx1Kg",
        "gender": "female",
        "views": "120K",
        "mood": "Warm and awakening, blending Bhairav with softer Kafi shades."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Kaushiki Chakraborty (Live)",
        "videoId": "Me3qpbOLOnA",
        "gender": "female",
        "views": "80K",
        "mood": "A live concert reading of Ahir Bhairav, tender and unhurried."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Veena Sahasrabuddhe (Sacred)",
        "videoId": "zQsGxqCXKw8",
        "gender": "female",
        "views": "45K",
        "mood": "A hushed, devotional Ahir Bhairav for the early working hours."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "omg68kVb05I",
        "gender": "female",
        "views": "35K",
        "mood": "\"Ghat ghat mein panchhi bolta\" — Ahir Bhairav sung with quiet clarity."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Ragini Shankar & Nandini Shankar (violin)",
        "videoId": "ouXgSMlyht4",
        "gender": "female",
        "views": "50K",
        "mood": "Twin violins sing Ahir Bhairav in the gayaki, voice-like style."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Ragini Shankar & Nandini Shankar (violin)",
        "videoId": "OG9XVsYLK_k",
        "gender": "female",
        "views": "40K",
        "mood": "A second take of the sisters' violin duet in Ahir Bhairav."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Sanjeev Abhyankar",
        "videoId": "bT_uiHdLU3Y",
        "gender": "male",
        "views": "60K",
        "mood": "Bilaskhani Todi's blend of Todi and Asavari, grave and searching."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Archana Kamath Shenoy",
        "videoId": "boI5Vh9caNQ",
        "gender": "female",
        "views": "20K",
        "mood": "A disciple's recital of Bilaskhani Todi, patient and sincere."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Ustad Rashid Khan",
        "videoId": "e7xwX1-7zq4",
        "gender": "male",
        "views": "90K",
        "mood": "Rashid Khan's Bilaskhani Todi, aching and richly ornamented."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "oiGsDOnTGIE",
        "gender": "female",
        "views": "70K",
        "mood": "Warm and searching — a 1986 archival recording steeped in quiet devotion."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Kishori Amonkar",
        "videoId": "q_yo0SELmVg",
        "gender": "female",
        "views": "400K",
        "mood": "Luminous and exacting — a legendary voice tracing every microtone of the dawn raga."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Pt. Hariprasad Chaurasia (flute)",
        "videoId": "6XgzuEVtcDc",
        "gender": "male",
        "views": "500K",
        "mood": "Breath turned to melody — the bansuri's soft ache carrying Ahir Bhairav into daybreak."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "SsQiQ38HZV4",
        "gender": "female",
        "views": "80K",
        "mood": "Deep and introspective, Bilaskhani Todi's grave beauty easing the day awake."
      },
      {
        "raga": "Gujari Todi",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "TnJpvbOWxYI",
        "gender": "female",
        "views": "40K",
        "mood": "Grave and tender, Gujari Todi unfurls slowly like early light through mist."
      },
      {
        "raga": "Todi",
        "artist": "Manjiri Asnare Kelkar",
        "videoId": "hu-HNaNd_oY",
        "gender": "female",
        "views": "15K",
        "mood": "Serene and searching, a mid-morning Todi that lingers in quiet contemplation."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Nandini Shankar (violin)",
        "videoId": "c9XOUdYVENo",
        "gender": "female",
        "views": "60K",
        "mood": "The violin sings Ahir Bhairav's devotional ache, bright yet wistful at sunrise."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Malini Rajurkar",
        "videoId": "QbZiUBaxIXQ",
        "gender": "female",
        "views": "25K",
        "mood": "Warm and grounded, a Gwalior-gharana Ahir Bhairav steeped in devotion."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Arati Ankalikar Tikekar",
        "videoId": "16bdKIHWIKU",
        "gender": "female",
        "views": "30K",
        "mood": "Luminous and gentle, greeting the sun with Bhairav's calm resolve."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Kishori Amonkar",
        "videoId": "sKZKCpcQ9rw",
        "gender": "female",
        "views": "200K",
        "mood": "Ethereal and emotive, the Gaansaraswati's Ahir Bhairav glows with quiet longing."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Kishori Amonkar",
        "videoId": "2aO4wDSqDbU",
        "gender": "female",
        "views": "150K",
        "mood": "Hauntingly beautiful, a vintage Bilaskhani Todi steeped in devotional stillness."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Ustad Rashid Khan",
        "videoId": "ZP_-9jupxz8",
        "gender": "male",
        "views": "500K",
        "mood": "Playful yet devotional, a beloved Ahir Bhairav bandish welcoming the morning."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Pandit Sanjeev Abhyankar",
        "videoId": "VgqOGBv78_8",
        "gender": "male",
        "views": "70K",
        "mood": "Bright and prayerful, unfolding Ahir Bhairav's blend of Bhairav gravity and Kafi warmth."
      },
      {
        "raga": "Miyan ki Todi",
        "artist": "Pandit Ulhas Kashalkar",
        "videoId": "szqbcnL5n3A",
        "gender": "male",
        "views": "40K",
        "mood": "Meditative and majestic, Miyan ki Todi's slow unfolding suits the quiet late morning."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Pandit Bhimsen Joshi",
        "videoId": "Qc1B8lzcVHc",
        "gender": "male",
        "views": "300K",
        "mood": "Robust and radiant, the maestro's Ahir Bhairav carries morning devotion in full voice."
      },
      {
        "raga": "Gujari Todi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "PdWenqMtpas",
        "gender": "male",
        "views": "40K",
        "mood": "A searching Gujari Todi, morning light filtered through longing."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Kishori Amonkar",
        "videoId": "KoMfFkoNSj4",
        "gender": "female",
        "views": "90K",
        "mood": "A vintage Jaunpuri (1967) — the plaintive settle of full morning."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "XI3Mlwjc4Is",
        "gender": "male",
        "views": "40K",
        "mood": "Bilaskhani Todi — Todi's grave beauty softened with Asavari, mid-morning."
      },
      {
        "raga": "Todi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "9roJd2ADRzg",
        "gender": "male",
        "views": "30K",
        "mood": "Full-length Todi from the Baroda baithak — the mid-morning raga at its most austere."
      },
      {
        "raga": "Bilaskhani Todi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "tCIK4uyklFo",
        "gender": "male",
        "views": "35K",
        "mood": "'Kanha Re' in Bilaskhani Todi, a restored archival recording, plaintive and soft-edged."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Ajoy Chakrabarty",
        "videoId": "UmIP9wjVO7A",
        "gender": "male",
        "views": "168K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. Khayal, Patiala gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Ajoy Chakrabarty",
        "videoId": "42kk7AbA9NI",
        "gender": "male",
        "views": "147K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Patiala gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Arati Ankalikar-Tikekar",
        "videoId": "KTJ2TCUv-fg",
        "gender": "female",
        "views": "41K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Agra / Jaipur-Atrauli gharana."
      },
      {
        "raga": "Todi",
        "artist": "Arati Ankalikar-Tikekar",
        "videoId": "E3od5CvZUZQ",
        "gender": "female",
        "views": "8K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Khayal, Agra / Jaipur-Atrauli gharana."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "3xSsJ9GC6lQ",
        "gender": "female",
        "views": "265K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "BxNYA-2uNVc",
        "gender": "female",
        "views": "170K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Miyan ki Todi",
        "artist": "Bhimsen Joshi",
        "videoId": "FBD5lVdyMss",
        "gender": "male",
        "views": "618K",
        "mood": "Todi at its most classical and most demanding. Khayal, Kirana gharana."
      },
      {
        "raga": "Desi",
        "artist": "D. V. Paluskar",
        "videoId": "SZaevf3ssHg",
        "gender": "male",
        "views": "92K",
        "mood": "A morning raga with an Asavari shadow over it. Khayal, Gwalior gharana."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Gangubai Hangal",
        "videoId": "qV_vlpjZFb8",
        "gender": "female",
        "views": "38K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. Khayal, Kirana gharana."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Hariprasad Chaurasia",
        "videoId": "9GlMrtTfSD0",
        "gender": "male",
        "views": "672K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. On bansuri."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Kaushiki Chakraborty",
        "videoId": "Romd0o4x6V4",
        "gender": "female",
        "views": "132K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. Khayal, Patiala gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Kesarbai Kerkar",
        "videoId": "Tap0Z-ul2II",
        "gender": "female",
        "views": "12K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Kishori Amonkar",
        "videoId": "0uKxkzfcF8c",
        "gender": "female",
        "views": "57K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Miyan ki Todi",
        "artist": "M. Venkatesh Kumar",
        "videoId": "wQhkNikrWuw",
        "gender": "male",
        "views": "133K",
        "mood": "Todi at its most classical and most demanding. Khayal, Gwalior-Kirana gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Mallikarjun Mansur",
        "videoId": "wYnXdKHyxHM",
        "gender": "male",
        "views": "54K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Todi",
        "artist": "Mallikarjun Mansur",
        "videoId": "SOUUrQRWP20",
        "gender": "male",
        "views": "26K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Todi",
        "artist": "Manjiri Asanare-Kelkar",
        "videoId": "zabqh-UEpUY",
        "gender": "female",
        "views": "6K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Manjiri Asanare-Kelkar",
        "videoId": "L6I_DlehbcU",
        "gender": "female",
        "views": "1K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Miyan ki Todi",
        "artist": "N. Rajam",
        "videoId": "ajtglYDxIxs",
        "gender": "female",
        "views": "102K",
        "mood": "Todi at its most classical and most demanding. On violin, in the gayaki ang."
      },
      {
        "raga": "Todi",
        "artist": "Omkarnath Thakur",
        "videoId": "kfixXONN_0o",
        "gender": "male",
        "views": "6K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Khayal, Gwalior gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Padma Talwalkar",
        "videoId": "Y9Amq1VCqFo",
        "gender": "female",
        "views": "50K",
        "mood": "A mid-morning raga, plain-spoken and steady. Khayal, Gwalior / Jaipur gharana."
      },
      {
        "raga": "Jaunpuri",
        "artist": "Pandit Ram Narayan",
        "videoId": "QPFfTbvOKUw",
        "gender": "male",
        "views": "11K",
        "mood": "A mid-morning raga, plain-spoken and steady. On sarangi."
      },
      {
        "raga": "Todi",
        "artist": "Pandit Ram Narayan",
        "videoId": "Y_WThAVl7BI",
        "gender": "male",
        "views": "10K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. On sarangi."
      },
      {
        "raga": "Todi",
        "artist": "Rajan & Sajan Mishra",
        "videoId": "F2-GaZTeX_c",
        "gender": "male",
        "views": "131K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Sung as a duet."
      },
      {
        "raga": "Todi",
        "artist": "Shahid Parvez",
        "videoId": "oajvzGmVX2c",
        "gender": "male",
        "views": "226K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. On sitar."
      },
      {
        "raga": "Todi",
        "artist": "Shruti Sadolikar",
        "videoId": "SYrd0yC_bA0",
        "gender": "female",
        "views": "9K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Miyan ki Todi",
        "artist": "Ulhas Kashalkar",
        "videoId": "Dp83Ib9MKtk",
        "gender": "male",
        "views": "31K",
        "mood": "Todi at its most classical and most demanding. Khayal, Gwalior-Agra-Jaipur gharana."
      },
      {
        "raga": "Todi",
        "artist": "Ustad Vilayat Khan",
        "videoId": "kITVzkbAJsE",
        "gender": "male",
        "views": "804K",
        "mood": "The great morning raga — severe, unsettling, impossible to sing casually. On sitar."
      },
      {
        "raga": "Ahir Bhairav",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "wM125Su0VgM",
        "gender": "female",
        "views": "65K",
        "mood": "Morning gravity with a sweetness Bhairav never allows itself. Khayal, Gwalior gharana."
      }
    ],
    "filmy": [
      {
        "song": "Albela Sajan Aayo Re",
        "film": "Hum Dil De Chuke Sanam",
        "year": 1999,
        "artist": "Kavita Krishnamurthy, Shankar Mahadevan",
        "raga": "Ahir Bhairav",
        "videoId": "MCXQXuKpgKE",
        "mood": "Ismail Darbar's festive Ahir Bhairav — the morning of a joyous arrival."
      },
      {
        "song": "Poocho Na Kaise Maine",
        "film": "Meri Surat Teri Ankhen",
        "year": 1963,
        "artist": "Manna Dey",
        "raga": "Ahir Bhairav",
        "videoId": "mKksC_XKCGM",
        "mood": "S.D. Burman's Ahir Bhairav, a night passed in longing as dawn arrives."
      },
      {
        "song": "Meri Veena Tum Bin Roye",
        "film": "Dekh Kabira Roya",
        "year": 1957,
        "artist": "Lata Mangeshkar",
        "raga": "Ahir Bhairav",
        "videoId": "_V1I3xd-j2k",
        "mood": "Madan Mohan's Ahir Bhairav — a veena weeping softly into the dawn."
      },
      {
        "song": "Aaj Gaawat Man Mero",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Ustad Amir Khan & D.V. Paluskar",
        "raga": "Desi",
        "videoId": "LK1AhJyWofY",
        "mood": "A legendary jugalbandi in raga Desi — two titans trading morning phrases."
      },
      {
        "song": "Duniya Na Bhaye Mohe",
        "film": "Basant Bahar",
        "year": 1956,
        "artist": "Mohammed Rafi",
        "raga": "Miyan ki Todi",
        "videoId": "6aSZl22CFiQ",
        "mood": "A Miyan ki Todi plea — 'the world holds nothing for me' — grave morning renunciation."
      },
      {
        "song": "Aapne Jeevan Ki Uljhan Ko",
        "film": "Uljhan",
        "year": 1975,
        "artist": "Kishore Kumar",
        "raga": "Ahir Bhairav",
        "videoId": "eLxh9njV6Co",
        "mood": "Kalyanji-Anandji's Ahir Bhairav — untangling life's knots in the morning light."
      },
      {
        "song": "Chalo Man Jayen Ghar Aapne",
        "film": "Swami Vivekananda",
        "year": 1994,
        "artist": "K.J. Yesudas",
        "raga": "Ahir Bhairav",
        "videoId": "_MrdDBW6Eh0",
        "mood": "Salil Chowdhury's Ahir Bhairav — Yesudas calling the soul homeward at dawn."
      },
      {
        "song": "Dheere Dheere Subah Hui",
        "film": "Haisiyat",
        "year": 1984,
        "artist": "K.J. Yesudas",
        "raga": "Ahir Bhairav",
        "videoId": "iS7lZjF4eFI",
        "mood": "Bappi Lahiri's Ahir Bhairav — slowly the morning breaks and life stirs awake."
      }
    ]
  },
  {
    "id": 2,
    "start": 10,
    "end": 13,
    "time": "10:00 AM – 1:00 PM",
    "label": "Late Morning",
    "familyRaga": "Bilawal",
    "mood": "Bright, natural-scale ragas full of ease and quiet devotion.",
    "options": [
      {
        "raga": "Bilawal",
        "artist": "Kishori Amonkar",
        "videoId": "HfpHaA1bOJQ",
        "gender": "female",
        "views": "110K",
        "mood": "Bright, natural-scale raga full of ease and quiet devotion."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Gauri Pathare",
        "videoId": "DQLb1N-_OQc",
        "gender": "female",
        "views": "20K",
        "mood": "A peaceful Alhaiya Bilawal recital, unhurried and clear-toned."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Padma Talwalkar",
        "videoId": "5DYlQ61PEJI",
        "gender": "female",
        "views": "30K",
        "mood": "Padma Talwalkar's Alhaiya Bilawal, full of Jaipur-Atrauli poise."
      },
      {
        "raga": "Sukhiya Bilawal",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "Nah7QC5YuOs",
        "gender": "female",
        "views": "45K",
        "mood": "A rarer Sukhiya Bilawal, gentle and devotional in tone."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "8Up3mDURDYk",
        "gender": "female",
        "views": "55K",
        "mood": "An effortless, sunlit Alhaiya Bilawal from the Jaipur-Atrauli gharana."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Kishori Amonkar",
        "videoId": "FfC5BspAH8w",
        "gender": "female",
        "views": "120K",
        "mood": "Bright, natural-scale raga full of ease and quiet devotion."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Kishori Amonkar",
        "videoId": "my5Zh8ze3eY",
        "gender": "female",
        "views": "70K",
        "mood": "Sun-warmed phrases unfolding with unhurried, meditative grace."
      },
      {
        "raga": "Devgiri Bilawal",
        "artist": "Kishori Amonkar",
        "videoId": "4pJKKMYfN00",
        "gender": "female",
        "views": "45K",
        "mood": "A deeper shade of Bilawal, serene and softly contemplative."
      },
      {
        "raga": "Shukla Bilawal",
        "artist": "Kishori Amonkar",
        "videoId": "Dr4kmlCKiP0",
        "gender": "female",
        "views": "35K",
        "mood": "Clear, uncluttered tones evoking the plain daylight calm of late morning."
      },
      {
        "raga": "Devgiri Bilawal",
        "artist": "Gangubai Hangal",
        "videoId": "HLspXDwblWw",
        "gender": "female",
        "views": "40K",
        "mood": "A vintage, robust voice carrying the steady warmth of a settled morning sun."
      },
      {
        "raga": "Bihagara",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "K0eXpE1OjI4",
        "gender": "female",
        "views": "80K",
        "mood": "Gentle, sweetly lilting melody that lingers like unhurried midday light."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Vrushali Deshmukh",
        "videoId": "GuQCg7PndHY",
        "gender": "female",
        "views": "6K",
        "mood": "Fresh and open-hearted, radiating the easy brightness of a clear late morning."
      },
      {
        "raga": "Shukla Bilawal",
        "artist": "Manjiri Asnare Kelkar",
        "videoId": "csHEKoz1W7g",
        "gender": "female",
        "views": "15K",
        "mood": "Pure and untroubled, a raga as simple and luminous as midday sky."
      },
      {
        "raga": "Devgiri Bilawal",
        "artist": "Nandini Bedekar",
        "videoId": "W7D2DxqZGX0",
        "gender": "female",
        "views": "8K",
        "mood": "Steady, devotional phrasing that settles the mind into calm daylight ease."
      },
      {
        "raga": "Devgiri Bilawal",
        "artist": "Shashwati Mandal",
        "videoId": "3mVtWjHMADs",
        "gender": "female",
        "views": "6K",
        "mood": "Soft-edged and reflective, carrying the quiet dignity of late-morning stillness."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Gauri Pathare",
        "videoId": "Cc-lOVj62vM",
        "gender": "female",
        "views": "10K",
        "mood": "Playful yet grounded, full of the unforced brightness of a sunlit late morning."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Ustad Rashid Khan",
        "videoId": "mGobQ9ztOnY",
        "gender": "male",
        "views": "150K",
        "mood": "Rich, resonant taans that bloom like the sun climbing steadily overhead."
      },
      {
        "raga": "Bilawal",
        "artist": "Pt. Ajoy Chakraborty",
        "videoId": "ZYQITiocNfk",
        "gender": "male",
        "views": "60K",
        "mood": "Foundational and radiant, the thaat's natural notes glowing with easeful clarity."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Pandit Jasraj & Ustad Sheikh Dawood",
        "videoId": "YkYb_1C_-Gw",
        "gender": "male",
        "views": "90K",
        "mood": "Warm, devotional depth wrapped in the bright openness of a late-morning raga."
      },
      {
        "raga": "Devgiri Bilawal",
        "artist": "Pt. Ulhas Kashalkar",
        "videoId": "WxiriOQHULY",
        "gender": "male",
        "views": "40K",
        "mood": "Measured and luminous, unfolding with the composed brightness of high sun."
      },
      {
        "raga": "Alhaiya Bilawal",
        "artist": "Ustad Nisar Hussain Khan",
        "videoId": "RBy5ISn7ego",
        "gender": "male",
        "views": "20K",
        "mood": "Traditional and unhurried, carrying forward a lineage of sunlit devotion."
      },
      {
        "raga": "Gaud Sarang",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "yb9jivq1n_M",
        "gender": "female",
        "views": "25K",
        "mood": "Gaud Sarang's zigzag melody, sunlight climbing toward noon."
      },
      {
        "raga": "Shuddh Sarang",
        "artist": "Pandit Bhimsen Joshi",
        "videoId": "sqoMYQhpgCE",
        "gender": "male",
        "views": "70K",
        "mood": "Shuddh Sarang's bright, thirsty midday climb toward noon."
      },
      {
        "raga": "Gaud Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "GSq3mZgn71w",
        "gender": "male",
        "views": "22K",
        "mood": "Gaud Sarang's zig-zag phrases in duet — late-morning brightness with a curl in it."
      },
      {
        "raga": "Shuddh Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "XDCf5jpS2KU",
        "gender": "male",
        "views": "20K",
        "mood": "'Ab mori baat maan le' — Shuddh Sarang pressing toward noon."
      },
      {
        "raga": "Shuddh Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "j0FTmlZRe1s",
        "gender": "male",
        "views": "14K",
        "mood": "A second Shuddh Sarang, broader and more expansive in the alaap."
      },
      {
        "raga": "Shankara",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "_BO2kkfJMvk",
        "gender": "male",
        "views": "18K",
        "mood": "Shankara sung wide and heroic, the way the Benares brothers liked it."
      }
    ],
    "filmy": [
      {
        "song": "Jyoti Kalash Chhalke",
        "film": "Bhabhi Ki Chudiyan",
        "year": 1961,
        "artist": "Lata Mangeshkar",
        "raga": "Deshkar",
        "videoId": "oUXF9Xc6k7c",
        "mood": "A radiant Deshkar bhajan — the late-morning light spilling like a lamp."
      },
      {
        "song": "Raina Beeti Jaye",
        "film": "Amar Prem",
        "year": 1972,
        "artist": "Lata Mangeshkar",
        "raga": "Todi",
        "videoId": "_UqpW8YE994",
        "mood": "R.D. Burman's Todi-tinged classic, the mid-morning ache of waiting."
      },
      {
        "song": "Sare Ke Sare Ga Ma Ko Lekar",
        "film": "Parichay",
        "year": 1972,
        "artist": "Kishore Kumar, Asha Bhosle",
        "raga": "Alhaiya Bilawal",
        "videoId": "l8vUzE3dt24",
        "mood": "R.D. Burman's bright Alhaiya Bilawal — a sunlit late-morning romp up the scale."
      },
      {
        "song": "Dil Hai Chhota Sa (Chhoti Si Aasha)",
        "film": "Roja",
        "year": 1992,
        "artist": "Minmini",
        "raga": "Alhaiya Bilawal",
        "videoId": "P2s1Cl23oik",
        "mood": "A.R. Rahman's Alhaiya Bilawal — open, hopeful, the full light of morning."
      },
      {
        "song": "Bhor Aayi Gaya Andhiyara",
        "film": "Bawarchi",
        "year": 1972,
        "artist": "Manna Dey, Kishore Kumar",
        "raga": "Alhaiya Bilawal",
        "videoId": "MB_1iDS6_vY",
        "mood": "Madan Mohan's first-prahar Alhaiya Bilawal — dawn done, the day begun."
      },
      {
        "song": "Meera & Kabir in Shuddh Sarang",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "8W3jFs8rxXA",
        "mood": "A piece for the last watch of the night. Khayal, Gwalior gharana.",
        "raga": "Shuddh Sarang"
      }
    ]
  },
  {
    "id": 3,
    "start": 13,
    "end": 16,
    "time": "1:00 PM – 4:00 PM",
    "label": "Afternoon",
    "familyRaga": "Bhimpalasi",
    "mood": "The pangs of longing for a distant lover — the classic afternoon raga family.",
    "options": [
      {
        "raga": "Bhimpalasi",
        "artist": "Ustad Shahid Parvez Khan (sitar)",
        "videoId": "ZZYscSfriVA",
        "gender": "male",
        "views": "130K",
        "mood": "The pangs of longing for a distant lover — the classic afternoon raga."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Kaushiki Chakraborty",
        "videoId": "uEqYzdz3Zvg",
        "gender": "female",
        "views": "95K",
        "mood": "An exquisite Patiala-style Bhimpalasi for the warm afternoon hours."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Kishori Amonkar",
        "videoId": "uQghAGGP5fI",
        "gender": "female",
        "views": "85K",
        "mood": "Kishori Amonkar's Bhimpalasi, rich with shringar and restraint."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Shubha Mudgal",
        "videoId": "Yh8QfWlSv9Q",
        "gender": "female",
        "views": "70K",
        "mood": "A brilliant khayal reading of Bhimpalasi from the Darbar stage."
      },
      {
        "raga": "Multani",
        "artist": "Meeta Pandit",
        "videoId": "97Rm1ESDyCM",
        "gender": "female",
        "views": "30K",
        "mood": "Multani's Taj-Mahal-of-melody intensity, mesmerising in khayal."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Manjiri Asanare Kelkar",
        "videoId": "EW_S0lFPuAg",
        "gender": "female",
        "views": "25K",
        "mood": "A bandish in Bhimpalasi sung with Jaipur-Atrauli sweetness."
      },
      {
        "raga": "Patdeep",
        "artist": "Ustad Rashid Khan",
        "videoId": "P4UwqxAnWZs",
        "gender": "male",
        "views": "80K",
        "mood": "Patdeep's ache of longing and devotion, sung with aching clarity."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Kaushiki Chakraborty",
        "videoId": "7KgIZYk6MUM",
        "gender": "female",
        "views": "80K",
        "mood": "The pangs of longing for a distant lover — the classic afternoon raga, sung with aching warmth."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Shubha Mudgal",
        "videoId": "-MSrkw8wrUo",
        "gender": "female",
        "views": "60K",
        "mood": "A voice heavy with the golden languor of a slow afternoon and unspoken yearning."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "hHQELL2wVN4",
        "gender": "female",
        "views": "40K",
        "mood": "Sunlit ache and tender restraint, as if waiting by a window for someone who is late."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "CtOMuCa2yXo",
        "gender": "female",
        "views": "15K",
        "mood": "Slow, unhurried longing that settles like heat haze over a quiet midday courtyard."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Kishori Amonkar",
        "videoId": "MN7VkVPaytM",
        "gender": "female",
        "views": "150K",
        "mood": "The very soul of afternoon separation, rendered with fire and vulnerability."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Meeta Pandit",
        "videoId": "jzWvZV2KrhM",
        "gender": "female",
        "views": "20K",
        "mood": "A gentle plea folded into a Gwalior bandish, sung as the sun leans westward."
      },
      {
        "raga": "Multani",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "ira7tTr3VOo",
        "gender": "female",
        "views": "35K",
        "mood": "A wistful, searching raga that mirrors the restless stillness of the late afternoon."
      },
      {
        "raga": "Multani",
        "artist": "Indrani Mukherjee",
        "videoId": "MmUwHJAHkPo",
        "gender": "female",
        "views": "25K",
        "mood": "Bittersweet and introspective, like watching shadows lengthen with a heart full of memory."
      },
      {
        "raga": "Dhani",
        "artist": "Malini Rajurkar",
        "videoId": "gbiNh5KJi8o",
        "gender": "female",
        "views": "10K",
        "mood": "A lighter, playful cousin of Bhimpalasi — the teasing warmth of a lazy afternoon daydream."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Dr. N. Rajam (violin)",
        "videoId": "HX7_kGMghKc",
        "gender": "female",
        "views": "45K",
        "mood": "The violin sighs of sweet, romantic longing, tender as an afternoon promise made in whispers."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Pandit Hariprasad Chaurasia (flute)",
        "videoId": "nMo351735os",
        "gender": "male",
        "views": "90K",
        "mood": "Flute notes drift like warm afternoon air carrying the scent of a love not yet spoken."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Ustad Shahid Parvez Khan (sitar)",
        "videoId": "a7g1cluM1Mk",
        "gender": "male",
        "views": "30K",
        "mood": "Sitar phrases curl and linger, honeyed and unhurried, like the slow hours after midday."
      },
      {
        "raga": "Patdeep",
        "artist": "Pandit Ajoy Chakraborty",
        "videoId": "ZwkjYAAsfKc",
        "gender": "male",
        "views": "25K",
        "mood": "A devotional ache wrapped in afternoon quiet, tender and searching in equal measure."
      },
      {
        "raga": "Sindhura",
        "artist": "Ustad Ghulam Mustafa Khan",
        "videoId": "OzH99ZAg8rI",
        "gender": "male",
        "views": "20K",
        "mood": "Light and swaying, like a garden swing catching a warm afternoon breeze tinged with nostalgia."
      },
      {
        "raga": "Brindavani Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "2efM0j2KOyU",
        "gender": "male",
        "views": "30K",
        "mood": "Brindavani Sarang — the bright, open air of high noon."
      },
      {
        "raga": "Multani",
        "artist": "Pandit Venkatesh Kumar",
        "videoId": "QwONU9X5c5c",
        "gender": "male",
        "views": "150K",
        "mood": "A powerful Multani khayal — the heavy stillness of mid-afternoon."
      },
      {
        "raga": "Patdeep",
        "artist": "Pandit Nikhil Banerjee (sitar)",
        "videoId": "GEQYoyi-ARM",
        "gender": "male",
        "views": "110K",
        "mood": "Nikhil Banerjee's Patdeep on sitar — warm, restless afternoon."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "W_L5z376nG4",
        "gender": "male",
        "views": "45K",
        "mood": "The Komal Nishad Bhimpalasi — long, patient afternoon alaap from the brothers."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "4kWSpxIh5bM",
        "gender": "male",
        "views": "28K",
        "mood": "Bhimpalasi in duet, the raga of the drowsy hours after lunch."
      },
      {
        "raga": "Bhimpalasi",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "UF9SNOdzWJc",
        "gender": "male",
        "views": "16K",
        "mood": "'Pritam ki paati' — Bhimpalasi as a letter from a lover, mid-afternoon."
      },
      {
        "raga": "Dhani",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "65KjzkY2ut8",
        "gender": "male",
        "views": "20K",
        "mood": "Bhimpalasi giving way to Dhani and a Guru Nanak bhajan to close."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "f0RCB9vU0vo",
        "gender": "male",
        "views": "24K",
        "mood": "Madhuvanti's sharp madhyam aching through the late afternoon."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Pt. Sajan Mishra & Swaransh Mishra",
        "videoId": "DJuVDc1M1aE",
        "gender": "male",
        "views": "15K",
        "mood": "Sajan Mishra and Swaransh in Madhuvanti — the Benares line continuing."
      },
      {
        "raga": "Multani",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "EDlj5ScIvvY",
        "gender": "male",
        "views": "26K",
        "mood": "Multani as the afternoon tips toward dusk, komal notes weighted and slow."
      },
      {
        "raga": "Multani",
        "artist": "Pt. Rajan Mishra",
        "videoId": "3sWjti9w7LU",
        "gender": "male",
        "views": "20K",
        "mood": "Rajan Mishra solo in Multani, from the Sangeet Sartaj sessions."
      },
      {
        "raga": "Multani",
        "artist": "Pt. Rajan Mishra",
        "videoId": "zQpc3FQ5LvQ",
        "gender": "male",
        "views": "17K",
        "mood": "A studio Multani from Music Today's Afternoon Ragas series."
      },
      {
        "raga": "Brindavani Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "LOm4eIdiljU",
        "gender": "male",
        "views": "32K",
        "mood": "Brindavani Sarang in teentaal, live at Saptak — bright and midday-lit."
      },
      {
        "raga": "Brindavani Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "631uBD0OfOc",
        "gender": "male",
        "views": "19K",
        "mood": "'Langraiyya hum sang na karo' — the Sarang bandish everyone knows, in duet."
      },
      {
        "raga": "Brindavani Sarang",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "OEUb8mQbaVY",
        "gender": "male",
        "views": "14K",
        "mood": "Another Vrindavani Sarang from the Baroda concert, unhurried and open."
      },
      {
        "raga": "Sindhura",
        "artist": "Bade Ghulam Ali Khan",
        "videoId": "ZWmEGaOwuYE",
        "gender": "male",
        "views": "578K",
        "mood": "An afternoon raga that never strays far from folk song. Khayal, Patiala gharana."
      },
      {
        "raga": "Mishra Piloo",
        "artist": "Girija Devi",
        "videoId": "yw6NdsbRV58",
        "gender": "female",
        "views": "458K",
        "mood": "Piloo opened up further, with notes borrowed freely. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Multani",
        "artist": "Hirabai Barodekar",
        "videoId": "EkfR7yhpdtU",
        "gender": "female",
        "views": "5K",
        "mood": "Afternoon tipping toward dusk, komal notes weighted and slow. Khayal, Kirana gharana."
      },
      {
        "raga": "Madhuvanti",
        "artist": "Kala Ramnath",
        "videoId": "pdF4FvuDUVM",
        "gender": "female",
        "views": "21K",
        "mood": "A sharp madhyam aching through the late afternoon. On violin."
      },
      {
        "raga": "Multani",
        "artist": "Mogubai Kurdikar",
        "videoId": "gjP3AH0mU5Q",
        "gender": "female",
        "views": "3K",
        "mood": "Afternoon tipping toward dusk, komal notes weighted and slow. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Mishra Piloo",
        "artist": "Ravi Shankar",
        "videoId": "gD7x8s3gvOY",
        "gender": "male",
        "views": "100K",
        "mood": "Piloo opened up further, with notes borrowed freely. On sitar."
      },
      {
        "raga": "Multani",
        "artist": "Ulhas Kashalkar",
        "videoId": "XQ08AUh7MU0",
        "gender": "male",
        "views": "44K",
        "mood": "Afternoon tipping toward dusk, komal notes weighted and slow. Khayal, Gwalior-Agra-Jaipur gharana."
      },
      {
        "raga": "Multani",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "bv6Q9G9w0VA",
        "gender": "female",
        "views": "145K",
        "mood": "Afternoon tipping toward dusk, komal notes weighted and slow. Khayal, Gwalior gharana."
      }
    ],
    "filmy": [
      {
        "song": "Naino Mein Badra Chhaye",
        "film": "Mera Saaya",
        "year": 1966,
        "artist": "Lata Mangeshkar",
        "raga": "Bhimpalasi",
        "videoId": "AtgmPdSMG1U",
        "mood": "Madan Mohan's Bhimpalasi — a hazy afternoon heavy with memory."
      },
      {
        "song": "Rasm-e-Ulfat Ko Nibhaye",
        "film": "Dil Ki Rahen",
        "year": 1973,
        "artist": "Lata Mangeshkar",
        "raga": "Madhuvanti",
        "videoId": "DM0bS5iqx3M",
        "mood": "Madan Mohan's Madhuvanti ghazal — the wistful glow of a fading afternoon."
      },
      {
        "song": "Kuch Dil Ne Kaha",
        "film": "Anupama",
        "year": 1966,
        "artist": "Lata Mangeshkar",
        "raga": "Bhimpalasi",
        "videoId": "fwMCqvMe6bA",
        "mood": "Hemant Kumar's Bhimpalasi — a pensive afternoon reverie, half-spoken."
      },
      {
        "song": "Maine Chand Aur Sitaron Ki Tamanna Ki Thi",
        "film": "Chandrakanta",
        "year": 1956,
        "artist": "Mohammed Rafi",
        "raga": "Bhimpalasi",
        "videoId": "PQDVe7XL9t0",
        "mood": "N. Datta's Bhimpalasi — longing for the moon and stars in the afternoon heat."
      },
      {
        "song": "Sur Na Saje",
        "film": "Basant Bahar",
        "year": 1956,
        "artist": "Manna Dey",
        "raga": "Piloo",
        "videoId": "0jGUBOCmB_I",
        "mood": "Manna Dey's Pilu lament — 'the notes won't come together', an afternoon of doubt."
      },
      {
        "song": "Kehta Hai Mera Yeh Dil",
        "film": "Jeans",
        "year": 1998,
        "artist": "Kavita Krishnamurthy",
        "raga": "Bhimpalasi",
        "videoId": "pNgYZ2oovZU",
        "mood": "A.R. Rahman's Bhimpalasi — a bright, love-struck afternoon confession."
      },
      {
        "song": "Mere Man Ka Bawra Panchhi",
        "film": "Amardeep",
        "year": 1958,
        "artist": "Lata Mangeshkar",
        "raga": "Bhimpalasi",
        "videoId": "-4pp5EFPp_4",
        "mood": "C. Ramchandra's Bhimpalasi — the mind's restless bird in the afternoon heat."
      },
      {
        "song": "Man Mor Hua Matwala",
        "film": "Afsar",
        "year": 1950,
        "artist": "Suraiyya",
        "raga": "Bhimpalasi",
        "videoId": "o1lU_gqF3fs",
        "mood": "S.D. Burman's early Bhimpalasi — the heart dances, intoxicated by the day."
      },
      {
        "song": "Khanabadosh",
        "film": "London Dreams",
        "year": 2009,
        "artist": "Mohan Kannan",
        "raga": "Bhimpalasi",
        "videoId": "bMlOhcoXb68",
        "mood": "Shankar-Ehsaan-Loy's Bhimpalasi — a wandering afternoon restlessness."
      },
      {
        "song": "Samay O Dhire Chalo",
        "film": "Rudaali",
        "year": 1993,
        "artist": "Asha Bhosle",
        "raga": "Bhimpalasi",
        "videoId": "teRh44Pl_3g",
        "mood": "Bhupen Hazarika's chaste Bhimpalasi — time, walk slowly through the afternoon."
      },
      {
        "song": "O Nirdai Pritam",
        "film": "Stree",
        "year": 1961,
        "artist": "Lata Mangeshkar",
        "raga": "Bhimpalasi",
        "videoId": "FGl1WgKiX0E",
        "mood": "C. Ramchandra's restrained Bhimpalasi — a reproach to a heartless beloved."
      },
      {
        "song": "O Beqaraar Dil",
        "film": "Kohraa",
        "year": 1964,
        "artist": "Lata Mangeshkar",
        "raga": "Bhimpalasi",
        "videoId": "4ZlbYFEcJrg",
        "mood": "Hemant Kumar's Bhimpalasi — a restless heart in the languid afternoon."
      },
      {
        "song": "Zindagi Mein To Sabhi Pyar Kiya Karte Hain",
        "film": "Azmat",
        "year": 1973,
        "artist": "Mehdi Hassan",
        "raga": "Bhimpalasi",
        "videoId": "4dcIvP8_sRk",
        "mood": "Mehdi Hassan's Bhimpalasi ghazal — everyone loves, but few know how."
      }
    ]
  },
  {
    "id": 4,
    "start": 16,
    "end": 19,
    "time": "4:00 PM – 7:00 PM",
    "label": "Dusk",
    "familyRaga": "Puriya Dhanashri",
    "mood": "Grave and introspective, sung as day turns into evening.",
    "options": [
      {
        "raga": "Puriya Dhanashri",
        "artist": "Saylee Talwalkar",
        "videoId": "U-Ai6bI5D6k",
        "gender": "female",
        "views": "40K",
        "mood": "Grave and introspective, sung as day turns into evening."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Aishwarya Majmudar",
        "videoId": "cCWHglNcF0g",
        "gender": "female",
        "views": "35K",
        "mood": "A tanpura-session rendition of Puriya Dhanashri at twilight."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Pandit Rabin Ghosh (violin)",
        "videoId": "khVG2k-uZkI",
        "gender": "male",
        "views": "20K",
        "mood": "Violin traces Puriya Dhanashri's sandhiprakash mood of transition."
      },
      {
        "raga": "Puriya",
        "artist": "Ustad Rashid Khan (Live)",
        "videoId": "NJggXtEK70Q",
        "gender": "male",
        "views": "110K",
        "mood": "Pure Puriya, sung live with Rashid Khan's aching restraint."
      },
      {
        "raga": "Marwa",
        "artist": "Malini Rajurkar",
        "videoId": "iB4qfAty24k",
        "gender": "female",
        "views": "25K",
        "mood": "Marwa's unsettled, sunset-facing intensity in a classic recording."
      },
      {
        "raga": "Puriya Kalyan",
        "artist": "Kaushiki Chakraborty",
        "videoId": "DWLFnfaOL3s",
        "gender": "female",
        "views": "80K",
        "mood": "Grave and introspective, sung as day turns into evening."
      },
      {
        "raga": "Marwa",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "k7wEa1NnJ7s",
        "gender": "female",
        "views": "40K",
        "mood": "A hollow, searching sky-gaze rendered in slow, aching phrases as the sun dips low."
      },
      {
        "raga": "Sohni",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "vrktPyrexTA",
        "gender": "female",
        "views": "25K",
        "mood": "Restless longing wrapped in twilight stillness, each phrase reaching toward the fading light."
      },
      {
        "raga": "Marwa",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "fsSI34fOdUc",
        "gender": "female",
        "views": "15K",
        "mood": "A meditative hush settles in, the voice tracing the ache of a sun that refuses to set easily."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Saylee Talwalkar",
        "videoId": "__5s3F2B7Ec",
        "gender": "female",
        "views": "9K",
        "mood": "Tender and unresolved, like the last uncertain light before dusk gives way to dark."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Saylee Talwalkar",
        "videoId": "Di2WmLHRcNg",
        "gender": "female",
        "views": "7K",
        "mood": "Quiet devotion carried on slow, deliberate notes as the evening settles into stillness."
      },
      {
        "raga": "Marwa",
        "artist": "Kishori Amonkar",
        "videoId": "hXtMkpRPDUM",
        "gender": "female",
        "views": "150K",
        "mood": "Haunting and austere, a voice suspended between the ending afternoon and the coming night."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Shubha Mudgal",
        "videoId": "KN2jZfvJc9E",
        "gender": "female",
        "views": "30K",
        "mood": "Solemn and searching, the melody lingers on the threshold where day quietly surrenders to dusk."
      },
      {
        "raga": "Marwa",
        "artist": "Malini Rajurkar",
        "videoId": "7v9xNoiTaXY",
        "gender": "female",
        "views": "18K",
        "mood": "A weighty, unresolved yearning that mirrors the sky's slow fade from gold to grey."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Pandit Jasraj",
        "videoId": "KwweZlDolqQ",
        "gender": "male",
        "views": "90K",
        "mood": "Deep and contemplative, a voice steeped in the melancholy hush of oncoming evening."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Rahul Deshpande",
        "videoId": "P0_bT3Pyb2Q",
        "gender": "male",
        "views": "25K",
        "mood": "Grave and yearning, each syllable drawn out like the last stretch of fading daylight."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Pandit Hariprasad Chaurasia (flute)",
        "videoId": "2jIDgpjZTy8",
        "gender": "male",
        "views": "180K",
        "mood": "The flute breathes slow, sorrowful phrases that seem to dissolve with the dimming horizon."
      },
      {
        "raga": "Marwa",
        "artist": "Pandit Ulhas Kashalkar",
        "videoId": "XXAG2_tQn-Y",
        "gender": "male",
        "views": "20K",
        "mood": "Stark and unsentimental, a raga that stares straight into the dying light without blinking."
      },
      {
        "raga": "Sohni",
        "artist": "Pandit Ulhas Kashalkar",
        "videoId": "JuQyTV8Jj5M",
        "gender": "male",
        "views": "14K",
        "mood": "A low, brooding ache that lingers in the in-between hour of dusk's uncertain calm."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Ustad Rashid Khan",
        "videoId": "bo6gVgAs_P0",
        "gender": "male",
        "views": "220K",
        "mood": "Rich and grave, the voice moves like slow-falling shadows across a darkening courtyard."
      },
      {
        "raga": "Marwa",
        "artist": "Ustad Vilayat Khan (sitar)",
        "videoId": "5Y9yGQU1XLw",
        "gender": "male",
        "views": "110K",
        "mood": "The sitar sighs through austere, introspective phrases as the world dims into dusk."
      },
      {
        "raga": "Marwa",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "SJ38KvvEVjQ",
        "gender": "male",
        "views": "50K",
        "mood": "Marwa's unsettled twilight, the sun dropping below the horizon."
      },
      {
        "raga": "Shri",
        "artist": "Shruti Sadolikar",
        "videoId": "1EcRrZvc52o",
        "gender": "female",
        "views": "20K",
        "mood": "Raga Shri's austere sunset gravity, a sandhi-prakash twilight raga."
      },
      {
        "raga": "Marwa",
        "artist": "Ustad Ali Akbar Khan (sarod)",
        "videoId": "dXPUQfZDITs",
        "gender": "male",
        "views": "130K",
        "mood": "Marwa & Shree on sarod, the unsettled hush as the sun goes down."
      },
      {
        "raga": "Puriya",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "ruxRXU-hQwQ",
        "gender": "male",
        "views": "25K",
        "mood": "A drut Puriya (Marwa thaat) — the charged stillness just after sunset."
      },
      {
        "raga": "Marwa",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "APxaR7fRh1s",
        "gender": "male",
        "views": "30K",
        "mood": "Marwa at sundown — the raga that removes the ground from under the tonic."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "71ugiBrI-Og",
        "gender": "male",
        "views": "22K",
        "mood": "Puriya Dhanashri at the sandhi hour, sung in the Sarod Ghar's small room."
      },
      {
        "raga": "Marwa",
        "artist": "Gangubai Hangal",
        "videoId": "aKqYlsXHMiQ",
        "gender": "female",
        "views": "17K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. Khayal, Kirana gharana."
      },
      {
        "raga": "Marwa",
        "artist": "Hirabai Barodekar",
        "videoId": "Rtyzg__-UNY",
        "gender": "female",
        "views": "27K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. Khayal, Kirana gharana."
      },
      {
        "raga": "Shri",
        "artist": "Nikhil Banerjee",
        "videoId": "bM9B9jal_Ao",
        "gender": "male",
        "views": "280K",
        "mood": "A piece for the sandhi hour, as the sun goes down. On sitar."
      },
      {
        "raga": "Marwa",
        "artist": "Nikhil Banerjee",
        "videoId": "l9VP_SBx5e0",
        "gender": "male",
        "views": "102K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. On sitar."
      },
      {
        "raga": "Puriya Dhanashri",
        "artist": "Shahid Parvez",
        "videoId": "jPIl2G88w_A",
        "gender": "male",
        "views": "90K",
        "mood": "The sandhi hour — sunset, with the ground shifting underfoot. On sitar."
      },
      {
        "raga": "Marwa",
        "artist": "Shruti Sadolikar",
        "videoId": "RyUj17pL7NI",
        "gender": "female",
        "views": "21K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Marwa",
        "artist": "Ustad Ali Akbar Khan",
        "videoId": "UNPRAgVxM9A",
        "gender": "male",
        "views": "93K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. On sarod."
      },
      {
        "raga": "Marwa",
        "artist": "Ustad Amir Khan",
        "videoId": "vlUvz333vUc",
        "gender": "male",
        "views": "133K",
        "mood": "The raga that removes the tonic from under you as the sun goes down. Khayal, Indore gharana."
      }
    ],
    "filmy": [
      {
        "song": "Hai Rama Yeh Kya Hua",
        "film": "Rangeela",
        "year": 1995,
        "artist": "Hariharan, Swarnalatha",
        "raga": "Puriya Dhanashri",
        "videoId": "Nf0HmeRCGCY",
        "mood": "A.R. Rahman's sultry Puriya Dhanashri at dusk, all twilight and desire."
      },
      {
        "song": "Tori Jai Jai Kartar",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Ustad Amir Khan",
        "raga": "Puriya Dhanashri",
        "videoId": "HcXJxsJQwNQ",
        "mood": "Ustad Amir Khan's khayal in Puriya Dhanashri, the grave beauty of sundown."
      },
      {
        "song": "Kitne Dino Ke Baad",
        "film": "Aayee Milan Ki Raat",
        "year": 1991,
        "artist": "Anuradha Paudwal, Mohammed Aziz",
        "raga": "Puriya Dhanashri",
        "videoId": "SK_rX1yPnHg",
        "mood": "A Puriya Dhanashri duet for the night of reunion, twilight turning to longing."
      },
      {
        "song": "Ruth Aa Gayee Re",
        "film": "1947: Earth",
        "year": 1998,
        "artist": "Sukhwinder Singh",
        "raga": "Puriya Dhanashri",
        "videoId": "NtIi01Mp_6c",
        "mood": "A.R. Rahman's Puriya Dhanashri — dusk swelling with a bittersweet ache."
      },
      {
        "song": "Labon Se Chum Lo",
        "film": "Aastha",
        "year": 1997,
        "artist": "Sreeradha Banerjee",
        "raga": "Puriya Dhanashri",
        "videoId": "iwJuiJpxpF0",
        "mood": "A sensuous Puriya Dhanashri at dusk, hushed and close."
      },
      {
        "song": "Prem Lagan Man Mein Basaye",
        "film": "Soorat Aur Seerat",
        "year": 1962,
        "artist": "Asha Bhosle",
        "raga": "Puriya Dhanashri",
        "videoId": "9vD4Wwybwho",
        "mood": "Roshan's Puriya Dhanashri — devotion settling in with the twilight."
      },
      {
        "song": "Tumne Kya Kya Kiya Hai",
        "film": "Prem Geet",
        "year": 1981,
        "artist": "Asha Bhosle",
        "raga": "Puriya Dhanashri",
        "videoId": "bTBO-OBpMuk",
        "mood": "Jagjit Singh's Puriya Dhanashri, a wistful sundown of gratitude."
      }
    ]
  },
  {
    "id": 5,
    "start": 19,
    "end": 22,
    "time": "7:00 PM – 10:00 PM",
    "label": "Evening",
    "familyRaga": "Yaman",
    "mood": "Serene and romantic — the most beloved evening raga family.",
    "options": [
      {
        "raga": "Yaman",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "sXRtFIifuAc",
        "gender": "male",
        "views": "140K",
        "mood": "Serene and romantic — the most beloved evening raga."
      },
      {
        "raga": "Yaman",
        "artist": "Shubha Mudgal",
        "videoId": "VmOvwFvkVao",
        "gender": "female",
        "views": "75K",
        "mood": "Shubha Mudgal's Yaman, graceful and full of devotion."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Rashid Khan",
        "videoId": "4eFzfbicz6k",
        "gender": "male",
        "views": "160K",
        "mood": "An inspirational, richly ornamented Yaman from Rashid Khan."
      },
      {
        "raga": "Yaman",
        "artist": "Shivani Mirajkar",
        "videoId": "G8UAmSr2Bw0",
        "gender": "female",
        "views": "15K",
        "mood": "A clear, approachable Yaman for the evening's opening hour."
      },
      {
        "raga": "Bhupali",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "v3MwougAXY8",
        "gender": "female",
        "views": "40K",
        "mood": "Bhupali's five notes glow softly as evening settles in."
      },
      {
        "raga": "Yaman Kalyan",
        "artist": "Kaushiki Chakraborty",
        "videoId": "VsJiCb8GxjY",
        "gender": "female",
        "views": "80K",
        "mood": "Serene and radiant — Yaman Kalyan unfolds like the first hush of evening light."
      },
      {
        "raga": "Yaman",
        "artist": "Kaushiki Chakraborty",
        "videoId": "IgnKWMBPL2A",
        "gender": "female",
        "views": "120K",
        "mood": "Tender and glowing — a devotional bandish that opens the evening's heart."
      },
      {
        "raga": "Yaman Kalyan",
        "artist": "Kaushiki Chakraborty",
        "videoId": "ZQkFdORNkbM",
        "gender": "female",
        "views": "60K",
        "mood": "Intimate and luminous, a virtual-stage Yaman that feels close and quietly reverent."
      },
      {
        "raga": "Yaman",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "2dIODzUm7dc",
        "gender": "female",
        "views": "45K",
        "mood": "Graceful and unhurried — the meditative calm of dusk settling over the raga."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "VVHHvGCdBJw",
        "gender": "female",
        "views": "35K",
        "mood": "Sweet and gently romantic, a lighter cousin of Yaman for the early evening glow."
      },
      {
        "raga": "Yaman",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "HHifPpJrDTE",
        "gender": "female",
        "views": "40K",
        "mood": "Warm and majestic — a Gwalior-style Yaman rich with devotional serenity."
      },
      {
        "raga": "Bhupali",
        "artist": "Kishori Amonkar",
        "videoId": "7qK8QlZKnRc",
        "gender": "female",
        "views": "150K",
        "mood": "Pure and contemplative, Bhupali's five notes glowing softly as day turns to dusk."
      },
      {
        "raga": "Bhupali",
        "artist": "Kishori Amonkar",
        "videoId": "WfKpt-_kLdA",
        "gender": "female",
        "views": "200K",
        "mood": "Timeless and tender — a vintage recording that feels like twilight itself singing."
      },
      {
        "raga": "Yaman",
        "artist": "Malini Rajurkar",
        "videoId": "IU33Gkm-1Io",
        "gender": "female",
        "views": "50K",
        "mood": "Rounded and soothing, a classic evening Yaman warmed by analogue nostalgia."
      },
      {
        "raga": "Hansadhwani",
        "artist": "Begum Parveen Sultana",
        "videoId": "tCJOglk15cc",
        "gender": "female",
        "views": "180K",
        "mood": "Bright and joyous — Hansadhwani's swan-like grace lifting the evening air."
      },
      {
        "raga": "Yaman",
        "artist": "Begum Parveen Sultana",
        "videoId": "Amts1wzV2XE",
        "gender": "female",
        "views": "90K",
        "mood": "Ornate and romantic, a Patiala-gharana Yaman brimming with evening warmth."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Rashid Khan",
        "videoId": "oSEuCJSnu94",
        "gender": "male",
        "views": "300K",
        "mood": "Rich and devotional — the most beloved evening raga sung with grand serenity."
      },
      {
        "raga": "Yaman",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "Bo4IDVBJc3w",
        "gender": "male",
        "views": "70K",
        "mood": "Layered and stately, twin voices weaving Yaman's romantic calm together."
      },
      {
        "raga": "Yaman",
        "artist": "Pt. Hariprasad Chaurasia (flute)",
        "videoId": "pfvemvF__E0",
        "gender": "male",
        "views": "500K",
        "mood": "Breathy and moonlit — a bansuri rendering that drifts like evening mist."
      },
      {
        "raga": "Yaman",
        "artist": "Pt. Bhimsen Joshi",
        "videoId": "ar9GF8cZlLY",
        "gender": "male",
        "views": "250K",
        "mood": "Deep and soul-stirring, a legendary Yaman rendered with unhurried grandeur."
      },
      {
        "raga": "Yaman Kalyan",
        "artist": "Ustad Amir Khan",
        "videoId": "Z1LwF4D357A",
        "gender": "male",
        "views": "60K",
        "mood": "Grave and contemplative — a rare late-night-leaning Yaman Kalyan from the Indore maestro."
      },
      {
        "raga": "Yaman",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "mBtXjOP__CE",
        "gender": "male",
        "views": "45K",
        "mood": "A luminous Yaman (with Champakali) — the classic early-evening raga."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Vilayat Khan (sitar)",
        "videoId": "NKwhtyQBquk",
        "gender": "male",
        "views": "200K",
        "mood": "Vilayat Khan's singing sitar Yaman — the quintessential evening raga."
      },
      {
        "raga": "Jhinjhoti",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "T0mXtyi1Gsg",
        "gender": "male",
        "views": "25K",
        "mood": "Jhinjhoti's folk-warm phrases, the easy end of an evening concert."
      },
      {
        "raga": "Jhinjhoti",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "zL86IEvBEf8",
        "gender": "male",
        "views": "16K",
        "mood": "A second Jhinjhoti, lighter and more conversational between the brothers."
      },
      {
        "raga": "Desh",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "euI_-dlj-sQ",
        "gender": "male",
        "views": "28K",
        "mood": "Desh in the early evening — monsoon raga, sung with open-throated ease."
      },
      {
        "raga": "Yaman",
        "artist": "Ajoy Chakrabarty",
        "videoId": "DRYEl182_D4",
        "gender": "male",
        "views": "260K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Patiala gharana."
      },
      {
        "raga": "Charukeshi",
        "artist": "Anoushka Shankar",
        "videoId": "1Mt1tdVfs7g",
        "gender": "female",
        "views": "43K",
        "mood": "Carnatic-born, half bright and half grieving, for the evening. On sitar."
      },
      {
        "raga": "Madhyamavati",
        "artist": "Bhimsen Joshi",
        "videoId": "_tdYY6lUw9g",
        "gender": "male",
        "views": "9.6M",
        "mood": "A Carnatic raga used to close, unhurried and settled. Khayal, Kirana gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Gangubai Hangal",
        "videoId": "JaJeupmwBJQ",
        "gender": "female",
        "views": "242K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Kirana gharana."
      },
      {
        "raga": "Bhupali",
        "artist": "Gundecha Brothers",
        "videoId": "vxnHajMaocY",
        "gender": "male",
        "views": "482K",
        "mood": "Five notes, nothing wasted, early evening calm. Sung dhrupad."
      },
      {
        "raga": "Yaman",
        "artist": "Gundecha Brothers",
        "videoId": "RfF5-fMcdM0",
        "gender": "male",
        "views": "60K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Sung dhrupad."
      },
      {
        "raga": "Yaman",
        "artist": "Hariprasad Chaurasia",
        "videoId": "3kBuDppKJMQ",
        "gender": "male",
        "views": "1.2M",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On bansuri."
      },
      {
        "raga": "Hansadhwani",
        "artist": "Hariprasad Chaurasia",
        "videoId": "4VloVAPloX8",
        "gender": "male",
        "views": "868K",
        "mood": "An evening piece. On bansuri."
      },
      {
        "raga": "Pahadi",
        "artist": "Hariprasad Chaurasia",
        "videoId": "cNQnieRpZxo",
        "gender": "male",
        "views": "367K",
        "mood": "Hill folk melody dressed as a raga, evening-light. On bansuri."
      },
      {
        "raga": "Yaman",
        "artist": "Hirabai Barodekar",
        "videoId": "RxKPaQCNttA",
        "gender": "female",
        "views": "44K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Kirana gharana."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Kala Ramnath",
        "videoId": "Y4HBNL7IcBM",
        "gender": "female",
        "views": "90K",
        "mood": "An evening piece. On violin."
      },
      {
        "raga": "Yaman",
        "artist": "Kala Ramnath",
        "videoId": "SkICjDDwswI",
        "gender": "female",
        "views": "57K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On violin."
      },
      {
        "raga": "Yaman",
        "artist": "Kaushiki Chakraborty",
        "videoId": "YeOcx1ox5gQ",
        "gender": "female",
        "views": "2.1M",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Patiala gharana."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Kesarbai Kerkar",
        "videoId": "O31fpGYbMSQ",
        "gender": "female",
        "views": "22K",
        "mood": "An evening piece. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhupali",
        "artist": "Kishori Amonkar",
        "videoId": "ipauyMfVYso",
        "gender": "female",
        "views": "1.7M",
        "mood": "Five notes, nothing wasted, early evening calm. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Hansadhwani",
        "artist": "Kishori Amonkar",
        "videoId": "jdqvV9MVf2A",
        "gender": "female",
        "views": "26K",
        "mood": "An evening piece. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Bhupali",
        "artist": "Kumar Gandharva",
        "videoId": "bRuEg0dmbgI",
        "gender": "male",
        "views": "230K",
        "mood": "Five notes, nothing wasted, early evening calm. Khayal, Gwalior / independent gharana."
      },
      {
        "raga": "Desh",
        "artist": "M. Venkatesh Kumar",
        "videoId": "E8CFmo7tRWA",
        "gender": "male",
        "views": "131K",
        "mood": "Monsoon raga, sung open-throated in the early evening. Khayal, Gwalior-Kirana gharana."
      },
      {
        "raga": "Yaman",
        "artist": "M. Venkatesh Kumar",
        "videoId": "xBzok2OFAVg",
        "gender": "male",
        "views": "128K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior-Kirana gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Malini Rajurkar",
        "videoId": "viYGhyqSyOU",
        "gender": "female",
        "views": "116K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior gharana."
      },
      {
        "raga": "Desh",
        "artist": "Malini Rajurkar",
        "videoId": "P8SXa4ea56s",
        "gender": "female",
        "views": "85K",
        "mood": "Monsoon raga, sung open-throated in the early evening. Khayal, Gwalior gharana."
      },
      {
        "raga": "Bhupali",
        "artist": "Mallikarjun Mansur",
        "videoId": "qEPnRZOI6dA",
        "gender": "male",
        "views": "74K",
        "mood": "Five notes, nothing wasted, early evening calm. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Manjiri Asanare-Kelkar",
        "videoId": "0Jygs6tHXoY",
        "gender": "female",
        "views": "1K",
        "mood": "An evening piece. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Mogubai Kurdikar",
        "videoId": "w5idEgrOs10",
        "gender": "female",
        "views": "32K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Mogubai Kurdikar",
        "videoId": "9_s9bANwIUM",
        "gender": "female",
        "views": "1K",
        "mood": "An evening piece. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Yaman",
        "artist": "N. Rajam",
        "videoId": "Rx63aRwdCRY",
        "gender": "female",
        "views": "138K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On violin, in the gayaki ang."
      },
      {
        "raga": "Desh",
        "artist": "Omkarnath Thakur",
        "videoId": "-5BJSmf-a74",
        "gender": "male",
        "views": "96K",
        "mood": "Monsoon raga, sung open-throated in the early evening. Khayal, Gwalior gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Omkarnath Thakur",
        "videoId": "aiMF_9Dzep8",
        "gender": "male",
        "views": "8K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior gharana."
      },
      {
        "raga": "Shuddh Kalyan",
        "artist": "Padma Talwalkar",
        "videoId": "NtxXdRTgwl0",
        "gender": "female",
        "views": "19K",
        "mood": "An evening piece. Khayal, Gwalior / Jaipur gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Padma Talwalkar",
        "videoId": "G5hkd7XJWcg",
        "gender": "female",
        "views": "10K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior / Jaipur gharana."
      },
      {
        "raga": "Kalavati",
        "artist": "Prabha Atre",
        "videoId": "AwEQqcszjHc",
        "gender": "female",
        "views": "217K",
        "mood": "Evening, pentatonic, with a sweetness that arrives quickly. Khayal, Kirana gharana."
      },
      {
        "raga": "Yaman",
        "artist": "Rajan & Sajan Mishra",
        "videoId": "FIudr8h-WmQ",
        "gender": "male",
        "views": "352K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Sung as a duet."
      },
      {
        "raga": "Charukeshi",
        "artist": "Ravi Shankar",
        "videoId": "Xb_SaMg7zwE",
        "gender": "male",
        "views": "161K",
        "mood": "Carnatic-born, half bright and half grieving, for the evening. On sitar."
      },
      {
        "raga": "Yaman",
        "artist": "Shahid Parvez",
        "videoId": "ed4SIvGjqNI",
        "gender": "male",
        "views": "3.6M",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On sitar."
      },
      {
        "raga": "Pahadi",
        "artist": "Shivkumar Sharma",
        "videoId": "EL4_hAoMHd0",
        "gender": "male",
        "views": "205K",
        "mood": "Hill folk melody dressed as a raga, evening-light. On santoor."
      },
      {
        "raga": "Charukeshi",
        "artist": "Shivkumar Sharma",
        "videoId": "u8nd7EcrXxk",
        "gender": "male",
        "views": "54K",
        "mood": "Carnatic-born, half bright and half grieving, for the evening. On santoor."
      },
      {
        "raga": "Mishra Kafi",
        "artist": "Shobha Gurtu",
        "videoId": "iDpvcq8M8M8",
        "gender": "female",
        "views": "162K",
        "mood": "Kafi with borrowed notes, loosened toward thumri. Semi-classical."
      },
      {
        "raga": "Yaman",
        "artist": "Shruti Sadolikar",
        "videoId": "TkJ_hHVWxhY",
        "gender": "female",
        "views": "70K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Khamaj",
        "artist": "Siddheshwari Devi",
        "videoId": "zraiQjitSO8",
        "gender": "female",
        "views": "34K",
        "mood": "Light-classical evening, made for thumri and unserious love. Semi-classical, in the Banaras manner."
      },
      {
        "raga": "Yaman",
        "artist": "Ulhas Kashalkar",
        "videoId": "XO9Bh2HzHvo",
        "gender": "male",
        "views": "69K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior-Agra-Jaipur gharana."
      },
      {
        "raga": "Desh",
        "artist": "Ustad Amjad Ali Khan",
        "videoId": "3utGH37HzCk",
        "gender": "male",
        "views": "1.9M",
        "mood": "Monsoon raga, sung open-throated in the early evening. On sarod."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Amjad Ali Khan",
        "videoId": "7dprJBRkXuk",
        "gender": "male",
        "views": "53K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On sarod."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Bismillah Khan",
        "videoId": "7nXYYuorTm4",
        "gender": "male",
        "views": "2.2M",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On shehnai."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Sultan Khan",
        "videoId": "7wYXEY4htDA",
        "gender": "male",
        "views": "766K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On sarangi."
      },
      {
        "raga": "Charukeshi",
        "artist": "Ustad Sultan Khan",
        "videoId": "Th8e6xxyg5E",
        "gender": "male",
        "views": "239K",
        "mood": "Carnatic-born, half bright and half grieving, for the evening. On sarangi."
      },
      {
        "raga": "Yaman",
        "artist": "Ustad Vilayat Khan",
        "videoId": "tGBKs7swowk",
        "gender": "male",
        "views": "383K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. On sitar."
      },
      {
        "raga": "Yaman",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "5PD4ODLm1jI",
        "gender": "female",
        "views": "72K",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Gwalior gharana."
      }
    ],
    "filmy": [
      {
        "song": "Jab Deep Jale Aana",
        "film": "Chitchor",
        "year": 1976,
        "artist": "K.J. Yesudas, Hemlata",
        "raga": "Yaman",
        "videoId": "ah1T5cTZmo8",
        "mood": "Ravindra Jain's Yaman — a gentle evening summons as the lamps are lit."
      },
      {
        "song": "Chandan Sa Badan",
        "film": "Saraswatichandra",
        "year": 1968,
        "artist": "Mukesh",
        "raga": "Yaman",
        "videoId": "Rck9Q7Q0GLY",
        "mood": "A tender Yaman serenade, moonlight on a beloved's face."
      },
      {
        "song": "Ehsan Tera Hoga Mujh Par",
        "film": "Junglee",
        "year": 1961,
        "artist": "Mohammed Rafi",
        "raga": "Yaman",
        "videoId": "qg1ZAru_lhc",
        "mood": "Shankar-Jaikishan's Yaman, a soft confession of gratitude and love."
      },
      {
        "song": "Zindagi Bhar Nahin Bhulegi",
        "film": "Barsaat Ki Raat",
        "year": 1960,
        "artist": "Mohammed Rafi",
        "raga": "Yaman",
        "videoId": "SwasEdyZv-A",
        "mood": "Roshan's Yaman — an unforgettable rain-soaked evening of romance."
      },
      {
        "song": "O Sajna Barkha Bahar Aayi",
        "film": "Parakh",
        "year": 1960,
        "artist": "Lata Mangeshkar",
        "raga": "Khamaj",
        "videoId": "v0cN4AXHiW4",
        "mood": "Salil Chowdhury's Khamaj, the monsoon evening pining for a lover."
      },
      {
        "song": "Ab Kya Misaal Doon",
        "film": "Aarti",
        "year": 1962,
        "artist": "Mohammed Rafi",
        "raga": "Yaman",
        "videoId": "WchI8cTVxi8",
        "mood": "Roshan's Yaman — an evening ode to a beloved's beauty."
      },
      {
        "song": "Saranga Teri Yaad Mein",
        "film": "Saranga",
        "year": 1961,
        "artist": "Mukesh",
        "raga": "Yaman",
        "videoId": "mJzehD-SKLg",
        "mood": "A yearning Yaman lament, restless eyes waiting through the evening."
      },
      {
        "song": "Mausam Hai Aashiqana",
        "film": "Pakeezah",
        "year": 1971,
        "artist": "Lata Mangeshkar",
        "raga": "Yaman Kalyan",
        "videoId": "-LaPJaUhZYk",
        "mood": "Ghulam Mohammed's Kalyan — a languid, love-struck early evening."
      },
      {
        "song": "Bhooli Hui Yaadon",
        "film": "Sanjog",
        "year": 1961,
        "artist": "Mukesh",
        "raga": "Yaman Kalyan",
        "videoId": "NQaRaxXYM0Q",
        "mood": "Madan Mohan's Kalyan — old memories aching in the evening quiet."
      },
      {
        "song": "Dil Hoom Hoom Kare",
        "film": "Rudaali",
        "year": 1993,
        "artist": "Bhupen Hazarika",
        "raga": "Bhupali",
        "videoId": "uw09KhKHQyE",
        "mood": "Bhupen Hazarika's Bhupali — the heart trembling like a slow evening flame."
      },
      {
        "song": "Aansoo Bhari Hai Ye Jeevan Ki Raahen",
        "film": "Parvarish",
        "year": 1958,
        "artist": "Mukesh",
        "raga": "Yaman Kalyan",
        "videoId": "yCb_1eAaqMc",
        "mood": "Dattaram's Yaman Kalyan — tears strung along the evening road of life."
      },
      {
        "song": "Jiya Le Gayo Ji Mora Sanwariya",
        "film": "Anpadh",
        "year": 1962,
        "artist": "Lata Mangeshkar",
        "raga": "Yaman Kalyan",
        "videoId": "J4ZKNty9cQ4",
        "mood": "Madan Mohan's Yaman Kalyan — the beloved has stolen the heart, one evening."
      },
      {
        "song": "Abhi Na Jao Chhod Kar",
        "film": "Hum Dono",
        "year": 1961,
        "artist": "Mohammed Rafi, Asha Bhosle",
        "raga": "Yaman Kalyan",
        "videoId": "NfWJsgu5uVo",
        "mood": "Jaidev's Yaman Kalyan — an evening plea to stay, the heart not yet full."
      },
      {
        "song": "Chhupa Lo Yun Dil Mein Pyar Mera",
        "film": "Mamta",
        "year": 1966,
        "artist": "Lata Mangeshkar, Hemant Kumar",
        "raga": "Yaman Kalyan",
        "videoId": "GXgKgZt9Jik",
        "mood": "Roshan's Yaman Kalyan — hide this love in your heart, an evening vow."
      },
      {
        "song": "Aap Ke Anurodh Pe",
        "film": "Anurodh",
        "year": 1977,
        "artist": "Kishore Kumar",
        "raga": "Yaman Kalyan",
        "videoId": "hsfcCJ034Fk",
        "mood": "Laxmikant-Pyarelal's Yaman Kalyan — a graceful evening song of request."
      },
      {
        "song": "Aaye Ho Meri Zindagi Mein",
        "film": "Raja Hindustani",
        "year": 1996,
        "artist": "Udit Narayan",
        "raga": "Yaman Kalyan",
        "videoId": "r7cUMWxS6Xo",
        "mood": "Nadeem-Shravan's Yaman Kalyan — gratitude blooming into an evening."
      },
      {
        "song": "Ansu Samajh Ke",
        "film": "Chhaya",
        "year": 1961,
        "artist": "Talat Mahmood",
        "raga": "Yaman Kalyan",
        "videoId": "pLyHeI1HRw8",
        "mood": "Salil Chowdhury's Yaman Kalyan — Talat's velvet ache at dusk."
      },
      {
        "song": "Bade Bhole Ho",
        "film": "Ardhangini",
        "year": 1959,
        "artist": "Lata Mangeshkar",
        "raga": "Yaman Kalyan",
        "videoId": "ficIAWjm6KQ",
        "mood": "Vasant Desai's Yaman Kalyan — a teasing, tender evening address to Kanha."
      },
      {
        "song": "Aa Dil Se Dil Mila Le",
        "film": "Navrang",
        "year": 1959,
        "artist": "Asha Bhosle",
        "raga": "Khamaj",
        "videoId": "5BTCwI5HEpg",
        "mood": "C. Ramchandra's Khamaj — an evening invitation for heart to meet heart."
      },
      {
        "song": "Aayo Kahan Se Ghanshyam",
        "film": "Buddha Mil Gaya",
        "year": 1971,
        "artist": "Manna Dey, Archana",
        "raga": "Khamaj",
        "videoId": "1YcECS_WsK4",
        "mood": "R.D. Burman's thumri-style Khamaj — a delicious evening tease."
      },
      {
        "song": "Baar Baar Tohe Kya Samjhaye",
        "film": "Aarti",
        "year": 1962,
        "artist": "Mohammed Rafi, Lata Mangeshkar",
        "raga": "Khamaj",
        "videoId": "D5gjRvVlk3c",
        "mood": "Roshan's Khamaj — anklets pleading through a tender evening."
      },
      {
        "song": "Bada Natkhat Hai Re Krishna Kanhaiya",
        "film": "Amar Prem",
        "year": 1971,
        "artist": "Lata Mangeshkar",
        "raga": "Khamaj",
        "videoId": "8uhPePg1oNQ",
        "mood": "R.D. Burman's Khamaj lullaby — Yashoda's fond evening complaint about naughty Krishna."
      },
      {
        "song": "Chunariya Katati Jaye",
        "film": "Mother India",
        "year": 1957,
        "artist": "Manna Dey, Rafi, Shamshad Begum",
        "raga": "Khamaj",
        "videoId": "8GiBCQ9QFjk",
        "mood": "Naushad's Khamaj — the thread of life spinning out as evening falls."
      },
      {
        "song": "Dhal Chuki Shaam-e-Gham",
        "film": "Kohinoor",
        "year": 1960,
        "artist": "Mohammed Rafi",
        "raga": "Khamaj",
        "videoId": "xLG5rU2xOEQ",
        "mood": "Naushad's Khamaj — the evening of sorrow has passed, so smile, beloved."
      },
      {
        "song": "Hum Apna Unhe Bana Na Sake",
        "film": "Bhanwara",
        "year": 1944,
        "artist": "K.L. Saigal",
        "raga": "Khamaj",
        "videoId": "kVqbalGykrE",
        "mood": "Saigal's vintage Khamaj — an evening ache for a love that could not be."
      },
      {
        "song": "Mere To Giridhar Gopal",
        "film": "Meera",
        "year": 1979,
        "artist": "Vani Jairam",
        "raga": "Khamaj",
        "videoId": "FMtPn6-fjq0",
        "mood": "Pt. Ravi Shankar's Khamaj — Meera's evening surrender to Giridhar Gopal."
      },
      {
        "song": "Mitwa",
        "film": "Kabhi Alvida Naa Kehna",
        "year": 2006,
        "artist": "Shafqat Amanat Ali, Shankar Mahadevan",
        "raga": "Khamaj",
        "videoId": "ru_5PA8cwkE",
        "mood": "Shankar-Ehsaan-Loy's Khamaj — a modern evening reckoning of the heart."
      },
      {
        "song": "Raghupati Raghav Raja Ram",
        "artist": "D. V. Paluskar",
        "videoId": "MoeC0JEEt9U",
        "mood": "An evening piece. Khayal, Gwalior gharana.",
        "raga": "Mishra Gara"
      },
      {
        "song": "Payoji Maine",
        "artist": "D. V. Paluskar",
        "videoId": "Fi6N5NQ7pTs",
        "mood": "Light-classical evening, made for thumri and unserious love. Khayal, Gwalior gharana.",
        "raga": "Khamaj"
      },
      {
        "song": "Payoji Maine",
        "artist": "N. Rajam",
        "videoId": "KBRNcJ6pPcU",
        "mood": "Light-classical evening, made for thumri and unserious love. On violin, in the gayaki ang.",
        "raga": "Khamaj"
      },
      {
        "song": "Voice of the Moon",
        "artist": "Anoushka Shankar",
        "videoId": "RzoO756PvL8",
        "mood": "An evening piece. On sitar."
      },
      {
        "song": "Traveller",
        "artist": "Anoushka Shankar",
        "videoId": "_PfRSr0F9eM",
        "mood": "An evening piece. On sitar."
      },
      {
        "song": "Chaiti Chait Maas",
        "artist": "Girija Devi",
        "videoId": "YVxmP-4dbJY",
        "mood": "An evening piece. Semi-classical, in the Banaras manner."
      },
      {
        "song": "Rang Na Daro Shyamji",
        "artist": "Malini Rajurkar",
        "videoId": "7g5Ukf-4kRQ",
        "mood": "An evening piece. Khayal, Gwalior gharana."
      },
      {
        "song": "Jamuna Kinare Mora Gaon",
        "artist": "Prabha Atre",
        "videoId": "aPj8nRdJ3B8",
        "mood": "An evening piece. Khayal, Kirana gharana."
      },
      {
        "song": "Bangla Dhun Concert for Bangladesh",
        "artist": "Ravi Shankar",
        "videoId": "PLY0CmWJunA",
        "mood": "An evening piece. On sitar."
      },
      {
        "song": "Call of the Valley",
        "artist": "Shivkumar Sharma",
        "videoId": "GnNLI86E8DY",
        "mood": "An evening piece. On santoor."
      },
      {
        "song": "Rangi Saari Gulabi",
        "artist": "Shobha Gurtu",
        "videoId": "GauwBsPkXjw",
        "mood": "An evening piece. Semi-classical."
      },
      {
        "song": "Saiyan Rooth Gaye",
        "artist": "Shobha Gurtu",
        "videoId": "RAQK9yoBsVY",
        "mood": "An evening piece. Semi-classical."
      },
      {
        "song": "Ab Na Balam",
        "artist": "Shobha Gurtu",
        "videoId": "D7WyPIGvPvk",
        "mood": "An evening piece. Semi-classical."
      },
      {
        "song": "Ali More Angana",
        "artist": "Shubha Mudgal",
        "videoId": "rcrvGb94i1s",
        "mood": "An evening piece. Khayal."
      },
      {
        "song": "Seekho Na Naino Ki Bhasha",
        "artist": "Shubha Mudgal",
        "videoId": "48tjkNH5sx8",
        "mood": "An evening piece. Khayal."
      },
      {
        "song": "Chait Ki Nindiya Re",
        "artist": "Siddheshwari Devi",
        "videoId": "V8oFCjNNw_Y",
        "mood": "An evening piece. Semi-classical, in the Banaras manner."
      },
      {
        "song": "Gunj Uthi Shehnai",
        "artist": "Ustad Bismillah Khan",
        "videoId": "ZpsYEprcNuY",
        "mood": "An evening piece. On shehnai."
      },
      {
        "song": "Aaoge Jab Tum Saajna",
        "artist": "Ustad Rashid Khan",
        "videoId": "CNZMIhckaA0",
        "mood": "The first raga taught and the last mastered — evening, expansive, in no hurry. Khayal, Rampur-Sahaswan gharana.",
        "raga": "Yaman"
      },
      {
        "song": "Piya Basanti",
        "artist": "Ustad Sultan Khan",
        "videoId": "XFT2niDEy28",
        "mood": "An evening piece. On sarangi."
      },
      {
        "song": "Making Music",
        "artist": "Zakir Hussain",
        "videoId": "6RsuVUB44rU",
        "mood": "An evening piece. On tabla."
      },
      {
        "song": "Lotus Feet Remember Shakti",
        "artist": "Zakir Hussain",
        "videoId": "HDyfFNJGRDA",
        "mood": "An evening piece. On tabla."
      }
    ]
  },
  {
    "id": 6,
    "start": 22,
    "end": 25,
    "time": "10:00 PM – 1:00 AM",
    "label": "Night",
    "familyRaga": "Kedar",
    "mood": "Sweet and devotional, often associated with Lord Shiva.",
    "options": [
      {
        "raga": "Kedar",
        "artist": "Pt. Ajoy Chakraborty",
        "videoId": "Q95vFPHlCnA",
        "gender": "male",
        "views": "100K",
        "mood": "Sweet and devotional, often associated with Lord Shiva."
      },
      {
        "raga": "Bihag",
        "artist": "Kaushiki Chakraborty",
        "videoId": "os7JZr1GYRU",
        "gender": "female",
        "views": "70K",
        "mood": "A brisk drut khayal in Bihag, sweet and romantic at night."
      },
      {
        "raga": "Basanti Kedar",
        "artist": "Pt. Ulhas Kashalkar",
        "videoId": "bn5LZ-dm9kU",
        "gender": "male",
        "views": "50K",
        "mood": "Two allied night ragas, sung with Gwalior-Jaipur-Agra depth."
      },
      {
        "raga": "Kedar",
        "artist": "Pt. Ulhas Kashalkar",
        "videoId": "r1z_EeaEmeA",
        "gender": "male",
        "views": "45K",
        "mood": "A dignified, unhurried Kedar from a master of three gharanas."
      },
      {
        "raga": "Kedar",
        "artist": "Kaushiki Chakraborty",
        "videoId": "xvR-ggm83Qw",
        "gender": "female",
        "views": "60K",
        "mood": "A tender, glowing rendition that wraps Lord Shiva's raga in youthful grace."
      },
      {
        "raga": "Desh",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "SKLJLTfkrDo",
        "gender": "female",
        "views": "40K",
        "mood": "Warm and homely, Des unfolds like a lullaby carried on a monsoon breeze."
      },
      {
        "raga": "Kedar",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "9C6A0Hj9b0I",
        "gender": "female",
        "views": "35K",
        "mood": "Meditative and serene, evoking a quiet temple bell at midnight."
      },
      {
        "raga": "Basanti Kedar",
        "artist": "Kishori Amonkar",
        "videoId": "qFcjVhjRjQ0",
        "gender": "female",
        "views": "90K",
        "mood": "A rare hybrid bloom of spring's Basant and devotional Kedar, sung with aching tenderness."
      },
      {
        "raga": "Kedar",
        "artist": "Kishori Amonkar",
        "videoId": "AG7t3y7XwTM",
        "gender": "female",
        "views": "120K",
        "mood": "Deeply devotional, her voice bends each note like an offering to Shiva."
      },
      {
        "raga": "Kedar",
        "artist": "Malini Rajurkar",
        "videoId": "_MBw6Qi2kFU",
        "gender": "female",
        "views": "25K",
        "mood": "Stately and sweet, delivered with the grounded warmth of the Gwalior gharana."
      },
      {
        "raga": "Desh",
        "artist": "Meeta Pandit",
        "videoId": "YUguojXNTxo",
        "gender": "female",
        "views": "30K",
        "mood": "Gentle and nostalgic, Des drifts through the night like a half-remembered folk tune."
      },
      {
        "raga": "Kafi",
        "artist": "Girija Devi",
        "videoId": "0vOXSn2jah4",
        "gender": "female",
        "views": "150K",
        "mood": "Playful yet soulful, the Banaras thumri queen colors Kafi with romantic longing."
      },
      {
        "raga": "Basanti Kedar",
        "artist": "Mogubai Kurdikar",
        "videoId": "aoB1MR_PzPU",
        "gender": "female",
        "views": "20K",
        "mood": "A historic Jaipur-Atrauli treasure, austere and glowing with devotion."
      },
      {
        "raga": "Kedar",
        "artist": "Manjiri Asnare Kelkar",
        "videoId": "A860NJImHKU",
        "gender": "female",
        "views": "15K",
        "mood": "Fittingly titled 'Early Night', a hushed and contemplative unfolding of Kedar."
      },
      {
        "raga": "Hameer",
        "artist": "Padma Talwalkar",
        "videoId": "AqvgV-7DwC8",
        "gender": "female",
        "views": "18K",
        "mood": "Bright yet tender, Hameer glows softly from her acclaimed Night Ragas album."
      },
      {
        "raga": "Hameer",
        "artist": "Shirin Sengupta",
        "videoId": "udPCa1_zP7A",
        "gender": "female",
        "views": "8K",
        "mood": "A graceful, unhurried Hameer that lingers like lamplight in a quiet courtyard."
      },
      {
        "raga": "Kedar",
        "artist": "Ajoy Chakraborty",
        "videoId": "7I23f9xm4Bw",
        "gender": "male",
        "views": "55K",
        "mood": "Rich and resonant, his Kedar carries the weight of devotion into the night stillness."
      },
      {
        "raga": "Kedar",
        "artist": "Rashid Khan",
        "videoId": "M8u7xseSKjE",
        "gender": "male",
        "views": "200K",
        "mood": "Velvety and soulful, his Kedar drips with the honeyed sweetness of late-night devotion."
      },
      {
        "raga": "Kedar",
        "artist": "Bhimsen Joshi",
        "videoId": "qZlgmfJJdjQ",
        "gender": "male",
        "views": "300K",
        "mood": "Monsoon-scented, his 'Sawan Ki Boondaniya' in Kedar feels like rain on a temple roof."
      },
      {
        "raga": "Kedar",
        "artist": "Jasraj",
        "videoId": "9L2vN0sFHxk",
        "gender": "male",
        "views": "150K",
        "mood": "Majestic and devotional, sung in the grand Mewati style at a 1978 Delhi concert."
      },
      {
        "raga": "Bihag",
        "artist": "Amir Khan",
        "videoId": "Hz6__9PC3H0",
        "gender": "male",
        "views": "100K",
        "mood": "Unhurried and profound, his 1960s live Bihag melts into a meditative hush."
      },
      {
        "raga": "Bihag",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "9AxH39VaQO8",
        "gender": "male",
        "views": "60K",
        "mood": "Bihag's romantic night glow, a vilambit unfolding into a tarana."
      },
      {
        "raga": "Maru Bihag",
        "artist": "Shruti Sadolikar",
        "videoId": "JcwV6Gk998g",
        "gender": "female",
        "views": "30K",
        "mood": "Maru Bihag glows warm and amorous deep into the night."
      },
      {
        "raga": "Rageshri",
        "artist": "Ustad Shahid Parvez Khan (sitar)",
        "videoId": "kuodgoYjy60",
        "gender": "male",
        "views": "80K",
        "mood": "Rageshri's serene night glow, unfurling on the sitar."
      },
      {
        "raga": "Jaijaiwanti",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "TTqwEwrkDRU",
        "gender": "male",
        "views": "30K",
        "mood": "Jaijaiwanti's tender, conversational sway deep in the night."
      },
      {
        "raga": "Chhayanat",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "n8X-8UXTOF8",
        "gender": "male",
        "views": "24K",
        "mood": "Chhayanat with Sukhvinder Singh Pinky on tabla — stately, night-lit, playful."
      },
      {
        "raga": "Jaijaiwanti",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "dUae_oYWk0c",
        "gender": "male",
        "views": "18K",
        "mood": "'Aiso naval ladli Radha' — a drut Jaijaiwanti bandish in teental."
      },
      {
        "raga": "Rageshri",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "LJfn82ysxzc",
        "gender": "male",
        "views": "15K",
        "mood": "Gorakh Kalyan folding into Rageshri, deep into the night's first watch."
      },
      {
        "raga": "Nand",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "p6OzX7vkqpc",
        "gender": "male",
        "views": "17K",
        "mood": "Durga giving way to Nand — the brothers pairing two night ragas in one sitting."
      },
      {
        "raga": "Maru Bihag",
        "artist": "Begum Parveen Sultana",
        "videoId": "_95HTB_K5aI",
        "gender": "female",
        "views": "8K",
        "mood": "Bihag with a sharpened fourth, more yearning than its parent. Khayal, Patiala gharana."
      },
      {
        "raga": "Gaud Malhar",
        "artist": "D. V. Paluskar",
        "videoId": "9phevxRX7j0",
        "gender": "male",
        "views": "52K",
        "mood": "A gentler Malhar, the rain further off. Khayal, Gwalior gharana."
      },
      {
        "raga": "Nand",
        "artist": "Devaki Pandit",
        "videoId": "3h71gxA2tu4",
        "gender": "female",
        "views": "18K",
        "mood": "A night raga that keeps circling the same sweet phrase. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Maru Bihag",
        "artist": "Kesarbai Kerkar",
        "videoId": "f5I7ixfduo4",
        "gender": "female",
        "views": "29K",
        "mood": "Bihag with a sharpened fourth, more yearning than its parent. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Megh",
        "artist": "Nikhil Banerjee",
        "videoId": "Vy1eHhrwzYs",
        "gender": "male",
        "views": "175K",
        "mood": "Monsoon raga — clouds gathering, sung deep into the night. On sitar."
      },
      {
        "raga": "Miyan ki Malhar",
        "artist": "Pandit Jasraj",
        "videoId": "YBA58q6Ut-g",
        "gender": "male",
        "views": "236K",
        "mood": "Tansen's rain raga, heavy and unmistakable. Khayal, Mewati gharana."
      },
      {
        "raga": "Maru Bihag",
        "artist": "Prabha Atre",
        "videoId": "fKmSE252OUo",
        "gender": "female",
        "views": "515K",
        "mood": "Bihag with a sharpened fourth, more yearning than its parent. Khayal, Kirana gharana."
      },
      {
        "raga": "Maru Bihag",
        "artist": "Prabha Atre",
        "videoId": "1zNuemR7KeA",
        "gender": "female",
        "views": "420K",
        "mood": "Bihag with a sharpened fourth, more yearning than its parent. Khayal, Kirana gharana."
      },
      {
        "raga": "Gaud Malhar",
        "artist": "Ulhas Kashalkar",
        "videoId": "5lloqtryEpE",
        "gender": "male",
        "views": "39K",
        "mood": "A gentler Malhar, the rain further off. Khayal, Gwalior-Agra-Jaipur gharana."
      },
      {
        "raga": "Megh",
        "artist": "Ustad Amir Khan",
        "videoId": "HhsXCB6T0e0",
        "gender": "male",
        "views": "114K",
        "mood": "Monsoon raga — clouds gathering, sung deep into the night. Khayal, Indore gharana."
      },
      {
        "raga": "Durga",
        "artist": "Ustad Amjad Ali Khan",
        "videoId": "vMxoKJkQhdA",
        "gender": "male",
        "views": "196K",
        "mood": "Five notes, no thirds to soften it, clean and nocturnal. On sarod."
      },
      {
        "raga": "Megh",
        "artist": "Ustad Rashid Khan",
        "videoId": "wsq27ntWHnQ",
        "gender": "male",
        "views": "943K",
        "mood": "Monsoon raga — clouds gathering, sung deep into the night. Khayal, Rampur-Sahaswan gharana."
      }
    ],
    "filmy": [
      {
        "song": "Madhuban Mein Radhika Naache",
        "film": "Kohinoor",
        "year": 1960,
        "artist": "Mohammed Rafi",
        "raga": "Hameer",
        "videoId": "crxIol2Hu84",
        "mood": "Naushad's Hameer showpiece — a nighttime dance of pure classical joy."
      },
      {
        "song": "Bekas Pe Karam Kijiye",
        "film": "Mughal-e-Azam",
        "year": 1960,
        "artist": "Lata Mangeshkar",
        "raga": "Kedar",
        "videoId": "B3X411sSUSo",
        "mood": "Naushad's Kedar prayer — a moonlit plea rising from the prison dark."
      },
      {
        "song": "Nain So Nain Nahi Milao",
        "film": "Jhanak Jhanak Payal Baaje",
        "year": 1955,
        "artist": "Lata Mangeshkar, Hemant Kumar",
        "raga": "Malgunji",
        "videoId": "Gn-IrbInS8s",
        "mood": "Vasant Desai's Malgunji duet, eyes meeting and shying away at night."
      },
      {
        "song": "Tere Sur Aur Mere Geet",
        "film": "Goonj Uthi Shehnai",
        "year": 1959,
        "artist": "Lata Mangeshkar",
        "raga": "Bihag",
        "videoId": "a2YVETrBKNo",
        "mood": "Vasant Desai's Bihag — two melodies entwining in the romantic night."
      },
      {
        "song": "Geet Gaya Patharon Ne",
        "film": "Geet Gaya Patharon Ne",
        "year": 1964,
        "artist": "Kishori Amonkar",
        "raga": "Durga",
        "videoId": "y-zX9E9ObzY",
        "mood": "Kishori Amonkar's rare film title song — Durga, pentatonic and luminous at night."
      },
      {
        "song": "Bole Re Papihara",
        "film": "Guddi",
        "year": 1971,
        "artist": "Vani Jairam",
        "raga": "Miyan ki Malhar",
        "videoId": "MiA2zSIcIFc",
        "mood": "Vani Jairam's debut — Miyan ki Malhar, the papiha calling through the monsoon night."
      },
      {
        "song": "Aaoge Jab Tum O Sajna",
        "film": "Jab We Met",
        "year": 2007,
        "artist": "Ustad Rashid Khan",
        "raga": "Tilak Kamod",
        "videoId": "WPwTPhFMm3k",
        "mood": "Ustad Rashid Khan's Tilak Kamod — a luminous nighttime promise of return."
      },
      {
        "song": "Shubh Din Aayo Raj Dulara",
        "film": "Mughal-e-Azam",
        "year": 1960,
        "artist": "Ustad Bade Ghulam Ali Khan",
        "raga": "Rageshri",
        "videoId": "ozp4srmwkaM",
        "mood": "Bade Ghulam Ali Khan's Rageshri, sung for Tansen — regal night in the emperor's court."
      },
      {
        "song": "Man Mohana Bade Jhoothe",
        "film": "Seema",
        "year": 1955,
        "artist": "Lata Mangeshkar",
        "raga": "Jaijaiwanti",
        "videoId": "uXGMxTTB_Dg",
        "mood": "Shankar-Jaikishan's Jaijaiwanti — a night reproach to a beloved deceiver."
      },
      {
        "song": "Chhup Gaya Koi Re",
        "film": "Champakali",
        "year": 1957,
        "artist": "Lata Mangeshkar",
        "raga": "Jhinjhoti",
        "videoId": "yGmPL_IVuAk",
        "mood": "Hemant Kumar's Jhinjhoti — someone called from afar, then hid in the night."
      },
      {
        "song": "Aji Rooth Kar Ab Kahan Jaiyega",
        "film": "Aarzoo",
        "year": 1965,
        "artist": "Lata Mangeshkar",
        "raga": "Desh",
        "videoId": "SJAx_2ZmiuM",
        "mood": "Shankar-Jaikishan's Desh — a tender nighttime coax not to leave in anger."
      },
      {
        "song": "Dil Ne Kaha Chupke Se",
        "film": "1942: A Love Story",
        "year": 1994,
        "artist": "Kavita Krishnamurthy",
        "raga": "Desh",
        "videoId": "doKN8wH93yE",
        "mood": "R.D. Burman's last-film Desh — the heart's soft night-whisper of love."
      },
      {
        "song": "Door Koi Gaaye",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Mohammed Rafi, Lata Mangeshkar",
        "raga": "Desh",
        "videoId": "7lKqQW66pKo",
        "mood": "Naushad's Desh — a far-off melody drifting across the night."
      },
      {
        "song": "Hum Tere Pyar Mein",
        "film": "Dil Ek Mandir",
        "year": 1963,
        "artist": "Lata Mangeshkar",
        "raga": "Desh",
        "videoId": "KvSxWV9rcbw",
        "mood": "Shankar-Jaikishan's Desh — lost to the whole world in love, one night."
      },
      {
        "song": "Dukh Ke Ab Din Bitat Nahi",
        "film": "Devdas",
        "year": 1936,
        "artist": "K.L. Saigal",
        "raga": "Desh",
        "videoId": "3IPKMmDrB0Q",
        "mood": "Saigal's historic Desh — the days of sorrow no longer pass, sung into the night."
      },
      {
        "song": "Aapko Pyar Chhupane Ki",
        "film": "Neela Aakash",
        "year": 1965,
        "artist": "Mohammed Rafi, Asha Bhosle",
        "raga": "Desh",
        "videoId": "iK5RcbGQy1E",
        "mood": "Madan Mohan's Desh — a playful night complaint about hiding one's love."
      },
      {
        "song": "Aap Ki Aankhon Mein Kuchh",
        "film": "Ghar",
        "year": 1978,
        "artist": "Kishore Kumar, Lata Mangeshkar",
        "raga": "Kedar",
        "videoId": "3bZ45auFtAU",
        "mood": "R.D. Burman's Kedar-tinged night — a fragrant secret in a lover's eyes."
      },
      {
        "song": "Aap Yun Hi Agar Humse Milte Rahe",
        "film": "Ek Musafir Ek Hasina",
        "year": 1962,
        "artist": "Mohammed Rafi, Asha Bhosle",
        "raga": "Kedar",
        "videoId": "3Ez_GyVEST0",
        "mood": "O.P. Nayyar's Kedar — a moonlit warning that this could turn to love."
      },
      {
        "song": "Darshan Do Ghanshyam",
        "film": "Narsi Bhagat",
        "year": 1957,
        "artist": "Hemant Kumar, Manna Dey, Sudha Malhotra",
        "raga": "Kedar",
        "videoId": "0UYtyMXwEuo",
        "mood": "Ravi's Kedar bhajan — thirsting eyes plead for a vision of the Lord at night."
      },
      {
        "song": "Kuchh Ajnabi Se Aap Hain",
        "film": "Shagun",
        "year": 1964,
        "artist": "Talat Mahmood, Mubarak Begum",
        "raga": "Mishra Kedar",
        "videoId": "bHQC1hAuVjc",
        "mood": "Khayyam's Mishra Kedar — a tender, hesitant night of new acquaintance."
      },
      {
        "song": "Mere Humnafas Mere Humnawa",
        "artist": "Begum Akhtar",
        "videoId": "XYgG6SiX7ZE",
        "mood": "A night piece. Semi-classical."
      },
      {
        "song": "Ae Mohabbat Tere Anjam Pe Rona Aaya",
        "artist": "Begum Akhtar",
        "videoId": "AQ0iWPWV-O0",
        "mood": "A night piece. Semi-classical."
      },
      {
        "song": "Kajri Barsan Lagi",
        "artist": "Girija Devi",
        "videoId": "hSlthw4PRms",
        "mood": "A night piece. Semi-classical, in the Banaras manner."
      },
      {
        "song": "Ab Ke Sawan",
        "artist": "Shubha Mudgal",
        "videoId": "WLzDlKSMKY0",
        "mood": "A night piece. Khayal.",
        "raga": "Malhar"
      },
      {
        "song": "Kajri",
        "artist": "Siddheshwari Devi",
        "videoId": "kZorvjFzcXM",
        "mood": "A night piece. Semi-classical, in the Banaras manner."
      },
      {
        "song": "Tabla Solo Teentaal",
        "artist": "Zakir Hussain",
        "videoId": "ZtRPB8xHP8M",
        "mood": "A night piece. On tabla."
      },
      {
        "song": "Tabla duet Alla Rakha",
        "artist": "Zakir Hussain",
        "videoId": "ALZpNazAVts",
        "mood": "A night piece. On tabla."
      },
      {
        "song": "Tabla Solo Rupak",
        "artist": "Zakir Hussain",
        "videoId": "kxSjqlGZgR8",
        "mood": "A night piece. On tabla."
      }
    ]
  },
  {
    "id": 7,
    "start": 1,
    "end": 4,
    "time": "1:00 AM – 4:00 AM",
    "label": "Late Night",
    "familyRaga": "Malkauns",
    "mood": "A deep, meditative pentatonic raga family for the stillness before dawn.",
    "options": [
      {
        "raga": "Malkauns",
        "artist": "Kishori Amonkar",
        "videoId": "RmQdomwsLIY",
        "gender": "female",
        "views": "150K",
        "mood": "Pentatonic and stark, Malkauns pulls the mind into the silent, unguarded depths of deep night."
      },
      {
        "raga": "Bageshri",
        "artist": "Kaushiki Chakraborty",
        "videoId": "aqFzQYDk55w",
        "gender": "female",
        "views": "120K",
        "mood": "Bageshri's tender longing mirrors a lover waiting alone under a fading moon."
      },
      {
        "raga": "Bageshri",
        "artist": "Veena Sahasrabuddhe",
        "videoId": "9q-kuhpxps4",
        "gender": "female",
        "views": "60K",
        "mood": "A soft, moonlit ache of devotion drifts through this hour when the world has gone quiet."
      },
      {
        "raga": "Adana",
        "artist": "Malini Rajurkar",
        "videoId": "1Eq6SkccBvY",
        "gender": "female",
        "views": "40K",
        "mood": "Adana's brisk, valorous energy stirs restless resolve just before the night gives way."
      },
      {
        "raga": "Malkauns",
        "artist": "N. Rajam (violin)",
        "videoId": "Ba9ghrhZhB4",
        "gender": "female",
        "views": "90K",
        "mood": "The violin's gayaki voice sings Malkauns with an ancient, wordless gravity."
      },
      {
        "raga": "Bageshri",
        "artist": "Meeta Pandit",
        "videoId": "inQu3sbpII4",
        "gender": "female",
        "views": "70K",
        "mood": "Bageshri unspools slowly, its Komal Gandhar aching like memory in the small hours."
      },
      {
        "raga": "Bageshri",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "4pjfRy7QpRI",
        "gender": "female",
        "views": "85K",
        "mood": "A patient unfolding of yearning, Bageshri's phrases curl like smoke in the dark."
      },
      {
        "raga": "Chandrakauns",
        "artist": "Roopa Panesar (sitar)",
        "videoId": "eIlzQPm5PYQ",
        "gender": "female",
        "views": "45K",
        "mood": "Chandrakauns glows like moonlight on still water, hypnotic and faintly haunted."
      },
      {
        "raga": "Bageshri",
        "artist": "Malini Rajurkar",
        "videoId": "eD1X4WyUYr0",
        "gender": "female",
        "views": "35K",
        "mood": "Warm, plaintive Bageshri lingers in the stillness before dawn's first hint of light."
      },
      {
        "raga": "Malkauns",
        "artist": "Girija Devi",
        "videoId": "LQciemcQ3Uw",
        "gender": "female",
        "views": "110K",
        "mood": "Girija Devi's Malkauns feels like a solitary lamp burning in an otherwise silent house."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Sudha Joshi",
        "videoId": "TmqfIObJH_c",
        "gender": "female",
        "views": "15K",
        "mood": "Darbari's slow, weighty gamak carries the solemn hush of a court long asleep."
      },
      {
        "raga": "Malkauns",
        "artist": "Padma Talwalkar",
        "videoId": "K8VZCNoFuHM",
        "gender": "female",
        "views": "50K",
        "mood": "Meditative and bare, this Malkauns strips away distraction to sit with the night's silence."
      },
      {
        "raga": "Malkauns",
        "artist": "Manjiri Asnare Kelkar",
        "videoId": "jldYnm7b2WA",
        "gender": "female",
        "views": "40K",
        "mood": "A young voice carries Malkauns' ancient introspection into the emptiest hour of the night."
      },
      {
        "raga": "Bageshri",
        "artist": "Ustad Rashid Khan",
        "videoId": "5hdW359BmcY",
        "gender": "male",
        "views": "300K",
        "mood": "Rashid Khan's Bageshri aches with tender restlessness, love suspended in the dark."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Pandit Ajoy Chakraborty",
        "videoId": "M835HEmzuJo",
        "gender": "male",
        "views": "150K",
        "mood": "Darbari's regal gravity settles like a slow, dignified sigh over the sleeping world."
      },
      {
        "raga": "Malkauns",
        "artist": "Ustad Shahid Parvez Khan (sitar)",
        "videoId": "7HooGHjOko8",
        "gender": "male",
        "views": "200K",
        "mood": "The sitar's dark, resonant strings trace Malkauns' brooding path through the small hours."
      },
      {
        "raga": "Malkauns",
        "artist": "Pandit Bhimsen Joshi",
        "videoId": "t_vHgKe1o2A",
        "gender": "male",
        "views": "500K",
        "mood": "Bhimsen Joshi's thunderous devotion turns Malkauns into a prayer whispered at the edge of sleep."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Amjad Ali Khan (sarod)",
        "videoId": "_cIa9aSJK1g",
        "gender": "male",
        "views": "250K",
        "mood": "The sarod's deep meend voices Darbari's majestic, unhurried sorrow in the dead of night."
      },
      {
        "raga": "Chandrakauns",
        "artist": "Pandit Hariprasad Chaurasia (flute)",
        "videoId": "S1cRSCOVW7E",
        "gender": "male",
        "views": "400K",
        "mood": "The bansuri's breath turns Chandrakauns into moonlight made audible."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Pandit Ulhas Kashalkar",
        "videoId": "S44naNdwEME",
        "gender": "male",
        "views": "80K",
        "mood": "Kashalkar's Darbari moves with the slow dignity of a raga built for the deepest hour."
      },
      {
        "raga": "Malkauns",
        "artist": "Pandit Rajan & Sajan Mishra",
        "videoId": "6fk_1SdD3SY",
        "gender": "male",
        "views": "120K",
        "mood": "Twin voices entwine in Malkauns, deepening the night's hush into something sacred."
      },
      {
        "raga": "Bageshri",
        "artist": "Ustad Vilayat Khan (sitar)",
        "videoId": "lmR5Tzx1xzg",
        "gender": "male",
        "views": "180K",
        "mood": "Vilayat Khan's singing sitar bends Bageshri into pure, aching romance after midnight."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Amir Khan",
        "videoId": "HbJEuFz5Jx8",
        "gender": "male",
        "views": "220K",
        "mood": "Amir Khan's unhurried Darbari feels like time itself slowing to a solemn crawl."
      },
      {
        "raga": "Malkauns",
        "artist": "Pandit Nikhil Banerjee (sitar)",
        "videoId": "IurXW7ZVAs0",
        "gender": "male",
        "views": "160K",
        "mood": "Banerjee's Malkauns spirals inward, a hypnotic descent into the night's quiet core."
      },
      {
        "raga": "Malkauns",
        "artist": "Pandit Shivkumar Sharma (santoor)",
        "videoId": "rg0-JxgiqDk",
        "gender": "male",
        "views": "350K",
        "mood": "The santoor's shimmering resonance gives Malkauns a crystalline, otherworldly stillness."
      },
      {
        "raga": "Malkauns",
        "artist": "Kaushiki Chakraborty",
        "videoId": "VPnftPyRQDo",
        "gender": "female",
        "views": "80K",
        "mood": "Kaushiki's hushed alaap coils through Malkauns like smoke, drawing the last waking thought into stillness."
      },
      {
        "raga": "Bageshri",
        "artist": "Ashwini Bhide-Deshpande",
        "videoId": "Z3hSo5Tw0BM",
        "gender": "female",
        "views": "40K",
        "mood": "Bageshri's tender, melancholic phrases wrap the small hours in a quiet, aching longing."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ulhas Kashalkar",
        "videoId": "wLveWTDYMl8",
        "gender": "male",
        "views": "30K",
        "mood": "Darbari's slow, gravity-laden meends settle over the night like a weighted, contemplative hush."
      },
      {
        "raga": "Chandrakauns",
        "artist": "Rashid Khan",
        "videoId": "2Bn3WG8ntCI",
        "gender": "male",
        "views": "60K",
        "mood": "Chandrakauns glows cool and austere, a moonlit ache that lingers in the emptied hours before dawn."
      },
      {
        "raga": "Adana",
        "artist": "Amjad Ali Khan (sarod)",
        "videoId": "f9pyjelnQMs",
        "gender": "male",
        "views": "100K",
        "mood": "Adana's restless, minor-toned sarod lines stir a wakeful solitude deep within the night's last watch."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "N. Rajam (violin)",
        "videoId": "-YFcCZGRsdU",
        "gender": "female",
        "views": "50K",
        "mood": "N. Rajam's singing violin draws Darbari's somber curves into a meditative, near-silent vigil."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "ismOvvhQVKE",
        "gender": "male",
        "views": "70K",
        "mood": "Darbari Kanada's regal, midnight gravity from the Banaras duo."
      },
      {
        "raga": "Malkauns",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "QSVAzOxk-3w",
        "gender": "male",
        "views": "90K",
        "mood": "A deep, meditative Malkauns for the stillest hour of the night."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Ali Akbar Khan (sarod)",
        "videoId": "ld1gocdOooY",
        "gender": "male",
        "views": "160K",
        "mood": "Ali Akbar Khan's sarod Darbari — the deepest, most regal midnight."
      },
      {
        "raga": "Kaunsi Kanada",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "QGceECIH7vU",
        "gender": "male",
        "views": "35K",
        "mood": "Kaunsi Kanada — Malkauns meets Kanada in the stillest small hours."
      },
      {
        "raga": "Bageshri",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "AyoAMY8vewI",
        "gender": "male",
        "views": "35K",
        "mood": "Bageshri in the small hours, the raga of waiting for someone who isn't coming."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "Dhu4wYhI5ow",
        "gender": "male",
        "views": "40K",
        "mood": "Darbari from the Bhairav Se Bhairavi Tak concert in Varanasi — slow, regal, nocturnal."
      },
      {
        "raga": "Jogkauns",
        "artist": "Pt. Rajan & Sajan Mishra",
        "videoId": "LAlRWbCS9uQ",
        "gender": "male",
        "views": "20K",
        "mood": "Jogkauns from 'Divine Voices of Benares' — a modern kauns for the deepest hour."
      },
      {
        "raga": "Malkauns",
        "artist": "Ajoy Chakrabarty",
        "videoId": "UXiYq9LY9po",
        "gender": "male",
        "views": "211K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Patiala gharana."
      },
      {
        "raga": "Jog",
        "artist": "Anoushka Shankar",
        "videoId": "3mwQvdi0Fik",
        "gender": "female",
        "views": "489K",
        "mood": "Night, built on a major and minor third refusing to resolve. On sitar."
      },
      {
        "raga": "Malkauns",
        "artist": "Arati Ankalikar-Tikekar",
        "videoId": "x_G7X6M7W9Q",
        "gender": "female",
        "views": "25K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Agra / Jaipur-Atrauli gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Bade Ghulam Ali Khan",
        "videoId": "sisG8crGoEQ",
        "gender": "male",
        "views": "416K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Patiala gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Devaki Pandit",
        "videoId": "FYt8pLLmNkQ",
        "gender": "female",
        "views": "4K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Adana",
        "artist": "Gundecha Brothers",
        "videoId": "8Zn3gpG8crI",
        "gender": "male",
        "views": "845K",
        "mood": "Darbari's quick cousin, late night with the tempo up. Sung dhrupad."
      },
      {
        "raga": "Malkauns",
        "artist": "Gundecha Brothers",
        "videoId": "J5jLKaMJ-74",
        "gender": "male",
        "views": "104K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Sung dhrupad."
      },
      {
        "raga": "Jog",
        "artist": "Hariprasad Chaurasia",
        "videoId": "0O-wwqD9v0w",
        "gender": "male",
        "views": "500K",
        "mood": "Night, built on a major and minor third refusing to resolve. On bansuri."
      },
      {
        "raga": "Bageshri",
        "artist": "Hirabai Barodekar",
        "videoId": "6kr92NaW0r8",
        "gender": "female",
        "views": "8K",
        "mood": "The small hours, waiting for someone who isn't coming. Khayal, Kirana gharana."
      },
      {
        "raga": "Jog",
        "artist": "Kala Ramnath",
        "videoId": "BvanDqxY8UE",
        "gender": "female",
        "views": "22K",
        "mood": "Night, built on a major and minor third refusing to resolve. On violin."
      },
      {
        "raga": "Jog",
        "artist": "Kaushiki Chakraborty",
        "videoId": "jkNlOUF6OLE",
        "gender": "female",
        "views": "703K",
        "mood": "Night, built on a major and minor third refusing to resolve. Khayal, Patiala gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Malini Rajurkar",
        "videoId": "4LLGQvUDtdM",
        "gender": "female",
        "views": "113K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Gwalior gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Mallikarjun Mansur",
        "videoId": "XEtlmFA4AqA",
        "gender": "male",
        "views": "148K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Manjiri Asanare-Kelkar",
        "videoId": "EU-QG-s0q5Q",
        "gender": "female",
        "views": "5K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Sampurna Malkauns",
        "artist": "Mogubai Kurdikar",
        "videoId": "4ajigelQUlw",
        "gender": "female",
        "views": "2K",
        "mood": "Malkauns opened out to the full scale, rarer and less severe. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "N. Rajam",
        "videoId": "Yzzlw2K5GCo",
        "gender": "female",
        "views": "237K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. On violin, in the gayaki ang."
      },
      {
        "raga": "Malkauns",
        "artist": "Nikhil Banerjee",
        "videoId": "ssO9fHiDJrg",
        "gender": "male",
        "views": "448K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. On sitar."
      },
      {
        "raga": "Malkauns",
        "artist": "Omkarnath Thakur",
        "videoId": "Ia1X6S5rims",
        "gender": "male",
        "views": "55K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Gwalior gharana."
      },
      {
        "raga": "Adana",
        "artist": "Pandit Jasraj",
        "videoId": "4j4brANIdE8",
        "gender": "male",
        "views": "3.6M",
        "mood": "Darbari's quick cousin, late night with the tempo up. Khayal, Mewati gharana."
      },
      {
        "raga": "Malkauns",
        "artist": "Rajan & Sajan Mishra",
        "videoId": "g8Su1mShMKc",
        "gender": "male",
        "views": "84K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Sung as a duet."
      },
      {
        "raga": "Jog",
        "artist": "Ravi Shankar",
        "videoId": "aNKTWhcw5nI",
        "gender": "male",
        "views": "196K",
        "mood": "Night, built on a major and minor third refusing to resolve. On sitar."
      },
      {
        "raga": "Kirwani",
        "artist": "Shahid Parvez",
        "videoId": "iWgsMe52m1Y",
        "gender": "male",
        "views": "281K",
        "mood": "A late-night raga with a Western minor's shape. On sitar."
      },
      {
        "raga": "Malkauns",
        "artist": "Shahid Parvez",
        "videoId": "_wxgfhJpW4g",
        "gender": "male",
        "views": "178K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. On sitar."
      },
      {
        "raga": "Kirwani",
        "artist": "Shivkumar Sharma",
        "videoId": "IAU69jFtJtU",
        "gender": "male",
        "views": "1.3M",
        "mood": "A late-night raga with a Western minor's shape. On santoor."
      },
      {
        "raga": "Malkauns",
        "artist": "Shruti Sadolikar",
        "videoId": "ty_syiJH-f8",
        "gender": "female",
        "views": "10K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Jaipur-Atrauli gharana."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Ali Akbar Khan",
        "videoId": "lssXO3Qp3o0",
        "gender": "male",
        "views": "129K",
        "mood": "Slow, regal, nocturnal — the raga of the court at its most serious. On sarod."
      },
      {
        "raga": "Chandranandan",
        "artist": "Ustad Ali Akbar Khan",
        "videoId": "_CtXORtvvYM",
        "gender": "male",
        "views": "87K",
        "mood": "Ali Akbar Khan's own raga, moonlit and Kanada-shadowed. On sarod."
      },
      {
        "raga": "Malkauns",
        "artist": "Ustad Amir Khan",
        "videoId": "vMidQAtLxLU",
        "gender": "male",
        "views": "258K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. Khayal, Indore gharana."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Amir Khan",
        "videoId": "e70Py6kgEsc",
        "gender": "male",
        "views": "106K",
        "mood": "Slow, regal, nocturnal — the raga of the court at its most serious. Khayal, Indore gharana."
      },
      {
        "raga": "Bageshri",
        "artist": "Ustad Amjad Ali Khan",
        "videoId": "z4CogWM1Tis",
        "gender": "male",
        "views": "146K",
        "mood": "The small hours, waiting for someone who isn't coming. On sarod."
      },
      {
        "raga": "Malkauns",
        "artist": "Ustad Sultan Khan",
        "videoId": "xnW3SW3Rl-g",
        "gender": "male",
        "views": "76K",
        "mood": "The deepest night raga — five notes, all komal, nothing bright admitted. On sarangi."
      },
      {
        "raga": "Jog",
        "artist": "Ustad Sultan Khan",
        "videoId": "OEP2pa1pnaw",
        "gender": "male",
        "views": "64K",
        "mood": "Night, built on a major and minor third refusing to resolve. On sarangi."
      },
      {
        "raga": "Darbari Kanada",
        "artist": "Ustad Vilayat Khan",
        "videoId": "mrfZ8TzY294",
        "gender": "male",
        "views": "353K",
        "mood": "Slow, regal, nocturnal — the raga of the court at its most serious. On sitar."
      }
    ],
    "filmy": [
      {
        "song": "Man Tarpat Hari Darshan Ko Aaj",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Mohammed Rafi",
        "raga": "Malkauns",
        "videoId": "LJ6OYBYh-tc",
        "mood": "The definitive filmy Malkauns — Rafi's soul crying out in the dead of night."
      },
      {
        "song": "O Duniya Ke Rakhwale",
        "film": "Baiju Bawra",
        "year": 1952,
        "artist": "Mohammed Rafi",
        "raga": "Darbari Kanada",
        "videoId": "BNoVr4dZd2c",
        "mood": "A thunderous Darbari Kanada plea to the heavens, late and desperate."
      },
      {
        "song": "Aadha Hai Chandrama",
        "film": "Navrang",
        "year": 1959,
        "artist": "Mahendra Kapoor, Asha Bhosle",
        "raga": "Malkauns",
        "videoId": "30GfQcNH1Ag",
        "mood": "C. Ramchandra's Malkauns under a half-moon, half the night gone."
      },
      {
        "song": "Ketaki Gulab Juhi",
        "film": "Basant Bahar",
        "year": 1956,
        "artist": "Manna Dey, Bhimsen Joshi",
        "raga": "Basant Bahar",
        "videoId": "wJJ9Ji8qZyA",
        "mood": "The legendary classical duel in Basant-Bahar — a spring night ablaze."
      },
      {
        "song": "Kehna Hi Kya",
        "film": "Bombay",
        "year": 1995,
        "artist": "K.S. Chitra",
        "raga": "Bageshri",
        "videoId": "RfK54g1wo9k",
        "mood": "A.R. Rahman's Bageshri reverie, aching and restless after midnight."
      },
      {
        "song": "Jhanak Jhanak Payal Baaje",
        "film": "Jhanak Jhanak Payal Baaje",
        "year": 1955,
        "artist": "Ustad Amir Khan",
        "raga": "Adana",
        "videoId": "RziYfS_CCqo",
        "mood": "Ustad Amir Khan's Adana — a pure classical title song for the deep night."
      },
      {
        "song": "Aaye Sur Ke Panchhi Aaye",
        "film": "Sur Sangam",
        "year": 1985,
        "artist": "Pt. Rajan & Sajan Mishra",
        "raga": "Malkauns",
        "videoId": "YRr2oqHb6js",
        "mood": "The Mishra brothers in Malkauns for film — birds of melody arriving in the night."
      },
      {
        "song": "Prem Jogan Ban Ke",
        "film": "Mughal-e-Azam",
        "year": 1960,
        "artist": "Ustad Bade Ghulam Ali Khan",
        "raga": "Sohni",
        "videoId": "zJuM0IDrEmM",
        "mood": "Bade Ghulam Ali Khan's Sohni — the pre-dawn ache of love, one of film's greatest classical moments."
      },
      {
        "song": "Jhanak Jhanak Tori Baaje Payaliya",
        "film": "Mere Huzoor",
        "year": 1968,
        "artist": "Manna Dey",
        "raga": "Darbari Kanada",
        "videoId": "Qqc10SrSMW4",
        "mood": "Manna Dey's Darbari Kanada — anklets ringing through the deep court night."
      },
      {
        "song": "Kaahe Chhed Chhed Mohe",
        "film": "Devdas",
        "year": 2002,
        "artist": "Pandit Birju Maharaj, Kavita Krishnamurthy",
        "raga": "Basant",
        "videoId": "dSMUJ2oEGB4",
        "mood": "Birju Maharaj's Basant — a kathak thumri blazing through the spring night."
      },
      {
        "song": "Balma Mane Na",
        "film": "Opera House",
        "year": 1961,
        "artist": "Lata Mangeshkar",
        "raga": "Malkauns",
        "videoId": "j2zi19WKpow",
        "mood": "Chitragupta's Malkauns — the beloved won't relent, deep in the night."
      },
      {
        "song": "Darbar Mein Upar Wale Ke",
        "film": "Hera Pheri",
        "year": 1976,
        "artist": "Kishore Kumar, Mahendra Kapoor",
        "raga": "Malkauns",
        "videoId": "tq9xBmKwaNM",
        "mood": "Kalyanji-Anandji's Malkauns — a wry midnight sermon on fate's tricks."
      },
      {
        "song": "Deep Jalaye Jo Geeton Ke",
        "film": "Kalakaar",
        "year": 1983,
        "artist": "Suresh Wadkar",
        "raga": "Malkauns",
        "videoId": "ngCQ2uJiO_o",
        "mood": "Kalyanji-Anandji's Malkauns — lamps lit with song against the night."
      },
      {
        "song": "Ek Ladki Thi Kitni Sharmili",
        "film": "Love You Hamesha",
        "year": 1999,
        "artist": "Kavita Krishnamurthy",
        "raga": "Malkauns",
        "videoId": "mc3nnXYyDIc",
        "mood": "A.R. Rahman's surprisingly pure Malkauns — a shy girl remembered at night."
      },
      {
        "song": "Ankhiyan Sang Ankhiyaan Laagi",
        "film": "Bada Aadmi",
        "year": 1961,
        "artist": "Mohammed Rafi",
        "raga": "Malkauns",
        "videoId": "KG8cxLEKAAk",
        "mood": "Chitragupta's Malkauns — eyes locking with eyes in the deep night."
      },
      {
        "song": "Mujhe Na Bula",
        "film": "Suvarna Sundari",
        "year": 1958,
        "artist": "Lata Mangeshkar",
        "raga": "Malkauns",
        "videoId": "uQ7JQli7Ehs",
        "mood": "A tender Malkauns plea — do not call me now, in the stillness of night."
      },
      {
        "song": "Rang Raliyan Karat",
        "film": "Birbal My Brother",
        "year": 1973,
        "artist": "Bhimsen Joshi, Pandit Jasraj",
        "raga": "Malkauns",
        "videoId": "3o_4PHPJiX8",
        "mood": "Two titans in jugalbandi — reputedly the purest Malkauns in any Hindi film."
      },
      {
        "song": "O Pavan Veg Se Udanewale Ghode",
        "film": "Jai Chitaur",
        "year": 1961,
        "artist": "Lata Mangeshkar",
        "raga": "Malkauns",
        "videoId": "9pFSvHxbE74",
        "mood": "S.N. Tripathi's Malkauns — a midnight cry to the galloping wind-swift steed."
      },
      {
        "song": "Nirbal Se Ladai Balwan Ki",
        "film": "Toofan Aur Diya",
        "year": 1956,
        "artist": "Manna Dey",
        "raga": "Malkauns",
        "videoId": "up1rsSYPUf8",
        "mood": "Vasant Desai's Malkauns — the lamp's defiance of the storm, deep in the night."
      },
      {
        "song": "Tu Chhupi Hai Kahan",
        "film": "Navrang",
        "year": 1959,
        "artist": "Asha Bhosle, Manna Dey",
        "raga": "Malkauns",
        "videoId": "1lieuCEc_wI",
        "mood": "C. Ramchandra's Malkauns — searching the night for a hidden beloved."
      },
      {
        "song": "Sawan Ki Raat Kari Kari",
        "film": "Meharban",
        "year": 1967,
        "artist": "Asha Bhosle",
        "raga": "Malkauns",
        "videoId": "cQ7vIY-fcW8",
        "mood": "Ravi's Malkauns — a black monsoon night, heavy and yearning."
      },
      {
        "song": "Kabir bhajan in Charukeshi",
        "artist": "Gundecha Brothers",
        "videoId": "G3K_8zv36Q4",
        "mood": "A piece for the last watch of the night. Sung dhrupad.",
        "raga": "Charukeshi"
      },
      {
        "song": "Sunta Hai Guru Gyani",
        "artist": "Kumar Gandharva",
        "videoId": "ordi4e72nVY",
        "mood": "A piece for the last watch of the night. Khayal, Gwalior / independent gharana."
      },
      {
        "song": "Nirbhay Nirgun",
        "artist": "Kumar Gandharva",
        "videoId": "V1tXJu-1O8U",
        "mood": "A piece for the last watch of the night. Khayal, Gwalior / independent gharana."
      },
      {
        "song": "Ram Niranjan Nyara Re",
        "artist": "Kumar Gandharva",
        "videoId": "Hr8ama4aXHY",
        "mood": "A piece for the last watch of the night. Khayal, Gwalior / independent gharana."
      },
      {
        "song": "Ud Jayega Hans Akela",
        "artist": "Kumar Gandharva",
        "videoId": "X8n-G1ZJUSE",
        "mood": "A piece for the last watch of the night. Khayal, Gwalior / independent gharana."
      },
      {
        "song": "Lalon",
        "artist": "Shubha Mudgal",
        "videoId": "J1k7l0oK988",
        "mood": "A piece for the last watch of the night. Khayal."
      }
    ]
  }
];

function getCurrentPrahar(date) {
  date = date || new Date();
  const h = date.getHours() + date.getMinutes() / 60;
  return PRAHARS.find(function (p) {
    if (p.end <= 24) return h >= p.start && h < p.end;
    return h >= p.start || h < p.end - 24;
  });
}

function pickRandomOption(prahar) {
  const opts = prahar.options;
  return opts[Math.floor(Math.random() * opts.length)];
}
