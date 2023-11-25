---
title: Text Analysis
author: Hennie Brugman
type: page
meta_description:
meta_keyword:
summary: We have extensive experience with publishing different kinds of digital scholarly text collections. These include literary editions, correspondence catalogues, as well as historical manuscripts and linguistic collections.
---
We have extensive experience with publishing different kinds of digital scholarly text collections. These include literary editions, correspondence catalogues, as well as historical manuscripts and linguistic collections. The collections we publish are usually supplemented by us with descriptive metadata, page images and other types of enrichments such as links to structured data and user annotations.

We offer researchers different means to carry out complex searches — for example by using 'fuzzy' text patterns, finding semantically related passages or by filtering texts on the basis of structured data such as the persons or places mentioned in a text. We can also provide the necessary know-how and software to allow project teams to edit and visualize their text collections, to publish them on online, and to deposit them in a certified digital repository to ensure their long term preservation and access.

For all our projects, based on enriched texts, we try to strictly separate raw text and enrichments. Texts, in all variations and versions, are stored and made available in our open source [text repository](https://github.com/knaw-huc/textrepo). Enrichments find their place in our [annotation repository](https://github.com/knaw-huc/annorepo) in the form of standardised [Web Annotations](https://www.w3.org/annotation/). Any text fragment in the text repository is thus directly retrievable or annotable online, independent of the original text format. Applications such as a web frontend or an editor can then make use the APIs of these two systems. This is how we build our own generic web environment for visualising and searching digital text editions. But our APIs are also directly usable by anyone who wants to query our collection data directly or build their own applications.

### Contact

[Hennie Brugman](mailto:hennie.brugman@di.huc.knaw.nl), Lead Developer for Team Text ([Research Gate](https://www.researchgate.net/profile/Hennie-Brugman), [LinkedIn](https://nl.linkedin.com/in/hennie-brugman-8327369), [Pure](https://pure.knaw.nl/portal/en/persons/h-brugman))

### Related Research Projects

* [Nederlab](https://www.nederlab.nl) (Meertens Institute) is an online portal for historical research on Dutch language, literature and culture. On the site, researchers can search, view, and analyse millions of Dutch texts.
* [Republic](https://republic.huygens.knaw.nl) (Huygens Institute) is an acronym for REsolutions PUBLished In a Computational environment. The goal of the project is to make all of the manuscript and printed resolutions of the Dutch States General (1576-1796) freely available online as full texts and page images.
* [Globalise](https://globalise.huygens.knaw.nl) (Huygens Institute). The NWO Groot funded Globalise project will develop an online infrastructure that unlocks the key series of VOC reports (c. 4.7M pages) with advanced research methods. The project uses our text repository infrastructure as a hub to synchronise the enrichment and curation of the historical text transcriptions.
* [CLARIAH Plus](https://www.clariah.nl/). We are making several contributions to this national infrastructure, in particular with respect to NLP tools and formats ([LaMachine](https://proycon.github.io/LaMachine), [FoLiA](https://proycon.github.io/folia)) and software for creating, publishing and sharing annotations of online collections.


### Software and Data

* [Text Repository](https://github.com/knaw-huc/textrepo) is a backend repository system to store and share text corpora with metadata and versions.
* [LaMachine](https://proycon.github.io/LaMachine) is a unified software distribution for Natural Language Processing. It integrates numerous open-source NLP tools, programming libraries, web services and web applications into a single virtual research environment that can be installed on a wide variety of machines.
* [analiticcl](https://github.com/proycon/analiticcl) is a system for spelling correction, normalisation, and  post-OCR correction.
* [TextAnnoViz](https://github.com/knaw-huc/textannoviz) is a flexible and customisable web application for searching and visualising digital (scholarly) text editions.
* [AnnoRepo](https://github.com/knaw-huc/annorepo) is our repository for storing and providing W3C Web Annotations. AnnoRepo adheres to W3C standards and also offers additional search capabilities.
* [Dexter](https://github.com/knaw-huc/Dexter) is a web application we developed as part of [CLARIAH Plus](https://www.clariah.nl). Researchers can use Dexter to autonomously build, annotate, and share their own virtual research collections.
* [Text-Fabric](https://annotation.github.io/text-fabric/tf/index.html) is a tool to process text corpora plus (large) sets of annotations. It serves as a bridge between  researchers and data scientists.

### Publications and Presentations

* [Video presentation](https://diode.zone/w/kkrqA4MocGwxyC3s68Zsq7) on [analiticcl](https://github.com/proycon/analiticcl).
* Brugman, H., Reynaert, M., van der Sijs, N., van Stripriaan, R., Tjong Kim Sang, E. & van den Bosch, A. (2016) [Nederlab: Towards a Single Portal and Research Environment for Diachronic Dutch Text Corpora](https://aclanthology.org/L16-1203/). LREC, 25 May 2016 p. 1277-1281
* Koolen, Marijn & Hoekstra, Rik & Nijenhuis, Ida & Sluijter, Ronald & Koert, Rutger & van Gelder, Esther & Brouwer, Gijsjan & Brugman, Hennie. (2020). [Modelling Resolutions of the Dutch States General for Digital Historical Research](https://pure.knaw.nl/portal/en/publications/modelling-resolutions-of-the-dutch-states-general-for-digital-his). 
* Dirk Roorda (2018). [Coding the Hebrew Bible](https://brill.com/view/journals/rdj/3/1/article-p27_27.xml). In _Research Data Journal for the Humanities and Social Sciences_, Vol 3, Issue 1, pp. 27-41. DOI:[10.1163/24523666-01000011](https://doi.org/10.1163/24523666-01000011).
