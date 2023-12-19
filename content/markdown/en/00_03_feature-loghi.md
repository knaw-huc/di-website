---
title: Unique software to transcribe historical texts available as open source
author: Thijs van der Veen
type: feature
featured_image: Loghi_2.jpg
summary: The KNAW Humanities Cluster in Amsterdam is making the transcription software Loghi available open source with immediate effect. The software was developed in cooperation with the Nationaal Archief in The Hague specifically to make scanned historical documents digitally readable and searchable.
publication_date: 21-04-2023
showPubDate: true
showAuthor: true
---

The KNAW Humanities Cluster in Amsterdam is making the transcription software Loghi available open source with immediate effect. The software was developed in cooperation with the Nationaal Archief in The Hague specifically to make scanned historical documents digitally readable and searchable.

For researchers, deciphering manuscripts in archives is often quite a challenge, whether they are 17th-century manuscripts, or much more modern ones, such as from the period of the Second World War. Transcription software makes this much easier by turning them into a digital text. At the same time, that transcription also opens up new possibilities for research, because digitised text is searchable. Finding all mentions of, say, 'sugar' in an archive of millions of records takes just a few minutes instead of many years. Count your winnings. But then the transcription software has to be reliable.

The transcription software Loghi, tests showed, is extremely accurate and gives up to at least 96% correct transcriptions. This makes Loghi suitable for heritage organisations that want to make historical, poorly readable texts available and searchable for visitors and researchers. The software is open-source, which means it is available to all, but can also be adapted to their own specific needs.

<h2>Baseline</h2>
Loghi is capable of deciphering a variety of texts whether handwritten, typed or printed. The software does this in two steps. First, it determines on which line a line runs, called the baseline. That way, the software knows which sentences belong together. Then Loghi converts the image of the text to digital text. These two steps allow Loghi to take into account not only notes in the margin or between lines, but also texts written vertically in tables, for example. The software recognises all these different forms of text and displays their digital representation in the correct context.

![Scan of entry Battle to Chatham (from National Archives)](images/Loghi_2.jpg)

<h2>Low error rate</h2>
Loghi has been developed over the past six years by Rutger van Koert of the Digital Infrastructure Department of the KNAW Humanities Cluster (HuC). Van Koert: 'We use machine learning to determine exactly which letter was written down. To do this, Loghi breaks down a scan of a document into images at different levels: from very small at the level of pixels via letters and sentences to the level of paragraphs. The software summarises step by step - each time at a slightly higher level - what the visual features are and finally chooses the most likely letter based on that. The software can also ignore erasures and corruptions, thus identifying even more accurately where which letters are. When the software is trained on a specific collection then the error rate is reduced to under 4%. That's really very low.'

<h2>Prototype</h2>
The software is partly based on open source software and has been successfully applied in the major projects [REPUBLIC](https://republic.huygens.knaw.nl/) and [GLOBALISE](https://globalise.huygens.knaw.nl/). These projects by the Huygens Institute, a founding member of the HuC, make the Resolutions of the States General and reports of the VOC digitally accessible, respectively. A prototype of the Resolutions of the States General is already available with transcribed texts. In the next few years, the transcribed texts will become available online. The original sources are at the National Archives (NA) in The Hague. Van Koert was therefore also seconded to the NA for a year and a half.

<h2>Making Loghi even better</h2>
Loghi is immediately accessible to everyone on [GitHub](https://github.com/knaw-huc/loghi), contributing to a national and international open science infrastructure. 'We think it is important that this software is freely shared so that developers from other organisations in the field can also work with it and build on it. We cordially invite everyone to contribute and jointly make Loghi even better,' says Menno Rasch, director Digital Infrastructure of the KNAW Humanities Cluster.

In the software, certain settings can be adjusted to achieve the best result on each text. However, to achieve the best possible result on new datasets, tests are still needed in which the outcome of the adapted code is compared with human-checked texts.

<h2>Collaboration KNAW Humanities Cluster and the National Archives</h2>
The KNAW Humanities Cluster and the National Archives will continue to further develop Loghi together to make digitised collections readable and searchable. This is now enshrined in official collaboration, in which the National Archives will also hire a developer. 'We have already scanned 50 million documents and will digitise another 50 million pages in the coming years. By making these mostly handwritten and typed documents machine-readable with Loghi, users can search the documents much more easily,' says Liesbeth Keijser, project manager for digitisation at the National Archives.
