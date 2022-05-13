---
title: Computer Vision
author: Rutger van Koert
type: page
---

In the field of computer vision our main area of expertise is the creation of searchable, full-text transcripts from both handwritten manuscripts and printed sources. Besides text recognition, we also have experience in analysing the visual characteristics of documents to assist with other research tasks such as determining authorship, dating and localizing where a text was written, identifying entities such as people, places, dates in a text, and classifying images. 

To convert page images of typed or printed text (OCR) into machine-readable text, we often draw on open source software such as Tesseract in combination with our own, custom pre- and post-processing methods. In the case of hand-written manuscripts (HTR), we also make use of commercial software (e.g. Transkribus). However, for some research projects, it is helpful to have full control over all parts of the HTR pipeline from layout analysis to spell correction. To this end, we have created our own, open source, machine learning based HTR pipelne. Loghi is now being used by the [Dutch National Archives](https://www.nationaalarchief.nl/en) and the Dutch NWO funded [Globalise](https://globalise.huygens.knaw.nl) project to transcribe several million, 16-18th century handwritten manuscript pages. Alongside Loghi, we have developed a further set of open source tools to aid researchers with the automatic classification and clustering of different types of document (e.g. wills, contracts, letters..) based on their layout and structure and to support searches on the basis of visually similar components of a document such as watermarks, letterheads or family crests.

### Contact

[Rutger van Koert](mailto:rutger.van.koert@di.huc.knaw.nl), Lead developer for Team Images ([Pure](https://pure.knaw.nl/portal/en/persons/rutger-koert-van), [ACM](https://dl.acm.org/profile/81339533737))

### Related Research Projects

- [Republic](https://en.huygens.knaw.nl/projecten/resoluties-staten-generaal-1576-1796-de-oerbronnen-van-de-parlementaire-democratie/?noredirect=en_GB) (Huygens Institute) stands for REsolutions PUBLished In a Computational environment. The goal of the project is to make all of the manuscript and printed resolutions of the Dutch States General (1576-1796) freely available online as full texts and page images. Work on Republic began in 2019 and is scheduled to end in 2024. **Contribution:** Improved layout analysis detecting textlines and regions in 16-18th century handwritten and printed material
- [Globalise](https://globalise.huygens.knaw.nl) (Huygens Institute). Consisting of approximately twenty-five million pages, the archives of the Dutch East India Company (VOC) offer a unique view on interactions between European and non-European actors in Asia in the seventeenth and eighteenth centuries. However, doing research on this collection of handwritten documents is currently extremely challenging. Globalise will develop an online infrastructure that will make the VOC reports easily accessible for advanced new research methods. **Contribution:** HTR of 16-18th century handwritten materials drawn largely from the Dutch East Indian Shipping company and Dutch East Asian colonies.
- [TRIADO](https://www.oorlogsbronnen.nl/nieuws/veelbelovende-resultaten-onderzoek-naar-digitaal-doorzoekbaar-maken-cabr) (KNAW Humanities Cluster). After the Second World War, more than 300,000 Dutch citizens were subjected to the so-called special administration of justice. They were accused of collaboration with the German occupier, treason, membership in the Dutch National Socialist Movement (NSB) or having enlisted in the German military. Files on all these people are kept in the [Central Archive: Special Criminal Jurisdiction (CABR)](https://www.nationaalarchief.nl/onderzoeken/zoekhulpen/tweede-wereldoorlog-centraal-archief-bijzondere-rechtspleging-cabr). The goal of the TRIADO project is to make the entire CABR collection fully searchable and accessible. **Contribution:** Document type classification, OCR pre-processing, OCR, named entity recognition, and topic modeling.

![Layout Analysis](assets/htr-layout-analysis2.png)


- [Digital Forensics](https://www.huygens.knaw.nl/projecten/digital-forensics-for-historical-documents/?noredirect=nl_NL) (Huygens Institute) aims at creating a bridge in between two different modes of handwriting analyses: forensic (graph analysis) and palaeographical (the development of scripts through space and time). In Digital Forensics, the two methods will be combined in a single ‘deep learning system’ to analyse the similarities and deviances in handwritten script in a palaeographically meaningful manner. **Contribution:** Authorship attribution and location.

### Software and Data

+ Information on Loghi and other tools and datasets

### Publications and Presentations


- [Anne Gorter; Rutger van Koert; Ismee Tames; Edwin Klijn; Marielle Scherer. _From Tribunal Archive to Digital Research Facility (TRIADO): Exploring ways to make archives accessible and useable_, DATeCH2019: Proceedings of the 3rd International Conference on Digital Access to Textual Cultural Heritage (2019), pp. 105–110.](https://doi.org/10.1145/3322905.3322906)
 - [Marius Bulacu; Rutger van Koert; Lambert Schomaker; Tijn van der Zant. _Layout Analysis of Handwritten Historical Documents for Searching the Archive of the Cabinet of the Dutch Queen_, ICDAR '07: Proceedings of the Ninth International Conference on Document Analysis and Recognition - Volume 01 (September 2007), pp. 357–361.](https://dl.acm.org/doi/10.5555/1304595.1304749)
- [Eindrapport verrijkingsfase TRIADO](https://www.oorlogsbronnen.nl/sites/default/files/20190517_eindrapportTRIADO%20verrijkingsfase_0.pdf) (PDF)
- [Interview with Network Oorlogsbronnen](https://www.youtube.com/watch?v=yUzs1QP5i08) for TRIADO.
- [DATeCH 2019](https://www.youtube.com/watch?v=Sa0KONYWwVc) conference presentation on TRIADO.
