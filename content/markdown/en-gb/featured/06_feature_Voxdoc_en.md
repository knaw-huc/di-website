---
title: "New tool will read the layout of historical documents as well as the text"
author: Jeroen Scharroo
featured_image: screenshot-voxdoc.png
summary: "A new open tool transcribes historical Dutch documents and recognises their layout: tables, illustrations and marginal notes provide extra information."
publication_date: 12-11-2026
showPubDate: true
showAuthor: true
publish: true
---

A new, openly available tool from the Humanities Cluster makes it possible not only to transcribe historical Dutch-language documents automatically, but also to recognise their layout. This produces better texts, and the tables, illustrations and marginal additions in documents offer an extra source of information. The first parts of the project can already be viewed online.

The project ‘Voicing the Document’ is developing an add-on to Loghi, an open-source text recognition software package that was also developed at the Humanities Cluster. Loghi converts handwritten and printed historical documents into searchable digital text. It is not well suited to recognising visual elements. Marginal notes or formatting in tables can lead to errors in transcription and reading order. In a table listing the cargo of a VOC ship, for example, names and figures can become mixed up. Loghi also does not record any information about elements such as images.

## Open models, trained on Dutch sources
Commercial large language models that recognise visual elements do exist, but they are closed, expensive and often hosted outside the EU. Smaller, non-commercial models tend not to be well trained on Dutch data. This makes it undesirable for Dutch researchers to use these models.

The new tool tackles these problems using open-weights AI models that process not only text but also images. These models look at a page as a whole and describe what is on it. They can recognise, for instance, where a table begins, which text is in the margin and in what order a page should be read. To make them work well with Dutch sources, they are further trained on examples of historical documents, which are created and checked by the project’s annotators. The new tool will then be built into Loghi. This should lead to fewer errors in transcribed texts and richer, standardised data.

## First examples
Voicing the Document was launched in June 2026 by Rutger van Koert of the Digital Infrastructure department at the Humanities Cluster. The first examples of annotated pages can already be seen on the [project website](https://voxdoc.di.huc.knaw.nl/). The first [conventions](https://github.com/rvankoert/voxdoc/blob/main/conventions.md) have also been published on GitHub. They set out how the annotators recognise, label and delineate the different elements of a historical page (tables, illustrations and elements in the margins). The models are trained on this basis, so that others can see how the results come about. The conventions are still a work in progress; researchers and archive staff are invited to read along and respond via the project website. The first release of code and models is expected in January 2027.

Project website: [https://voxdoc.di.huc.knaw.nl/](https://voxdoc.di.huc.knaw.nl/)

_Voicing the Document is funded by an Open Science Infrastructure grant from Open Science NL, part of NWO._
