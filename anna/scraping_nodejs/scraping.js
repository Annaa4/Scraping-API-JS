const axios = require('axios');
const cheerio = require('cheerio');
// axios.get('https://www.sportaccess.fr/1-home')
//   .then(response => {
//     const html = response.data;
//     console.log(html);
//   })
//   .catch(error => {
//     console.log(error);
//   });
  // axios.get('https://www.sportaccess.fr/1-home')
  // .then(response => {
  //   const html = response.data;
  //   const $ = cheerio.load(html);
  //   console.log($.html());
  async function fetchData() {
    try {
      const response = await axios.get("https://www.leaderfit-equipement.com/13-materiel");
      const $ = cheerio.load(response.data);
      // console.log($.html());
      materials=[]
      $('.product-container').each((index, element)=>{
        const material={
          name : $(element).find('.product-name').text(),
          image_url : $(element).find('.product-image-container img').attr('src')
        }
        materials.push(material)
      })
      console.log(materials)
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();

    // Exemple d'extraction du texte à partir d'un élément HTML
    // console.log('Titre:', name);

    // Exemple d'extraction d'attribut d'un élément HTML
    // const imageUrl = $('img').attr('src');
    // console.log('URL de l\'image:', imageUrl);

//     // Continuez à extraire les données selon vos besoins
  // })
  // .catch(error => {
  //   console.log(error);
  // }); 
//   const axios = require('axios');
// const cheerio = require('cheerio');

// axios.get('https://www.sportaccess.fr/1-home')
//   .then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Exemple d'extraction de texte d'un élément spécifique
//     const headingText = $('h1').text();
//     console.log('Texte de l\'en-tête:', headingText);

//     // Exemple d'extraction d'attribut d'un élément spécifique
//     const imageUrl = $('img').attr('src');
//     console.log('URL de l\'image:', imageUrl);

//     // Continuez à extraire les données selon vos besoins
//   })
//   .catch(error => {
//     console.log(error);
//   });


//execute la commande suivante : sudo npm install -g nodemon

//ensuite pour executer ton script, tu fais: nodemon script.js