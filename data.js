/* ============================================================
   Tu te mets combien ? — Données du jeu (POC)
   ------------------------------------------------------------
   Fichier .js (et non .json) pour fonctionner en ouverture
   locale (file://) sans serveur : un fetch() de .json serait
   bloqué par le navigateur (CORS).

   Pour ajouter vos propres questions : complétez le tableau
   QUESTIONS ci-dessous. Chaque entrée =
     { theme: <id d'un thème>, level: 1..10, q: '...', a: '...' }
   La difficulté doit monter du niveau 1 (facile) au 10 (dur).
   ============================================================ */

const THEMES = [
  { id: 'culture',  label: 'Culture générale', color: '#2f80ed' },
  { id: 'histgeo',  label: 'Histoire & Géo',   color: '#f2994a' },
  { id: 'sciences', label: 'Sciences & Nature', color: '#27ae60' },
  { id: 'sport',    label: 'Sport & Loisirs',   color: '#eb5757' },
  { id: 'arts',     label: 'Arts & Spectacles', color: '#9b51e0' },
  { id: 'societe',  label: 'Société & Monde',   color: '#00bcd4' },
];

const QUESTIONS = [
  /* ---------------- Culture générale ---------------- */
  { theme: 'culture', level: 1,  q: 'De quelle couleur est le ciel par temps clair ?', a: 'Bleu.' },
  { theme: 'culture', level: 1,  q: 'Combien de jours compte une semaine ?', a: 'Sept.' },
  { theme: 'culture', level: 2,  q: 'Quelle est la capitale de la France ?', a: 'Paris.' },
  { theme: 'culture', level: 2,  q: 'Combien de côtés a un triangle ?', a: 'Trois.' },
  { theme: 'culture', level: 3,  q: 'Quel animal est le "roi de la jungle" ?', a: 'Le lion.' },
  { theme: 'culture', level: 4,  q: 'Quelle langue est la plus parlée au monde (locuteurs natifs) ?', a: 'Le chinois mandarin.' },
  { theme: 'culture', level: 5,  q: 'Quel est le plus grand océan de la planète ?', a: 'L’océan Pacifique.' },
  { theme: 'culture', level: 6,  q: 'Quel philosophe grec fut le maître d’Alexandre le Grand ?', a: 'Aristote.' },
  { theme: 'culture', level: 7,  q: 'Quelle est la monnaie du Japon ?', a: 'Le yen.' },
  { theme: 'culture', level: 8,  q: 'En quelle année a été signée la Déclaration des droits de l’homme et du citoyen ?', a: '1789.' },
  { theme: 'culture', level: 9,  q: 'Quel est l’élément chimique de symbole "W" ?', a: 'Le tungstène (wolfram).' },
  { theme: 'culture', level: 10, q: 'Quel penseur a écrit "L’Éthique", ouvrage publié en 1677 ?', a: 'Baruch Spinoza.' },

  /* ---------------- Histoire & Géo ---------------- */
  { theme: 'histgeo', level: 1,  q: 'Sur quel continent se trouve l’Égypte ?', a: 'L’Afrique.' },
  { theme: 'histgeo', level: 1,  q: 'Quel monument célèbre se trouve à Paris et mesure 330 m ?', a: 'La tour Eiffel.' },
  { theme: 'histgeo', level: 2,  q: 'Quel pays a la forme d’une botte ?', a: 'L’Italie.' },
  { theme: 'histgeo', level: 3,  q: 'Quel fleuve traverse Paris ?', a: 'La Seine.' },
  { theme: 'histgeo', level: 4,  q: 'Qui était le premier empereur des Français ?', a: 'Napoléon Ier.' },
  { theme: 'histgeo', level: 5,  q: 'En quelle année a eu lieu la Révolution française ?', a: '1789.' },
  { theme: 'histgeo', level: 6,  q: 'Quelle est la capitale de l’Australie ?', a: 'Canberra.' },
  { theme: 'histgeo', level: 7,  q: 'Quel traité, signé en 1648, met fin à la guerre de Trente Ans ?', a: 'Les traités de Westphalie.' },
  { theme: 'histgeo', level: 8,  q: 'Quel détroit sépare l’Europe de l’Afrique à son point le plus étroit ?', a: 'Le détroit de Gibraltar.' },
  { theme: 'histgeo', level: 9,  q: 'Quelle cité antique fut ensevelie par le Vésuve en 79 apr. J.-C. ?', a: 'Pompéi (et Herculanum).' },
  { theme: 'histgeo', level: 10, q: 'Quel est le pays le plus peuplé d’Afrique ?', a: 'Le Nigeria.' },

  /* ---------------- Sciences & Nature ---------------- */
  { theme: 'sciences', level: 1,  q: 'Quel astre nous éclaire le jour ?', a: 'Le Soleil.' },
  { theme: 'sciences', level: 1,  q: 'Combien de pattes a une araignée ?', a: 'Huit.' },
  { theme: 'sciences', level: 2,  q: 'Quel gaz respirons-nous pour vivre ?', a: 'L’oxygène.' },
  { theme: 'sciences', level: 3,  q: 'Quelle planète est surnommée la "planète rouge" ?', a: 'Mars.' },
  { theme: 'sciences', level: 4,  q: 'Quel organe pompe le sang dans le corps ?', a: 'Le cœur.' },
  { theme: 'sciences', level: 5,  q: 'Quelle est la formule chimique de l’eau ?', a: 'H₂O.' },
  { theme: 'sciences', level: 6,  q: 'Quelle est la vitesse de la lumière (approximative) ?', a: 'Environ 300 000 km/s.' },
  { theme: 'sciences', level: 7,  q: 'Quel scientifique a formulé la théorie de la relativité ?', a: 'Albert Einstein.' },
  { theme: 'sciences', level: 8,  q: 'Combien de chromosomes possède une cellule humaine ?', a: '46 (23 paires).' },
  { theme: 'sciences', level: 9,  q: 'Quel est l’élément le plus abondant dans l’univers ?', a: 'L’hydrogène.' },
  { theme: 'sciences', level: 10, q: 'Quelle particule élémentaire fut confirmée au CERN en 2012 ?', a: 'Le boson de Higgs.' },

  /* ---------------- Sport & Loisirs ---------------- */
  { theme: 'sport', level: 1,  q: 'Avec combien de joueurs joue-t-on une équipe de football sur le terrain ?', a: 'Onze.' },
  { theme: 'sport', level: 1,  q: 'Dans quel sport utilise-t-on une raquette et un volant ?', a: 'Le badminton.' },
  { theme: 'sport', level: 2,  q: 'Tous les combien d’années ont lieu les Jeux olympiques d’été ?', a: 'Tous les quatre ans.' },
  { theme: 'sport', level: 3,  q: 'Quel sport pratique-t-on à Roland-Garros ?', a: 'Le tennis.' },
  { theme: 'sport', level: 4,  q: 'Combien de points vaut un panier à trois points au basket ?', a: 'Trois points.' },
  { theme: 'sport', level: 5,  q: 'Quelle course cycliste française est la plus célèbre ?', a: 'Le Tour de France.' },
  { theme: 'sport', level: 6,  q: 'Dans quel pays est né le sport du judo ?', a: 'Au Japon.' },
  { theme: 'sport', level: 7,  q: 'Quel pays a remporté la Coupe du monde de football 2018 ?', a: 'La France.' },
  { theme: 'sport', level: 8,  q: 'Combien de cases comporte un échiquier ?', a: '64.' },
  { theme: 'sport', level: 9,  q: 'Qui détient le record du monde du 100 m masculin ?', a: 'Usain Bolt (9,58 s).' },
  { theme: 'sport', level: 10, q: 'En quelle année se sont tenus les premiers Jeux olympiques modernes ?', a: '1896, à Athènes.' },

  /* ---------------- Arts & Spectacles ---------------- */
  { theme: 'arts', level: 1,  q: 'Quel instrument a des touches noires et blanches ?', a: 'Le piano.' },
  { theme: 'arts', level: 1,  q: 'Combien de cordes possède une guitare classique ?', a: 'Six.' },
  { theme: 'arts', level: 2,  q: 'Qui a peint "La Joconde" ?', a: 'Léonard de Vinci.' },
  { theme: 'arts', level: 3,  q: 'Dans quelle ville se trouve le musée du Louvre ?', a: 'À Paris.' },
  { theme: 'arts', level: 4,  q: 'Qui a écrit "Roméo et Juliette" ?', a: 'William Shakespeare.' },
  { theme: 'arts', level: 5,  q: 'Quel peintre néerlandais s’est coupé une oreille ?', a: 'Vincent van Gogh.' },
  { theme: 'arts', level: 6,  q: 'Quel compositeur, devenu sourd, a écrit la 9e Symphonie ?', a: 'Ludwig van Beethoven.' },
  { theme: 'arts', level: 7,  q: 'Quel mouvement artistique Picasso a-t-il cofondé ?', a: 'Le cubisme.' },
  { theme: 'arts', level: 8,  q: 'Qui a réalisé le film "Pulp Fiction" ?', a: 'Quentin Tarantino.' },
  { theme: 'arts', level: 9,  q: 'Quel écrivain français a écrit "À la recherche du temps perdu" ?', a: 'Marcel Proust.' },
  { theme: 'arts', level: 10, q: 'Quel architecte a conçu la Sagrada Família à Barcelone ?', a: 'Antoni Gaudí.' },

  /* ---------------- Société & Monde ---------------- */
  { theme: 'societe', level: 1,  q: 'Comment appelle-t-on le chef d’un pays comme la France ?', a: 'Le président de la République.' },
  { theme: 'societe', level: 1,  q: 'Quel numéro compose-t-on pour les urgences (Europe) ?', a: 'Le 112.' },
  { theme: 'societe', level: 2,  q: 'Quelle est la monnaie utilisée en France ?', a: 'L’euro.' },
  { theme: 'societe', level: 3,  q: 'Combien d’étoiles figurent sur le drapeau de l’Union européenne ?', a: 'Douze.' },
  { theme: 'societe', level: 4,  q: 'Où se trouve le siège de l’ONU ?', a: 'À New York.' },
  { theme: 'societe', level: 5,  q: 'Quel réseau social utilise un oiseau (historiquement) comme logo ?', a: 'Twitter (aujourd’hui X).' },
  { theme: 'societe', level: 6,  q: 'Combien de membres permanents siègent au Conseil de sécurité de l’ONU ?', a: 'Cinq.' },
  { theme: 'societe', level: 7,  q: 'En quelle année l’euro est-il entré en circulation (pièces et billets) ?', a: '2002.' },
  { theme: 'societe', level: 8,  q: 'Quel pays compte le plus d’habitants au monde en 2024 ?', a: 'L’Inde.' },
  { theme: 'societe', level: 9,  q: 'Quel accord international de 2015 vise à limiter le réchauffement climatique ?', a: 'L’Accord de Paris.' },
  { theme: 'societe', level: 10, q: 'Combien d’objectifs de développement durable (ODD) l’ONU a-t-elle fixés ?', a: '17.' },
];
