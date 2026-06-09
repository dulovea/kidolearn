import type { Level, Exercise } from "@/types/exercise";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ex = (id: string, type: Exercise["type"], ttsText: string, data: Exercise["data"]): Exercise =>
  ({ id, type, ttsText, data });

// ── LEVEL 1 — CI (5-6 ans) : Nombres 1-10, comptage, formes ──────────────────

const L1: Exercise[] = [
  ex("l1-1","count","Combien y a-t-il d'objets ?",{ items:["🥭","🥭","🥭"], answer:3, label:"mangues" }),
  ex("l1-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["⭐","🌙","⭐","🌙","⭐",null], answer:"🌙", options:["🌙","⭐","☀️","🌟"] }),
  ex("l1-3","choice","Quel chiffre vois-tu ?",{ question:"Montre le chiffre CINQ", visual:"5️⃣", options:["3","5","7","9"], correctIndex:1 }),
  ex("l1-4","count","Combien y a-t-il d'objets ?",{ items:["🍌","🍌","🍌","🍌","🍌","🍌","🍌"], answer:7, label:"bananes" }),
  ex("l1-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🐘"},{id:"b",emoji:"🦁"},{id:"c",emoji:"🐸"},{id:"d",emoji:"🦊"}] }),
  ex("l1-6","choice","Quel chiffre est le plus grand ?",{ question:"Lequel est le plus grand ?", options:["2","8","4","6"], correctIndex:1 }),
  ex("l1-7","count","Combien y a-t-il d'objets ?",{ items:["🌺","🌺","🌺","🌺"], answer:4, label:"fleurs" }),
  ex("l1-8","sequence","Qu'est-ce qui vient ensuite ?",{ items:["1️⃣","2️⃣","3️⃣","4️⃣",null,"6️⃣"], missingIndex:4, answer:"5️⃣", options:["5️⃣","7️⃣","8️⃣","0️⃣"] }),
  ex("l1-9","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Animaux","Fruits"], items:[{label:"🦁",category:"Animaux"},{label:"🥭",category:"Fruits"},{label:"🐘",category:"Animaux"},{label:"🍌",category:"Fruits"},{label:"🐸",category:"Animaux"},{label:"🍍",category:"Fruits"}] }),
  ex("l1-10","choice","Combien font 2 + 1 ?",{ question:"2 + 1 = ?", options:["2","3","4","5"], correctIndex:1 }),
  ex("l1-11","count","Combien y a-t-il d'objets ?",{ items:["⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐"], answer:10, label:"étoiles" }),
  ex("l1-12","order","Mets ces éléments dans le bon ordre !",{ items:["3","1","5","2","4"], values:[3,1,5,2,4], direction:"asc", label:"ordre croissant" }),
  ex("l1-13","choice","Combien font 3 + 2 ?",{ question:"3 + 2 = ?", options:["4","5","6","7"], correctIndex:1 }),
  ex("l1-14","symmetry","Complète la figure symétrique !",{ shape:[[1,0],[1,1],[1,0]], options:[[[0,1],[1,1],[0,1]],[[1,1],[0,1],[1,1]],[[0,0],[1,1],[0,0]]], correctIndex:0 }),
  ex("l1-15","count","Combien y a-t-il d'objets ?",{ items:["🐔","🐔","🐔","🐔","🐔","🐔"], answer:6, label:"poulets" }),
  ex("l1-16","choice","Quel nombre vient avant 5 ?",{ question:"__ vient avant 5", options:["3","4","6","7"], correctIndex:1 }),
  ex("l1-17","grid-find","Trouve les éléments identiques !",{ grid:[["🥭","🍌","🥭"],["🍌","🥭","🍌"],["🥭","🍌","🥭"]], target:"🥭", correctCount:5 }),
  ex("l1-18","choice","Combien font 4 + 4 ?",{ question:"4 + 4 = ?", options:["6","7","8","9"], correctIndex:2 }),
  ex("l1-19","compare","Quel est le plus grand ?",{ a:{label:"5 papayes",value:5}, b:{label:"3 papayes",value:3}, question:"bigger", options:["5 papayes","3 papayes"], correctIndex:0 }),
  ex("l1-20","choice","Combien font 5 + 5 ?",{ question:"5 + 5 = ?", options:["8","9","10","11"], correctIndex:2 }),
];

// ── LEVEL 2 — CI/CP (6 ans) : Nombres 1-20, additions ≤10 ───────────────────

