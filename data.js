// Ashta Prahar (8 three-hour segments) mapped to the Hindustani classical
// ragas traditionally sung/played during that time of day. Each prahar has
// a pool of verified, named-artist YouTube performances — one is picked at
// random whenever the page loads or the prahar changes, and a "Shuffle" lets
// you draw a different one on demand. All video IDs were copied verbatim
// from real YouTube search results (never invented).

const PRAHARS = [
  {
    id: 0,
    start: 4,
    end: 7,
    time: "4:00 AM – 7:00 AM",
    label: "Early Morning",
    familyRaga: "Bhairav",
    mood: "Solemn and devotional — the classic raga family to greet sunrise.",
    options: [
      { raga: "Bhairav", artist: "Ustad Rashid Khan", videoId: "S6yYZqVHiVA", gender: "male", views: "200K", mood: "Solemn and devotional — the classic raga to greet sunrise." },
      { raga: "Nat Bhairav", artist: "Kaushiki Chakraborty", videoId: "YkJkwqJE0fU", gender: "female", views: "100K", mood: "A sterner cousin of Bhairav, sung with disciplined gravity at first light." },
      { raga: "Bhairavi", artist: "Kaushiki Chakraborty", videoId: "6_bfPzclL08", gender: "female", views: "90K", mood: "A meditative Bhairavi filmed at dawn, still and unhurried." },
      { raga: "Bhairavi", artist: "Veena Sahasrabuddhe", videoId: "HJ326bBjtmU", gender: "female", views: "60K", mood: "A tarana in Bhairavi, bright and rhythmic as the sky lightens." },
      { raga: "Bhairavi", artist: "Malini Rajurkar", videoId: "dRQ5s1koDzg", gender: "female", views: "35K", mood: "An archival tappa and tarana in Bhairavi, warm and unadorned." },
      { raga: "Nat Bhairav", artist: "B. Sivaramakrishna Rao (sitar)", videoId: "bOO-mWDpgVQ", gender: "male", views: "40K", mood: "A healing, contemplative sitar reading of Nat Bhairav." },
      { raga: "Bhairav", artist: "B. Sivaramakrishna Rao (sitar)", videoId: "CBGbe0j7bSQ", gender: "male", views: "40K", mood: "Sitar strings trace Bhairav's grave, temple-bell stillness." },
      { raga: "Bhairavi", artist: "Niladri Kumar & Subhankar Banerjee", videoId: "ZtOQ49_hO8s", gender: "male", views: "70K", mood: "Sitar and tabla in conversation, Bhairavi unfolding at daybreak." },
      { raga: "Bhairavi", artist: "Pt. Hariprasad Chaurasia (flute)", videoId: "tLXNNejKhJs", gender: "male", views: "150K", mood: "The bansuri's breath turns Bhairavi into pure morning air." }
    ]
  },
  {
    id: 1,
    start: 7,
    end: 10,
    time: "7:00 AM – 10:00 AM",
    label: "Morning",
    familyRaga: "Ahir Bhairav",
    mood: "Warm and awakening, blending Bhairav with softer Kafi shades.",
    options: [
      { raga: "Ahir Bhairav", artist: "Kaushiki Chakraborty", videoId: "jNdHo4mx1Kg", gender: "female", views: "120K", mood: "Warm and awakening, blending Bhairav with softer Kafi shades." },
      { raga: "Ahir Bhairav", artist: "Kaushiki Chakraborty (Live)", videoId: "Me3qpbOLOnA", gender: "female", views: "80K", mood: "A live concert reading of Ahir Bhairav, tender and unhurried." },
      { raga: "Ahir Bhairav", artist: "Veena Sahasrabuddhe (Sacred)", videoId: "zQsGxqCXKw8", gender: "female", views: "45K", mood: "A hushed, devotional Ahir Bhairav for the early working hours." },
      { raga: "Ahir Bhairav", artist: "Veena Sahasrabuddhe", videoId: "omg68kVb05I", gender: "female", views: "35K", mood: "\"Ghat ghat mein panchhi bolta\" — Ahir Bhairav sung with quiet clarity." },
      { raga: "Ahir Bhairav", artist: "Ragini Shankar & Nandini Shankar (violin)", videoId: "ouXgSMlyht4", gender: "female", views: "50K", mood: "Twin violins sing Ahir Bhairav in the gayaki, voice-like style." },
      { raga: "Ahir Bhairav", artist: "Ragini Shankar & Nandini Shankar (violin)", videoId: "OG9XVsYLK_k", gender: "female", views: "40K", mood: "A second take of the sisters' violin duet in Ahir Bhairav." },
      { raga: "Bilaskhani Todi", artist: "Sanjeev Abhyankar", videoId: "bT_uiHdLU3Y", gender: "male", views: "60K", mood: "Bilaskhani Todi's blend of Todi and Asavari, grave and searching." },
      { raga: "Bilaskhani Todi", artist: "Archana Kamath Shenoy", videoId: "boI5Vh9caNQ", gender: "female", views: "20K", mood: "A disciple's recital of Bilaskhani Todi, patient and sincere." },
      { raga: "Bilaskhani Todi", artist: "Ustad Rashid Khan", videoId: "e7xwX1-7zq4", gender: "male", views: "90K", mood: "Rashid Khan's Bilaskhani Todi, aching and richly ornamented." }
    ]
  },
  {
    id: 2,
    start: 10,
    end: 13,
    time: "10:00 AM – 1:00 PM",
    label: "Late Morning",
    familyRaga: "Bilawal",
    mood: "Bright, natural-scale ragas full of ease and quiet devotion.",
    options: [
      { raga: "Bilawal", artist: "Kishori Amonkar", videoId: "HfpHaA1bOJQ", gender: "female", views: "110K", mood: "Bright, natural-scale raga full of ease and quiet devotion." },
      { raga: "Alhaiya Bilawal", artist: "Gauri Pathare", videoId: "DQLb1N-_OQc", gender: "female", views: "20K", mood: "A peaceful Alhaiya Bilawal recital, unhurried and clear-toned." },
      { raga: "Alhaiya Bilawal", artist: "Padma Talwalkar", videoId: "5DYlQ61PEJI", gender: "female", views: "30K", mood: "Padma Talwalkar's Alhaiya Bilawal, full of Jaipur-Atrauli poise." },
      { raga: "Sukhiya Bilawal", artist: "Ashwini Bhide-Deshpande", videoId: "Nah7QC5YuOs", gender: "female", views: "45K", mood: "A rarer Sukhiya Bilawal, gentle and devotional in tone." },
      { raga: "Alhaiya Bilawal", artist: "Ashwini Bhide-Deshpande", videoId: "8Up3mDURDYk", gender: "female", views: "55K", mood: "An effortless, sunlit Alhaiya Bilawal from the Jaipur-Atrauli gharana." }
    ]
  },
  {
    id: 3,
    start: 13,
    end: 16,
    time: "1:00 PM – 4:00 PM",
    label: "Afternoon",
    familyRaga: "Bhimpalasi",
    mood: "The pangs of longing for a distant lover — the classic afternoon raga family.",
    options: [
      { raga: "Bhimpalasi", artist: "Ustad Shahid Parvez Khan (sitar)", videoId: "ZZYscSfriVA", gender: "male", views: "130K", mood: "The pangs of longing for a distant lover — the classic afternoon raga." },
      { raga: "Bhimpalasi", artist: "Kaushiki Chakraborty", videoId: "uEqYzdz3Zvg", gender: "female", views: "95K", mood: "An exquisite Patiala-style Bhimpalasi for the warm afternoon hours." },
      { raga: "Bhimpalasi", artist: "Kishori Amonkar", videoId: "uQghAGGP5fI", gender: "female", views: "85K", mood: "Kishori Amonkar's Bhimpalasi, rich with shringar and restraint." },
      { raga: "Bhimpalasi", artist: "Shubha Mudgal", videoId: "Yh8QfWlSv9Q", gender: "female", views: "70K", mood: "A brilliant khayal reading of Bhimpalasi from the Darbar stage." },
      { raga: "Multani", artist: "Meeta Pandit", videoId: "97Rm1ESDyCM", gender: "female", views: "30K", mood: "Multani's Taj-Mahal-of-melody intensity, mesmerising in khayal." },
      { raga: "Bhimpalasi", artist: "Manjiri Asanare Kelkar", videoId: "EW_S0lFPuAg", gender: "female", views: "25K", mood: "A bandish in Bhimpalasi sung with Jaipur-Atrauli sweetness." },
      { raga: "Patdeep", artist: "Ustad Rashid Khan", videoId: "P4UwqxAnWZs", gender: "male", views: "80K", mood: "Patdeep's ache of longing and devotion, sung with aching clarity." }
    ]
  },
  {
    id: 4,
    start: 16,
    end: 19,
    time: "4:00 PM – 7:00 PM",
    label: "Dusk",
    familyRaga: "Puriya Dhanashri",
    mood: "Grave and introspective, sung as day turns into evening.",
    options: [
      { raga: "Puriya Dhanashri", artist: "Saylee Talwalkar", videoId: "U-Ai6bI5D6k", gender: "female", views: "40K", mood: "Grave and introspective, sung as day turns into evening." },
      { raga: "Puriya Dhanashri", artist: "Aishwarya Majmudar", videoId: "cCWHglNcF0g", gender: "female", views: "35K", mood: "A tanpura-session rendition of Puriya Dhanashri at twilight." },
      { raga: "Puriya Dhanashree", artist: "Pandit Rabin Ghosh (violin)", videoId: "khVG2k-uZkI", gender: "male", views: "20K", mood: "Violin traces Puriya Dhanashri's sandhiprakash mood of transition." },
      { raga: "Pooriya", artist: "Ustad Rashid Khan (Live)", videoId: "NJggXtEK70Q", gender: "male", views: "110K", mood: "Pure Puriya, sung live with Rashid Khan's aching restraint." },
      { raga: "Marwa", artist: "Malini Rajurkar", videoId: "iB4qfAty24k", gender: "female", views: "25K", mood: "Marwa's unsettled, sunset-facing intensity in a classic recording." }
    ]
  },
  {
    id: 5,
    start: 19,
    end: 22,
    time: "7:00 PM – 10:00 PM",
    label: "Evening",
    familyRaga: "Yaman",
    mood: "Serene and romantic — the most beloved evening raga family.",
    options: [
      { raga: "Yaman", artist: "Pt. Rajan & Sajan Mishra", videoId: "sXRtFIifuAc", gender: "male", views: "140K", mood: "Serene and romantic — the most beloved evening raga." },
      { raga: "Yaman", artist: "Shubha Mudgal", videoId: "VmOvwFvkVao", gender: "female", views: "75K", mood: "Shubha Mudgal's Yaman, graceful and full of devotion." },
      { raga: "Yaman", artist: "Ustad Rashid Khan", videoId: "4eFzfbicz6k", gender: "male", views: "160K", mood: "An inspirational, richly ornamented Yaman from Rashid Khan." },
      { raga: "Yaman", artist: "Shivani Mirajkar", videoId: "G8UAmSr2Bw0", gender: "female", views: "15K", mood: "A clear, approachable Yaman for the evening's opening hour." },
      { raga: "Bhupali", artist: "Ashwini Bhide-Deshpande", videoId: "v3MwougAXY8", gender: "female", views: "40K", mood: "Bhupali's five notes glow softly as evening settles in." }
    ]
  },
  {
    id: 6,
    start: 22,
    end: 25, // wraps past midnight to 1 AM
    time: "10:00 PM – 1:00 AM",
    label: "Night",
    familyRaga: "Kedar",
    mood: "Sweet and devotional, often associated with Lord Shiva.",
    options: [
      { raga: "Kedar", artist: "Pt. Ajoy Chakraborty", videoId: "Q95vFPHlCnA", gender: "male", views: "100K", mood: "Sweet and devotional, often associated with Lord Shiva." },
      { raga: "Bihag", artist: "Kaushiki Chakraborty", videoId: "os7JZr1GYRU", gender: "female", views: "70K", mood: "A brisk drut khayal in Bihag, sweet and romantic at night." },
      { raga: "Basanti Kedar / Kafi Kanada", artist: "Pt. Ulhas Kashalkar", videoId: "bn5LZ-dm9kU", gender: "male", views: "50K", mood: "Two allied night ragas, sung with Gwalior-Jaipur-Agra depth." },
      { raga: "Kedar", artist: "Pt. Ulhas Kashalkar", videoId: "r1z_EeaEmeA", gender: "male", views: "45K", mood: "A dignified, unhurried Kedar from a master of three gharanas." }
    ]
  },
  {
    id: 7,
    start: 1,
    end: 4,
    time: "1:00 AM – 4:00 AM",
    label: "Late Night",
    familyRaga: "Malkauns",
    mood: "A deep, meditative pentatonic raga family for the stillness before dawn.",
    options: [
      { raga: "Malkauns", artist: "Kishori Amonkar", videoId: "RmQdomwsLIY", gender: "female", views: "150K", mood: "Pentatonic and stark, Malkauns pulls the mind into the silent, unguarded depths of deep night." },
      { raga: "Bageshri", artist: "Kaushiki Chakraborty", videoId: "aqFzQYDk55w", gender: "female", views: "120K", mood: "Bageshri's tender longing mirrors a lover waiting alone under a fading moon." },
      { raga: "Bageshri", artist: "Veena Sahasrabuddhe", videoId: "9q-kuhpxps4", gender: "female", views: "60K", mood: "A soft, moonlit ache of devotion drifts through this hour when the world has gone quiet." },
      { raga: "Adana", artist: "Malini Rajurkar", videoId: "1Eq6SkccBvY", gender: "female", views: "40K", mood: "Adana's brisk, valorous energy stirs restless resolve just before the night gives way." },
      { raga: "Malkauns", artist: "N. Rajam (violin)", videoId: "Ba9ghrhZhB4", gender: "female", views: "90K", mood: "The violin's gayaki voice sings Malkauns with an ancient, wordless gravity." },
      { raga: "Bageshri", artist: "Meeta Pandit", videoId: "inQu3sbpII4", gender: "female", views: "70K", mood: "Bageshri unspools slowly, its Komal Gandhar aching like memory in the small hours." },
      { raga: "Bageshri", artist: "Ashwini Bhide-Deshpande", videoId: "4pjfRy7QpRI", gender: "female", views: "85K", mood: "A patient unfolding of yearning, Bageshri's phrases curl like smoke in the dark." },
      { raga: "Chandrakauns", artist: "Roopa Panesar (sitar)", videoId: "eIlzQPm5PYQ", gender: "female", views: "45K", mood: "Chandrakauns glows like moonlight on still water, hypnotic and faintly haunted." },
      { raga: "Bageshri", artist: "Malini Rajurkar", videoId: "eD1X4WyUYr0", gender: "female", views: "35K", mood: "Warm, plaintive Bageshri lingers in the stillness before dawn's first hint of light." },
      { raga: "Malkauns", artist: "Girija Devi", videoId: "LQciemcQ3Uw", gender: "female", views: "110K", mood: "Girija Devi's Malkauns feels like a solitary lamp burning in an otherwise silent house." },
      { raga: "Darbari Kanada", artist: "Sudha Joshi", videoId: "TmqfIObJH_c", gender: "female", views: "15K", mood: "Darbari's slow, weighty gamak carries the solemn hush of a court long asleep." },
      { raga: "Malkauns", artist: "Padma Talwalkar", videoId: "K8VZCNoFuHM", gender: "female", views: "50K", mood: "Meditative and bare, this Malkauns strips away distraction to sit with the night's silence." },
      { raga: "Malkauns", artist: "Manjiri Asnare Kelkar", videoId: "jldYnm7b2WA", gender: "female", views: "40K", mood: "A young voice carries Malkauns' ancient introspection into the emptiest hour of the night." },
      { raga: "Bageshri", artist: "Ustad Rashid Khan", videoId: "5hdW359BmcY", gender: "male", views: "300K", mood: "Rashid Khan's Bageshri aches with tender restlessness, love suspended in the dark." },
      { raga: "Darbari Kanada", artist: "Pandit Ajoy Chakraborty", videoId: "M835HEmzuJo", gender: "male", views: "150K", mood: "Darbari's regal gravity settles like a slow, dignified sigh over the sleeping world." },
      { raga: "Malkauns", artist: "Ustad Shahid Parvez Khan (sitar)", videoId: "7HooGHjOko8", gender: "male", views: "200K", mood: "The sitar's dark, resonant strings trace Malkauns' brooding path through the small hours." },
      { raga: "Malkauns", artist: "Pandit Bhimsen Joshi", videoId: "t_vHgKe1o2A", gender: "male", views: "500K", mood: "Bhimsen Joshi's thunderous devotion turns Malkauns into a prayer whispered at the edge of sleep." },
      { raga: "Darbari Kanada", artist: "Ustad Amjad Ali Khan (sarod)", videoId: "_cIa9aSJK1g", gender: "male", views: "250K", mood: "The sarod's deep meend voices Darbari's majestic, unhurried sorrow in the dead of night." },
      { raga: "Chandrakauns", artist: "Pandit Hariprasad Chaurasia (flute)", videoId: "S1cRSCOVW7E", gender: "male", views: "400K", mood: "The bansuri's breath turns Chandrakauns into moonlight made audible." },
      { raga: "Darbari Kanada", artist: "Pandit Ulhas Kashalkar", videoId: "S44naNdwEME", gender: "male", views: "80K", mood: "Kashalkar's Darbari moves with the slow dignity of a raga built for the deepest hour." },
      { raga: "Malkauns", artist: "Pandit Rajan & Sajan Mishra", videoId: "6fk_1SdD3SY", gender: "male", views: "120K", mood: "Twin voices entwine in Malkauns, deepening the night's hush into something sacred." },
      { raga: "Bageshri", artist: "Ustad Vilayat Khan (sitar)", videoId: "lmR5Tzx1xzg", gender: "male", views: "180K", mood: "Vilayat Khan's singing sitar bends Bageshri into pure, aching romance after midnight." },
      { raga: "Darbari Kanada", artist: "Ustad Amir Khan", videoId: "HbJEuFz5Jx8", gender: "male", views: "220K", mood: "Amir Khan's unhurried Darbari feels like time itself slowing to a solemn crawl." },
      { raga: "Malkauns", artist: "Pandit Nikhil Banerjee (sitar)", videoId: "IurXW7ZVAs0", gender: "male", views: "160K", mood: "Banerjee's Malkauns spirals inward, a hypnotic descent into the night's quiet core." },
      { raga: "Malkauns", artist: "Pandit Shivkumar Sharma (santoor)", videoId: "rg0-JxgiqDk", gender: "male", views: "350K", mood: "The santoor's shimmering resonance gives Malkauns a crystalline, otherworldly stillness." }
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
