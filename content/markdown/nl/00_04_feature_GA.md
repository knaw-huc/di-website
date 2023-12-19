---
title: De nieuwe tools van Golden Agents
author: Erica Renckens
type: feature
featured_image: golden-agents.jpg
summary: In het project Golden Agents (2016-2022) zijn verschillende bronnen over deze industrieën samengebracht in een duurzame onderzoeksinfrastructuur met verschillende tools. 
publication_date: 22-06-2023
showPubDate: true
showAuthor: true
---

Met onder andere de schilderkunst, de grafiek en de boekproductie beleefden de Nederlandse creatieve industrieën in de Gouden Eeuw grootse tijden. In het project Golden Agents (2016-2022) zijn verschillende bronnen over deze industrieën samengebracht in een duurzame onderzoeksinfrastructuur. Daarin kunnen onderzoekers de relaties en interacties tussen producenten en consumenten en tussen de verschillende bedrijfstakken van de creatieve industrie bestuderen. 

Het gaat dan om bijvoorbeeld collecties van portretten van het RKD en boedelinventarissen uit het notarieel archief van het Stadsarchief Amsterdam. Tezamen geven die een gedetailleerd beeld van het bezit van culturele goederen door de inwoners van het 17e-eeuwse Amsterdam, destijds een van de belangrijkste steden ter wereld. De afdeling Digitale Infrastructuur van het KNAW Humanities Cluster (HuC) ontwikkelde voor Golden Agents verschillende tools waarmee gebruikers de gecombineerde datasets kunnen exploreren, analyseren, annoteren en visualiseren.

“We konden in dit project een goede stap zetten op het gebied van linked data”, vertelt Menzo Windhouwer, hoofdontwikkelaar Structured Data. “Zeker bij de start van Golden Agents was linked data nog vrij nieuw. In CLARIAH, de digitale onderzoeksinfrastructuur voor de geesteswetenschappen, was wel al een begin gemaakt met de ondersteuning van linked data, maar in dit project konden we dat uitbreiden en zo meer datasets bij elkaar brengen. Een mooie uitdaging.”

<h2>Lenticular Lens</h2>
In samenwerking met de Universiteit van Amsterdam is bijvoorbeeld de tool Lenticular Lens ontwikkeld. “Die zorgt voor ‘alignement’: de tool bekijkt waar het in twee datasets over dezelfde entiteit gaat”, legt Windhouwer uit. Als voorbeeld noemt hij de trouw- en overlijdensregisters, waar je levensloopinformatie uit kunt halen. “In Lenticular Lens kun je aangeven hoe de gegevens in de datasets met elkaar vergeleken moeten worden. Je geeft bijvoorbeeld aan hoeveel spellingvariatie in de naam je toestaat en hoever geboortedata uit elkaar mogen liggen. Vervolgens laat je die lensspecificatie de data nalopen en krijg je een set van links tussen vermoedelijk dezelfde entiteiten in beide datasets. Daarna kun je die links nog valideren.” Als het matching-algoritme dat de gebruiker heeft opgesteld niet zo goed, of maar voor een beperkt deel van de collecties werkt, kan hij dat in deze fase aangeven. “De uiteindelijke set van links kan de gebruiker opnemen in de dataset of als aparte dataset opslaan. Zo wordt de data verder verrijkt.”

De basis voor Lenticular Lens is Timbuctoo, een database specifiek voor grote hoeveelheden linked data. “In Timbuctoo kun je datasets uploaden, delen en bewerken”, vertelt Windhouwer. De data in Timbuctoo zijn doorzoekbaar met de querytaal GraphQL. “Het voordeel daarvan is dat het schema heel expliciet is en kan worden gebruikt om je query vorm te geven.” 

Voor SPARQL-gebruikers heeft Digitale Infrastructuur een Data Browser ontwikkeld als grafische interface voor de data in Timbuctoo. “De gebruiker kan in deze browser door de data bladeren en erin zoeken met SPARQL.” Op basis van deze Data Browser is aan de Universiteit Utrecht daarnaast nog een expertsysteem ontwikkeld, waarmee gebruikers een SPARQL-query kunnen opbouwen. Windhouwer: “Deze is nog in ontwikkeling. Alle datasets zijn inmiddels geladen. We werken nog aan een landingspagina  voor url's die in meerdere collecties voorkomen.”

<h2>Analiticcl</h2>
Een andere tool die binnen Golden Agents is ontwikkeld, is Analiticcl, in samenwerking met Team Text van de afdeling Digitale Infrastructuur. Deze tool kan worden gebruikt voor spellingcorrectie aan de hand van een gevalideerd lexicon. “Sommige datasets, met name de inventarissen, bestaan meer uit tekst dan uit gestructureerde data”, legt Windhouwer uit. Het zoeken in dit soort datasets is moeilijk omdat er in de 17e eeuw nog geen standaardspelling bestond. Ook sluipen er soms fouten in de tekst bij het digitaliseren van de documenten met OCR of HTR. Analiticcl vindt deze spellingvariaties alsnog door middel van fuzzy matching, waarbij de teksten worden gecheckt aan de hand van lexica die de gebruiker zelf kan ingeven. De tool toont vervolgens de verschillende gevonden spellingvariaties.

“Je geeft Analiticcl bijvoorbeeld lexica van personen, ruimtes en voorwerpen die voorkomen in inventarissen, zoals schilderijen, beddengoed en tafeltjes. Dan vindt de tool ‘serviteijten’, waar waarschijnlijk ‘servetten’ bedoeld is. En ‘gereetslappen’ waar vermoedelijk ‘gereedschappen’ staat. Zo kun je bepaalde voorwerpen toch in de datasets terugvinden.”

Al met al kijkt Windhouwer met een goed gevoel terug op het project. “We hebben grote stappen kunnen zetten op het gebied van linked data. Daar zullen we ook in de toekomst veel aan blijven werken. Daarnaast werkte het goed om herbruikbare componenten te ontwikkelen. Die kunnen we in verschillende combinaties inzetten en indien nodig ook individueel vervangen. Zo ben je een stuk flexibeler dan als je een monoliet bouwt.”
