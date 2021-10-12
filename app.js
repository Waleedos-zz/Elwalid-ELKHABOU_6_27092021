require('dotenv').config()

//Importation du fichier de config
const config =  require('./config.js');

//Importation de express
const express = require('express');

//Express dans une variable
const app = express();

//Importation des routes

// Importation et enregistrement du nouveau router "sauces.js"dans ce fichier app.js
const saucesRoutes = require('./routes/sauces');
// Importation et enregistrement du nouveau router "user.js"dans ce fichier app.js
const userRoutes = require('./routes/user')
// ----------------------------------------------------------
const likeRoute = require('./routes/like')
// ----------------------------------------------------------

// Une fois l'installation de mongoose terminée avec la commande "npm install --save mongoose", Nous devons importez 
// mongoose dans notre fichier app.js en ajoutant la constante suivante :
const mongoose = require('mongoose');

//Importation de path permettant d'accéder au path du serveur
const path = require('path');


// -------------------------Disparu pour les autres-----------
// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON 
// de la demande. Il nous faudra le package body-parser . Installez-le en tant que dépendance de production à l'aide de
// la commande "npm install --save body-parser" depuis le repertoire "backend"
const bodyParser = require('body-parser');
// -----------------------------------------------------------

// -------Doit changer pour faire disparaitre mes identifiants----------
//mongoose.connect('mongodb+srv://walidkhebou:Base1234Bose4321@cluster0.o0qol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  //.then(() => {
    //console.log('Successfully connected to MongoDB Atlas!');
  //})
  //.catch((error) => {
    //console.log('Unable to connect to MongoDB Atlas!');
    //console.error(error);
  //});


mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.o0qol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => {  
    console.log('Connexion à MongoDB échouée !')}
    );  
// ---------------------------------------------------------------------

// --------------------Disparu pour les autres--------------------------
// Importation du nouveau model mongoose creé "sauce" afin de pouvoir l'utiliser dans notre application
//const Sauce = require('./models/sauce');
// ---------------------------------------------------------------------


// CORS (Cross-Origin Resource Sharing): Suite aux problemes CORS détéctés par le Browser qui refuse (securité par defaut) d'executer nos requete car le front et le back sont differents : port 3000 et port 4200, nous devons inserer ces headers qui permettent de :
// 1- d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// 2- d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// 3- d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// --------------------Disparu pour les autres--------------------------
// Il faut maintenant définir ici la fonction json de body-parser comme middleware global pour votre application, 
// juste après avoir défini les headers de la réponse :
//app.use(bodyParser.json());  // ----------et remplacée par--

// ---------------------et remplacée par -------------------------------
app.use(express.json());
// ---------------------------------------------------------------------

//Application des Routes avec les liens url
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', likeRoute);

//Indique qu'à chaque requète, il faut gérer la ressource provenant du dossier images 
//de manière static => un sous repertoire de base _dirname vers la route images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;