const L2: Exercise[] = [
  ex("l2-1","numpad","Calcule : 6 + 3",{ question:"6 + 3 = ?", answer:9, unit:"" }),
  ex("l2-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["🔴","🔵","🔴","🔵",null], answer:"🔴", options:["🔴","🔵","🟡","🟢"] }),
  ex("l2-3","numpad","Calcule : 8 + 5",{ question:"8 + 5 = ?", answer:13, unit:"" }),
  ex("l2-4","count","Combien y a-t-il d'objets ?",{ items:Array(12).fill("🌰"), answer:12, label:"noix" }),
  ex("l2-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🦒"},{id:"b",emoji:"🐊"},{id:"c",emoji:"🦏"},{id:"d",emoji:"🦓"}] }),
  ex("l2-6","numpad","Combien font 7 + 6 ?",{ question:"7 + 6 = ?", answer:13, unit:"" }),
  ex("l2-7","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:15, b:9, answer:">" }),
  ex("l2-8","numpad","Kofi a 9 mangues, il en donne 3. Combien reste-t-il ?",{ question:"9 − 3 = ?", answer:6, unit:"mangues" }),
  ex("l2-9","sequence","Qu'est-ce qui vient ensuite ?",{ items:["10","12","14","16",null], missingIndex:4, answer:"18", options:["17","18","19","20"] }),
  ex("l2-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Pair","Impair"], items:[{label:"2",category:"Pair"},{label:"3",category:"Impair"},{label:"4",category:"Pair"},{label:"7",category:"Impair"},{label:"8",category:"Pair"},{label:"9",category:"Impair"}] }),
  ex("l2-11","numpad","Calcule : 10 + 8",{ question:"10 + 8 = ?", answer:18, unit:"" }),
  ex("l2-12","order","Mets ces éléments dans le bon ordre !",{ items:["15","8","20","3","11"], values:[15,8,20,3,11], direction:"asc", label:"ordre croissant" }),
  ex("l2-13","numpad","Ama a 14 ignames. Elle en reçoit 5 de plus. Combien en a-t-elle ?",{ question:"14 + 5 = ?", answer:19, unit:"ignames" }),
  ex("l2-14","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:11, b:17, answer:"<" }),
  ex("l2-15","choice","Quel nombre est entre 13 et 15 ?",{ question:"__ est entre 13 et 15", options:["12","14","16","17"], correctIndex:1 }),
  ex("l2-16","numpad","Calcule : 20 − 7",{ question:"20 − 7 = ?", answer:13, unit:"" }),
  ex("l2-17","maze","Trouve le bon chemin !",{ description:"Le poulet veut rejoindre le grain de maïs", paths:["→→↑","↑→↑","→↑→","↓→↑"], correctIndex:2, emoji:{start:"🐔",end:"🌽"} }),
  ex("l2-18","numpad","Fatou a 11 F CFA, Kofi en a 7. Combien ont-ils ensemble ?",{ question:"11 + 7 = ?", answer:18, unit:"FCFA" }),
  ex("l2-19","compare","Quel est le plus grand ?",{ a:{label:"12 noix",value:12}, b:{label:"17 noix",value:17}, question:"bigger", options:["12 noix","17 noix"], correctIndex:1 }),
  ex("l2-20","numpad","Calcule : 18 − 9",{ question:"18 − 9 = ?", answer:9, unit:"" }),
];

// ── LEVEL 3 — CP (6-7 ans) : Additions/soustractions ≤ 20 ──────────────────

