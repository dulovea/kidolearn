import type { Level, Exercise } from "@/types/exercise";

const ex = (id: string, type: Exercise["type"], ttsText: string, data: Exercise["data"]): Exercise =>
  ({ id, type, ttsText, data });

// ── LEVEL 1 — Pays voisins du Bénin + CEDEAO (16 pays) ───────────────────────

const G1: Exercise[] = [
  ex("g1-1","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Bénin ?", options:["Lagos","Porto-Novo","Accra","Lomé"], correctIndex:1 }),
  ex("g1-2","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Togo ?", options:["Cotonou","Niamey","Lomé","Conakry"], correctIndex:2 }),
  ex("g1-3","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Ghana ?", options:["Accra","Abuja","Lagos","Yamoussoukro"], correctIndex:0 }),
  ex("g1-4","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Nigeria",right:"Abuja"},{left:"Togo",right:"Lomé"},{left:"Ghana",right:"Accra"},{left:"Niger",right:"Niamey"}] }),
  ex("g1-5","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Nigeria ?", options:["Lagos","Ibadan","Abuja","Port Harcourt"], correctIndex:2 }),
  ex("g1-6","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Sénégal ?", options:["Dakar","Conakry","Banjul","Bissau"], correctIndex:0 }),
  ex("g1-7","choice","Quelle est la capitale de la Côte d'Ivoire ?",{ question:"Quelle est la capitale officielle de la Côte d'Ivoire ?", options:["Abidjan","Yamoussoukro","Bouaké","San-Pédro"], correctIndex:1 }),
  ex("g1-8","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Sénégal",right:"Dakar"},{left:"Côte d'Ivoire",right:"Yamoussoukro"},{left:"Mali",right:"Bamako"},{left:"Burkina Faso",right:"Ouagadougou"}] }),
  ex("g1-9","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Mali ?", options:["Niamey","Bamako","Conakry","Ouagadougou"], correctIndex:1 }),
  ex("g1-10","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Burkina Faso ?", options:["Bamako","Lomé","Ouagadougou","Accra"], correctIndex:2 }),
  ex("g1-11","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale de la Guinée ?", options:["Dakar","Conakry","Bissau","Monrovia"], correctIndex:1 }),
  ex("g1-12","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Guinée-Bissau",right:"Bissau"},{left:"Sierra Leone",right:"Freetown"},{left:"Libéria",right:"Monrovia"},{left:"Cap-Vert",right:"Praia"}] }),
  ex("g1-13","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale de la Gambie ?", options:["Banjul","Bissau","Freetown","Dakar"], correctIndex:0 }),
  ex("g1-14","choice","À quel pays appartient cette capitale ?",{ question:"Quelle est la capitale du Niger ?", options:["Bamako","Ouagadougou","Niamey","N'Djaména"], correctIndex:2 }),
  ex("g1-15","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Guinée",right:"Conakry"},{left:"Niger",right:"Niamey"},{left:"Gambie",right:"Banjul"},{left:"Bénin",right:"Porto-Novo"}] }),
  ex("g1-16","choice","Combien de pays compose la CEDEAO ?",{ question:"La CEDEAO compte combien de pays membres ?", options:["12","14","15","16"], correctIndex:2 }),
];

// ── LEVEL 2 — 54 pays africains et leurs capitales ───────────────────────────

