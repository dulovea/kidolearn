export interface TriviaQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  fun: string; // "Le saviez-vous ?"
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // Sciences du corps
  { id:"t1",  category:"🫀 Corps humain",  question:"Combien de dents définitives a un adulte ?", options:["28","30","32","36"], correctIndex:2, fun:"Les dents de sagesse peuvent faire monter ce total à 32 !" },
  { id:"t2",  category:"🫀 Corps humain",  question:"Quel organe pompe le sang dans le corps ?", options:["Le foie","Le poumon","Le cœur","Le rein"], correctIndex:2, fun:"Le cœur bat environ 100 000 fois par jour !" },
  { id:"t3",  category:"🫀 Corps humain",  question:"Combien d'os a le corps humain adulte ?", options:["156","206","256","306"], correctIndex:1, fun:"Un bébé naît avec environ 300 os, qui fusionnent en grandissant !" },
  { id:"t4",  category:"🫀 Corps humain",  question:"Quel est le plus grand organe du corps humain ?", options:["Le foie","Le cerveau","La peau","Le poumon"], correctIndex:2, fun:"La peau représente environ 2 m² sur un adulte !" },
  { id:"t5",  category:"🫀 Corps humain",  question:"Combien de muscles compte environ le corps humain ?", options:["200","400","600","800"], correctIndex:2, fun:"Le sourire utilise moins de muscles que le froncement de sourcils !" },
  // Animaux du monde
  { id:"t6",  category:"🐘 Animaux",       question:"Quel animal est le plus grand d'Afrique ?", options:["Le rhinocéros","L'éléphant","La girafe","L'hippopotame"], correctIndex:1, fun:"Un éléphant mâle peut peser jusqu'à 6 tonnes !" },
  { id:"t7",  category:"🐘 Animaux",       question:"Quel oiseau ne peut pas voler mais court très vite ?", options:["Le faucon","L'autruche","Le perroquet","Le pélican"], correctIndex:1, fun:"L'autruche peut courir à 70 km/h, plus vite qu'un cheval !" },
  { id:"t8",  category:"🐘 Animaux",       question:"Quel animal a le plus long cou ?", options:["L'éléphant","Le chameau","La girafe","Le flamant rose"], correctIndex:2, fun:"Le cou d'une girafe peut mesurer jusqu'à 1,8 mètre !" },
  { id:"t9",  category:"🐘 Animaux",       question:"Comment appelle-t-on le petit du lion ?", options:["Un lionceau","Un louveteau","Un chaton","Un ourson"], correctIndex:0, fun:"Un lionceau devient adulte vers l'âge de 2-3 ans !" },
  { id:"t10", category:"🐘 Animaux",       question:"Quel animal est symbol de la paix ?", options:["L'aigle","Le serpent","La colombe","Le lion"], correctIndex:2, fun:"La colombe blanche est un symbole de paix depuis l'Antiquité !" },
  // Système solaire
  { id:"t11", category:"🌍 Système solaire", question:"Quelle est la planète la plus proche du Soleil ?", options:["Vénus","Mars","Mercure","Terre"], correctIndex:2, fun:"Mercure fait le tour du Soleil en seulement 88 jours !" },
  { id:"t12", category:"🌍 Système solaire", question:"Combien de planètes compte notre système solaire ?", options:["7","8","9","10"], correctIndex:1, fun:"Pluton a été déclassée en 2006, portant le nombre à 8 !" },
  { id:"t13", category:"🌍 Système solaire", question:"Quelle planète est surnommée 'la planète rouge' ?", options:["Jupiter","Saturne","Mars","Vénus"], correctIndex:2, fun:"La couleur rouge de Mars vient du fer oxydé dans son sol !" },
  { id:"t14", category:"🌍 Système solaire", question:"Quelle est la plus grande planète du système solaire ?", options:["Saturne","Neptune","Uranus","Jupiter"], correctIndex:3, fun:"Jupiter est si grande que 1 300 Terres pourraient tenir à l'intérieur !" },
  { id:"t15", category:"🌍 Système solaire", question:"Quelle planète possède les anneaux les plus visibles ?", options:["Uranus","Jupiter","Saturne","Neptune"], correctIndex:2, fun:"Les anneaux de Saturne sont surtout composés de glace !" },
  // Inventions
  { id:"t16", category:"💡 Inventions",    question:"Qui a inventé le téléphone ?", options:["Thomas Edison","Alexander Graham Bell","Nikola Tesla","James Watt"], correctIndex:1, fun:"Le premier appel téléphonique date du 10 mars 1876 !" },
  { id:"t17", category:"💡 Inventions",    question:"Qui a inventé l'ampoule électrique ?", options:["Benjamin Franklin","Alexander Graham Bell","Thomas Edison","Albert Einstein"], correctIndex:2, fun:"Edison a essayé plus de 1 000 fois avant de réussir !" },
  { id:"t18", category:"💡 Inventions",    question:"Dans quel pays a été inventé l'imprimerie moderne ?", options:["Chine (papier)","Allemagne (Gutenberg)","France","Angleterre"], correctIndex:1, fun:"La Chine avait déjà une forme d'imprimerie 400 ans avant Gutenberg !" },
  { id:"t19", category:"💡 Inventions",    question:"Qui a inventé la vaccination ?", options:["Louis Pasteur","Edward Jenner","Alexander Fleming","Marie Curie"], correctIndex:1, fun:"Jenner utilisa la variole de la vache pour protéger contre la variole humaine !" },
  // Sports
  { id:"t20", category:"⚽ Sports",         question:"Combien de joueurs y a-t-il dans une équipe de football sur le terrain ?", options:["9","10","11","12"], correctIndex:2, fun:"Le football est le sport le plus populaire au monde avec 4 milliards de fans !" },
  { id:"t21", category:"⚽ Sports",         question:"Combien de points vaut un panier à 3 points au basket ?", options:["1","2","3","4"], correctIndex:2, fun:"Les lancers francs valent 1 point au basketball !" },
  { id:"t22", category:"⚽ Sports",         question:"Quelle couleur est le maillot du Bénin en football ?", options:["Rouge","Bleu","Jaune-vert","Blanc"], correctIndex:2, fun:"Les Écureuils du Bénin sont le surnom de l'équipe nationale !" },
  { id:"t23", category:"⚽ Sports",         question:"Dans quel pays les Jeux Olympiques modernes ont-ils été créés ?", options:["France","Angleterre","Grèce","Italie"], correctIndex:2, fun:"Les premiers Jeux Olympiques modernes eurent lieu à Athènes en 1896 !" },
  // Proverbes africains
  { id:"t24", category:"🌱 Proverbes",      question:"'Un seul doigt ne peut ramasser la farine' — que signifie ce proverbe ?", options:["Il faut être propre","L'union fait la force","Il faut être patient","Il ne faut pas gaspiller"], correctIndex:1, fun:"Ce proverbe fon enseigne la valeur du travail en communauté !" },
  { id:"t25", category:"🌱 Proverbes",      question:"'La forêt serait silencieuse si aucun oiseau ne chantait...' — que signifie ce proverbe ?", options:["Protégeons les oiseaux","Chacun a son rôle","La nature est belle","Restons silencieux"], correctIndex:1, fun:"Ce proverbe africain rappelle que chaque personne est unique et précieuse !" },
  { id:"t26", category:"🌱 Proverbes",      question:"Comment dit-on 'merci' en fon (langue du Bénin) ?", options:["Akpé","Ndewo","Merci","Yawo"], correctIndex:0, fun:"'Akpé kaka' signifie 'merci beaucoup' en fon !" },
  { id:"t27", category:"🌱 Proverbes",      question:"Comment dit-on 'bonjour' en yoruba ?", options:["Bawo","Ekaro","Pele","Eku"], correctIndex:1, fun:"'Ekaro' signifie 'bonjour' le matin, 'Ekasan' l'après-midi en yoruba !" },
  // Merveilles du monde
  { id:"t28", category:"🏛️ Merveilles",    question:"Dans quel pays se trouvent les Pyramides de Gizeh ?", options:["Éthiopie","Soudan","Égypte","Libye"], correctIndex:2, fun:"La Grande Pyramide est la seule des 7 merveilles de l'Antiquité encore debout !" },
  { id:"t29", category:"🏛️ Merveilles",    question:"Dans quel pays se trouve la Grande Muraille ?", options:["Japon","Corée","Inde","Chine"], correctIndex:3, fun:"La Grande Muraille de Chine fait environ 21 000 km de long !" },
  { id:"t30", category:"🏛️ Merveilles",    question:"Dans quel pays se trouve le Machu Picchu ?", options:["Brésil","Mexique","Pérou","Bolivie"], correctIndex:2, fun:"Le Machu Picchu est une cité inca construite vers 1450 ap. J.-C. !" },
  // Nature au Bénin
  { id:"t31", category:"🌿 Nature au Bénin", question:"Quel est le plus grand parc national du Bénin ?", options:["Parc de la Pendjari","Parc du W","Lac Ahémé","Forêt de la Lama"], correctIndex:0, fun:"La Pendjari abrite des lions, éléphants et buffles !" },
  { id:"t32", category:"🌿 Nature au Bénin", question:"Quel lac est le plus grand plan d'eau intérieur du Bénin ?", options:["Lac Ahémé","Lac Toho","Lac Nokoué","Lac de Sakété"], correctIndex:2, fun:"Le lac Nokoué abrite la ville lacustre de Ganvié, 'Venise de l'Afrique' !" },
  { id:"t33", category:"🌿 Nature au Bénin", question:"Quelle est la principale culture d'exportation du Bénin ?", options:["Le maïs","Le coton","L'anacarde","Le manioc"], correctIndex:1, fun:"Le Bénin est l'un des principaux producteurs de coton en Afrique de l'Ouest !" },
  // Records du monde
  { id:"t34", category:"🏆 Records",        question:"Quel est le plus long fleuve du monde ?", options:["L'Amazone","Le Congo","Le Nil","Le Mississippi"], correctIndex:2, fun:"Le Nil mesure environ 6 650 km, traversant 11 pays africains !" },
  { id:"t35", category:"🏆 Records",        question:"Quel est le plus grand océan du monde ?", options:["L'Atlantique","L'Indien","L'Arctique","Le Pacifique"], correctIndex:3, fun:"L'océan Pacifique couvre plus d'un tiers de la surface de la Terre !" },
  { id:"t36", category:"🏆 Records",        question:"Quel est le plus haut sommet du monde ?", options:["Le Kilimandjaro","Le Mont Blanc","L'Everest","Le K2"], correctIndex:2, fun:"L'Everest culmine à 8 849 mètres d'altitude !" },
  { id:"t37", category:"🏆 Records",        question:"Quel est le plus grand désert du monde ?", options:["Le Sahara","Le Kalahari","Le Namib","L'Antarctique"], correctIndex:3, fun:"L'Antarctique est un désert de glace : le plus grand et le plus froid du monde !" },
  { id:"t38", category:"🏆 Records",        question:"Quel est l'animal terrestre le plus rapide ?", options:["Le lion","Le guépard","Le cheval","L'antilope"], correctIndex:1, fun:"Le guépard peut atteindre 112 km/h en moins de 3 secondes !" },
  // Corps humain bonus
  { id:"t39", category:"🫀 Corps humain",   question:"Combien de temps dure environ la grossesse chez l'être humain ?", options:["6 mois","9 mois","12 mois","7 mois"], correctIndex:1, fun:"9 mois, soit environ 280 jours après la dernière menstruation !" },
  { id:"t40", category:"🌍 Système solaire", question:"Combien de temps met la lumière du Soleil pour atteindre la Terre ?", options:["8 secondes","8 minutes","8 heures","8 jours"], correctIndex:1, fun:"La lumière voyage à 300 000 km/s, mais le Soleil est loin !" },
];

/** Retourne 10 questions aléatoires sans répétition pour la journée */
export function getDailyQuestions(date: string): TriviaQuestion[] {
  // Use date as seed for deterministic but varied daily set
  const seed = date.split("-").reduce((acc, n) => acc + parseInt(n), 0);
  const shuffled = [...TRIVIA_QUESTIONS].sort((a, b) => {
    const ha = simpleHash(a.id + seed);
    const hb = simpleHash(b.id + seed);
    return ha - hb;
  });
  return shuffled.slice(0, 10);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (const c of String(str)) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return hash;
}
