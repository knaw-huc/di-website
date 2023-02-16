---
title: Gestructureerde Data
author: Menno Windhouwer
type: page
summary: Data bestaan in vele soorten en vormen. Wij brengen de data die van belang zijn voor een project zorgvuldig in een format waarmee de tools uit de voeten kunnen.
---
Data bestaan in vele soorten en vormen. Wij brengen de data die van belang zijn voor een project zorgvuldig in een format waarmee de tools uit de voeten kunnen. Ons doel is om de juiste tool te gebruiken voor elke vorm van data en elk project. Dat gaat van kant-en-klare software, via intern ontwikkelde generieke componenten en frameworks tot project-specifieke samenstellingen hiervan. Data zijn waardevol en horen een heldere weg af te leggen richting archief. Wij verzorgen die weg en de middelen om de bijgaande metadata te creëren.

Datasets worden sterk met elkaar verbonden - intern, maar in toenemende mate ook extern. Deze verbindingen komen tot stand op basis van bijvoorbeeld gedeelde kernentiteiten (mensen, plaatsen, goederen...) en core vocabularies. Dit speelt met name in het domein van Linked (Open) Data. Met [Timbuctoo](https://github.com/HuygensING/timbuctoo), onze eigen Linked Data Store, bieden wij onderzoekers een stabiele basis voor het opslaan van hun data. [Lenticular Lens](https://lenticularlens.org/) maakt het mogelijk om links tussen entiteiten in verschillende Timbuctoo-datasets te leggen en te valideren. Binnen de Nederlandse [CLARIAH-infrastructuur](https://clariah.nl) zorgen wij met vocabularies als semantische hoeksteen, voor de "I" ([Interoperability](https://www.go-fair.org/fair-principles/i1-metadata-use-formal-accessible-shared-broadly-applicable-language-knowledge-representation/)) in FAIR-datasets.

De herkomst (provenance) van data is een belangrijk punt van aandacht in de digitale geesteswetenschappen. Deze informatie geeft onderzoekers die bestaande data willen hergebruiken inzicht in de bronnen en doorlopen verwerkingsstappen, wat zorgt voor een vertrouwensbasis. Wij hebben daarom een [provenance-service](https://github.com/knaw-huc/provenance) opgezet die ontwikkelaars eenvoudig kunnen integreren en die de datasporen vastlegt. De volgende stap zal zijn om voor verschillende doelgroepen op maat gemaakte inzichten op deze datasporen te bieden.

### Contact

[Menzo Windhouwer](mailto:menzo.windhouwer@di.huc.knaw.nl), Lead developer for Team Structured Data ([Research Gate](https://www.researchgate.net/profile/Menzo-Windhouwer), [LinkedIn](https://www.linkedin.com/in/mwindhouwer/?originalSubdomain=nl), [Pure](https://pure.knaw.nl/portal/nl/persons/menzo-windhouwer))

### Verwante Onderzoeksprojecten

* Golden Agents](https://www.goldenagents.org/): het aanbieden van storage en toegankelijkheid voor verrijkte linked data- en linksets.
* [CLARIAH(+)](https://www.clariah.nl/): opzetten van de metadata harvesting pipeline, het vocabulaire ecosysteem en het herimplementeren/specificeren van data stories.
* [CLARIN](https://www.clarin.eu/): onderhouden van de kern van de Component Metadata infrastructuur en de harvesting pipeline daarvan.
* [REPUBLIC](https://republic.huygens.knaw.nl/) en [OpenHuygens](https://www.huygens.knaw.nl/fonds-knaw-instituten-geeft-openhuygens-nl-vliegende-start/): Huygens-datasets opnieuw beschikbaar stellen in geavanceerde technologie en data stores.
* [ISEBEL](http://search.isebel.eu/): harvesting van & centrale catalogus voor volksverhalengegevens

### Software en Data

* [Lenticular Lens](https://lenticularlens.org/) is een tool waarmee gebruikers linksets kunnen samenstellen tussen entiteiten uit verschillende Timbuctoo datasets (zogenaamde data-alignment of reconciliatie). Lenticular Lens houdt de configuratie en de tijdens de afstemming gebruikte algoritmen bij en kan ook rapporteren over handmatige correcties en de hoeveelheid uitgevoerde handmatige validatie.
* [Timbuctoo](https://github.com/HuygensING/timbuctoo) is een Linked Data Store, die grote grafieken kan opslaan. Het biedt een GraphQL-interface, wat betekent dat het schema van de grafiek gemakkelijk beschikbaar is voor interactie. ResourceSync ondersteuning maakt het mogelijk om gerelateerde indexen en toegangstools synchroon te houden. Timbuctoo houdt de provenance nauwkeurig bij. Het vormt het hart van een groeiende toolset om met alle aspecten van gelinkte gegevens om te gaan.
* [Procrustus](https://github.com/knaw-huc/clariah-cmdi-forms) is ons formulierenraamwerk, dat we gemakkelijk kunnen aanpassen aan elke gegevensbron. En kan worden aangepast voor maximale bruikbaarheid.

### Publikaties en Presentaties

* Idrissou, Al., van Wissen, Leon., Zamborlini, Veruska. [The Lenticular Lens – Addressing Various Aspects of Entity Disambiguation in the Semantic Web](https://graphentechnologien.hypotheses.org/files/2022/01/The_Lenticular_Lens_large_Addressing_Various_Aspects_of_etc-Idrissou_Wissen_Zamborlini.pdf). At Graphs and Networks in the Humanities 2022, online, 3-4 February 2022.
* Windhouwer, M., Kemps-Snijders, M., Trilsbeek, P., Moreira, A., van der Veen, B., Silva, G., von Rhein, D. [FLAT: constructing a CLARIN compatible home for language resources](http://www.lrec-conf.org/proceedings/lrec2016/summaries/476.html). In Proceedings of the Tenth International Conference on Language Resources and Evaluation (LREC 2016), European Language Resources Association (ELRA), Portorož, Slovenia, May 23 - 28, 2016.
* Zeeman, R., Windhouwer, M. [Tweak Your CMDI Forms to the Max](https://office.clarin.eu/v/CE-2018-1292-CLARIN2018_ConferenceProceedings.pdf#page=102). At the CLARIN Annual Conference, Pisa, Italy, October 8-10, 2018. ([video](http://videolectures.net/clarinannualconference2018_zeeman_tweak/)) 			
* Ding, Q., Meder, T., Windhouwer, M. [ISEBEL an Intelligent Search Engine for Belief Legends](https://dev.clariah.nl/files/dh2019/boa/0439.html). In Digital Humanities 2019: Conference Abstracts (DH 2019), Utrecht, The Netherlands, July 9-12, 2019
