import type { Level, Exercise } from "@/types/exercise";

const ex = (id: string, type: Exercise["type"], ttsText: string, data: Exercise["data"]): Exercise =>
  ({ id, type, ttsText, data });

// ── LEVEL 1 — Mon Bénin ───────────────────────────────────────────────────────

const H1: Exercise[] = [
  ex("h1-1","choice","Quelle est la capitale du Bénin ?",{ question:"Quelle est la capitale officielle du Bénin ?", options:["Cotonou","Parakou","Porto-Novo","Natitingou"], correctIndex:2 }),
  ex("h1-2","numpad","En quelle année le Bénin a-t-il obtenu son indépendance ?",{ question:"Le Bénin est indépendant depuis l'année :", answer:1960, unit:"" }),
  ex("h1-3","choice","De quel pays le Bénin était-il une colonie ?",{ question:"Avant l'indépendance, le Bénin était une colonie :", options:["Britannique","Portugaise","Française","Espagnole"], correctIndex:2 }),
  ex("h1-4","choice","Quel est le drapeau du Bénin ?",{ question:"À quel pays appartient ce drapeau ? 🟩🟨🟥 (bande verte + jaune + rouge)", options:["Guinée","Bénin","Cameroun","Sénégal"], correctIndex:1 }),
  ex("h1-5","choice","Quelle est la plus grande ville du Bénin ?",{ question:"Quelle est la plus grande ville du Bénin en population ?", options:["Porto-Novo","Parakou","Abomey","Cotonou"], correctIndex:3 }),
  ex("h1-6","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Capitale officielle",right:"Porto-Novo"},{left:"Capitale économique",right:"Cotonou"},{left:"Ancienne capitale royale",right:"Abomey"},{left:"Ville du nord",right:"Parakou"}] }),
  ex("h1-7","choice","Quelle langue officielle parle-t-on au Bénin ?",{ question:"La langue officielle du Bénin est :", options:["L'anglais","Le fon","Le français","Le yoruba"], correctIndex:2 }),
  ex("h1-8","choice","Le Bénin partage une frontière avec combien de pays ?",{ question:"Le Bénin est frontalier de combien de pays ?", options:["3","4","5","6"], correctIndex:1 }),
  ex("h1-9","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Nord du Bénin",right:"Niger"},{left:"Est du Bénin",right:"Nigeria"},{left:"Ouest du Bénin",right:"Togo"},{left:"Nord-ouest",right:"Burkina Faso"}] }),
  ex("h1-10","choice","Comment appelle-t-on les habitants du Bénin ?",{ question:"Les habitants du Bénin s'appellent :", options:["Béniniens","Béninois","Béninards","Béninades"], correctIndex:1 }),
  ex("h1-11","choice","Quel est le fleuve principal qui traverse le Bénin ?",{ question:"Quel fleuve important borde le Bénin à l'est ?", options:["Le Niger","Le Volta","Le Couffo","L'Ouémé"], correctIndex:3 }),
  ex("h1-12","choice","Quelle est la fête nationale du Bénin ?",{ question:"La fête nationale du Bénin est célébrée le :", options:["1er janvier","1er août","15 août","11 novembre"], correctIndex:1 }),
  ex("h1-13","choice","Quel océan borde le Bénin au sud ?",{ question:"Au sud, le Bénin est bordé par :", options:["L'océan Pacifique","L'océan Indien","L'océan Atlantique","La mer Méditerranée"], correctIndex:2 }),
  ex("h1-14","choice","Quelle langue africaine est la plus parlée au Bénin ?",{ question:"Parmi les langues africaines, laquelle est la plus répandue au Bénin ?", options:["Le yoruba","Le bariba","Le fon","Le dendi"], correctIndex:2 }),
  ex("h1-15","numpad","En quelle année a eu lieu la Conférence Nationale du Bénin ?",{ question:"La Conférence Nationale souveraine du Bénin a eu lieu en :", answer:1990, unit:"" }),
];

// ── LEVEL 2 — Royaume du Dahomey ─────────────────────────────────────────────