const L3: Exercise[] = [
  ex("l3-1","numpad","Calcule : 13 + 8",{ question:"13 + 8 = ?", answer:21, unit:"" }),
  ex("l3-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["🟥","🟥","🟦","🟥","🟥","🟦","🟥","🟥",null], answer:"🟦", options:["🟦","🟥","🟩","🟨"] }),
  ex("l3-3","numpad","Calcule : 25 − 9",{ question:"25 − 9 = ?", answer:16, unit:"" }),
  ex("l3-4","count","Combien y a-t-il d'objets ?",{ items:Array(18).fill("🥜"), answer:18, label:"arachides" }),
  ex("l3-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🌴"},{id:"b",emoji:"🌵"},{id:"c",emoji:"🎋"},{id:"d",emoji:"🌿"},{id:"e",emoji:"🍀"}] }),
  ex("l3-6","numpad","Kofi a 30 FCFA, il dépense 12 FCFA. Combien reste-t-il ?",{ question:"30 − 12 = ?", answer:18, unit:"FCFA" }),
  ex("l3-7","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:25, b:25, answer:"=" }),
  ex("l3-8","numpad","Calcule : 14 + 19",{ question:"14 + 19 = ?", answer:33, unit:"" }),
  ex("l3-9","sequence","Qu'est-ce qui vient ensuite ?",{ items:["5","10","15","20",null], missingIndex:4, answer:"25", options:["22","25","24","30"] }),
  ex("l3-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["< 20","≥ 20"], items:[{label:"15",category:"< 20"},{label:"22",category:"≥ 20"},{label:"8",category:"< 20"},{label:"20",category:"≥ 20"},{label:"19",category:"< 20"},{label:"31",category:"≥ 20"}] }),
  ex("l3-11","numpad","Calcule : 40 − 15",{ question:"40 − 15 = ?", answer:25, unit:"" }),
  ex("l3-12","numpad","Ama achète une mangue à 25 FCFA et une papaye à 15 FCFA. Combien dépense-t-elle ?",{ question:"25 + 15 = ?", answer:40, unit:"FCFA" }),
  ex("l3-13","order","Mets ces éléments dans le bon ordre !",{ items:["27","13","35","5","19"], values:[27,13,35,5,19], direction:"asc", label:"ordre croissant" }),
  ex("l3-14","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:33, b:30, answer:">" }),
  ex("l3-15","numpad","Calcule : 28 + 17",{ question:"28 + 17 = ?", answer:45, unit:"" }),
  ex("l3-16","grid-find","Trouve les éléments identiques !",{ grid:[["🌻","🌺","🌻","🌹"],["🌺","🌻","🌹","🌻"],["🌹","🌺","🌻","🌺"],["🌻","🌹","🌺","🌻"]], target:"🌻", correctCount:7 }),
  ex("l3-17","numpad","Calcule : 50 − 23",{ question:"50 − 23 = ?", answer:27, unit:"" }),
  ex("l3-18","maze","Trouve le bon chemin !",{ description:"La gazelle veut atteindre le point d'eau", paths:["↑→↑→","→↑→↑","↑↑→→","→→↑↑"], correctIndex:2, emoji:{start:"🦌",end:"💧"} }),
  ex("l3-19","numpad","Fatou a 60 FCFA. Elle achète un fruit à 35 FCFA. Combien lui reste-t-il ?",{ question:"60 − 35 = ?", answer:25, unit:"FCFA" }),
  ex("l3-20","numpad","Calcule : 37 + 26",{ question:"37 + 26 = ?", answer:63, unit:"" }),
];

// ── LEVEL 4 — CP/CE1 (7 ans) : Additions/soustractions ≤ 100 ────────────────

const L4: Exercise[] = [
  ex("l4-1","numpad","Calcule : 47 + 35",{ question:"47 + 35 = ?", answer:82, unit:"" }),
  ex("l4-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["🔺","🔺","🔷","🔺","🔺","🔷","🔺","🔺",null], answer:"🔷", options:["🔷","🔺","🔸","🔹"] }),
  ex("l4-3","numpad","Calcule : 93 − 28",{ question:"93 − 28 = ?", answer:65, unit:"" }),
  ex("l4-4","clock","Quelle heure est-il ?",{ hours:3, minutes:0, options:["2h00","3h00","4h00","3h30"], answer:"3h00" }),
  ex("l4-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🏠"},{id:"b",emoji:"🏫"},{id:"c",emoji:"🏥"},{id:"d",emoji:"⛺"},{id:"e",emoji:"🏛️"}] }),
  ex("l4-6","numpad","Kofi a 75 FCFA, Fatou en a 48. Combien ont-ils ensemble ?",{ question:"75 + 48 = ?", answer:123, unit:"FCFA" }),
  ex("l4-7","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:67, b:76, answer:"<" }),
  ex("l4-8","numpad","Un marché vend 100 ignames. 37 sont vendues. Combien reste-t-il ?",{ question:"100 − 37 = ?", answer:63, unit:"ignames" }),
  ex("l4-9","sequence","Qu'est-ce qui vient ensuite ?",{ items:["10","20","30","40",null], missingIndex:4, answer:"50", options:["45","50","55","60"] }),
  ex("l4-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["< 50","≥ 50"], items:[{label:"49",category:"< 50"},{label:"51",category:"≥ 50"},{label:"23",category:"< 50"},{label:"100",category:"≥ 50"},{label:"1",category:"< 50"},{label:"50",category:"≥ 50"}] }),
  ex("l4-11","numpad","Calcule : 56 + 38",{ question:"56 + 38 = ?", answer:94, unit:"" }),
  ex("l4-12","numpad","Ama a économisé 85 FCFA. Elle dépense 47 FCFA. Combien lui reste-t-il ?",{ question:"85 − 47 = ?", answer:38, unit:"FCFA" }),
  ex("l4-13","clock","Quelle heure est-il ?",{ hours:8, minutes:30, options:["7h30","8h00","8h30","9h30"], answer:"8h30" }),
  ex("l4-14","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:100, b:99, answer:">" }),
  ex("l4-15","numpad","Calcule : 72 − 45",{ question:"72 − 45 = ?", answer:27, unit:"" }),
  ex("l4-16","maze","Trouve le bon chemin !",{ description:"Le pêcheur veut rejoindre son pirogue", paths:["→→↓→","→↓→↓","↓→↓→","↓↓→→"], correctIndex:3, emoji:{start:"👨‍🦱",end:"🚣"} }),
  ex("l4-17","numpad","Calcule : 64 + 29",{ question:"64 + 29 = ?", answer:93, unit:"" }),
  ex("l4-18","symmetry","Complète la figure symétrique !",{ shape:[[1,1,0],[0,1,0],[1,1,0]], options:[[[0,1,1],[0,1,0],[0,1,1]],[[1,0,0],[0,1,0],[1,0,0]],[[0,0,1],[0,1,0],[0,0,1]]], correctIndex:0 }),
  ex("l4-19","numpad","Une classe a 35 élèves. 12 sont absents. Combien sont présents ?",{ question:"35 − 12 = ?", answer:23, unit:"élèves" }),
  ex("l4-20","numpad","Calcule : 88 + 12",{ question:"88 + 12 = ?", answer:100, unit:"" }),
];

// ── LEVEL 5 — CE1 (7-8 ans) : Tables de multiplication 1-5 ──────────────────

const L5: Exercise[] = [
  ex("l5-1","numpad","Calcule : 3 × 4",{ question:"3 × 4 = ?", answer:12, unit:"" }),
  ex("l5-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["3","6","9","12",null], answer:"15", options:["13","14","15","16"] }),
  ex("l5-3","numpad","Calcule : 5 × 7",{ question:"5 × 7 = ?", answer:35, unit:"" }),
  ex("l5-4","clock","Quelle heure est-il ?",{ hours:6, minutes:15, options:["6h15","6h45","5h15","7h15"], answer:"6h15" }),
  ex("l5-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🎯"},{id:"b",emoji:"🎲"},{id:"c",emoji:"🎮"},{id:"d",emoji:"🎪"},{id:"e",emoji:"🎭"},{id:"f",emoji:"🎨"}] }),
  ex("l5-6","numpad","Fatou achète 4 mangues à 5 FCFA chacune. Combien paie-t-elle ?",{ question:"4 × 5 = ?", answer:20, unit:"FCFA" }),
  ex("l5-7","numpad","Calcule : 2 × 9",{ question:"2 × 9 = ?", answer:18, unit:"" }),
  ex("l5-8","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:15, b:3*5, answer:"=" }),
  ex("l5-9","sequence","Qu'est-ce qui vient ensuite ?",{ items:["4","8","12","16",null], missingIndex:4, answer:"20", options:["18","19","20","24"] }),
  ex("l5-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Table de 2","Table de 5"], items:[{label:"10",category:"Table de 2"},{label:"15",category:"Table de 5"},{label:"6",category:"Table de 2"},{label:"25",category:"Table de 5"},{label:"14",category:"Table de 2"},{label:"30",category:"Table de 5"}] }),
  ex("l5-11","numpad","Calcule : 4 × 4",{ question:"4 × 4 = ?", answer:16, unit:"" }),
  ex("l5-12","numpad","Kofi a 3 sacs de 7 oranges. Combien d'oranges en tout ?",{ question:"3 × 7 = ?", answer:21, unit:"oranges" }),
  ex("l5-13","numpad","Calcule : 5 × 9",{ question:"5 × 9 = ?", answer:45, unit:"" }),
  ex("l5-14","grid-find","Trouve les éléments identiques !",{ grid:[["2","4","6","8"],["3","6","9","12"],["4","8","12","16"],["5","10","15","20"]], target:"12", correctCount:3 }),
  ex("l5-15","numpad","Un fermier a 5 champs de 8 rangées chacun. Combien de rangées en tout ?",{ question:"5 × 8 = ?", answer:40, unit:"rangées" }),
  ex("l5-16","maze","Trouve le bon chemin !",{ description:"L'enfant veut rejoindre l'école", paths:["↑↑→↑","→↑↑→","↑→↑↑","↑↑↑→"], correctIndex:0, emoji:{start:"👦",end:"🏫"} }),
  ex("l5-17","numpad","Calcule : 3 × 6",{ question:"3 × 6 = ?", answer:18, unit:"" }),
  ex("l5-18","numpad","Ama distribue 5 bonbons à chacun de ses 4 amis. Combien de bonbons distribue-t-elle ?",{ question:"5 × 4 = ?", answer:20, unit:"bonbons" }),
  ex("l5-19","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:4*5, b:5*4, answer:"=" }),
  ex("l5-20","numpad","Calcule : 5 × 5",{ question:"5 × 5 = ?", answer:25, unit:"" }),
];

// ── LEVEL 6 — CE1/CE2 (8 ans) : Tables 6-10, divisions simples ───────────────

const L6: Exercise[] = [
  ex("l6-1","numpad","Calcule : 6 × 7",{ question:"6 × 7 = ?", answer:42, unit:"" }),
  ex("l6-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["7","14","21","28",null], answer:"35", options:["32","33","35","36"] }),
  ex("l6-3","numpad","Calcule : 8 × 9",{ question:"8 × 9 = ?", answer:72, unit:"" }),
  ex("l6-4","numpad","Calcule : 48 ÷ 6",{ question:"48 ÷ 6 = ?", answer:8, unit:"" }),
  ex("l6-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🦅"},{id:"b",emoji:"🦜"},{id:"c",emoji:"🦩"},{id:"d",emoji:"🦚"},{id:"e",emoji:"🦋"},{id:"f",emoji:"🐝"}] }),
  ex("l6-6","numpad","24 ignames partagées entre 8 enfants. Chacun en reçoit combien ?",{ question:"24 ÷ 8 = ?", answer:3, unit:"ignames" }),
  ex("l6-7","numpad","Calcule : 7 × 8",{ question:"7 × 8 = ?", answer:56, unit:"" }),
  ex("l6-8","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:6*9, b:9*6, answer:"=" }),
  ex("l6-9","numpad","Calcule : 63 ÷ 9",{ question:"63 ÷ 9 = ?", answer:7, unit:"" }),
  ex("l6-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Multiple de 6","Multiple de 9"], items:[{label:"18",category:"Multiple de 6"},{label:"27",category:"Multiple de 9"},{label:"42",category:"Multiple de 6"},{label:"45",category:"Multiple de 9"},{label:"54",category:"Multiple de 6"},{label:"72",category:"Multiple de 9"}] }),
  ex("l6-11","numpad","Calcule : 9 × 9",{ question:"9 × 9 = ?", answer:81, unit:"" }),
  ex("l6-12","numpad","Kofi emballe 56 oranges dans des boîtes de 7. Combien de boîtes ?",{ question:"56 ÷ 7 = ?", answer:8, unit:"boîtes" }),
  ex("l6-13","clock","Quelle heure est-il ?",{ hours:10, minutes:45, options:["10h15","10h45","11h45","9h45"], answer:"10h45" }),
  ex("l6-14","numpad","Calcule : 6 × 8",{ question:"6 × 8 = ?", answer:48, unit:"" }),
  ex("l6-15","numpad","72 élèves en 8 groupes égaux. Combien par groupe ?",{ question:"72 ÷ 8 = ?", answer:9, unit:"élèves" }),
  ex("l6-16","maze","Trouve le bon chemin !",{ description:"Le piroguier veut traverser le fleuve", paths:["→→→↑","→→↑→","↑→→→","→↑→→"], correctIndex:1, emoji:{start:"🚣",end:"🏖️"} }),
  ex("l6-17","numpad","Calcule : 10 × 10",{ question:"10 × 10 = ?", answer:100, unit:"" }),
  ex("l6-18","numpad","Ama a 90 FCFA. Elle achète 9 bananes au même prix. Quel est le prix d'une banane ?",{ question:"90 ÷ 9 = ?", answer:10, unit:"FCFA" }),
  ex("l6-19","symmetry","Complète la figure symétrique !",{ shape:[[0,1,1],[1,1,0],[0,1,1]], options:[[[1,1,0],[0,1,1],[1,1,0]],[[0,0,1],[1,0,0],[0,0,1]],[[1,0,0],[0,0,1],[1,0,0]]], correctIndex:0 }),
  ex("l6-20","numpad","Calcule : 100 ÷ 10",{ question:"100 ÷ 10 = ?", answer:10, unit:"" }),
];

