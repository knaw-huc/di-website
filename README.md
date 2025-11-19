# DI-website

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

**A static website builder for the KNAW Digital Infrastructure website**

This repository contains the source content and configuration for the Digital Infrastructure website of the KNAW Humanities Cluster. The website is built using a custom static site generator that converts Markdown files into HTML pages.

## Description

This project provides a multilingual static website for the Digital Infrastructure department of the KNAW Humanities Cluster. The site is generated from Markdown content files using a Node.js-based static site generator, which is included as a git submodule. The generator supports multiple languages, hierarchical page structures, and custom templates.

## Introduction

### What is it?

This repository contains the complete source for the Digital Infrastructure website, including:

- **Content files**: Markdown files organized by language (Dutch and English) in the `content/markdown/` directory
- **Images and assets**: Static assets in the `content/images/` directory
- **Configuration**: Site configuration in `ssg_config.json`
- **Site generator**: The static site generator is located in the `static-site-generator/` folder as a git submodule
- **Generated output**: The built HTML website is output to the `httpDocs/` directory

### What does it do?

The static site generator:

- Converts Markdown files to HTML pages
- Generates a hierarchical site structure based on file naming conventions
- Supports multiple languages (currently Dutch and English)
- Applies custom templates and styling
- Generates navigation menus automatically
- Processes metadata from YAML front matter in Markdown files

### For whom?

This project is intended for:

- **Content editors**: Who need to add or modify website content by editing Markdown files
- **Website maintainers**: Who need to build and deploy the static website
- **Developers**: Who may need to customize templates, styling, or the site generator itself

### Technical Architecture

The website consists of:

- **Content layer**: Markdown files with YAML front matter for metadata
- **Generator**: Node.js application that processes Markdown and generates HTML
- **Template engine**: Handlebars templates for page rendering
- **Styling**: SCSS files compiled to CSS
- **Output**: Static HTML files ready for deployment

The site generator (`static-site-generator/`) is a separate git submodule that handles:
- Parsing Markdown files and extracting metadata
- Building the site structure from file naming conventions
- Rendering pages using Handlebars templates
- Compiling SCSS to CSS
- Generating the final HTML output

## Installation

### Prerequisites

- **Node.js**: Version compatible with the site generator (check `static-site-generator/package.json` for specific requirements)
- **Git**: For cloning the repository and managing the submodule
- **npm**: Comes with Node.js, used for installing dependencies

### Obtaining the Project

Clone the repository:

```bash
git clone <repository-url>
cd di-website
```

### Initial Setup

1. **Initialize the git submodule** (the static site generator):

```bash
git submodule init
git submodule update
```

2. **Install dependencies**:

```bash
cd static-site-generator
npm install
```

3. **Initialize the site** (if setting up a new site):

```bash
npm run init
```

This will set up the initial site structure and configuration.

## Usage

### Building the Website

To build the website:

```bash
cd static-site-generator
npm run start
```

This command will:
1. Extract structure from Markdown files (`getMd`)
2. Build the site (`build`)
3. Start a watch mode that rebuilds on file changes (`nodemon`)

### Development Mode

For development with automatic rebuilding on file changes:

```bash
cd static-site-generator
npm run start
```

The generator will watch for changes in JavaScript, SCSS, HTML, and Markdown files and automatically rebuild the site.

### Content Structure

#### File Naming Convention

The site structure is determined by the first 5 characters of the Markdown filename:

- First 2 digits: Top-level navigation item
- Next 2 digits (after underscore): Second-level page (use `00` for top-level pages)
- Remaining characters: Descriptive filename

Example:
```
00_00_home.md          → Home (top level)
01_00_about.md         → About (top level)
01_01_information.md   → About > Information (subpage)
01_02_colofon.md       → About > Colofon (subpage)
02_00_contact.md       → Contact (top level)
```

#### Languages

Content is organized by language in subdirectories:
- `content/markdown/nl/` - Dutch content
- `content/markdown/en/` - English content

#### Metadata

Each Markdown file should start with YAML front matter:

```yaml
---
title: Page Title
author: Author Name
type: page
meta_description: Description for SEO
meta_keyword: keywords, for, seo
summary: A brief summary
featured_image: image.jpg
---
```

Required metadata:
- `title`: The page title (mandatory)

Optional metadata:
- `author`: Author name
- `type`: Content type (`page`, `news`, `feature`)
- `meta_description`: SEO description
- `meta_keyword`: SEO keywords
- `summary`: Summary text for listings
- `featured_image`: Thumbnail image for listings
- `publication_date`: Publication date
- `template`: Custom template to use

### Configuration

Site configuration is stored in `ssg_config.json` in the project root. This file contains:

- Output directory (`dirOutput`)
- Content directories (`dirContent`, `dirMarkdown`, `dirJson`)
- Default language (`languageDefault`)
- Site name and URL
- Styling colors and branding
- Footer content
- Custom page types and templates

## Documentation

For more detailed documentation about the static site generator itself, see the [static-site-generator README](static-site-generator/README.md).

## Support and Roadmap

### Maintainers

B. Doppen (HuC)

### Roadmap

- Person pages
- Product pages


