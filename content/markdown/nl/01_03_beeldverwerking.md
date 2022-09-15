---
title: Beeldverwerking
author: Rutger van Koert
type: page
summary: Onze grootste expertise op het gebied van beeldbewerking ligt bij het creëren van doorzoekbare full-text transcripten van zowel handgeschreven manuscripten als gedrukte bronnen.
---
Onze grootste expertise op het gebied van beeldbewerking ligt bij het creëren van doorzoekbare full-text transcripten van zowel handgeschreven manuscripten als gedrukte bronnen. We hebben niet alleen ervaring in tekstherkenning, maar ook in het analyseren van visuele kenmerken van documenten. Daarmee dragen we bij aan andere onderzoekstaken, zoals het bepalen van auteurschap, het dateren en lokaliseren waar een tekst is geschreven, het identificeren van entiteiten als personen, plaatsen en data in een tekst, en het classificeren van afbeeldingen.

Bij het converteren van ingescande pagina's met getypte of geprinte tekst naar machineleesbare tekst (OCR) maken we vaak gebruik van open source-software als [Tesseract](https://github.com/tesseract-ocr/tesseract), in combinatie met onze eigen op maat gemaakt pre- en postprocessing methoden. In het geval van handgeschreven manuscripten (HTR) maken we ook gebruik van commerciële software (zoals Transkribus). Voor sommige onderzoeksprojecten is het echter belangrijk om volledige controle over alle delen van de HTR-pijplijn te hebben, van lay-out analyse tot spellingcorrectie. Hiervoor hebben wij een eigen, open source, op machinelearning gebaseerde HTR-pijplijn ontwikkeld. Loghi wordt momenteel gebruikt door het [Nationaal Archief](https://www.nationaalarchief.nl) en het door NWO gefinanceerde project [Globalise](https://globalise.huygens.knaw.nl) om miljoenen handgeschreven manuscriptpagina's uit de zestiende tot achttiende eeuw te transcriberen. Naast Loghi hebben we een set open source tools ontwikkeld die onderzoekers helpen bij het automatisch classificeren en clusteren van verschillende typen documenten (zoals testamenten, contracten, brieven) op basis van hun layout en structuur, en bij het zoeken op basis van visueel vergelijkbare onderdelen van een document, zoals watermerken, briefhoofden of familiewapens.

### Contact

[Rutger van Koert](mailto:rutger.van.koert@di.huc.knaw.nl), Lead developer for Team Images ([Pure](https://pure.knaw.nl/portal/en/persons/rutger-koert-van), [ACM](https://dl.acm.org/profile/81339533737))

### Verwante Onderzoeksprojecten

+ [Republic](https://republic.huygens.knaw.nl/) (Huygens Instituut) staat voor REsolutions PUBLished In a Computational environment. Dit project heeft als doel om alle handgeschreven en geprinte resoluties van de Nederlandse Staten Generaal (1576-1796) vrij online beschikbaar te stellen als full text en pagina-afbeeldingen. Het werk aan Republic is in 2019 begonnen en zal eind 2024 worden afgerond. Voor Republic verbeterden we de lay-out-analyse voor het detecteren van tekstregels en regio's in 16e- tot en met 18e-eeuws handgeschreven en gedrukt materiaal.
+ [Globalise](https://globalise.huygens.knaw.nl/) (Huygens Instituut). Met zo'n vijfentwintig miljoen pagina's bieden de archieven van de Vereenigde Oostindische Compagnie (VOC) een unieke kijk op de interacties tussen Europese en niet-Europese spelers in Azië in de zeventiende en achttiende eeuw. Onderzoek doen op basis van deze verzameling handgeschreven documenten is echter zeer uitdagend. Globalise ontwikkelt een online infrastructuur waarin de VOC-rapporten eenvoudig toegankelijk zijn voor geavanceerde nieuwe onderzoeksmethoden. Voor Globalise voeren we HTR uit op handgeschreven materialen uit de 16e-18e eeuw, die voornamelijk afkomstig zijn van de VOC en verschillende voormalige Nederlandse Oost-Aziatische koloniën.
+ [TRIADO](https://www.oorlogsbronnen.nl/nieuws/project-tribunaalarchieven-als-digitale-onderzoeksfaciliteit-triado)  (KNAW Humanities Cluster) Na de Tweede Wereldoorlog ondergingen ruim 300.000 Nederlanders de zogeheten bijzondere rechtspleging. Zij werden beschuldigd van samenwerking met de Duitse bezetter, verraad, NSB-lidmaatschap of het in dienst treden bij het Duitse leger. Van al deze mensen is een dossier aanwezig in het [CABR](https://www.nationaalarchief.nl/onderzoeken/zoekhulpen/tweede-wereldoorlog-centraal-archief-bijzondere-rechtspleging-cabr). Het doel van het TRIADO-project is om de volledige CABR-collectie doorzoekbaar en toegankelijk te maken. Voor dit project voeren wij type-classificatie, OCR, named entity recognition en topic modeling uit.

### Software en Data


### Publicaties en Presentaties

- Anne Gorter; Rutger van Koert; Ismee Tames; Edwin Klijn; Marielle Scherer. [_From Tribunal Archive to Digital Research Facility (TRIADO): Exploring ways to make archives accessible and useable_](https://doi.org/10.1145/3322905.3322906), DATeCH2019: Proceedings of the 3rd International Conference on Digital Access to Textual Cultural Heritage (2019), pp. 105–110.
 - Marius Bulacu; Rutger van Koert; Lambert Schomaker; Tijn van der Zant. [_Layout Analysis of Handwritten Historical Documents for Searching the Archive of the Cabinet of the Dutch Queen_](https://dl.acm.org/doi/10.5555/1304595.1304749), ICDAR '07: Proceedings of the Ninth International Conference on Document Analysis and Recognition - Volume 01 (September 2007), pp. 357–361.
- [Eindrapport verrijkingsfase TRIADO](https://www.oorlogsbronnen.nl/sites/default/files/20190517_eindrapportTRIADO%20verrijkingsfase_0.pdf) (PDF)
- [Interview with Network Oorlogsbronnen](https://www.youtube.com/watch?v=yUzs1QP5i08) for TRIADO.
- DATeCH 2019 [conference presentation](https://www.youtube.com/watch?v=Sa0KONYWwVc) on TRIADO.
