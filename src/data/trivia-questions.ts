export interface TriviaQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  fun: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // ── Corps humain ──────────────────────────────────────────────────────────
  { id:"t1",  category:"🫀 Corps humain",  question:"Combien de dents définitives a un adulte ?", options:["28","30","32","36"], correctIndex:2, fun:"Les dents de sagesse peuvent faire monter ce total à 32 !" },
  { id:"t2",  category:"🫀 Corps humain",  question:"Quel organe pompe le sang dans le corps ?", options:["Le foie","Le poumon","Le cœur","Le rein"], correctIndex:2, fun:"Le cœur bat environ 100 000 fois par jour !" },
  { id:"t3",  category:"🫀 Corps humain",  question:"Combien d'os a le corps humain adulte ?", options:["156","206","256","306"], correctIndex:1, fun:"Un bébé naît avec environ 300 os, qui fusionnent en grandissant !" },
  { id:"t4",  category:"🫀 Corps humain",  question:"Quel est le plus grand organe du corps humain ?", options:["Le foie","Le cerveau","La peau","Le poumon"], correctIndex:2, fun:"La peau représente environ 2 m² sur un adulte !" },
  { id:"t5",  category:"🫀 Corps humain",  question:"Combien de muscles compte environ le corps humain ?", options:["200","400","600","800"], correctIndex:2, fun:"Le sourire utilise moins de muscles que le froncement de sourcils !" },
  { id:"t39", category:"🫀 Corps humain",  question:"Combien de temps dure environ la grossesse chez l'être humain ?", options:["6 mois","9 mois","12 mois","7 mois"], correctIndex:1, fun:"9 mois, soit environ 280 jours après la dernière menstruation !" },
  { id:"t41", category:"🫀 Corps humain",  question:"Quel organe filtre le sang et produit l'urine ?", options:["Le foie","La rate","Le rein","Le pancréas"], correctIndex:2, fun:"Chaque rein contient environ un million de filtres appelés néphrons !" },
  { id:"t42", category:"🫀 Corps humain",  question:"Combien de litres de sang a environ un adulte ?", options:["3 litres","5 litres","8 litres","10 litres"], correctIndex:1, fun:"Le sang représente environ 7% du poids corporel total !" },
  { id:"t43", category:"🫀 Corps humain",  question:"Quelle partie du cerveau contrôle l'équilibre ?", options:["Le cervelet","Le cortex","L'hippocampe","Le bulbe"], correctIndex:0, fun:"Le cervelet coordonne aussi les mouvements précis comme écrire !" },
  { id:"t44", category:"🫀 Corps humain",  question:"Combien de fois par minute cligne-t-on des yeux en moyenne ?", options:["5 fois","15 fois","30 fois","50 fois"], correctIndex:1, fun:"Cligner des yeux hydrate et nettoie la surface de l'œil !" },
  // ── Animaux ───────────────────────────────────────────────────────────────
  { id:"t6",  category:"🐘 Animaux",       question:"Quel animal est le plus grand d'Afrique ?", options:["Le rhinocéros","L'éléphant","La girafe","L'hippopotame"], correctIndex:1, fun:"Un éléphant mâle peut peser jusqu'à 6 tonnes !" },
  { id:"t7",  category:"🐘 Animaux",       question:"Quel oiseau ne peut pas voler mais court très vite ?", options:["Le faucon","L'autruche","Le perroquet","Le pélican"], correctIndex:1, fun:"L'autruche peut courir à 70 km/h, plus vite qu'un cheval !" },
  { id:"t8",  category:"🐘 Animaux",       question:"Quel animal a le plus long cou ?", options:["L'éléphant","Le chameau","La girafe","Le flamant rose"], correctIndex:2, fun:"Le cou d'une girafe peut mesurer jusqu'à 1,8 mètre !" },
  { id:"t9",  category:"🐘 Animaux",       question:"Comment appelle-t-on le petit du lion ?", options:["Un lionceau","Un louveteau","Un chaton","Un ourson"], correctIndex:0, fun:"Un lionceau devient adulte vers l'âge de 2-3 ans !" },
  { id:"t10", category:"🐘 Animaux",       question:"Quel animal est symbole de la paix ?", options:["L'aigle","Le serpent","La colombe","Le lion"], correctIndex:2, fun:"La colombe blanche est un symbole de paix depuis l'Antiquité !" },
  { id:"t45", category:"🐘 Animaux",       question:"Quel est le seul mammifère capable de voler vraiment ?", options:["L'écureuil volant","La chauve-souris","Le flying fox","Le sucrier"], correctIndex:1, fun:"Les chauve-souris représentent 20% de toutes les espèces de mammifères !" },
  { id:"t46", category:"🐘 Animaux",       question:"Quel animal africain est le plus dangereux pour l'homme ?", options:["Le lion","Le crocodile","L'hippopotame","Le moustique"], correctIndex:3, fun:"Le moustique tue plus d'un million de personnes par an via le paludisme !" },
  { id:"t47", category:"🐘 Animaux",       question:"Combien de cornes a le rhinocéros blanc ?", options:["0","1","2","3"], correctIndex:2, fun:"La corne du rhinocéros est faite de kératine, comme nos ongles !" },
  { id:"t48", category:"🐘 Animaux",       question:"Quel reptile peut changer de couleur ?", options:["Le gecko","Le caméléon","L'iguane","Le lézard"], correctIndex:1, fun:"Le caméléon change de couleur pour communiquer ses émotions, pas pour se camoufler !" },
  { id:"t49", category:"🐘 Animaux",       question:"Quel oiseau du Bénin est célèbre pour son grand bec coloré ?", options:["Le martin-pêcheur","Le calao","Le touraco","Le bulbul"], correctIndex:1, fun:"Le calao à casque est emblématique de l'Afrique de l'Ouest !" },
  // ── Système solaire ───────────────────────────────────────────────────────
  { id:"t11", category:"🌍 Système solaire", question:"Quelle est la planète la plus proche du Soleil ?", options:["Vénus","Mars","Mercure","Terre"], correctIndex:2, fun:"Mercure fait le tour du Soleil en seulement 88 jours !" },
  { id:"t12", category:"🌍 Système solaire", question:"Combien de planètes compte notre système solaire ?", options:["7","8","9","10"], correctIndex:1, fun:"Pluton a été déclassée en 2006, portant le nombre à 8 !" },
  { id:"t13", category:"🌍 Système solaire", question:"Quelle planète est surnommée 'la planète rouge' ?", options:["Jupiter","Saturne","Mars","Vénus"], correctIndex:2, fun:"La couleur rouge de Mars vient du fer oxydé dans son sol !" },
  { id:"t14", category:"🌍 Système solaire", question:"Quelle est la plus grande planète du système solaire ?", options:["Saturne","Neptune","Uranus","Jupiter"], correctIndex:3, fun:"Jupiter est si grande que 1 300 Terres pourraient tenir à l'intérieur !" },
  { id:"t15", category:"🌍 Système solaire", question:"Quelle planète possède les anneaux les plus visibles ?", options:["Uranus","Jupiter","Saturne","Neptune"], correctIndex:2, fun:"Les anneaux de Saturne sont surtout composés de glace !" },
  { id:"t40", category:"🌍 Système solaire", question:"Combien de temps met la lumière du Soleil pour atteindre la Terre ?", options:["8 secondes","8 minutes","8 heures","8 jours"], correctIndex:1, fun:"La lumière voyage à 300 000 km/s, mais le Soleil est loin !" },
  { id:"t50", category:"🌍 Système solaire", question:"Quelle est l'étoile la plus proche de notre Soleil ?", options:["Sirius","Proxima Centauri","Bételgeuse","Véga"], correctIndex:1, fun:"Proxima Centauri est à seulement 4,2 années-lumière de nous !" },
  { id:"t51", category:"🌍 Système solaire", question:"Qu'est-ce qu'une éclipse solaire totale ?", options:["La Terre cache la Lune","La Lune cache le Soleil","Le Soleil disparaît","La Terre tourne plus vite"], correctIndex:1, fun:"Lors d'une éclipse totale, les étoiles deviennent visibles en plein jour !" },
  // ── Inventions ────────────────────────────────────────────────────────────
  { id:"t16", category:"💡 Inventions",    question:"Qui a inventé le téléphone ?", options:["Thomas Edison","Alexander Graham Bell","Nikola Tesla","James Watt"], correctIndex:1, fun:"Le premier appel téléphonique date du 10 mars 1876 !" },
  { id:"t17", category:"💡 Inventions",    question:"Qui a inventé l'ampoule électrique ?", options:["Benjamin Franklin","Alexander Graham Bell","Thomas Edison","Albert Einstein"], correctIndex:2, fun:"Edison a essayé plus de 1 000 fois avant de réussir !" },
  { id:"t18", category:"💡 Inventions",    question:"Dans quel pays a été inventé l'imprimerie moderne ?", options:["Chine (papier)","Allemagne (Gutenberg)","France","Angleterre"], correctIndex:1, fun:"La Chine avait déjà une forme d'imprimerie 400 ans avant Gutenberg !" },
  { id:"t19", category:"💡 Inventions",    question:"Qui a inventé la vaccination ?", options:["Louis Pasteur","Edward Jenner","Alexander Fleming","Marie Curie"], correctIndex:1, fun:"Jenner utilisa la variole de la vache pour protéger contre la variole humaine !" },
  { id:"t52", category:"💡 Inventions",    question:"Qui a inventé l'avion ?", options:["Léonard de Vinci","Gustave Eiffel","Les frères Wright","Charles Lindbergh"], correctIndex:2, fun:"Le premier vol motorisé des frères Wright dura 12 secondes en 1903 !" },
  { id:"t53", category:"💡 Inventions",    question:"Dans quel pays le chocolat sous forme solide a-t-il été inventé ?", options:["Suisse","Belgique","Mexique","France"], correctIndex:0, fun:"La Suisse a popularisé le chocolat au lait au XIXe siècle !" },
  // ── Sports ────────────────────────────────────────────────────────────────
  { id:"t20", category:"⚽ Sports",         question:"Combien de joueurs y a-t-il dans une équipe de football sur le terrain ?", options:["9","10","11","12"], correctIndex:2, fun:"Le football est le sport le plus populaire au monde avec 4 milliards de fans !" },
  { id:"t21", category:"⚽ Sports",         question:"Combien de points vaut un panier à 3 points au basket ?", options:["1","2","3","4"], correctIndex:2, fun:"Les lancers francs valent 1 point au basketball !" },
  { id:"t22", category:"⚽ Sports",         question:"Quelle couleur est le maillot du Bénin en football ?", options:["Rouge","Bleu","Jaune-vert","Blanc"], correctIndex:2, fun:"Les Écureuils du Bénin sont le surnom de l'équipe nationale !" },
  { id:"t23", category:"⚽ Sports",         question:"Dans quel pays les Jeux Olympiques modernes ont-ils été créés ?", options:["France","Angleterre","Grèce","Italie"], correctIndex:2, fun:"Les premiers Jeux Olympiques modernes eurent lieu à Athènes en 1896 !" },
  { id:"t54", category:"⚽ Sports",         question:"Quel pays a remporté le plus de Coupes du Monde de football ?", options:["Allemagne","Brésil","France","Argentine"], correctIndex:1, fun:"Le Brésil a remporté 5 titres : 1958, 1962, 1970, 1994 et 2002 !" },
  { id:"t55", category:"⚽ Sports",         question:"Combien de joueurs compte une équipe de rugby à XV ?", options:["13","14","15","16"], correctIndex:2, fun:"Le rugby à 7 et à 13 sont d'autres variantes populaires du rugby !" },
  // ── Proverbes africains ───────────────────────────────────────────────────
  { id:"t24", category:"🌱 Proverbes",      question:"'Un seul doigt ne peut ramasser la farine' — que signifie ce proverbe ?", options:["Il faut être propre","L'union fait la force","Il faut être patient","Il ne faut pas gaspiller"], correctIndex:1, fun:"Ce proverbe fon enseigne la valeur du travail en communauté !" },
  { id:"t25", category:"🌱 Proverbes",      question:"'La forêt serait silencieuse si aucun oiseau ne chantait...' — que signifie ce proverbe ?", options:["Protégeons les oiseaux","Chacun a son rôle","La nature est belle","Restons silencieux"], correctIndex:1, fun:"Ce proverbe africain rappelle que chaque personne est unique et précieuse !" },
  { id:"t26", category:"🌱 Proverbes",      question:"Comment dit-on 'merci' en fon (langue du Bénin) ?", options:["Akpé","Ndewo","Merci","Yawo"], correctIndex:0, fun:"'Akpé kaka' signifie 'merci beaucoup' en fon !" },
  { id:"t27", category:"🌱 Proverbes",      question:"Comment dit-on 'bonjour' en yoruba ?", options:["Bawo","Ekaro","Pele","Eku"], correctIndex:1, fun:"'Ekaro' signifie 'bonjour' le matin, 'Ekasan' l'après-midi en yoruba !" },
  { id:"t56", category:"🌱 Proverbes",      question:"'L'enfant qui n'est pas élevé par sa mère sera élevé par...' ?", options:["Son père","Son oncle","Le village","Les ancêtres"], correctIndex:2, fun:"Ce proverbe africain illustre la responsabilité collective envers les enfants !" },
  { id:"t57", category:"🌱 Proverbes",      question:"Comment dit-on 'eau' en fon ?", options:["Dji","Ji","Omi","Nsu"], correctIndex:0, fun:"L'eau est précieuse en Afrique — le mot 'dji' revient dans beaucoup d'expressions !" },
  // ── Merveilles du monde ───────────────────────────────────────────────────
  { id:"t28", category:"🏛️ Merveilles",    question:"Dans quel pays se trouvent les Pyramides de Gizeh ?", options:["Éthiopie","Soudan","Égypte","Libye"], correctIndex:2, fun:"La Grande Pyramide est la seule des 7 merveilles de l'Antiquité encore debout !" },
  { id:"t29", category:"🏛️ Merveilles",    question:"Dans quel pays se trouve la Grande Muraille ?", options:["Japon","Corée","Inde","Chine"], correctIndex:3, fun:"La Grande Muraille de Chine fait environ 21 000 km de long !" },
  { id:"t30", category:"🏛️ Merveilles",    question:"Dans quel pays se trouve le Machu Picchu ?", options:["Brésil","Mexique","Pérou","Bolivie"], correctIndex:2, fun:"Le Machu Picchu est une cité inca construite vers 1450 ap. J.-C. !" },
  { id:"t58", category:"🏛️ Merveilles",    question:"Dans quel pays africain se trouvent les pyramides de Méroé ?", options:["Éthiopie","Soudan","Égypte","Tchad"], correctIndex:1, fun:"Le Soudan possède plus de pyramides que l'Égypte — plus de 200 !" },
  // ── Nature au Bénin ───────────────────────────────────────────────────────
  { id:"t31", category:"🌿 Nature au Bénin", question:"Quel est le plus grand parc national du Bénin ?", options:["Parc de la Pendjari","Parc du W","Lac Ahémé","Forêt de la Lama"], correctIndex:0, fun:"La Pendjari abrite des lions, éléphants et buffles !" },
  { id:"t32", category:"🌿 Nature au Bénin", question:"Quel lac est le plus grand plan d'eau intérieur du Bénin ?", options:["Lac Ahémé","Lac Toho","Lac Nokoué","Lac de Sakété"], correctIndex:2, fun:"Le lac Nokoué abrite la ville lacustre de Ganvié, 'Venise de l'Afrique' !" },
  { id:"t33", category:"🌿 Nature au Bénin", question:"Quelle est la principale culture d'exportation du Bénin ?", options:["Le maïs","Le coton","L'anacarde","Le manioc"], correctIndex:1, fun:"Le Bénin est l'un des principaux producteurs de coton en Afrique de l'Ouest !" },
  { id:"t59", category:"🌿 Nature au Bénin", question:"Quelle est la capitale économique du Bénin ?", options:["Porto-Novo","Parakou","Cotonou","Abomey"], correctIndex:2, fun:"Porto-Novo est la capitale officielle, mais Cotonou est la plus grande ville !" },
  { id:"t60", category:"🌿 Nature au Bénin", question:"Quel fleuve traverse le nord du Bénin ?", options:["Le Niger","Le Congo","Le Mono","La Volta"], correctIndex:0, fun:"Le fleuve Niger est le 3e plus long fleuve d'Afrique avec 4 200 km !" },
  { id:"t61", category:"🌿 Nature au Bénin", question:"Quelle ancienne capitale royale du Bénin est classée au patrimoine UNESCO ?", options:["Cotonou","Natitingou","Abomey","Ouidah"], correctIndex:2, fun:"Le Palais royal d'Abomey témoigne de la grandeur du Royaume du Dahomey !" },
  { id:"t62", category:"🌿 Nature au Bénin", question:"Quel port historique du Bénin fut lié à la traite des esclaves ?", options:["Cotonou","Ouidah","Grand-Popo","Sèmè"], correctIndex:1, fun:"La Route des Esclaves à Ouidah commémore les millions de personnes déportées !" },
  // ── Records du monde ──────────────────────────────────────────────────────
  { id:"t34", category:"🏆 Records",        question:"Quel est le plus long fleuve du monde ?", options:["L'Amazone","Le Congo","Le Nil","Le Mississippi"], correctIndex:2, fun:"Le Nil mesure environ 6 650 km, traversant 11 pays africains !" },
  { id:"t35", category:"🏆 Records",        question:"Quel est le plus grand océan du monde ?", options:["L'Atlantique","L'Indien","L'Arctique","Le Pacifique"], correctIndex:3, fun:"L'océan Pacifique couvre plus d'un tiers de la surface de la Terre !" },
  { id:"t36", category:"🏆 Records",        question:"Quel est le plus haut sommet du monde ?", options:["Le Kilimandjaro","Le Mont Blanc","L'Everest","Le K2"], correctIndex:2, fun:"L'Everest culmine à 8 849 mètres d'altitude !" },
  { id:"t37", category:"🏆 Records",        question:"Quel est le plus grand désert du monde ?", options:["Le Sahara","Le Kalahari","Le Namib","L'Antarctique"], correctIndex:3, fun:"L'Antarctique est un désert de glace : le plus grand et le plus froid du monde !" },
  { id:"t38", category:"🏆 Records",        question:"Quel est l'animal terrestre le plus rapide ?", options:["Le lion","Le guépard","Le cheval","L'antilope"], correctIndex:1, fun:"Le guépard peut atteindre 112 km/h en moins de 3 secondes !" },
  { id:"t63", category:"🏆 Records",        question:"Quel est le plus grand continent du monde ?", options:["Les Amériques","L'Afrique","L'Asie","L'Europe"], correctIndex:2, fun:"L'Asie représente 30% des terres émergées et accueille 60% de la population mondiale !" },
  { id:"t64", category:"🏆 Records",        question:"Quel est le plus grand pays d'Afrique ?", options:["Le Congo","Le Soudan","L'Algérie","La Libye"], correctIndex:2, fun:"L'Algérie est le plus grand pays d'Afrique depuis 2011 !" },
  // ── Histoire africaine ────────────────────────────────────────────────────
  { id:"t65", category:"👑 Histoire Afrique", question:"Quel empire africain contrôlait le commerce de l'or au Moyen Âge ?", options:["L'Empire du Mali","L'Empire du Kush","Le Royaume du Bénin","L'Empire éthiopien"], correctIndex:0, fun:"L'Empire du Mali, avec Mansa Moussa, fut le plus riche du monde en 1324 !" },
  { id:"t66", category:"👑 Histoire Afrique", question:"Qui fut le premier président du Bénin indépendant en 1960 ?", options:["Mathieu Kérékou","Hubert Maga","Sourou Migan Apithy","Justin Ahomadégbé"], correctIndex:1, fun:"Hubert Maga proclama l'indépendance du Dahomey (Bénin) le 1er août 1960 !" },
  { id:"t67", category:"👑 Histoire Afrique", question:"Quel est l'ancien nom du Bénin avant 1975 ?", options:["Togo","Côte d'Or","Dahomey","Volta"], correctIndex:2, fun:"Le Dahomey fut rebaptisé Bénin en 1975 par le président Mathieu Kérékou !" },
  { id:"t68", category:"👑 Histoire Afrique", question:"Qui fut la première présidente d'un pays africain ?", options:["Ellen Johnson Sirleaf","Winnie Mandela","Joyce Banda","Sahle-Work Zewde"], correctIndex:0, fun:"Ellen Johnson Sirleaf fut présidente du Liberia de 2006 à 2018 et prix Nobel de la Paix !" },
  { id:"t69", category:"👑 Histoire Afrique", question:"Quel pharaon fit construire la Grande Pyramide de Gizeh ?", options:["Ramsès II","Toutânkhamon","Khéops","Néfertiti"], correctIndex:2, fun:"La pyramide de Khéops fut construite vers 2 560 av. J.-C. avec 2,3 millions de blocs !" },
  { id:"t70", category:"👑 Histoire Afrique", question:"Dans quel pays Nelson Mandela fut-il emprisonné pendant 27 ans ?", options:["Zimbabwe","Mozambique","Afrique du Sud","Namibie"], correctIndex:2, fun:"Mandela fut libéré en 1990 et devint président de l'Afrique du Sud en 1994 !" },
  // ── Sciences ──────────────────────────────────────────────────────────────
  { id:"t71", category:"🔬 Sciences",       question:"Quelle est la formule chimique de l'eau ?", options:["CO2","H2O","O2","NaCl"], correctIndex:1, fun:"Une molécule d'eau est formée de 2 atomes d'hydrogène et 1 d'oxygène !" },
  { id:"t72", category:"🔬 Sciences",       question:"Qu'est-ce que la photosynthèse ?", options:["La digestion des plantes","Les plantes fabriquent leur nourriture avec la lumière","La respiration des arbres","La germination des graines"], correctIndex:1, fun:"Les plantes absorbent le CO2 et rejettent de l'O2 — elles purifient l'air !" },
  { id:"t73", category:"🔬 Sciences",       question:"Combien y a-t-il d'éléments dans le tableau périodique actuel ?", options:["92","100","118","150"], correctIndex:2, fun:"L'élément 118, l'Oganesson, est le plus lourd connu à ce jour !" },
  { id:"t74", category:"🔬 Sciences",       question:"À quelle température l'eau bout-elle au niveau de la mer ?", options:["80°C","90°C","100°C","120°C"], correctIndex:2, fun:"Au sommet de l'Everest, l'eau bout à seulement 70°C car la pression est faible !" },
  { id:"t75", category:"🔬 Sciences",       question:"Qu'est-ce qu'un volcan ?", options:["Une montagne de glace","Une ouverture laissant sortir du magma","Un lac de cratère","Un geyser d'eau chaude"], correctIndex:1, fun:"Le Kilimandjaro en Tanzanie est un volcan éteint et le plus haut sommet d'Afrique !" },
  // ── Géographie Afrique ────────────────────────────────────────────────────
  { id:"t76", category:"🗺️ Géographie",    question:"Combien de pays compte l'Afrique ?", options:["45","54","63","70"], correctIndex:1, fun:"L'Afrique est le continent comptant le plus de pays au monde !" },
  { id:"t77", category:"🗺️ Géographie",    question:"Quelle est la plus grande ville d'Afrique ?", options:["Johannesburg","Le Caire","Lagos","Kinshasa"], correctIndex:2, fun:"Lagos au Nigeria dépasse 15 millions d'habitants et est la plus grande ville africaine !" },
  { id:"t78", category:"🗺️ Géographie",    question:"Quel est le plus grand lac d'Afrique ?", options:["Lac Tanganyika","Lac Victoria","Lac Malawi","Lac Turkana"], correctIndex:1, fun:"Le lac Victoria est partagé entre le Kenya, l'Ouganda et la Tanzanie !" },
  { id:"t79", category:"🗺️ Géographie",    question:"Quel pays africain est le plus peuplé ?", options:["Éthiopie","RD Congo","Égypte","Nigeria"], correctIndex:3, fun:"Le Nigeria compte plus de 220 millions d'habitants !" },
  { id:"t80", category:"🗺️ Géographie",    question:"Quelle chaîne de montagnes traverse le Maroc et l'Algérie ?", options:["Les Alpes","Le Drakensberg","L'Atlas","Le Rift"], correctIndex:2, fun:"L'Atlas culmine au Toubkal à 4 167 m au Maroc !" },
  // ── Culture ───────────────────────────────────────────────────────────────
  { id:"t81", category:"🎭 Culture",        question:"Qu'est-ce que le vodoun (vaudou) au Bénin ?", options:["Une danse traditionnelle","Une religion traditionnelle africaine","Un plat béninois","Un instrument de musique"], correctIndex:1, fun:"Le Bénin célèbre le 10 janvier la fête nationale du Vodoun !" },
  { id:"t82", category:"🎭 Culture",        question:"Quel instrument africain est l'ancêtre du banjo ?", options:["Le djembé","Le kora","Le balafon","Le ngoni"], correctIndex:3, fun:"Le ngoni d'Afrique de l'Ouest fut amené en Amérique par les esclaves !" },
  { id:"t83", category:"🎭 Culture",        question:"Quel tissu coloré est emblématique de l'Afrique de l'Ouest ?", options:["Le batik","Le bogolan","Le wax (pagne)","Le kente"], correctIndex:2, fun:"Le wax est devenu un symbole de mode africaine dans le monde entier !" },
  { id:"t84", category:"🎭 Culture",        question:"Dans quel pays a été inventée la lutte sénégalaise ?", options:["Mali","Gambie","Sénégal","Guinée"], correctIndex:2, fun:"La lutte sénégalaise mêle combat et danse — c'est le sport national du Sénégal !" },
  { id:"t85", category:"🎭 Culture",        question:"Quelle langue est officielle au Bénin ?", options:["Le fon","Le yoruba","Le français","Le bariba"], correctIndex:2, fun:"Le français est la langue officielle, mais le fon est la langue locale la plus répandue !" },
  // ── Alimentation ──────────────────────────────────────────────────────────
  { id:"t86", category:"🍽️ Alimentation",  question:"Quel fruit tropical est surnommé 'le roi des fruits' ?", options:["L'ananas","La mangue","Le durian","La papaye"], correctIndex:2, fun:"Le durian d'Asie du Sud-Est est célèbre pour son odeur très puissante !" },
  { id:"t87", category:"🍽️ Alimentation",  question:"Quel est le plat de base au Bénin à base de maïs fermenté ?", options:["Le thiéboudiène","L'akassa","Le ndolé","Le couscous"], correctIndex:1, fun:"L'akassa est une pâte de maïs fermenté servie avec diverses sauces traditionnelles !" },
  { id:"t88", category:"🍽️ Alimentation",  question:"Quelle céréale est la plus consommée en Afrique de l'Ouest ?", options:["Le blé","Le riz","Le maïs","Le sorgho"], correctIndex:2, fun:"Le maïs est utilisé pour faire de la bouillie, du couscous et de la bière de mil !" },
  { id:"t89", category:"🍽️ Alimentation",  question:"Quel fruit riche en vitamine C pousse en abondance au Bénin ?", options:["La pomme","L'orange","La fraise","La cerise"], correctIndex:1, fun:"Une orange fournit plus de 100% des besoins journaliers en vitamine C !" },
  // ── Maths ─────────────────────────────────────────────────────────────────
  { id:"t90", category:"🔢 Maths",          question:"Combien font 7 × 8 ?", options:["54","56","58","64"], correctIndex:1, fun:"L'astuce : retiens '5,6,7,8' — 5×6=30, 7×8=56 !" },
  { id:"t91", category:"🔢 Maths",          question:"Quel est le nombre premier entre 10 et 15 ?", options:["10","11","12","14"], correctIndex:1, fun:"11 est premier car il n'est divisible que par 1 et lui-même !" },
  { id:"t92", category:"🔢 Maths",          question:"Combien y a-t-il de secondes dans une minute ?", options:["10","30","60","100"], correctIndex:2, fun:"Une heure = 60 minutes × 60 secondes = 3 600 secondes !" },
  { id:"t93", category:"🔢 Maths",          question:"Quel est le résultat de 100 ÷ 4 ?", options:["20","25","40","50"], correctIndex:1, fun:"Diviser par 4, c'est diviser par 2 deux fois : 100÷2=50, 50÷2=25 !" },
  // ── Environnement ─────────────────────────────────────────────────────────
  { id:"t94", category:"🌱 Environnement", question:"Qu'est-ce que le réchauffement climatique ?", options:["Le Soleil qui grossit","L'augmentation des températures due aux gaz à effet de serre","L'été plus long","La chaleur des villes"], correctIndex:1, fun:"Les températures en Afrique augmentent 1,5 fois plus vite que la moyenne mondiale !" },
  { id:"t95", category:"🌱 Environnement", question:"Quel gaz les plantes absorbent-elles pour grandir ?", options:["L'oxygène","L'azote","Le CO2","La vapeur d'eau"], correctIndex:2, fun:"En absorbant le CO2, les forêts d'Afrique centrale sont des 'poumons' de la planète !" },
  { id:"t96", category:"🌱 Environnement", question:"Que peut-on faire pour économiser l'eau ?", options:["Laisser le robinet ouvert","Prendre de très longs bains","Fermer le robinet quand on se brosse les dents","Arroser en plein soleil"], correctIndex:2, fun:"Laisser le robinet ouvert 2 minutes gaspille 12 litres d'eau !" },
  { id:"t97", category:"🌱 Environnement", question:"Parmi ces sources d'énergie, laquelle est renouvelable ?", options:["Le pétrole","Le charbon","L'énergie solaire","Le gaz naturel"], correctIndex:2, fun:"L'Afrique reçoit 40% de l'énergie solaire mondiale — un potentiel immense !" },
  // ── Tech ──────────────────────────────────────────────────────────────────
  { id:"t98", category:"💻 Tech",           question:"Que signifie 'IA' dans 'intelligence artificielle' ?", options:["Internet Actif","Une machine qui apprend et raisonne","Interaction Avancée","Information Automatique"], correctIndex:1, fun:"L'IA est utilisée dans l'agriculture africaine pour améliorer les récoltes !" },
  { id:"t99", category:"💻 Tech",           question:"Quel pays africain est pionnier des paiements mobiles avec M-Pesa ?", options:["Nigeria","Ghana","Kenya","Afrique du Sud"], correctIndex:2, fun:"M-Pesa au Kenya a révolutionné la finance mondiale dès 2007 !" },
  { id:"t100", category:"💻 Tech",          question:"Qu'est-ce qu'Internet ?", options:["Un gros ordinateur","Un réseau mondial d'ordinateurs connectés","Un satellite","Un programme de jeux"], correctIndex:1, fun:"Internet connecte plus de 5 milliards de personnes dans le monde !" },
];

function simpleHash(str: string): number {
  let hash = 0;
  for (const c of String(str)) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return hash;
}

/** Retourne 10 questions déterministes par enfant et par date */
export function getDailyQuestions(date: string, childId?: string): TriviaQuestion[] {
  const seedStr = date + (childId ?? "");
  const seed = seedStr.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...TRIVIA_QUESTIONS].sort((a, b) => {
    const ha = simpleHash(a.id + seed);
    const hb = simpleHash(b.id + seed);
    return ha - hb;
  });
  return shuffled.slice(0, 10);
}
