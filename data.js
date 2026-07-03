// Ashta Prahar (8 three-hour segments) mapped to a representative Hindustani
// classical raga traditionally sung/played during that time of day.
// Video IDs point to verified, named-artist performances on YouTube.

const PRAHARS = [
  {
    id: 0,
    start: 4,
    end: 7,
    time: "4:00 AM – 7:00 AM",
    label: "Early Morning",
    raga: "Bhairav",
    artist: "Ustad Rashid Khan",
    videoId: "S6yYZqVHiVA",
    mood: "Solemn and devotional — the classic raga to greet sunrise."
  },
  {
    id: 1,
    start: 7,
    end: 10,
    time: "7:00 AM – 10:00 AM",
    label: "Morning",
    raga: "Ahir Bhairav",
    artist: "Kaushiki Chakraborty",
    videoId: "jNdHo4mx1Kg",
    mood: "Warm and awakening, blending Bhairav with softer Kafi shades."
  },
  {
    id: 2,
    start: 10,
    end: 13,
    time: "10:00 AM – 1:00 PM",
    label: "Late Morning",
    raga: "Bilawal",
    artist: "Kishori Amonkar",
    videoId: "HfpHaA1bOJQ",
    mood: "Bright, natural-scale raga full of ease and quiet devotion."
  },
  {
    id: 3,
    start: 13,
    end: 16,
    time: "1:00 PM – 4:00 PM",
    label: "Afternoon",
    raga: "Bhimpalasi",
    artist: "Ustad Shahid Parvez Khan",
    videoId: "ZZYscSfriVA",
    mood: "The pangs of longing for a distant lover — the classic afternoon raga."
  },
  {
    id: 4,
    start: 16,
    end: 19,
    time: "4:00 PM – 7:00 PM",
    label: "Dusk",
    raga: "Puriya Dhanashri",
    artist: "Saylee Talwalkar",
    videoId: "U-Ai6bI5D6k",
    mood: "Grave and introspective, sung as day turns into evening."
  },
  {
    id: 5,
    start: 19,
    end: 22,
    time: "7:00 PM – 10:00 PM",
    label: "Evening",
    raga: "Yaman",
    artist: "Pt. Rajan & Sajan Mishra",
    videoId: "sXRtFIifuAc",
    mood: "Serene and romantic — the most beloved evening raga."
  },
  {
    id: 6,
    start: 22,
    end: 25, // wraps past midnight to 1 AM
    time: "10:00 PM – 1:00 AM",
    label: "Night",
    raga: "Kedar",
    artist: "Pt. Ajoy Chakraborty",
    videoId: "Q95vFPHlCnA",
    mood: "Sweet and devotional, often associated with Lord Shiva."
  },
  {
    id: 7,
    start: 1,
    end: 4,
    time: "1:00 AM – 4:00 AM",
    label: "Late Night",
    raga: "Malkauns",
    artist: "Vidushi Ashwini Bhide",
    videoId: "EhPq9xZrIIc",
    mood: "A deep, meditative pentatonic raga for the stillness before dawn."
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