// ── LEVEL 7 — CE2 (8-9 ans) : Fractions simples, mesures ────────────────────

const L7: Exercise[] = [
  ex("l7-1","fraction","Quelle fraction est coloriée ?",{ numerator:1, denominator:2, coloredCount:1, options:["1/4","1/3","1/2","2/3"], answer:"1/2" }),
  ex("l7-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["1/4","2/4","3/4",null], answer:"4/4", options:["3/4","4/4","5/4","1/4"] }),
  ex("l7-3","numpad","Calcule : 125 + 237",{ question:"125 + 237 = ?", answer:362, unit:"" }),
  ex("l7-4","clock","Quelle heure est-il ?",{ hours:7, minutes:20, options:["7h20","7h40","6h20","8h20"], answer:"7h20" }),
  ex("l7-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"📏"},{id:"b",emoji:"📐"},{id:"c",emoji:"⚖️"},{id:"d",emoji:"🧭"},{id:"e",emoji:"🔭"},{id:"f",emoji:"🔬"}] }),
  ex("l7-6","fraction","Quelle fraction est coloriée ?",{ numerator:3, denominator:4, coloredCount:3, options:["1/4","2/4","3/4","4/4"], answer:"3/4" }),
  ex("l7-7","numpad","Une corde mesure 3 mètres. On en coupe la moitié. Combien reste-t-il ?",{ question:"3 ÷ 2 = ?", answer:1, unit:"m et demi", hint:"1,5 m — arrondir à 1" }),
  ex("l7-8","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:250, b:205, answer:">" }),
  ex("l7-9","numpad","Un bidon contient 10 litres. On en verse 3/10. Combien de litres verse-t-on ?",{ question:"10 × 3 ÷ 10 = ?", answer:3, unit:"litres" }),
  ex("l7-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["< 1/2","= ou > 1/2"], items:[{label:"1/4",category:"< 1/2"},{label:"3/4",category:"= ou > 1/2"},{label:"1/3",category:"< 1/2"},{label:"2/3",category:"= ou > 1/2"},{label:"2/5",category:"< 1/2"},{label:"1/2",category:"= ou > 1/2"}] }),
  ex("l7-11","numpad","Calcule : 480 − 135",{ question:"480 − 135 = ?", answer:345, unit:"" }),
  ex("l7-12","fraction","Quelle fraction est coloriée ?",{ numerator:1, denominator:4, coloredCount:1, options:["1/2","1/4","1/3","3/4"], answer:"1/4" }),
  ex("l7-13","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"Lun",value:4},{label:"Mar",value:7},{label:"Mer",value:2},{label:"Jeu",value:6},{label:"Ven",value:5}], question:"Quel jour Kofi a-t-il lu le plus de pages ?", options:["Lundi","Mardi","Jeudi","Vendredi"], answer:"Mardi" }),
  ex("l7-14","numpad","Calcule : 200 × 4",{ question:"200 × 4 = ?", answer:800, unit:"" }),
  ex("l7-15","numpad","Ama coupe une tarte en 8 parts. Elle en mange 3. Quelle fraction reste-t-il ?",{ question:"8 − 3 = ? parts sur 8", answer:5, unit:"/8 de la tarte" }),
  ex("l7-16","maze","Trouve le bon chemin !",{ description:"La maman veut atteindre le puits", paths:["↑↑→→↓","→→↑↑↓","↑→↑→↓","→↑→↑→"], correctIndex:3, emoji:{start:"👩",end:"⛲"} }),
  ex("l7-17","numpad","Calcule : 750 ÷ 5",{ question:"750 ÷ 5 = ?", answer:150, unit:"" }),
  ex("l7-18","clock","Quelle heure est-il ?",{ hours:12, minutes:0, options:["11h00","12h00","12h30","1h00"], answer:"12h00" }),
  ex("l7-19","fraction","Quelle fraction est coloriée ?",{ numerator:2, denominator:3, coloredCount:2, options:["1/3","2/3","3/3","1/2"], answer:"2/3" }),
  ex("l7-20","numpad","Calcule : 324 + 468",{ question:"324 + 468 = ?", answer:792, unit:"" }),
];

// ── LEVEL 8 — CE2/CM1 (9 ans) : Problèmes à étapes, fractions ───────────────

const L8: Exercise[] = [
  ex("l8-1","numpad","Un fermier récolte 350 kg de maïs le lundi et 275 kg le mardi. Quelle est la récolte totale ?",{ question:"350 + 275 = ?", answer:625, unit:"kg" }),
  ex("l8-2","pattern","Qu'est-ce qui vient ensuite ?",{ sequence:["100","95","90","85",null], answer:"80", options:["75","78","80","82"] }),
  ex("l8-3","numpad","Calcule : 12 × 15",{ question:"12 × 15 = ?", answer:180, unit:"" }),
  ex("l8-4","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"Jan",value:120},{label:"Fév",value:95},{label:"Mar",value:140},{label:"Avr",value:80}], question:"Quel mois a eu le plus de pluie (mm) ?", options:["Janvier","Février","Mars","Avril"], answer:"Mars" }),
  ex("l8-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🌍"},{id:"b",emoji:"🌊"},{id:"c",emoji:"⛰️"},{id:"d",emoji:"🏔️"},{id:"e",emoji:"🌋"},{id:"f",emoji:"🗻"}] }),
  ex("l8-6","numpad","Un commerçant achète 24 papayes à 50 FCFA chacune. Combien dépense-t-il ?",{ question:"24 × 50 = ?", answer:1200, unit:"FCFA" }),
  ex("l8-7","fraction","Quelle fraction est coloriée ?",{ numerator:5, denominator:8, coloredCount:5, options:["3/8","4/8","5/8","6/8"], answer:"5/8" }),
  ex("l8-8","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:3*4+5, b:3*(4+5), answer:"<" }),
  ex("l8-9","numpad","Calcule : 1000 − 437",{ question:"1 000 − 437 = ?", answer:563, unit:"" }),
  ex("l8-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Nombre premier","Nombre composé"], items:[{label:"7",category:"Nombre premier"},{label:"9",category:"Nombre composé"},{label:"11",category:"Nombre premier"},{label:"15",category:"Nombre composé"},{label:"13",category:"Nombre premier"},{label:"21",category:"Nombre composé"}] }),
  ex("l8-11","numpad","Calcule : 144 ÷ 12",{ question:"144 ÷ 12 = ?", answer:12, unit:"" }),
  ex("l8-12","numpad","Ama a économisé 2 500 FCFA. Elle veut acheter un livre à 1 750 FCFA. Combien lui reste-t-il ?",{ question:"2500 − 1750 = ?", answer:750, unit:"FCFA" }),
  ex("l8-13","clock","Quelle heure est-il ?",{ hours:3, minutes:45, options:["3h15","3h45","4h45","2h45"], answer:"3h45" }),
  ex("l8-14","numpad","Calcule : 25 × 16",{ question:"25 × 16 = ?", answer:400, unit:"" }),
  ex("l8-15","numpad","Fatou a 3/5 de 200 billes. Combien de billes a-t-elle ?",{ question:"200 × 3 ÷ 5 = ?", answer:120, unit:"billes" }),
  ex("l8-16","symmetry","Complète la figure symétrique !",{ shape:[[1,0,1],[1,1,0],[1,0,1]], options:[[[1,0,1],[0,1,1],[1,0,1]],[[0,1,0],[1,0,1],[0,1,0]],[[1,1,0],[1,0,1],[1,1,0]]], correctIndex:0 }),
  ex("l8-17","numpad","Calcule : 360 ÷ 15",{ question:"360 ÷ 15 = ?", answer:24, unit:"" }),
  ex("l8-18","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"Kofi",value:85},{label:"Ama",value:92},{label:"Fatou",value:78},{label:"Moussa",value:88}], question:"Qui a obtenu la meilleure note ?", options:["Kofi","Ama","Fatou","Moussa"], answer:"Ama" }),
  ex("l8-19","numpad","Un rectangle mesure 12 cm × 8 cm. Quel est son périmètre ?",{ question:"2 × (12 + 8) = ?", answer:40, unit:"cm" }),
  ex("l8-20","numpad","Calcule : 18 × 18",{ question:"18 × 18 = ?", answer:324, unit:"" }),
];

// ── LEVEL 9 — CM1 (9-10 ans) : Proportionnalité, pourcentages, stats ─────────

const L9: Exercise[] = [
  ex("l9-1","numpad","Si 3 mangues coûtent 150 FCFA, combien coûtent 7 mangues ?",{ question:"150 ÷ 3 × 7 = ?", answer:350, unit:"FCFA" }),
  ex("l9-2","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"CE1",value:28},{label:"CE2",value:31},{label:"CM1",value:26},{label:"CM2",value:33}], question:"Quelle classe a le plus d'élèves ?", options:["CE1","CE2","CM1","CM2"], answer:"CM2" }),
  ex("l9-3","numpad","Calcule 20% de 500 FCFA",{ question:"500 × 20 ÷ 100 = ?", answer:100, unit:"FCFA" }),
  ex("l9-4","fraction","Quelle fraction est coloriée ?",{ numerator:3, denominator:5, coloredCount:3, options:["2/5","3/5","4/5","3/6"], answer:"3/5" }),
  ex("l9-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🔢"},{id:"b",emoji:"➕"},{id:"c",emoji:"➖"},{id:"d",emoji:"✖️"},{id:"e",emoji:"➗"},{id:"f",emoji:"🟰"}] }),
  ex("l9-6","numpad","Un terrain carré a un périmètre de 120 m. Quelle est la longueur d'un côté ?",{ question:"120 ÷ 4 = ?", answer:30, unit:"m" }),
  ex("l9-7","numpad","Si une voiture roule à 60 km/h, quelle distance parcourt-elle en 3h ?",{ question:"60 × 3 = ?", answer:180, unit:"km" }),
  ex("l9-8","compare-sign","Quel signe convient entre ces deux nombres ?",{ a:125*8, b:8*125, answer:"=" }),
  ex("l9-9","numpad","Calcule 15% de 200 FCFA",{ question:"200 × 15 ÷ 100 = ?", answer:30, unit:"FCFA" }),
  ex("l9-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Divisible par 4","Divisible par 6"], items:[{label:"12",category:"Divisible par 4"},{label:"18",category:"Divisible par 6"},{label:"16",category:"Divisible par 4"},{label:"24",category:"Divisible par 4"},{label:"30",category:"Divisible par 6"},{label:"36",category:"Divisible par 6"}] }),
  ex("l9-11","numpad","Un commerçant vend une chemise 2 500 FCFA avec 25% de bénéfice. Quel est le prix d'achat ?",{ question:"2500 × 100 ÷ 125 = ?", answer:2000, unit:"FCFA" }),
  ex("l9-12","numpad","Calcule : 2⁴ (2 à la puissance 4)",{ question:"2 × 2 × 2 × 2 = ?", answer:16, unit:"" }),
  ex("l9-13","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"Bénin",value:12},{label:"Togo",value:8},{label:"Ghana",value:31},{label:"Nigeria",value:220}], question:"Quel pays a la plus grande population (millions) ?", options:["Bénin","Togo","Ghana","Nigeria"], answer:"Nigeria" }),
  ex("l9-14","numpad","Calcule l'aire d'un rectangle : 15 cm × 9 cm",{ question:"15 × 9 = ?", answer:135, unit:"cm²" }),
  ex("l9-15","numpad","Si 5 élèves ont en moyenne 14/20, quelle est la somme de leurs notes ?",{ question:"5 × 14 = ?", answer:70, unit:"points" }),
  ex("l9-16","maze","Trouve le bon chemin !",{ description:"Le ballon doit entrer dans le but", paths:["→→↑↑→","↑→→↑→","→↑→→↑","↑↑→→→"], correctIndex:3, emoji:{start:"⚽",end:"🥅"} }),
  ex("l9-17","numpad","Calcule : 3³ (3 à la puissance 3)",{ question:"3 × 3 × 3 = ?", answer:27, unit:"" }),
  ex("l9-18","numpad","Un robinet remplit 45 litres en 15 minutes. Combien de litres par minute ?",{ question:"45 ÷ 15 = ?", answer:3, unit:"litres/min" }),
  ex("l9-19","fraction","Quelle fraction est coloriée ?",{ numerator:7, denominator:10, coloredCount:7, options:["6/10","7/10","8/10","9/10"], answer:"7/10" }),
  ex("l9-20","numpad","Calcule : 4⁵ (4 à la puissance 5 — juste les étapes : 4×4×4×4×4)",{ question:"4 × 4 × 4 × 4 × 4 = ?", answer:1024, unit:"" }),
];

