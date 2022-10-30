---
title: Gestructureerde Data
author: Menno Windhouwer
type: page
summary: Wij brengen de data die van belang zijn voor een project zorgvuldig in een format waarmee de tools uit de voeten kunnen.
---
Data bestaan in vele soorten en vormen. Wij brengen de data die van belang zijn voor een project zorgvuldig in een format waarmee de tools uit de voeten kunnen. Ons doel is om de juiste tool te gebruiken voor elke vorm van data en elk project. Dat gaat van kant-en-klare software, via intern ontwikkelde generieke componenten en frameworks tot project-specifieke samenstellingen hiervan. Data zijn waardevol en horen een heldere weg af te leggen richting archief. Wij verzorgen die weg en de middelen om de bijgaande metadata te creëren.

Datasets zijn intern - en in toenemende mate ook extern - sterk verbonden. Deze verbindingen komen tot stand op basis van _linking pins_, zoals shared key entities en core vocabularies. Dit speelt met name in het domein van Linked (Open) Data. Met [Timbuctoo](https://github.com/HuygensING/timbuctoo), onze eigen Linked Data Store, bieden wij onderzoekers een stabiele basis voor het opslaan van hun data. [Lenticular Lens](https://lenticularlens.org/) maakt het mogelijk om links tussen entiteiten in verschillende Timbuctoo-datasets te leggen en te valideren. Binnen de Nederlandse CLARIAH-infrastructuur zorgen wij met vocabularies als semantische hoeksteen, voor de I ([Interoperability](https://www.go-fair.org/fair-principles/i1-metadata-use-formal-accessible-shared-broadly-applicable-language-knowledge-representation/)) in FAIR-datasets.

De herkomst (_provenance_) van data is een belangrijk punt van aandacht in de digitale geesteswetenschappen. Deze informatie geeft onderzoekers die bestaande data willen hergebruiken inzicht in de bronnen en doorlopen verwerkingsstappen, wat zorgt voor een vertrouwensbasis. Wij hebben daarom een [provenance-service](https://github.com/knaw-huc/provenance) opgezet die ontwikkelaars eenvoudig kunnen integreren en die de datasporen vastlegt. De volgende stap zal zijn om voor verschillende doelgroepen op maat gemaakte inzichten op deze datasporen te bieden.


### Kontakt

[Menzo Windhouwer](mailto:menzo.windhouwer@di.huc.knaw.nl), Lead developer for Team Structured Data ([Research Gate](https://www.researchgate.net/profile/Menzo-Windhouwer), [LinkedIn](https://www.linkedin.com/in/mwindhouwer/?originalSubdomain=nl), [Pure](https://pure.knaw.nl/portal/nl/persons/menzo-windhouwer))

### Projekten

* [Golden Agents](https://www.goldenagents.org/): providing storage and accessibility for enriched linked data- and linksets
* [CLARIAH(+)](https://www.clariah.nl/): setting up the metadata harvesting pipeline, its vocabulary ecosystem and reimplementing/specifying data stories
* [CLARIN](https://www.clarin.eu/): maintain the core of the Component Metadata infrastructure and its harvesting pipeline
* [REPUBLIC](https://republic.huygens.knaw.nl/) & [OpenHuygens](https://www.huygens.knaw.nl/fonds-knaw-instituten-geeft-openhuygens-nl-vliegende-start/): revive Huygens data sets in state-of-the-art technology and data stores
* [ISEBEL](http://search.isebel.eu/): harvesting from & central catalog for folktale data

### Software en Data

* [Lenticular Lens](https://lenticularlens.org/) is a tool which allows users to construct linksets between entities from different Timbuctoo datasets (so called data-alignment or reconciliation). Lenticular Lens tracks the configuration and the algorithms used in the alignment and is also able to report on manual corrections and the amount of manual validation done.
* [Timbuctoo](https://github.com/HuygensING/timbuctoo) is a Linked Data Store, which is able to store large graphs. It provides a GraphQL interface, which means that the schema of the graph is easily available for interaction. ResourceSync support enables us to keep related indexes and access tools in sync. Timbuctoo keeps close track of the provenance. It forms the heart of an expanding toolset to deal with all aspects of linked data.
* [Procrustus](https://github.com/knaw-huc/clariah-cmdi-forms) is our forms framework, which we can easily adapt to any data source. And can be tweaked to the maximum usability.

### Publikaties en Presentaties

* Al Idrissou, Leon van Wissen, and Veruska Zamborlini. [The Lenticular Lens – Addressing Various Aspects of Entity Disambiguation in the Semantic Web](https://graphentechnologien.hypotheses.org/files/2022/01/The_Lenticular_Lens_large_Addressing_Various_Aspects_of_etc-Idrissou_Wissen_Zamborlini.pdf) At Graphs and Networks in the Humanities 2022, online, 3-4 February 2022.
* R. Zeeman, M. Windhouwer. [Tweak Your CMDI Forms to the Max](https://office.clarin.eu/v/CE-2018-1292-CLARIN2018_ConferenceProceedings.pdf#page=102). At the CLARIN Annual Conference, Pisa, Italy, October 8-10, 2018. ([video](http://videolectures.net/clarinannualconference2018_zeeman_tweak/)) 			
Q. Ding, T. Meder, M. Windhouwer. [ISEBEL an Intelligent Search Engine for Belief Legends](https://dev.clariah.nl/files/dh2019/boa/0439.html). In Digital Humanities 2019: Conference Abstracts (DH 2019), 	Utrecht, The Netherlands, July 9-12, 2019
* M. Windhouwer, M. Kemps-Snijders, P. Trilsbeek, A. Moreira, B. van der Veen, G. Silva, D. von Rhein. 	[FLAT: constructing a CLARIN compatible home for language resources](http://www.lrec-conf.org/proceedings/lrec2016/summaries/476.html). In Proceedings of the Tenth International Conference on Language Resources and Evaluation (LREC 2016), European Language Resources Association (ELRA), Portorož, Slovenia, May 23 - 28, 2016. 	
