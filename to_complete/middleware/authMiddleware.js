const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";

module.exports = function (req, res, next) {
  // TODO: Récupérer le token dans les cookies et vérifier s'il est valide avec la méthode `jwt.verify`
  // TODO: Si le token est valide, ajouter le contenu décodé du token dans `req.user`
  // TODO: Si le token est invalide, retourner une erreur 401
  const token = req.cookies.token;

  if (!token) return res.status(403).send("Accès refusé, token non fourni.");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded; // affiche le payload du token
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
