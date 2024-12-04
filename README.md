# Comment fonctionne un JWT ?

Un JWT est composé de 3 parties:

- Un header: partie technique du JWT, on y indique notamment l'algorithme utilisé pour chiffrer le JWT.
- Un payload: endroit où l'on stocke les informations d'un utilisateur (par exemple son nom d'utilisateur, son mot de passe ou son rôle
  s'il y a des pages protégées).
- Une signature: c'est une clé secrète stockée dans notre application, qui permet de sécuriser le JWT car seuls ceux qui ont la bonne
  clé secrète pourront modifier les informations contenues dans le payload.

# Où est stocké ce JWT ?

Dans le but déviter de renvoyer trop souvent les identifiants de l'utilisateur, le JWT est stocké pendant une certaine durée (programmable à sa création) dans les cookies du navigateur de l'utilisateur.

# Que se passe-t-il si une personne malveillante trouve le token stocké dans les cookies d'un navigateur ?

Elle va pouvoir entrer ce token sur un site pour décoder le token, qui lui affichera donc les informations contenues dans le payload,
cependant elle ne pourra pas modifier ces informations car cela modifiera le chiffrement de la signature et notre application ne lui donnera pas d'accès.

## EXEMPLE:

Notre application stocke un token dans les cookies du navigateur et une personne malveillante tombe dessus:

Voici le token:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. => header
eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczMzMxOTY1OCwiZXhwIjoxNzMzMzIzMjU4fQ. => payload
IGYAiwWbfwbMVgwSEQzjOAelgSplAeqK4CHK7SFP10U" => signature

Cette personne peut consulter le payload en se rendant sur ce site: https://jwt.io/
Puis elle rentre le token et découvre que le payload contient un rôle 'user'. Elle tente de modifier ce rôle en 'admin' en se disant qu'elle va pouvoir accéder à une page dont elle ne devrait pas avoir accès. Mais en modifiant le payload, la signature a été modifiée ! Ainsi quand cette personne va vouloir mettre ce token portant le rôle admin dans son navigateur, elle n'y aura pas accès !

# Précisions

Dans le cadre de cet exercice la clé secrète est en dur dans les fichiers index.js et authMiddleware.js mais en temps normal elle serait dans une variable d'environnement privée.
