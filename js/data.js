// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const IMG = {
  ironman: 'images/ironman.jpg',
  spiderman: 'images/spiderman.jpg',
  captain: 'images/captain.jpg',
  hanuman: 'images/hanuman.jpg',
  ganesh: 'images/ganesh.jpg',
  krishna: 'images/krishna.jpg'
};
const characters = [
  {
    name: "Iron Man",
    tagline: "Genius. Billionaire. Playboy. Philanthropist.",
    badge: "Marvel Universe",
    badgeIcon: "fa-solid fa-bolt",
    desc: "Tony Stark — the armored Avenger who turned personal tragedy into humanity's greatest shield. With an IQ that dwarfs his ego (barely), he builds impossible technology and faces impossible odds with a smirk.",
    abilities: ["Arc Reactor", "Repulsor Beams", "J.A.R.V.I.S. AI", "Nano-Armor", "Time Travel"],
    stats: { Strength: 72, Intelligence: 98, Speed: 65, Durability: 80 },
    images: [IMG.ironman],
    fallback: "linear-gradient(145deg, #7b1c1c 0%, #c0392b 40%, #e74c3c 70%, #ff6b35 100%)",
    fallbackIcon: "🤖",
    color: "#c0392b"
  },
  {
    name: "Spider-Man",
    tagline: "With great power comes great responsibility.",
    badge: "Marvel Universe",
    badgeIcon: "fa-solid fa-spider",
    desc: "Peter Parker balances high school, heartbreak, and heroics with a quick quip and quicker reflexes. His spider-sense, web-shooters, and scientific mind make him one of Marvel's most beloved and relatable heroes.",
    abilities: ["Web-Shooting", "Spider-Sense", "Wall Crawling", "Super Reflexes", "Scientific Genius"],
    stats: { Strength: 78, Intelligence: 92, Speed: 88, Durability: 70 },
    images: [IMG.spiderman],
    fallback: "linear-gradient(145deg, #5c0a0a 0%, #c0392b 35%, #e74c3c 60%, #003399 100%)",
    fallbackIcon: "🕷️",
    color: "#e74c3c"
  },
  {
    name: "Captain America",
    tagline: "Not to fight so that I win — but so that I'm right.",
    badge: "Marvel Universe",
    badgeIcon: "fa-solid fa-shield",
    desc: "Steve Rogers, a man out of time yet never behind it. The Super-Soldier serum amplified his body, but it was always his unbreakable will and moral compass that made him the world's greatest soldier.",
    abilities: ["Vibranium Shield", "Super Strength", "Enhanced Agility", "Tactical Genius", "Accelerated Healing"],
    stats: { Strength: 85, Intelligence: 75, Speed: 80, Durability: 88 },
    images: [IMG.captain],
    fallback: "linear-gradient(145deg, #0d1f4a 0%, #2e4fa3 40%, #3b6bdf 70%, #5b8af0 100%)",
    fallbackIcon: "🛡️",
    color: "#2e4fa3"
  },
  {
    name: "Hanuman",
    tagline: "Devotion, Strength & Boundless Grace.",
    badge: "Hindu Mythology",
    badgeIcon: "fa-solid fa-om",
    desc: "The Vanara warrior and devoted servant of Lord Rama. Blessed with immeasurable strength, the power to fly, and the ability to grow or shrink at will, Hanuman's greatest power is his unwavering devotion and pure heart.",
    abilities: ["Infinite Strength", "Flight", "Shape-shifting", "Divine Devotion", "Immortality"],
    stats: { Strength: 100, Intelligence: 82, Speed: 95, Durability: 100 },
    images: [IMG.hanuman],
    fallback: "linear-gradient(145deg, #5a2500 0%, #c0621a 35%, #e67e22 65%, #f5b041 100%)",
    fallbackIcon: "🙏",
    color: "#e67e22"
  },
  {
    name: "Ganesh",
    tagline: "Remover of obstacles, bestower of wisdom.",
    badge: "Hindu Mythology",
    badgeIcon: "fa-solid fa-om",
    desc: "Son of Shiva and Parvati, Ganesha is the elephant-headed deity of beginnings, wisdom, and prosperity. Before any venture, he is invoked first — for no path is clear without his blessing.",
    abilities: ["Obstacle Removal", "Infinite Wisdom", "Divine Blessing", "Cosmic Vision", "Manifestation"],
    stats: { Strength: 90, Intelligence: 100, Speed: 70, Durability: 95 },
    images: [IMG.ganesh],
    fallback: "linear-gradient(145deg, #5a3800 0%, #c07a00 35%, #f39c12 65%, #f8c471 100%)",
    fallbackIcon: "🐘",
    color: "#f39c12"
  },
  {
    name: "Krishna",
    tagline: "I am the beginning, the middle and the end.",
    badge: "Hindu Mythology",
    badgeIcon: "fa-solid fa-om",
    desc: "The eighth avatar of Vishnu, the divine charioteer of Arjuna on Kurukshetra's battlefield. Krishna's wisdom in the Bhagavad Gita has guided generations — a cowherd, a lover, a philosopher, a god.",
    abilities: ["Sudarshana Chakra", "Vishwaroop", "Flute of Creation", "Omniscience", "Divine Illusion"],
    stats: { Strength: 95, Intelligence: 100, Speed: 90, Durability: 98 },
    images: [IMG.krishna],
    fallback: "linear-gradient(145deg, #2d0a5c 0%, #6c3483 35%, #8e44ad 65%, #a569bd 100%)",
    fallbackIcon: "🪈",
    color: "#8e44ad"
  }
];

