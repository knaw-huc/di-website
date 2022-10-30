---
title: Structured Data
author: Menno Windhouwer
type: page
summary:
---
Data comes in many shapes and sizes. We carefully put the data that is important for a project into a format that the tools can work with. Our goal is to use the right tool for each data and each project. This ranges from ready-made software, via internally developed generic components and frameworks, to project-specific compositions of these. Data is valuable and should have a clear path to the archive. We provide that route and the means to create the accompanying metadata.

Datasets are strongly connected internally - and increasingly also externally. These connections are established on the basis of linking pins, such as shared key entities and core vocabularies. This is particularly the case in the field of Linked (Open) Data. With[Timbuctoo](https://github.com/HuygensING/timbuctoo), our own Linked Data Store, we offer researchers a stable basis for storing their data. [Lenticular Lens](https://lenticularlens.org/) makes it possible to create and validate links between entities in different Timbuctoo datasets. Within the Dutch CLARIAH infrastructure, we provide the I ([Interoperability](https://www.go-fair.org/fair-principles/i1-metadata-use-formal-accessible-shared-broadly-applicable-language-knowledge-representation/)) in FAIR-datasets using vocabularies as the semantic cornerstone.

The provenance of data is an important point of attention in the digital humanities. This information gives researchers who want to reuse existing data insight into the sources and processing steps, which creates a basis of trust. We have therefore set up a provenance service that developers can easily integrate and that records the data traces. The next step will be to provide customised insights on these data tracks for different target groups.

### Contact

[Menzo Windhouwer](mailto:menzo.windhouwer@di.huc.knaw.nl), Lead developer for Team Structured Data ([Research Gate](https://www.researchgate.net/profile/Menzo-Windhouwer), [LinkedIn](https://www.linkedin.com/in/mwindhouwer/?originalSubdomain=nl), [Pure](https://pure.knaw.nl/portal/nl/persons/menzo-windhouwer))

### Projects

* [Golden Agents](https://www.goldenagents.org/): providing storage and accessibility for enriched linked data- and linksets
* [CLARIAH(+)](https://www.clariah.nl/): setting up the metadata harvesting pipeline, its vocabulary ecosystem and reimplementing/specifying data stories
* [CLARIN](https://www.clarin.eu/): maintain the core of the Component Metadata infrastructure and its harvesting pipeline
* [REPUBLIC](https://republic.huygens.knaw.nl/) & [OpenHuygens](https://www.huygens.knaw.nl/en/openhuygens-nl-hits-the-ground-running-thanks-to-fonds-knaw-instituten/): revive Huygens data sets in state-of-the-art technology and data stores
* [ISEBEL](http://search.isebel.eu/): harvesting from & central catalog for folktale data

### Software and Data

* [Lenticular Lens](https://lenticularlens.org/) is a tool which allows users to construct linksets between entities from different Timbuctoo datasets (so called data-alignment or reconciliation). Lenticular Lens tracks the configuration and the algorithms used in the alignment and is also able to report on manual corrections and the amount of manual validation done.
* [Timbuctoo](https://github.com/HuygensING/timbuctoo) is a Linked Data Store, which is able to store large graphs. It provides a GraphQL interface, which means that the schema of the graph is easily available for interaction. ResourceSync support enables us to keep related indexes and access tools in sync. Timbuctoo keeps close track of the provenance. It forms the heart of an expanding toolset to deal with all aspects of linked data.
* [Procrustus](https://github.com/knaw-huc/clariah-cmdi-forms) is our forms framework, which we can easily adapt to any data source. And can be tweaked to the maximum usability.


### Publications and Presentations

* Al Idrissou, Leon van Wissen, and Veruska Zamborlini. [The Lenticular Lens – Addressing Various Aspects of Entity Disambiguation in the Semantic Web](https://graphentechnologien.hypotheses.org/files/2022/01/The_Lenticular_Lens_large_Addressing_Various_Aspects_of_etc-Idrissou_Wissen_Zamborlini.pdf) At Graphs and Networks in the Humanities 2022, online, 3-4 February 2022.
* R. Zeeman, M. Windhouwer. [Tweak Your CMDI Forms to the Max](https://office.clarin.eu/v/CE-2018-1292-CLARIN2018_ConferenceProceedings.pdf#page=102). At the CLARIN Annual Conference, Pisa, Italy, October 8-10, 2018. ([video](http://videolectures.net/clarinannualconference2018_zeeman_tweak/)) 			
Q. Ding, T. Meder, M. Windhouwer. [ISEBEL an Intelligent Search Engine for Belief Legends](https://dev.clariah.nl/files/dh2019/boa/0439.html). In Digital Humanities 2019: Conference Abstracts (DH 2019), 	Utrecht, The Netherlands, July 9-12, 2019
* M. Windhouwer, M. Kemps-Snijders, P. Trilsbeek, A. Moreira, B. van der Veen, G. Silva, D. von Rhein. 	[FLAT: constructing a CLARIN compatible home for language resources](http://www.lrec-conf.org/proceedings/lrec2016/summaries/476.html). In Proceedings of the Tenth International Conference on Language Resources and Evaluation (LREC 2016), European Language Resources Association (ELRA), Portorož, Slovenia, May 23 - 28, 2016. 	
