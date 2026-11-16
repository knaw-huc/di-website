---
title: "Nieuwe tool gaat naast tekst ook opmaak historische documenten lezen"
author: Jeroen Scharroo
featured_image: screenshot-voxdoc.png
summary: "Een nieuwe open tool transcribeert historische Nederlandse documenten én herkent de opmaak: tabellen, illustraties en kanttekeningen leveren extra informatie."
publication_date: 12-11-2026
showPubDate: true
showAuthor: true
publish: false
---

Een nieuwe, open beschikbare tool van het Humanities Cluster maakt het mogelijk Nederlandstalige historische documenten niet alleen automatisch te transcriberen, maar ook de opmaak te herkennen. Dat levert betere teksten op, en tabellen, illustraties en toevoegingen in de marges van documenten bieden een extra bron van informatie. De eerste onderdelen van het project zijn al online te bekijken.

Het project ‘Voicing the Document’ ontwikkelt een toevoeging op Loghi, een open-source softwarepakket voor tekstherkenning dat eveneens bij het Humanities Cluster is ontwikkeld. Loghi zet handgeschreven en gedrukte historische documenten om in doorzoekbare digitale tekst. Het is niet goed ingericht op het herkennen van visuele elementen. Bij aantekeningen in de kantlijn of opmaak in tabellen kunnen fouten ontstaan in transcriptie en volgorde. Bij bijvoorbeeld een tabel met de lading van een VOC-schip kunnen namen en cijfers door elkaar raken. Ook legt Loghi geen informatie vast over elementen als afbeeldingen.

## Open modellen, getraind op Nederlandse bronnen
Er bestaan wel commerciële large language models die visuele elementen herkennen, maar die zijn gesloten, duur, en worden vaak buiten de EU gehost. Kleinere, niet-commerciële modellen zijn vaak niet goed getraind op Nederlandse data. Dat maakt het voor Nederlandse onderzoekers niet wenselijk deze modellen te gebruiken.

De nieuwe tool pakt deze problemen aan met behulp van open-weights AI-modellen die niet alleen tekst, maar ook beelden verwerken. Deze modellen bekijken een pagina als geheel en beschrijven wat erop staat. Ze herkennen bijvoorbeeld waar een tabel begint, welke tekst in de kantlijn staat en in welke volgorde een pagina gelezen moet worden. Om ze goed te laten werken met Nederlandse bronnen worden ze bijgetraind met voorbeelden van historische documenten, die door annotatoren van het project worden gemaakt en gecontroleerd. De nieuwe tool wordt vervolgens in Loghi ingebouwd. Dit moet leiden tot minder fouten in getranscribeerde teksten en rijkere, gestandaardiseerde data.

## Eerste voorbeelden
Voicing the Document is in juni 2026 gestart door Rutger van Koert van de afdeling Digital Infrastructure van het Humanities Cluster. Op de [projectwebsite](https://voxdoc.di.huc.knaw.nl/) zijn al de eerste voorbeelden van geannoteerde pagina’s te zien. Daarnaast zijn op GitHub de eerste [conventies](https://github.com/rvankoert/voxdoc/blob/main/conventions.md) gepubliceerd. Daarin staat hoe de annotatoren de verschillende onderdelen van een historische pagina (tabellen, illustraties en elementen in de marges) herkennen, benoemen en afbakenen. Op basis hiervan worden de modellen getraind, zodat anderen kunnen nagaan hoe de resultaten tot stand komen. De conventies zijn nog een werk in uitvoering; onderzoekers en archiefmedewerkers worden uitgenodigd mee te lezen en te reageren via de projectwebsite. De eerste oplevering van code en modellen wordt januari 2027 verwacht.

Projectwebsite: [https://voxdoc.di.huc.knaw.nl/](https://voxdoc.di.huc.knaw.nl/)

_Voicing the Document is gefinancierd met een Open Science Infrastructure-beurs van NWO-onderdeel Open Science NL._