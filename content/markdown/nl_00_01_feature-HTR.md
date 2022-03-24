---
title: Zoeken in handgeschreven teksten
author: Arno Bosse
type: feature
---
“Tot het begin van de 18e eeuw werden de resoluties van de Staten Generaal met de hand geschreven”, vertelt Joris Oddens, projectleider van Republic, waarin deze resoluties (1576-1796) digitaal worden ontsloten. “Die handschriften zijn voor een mens moeilijk te lezen en lastig om in groten getale te doorzoeken. Automatische handschriftherkenning zorgt dan ook voor een revolutie in de geesteswetenschappen. Doordat alles online doorzoekbaar wordt, kun je heel andere onderzoeksvragen stellen.”

Binnen de afdeling Digitale Infrastructuur is Rutger van Koert verantwoordelijk voor de Handwritten Text Recognition (HTR). Hij ontwikkelt een pijplijn waar de ingescande documenten in gaan en er als machineleesbare teksten uitrollen. “Voor elke stap in de pijplijn hebben we verschillende tools voorhanden, zodat je voor elk project de optimale samenstelling kunt vormen”, vertelt hij. “Bij een project als Republic willen we de handschriften bijvoorbeeld foutloos herkennen, maar bij andere projecten mogen er nog wat foutjes inzitten en is juist snelheid belangrijk. Dan gebruiken we een andere HTR-engine.”

De foutmarge van de HTR ligt op dit moment tussen de 0 en 10 procent. “De gedrukte resoluties van Republic worden vrijwel foutloos herkend, daar ligt de Character Error Rate (CER) op 0,1 procent”, vertelt Van Koert. “Vervuild materiaal met waterschade en veel verschillende handschriften, zoals in het project Dutch Prize Papers, komt op een CER van zo’n 10 procent. Bij net handgeschreven materiaal ligt het tussen de 3 en 5 procent.”

### Stappen in de pijplijn

Hoe komt dat resultaat tot stand? “De eerste stap is om op de scan te onderscheiden waar tekst staat en waar niet. Met behulp van machine learning zoeken we steeds de baseline, het lijntje waarop de karakters rusten”, legt Van Koert uit. “Daarna knippen we met een seam carving-algoritme de tekstregels uit. Die slaan we stuk voor stuk op.”

Vervolgens kan de daadwerkelijke handschriftherkenning beginnen. Van Koert: “Een klein vierkantje schuift daarbij steeds een stukje op over de tekstregel. Bij elk stapje geeft hij aan wat de kans is dat daar een bepaalde letter staat. Het pad met de hoogste kans geeft dan iets als ‘RRRRREEEEEPPPPPUUUUUBBBBBLLLLLIIIIICCCCC’, waarna het algoritme alle dubbele letters samenvoegt tot één letter: ‘REPUBLIC’. Voor elke output kunnen we berekenen hoe zeker het systeem is van het resultaat, zodat je bijvoorbeeld nog een corrector naar de regels met een lage kans kunt laten kijken. Dat materiaal kun je vervolgens weer als trainingsmateriaal gebruiken om de HTR te verbeteren.”

Van Koert kan met kleine ingerepen de uitkomst van de pijplijn verbeteren. “Je kunt er bijvoorbeeld een woordenboek of namenlijst instoppen, zodat de kans op een bestaand woord wordt vergroot. Daarnaast leert het neurale netwerk ook van zijn ervaring en corrigeert dan naar een woord dat hij eerder heeft herkend. Maar je wil voorkomen dat het systeem gaat ‘hallucineren’: als er echt iets anders staat, moet hij dat ook herkennen.”

### Open en herbruikbaar

Joris Oddens is erg tevreden over het HTR-resultaat binnen Republic. “Het was een enorme tijdsinvestering, maar de resultaten zijn boven verwachting goed. En toekomstige projecten kunnen ook weer van deze investering profiteren”, vertelt hij.

Een van die projecten is Globalise, dat begin 2022 van start is gegaan. “We willen de 4,8 miljoen scans uit het VOC-archief doorzoekbaar en onderzoekbaar maken”, vertelt projectleider Matthias van Rossum. “Daarvoor is het cruciaal dat de HTR van goede kwaliteit is, want daar zijn uiteindelijk alle vervolgstappen op gebaseerd. De pijplijn die Rutger voor Globalise ontwikkelt zal straks ook te gebruiken zijn voor anderen. Geheel volgens onze filosofie: alles open en herbruikbaar, ook voor buiten het HuC.”