// ── LEVEL 10 — CM2 (10-12 ans) : Problèmes complexes, géométrie ──────────────

const L10: Exercise[] = [
  ex("l10-1","numpad","Un magasin vend 450 articles à 1 200 FCFA. Quel est le chiffre d'affaires ?",{ question:"450 × 1 200 = ?", answer:540000, unit:"FCFA" }),
  ex("l10-2","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"2020",value:32},{label:"2021",value:38},{label:"2022",value:45},{label:"2023",value:41}], question:"Quelle année a eu la plus forte croissance par rapport à l'année précédente ?", options:["2020","2021","2022","2023"], answer:"2022" }),
  ex("l10-3","numpad","Calcule l'aire d'un cercle de rayon 7 cm (π ≈ 3,14)",{ question:"3,14 × 7 × 7 = ? cm² (arrondi)", answer:154, unit:"cm²" }),
  ex("l10-4","fraction","Quelle fraction est coloriée ?",{ numerator:5, denominator:6, coloredCount:5, options:["4/6","5/6","5/7","6/6"], answer:"5/6" }),
  ex("l10-5","memory","Mémorise bien ce que tu vois !",{ pairs:[{id:"a",emoji:"🏺"},{id:"b",emoji:"🗿"},{id:"c",emoji:"⚗️"},{id:"d",emoji:"🏛️"},{id:"e",emoji:"📜"},{id:"f",emoji:"🗺️"}] }),
  ex("l10-6","numpad","Le PGCD de 36 et 48",{ question:"PGCD(36, 48) = ?", answer:12, unit:"", hint:"Facteurs de 36: 1,2,3,4,6,9,12,18,36" }),
  ex("l10-7","numpad","Un train parcourt 480 km en 4h. Quel est sa vitesse moyenne ?",{ question:"480 ÷ 4 = ?", answer:120, unit:"km/h" }),
  ex("l10-8","numpad","Calcule 35% de 4 200 FCFA",{ question:"4200 × 35 ÷ 100 = ?", answer:1470, unit:"FCFA" }),
  ex("l10-9","numpad","Fatou emprunte 50 000 FCFA à 10% d'intérêt sur 2 ans. Combien rembourse-t-elle en tout ?",{ question:"50000 + 50000 × 10/100 × 2 = ?", answer:60000, unit:"FCFA" }),
  ex("l10-10","categorize","Range chaque élément dans la bonne catégorie !",{ categories:["Nombre rationnel","Nombre irrationnel (approx)"], items:[{label:"1/3",category:"Nombre rationnel"},{label:"π",category:"Nombre irrationnel (approx)"},{label:"7/8",category:"Nombre rationnel"},{label:"√2",category:"Nombre irrationnel (approx)"},{label:"22/7",category:"Nombre rationnel"},{label:"√3",category:"Nombre irrationnel (approx)"}] }),
  ex("l10-11","numpad","Un rectangle a un périmètre de 56 cm et une longueur de 18 cm. Quelle est sa largeur ?",{ question:"(56 ÷ 2) − 18 = ?", answer:10, unit:"cm" }),
  ex("l10-12","numpad","Calcule : √(169)",{ question:"√169 = ?", answer:13, unit:"", hint:"13 × 13 = 169" }),
  ex("l10-13","bar-chart","Lis le graphique et réponds !",{ bars:[{label:"Bénin",value:14},{label:"Sénégal",value:17},{label:"Côte d'Ivoire",value:27},{label:"Burkina",value:21}], question:"Quel pays a un PIB estimé entre 17 et 27 milliards ?", options:["Bénin","Sénégal","Côte d'Ivoire","Burkina"], answer:"Burkina" }),
  ex("l10-14","numpad","Un triangle a une base de 12 cm et une hauteur de 9 cm. Quelle est son aire ?",{ question:"12 × 9 ÷ 2 = ?", answer:54, unit:"cm²" }),
  ex("l10-15","numpad","Le PPCM de 4 et 6",{ question:"PPCM(4, 6) = ?", answer:12, unit:"", hint:"Multiples de 4: 4,8,12... ; de 6: 6,12..." }),
  ex("l10-16","maze","Trouve le bon chemin !",{ description:"Le navigateur doit atteindre le port", paths:["→↑→↑→↑","↑→↑→↑→","→→↑↑→↑","↑↑→→↑→"], correctIndex:1, emoji:{start:"⛵",end:"⚓"} }),
  ex("l10-17","numpad","Calcule : (15 + 9) × (15 − 9)",{ question:"(15+9) × (15−9) = ?", answer:144, unit:"" }),
  ex("l10-18","numpad","Un commerçant achète 200 kg de maïs à 100 FCFA/kg et vend à 140 FCFA/kg. Quel est son bénéfice ?",{ question:"(140 − 100) × 200 = ?", answer:8000, unit:"FCFA" }),
  ex("l10-19","fraction","Quelle fraction est coloriée ?",{ numerator:11, denominator:12, coloredCount:11, options:["9/12","10/12","11/12","12/12"], answer:"11/12" }),
  ex("l10-20","numpad","Calcule : 1 001 × 999 (astuce : (1000+1)(1000−1) = 1000²−1)",{ question:"1001 × 999 = ?", answer:999999, unit:"" }),
];

// ── Export ────────────────────────────────────────────────────────────────────

export const MATH_LEVELS: Level[] = [
  { id:1,  label:"Niveau 1 — CI",       schoolYear:"Cours Initiatoire",   exercises:L1,  passingScore:16 },
  { id:2,  label:"Niveau 2 — CI/CP",    schoolYear:"Cours Initiatoire",   exercises:L2,  passingScore:16 },
  { id:3,  label:"Niveau 3 — CP",       schoolYear:"Cours Préparatoire",  exercises:L3,  passingScore:16 },
  { id:4,  label:"Niveau 4 — CP/CE1",   schoolYear:"Cours Élémentaire 1", exercises:L4,  passingScore:16 },
  { id:5,  label:"Niveau 5 — CE1",      schoolYear:"Cours Élémentaire 1", exercises:L5,  passingScore:16 },
  { id:6,  label:"Niveau 6 — CE1/CE2",  schoolYear:"Cours Élémentaire 2", exercises:L6,  passingScore:16 },
  { id:7,  label:"Niveau 7 — CE2",      schoolYear:"Cours Élémentaire 2", exercises:L7,  passingScore:16 },
  { id:8,  label:"Niveau 8 — CE2/CM1",  schoolYear:"Cours Moyen 1",       exercises:L8,  passingScore:16 },
  { id:9,  label:"Niveau 9 — CM1",      schoolYear:"Cours Moyen 1",       exercises:L9,  passingScore:16 },
  { id:10, label:"Niveau 10 — CM2",     schoolYear:"Cours Moyen 2",       exercises:L10, passingScore:16 },
];
