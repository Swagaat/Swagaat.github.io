# Swagat Neupane — Portfolio

Personal portfolio for Swagat Neupane, a software and machine learning engineer. It is a static site built with HTML, CSS, and vanilla JavaScript, and is hosted on GitHub Pages at https://swagaat.github.io/.

## Run locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. There is no install or build step.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Single-page portfolio: hero, About, Skills, Projects, Experience & education, Contact |
| `case-*.html` | Project case studies (Nepal, calculator, portfolio, geometry) |
| `extra.html` | Keyboard-accessible calculator demo |
| `nepal.html`, `nepal.css`, `nepal.js` | Standalone Nepal showcase with filters and a schematic map |
| `WEB.html` | Original geometry coursework with an adjustable spider-web model |
| `404.html` | Custom not-found page (served automatically by GitHub Pages) |
| `about.html`, `portfolio.html`, `contact.html` | Redirects that keep old links working |
| `styles.css` | Shared design system: color tokens, light/dark themes, components |
| `script.js` | Theme toggle, mobile menu, active-section nav, scroll reveals, copy-email, calculator |
| `favicon.svg`, `assets/og-image.png` | Favicon and social-sharing preview image |
| `robots.txt`, `sitemap.xml` | Search-engine metadata |

## Editing content

- **Colors and theme:** edit the custom properties at the top of `styles.css`. The dark palette is defined twice, once for the system preference and once for the manual toggle, so keep both blocks in sync.
- **Projects, skills, experience:** edit the matching `<section>` in `index.html`. The Experience column includes a commented template for adding a job, internship, or certification.
- **LinkedIn:** a commented link is in the hero `social-row`. Uncomment it and set the URL, then add the same link to the contact list and footer.
- **Resume:** the Resume button, contact card, and footer all link to the same Google Drive URL. Update all three if the file changes, or add a PDF to `assets/` and link to it.
- **Header/footer on case pages:** each case page includes its own copy of the header and footer, because the site has no build step. Update those copies if you change the navigation.

Project descriptions state each project's status (team vs. individual, prototype vs. live) and the scope of any reported metric. Keep that standard when adding work.

## Contact

The site uses a direct email link and a copy-address button. It has no form backend, and GitHub Pages cannot run server code. To add a form later, use a hosted form service (for example, Formspree) and show clear success and error messages.

## Publishing

GitHub Pages publishes from `main`, root folder. Commit and push, then check the Pages deployment in the repository's Actions tab.
