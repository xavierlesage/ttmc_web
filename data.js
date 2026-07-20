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

   Banque de questions originale — 2 questions par thème × niveau.
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
  /* ================= Culture générale ================= */
  { theme: 'culture', level: 1,  q: 'Combien de jours compte une semaine ?', a: 'Sept.' },
  { theme: 'culture', level: 1,  q: 'De quelle couleur est le ciel par beau temps ?', a: 'Bleu.' },
  { theme: 'culture', level: 2,  q: 'Quelle est la capitale de la France ?', a: 'Paris.' },
  { theme: 'culture', level: 2,  q: 'Combien de mois compte une année ?', a: 'Douze.' },
  { theme: 'culture', level: 3,  q: 'Quel est le plus grand pays du monde par sa superficie ?', a: 'La Russie.' },
  { theme: 'culture', level: 3,  q: 'Combien de côtés possède un hexagone ?', a: 'Six.' },
  { theme: 'culture', level: 4,  q: 'Quelle est la monnaie utilisée aux États-Unis ?', a: 'Le dollar (américain).' },
  { theme: 'culture', level: 4,  q: 'Quelle est la langue officielle du Brésil ?', a: 'Le portugais.' },
  { theme: 'culture', level: 5,  q: 'Quel est le plus grand océan du monde ?', a: 'L’océan Pacifique.' },
  { theme: 'culture', level: 5,  q: 'Quelle est la capitale du Canada ?', a: 'Ottawa.' },
  { theme: 'culture', level: 6,  q: 'Quel philosophe grec fut le précepteur d’Alexandre le Grand ?', a: 'Aristote.' },
  { theme: 'culture', level: 6,  q: 'Combien de lettres compte l’alphabet français ?', a: 'Vingt-six.' },
  { theme: 'culture', level: 7,  q: 'Quelle est la monnaie du Japon ?', a: 'Le yen.' },
  { theme: 'culture', level: 7,  q: 'Dans quel pays se trouve la ville de Marrakech ?', a: 'Au Maroc.' },
  { theme: 'culture', level: 8,  q: 'En quelle année a été adoptée la Déclaration des droits de l’homme et du citoyen ?', a: '1789.' },
  { theme: 'culture', level: 8,  q: 'Quelle est la capitale de la Nouvelle-Zélande ?', a: 'Wellington.' },
  { theme: 'culture', level: 9,  q: 'Combien d’États membres compte l’Union européenne en 2024 ?', a: 'Vingt-sept.' },
  { theme: 'culture', level: 9,  q: 'Quelle est la capitale de l’Islande ?', a: 'Reykjavik.' },
  { theme: 'culture', level: 10, q: 'Quel philosophe a écrit "L’Éthique", publiée en 1677 ?', a: 'Baruch Spinoza.' },
  { theme: 'culture', level: 10, q: 'Quel est le plus petit État indépendant du monde ?', a: 'Le Vatican.' },

  /* ================= Histoire & Géo ================= */
  { theme: 'histgeo', level: 1,  q: 'Sur quel continent se trouve l’Égypte ?', a: 'L’Afrique.' },
  { theme: 'histgeo', level: 1,  q: 'Dans quelle ville se trouve la tour Eiffel ?', a: 'À Paris.' },
  { theme: 'histgeo', level: 2,  q: 'Quel pays européen a la forme d’une botte ?', a: 'L’Italie.' },
  { theme: 'histgeo', level: 2,  q: 'Quel océan sépare l’Europe de l’Amérique ?', a: 'L’océan Atlantique.' },
  { theme: 'histgeo', level: 3,  q: 'Quel fleuve traverse Paris ?', a: 'La Seine.' },
  { theme: 'histgeo', level: 3,  q: 'Dans quelle ville américaine se dresse la statue de la Liberté ?', a: 'À New York.' },
  { theme: 'histgeo', level: 4,  q: 'Qui fut le premier empereur des Français ?', a: 'Napoléon Ier.' },
  { theme: 'histgeo', level: 4,  q: 'Quel est le plus vaste continent du monde ?', a: 'L’Asie.' },
  { theme: 'histgeo', level: 5,  q: 'En quelle année a débuté la Révolution française ?', a: '1789.' },
  { theme: 'histgeo', level: 5,  q: 'Quel est le plus grand pays d’Amérique du Sud ?', a: 'Le Brésil.' },
  { theme: 'histgeo', level: 6,  q: 'Quelle est la capitale de l’Australie ?', a: 'Canberra.' },
  { theme: 'histgeo', level: 6,  q: 'En quelle année le mur de Berlin est-il tombé ?', a: '1989.' },
  { theme: 'histgeo', level: 7,  q: 'Quel est le plus long fleuve d’Afrique ?', a: 'Le Nil.' },
  { theme: 'histgeo', level: 7,  q: 'Quelle est la capitale de la Turquie ?', a: 'Ankara.' },
  { theme: 'histgeo', level: 8,  q: 'Quels traités de 1648 ont mis fin à la guerre de Trente Ans ?', a: 'Les traités de Westphalie.' },
  { theme: 'histgeo', level: 8,  q: 'En quelle année (communément citée) tombe l’Empire romain d’Occident ?', a: '476.' },
  { theme: 'histgeo', level: 9,  q: 'Quelle cité romaine fut ensevelie par le Vésuve en 79 apr. J.-C. ?', a: 'Pompéi (et Herculanum).' },
  { theme: 'histgeo', level: 9,  q: 'Quel détroit sépare l’Europe de l’Afrique à son point le plus étroit ?', a: 'Le détroit de Gibraltar.' },
  { theme: 'histgeo', level: 10, q: 'Quel est le pays le plus peuplé d’Afrique ?', a: 'Le Nigeria.' },
  { theme: 'histgeo', level: 10, q: 'Quel traité de 1494 partagea le Nouveau Monde entre l’Espagne et le Portugal ?', a: 'Le traité de Tordesillas.' },

  /* ================= Sciences & Nature ================= */
  { theme: 'sciences', level: 1,  q: 'Quel astre nous éclaire pendant la journée ?', a: 'Le Soleil.' },
  { theme: 'sciences', level: 1,  q: 'Combien de pattes possède une araignée ?', a: 'Huit.' },
  { theme: 'sciences', level: 2,  q: 'Quel gaz respirons-nous pour vivre ?', a: 'L’oxygène.' },
  { theme: 'sciences', level: 2,  q: 'Combien de pattes possède un insecte ?', a: 'Six.' },
  { theme: 'sciences', level: 3,  q: 'Quelle planète est surnommée la "planète rouge" ?', a: 'Mars.' },
  { theme: 'sciences', level: 3,  q: 'Quel est le plus grand animal vivant sur Terre ?', a: 'La baleine bleue.' },
  { theme: 'sciences', level: 4,  q: 'Quel organe pompe le sang dans le corps humain ?', a: 'Le cœur.' },
  { theme: 'sciences', level: 4,  q: 'Combien d’os compte environ le corps humain adulte ?', a: '206.' },
  { theme: 'sciences', level: 5,  q: 'Quelle est la formule chimique de l’eau ?', a: 'H₂O.' },
  { theme: 'sciences', level: 5,  q: 'Quelle planète est la plus proche du Soleil ?', a: 'Mercure.' },
  { theme: 'sciences', level: 6,  q: 'Quelle est la vitesse approximative de la lumière dans le vide ?', a: 'Environ 300 000 km/s.' },
  { theme: 'sciences', level: 6,  q: 'Quel gaz les plantes absorbent-elles pour la photosynthèse ?', a: 'Le dioxyde de carbone (CO₂).' },
  { theme: 'sciences', level: 7,  q: 'Quel scientifique a formulé la théorie de la relativité ?', a: 'Albert Einstein.' },
  { theme: 'sciences', level: 7,  q: 'Quel est le plus grand os du corps humain ?', a: 'Le fémur.' },
  { theme: 'sciences', level: 8,  q: 'Combien de chromosomes possède une cellule humaine ?', a: '46 (23 paires).' },
  { theme: 'sciences', level: 8,  q: 'Quel est le symbole chimique du sodium ?', a: 'Na.' },
  { theme: 'sciences', level: 9,  q: 'Quel est l’élément chimique le plus abondant dans l’univers ?', a: 'L’hydrogène.' },
  { theme: 'sciences', level: 9,  q: 'Quelle est la planète la plus massive du système solaire ?', a: 'Jupiter.' },
  { theme: 'sciences', level: 10, q: 'Quelle particule élémentaire fut confirmée au CERN en 2012 ?', a: 'Le boson de Higgs.' },
  { theme: 'sciences', level: 10, q: 'Quel savant a énoncé les trois lois du mouvement au XVIIᵉ siècle ?', a: 'Isaac Newton.' },

  /* ================= Sport & Loisirs ================= */
  { theme: 'sport', level: 1,  q: 'Combien de joueurs compte une équipe de football sur le terrain ?', a: 'Onze.' },
  { theme: 'sport', level: 1,  q: 'Dans quel sport utilise-t-on une raquette et un volant ?', a: 'Le badminton.' },
  { theme: 'sport', level: 2,  q: 'Tous les combien d’années ont lieu les Jeux olympiques d’été ?', a: 'Tous les quatre ans.' },
  { theme: 'sport', level: 2,  q: 'Combien de joueurs compte une équipe de basket-ball sur le terrain ?', a: 'Cinq.' },
  { theme: 'sport', level: 3,  q: 'Quel sport pratique-t-on au tournoi de Roland-Garros ?', a: 'Le tennis.' },
  { theme: 'sport', level: 3,  q: 'Combien de trous compte un parcours de golf standard ?', a: 'Dix-huit.' },
  { theme: 'sport', level: 4,  q: 'Dans quel sport marque-t-on un "essai" ?', a: 'Le rugby.' },
  { theme: 'sport', level: 4,  q: 'Combien de points vaut un panier marqué à trois points au basket ?', a: 'Trois.' },
  { theme: 'sport', level: 5,  q: 'Quelle est la course cycliste française la plus célèbre ?', a: 'Le Tour de France.' },
  { theme: 'sport', level: 5,  q: 'Combien de joueurs compte une équipe de volley-ball sur le terrain ?', a: 'Six.' },
  { theme: 'sport', level: 6,  q: 'Dans quel pays est né le judo ?', a: 'Au Japon.' },
  { theme: 'sport', level: 6,  q: 'Quelle est la durée réglementaire d’un match de football (hors prolongations) ?', a: '90 minutes.' },
  { theme: 'sport', level: 7,  q: 'Quel pays a remporté la Coupe du monde de football 2018 ?', a: 'La France.' },
  { theme: 'sport', level: 7,  q: 'Dans quelle ville se sont tenus les Jeux olympiques d’été de 2021 ?', a: 'Tokyo (Japon).' },
  { theme: 'sport', level: 8,  q: 'Combien de cases compte un échiquier ?', a: '64.' },
  { theme: 'sport', level: 8,  q: 'Combien de pions chaque joueur possède-t-il au début d’une partie d’échecs ?', a: 'Huit.' },
  { theme: 'sport', level: 9,  q: 'Qui détient le record du monde du 100 m masculin ?', a: 'Usain Bolt (9,58 s).' },
  { theme: 'sport', level: 9,  q: 'En quelle année la France a-t-elle remporté sa première Coupe du monde de football ?', a: '1998.' },
  { theme: 'sport', level: 10, q: 'En quelle année et dans quelle ville se sont tenus les premiers Jeux olympiques modernes ?', a: 'En 1896, à Athènes.' },
  { theme: 'sport', level: 10, q: 'Combien de médailles d’or olympiques le nageur Michael Phelps a-t-il remportées ?', a: '23.' },

  /* ================= Arts & Spectacles ================= */
  { theme: 'arts', level: 1,  q: 'Quel instrument possède des touches noires et blanches ?', a: 'Le piano.' },
  { theme: 'arts', level: 1,  q: 'Combien de cordes possède une guitare classique ?', a: 'Six.' },
  { theme: 'arts', level: 2,  q: 'Qui a peint "La Joconde" ?', a: 'Léonard de Vinci.' },
  { theme: 'arts', level: 2,  q: 'Combien de notes compte la gamme (do, ré, mi…) ?', a: 'Sept.' },
  { theme: 'arts', level: 3,  q: 'Dans quelle ville se trouve le musée du Louvre ?', a: 'À Paris.' },
  { theme: 'arts', level: 3,  q: 'Qui a écrit les célèbres fables comme "Le Corbeau et le Renard" ?', a: 'Jean de La Fontaine.' },
  { theme: 'arts', level: 4,  q: 'Qui a écrit la pièce "Roméo et Juliette" ?', a: 'William Shakespeare.' },
  { theme: 'arts', level: 4,  q: 'Quel artiste a peint le plafond de la chapelle Sixtine ?', a: 'Michel-Ange.' },
  { theme: 'arts', level: 5,  q: 'Quel peintre néerlandais s’est coupé une partie de l’oreille ?', a: 'Vincent van Gogh.' },
  { theme: 'arts', level: 5,  q: 'Qui a composé l’opéra "La Flûte enchantée" ?', a: 'Wolfgang Amadeus Mozart.' },
  { theme: 'arts', level: 6,  q: 'Quel compositeur, devenu sourd, a écrit la 9ᵉ Symphonie ?', a: 'Ludwig van Beethoven.' },
  { theme: 'arts', level: 6,  q: 'À quel mouvement pictural est associé Claude Monet ?', a: 'L’impressionnisme.' },
  { theme: 'arts', level: 7,  q: 'Quel mouvement artistique Pablo Picasso a-t-il cofondé ?', a: 'Le cubisme.' },
  { theme: 'arts', level: 7,  q: 'Quel sculpteur français a réalisé "Le Penseur" ?', a: 'Auguste Rodin.' },
  { theme: 'arts', level: 8,  q: 'Qui a réalisé le film "Pulp Fiction" ?', a: 'Quentin Tarantino.' },
  { theme: 'arts', level: 8,  q: 'Quel réalisateur a signé "E.T." et "Jurassic Park" ?', a: 'Steven Spielberg.' },
  { theme: 'arts', level: 9,  q: 'Quel écrivain français a écrit "À la recherche du temps perdu" ?', a: 'Marcel Proust.' },
  { theme: 'arts', level: 9,  q: 'Quel compositeur italien a écrit "Les Quatre Saisons" ?', a: 'Antonio Vivaldi.' },
  { theme: 'arts', level: 10, q: 'Quel architecte a conçu la Sagrada Família à Barcelone ?', a: 'Antoni Gaudí.' },
  { theme: 'arts', level: 10, q: 'Quel peintre espagnol a réalisé le tableau "Guernica" ?', a: 'Pablo Picasso.' },

  /* ================= Société & Monde ================= */
  { theme: 'societe', level: 1,  q: 'Comment appelle-t-on le chef de l’État en France ?', a: 'Le président de la République.' },
  { theme: 'societe', level: 1,  q: 'Quel numéro compose-t-on pour les urgences en Europe ?', a: 'Le 112.' },
  { theme: 'societe', level: 2,  q: 'Quelle est la monnaie utilisée en France ?', a: 'L’euro.' },
  { theme: 'societe', level: 2,  q: 'Combien d’étoiles figurent sur le drapeau de l’Union européenne ?', a: 'Douze.' },
  { theme: 'societe', level: 3,  q: 'Quelles sont les trois couleurs du drapeau français ?', a: 'Bleu, blanc, rouge.' },
  { theme: 'societe', level: 3,  q: 'Comment s’appelle la chambre basse du Parlement français ?', a: 'L’Assemblée nationale.' },
  { theme: 'societe', level: 4,  q: 'Dans quelle ville se trouve le siège de l’ONU ?', a: 'À New York.' },
  { theme: 'societe', level: 4,  q: 'Combien d’années dure le mandat présidentiel en France (depuis 2002) ?', a: 'Cinq ans.' },
  { theme: 'societe', level: 5,  q: 'Que signifie le sigle "www" du web ?', a: 'World Wide Web.' },
  { theme: 'societe', level: 5,  q: 'Combien d’États composent les États-Unis d’Amérique ?', a: 'Cinquante.' },
  { theme: 'societe', level: 6,  q: 'Combien de membres permanents siègent au Conseil de sécurité de l’ONU ?', a: 'Cinq.' },
  { theme: 'societe', level: 6,  q: 'Que désigne le sigle "OMS" ?', a: 'L’Organisation mondiale de la santé.' },
  { theme: 'societe', level: 7,  q: 'En quelle année les pièces et billets en euros sont-ils entrés en circulation ?', a: '2002.' },
  { theme: 'societe', level: 7,  q: 'Dans quelle ville siège la Commission européenne ?', a: 'À Bruxelles.' },
  { theme: 'societe', level: 8,  q: 'Quel pays est le plus peuplé du monde en 2024 ?', a: 'L’Inde.' },
  { theme: 'societe', level: 8,  q: 'Combien d’États membres compte l’ONU aujourd’hui ?', a: '193.' },
  { theme: 'societe', level: 9,  q: 'Quel accord international de 2015 vise à limiter le réchauffement climatique ?', a: 'L’Accord de Paris.' },
  { theme: 'societe', level: 9,  q: 'En quelle année a été adoptée la Déclaration universelle des droits de l’homme ?', a: '1948.' },
  { theme: 'societe', level: 10, q: 'Combien d’objectifs de développement durable (ODD) l’ONU a-t-elle fixés pour 2030 ?', a: 'Dix-sept.' },
  { theme: 'societe', level: 10, q: 'Comment s’appelle la juridiction de l’ONU siégeant à La Haye pour régler les différends entre États ?', a: 'La Cour internationale de justice.' },
];