const H2: Exercise[] = [
  ex("h2-1","choice","Quel était le nom de l'ancien royaume qui occupait le territoire du Bénin actuel ?",{ question:"Quel ancien royaume occupait le territoire du Bénin actuel ?", options:["Royaume d'Oyo","Royaume du Dahomey","Sultanat de Sokoto","Royaume du Congo"], correctIndex:1 }),
  ex("h2-2","choice","Quelle est la capitale historique du Royaume du Dahomey ?",{ question:"Quelle était la capitale du Royaume du Dahomey ?", options:["Cotonou","Porto-Novo","Abomey","Ouidah"], correctIndex:2 }),
  ex("h2-3","numpad","En quelle année le Royaume du Dahomey a-t-il été fondé ?",{ question:"Le Royaume du Dahomey a été fondé vers l'année :", answer:1600, unit:"" }),
  ex("h2-4","choice","Quel roi du Dahomey a résisté à la colonisation française ?",{ question:"Quel roi du Dahomey a résisté héroïquement aux Français ?", options:["Ghezo","Glèlè","Béhanzin","Agadja"], correctIndex:2 }),
  ex("h2-5","choice","Comment appelait-on les guerrières d'élite du Dahomey ?",{ question:"Les célèbres femmes soldats du Dahomey s'appelaient :", options:["Les Amazones","Les Agojié","Les Mino","Toutes ces réponses"], correctIndex:3 }),
  ex("h2-6","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Ghezo",right:"A développé le commerce"},{left:"Glèlè",right:"Fils de Ghezo"},{left:"Béhanzin",right:"Résistance aux Français"},{left:"Agadja",right:"A étendu le royaume"}] }),
  ex("h2-7","choice","Quel site du Dahomey est classé au patrimoine UNESCO ?",{ question:"Quel site béninois est classé au patrimoine mondial de l'UNESCO ?", options:["Cotonou","Palais d'Abomey","Ouidah","Pendjari"], correctIndex:1 }),
  ex("h2-8","numpad","En quelle année Béhanzin a-t-il été exilé par les Français ?",{ question:"Béhanzin a été vaincu et exilé en :", answer:1894, unit:"" }),
  ex("h2-9","choice","Quel port était le principal centre de la traite des esclaves au Dahomey ?",{ question:"Quel port béninois était le plus grand centre de traite négrière ?", options:["Cotonou","Porto-Novo","Ouidah","Possotomé"], correctIndex:2 }),
  ex("h2-10","choice","Que représente la 'Route des esclaves' à Ouidah ?",{ question:"La Route des esclaves à Ouidah commémore :", options:["Une piste commerciale","Le chemin parcouru par les esclaves vers les bateaux","Un chemin de pèlerinage","Une ancienne voie royale"], correctIndex:1 }),
  ex("h2-11","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Agojié",right:"Femmes guerrières"},{left:"Abomey",right:"Capitale royale"},{left:"Ouidah",right:"Port négrier"},{left:"Dahomey",right:"Ancien nom du Bénin"}] }),
  ex("h2-12","choice","Dans quel pays africain se trouve le musée de l'esclavage le plus visité ?",{ question:"Le musée 'La Maison des esclaves' est situé dans quel pays ?", options:["Bénin","Sénégal","Ghana","Côte d'Ivoire"], correctIndex:1 }),
  ex("h2-13","choice","Que signifie le mot 'Agojié' ?",{ question:"Dans la langue fon, 'Agojié' signifie :", options:["Princesse royale","Guerrière du roi","Gardienne du palais","Femme libre"], correctIndex:1 }),
  ex("h2-14","numpad","Combien de rois ont régné sur le Dahomey environ ?",{ question:"Le Royaume du Dahomey a eu environ combien de rois ?", answer:12, unit:"rois" }),
  ex("h2-15","choice","Quelle est la période de l'apogée du Royaume du Dahomey ?",{ question:"Le Royaume du Dahomey était à son apogée au :", options:["15e siècle","17e siècle","19e siècle","20e siècle"], correctIndex:1 }),
];

// ── LEVEL 3 — Afrique et le Monde ────────────────────────────────────────────