const G2: Exercise[] = [
  ex("g2-1","choice","Quelle est la capitale de l'Égypte ?",{ question:"Quelle est la capitale de l'Égypte ?", options:["Alexandrie","Le Caire","Louxor","Assouan"], correctIndex:1 }),
  ex("g2-2","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Cameroun",right:"Yaoundé"},{left:"Congo",right:"Brazzaville"},{left:"RDC",right:"Kinshasa"},{left:"Gabon",right:"Libreville"}] }),
  ex("g2-3","choice","Quelle est la capitale de l'Éthiopie ?",{ question:"Quelle est la capitale de l'Éthiopie ?", options:["Nairobi","Addis-Abeba","Khartoum","Djibouti"], correctIndex:1 }),
  ex("g2-4","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Kenya",right:"Nairobi"},{left:"Tanzanie",right:"Dodoma"},{left:"Ouganda",right:"Kampala"},{left:"Rwanda",right:"Kigali"}] }),
  ex("g2-5","choice","Quelle est la capitale de l'Afrique du Sud ?",{ question:"Quelle est la capitale administrative de l'Afrique du Sud ?", options:["Johannesburg","Le Cap","Durban","Pretoria"], correctIndex:3 }),
  ex("g2-6","choice","Quelle est la capitale de l'Angola ?",{ question:"Quelle est la capitale de l'Angola ?", options:["Luanda","Lusaka","Maputo","Harare"], correctIndex:0 }),
  ex("g2-7","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Maroc",right:"Rabat"},{left:"Algérie",right:"Alger"},{left:"Tunisie",right:"Tunis"},{left:"Libye",right:"Tripoli"}] }),
  ex("g2-8","choice","Quelle est la capitale du Mozambique ?",{ question:"Quelle est la capitale du Mozambique ?", options:["Harare","Lusaka","Maputo","Antananarivo"], correctIndex:2 }),
  ex("g2-9","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Zambie",right:"Lusaka"},{left:"Zimbabwe",right:"Harare"},{left:"Malawi",right:"Lilongwe"},{left:"Botswana",right:"Gaborone"}] }),
  ex("g2-10","choice","Quelle est la capitale du Soudan ?",{ question:"Quelle est la capitale du Soudan ?", options:["Addis-Abeba","Khartoum","Djibouti","Asmara"], correctIndex:1 }),
  ex("g2-11","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Somalie",right:"Mogadiscio"},{left:"Érythrée",right:"Asmara"},{left:"Djibouti",right:"Djibouti"},{left:"Burundi",right:"Gitega"}] }),
  ex("g2-12","choice","Quelle est la capitale de Madagascar ?",{ question:"Quelle est la capitale de Madagascar ?", options:["Moroni","Antananarivo","Port-Louis","Victoria"], correctIndex:1 }),
  ex("g2-13","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Tchad",right:"N'Djaména"},{left:"Rép. Centrafricaine",right:"Bangui"},{left:"Cameroun",right:"Yaoundé"},{left:"Guinée Équatoriale",right:"Malabo"}] }),
  ex("g2-14","choice","Quelle est la capitale du Ghana ?",{ question:"Quelle est la capitale du Ghana ?", options:["Kumasi","Accra","Takoradi","Tamale"], correctIndex:1 }),
  ex("g2-15","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Namibie",right:"Windhoek"},{left:"Eswatini",right:"Mbabane"},{left:"Lesotho",right:"Maseru"},{left:"Comores",right:"Moroni"}] }),
  ex("g2-16","choice","Quelle est la capitale du Sénégal ?",{ question:"Quelle est la capitale du Sénégal ?", options:["Thiès","Saint-Louis","Dakar","Ziguinchor"], correctIndex:2 }),
  ex("g2-17","choice","L'Afrique compte combien de pays ?",{ question:"Le continent africain compte combien de pays reconnus ?", options:["50","52","54","56"], correctIndex:2 }),
  ex("g2-18","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Sao Tomé",right:"São Tomé"},{left:"Cap-Vert",right:"Praia"},{left:"Maurice",right:"Port-Louis"},{left:"Seychelles",right:"Victoria"}] }),
];

// ── LEVEL 3 — Capitales du monde entier ──────────────────────────────────────

