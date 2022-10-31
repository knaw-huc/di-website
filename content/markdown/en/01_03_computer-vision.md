---
title: Computer Vision
author: Rutger van Koert
type: page
summary: Our main expertise in computer vision is the creation of searchable, full-text transcripts from historical manuscripts and printed sources.
---
Our main expertise in computer vision is the creation of searchable, full-text transcripts from historical manuscripts and printed sources. Besides text recognition, we also have experience in analysing the visual characteristics of documents to assist with other relevant research tasks such as determining authorship, dating and localizing where a text was written, identifying entities such as people, places, dates in a text, as well as classifying images.

To convert page images of typed or printed text (OCR) into machine-readable text, we typically draw on open source software such as [Tesseract](https://github.com/tesseract-ocr/tesseract) in combination with our own, custom pre- and post-processing methods. In the case of hand-written manuscripts (HTR), we also make use of commercial software such as [Transkribus](https://transkribus.eu)). However, for some research projects, it is helpful to have more control over different elements of the HTR pipeline from layout analysis to spell correction. For this purpose, we have developed a set of open source tools to aid researchers with the automatic classification and clustering of different types of document (e.g. wills, contracts, letters..) based on their layout and structure and to support searches on the basis of visually similar components of a document such as watermarks, letterheads or family crests.

### Contact

[Rutger van Koert](mailto:rutger.van.koert@di.huc.knaw.nl), Lead developer for Team Images ([Pure](https://pure.knaw.nl/portal/en/persons/rutger-koert-van), [ACM](https://dl.acm.org/profile/81339533737))

### Related Research Projects

* [Republic](https://en.huygens.knaw.nl/projecten/resoluties-staten-generaal-1576-1796-de-oerbronnen-van-de-parlementaire-democratie/?noredirect=en_GB) (Huygens Institute) stands for REsolutions PUBLished In a Computational environment. The goal of the project is to make all of the manuscript and printed resolutions of the Dutch States General (1576-1796) freely available online as full texts and page images. Work on Republic began in 2019 and is scheduled to end in 2024. For Republic, we improved layout analysis detecting textlines and regions in 16-18th century handwritten and printed material
* [Globalise](https://globalise.huygens.knaw.nl) (Huygens Institute). Consisting of approximately twenty-five million pages, the archives of the Dutch East India Company (VOC) offer a unique view on interactions between European and non-European actors in Asia in the seventeenth and eighteenth centuries. However, doing research on this collection of handwritten documents is currently extremely challenging. Globalise will develop an online infrastructure that will make the VOC reports easily accessible for advanced new research methods. For Globalise we are carrying out HTR of 16-18th century handwritten materials drawn largely from the VOC and various former Dutch East Asian colonies.
* [TRIADO](https://www.oorlogsbronnen.nl/nieuws/veelbelovende-resultaten-onderzoek-naar-digitaal-doorzoekbaar-maken-cabr) (KNAW Humanities Cluster). After the Second World War, more than 300,000 Dutch citizens were subjected to the so-called special administration of justice. They were accused of collaboration with the German occupier, treason, membership in the Dutch National Socialist Movement (NSB) or having enlisted in the German military. Files on all these people are kept in the [Central Archive: Special Criminal Jurisdiction (CABR)](https://www.nationaalarchief.nl/onderzoeken/zoekhulpen/tweede-wereldoorlog-centraal-archief-bijzondere-rechtspleging-cabr). The goal of the TRIADO project is to make the entire CABR collection fully searchable and accessible. For this project, we will conduct type classification, OCR, named entity recognition, and topic modeling.

![Layout Analysis](images/htr-layout-analysis2.png)

### Publications and Presentations

* Anne Gorter; Rutger van Koert; Ismee Tames; Edwin Klijn; Marielle Scherer. [From Tribunal Archive to Digital Research Facility (TRIADO): Exploring ways to make archives accessible and useable](https://doi.org/10.1145/3322905.3322906), DATeCH2019: Proceedings of the 3rd International Conference on Digital Access to Textual Cultural Heritage (2019), pp. 105–110.
* Marius Bulacu; Rutger van Koert; Lambert Schomaker; Tijn van der Zant. [Layout Analysis of Handwritten Historical Documents for Searching the Archive of the Cabinet of the Dutch Queen](https://dl.acm.org/doi/10.5555/1304595.1304749), ICDAR '07: Proceedings of the Ninth International Conference on Document Analysis and Recognition - Volume 01 (September 2007), pp. 357–361.
* [TRAIDO Final report and enrichment phase](https://www.oorlogsbronnen.nl/sites/default/files/20190517_eindrapportTRIADO%20verrijkingsfase_0.pdf) (PDF)
* [Interview with Network Oorlogsbronnen](https://www.youtube.com/watch?v=yUzs1QP5i08) for TRIADO.
* DATeCH 2019 [conference presentation](https://www.youtube.com/watch?v=Sa0KONYWwVc) on TRIADO.
