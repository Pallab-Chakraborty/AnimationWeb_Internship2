# Character Showcase

[![Deploy to GitHub Pages](https://github.com/Pallab-Chakraborty/Your-SuperHeros-ImageSlider/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pallab-Chakraborty/Your-SuperHeros-ImageSlider/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A cinematic, autoplaying character showcase slider — a stacked-card carousel with a blurred parallax background, animated stat bars, keyboard/swipe navigation, and a detail modal for each character.

**Live demo:** `https://pallab-chakraborty.github.io/Your-SuperHeros-ImageSlider/`

## Features

- Stacked "featured card + receding side cards" layout, inspired by streaming-service carousels
- Blurred, cross-fading background hero image synced to the active card
- Autoplay with a circular progress ring, pausable on hover or click
- Keyboard shortcuts (← → to navigate, space to pause, enter to open detail, esc to close)
- Touch swipe support
- A detail modal with animated ability/stat bars per character

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml   CI: auto-deploys to GitHub Pages on every push to main
├── index.html           Page structure and markup
├── css/
│   └── styles.css       All styling and animations
├── js/
│   ├── data.js            Character data + image paths
│   └── app.js              Slider state, rendering, navigation, autoplay, modal logic
├── images/               Character portraits used by the slider
├── package.json          Project metadata + local dev script (no build step)
├── LICENSE               MIT (covers the code — see note on images below)
└── README.md
```

## Running locally

No build tools required — it's plain HTML/CSS/JS. Either:

```bash
npm start
# serves the site at http://localhost:8000
```

or, without npm:

```bash
python3 -m http.server 8000
```

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that deploys automatically.

1. Push these files to your repo (replacing the old single-file `index.html`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).
5. GitHub will publish to `https://<username>.github.io/<repo-name>/` within a minute or two — the badge at the top of this README tracks deploy status.

(If you'd rather deploy the old way — Settings → Pages → "Deploy from a branch" — that still works too; you can just ignore or delete the workflow file.)

## Customizing

- **Characters:** edit the `characters` array in `js/data.js` — each entry has a `name`, `tagline`, `desc`, `abilities`, `stats`, `badge`, and an `images` array pointing into `images/`.
- **Adding a character:** drop a new portrait into `images/`, add its path to the `IMG` object in `js/data.js`, then add a matching entry to the `characters` array.
- **Colors/theme:** edit the CSS variables at the top of `css/styles.css` (`--gold`, `--dark`, etc).
- **Autoplay speed:** `AUTOPLAY_DURATION` (in milliseconds) near the top of `js/app.js`.

## A note on the character images

The portraits in `images/` include copyrighted characters (Marvel's Iron Man, Spider-Man, and Captain America) alongside Hanuman, Ganesh, and Krishna illustrations. The MIT license above covers the code in this repo — it does not grant any rights to those images. If you plan to publish or share this project publicly, swap in artwork you have the rights to use, or replace the Marvel characters with original or licensed illustrations.

## Tech notes

- Fonts: Cinzel (display) + Raleway (body), loaded from Google Fonts.
- Icons: Font Awesome (CDN).
- No frameworks, no build step — vanilla JS throughout.