const G3: Exercise[] = [
  ex("g3-1","choice","Quelle est la capitale de la France ?",{ question:"Quelle est la capitale de la France ?", options:["Lyon","Marseille","Paris","Bordeaux"], correctIndex:2 }),
  ex("g3-2","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Allemagne",right:"Berlin"},{left:"Italie",right:"Rome"},{left:"Espagne",right:"Madrid"},{left:"Portugal",right:"Lisbonne"}] }),
  ex("g3-3","choice","Quelle est la capitale du Brésil ?",{ question:"Quelle est la capitale du Brésil ?", options:["Rio de Janeiro","São Paulo","Salvador","Brasília"], correctIndex:3 }),
  ex("g3-4","match","Relie chaque élément à sa paire !",{ pairs:[{left:"USA",right:"Washington D.C."},{left:"Canada",right:"Ottawa"},{left:"Mexique",right:"Mexico"},{left:"Argentine",right:"Buenos Aires"}] }),
  ex("g3-5","choice","Quelle est la capitale de la Chine ?",{ question:"Quelle est la capitale de la Chine ?", options:["Shanghai","Hong Kong","Pékin","Tianjin"], correctIndex:2 }),
  ex("g3-6","choice","Quelle est la capitale du Japon ?",{ question:"Quelle est la capitale du Japon ?", options:["Osaka","Kyoto","Hiroshima","Tokyo"], correctIndex:3 }),
  ex("g3-7","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Inde",right:"New Delhi"},{left:"Russie",right:"Moscou"},{left:"Australie",right:"Canberra"},{left:"Brésil",right:"Brasília"}] }),
  ex("g3-8","choice","Quelle est la capitale du Royaume-Uni ?",{ question:"Quelle est la capitale du Royaume-Uni ?", options:["Manchester","Édimbourg","Birmingham","Londres"], correctIndex:3 }),
  ex("g3-9","choice","Quelle est la capitale de l'Arabie Saoudite ?",{ question:"Quelle est la capitale de l'Arabie Saoudite ?", options:["Djeddah","Médine","Riyad","La Mecque"], correctIndex:2 }),
  ex("g3-10","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Turquie",right:"Ankara"},{left:"Iran",right:"Téhéran"},{left:"Irak",right:"Bagdad"},{left:"Égypte",right:"Le Caire"}] }),
  ex("g3-11","choice","Quelle est la capitale de l'Indonésie ?",{ question:"Quelle est la capitale de l'Indonésie ?", options:["Bali","Surabaya","Bandung","Jakarta"], correctIndex:3 }),
  ex("g3-12","choice","Quelle est la capitale de l'Argentine ?",{ question:"Quelle est la capitale de l'Argentine ?", options:["Buenos Aires","Santiago","Lima","Montevideo"], correctIndex:0 }),
  ex("g3-13","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Pérou",right:"Lima"},{left:"Chili",right:"Santiago"},{left:"Colombie",right:"Bogotá"},{left:"Venezuela",right:"Caracas"}] }),
  ex("g3-14","choice","Quelle est la capitale de la Corée du Sud ?",{ question:"Quelle est la capitale de la Corée du Sud ?", options:["Pyongyang","Busan","Séoul","Incheon"], correctIndex:2 }),
  ex("g3-15","choice","Quelle est la capitale de la Suisse ?",{ question:"Quelle est la capitale de la Suisse ?", options:["Genève","Zürich","Lausanne","Berne"], correctIndex:3 }),
  ex("g3-16","match","Relie chaque élément à sa paire !",{ pairs:[{left:"Suède",right:"Stockholm"},{left:"Norvège",right:"Oslo"},{left:"Danemark",right:"Copenhague"},{left:"Finlande",right:"Helsinki"}] }),
];

export const GEOGRAPHY_LEVELS: Level[] = [
  { id:1, label:"Niveau 1 — CEDEAO",   schoolYear:"", exercises:G1, passingScore:13 },
  { id:2, label:"Niveau 2 — Afrique",  schoolYear:"", exercises:G2, passingScore:14 },
  { id:3, label:"Niveau 3 — Le Monde", schoolYear:"", exercises:G3, passingScore:13 },
];
