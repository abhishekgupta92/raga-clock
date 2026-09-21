// Artist directory for the Artists view. The catalogue itself lives in
// data.js — this file only supplies what can't be derived from it: a portrait
// and a one-line description. Track counts, ragas and praharas are computed at
// runtime by grouping data.js, so there is one database and several views.
//
// `img` is a freely-licensed thumbnail hosted by Wikimedia (CC BY-SA / public
// domain), present for 71 of 112 artists. The rest have no free image on
// Wikipedia and fall back to a generated initials tile — no image is bundled
// or re-hosted here.
//
// `key` is the honorific-stripped, lower-cased name used to match entries in
// data.js, so "Pt. Bhimsen Joshi" and "Pandit Bhimsen Joshi" are one artist.

const ARTIST_INFO = [
  {
    "key": "rajan & sajan mishra",
    "name": "Pandit Rajan & Sajan Mishra",
    "discipline": "Vocal duo (Banaras)",
    "era": "b.1951 / b.1956",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Pandit_Rajan_Sajan_Mishra_Performing_at_Bharat_Bhavan_Bhopal_06.jpg/500px-Pandit_Rajan_Sajan_Mishra_Performing_at_Bharat_Bhavan_Bhopal_06.jpg"
  },
  {
    "key": "lata mangeshkar",
    "name": "Lata Mangeshkar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/2/2f/LataMangeshkar10.jpg"
  },
  {
    "key": "kishori amonkar",
    "name": "Kishori Amonkar",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "1932-2017"
  },
  {
    "key": "ashwini bhide-deshpande",
    "name": "Ashwini Bhide-Deshpande",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Ashwini_Bhide-Deshpande_Performing_at_Rajarani_Music_Festival-2016%2C_Bhubaneswar%2C_Odisha%2C_India_%2809%29.JPG/500px-Ashwini_Bhide-Deshpande_Performing_at_Rajarani_Music_Festival-2016%2C_Bhubaneswar%2C_Odisha%2C_India_%2809%29.JPG",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "b.1960"
  },
  {
    "key": "mohammed rafi",
    "name": "Mohammed Rafi",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Mohammed_Rafi_2016_postcard_of_India_crop-flip.jpg/500px-Mohammed_Rafi_2016_postcard_of_India_crop-flip.jpg"
  },
  {
    "key": "kaushiki chakraborty",
    "name": "Kaushiki Chakraborty",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Kaushiki_Chakraborty_bharat-s-tiwari-photography-IMG_0183_January_11%2C_2018-2.jpg/500px-Kaushiki_Chakraborty_bharat-s-tiwari-photography-IMG_0183_January_11%2C_2018-2.jpg",
    "discipline": "Vocal (Patiala gharana)",
    "era": "b.1980"
  },
  {
    "key": "rashid khan",
    "name": "Ustad Rashid Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Ustad_rashid_kan_bharat_bhavan_bhopal_%284%29.JPG/500px-Ustad_rashid_kan_bharat_bhavan_bhopal_%284%29.JPG",
    "discipline": "Vocal (Rampur-Sahaswan)",
    "era": "1968-2024"
  },
  {
    "key": "bhimsen joshi",
    "name": "Pandit Bhimsen Joshi",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Bhimsen_Joshi.jpg/500px-Bhimsen_Joshi.jpg",
    "discipline": "Vocal (Kirana gharana)",
    "era": "1922-2011"
  },
  {
    "key": "malini rajurkar",
    "name": "Malini Rajurkar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Malini_Rajurkar_performing_in_Arghya_2011.jpg/500px-Malini_Rajurkar_performing_in_Arghya_2011.jpg",
    "discipline": "Vocal (Gwalior gharana)",
    "era": "1941-2023"
  },
  {
    "key": "ulhas kashalkar",
    "name": "Pandit Ulhas Kashalkar",
    "discipline": "Vocal (Gwalior-Agra-Jaipur)",
    "era": "b.1955"
  },
  {
    "key": "veena sahasrabuddhe",
    "name": "Veena Sahasrabuddhe",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Pranab_Mukherjee_presenting_the_Sangeet_Natak_Akademi_Award-2013_to_Ms._Veena_Sahasrabudhe%2C_in_the_field_of_Hindustani_Vocal_Music.jpg/500px-Pranab_Mukherjee_presenting_the_Sangeet_Natak_Akademi_Award-2013_to_Ms._Veena_Sahasrabudhe%2C_in_the_field_of_Hindustani_Vocal_Music.jpg",
    "discipline": "Vocal (Gwalior gharana)",
    "era": "1948-2016"
  },
  {
    "key": "asha bhosle",
    "name": "Asha Bhosle",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Ashaji.jpg/500px-Ashaji.jpg"
  },
  {
    "key": "manna dey",
    "name": "Manna Dey",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Manna_De.jpg/500px-Manna_De.jpg"
  },
  {
    "key": "hariprasad chaurasia",
    "name": "Pandit Hariprasad Chaurasia",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Hariprasad_Chaurasia_in_July_2015_%281%29.jpg/500px-Hariprasad_Chaurasia_in_July_2015_%281%29.jpg",
    "discipline": "Bansuri (flute)",
    "era": "b.1938"
  },
  {
    "key": "manjiri asanare kelkar",
    "name": "Manjiri Asnare Kelkar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Manjiri_Asanare%E2%80%93Kelkar.png/500px-Manjiri_Asanare%E2%80%93Kelkar.png",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "b.1974"
  },
  {
    "key": "ajoy chakraborty",
    "name": "Pandit Ajoy Chakraborty",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Ajoy-chakrabarty-duringprogramme.webp/500px-Ajoy-chakrabarty-duringprogramme.webp",
    "discipline": "Vocal (Patiala gharana)",
    "era": "b.1952"
  },
  {
    "key": "n rajam",
    "name": "Dr. N. Rajam",
    "discipline": "Violin (gayaki ang)",
    "era": "b.1938"
  },
  {
    "key": "shubha mudgal",
    "name": "Shubha Mudgal",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Shubha_Mudgal_%281%29.JPG/500px-Shubha_Mudgal_%281%29.JPG",
    "discipline": "Vocal (Khayal / crossover)",
    "era": "b.1959"
  },
  {
    "key": "amir khan",
    "name": "Ustad Amir Khan",
    "discipline": "Vocal (Indore gharana)",
    "era": "1912-1974"
  },
  {
    "key": "shahid parvez khan",
    "name": "Ustad Shahid Parvez Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Shahid_Parvez_Khan_i5225.png/500px-Shahid_Parvez_Khan_i5225.png",
    "discipline": "Sitar",
    "era": "b.1958"
  },
  {
    "key": "jasraj",
    "name": "Pandit Jasraj",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Pandit_Jasraj_at_Bhopal_2015.jpg/500px-Pandit_Jasraj_at_Bhopal_2015.jpg",
    "discipline": "Vocal (Mewati gharana)",
    "era": "1930-2020"
  },
  {
    "key": "vilayat khan",
    "name": "Ustad Vilayat Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Vilayat_Khan.jpg/500px-Vilayat_Khan.jpg",
    "discipline": "Sitar",
    "era": "1928-2004"
  },
  {
    "key": "begum parveen sultana",
    "name": "Begum Parveen Sultana",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Parveen_sultana.JPG/500px-Parveen_sultana.JPG",
    "discipline": "Vocal (Patiala)",
    "era": "b.1950"
  },
  {
    "key": "girija devi",
    "name": "Girija Devi",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Girija_Devi_at_Bhopal_%281%29.JPG/500px-Girija_Devi_at_Bhopal_%281%29.JPG",
    "discipline": "Vocal / Thumri (Banaras)",
    "era": "1929-2017"
  },
  {
    "key": "padma talwalkar",
    "name": "Padma Talwalkar",
    "discipline": "Vocal (Gwalior / Jaipur)",
    "era": "b.1948"
  },
  {
    "key": "nikhil banerjee",
    "name": "Pandit Nikhil Banerjee",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Nikhil_Banerjee.jpg/500px-Nikhil_Banerjee.jpg",
    "discipline": "Sitar",
    "era": "1931-1986"
  },
  {
    "key": "shruti sadolikar",
    "name": "Shruti Sadolikar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Shruti_Sadolikar_Katkar_06.jpg/500px-Shruti_Sadolikar_Katkar_06.jpg",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "b.1951"
  },
  {
    "key": "ali akbar khan",
    "name": "Ustad Ali Akbar Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Ali_Akbar.jpg/500px-Ali_Akbar.jpg",
    "discipline": "Sarod",
    "era": "1922-2009"
  },
  {
    "key": "amjad ali khan",
    "name": "Ustad Amjad Ali Khan",
    "img": "https://upload.wikimedia.org/wikipedia/commons/2/22/Amjad_Ali_Khan.jpg",
    "discipline": "Sarod",
    "era": "b.1945"
  },
  {
    "key": "arati ankalikar tikekar",
    "name": "Arati Ankalikar-Tikekar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Arati_Ankalikar_Tikekarji.jpg/500px-Arati_Ankalikar_Tikekarji.jpg",
    "discipline": "Vocal (Agra / Jaipur-Atrauli)",
    "era": "b.1963"
  },
  {
    "key": "gangubai hangal",
    "name": "Gangubai Hangal",
    "img": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Gangubai_Hangal.jpg",
    "discipline": "Vocal (Kirana gharana)",
    "era": "1913-2009"
  },
  {
    "key": "kishore kumar",
    "name": "Kishore Kumar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Kishore_Kumar_2016_postcard_of_India_%28cropped%29.jpg/500px-Kishore_Kumar_2016_postcard_of_India_%28cropped%29.jpg"
  },
  {
    "key": "mogubai kurdikar",
    "name": "Mogubai Kurdikar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/4/40/Mogubai_Kurdikar_%28cropped%29.png",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "1904-2001"
  },
  {
    "key": "mukesh",
    "name": "Mukesh"
  },
  {
    "key": "venkatesh kumar",
    "name": "Pandit Venkatesh Kumar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Venkatesh_Kumar.jpg/500px-Venkatesh_Kumar.jpg",
    "discipline": "Vocal (Gwalior-Kirana)",
    "era": "b.1953"
  },
  {
    "key": "bade ghulam ali khan",
    "name": "Ustad Bade Ghulam Ali Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Ustad_Bade_Ghulam_Ali_Khan.jpg/500px-Ustad_Bade_Ghulam_Ali_Khan.jpg",
    "discipline": "Vocal (Patiala gharana)",
    "era": "1902-1968"
  },
  {
    "key": "d v paluskar",
    "name": "D. V. Paluskar",
    "discipline": "Vocal (Gwalior gharana)",
    "era": "1921-1955"
  },
  {
    "key": "devaki pandit",
    "name": "Devaki Pandit",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Devaki_Pandit.jpg/500px-Devaki_Pandit.jpg",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "b.1965"
  },
  {
    "key": "gundecha brothers",
    "name": "Gundecha Brothers",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Gundecha_Brothers_02A.jpg/500px-Gundecha_Brothers_02A.jpg",
    "discipline": "Dhrupad vocal",
    "era": "b.1962 / b.1966"
  },
  {
    "key": "hirabai barodekar",
    "name": "Hirabai Barodekar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/0/07/HirabaiBarodekar1937.png",
    "discipline": "Vocal (Kirana gharana)",
    "era": "1905-1989"
  },
  {
    "key": "kala ramnath",
    "name": "Kala Ramnath",
    "discipline": "Violin",
    "era": "b.1967"
  },
  {
    "key": "kavita krishnamurthy",
    "name": "Kavita Krishnamurthy",
    "img": "https://upload.wikimedia.org/wikipedia/commons/8/84/Kavita_Krishnamurthy_at_IFFI_2024.jpg"
  },
  {
    "key": "kesarbai kerkar",
    "name": "Kesarbai Kerkar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Kesarbai_Kerkar_awarded_by_President_Rajendra_Prasad.jpg/500px-Kesarbai_Kerkar_awarded_by_President_Rajendra_Prasad.jpg",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "1892-1977"
  },
  {
    "key": "kumar gandharva",
    "name": "Kumar Gandharva",
    "img": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Rajan%2C_TN_Krishnan_and_Kumar_Gandharva_%28cropped%29.jpg",
    "discipline": "Vocal (Gwalior / independent)",
    "era": "1924-1992"
  },
  {
    "key": "mallikarjun mansur",
    "name": "Mallikarjun Mansur",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Mallikarjun_Mansur_2014_stamp_of_India.jpg/500px-Mallikarjun_Mansur_2014_stamp_of_India.jpg",
    "discipline": "Vocal (Jaipur-Atrauli)",
    "era": "1910-1992"
  },
  {
    "key": "omkarnath thakur",
    "name": "Omkarnath Thakur",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Omkarnath_Thakur_1997_stamp_of_India.jpg/500px-Omkarnath_Thakur_1997_stamp_of_India.jpg",
    "discipline": "Vocal (Gwalior gharana)",
    "era": "1897-1967"
  },
  {
    "key": "shivkumar sharma",
    "name": "Pandit Shivkumar Sharma",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Pandit_Shivkumar_Sharma_Santoor.jpg/500px-Pandit_Shivkumar_Sharma_Santoor.jpg",
    "discipline": "Santoor",
    "era": "1938-2022"
  },
  {
    "key": "prabha atre",
    "name": "Prabha Atre",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Prabha_atre.jpg/500px-Prabha_atre.jpg",
    "discipline": "Vocal (Kirana gharana)",
    "era": "1932-2024"
  },
  {
    "key": "ravi shankar",
    "name": "Ravi Shankar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Ravi_Shankar.jpg/500px-Ravi_Shankar.jpg",
    "discipline": "Sitar",
    "era": "1920-2012"
  },
  {
    "key": "shobha gurtu",
    "name": "Shobha Gurtu",
    "img": "https://upload.wikimedia.org/wikipedia/commons/7/77/Shobha_gurtu.jpg",
    "discipline": "Thumri / Light classical",
    "era": "1925-2004"
  },
  {
    "key": "siddheshwari devi",
    "name": "Siddheshwari Devi",
    "discipline": "Thumri (Banaras)",
    "era": "1908-1977"
  },
  {
    "key": "sultan khan",
    "name": "Ustad Sultan Khan",
    "img": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sultan_Khan_2009_-_Still_67757_crop.jpg",
    "discipline": "Sarangi",
    "era": "1940-2011"
  },
  {
    "key": "zakir hussain",
    "name": "Zakir Hussain",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Ustad_Zakir_Hussain_1.jpg/500px-Ustad_Zakir_Hussain_1.jpg",
    "discipline": "Tabla",
    "era": "1951-2024"
  },
  {
    "key": "anoushka shankar",
    "name": "Anoushka Shankar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Anoushka_Shankar_-3623.jpg/500px-Anoushka_Shankar_-3623.jpg",
    "discipline": "Sitar",
    "era": "b.1981"
  },
  {
    "key": "begum akhtar",
    "name": "Begum Akhtar",
    "discipline": "Ghazal / Thumri / Dadra",
    "era": "1914-1974"
  },
  {
    "key": "k j yesudas",
    "name": "K.J. Yesudas"
  },
  {
    "key": "meeta pandit",
    "name": "Meeta Pandit",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Meeta_Pandit.jpg/500px-Meeta_Pandit.jpg"
  },
  {
    "key": "ram narayan",
    "name": "Pandit Ram Narayan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Ram_Narayan_1974_%28cropped%29.jpg/500px-Ram_Narayan_1974_%28cropped%29.jpg",
    "discipline": "Sarangi",
    "era": "1927-2024"
  },
  {
    "key": "bismillah khan",
    "name": "Ustad Bismillah Khan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Bismillah_Khan.jpg/500px-Bismillah_Khan.jpg",
    "discipline": "Shehnai",
    "era": "1916-2006"
  },
  {
    "key": "hemant kumar",
    "name": "Hemant Kumar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Hemant_Kumar_2016_stamp_of_India_%28cropped%29.jpg"
  },
  {
    "key": "mahendra kapoor",
    "name": "Mahendra Kapoor",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Mahendra_Kapoor.jpg/500px-Mahendra_Kapoor.jpg"
  },
  {
    "key": "saylee talwalkar",
    "name": "Saylee Talwalkar"
  },
  {
    "key": "b sivaramakrishna rao",
    "name": "B. Sivaramakrishna Rao"
  },
  {
    "key": "gauri pathare",
    "name": "Gauri Pathare",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Gauri_Pathare_1.jpg/500px-Gauri_Pathare_1.jpg"
  },
  {
    "key": "k l saigal",
    "name": "K.L. Saigal",
    "img": "https://upload.wikimedia.org/wikipedia/commons/5/5c/K._L._Saigal.jpg"
  },
  {
    "key": "sanjeev abhyankar",
    "name": "Pandit Sanjeev Abhyankar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/7/73/Sanjeev_Abhyankar_2_%28cropped%29.jpg"
  },
  {
    "key": "rajan mishra",
    "name": "Pt. Rajan Mishra",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Pandit_Rajan_Sajan_Mishra_Performing_at_Bharat_Bhavan_Bhopal_06.jpg/500px-Pandit_Rajan_Sajan_Mishra_Performing_at_Bharat_Bhavan_Bhopal_06.jpg"
  },
  {
    "key": "sajan mishra & swaransh mishra",
    "name": "Pt. Sajan Mishra & Swaransh Mishra"
  },
  {
    "key": "ragini shankar & nandini shankar",
    "name": "Ragini Shankar & Nandini Shankar"
  },
  {
    "key": "roopa panesar",
    "name": "Roopa Panesar"
  },
  {
    "key": "shankar mahadevan",
    "name": "Shankar Mahadevan",
    "img": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Shankar_Mahadevan_01_%28cropped%29.jpg"
  },
  {
    "key": "talat mahmood",
    "name": "Talat Mahmood",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Talat_Mahmood_2016_postcard_of_India_crop.jpg/500px-Talat_Mahmood_2016_postcard_of_India_crop.jpg"
  },
  {
    "key": "vani jairam",
    "name": "Vani Jairam",
    "img": "https://upload.wikimedia.org/wikipedia/commons/2/24/Vani_Jairam_2014_FF_%28cropped%29.jpg"
  },
  {
    "key": "aishwarya majmudar",
    "name": "Aishwarya Majmudar"
  },
  {
    "key": "anuradha paudwal",
    "name": "Anuradha Paudwal",
    "img": "https://upload.wikimedia.org/wikipedia/commons/1/11/Anuradha_Paudwal_57th_Idea_Filmfare_Awards_2011.jpg"
  },
  {
    "key": "archana",
    "name": "Archana"
  },
  {
    "key": "archana kamath shenoy",
    "name": "Archana Kamath Shenoy"
  },
  {
    "key": "bhupen hazarika",
    "name": "Bhupen Hazarika",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Dr._Bhupen_Hazarika%2C_Assam%2C_India.jpg/500px-Dr._Bhupen_Hazarika%2C_Assam%2C_India.jpg"
  },
  {
    "key": "hariharan",
    "name": "Hariharan"
  },
  {
    "key": "hemlata",
    "name": "Hemlata"
  },
  {
    "key": "indrani mukherjee",
    "name": "Indrani Mukherjee"
  },
  {
    "key": "k s chitra",
    "name": "K.S. Chitra",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Melody_Queen_of_Indian_Cinema_Dr._K_S_Chithra_%28cropped%29.jpg/500px-Melody_Queen_of_Indian_Cinema_Dr._K_S_Chithra_%28cropped%29.jpg"
  },
  {
    "key": "mehdi hassan",
    "name": "Mehdi Hassan"
  },
  {
    "key": "minmini",
    "name": "Minmini"
  },
  {
    "key": "mohammed aziz",
    "name": "Mohammed Aziz"
  },
  {
    "key": "mohan kannan",
    "name": "Mohan Kannan"
  },
  {
    "key": "mubarak begum",
    "name": "Mubarak Begum"
  },
  {
    "key": "nandini bedekar",
    "name": "Nandini Bedekar"
  },
  {
    "key": "nandini shankar",
    "name": "Nandini Shankar",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Nandini_Shankar_%28Violinist%29.jpg/500px-Nandini_Shankar_%28Violinist%29.jpg"
  },
  {
    "key": "niladri kumar & subhankar banerjee",
    "name": "Niladri Kumar & Subhankar Banerjee"
  },
  {
    "key": "birju maharaj",
    "name": "Pandit Birju Maharaj",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Pandit_Birju_Maharaj.jpg/500px-Pandit_Birju_Maharaj.jpg"
  },
  {
    "key": "jasraj & ustad sheikh dawood",
    "name": "Pandit Jasraj & Ustad Sheikh Dawood"
  },
  {
    "key": "rabin ghosh",
    "name": "Pandit Rabin Ghosh"
  },
  {
    "key": "rahul deshpande",
    "name": "Rahul Deshpande",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Rahul_Deshpande_singing_in_Vasantotsav_2010.jpg/500px-Rahul_Deshpande_singing_in_Vasantotsav_2010.jpg"
  },
  {
    "key": "s janaki",
    "name": "S. Janaki",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/S_Janaki_in_Pune%2C_India_2007.JPG/500px-S_Janaki_in_Pune%2C_India_2007.JPG"
  },
  {
    "key": "shafqat amanat ali",
    "name": "Shafqat Amanat Ali",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Shafqat_Amanat_Ali_%282023%29.jpg/500px-Shafqat_Amanat_Ali_%282023%29.jpg"
  },
  {
    "key": "shamshad begum",
    "name": "Shamshad Begum",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Shamshad_Begum_2016_postcard_of_India_crop.jpg/500px-Shamshad_Begum_2016_postcard_of_India_crop.jpg"
  },
  {
    "key": "shashwati mandal",
    "name": "Shashwati Mandal",
    "img": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Shashwati_Mandal_in_2010.jpg"
  },
  {
    "key": "shirin sengupta",
    "name": "Shirin Sengupta"
  },
  {
    "key": "shivani mirajkar",
    "name": "Shivani Mirajkar"
  },
  {
    "key": "sreeradha banerjee",
    "name": "Sreeradha Banerjee"
  },
  {
    "key": "sudha joshi",
    "name": "Sudha Joshi"
  },
  {
    "key": "sudha malhotra",
    "name": "Sudha Malhotra"
  },
  {
    "key": "sukhwinder singh",
    "name": "Sukhwinder Singh",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Sukhwinder_Singh_%28singer%29.jpg/500px-Sukhwinder_Singh_%28singer%29.jpg"
  },
  {
    "key": "suraiyya",
    "name": "Suraiyya",
    "img": "https://upload.wikimedia.org/wikipedia/commons/7/72/Suraiya_on_2013_stamp_of_India.jpg"
  },
  {
    "key": "suresh wadkar",
    "name": "Suresh Wadkar",
    "img": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Suresh_Wadkar_2008_-_still_29248_crop.jpg"
  },
  {
    "key": "swarnalatha",
    "name": "Swarnalatha"
  },
  {
    "key": "udit narayan",
    "name": "Udit Narayan",
    "img": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Udit-Narayan-2019.jpg/500px-Udit-Narayan-2019.jpg"
  },
  {
    "key": "amir khan & dv paluskar",
    "name": "Ustad Amir Khan & D.V. Paluskar"
  },
  {
    "key": "ghulam mustafa khan",
    "name": "Ustad Ghulam Mustafa Khan"
  },
  {
    "key": "nisar hussain khan",
    "name": "Ustad Nisar Hussain Khan"
  },
  {
    "key": "vrushali deshmukh",
    "name": "Vrushali Deshmukh"
  }
];
