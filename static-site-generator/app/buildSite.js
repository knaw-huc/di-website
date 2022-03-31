const handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
let sass = require("sass");
let markdown = require("markdown").markdown;
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;

const config = require("../../config.json");
const sitedata = require("../../content/data/site.json");
const outputDir = config.dirOutput;
//const markdownDir = "content/markdown/";
const outputVersion = 1;
const partialsDir = "./src/components";
let sitedataLang = {}

build();

function build() {
  // clear output folder, then build site
  fs.remove(outputDir)
    .then(createFolder)
    .then(handleLanguage)
    .then(addPageBreadCrumb)
    .then(addPageNavigationList)
    //.then(addPageSubNavigationList)
    .then(createAltPageLists)
    .then(createLanguageToggle)
    .then(registerPartials)

    .then(() => {
      createSite();
      fs.copySync("src/images/", outputDir + "images/");
      fs.copySync(config.dirContent+"/images/", outputDir + "images/");
      fs.copySync("src/js/", outputDir + "js/");
      //fs.copySync("data/", outputDir + "data/");
    })
    .catch((err) => {
      console.error(err);
    });
}

function createSite() {
  generateHtml();
  createSass("src/scss/style.scss");
  //createSass("src/scss/editor.scss");
}



function handleLanguage() {
  //collect the languages
  let languages = []
  sitedata.forEach((item, i) => {
    languages.push(item.language);
  });
  languages = languages.filter(onlyUniqueInArr);

  languages.forEach((item, i) => {
    sitedataLang[item+'_pages'] = []
  });


  // create
  sitedata.forEach((item, i) => {
    sitedataLang[item.language+'_pages'].push(item)

  });
  //console.log(sitedataLang);
  //createFile('outputsite.json',JSON.stringify(sitedataLang));
}



// register partials (components) and generate site files
function registerPartials() {
  return new Promise((resolve, reject) => {
    const longPath = path.resolve("./src/components/");
    var walk = function(dir, done) {
      var results = [];
      fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
          file = path.resolve(dir, file);
          fs.stat(file, function(err, stat) {
            // if dir
            if (stat && stat.isDirectory()) {
              walk(file, function(err, res) {
                results = results.concat(res);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file.replace(longPath + "/", ""));
              file = file.replace(longPath + "/", "");

              fs.readFile("src/components/" + file, "utf-8", function(
                error,
                source
              ) {
                handlebars.registerPartial(
                  file.replace(path.extname(file), ""),
                  source
                );
              });
              if (!--pending) done(null, results);
            }
          });
        });
      });
    };


    walk(partialsDir, function(err, results) {
      if (err) throw err;
      setTimeout(() => {
        resolve(results);
      }, 500);
    });
  });
}

// create sass file
function createSass(pathFile) {
  let filename = path.basename(pathFile).replace(path.extname(pathFile), "");
  sass.render({
      file: pathFile,
      outputStyle: "compressed"
    },
    function(err, result) {
      if (err) {
        console.log("Sass error:" + err);
      } else {
        let filename = path
          .basename(pathFile)
          .replace(path.extname(pathFile), "");
        createFile(
          outputDir + "css/v" + outputVersion + "/" + filename + ".css",
          result.css.toString()
        );
      }
    }
  );
}

//prefab pages list on home
function createContentList() {
  let pages = []
  sitedata.forEach((item) => {
    pages.push(item);
  });
  pages.shift();
  sitedata[0].pagesList = pages;
}






function addPageBreadCrumb() {
  for (const [key, value] of Object.entries(sitedataLang)) {

    let parentPageName = '';
    let parentPageLink = '';
    let parentPageLevel = 1;

    sitedataLang[key].forEach((page, i) => {
      let breadCrumb = '';
      let currPage = '| <span>' + page.title + '</span>'

      if (page.page_level == 1) {
        // if top level
        breadCrumb = currPage;
        parentPageName = page.title
        parentPageLink = page.file_name

      } else if (page.page_level = 2) {
        // if subpage
        breadCrumb = '| <a href="' + parentPageLink + '">' + parentPageName + '</a> ' + currPage;
      }
      sitedataLang[key][i].breadcrumb = breadCrumb;
    });
  }
}





