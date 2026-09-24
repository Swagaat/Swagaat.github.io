# Swagat Neupane — Personal Portfolio

A static portfolio and Nepal showcase built with HTML, CSS, JavaScript, and SVG. Hosted on GitHub Pages at https://swagaat.github.io/.

## Run locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. No install or build step is required.

## Pages

- `index.html`: introduction, role interests, and featured work.
- `about.html`: background, education, and tools.
- `portfolio.html`: project directory.
- `case-*.html`: four project case studies, linked to demos and source.
- `contact.html`: direct email, copy-address button, GitHub, and existing résumé link.
- `extra.html`: keyboard-accessible basic calculator.
- `nepal.html`: illustrated Nepal showcase with filters and an interactive schematic map.
- `WEB.html`: original geometry coursework and interactive spider-web model.

Shared portfolio styles and behavior are in `styles.css` and `script.js`. Nepal uses `nepal.css` and `nepal.js`. `assets/` includes the original landscape illustration and screenshots of the working demos.

## Editing content

Update the introduction in `index.html`, background in `about.html`, and contact links in `contact.html`. Keep résumé links in contact and portfolio pages consistent. Case-study text describes demonstrated behavior, without invented employment history or performance claims.

To add personal Nepal photography, add optimized images to `assets/`, supply meaningful alt text and captions in `nepal.html`, and credit any photographer other than yourself. Current imagery consists of illustrations and project screenshots; it is not presented as travel photography.

The map is an illustrated overview, not a navigational map. Place definitions are in `nepal.js`. All place cards remain available without JavaScript. Animations respect reduced-motion settings.

## Publishing

GitHub Pages publishes from `main`, root folder. Commit and push the intended changes, then check the Pages deployment in the repository's Actions tab.

## Scope

The current résumé link is preserved from the original site and needs the owner's confirmation that it is current. Personal Nepal photographs, a first-hand story, and a verified LinkedIn profile are awaiting owner input.

The site uses direct email; it does not submit or deliver contact messages through a backend. Legacy files under `images/` are retained for history and are not the active contact flow. GitHub Pages does not execute PHP.
