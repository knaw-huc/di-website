# DI Website

This repo builds the [Digital Infrastructure](https://di.huc.knaw.nl) site. You write Markdown, run a build, get static HTML.

All content lives in `content/markdown/`. Nothing else is picked up by the build.

## Quick start

```bash
npm install
npm run build
```

Output lands in `_dist/`. Rebuild after every content change.

---

## Where to put things

```
content/markdown/
├── nl-nl/              Dutch
│   ├── pages/          Main site (nav, sections)
│   ├── featured/       Research cases (homepage cards)
│   ├── staff/          Team profiles
│   └── tools/          Tool pages
└── en-gb/              English — same folders
```

The subfolder name becomes the content type (`pages` → `page`, `featured` → `featured`, etc.). Need something new, like news? Add a folder and wire it up in the theme if you want it in navigation or lists.

Dutch and English are separate. Match files across both folders when you want bilingual content.

---

## Pages

Site structure lives in `pages/`. Filenames control order and hierarchy:

```
XX_YY_filename.md
```

`XX` is the section (`01` = expertise, `02` = activities). `YY` is the sub-page (`00` = section header, `01+` = child).

Examples: `00_00_home.md` (homepage), `01_00_expertise.md` (section), `01_01_tekstanalyse.md` (child under expertise).

**Section headers without content** — pages like Expertise or About that only group the menu:

```yaml
---
title: Expertise
directSubpages: true
publish: true
---
```

No HTML file is generated. The nav links straight to the first child page.

**A normal page:**

```yaml
---
title: Tekstanalyse
author: Hennie Brugman
summary: Short blurb for cards and previews
publish: true
---

Write your content here. Standard Markdown works — headings, lists, links.

Link to other pages by their *output* filename: [Werken bij DI](werken-bij-di-nl.html)
```

`publish: true` is required. Without it, the file is skipped.

**Output filenames** come from the title, not the `.md` name. Dutch home → `index.html`, English home → `home-en.html`, everything else → `{title-slug}-{lang}.html` (e.g. `tekstanalyse-nl.html`).

---

## Frontmatter

The YAML block at the top of each file drives metadata and layout.

**Most files:** `title`, `author`, `summary`, `meta_description`, `featured_image`, `publish`, and optionally `template` to pick a layout.

**Featured articles:** add `publication_date`, `showPubDate`, `showAuthor`.

**Homepage** (`00_00_home.md`): `hero1`, `hero2`, `template: di-home.html`.

**Staff:** extra fields like `email`, `telephone`, `function_short` pass through to templates.

Any field you add in frontmatter is available in templates — useful for tools (`github`, `tags`, etc.).

---

## Images

Put files in `content/images/` (editorial) or `themes/huc-di/images/` (shared/theme). Both end up in `_dist/images/`.

**List cards** — filename only in frontmatter:

```yaml
featured_image: menno_rasch.jpg
```

**In the body** — square brackets are alt text, quotes are the caption:

```markdown
![Screenshot Letters Van Gogh. Er is een interface ... brief genoemd worden.](images/Screenshot-Letters-Van-Gogh.png "Screenshot van Van Gogh Letters")
```

The path (`images/...`) is relative to the site root. Describe what someone needs to know if they can't see the image — that's the alt text. The caption is optional and shows below the image. Leave alt empty only for decoration. (European Accessibility Act.)

---

## Lists

You don't maintain lists by hand. The build collects all published content per language into `lists.page`, `lists.featured`, `lists.staff`, `lists.tools`. Each entry has title, filename, path, summary, featured image, and hierarchy level.

Order follows the numeric prefix in filenames. `01_menno.md`, `02_arno.md` for staff; `XX_YY_` for pages.

Navigation, breadcrumbs, and the homepage columns all read from these lists. Add a published file to `featured/` with `summary` and `featured_image` — it shows up on the homepage automatically.

---

## Common tasks

**New page** — create `pages/XX_YY_name.md` in both languages, set `publish: true`, rebuild, link using the generated `.html` name.

**New research case** — add to `featured/`, fill in title, summary, featured_image, write the body, rebuild.

**New staff member** — add to `staff/` with contact info and a photo.

**Static HTML** (accessibility statement, etc.) — drop in `content/static/`, copied as-is to `_dist/`.

---

## Config & build

`content/config.yaml` sets the theme, output path, and site URL for the sitemap.

`npm run build` scans Markdown → writes `data/site.json` → renders HTML with Handlebars → compiles Tailwind → copies images, JS, and static files → generates sitemap.

Individual steps if you need them: `collect-data`, `build-html`, `build-css`.

Requires Node.js 18+.
