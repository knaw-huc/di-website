# di-website
KNAW Digital Infrastructure website

## Notes from Bas

Hi Arno, can you, for now, store it in just one folder? After our meeting yesterday I had an idea about using only the markdown files and no spreadsheet. The idea is to use the site structure in the naming of the files. Example:

Content (folder)
 |
 +-- nl_00_00-home.md
 |
 +-- nl_01_00_expertise.md
 |
 +-- nl_01_01_text-analysis.md
 |
 +-- nl_01_02_structured-data.md
 |
 +-- nl_01_03_computer-vision.md etc.
 |
 +-- nl_02_00_activities.md
 |
 +-- nl_02_01_research-projects.md
 |
 +-- nl_02_02_infrastructure-projects.md etc.

Extra metadata (like author and publication date) can placed into the markdown file using YAML, example:
---
Title: Expertise
author: Arno Bosse
publication-date: 2022-01-22
type: news
---
This way the site can be manages from only within the markdownfiles in the repository.