function addPageNavigationList() {
  // for each language
  for (const [key, value] of Object.entries(sitedataLang)) {


  //for each page
  sitedataLang[key].forEach((page, i) => {
    let hasCurrInSub = false;
    let topNav = '';
    let subNav = '';

    // generate list
    sitedataLang[key].slice().reverse().forEach((navItem, j) => {

      if (navItem.type == 'page') {


      let isCurr = '';
      let isCurrParent = ' navIsCurrentParent';

      if (page.title == navItem.title) {
        hasCurrInSub = true;
        isCurr = ' navIsCurrentPage';
      }

        let tempUl = '<a href="' + navItem.file_name + '">' + navItem.title + '</a>';
        if (navItem.page_level == 2) {
          subNav = '<li class="'+isCurr+'">'+ tempUl +'</li>'+ subNav
        }

        if (navItem.page_level == 1) {
          if (hasCurrInSub) {
            subNav = '<ul>'+subNav+'</ul>'
            topNav = '<li class="'+isCurrParent+'">'+tempUl + subNav +'</li>'+topNav
            hasCurrInSub = false

          } else {
            topNav = '<li>'+tempUl + '</li>'+topNav
          }
          subNav = ''

        }

      }
    })
    sitedataLang[key][i].navigation_list = '<ul>'+topNav+'</ul>'
  })
}


}




function addPageSubNavigationList() {
  let tempArr = [];
  let tempUl = '';

  sitedata.slice().reverse().forEach((page, i) => {
    if (page.type == 'page') {

      if (page.page_level == 2) {
        tempUl = '<li><a href="' + page.file_name + '">' + page.title + '</a></li>' + tempUl;
        tempArr.push(sitedata.length - i)

      }
      if (page.page_level == 1) {
        tempArr.push((sitedata.length - i));
        tempArr.forEach((id, j) => {
          let tempUl2

          tempUl2 = tempUl.replace('<li><a href="' + sitedata[id - 1].file_name + '">', '<li class="currPage"><a href="' + sitedata[id - 1].file_name + '">');

          sitedata[id - 1].navigationSub_list = '<ul>' + tempUl2 + '</ul>';
        });

        tempUl = '';
        tempArr = [];
      }

    }
  })

}



function createAltPageLists() {
  for (const [key, value] of Object.entries(sitedataLang)) {
    //itedataLang[key]

    let catList = []
    let pageList = []

    // collect all categories
    sitedataLang[key].forEach((item) => {
      if (item.type != 'page') {
        catList.push(item.type)

      }
    });
    // undouble
     catList = catList.filter((v, i, a) => a.indexOf(v) === i);



     // create lists with pages
     catList.forEach((cat, i) => {
       sitedataLang[key].forEach((item) => {

         if (item.type == cat) {
           pageList.push({
             file_name: item.file_name,
             title: item.title,
             author: item.author,
             type: item.type,
             htmlContent: item.htmlContent,
             publication_date: item.publication_date,
             teaser_text: item.teaser_text,
             featured_image: item.featured_image
           })
         }
       });



       // add the list to each page

       sitedataLang[key].forEach((page, j) => {
           sitedataLang[key][j][cat]= pageList;
       });
       catList = [];
       pageList = [];

     });

  }
//console.log(sitedataLang.nl_pages[0]);
createFile('outputsite.json',JSON.stringify(sitedataLang));
}


function createLanguageToggle() {
  let langToggle=''
  for (const [key, value] of Object.entries(sitedataLang)) {
    let label = sitedataLang[key][0].language
    let link = sitedataLang[key][0].file_name
    let languageName

    switch (label) {
      case 'en':
        languageName = 'English'
        break;
      case 'nl':
        languageName = 'Nederlands'
        break;
    }
    langToggle += '<a href="'+link+'" aria-label="'+languageName+'">'+label+'</a>'
  }

  for (const [key, value] of Object.entries(sitedataLang)) {
    sitedataLang[key].forEach((page, i) => {
      sitedataLang[key][i].langToggle = langToggle
    })
  }


}




// generate files
function generateHtml() {
  for (const [key, value] of Object.entries(sitedataLang)) {
    sitedataLang[key].forEach((item) => {
      fs.readFile("src/templates/" + item.template, "utf-8", function( error, source
      ) {
        var template = handlebars.compile(source);
        var html = template(item);
        createFile(outputDir +item.file_name, html);
        //console.log(item.file_name+' created.');
      });
    });
  }
}

// create new files
function createFile(fileName, content) {
  fs.writeFile(fileName, content, function(err) {
    if (err) throw err;
  });
}

// create folders
function createFolder() {
  fs.mkdirSync(outputDir);
  fs.mkdirSync(outputDir + "/css");
  fs.mkdirSync(outputDir + "/css/v" + outputVersion + "/");
}

function uniqueGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4());
}


function onlyUniqueInArr(value, index, self) {
  return self.indexOf(value) === index;
}


function handleHtmlDom(fileContent) {
  // const dom = new JSDOM(fileContent);
  // let img = dom.window.document.querySelectorAll("img")
  //
  // dom.window.document.querySelectorAll("img").forEach((item, i) => {
  //   if (item !== null) {
  //     let altText = item.getAttribute('alt');
  //     let mfigur = dom.window.document.createElement("figure");
  //     mfigur.innerHTML = item+'<figcaption>'+altText+'</figcaption>';
  //     item.parentNode.replaceChild(mfigur, item);
  //   }
  // });

  //console.log(dom);
  return fileContent;
}