const H3: Exercise[] = [
  ex("h3-1","choice","Quel empire africain contrôlait les routes commerciales de l'or au 10e siècle ?",{ question:"L'Empire du Ghana était célèbre pour :", options:["La production de fer","Le commerce de l'or et du sel","La traite des esclaves","La navigation maritime"], correctIndex:1 }),
  ex("h3-2","numpad","En quelle année l'Empire du Mali était-il à son apogée sous Mansa Moussa ?",{ question:"Mansa Moussa, le roi le plus riche du monde, a régné vers l'an :", answer:1324, unit:"(pèlerinage à La Mecque)" }),
  ex("h3-3","choice","Quelle était la capitale de l'Empire Songhaï ?",{ question:"L'Empire Songhaï avait pour capitale :", options:["Tombouctou","Djenné","Gao","Kumbi Saleh"], correctIndex:2 }),
  ex("h3-4","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Empire du Ghana",right:"Or et sel"},{left:"Empire du Mali",right:"Mansa Moussa"},{left:"Empire Songhaï",right:"Capitale : Gao"},{left:"Royaume du Dahomey",right:"Agojié"}] }),
  ex("h3-5","choice","Qui était Nelson Mandela ?",{ question:"Nelson Mandela est célèbre pour :", options:["Avoir fondé le Ghana","Avoir combattu l'apartheid en Afrique du Sud","Avoir unifié l'Éthiopie","Avoir découvert l'Amérique"], correctIndex:1 }),
  ex("h3-6","numpad","Combien d'années Nelson Mandela a-t-il passé en prison ?",{ question:"Nelson Mandela a été emprisonné pendant :", answer:27, unit:"années" }),
  ex("h3-7","choice","Qui était Patrice Lumumba ?",{ question:"Patrice Lumumba était :", options:["Premier président du Kenya","Premier ministre du Congo indépendant","Roi du Dahomey","Président du Ghana"], correctIndex:1 }),
  ex("h3-8","choice","Kwame Nkrumah est associé à quel pays ?",{ question:"Kwame Nkrumah, père du panafricanisme, venait de :", options:["Nigeria","Kenya","Ghana","Sénégal"], correctIndex:2 }),
  ex("h3-9","numpad","En quelle année l'Union Africaine a-t-elle été fondée ?",{ question:"L'Union Africaine a été fondée en :", answer:2002, unit:"" }),
  ex("h3-10","choice","Combien de pays membres compte l'Union Africaine ?",{ question:"L'Union Africaine réunit combien de pays membres ?", options:["48","50","53","55"], correctIndex:3 }),
  ex("h3-11","choice","Quelle est l'histoire de Tombouctou ?",{ question:"Tombouctou était célèbre au Moyen Âge pour :", options:["Ses pyramides","Ses universités et son savoir islamique","Son port maritime","Sa production d'or"], correctIndex:1 }),
  ex("h3-12","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Mandela",right:"Afrique du Sud"},{left:"Lumumba",right:"Congo"},{left:"Nkrumah",right:"Ghana"},{left:"Nyerere",right:"Tanzanie"}] }),
  ex("h3-13","choice","Quel événement historique a mis fin à la traite transatlantique des esclaves ?",{ question:"La traite transatlantique des esclaves a officiellement pris fin avec :", options:["La révolution française","L'indépendance d'Haïti","L'abolition dans les pays européens au 19e siècle","La 1ère Guerre mondiale"], correctIndex:2 }),
  ex("h3-14","numpad","En quelle année les premières indépendances africaines ont-elles eu lieu ?",{ question:"On appelle 1960 'l'année de l'Afrique'. Combien de pays africains ont obtenu leur indépendance cette année-là ?", answer:17, unit:"pays" }),
  ex("h3-15","choice","Quel pharaon égyptien est le plus célèbre ?",{ question:"Quel pharaon est le plus connu dans l'histoire de l'Égypte ancienne ?", options:["Ramsès III","Toutânkhamon","Cléopâtre","Ramsès II"], correctIndex:1 }),
];

export const HISTORY_LEVELS: Level[] = [
  { id:1, label:"Niveau 1 — Mon Bénin",          schoolYear:"", exercises:H1, passingScore:12 },
  { id:2, label:"Niveau 2 — Royaume du Dahomey",  schoolYear:"", exercises:H2, passingScore:12 },
  { id:3, label:"Niveau 3 — Afrique et le Monde", schoolYear:"", exercises:H3, passingScore:12 },
];
