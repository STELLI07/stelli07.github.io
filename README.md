# Site de Stelli · Les Royaumes perdus

Adresse : **https://stelligame.com** (nom de domaine chez OVHcloud, relié par le fichier `CNAME` ; l'ancienne adresse stelli07.github.io y renvoie).

Ce site sert à quatre choses :

- **Le site du jeu**, dans les 21 langues du jeu : `index.html` (anglais, la page principale) et un dossier par langue (`fr/`, `es/`, `ja/`…), avec les images (`img/`), les polices (`fonts/`), `site.css` et `site.js`. Ces pages sont fabriquées automatiquement à partir des textes de la fiche App Store et du jeu : ne pas les modifier à la main.
- `privacy/` : la politique de confidentialité du jeu, en 21 langues (c'est la page demandée par Apple, Google et AdMob).
- `app-ads.txt` : la ligne demandée par AdMob pour les publicités.
- `version.json` : le fichier que le jeu lit, quand le joueur est connecté, pour savoir s'il existe une nouvelle version.

Pour Google : `sitemap.xml` (la liste des pages et de leurs langues) et `robots.txt`.

## Annoncer ou imposer une mise à jour (`version.json`)

Le fichier a une partie `ios` (iPhone) et une partie `android`. Dans chacune :

| Ligne | À quoi elle sert |
|---|---|
| `latest` | Le numéro de la dernière version publiée. S'il est plus grand que la version du joueur, le jeu affiche « Nouvelle version disponible » sur l'accueil, une fois par jour, avec les boutons « Mettre à jour » et « Plus tard ». |
| `min` | La version minimale pour jouer. Si elle est plus grande que la version du joueur, le jeu affiche « Mise à jour nécessaire » et le joueur doit mettre à jour pour continuer. |
| `url` | L'adresse de la fiche du jeu sur l'App Store ou Google Play (le bouton « Mettre à jour » l'ouvre). |
| `note` | Un petit texte facultatif pour l'annonce, par langue, 180 caractères au plus. Exemple : `{"fr": "3 nouveaux royaumes !", "en": "3 new kingdoms!"}`. Sans texte pour la langue du joueur, le jeu prend l'anglais (`en`), puis son texte habituel. |

Exemples, pour un joueur qui a la version 1.0 :

- `"latest": "1.0", "min": "1.0"` : il ne se passe rien.
- `"latest": "1.1", "min": "1.0"` : annonce de la version 1.1, le joueur peut répondre « Plus tard ».
- `"latest": "1.1", "min": "1.1"` : mise à jour obligatoire.

À retenir :

- Ne change ce fichier qu'**après** que la nouvelle version est vraiment disponible sur le store, sinon les joueurs seraient envoyés vers une mise à jour qui n'existe pas encore.
- Sans connexion internet, le jeu ne lit pas ce fichier et fonctionne normalement.
- Le changement est pris en compte en une heure environ.
- Garde bien les guillemets et les virgules : si le fichier est mal écrit, le jeu l'ignore (il ne se passe rien).
