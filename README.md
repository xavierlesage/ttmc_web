# Tu te mets combien ? — version web (POC)

Prototype web du jeu de plateau **« Tu te mets combien ? »**, un jeu de questions
type jeu de l'oie où chaque joueur fait avancer son avatar sur un parcours.

100 % **statique et local** : aucun serveur, aucune dépendance, aucun build.
Il suffit d'ouvrir `index.html` dans un navigateur.

## Comment jouer

1. Ouvrez `index.html` (double-clic) — ou servez le dossier :
   ```bash
   python3 -m http.server 8000   # puis http://localhost:8000
   ```
2. Choisissez le nombre de joueurs (1 à 4), saisissez les noms et, si vous voulez,
   une **photo d'avatar** par joueur.
3. Lancez la partie.

### Déroulé d'un tour

1. Le **thème** est imposé par la couleur de la case où se trouve le joueur.
2. Le joueur annonce « **Tu te mets combien ?** » et choisit une difficulté de **1 à 10** :
   plus c'est haut, plus la question est dure — mais plus il avance de cases s'il répond juste.
3. La question s'affiche, **réponse masquée**.
4. L'arbitre clique sur **« Révéler la réponse »**, puis **Bonne** ou **Mauvaise réponse**.
5. Bonne réponse → le pion avance du nombre choisi ; mauvaise → il reste sur place.
6. Le premier joueur à atteindre la case d'arrivée gagne.

## Structure du projet

| Fichier       | Rôle                                                                 |
|---------------|---------------------------------------------------------------------|
| `index.html`  | Structure des écrans : configuration, jeu, victoire                  |
| `style.css`   | Mise en page (plateau serpentin, pions, avatars, sélecteur 1–10)     |
| `game.js`     | Logique de jeu : plateau, tours, pari 1–10, arbitrage, victoire      |
| `data.js`     | Thèmes et banque de questions (voir ci-dessous)                      |

## Ajouter / modifier des questions

Les questions sont dans **`data.js`** (un fichier `.js`, et non `.json`, pour fonctionner
en ouverture locale `file://` sans être bloqué par le navigateur).

Chaque question suit ce format :

```js
{ theme: 'culture', level: 3, q: 'La question ?', a: 'La réponse.' }
```

- `theme` : identifiant d'un thème défini dans le tableau `THEMES` en haut de `data.js`
  (`culture`, `histgeo`, `sciences`, `sport`, `arts`, `societe`).
- `level` : difficulté de **1** (facile) à **10** (difficile).
- `q` / `a` : la question et sa réponse.

Prévoyez idéalement plusieurs questions par couple (thème × niveau) pour éviter les répétitions.
Si un niveau exact n'a aucune question, le jeu prend automatiquement le niveau le plus proche.

## Avatars

Les photos choisies à l'écran de configuration sont lues localement (base64), ce qui
fonctionne même en `file://`. Sans photo, le pion affiche une pastille de couleur avec
les initiales du joueur.

## Limites du POC

- Tout se déroule sur **un seul appareil** : l'arbitre révèle la réponse sur le même écran.
  Une vraie séparation **plateau sur ordinateur + arbitre sur téléphone** nécessiterait
  un petit serveur (WebSocket) et fera l'objet d'une étape ultérieure.
- Le contenu (questions/réponses) est un jeu d'exemple à remplacer par le vôtre.

---

> Prototype réalisé pour valider le concept d'une version web du jeu.
