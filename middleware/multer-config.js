// nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire 
// pour indiquer à multer où enregistrer les fichiers entrants :
const multer = require('multer');

//Configuration des extensions des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


//Création d'un fichier externe et dans quel dossier l'enregistrer
//Constante storage avec comme argument multer et la fonction diskStorage
// la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
const storage = multer.diskStorage({
  //destination indique à multer d'enregistrer le fichier dans le dossier images
  destination: (req, file, callback) => {
    //if (!images){}
    //if pour voir si le repertoir images n'existe pas, il faut le créer, 
    //sans utiliser else ou ....
    //appeler le callback : null pour indiquer qu'il n'y a pas d'erreur, dans le dossier images
    callback(null, 'images');
  },

  // Nous utilisons la fonction filename pour affecter le nom d'origine, de remplacer les espaces par des underscores 
  // et pour ajouter un timestamp Date.now() comme nom de fichier:
  //la fonction filename indique à multer de modifier le nom du fichier d'origine 
  filename: (req, file, callback) => {
    //constante pour le nom du fichier orginal. 
    //.split pour récupérer les espaces entre les mots et les remplacer par des _
    const name = file.originalname.split(' ').join('_');
    //constante pour l'extension du fichier 
    //rappel de la constante MIME_TYPES et l'utiliser avec file
    const extension = MIME_TYPES[file.mimetype];
    //appeler le callback final du fichier: 
    //null pour indiquer qu'il n'y a pas d'erreur. 
    //name : nom du fichier. 
    //Date.now() => timestamp (date et heure de l'insertion du fichier)
    //extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});

// nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et lui indiquons 
// que nous gérerons uniquement les téléchargements de fichiers image.
module.exports = multer({storage: storage}).single('image');