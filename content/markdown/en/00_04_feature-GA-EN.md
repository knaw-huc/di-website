---
title: The tools of Golden Agents
author: Erica Renckens
type: feature
featured_image: golden-agents.jpg
summary: The Golden Agents project (2016-2022) brings together various sources on early modern Dutch creative industries in a sustainable research infrastructure. 
publication_date: 22-06-2023
showPubDate: true
showAuthor: true
---

With painting, graphics and book production, among others, the Dutch creative industries experienced amazing times in the Golden Age. The Golden Agents project (2016-2022) brings together various sources on these industries in a sustainable research infrastructure. In it, researchers can study the relationships and interactions between producers and consumers and between the different branches of the creative industries. 

These include, for instance, collections of portraits from the RKD and estate inventories from the notarial archive of the Stadsarchief Amsterdam. Together, these provide a detailed picture of the ownership of cultural goods by the inhabitants of 17th-century Amsterdam, then one of the most important cities in the world. The Digital Infrastructure Department of the KNAW Humanities Cluster (HuC) developed several tools for Golden Agents that allow users to explore, analyse, annotate and visualise the combined datasets.

"We were able to take an important step in the field of linked data in this project," says Menzo Windhouwer, lead developer of Structured Data. "Especially at the start of Golden Agents, linked data was still quite new. In CLARIAH, the digital research infrastructure for the humanities, a start had already been made on supporting linked data, but in this project we were able to expand that and thus bring more datasets together. A great challenge."

<h2>Lenticular Lens</h2>

In collaboration with the University of Amsterdam, for example, the Lenticular Lens tool was developed. "That takes care of 'alignment': the tool looks at where two datasets are about the same entity," Windhouwer explains. As an example, he cites marriage and death registers, from which you can extract life history information. "In Lenticular Lens, you can specify how the data in the datasets should be compared. For example, you specify how much spelling variation in the name you allow and how far apart birth dates can be. Then you let that lens specification check the data and you get a set of links between presumably the same entities in both datasets. After that, you can still validate those links." If the matching algorithm the user has set up does not work very well, or only for a limited part of the collections, he can point that out at this stage. "The user can include the final set of links in the dataset or store as a separate dataset. This way, the data is further enriched."

The basis for Lenticular Lens is Timbuctoo, a database specifically for large amounts of linked data. "In Timbuctoo, you can upload, share and edit datasets," Windhouwer says. The data in Timbuctoo is searchable using the query language GraphQL. "The advantage of that is that the schema is very explicit and can be used to shape your query."

For SPARQL users, Digital Infrastructure has developed a Data Browser as a graphical interface for the data in Timbuctoo. "In this browser, the user can browse through the data and search in it using SPARQL," he says. Based on this Data Browser, another expert system has also been developed at Utrecht University, which allows users to build a SPARQL query. Windhouwer: "This is still under development. All datasets have now been loaded. We are still working on a landing page for urls that appear in multiple collections."

<h2>Analiticcl</h2>

Another tool developed within Golden Agents is Analiticcl, in collaboration with Team Text from the Digital Infrastructure department. This tool can be used for spelling correction using a validated lexicon. "Some datasets, especially inventories, consist more of text than structured data," Windhouwer explains. Searching these kinds of datasets is difficult because there was no standard spelling in the 17th century. Also, errors sometimes creep into the text when digitising the documents with OCR or HTR. Analiticcl still finds these spelling variations through fuzzy matching, where the texts are checked against lexicons that the user can enter himself. The tool then displays the different spelling variations found.

"For example, you give Analiticcl lexicons of people, rooms and objects that appear in inventories, such as paintings, bedding and tables. Then the tool finds 'serviteijten', where probably 'servetten' (napkins) is meant. And 'gereetslappen' where presumably 'gereedschappen' (tools) is meant. So you can still find certain objects in the datasets."

All in all, Windhouwer looks back on the project with satisfaction. "We were able to make great strides in the field of linked data. We will continue to work a lot on that in the future. In addition, it worked well to develop reusable components. We can use these in different combinations and also replace them individually if necessary. That way, you are a lot more flexible than if you build a monolith." 
