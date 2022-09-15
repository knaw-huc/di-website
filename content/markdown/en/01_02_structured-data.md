---
title: Structured Data
author: Arno Bosse
type: page
summary: Data comes in many shapes and sizes. We carefully put the data that is important for a project into a format that the tools can work with.
---
Data comes in many shapes and sizes. We carefully put the data that is important for a project into a format that the tools can work with. Our goal is to use the right tool for each data and each project. This ranges from ready-made software, via internally developed generic components and frameworks, to project-specific compositions of these. Data is valuable and should have a clear path to the archive. We provide that route and the means to create the accompanying metadata.

Datasets are strongly connected internally - and increasingly also externally. These connections are established on the basis of linking pins, such as shared key entities and core vocabularies. This is particularly the case in the field of Linked (Open) Data. With Timbuctoo, our own Linked Data Store, we offer researchers a stable basis for storing their data. Lenticular Lens makes it possible to create and validate links between entities in different Timbuctoo datasets. Within the Dutch CLARIAH infrastructure, we provide the I (Interoperability) in FAIR datasets using vocabularies as the semantic cornerstone.

The provenance of data is an important point of attention in the digital humanities. This information gives researchers who want to reuse existing data insight into the sources and processing steps, which creates a basis of trust. We have therefore set up a provenance service that developers can easily integrate and that records the data traces. The next step will be to provide customised insights on these data tracks for different target groups.

### Contact

[Menzo Windhouwer](mailto:menzo.windhouwer@di.huc.knaw.nl), Lead developer for team Structured Data ([Research Gate](https://www.researchgate.net/profile/Menzo-Windhouwer), [LinkedIn](https://www.linkedin.com/in/mwindhouwer/?originalSubdomain=nl), [Pure](https://pure.knaw.nl/portal/nl/persons/menzo-windhouwer))

### Projects

- Golden Agents: providing storage and accessibility for enriched linked data- and linksets
- CLARIAH(+): setting up the metadata harvesting pipeline, its vocabulary ecosystem and reimplementing/specifying data stories
- CLARIN: maintain the core of the Component Metadata infrastructure and its harvesting pipeline
- REPUBLIC & OpenHuygens: revive Huygens data sets in state-of-the-art technology and data stores
- ISEBEL: harvesting from & central catalog for folktale data


### Software and Data

- Lenticular Lens is a tool which allows users to construct linksets between entities from different Timbuctoo datasets (so called data-alignment or reconciliation). Lenticular Lens tracks the configuration and the algorithms used in the alignment and is also able to report on manual corrections and the amount of manual validation done.
- Timbuctoo is a Linked Data Store, which is able to store large graphs. It provides a GraphQL interface, which means that the schema of the graph is easily available for interaction. ResourceSync support enables us to keep related indexes and access tools in sync. Timbuctoo keeps close track of the provenance. It forms the heart of an expanding toolset to deal with all aspects of linked data.
- Procrustus is our forms framework, which we can easily adapt to any data source. And can be tweaked to the maximum usability.


### Publications and Presentations

- Al Idrissou, Leon van Wissen, and Veruska Zamborlini. The Lenticular Lens – Addressing Various Aspects of Entity Disambiguation in the Semantic We At Graphs and Networks in the Humanities 2022, online, 3-4 February 2022.
- R. Zeeman, M. Windhouwer. Tweak Your CMDI Forms to the Max. At the CLARIN Annual Conference, Pisa, Italy, October 8-10, 2018. (video) 			
Q. Ding, T. Meder, M. Windhouwer. ISEBEL an Intelligent Search Engine for Belief Legends. In Digital Humanities 2019: Conference Abstracts (DH 2019), 	Utrecht, The Netherlands, July 9-12, 2019
- M. Windhouwer, M. Kemps-Snijders, P. Trilsbeek, A. Moreira, B. van der Veen, G. Silva, D. von Rhein. 	FLAT: constructing a CLARIN compatible home for language resources. In Proceedings of the Tenth International Conference on Language Resources and Evaluation (LREC 2016), European Language Resources Association (ELRA), Portorož, Slovenia, May 23 - 28, 2016. 	
