const handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
let sass = require("sass");
let markdown = require("markdown").markdown;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const config = require("../../config.json");
const sitedata = require("../../content/data/site.json");
const outputDir = config.dirOutput;
//const markdownDir = "content/markdown/";
const outputVersion = 1;
//const partialsDir = ['./src/components'];
let partialsDir = './src/components';
let sitedataLang = {}


// custom templates
const customTemplate = {}
customTemplate.status = false
if ( typeof config.customTemplateFolder !== "undefined")  {
  if ( config.customTemplateFolder !== '')  {
    customTemplate.status = true
    customTemplate.path = config.customTemplateFolder
  }

}


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
    .then(partialListDefaultTempl)
    .then(partialListCustomTempl)
    .then(registerPartials)
    .then(homeExpertiseList) // di specific

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

  //createSass("src/scss/editor.scss");
  if (customTemplate.status) {
    templPath = config.dirContent +'/template/'+ customTemplate.path+'/scss/additional.scss'
    createSass(templPath);
  }

  createSass("src/scss/style.scss");
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



function partialListDefaultTempl() {
  let partialPathList = []
    return new Promise((resolve, reject) => {
      fs.readdir(partialsDir, function (err, files) {
        files.forEach((item, i) => {
          partialPathList.push(partialsDir+'/'+item)
        });

        resolve(partialPathList);
      })
    });
}

function partialListCustomTempl(fileList) {
  if (customTemplate.status) {
    const dir = config.dirContent + '/template/' +config.customTemplateFolder+'/components'
    return new Promise((resolve, reject) => {
      fs.readdir(dir, function (err, files) {
        files.forEach((item, i) => {
          fileList.push(dir+'/'+item)
        });
        resolve(fileList);
      })
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(fileList);
    });
  }
}


function registerPartials(partiList) {
  return new Promise((resolve, reject) => {
    //resolve(fileList);
    partiList.forEach((item, i) => {

      fs.readFile(item, 'utf8', function(err, data){
        let fileNameArr = item.split('/')
        let fileNameExt = fileNameArr.at(-1)
        let fileName = fileNameExt.replace('.html', '')

        handlebars.registerPartial(
          fileName,
          data
        );

        if ( i == partiList.length-1) {
          resolve('yo');
        }
      });
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
  //
  for (const [key, value] of Object.entries(sitedataLang)) {

    let parentPageName = '';
    let parentPageLink = '';
    let parentPageLevel = 1;

    sitedataLang[key].forEach((page, i) => {
      let breadCrumb = '<a href="index.html">Home</a> ';
      let currPage = '<span class="breadCrumb__seperator">|</span> <span>' + page.title + '</span>'

      if (page.page_level == 1) {
        // if top level
        breadCrumb += currPage;
        parentPageName = page.title
        parentPageLink = page.file_name

      } else if (page.page_level = 2) {
        // if subpage
        //breadCrumb += '<span class="breadCrumb__seperator">|</span> <a href="' + parentPageLink + '">' + parentPageName + '</a> ' + currPage;

        if (page.type == 'feature') {
          breadCrumb += '<span class="breadCrumb__seperator">|</span> <span>' + page.title + '</span>'
        } else {
          breadCrumb += '<span class="breadCrumb__seperator">|</span> <a href="' + parentPageLink + '">' + parentPageName + '</a> ' + currPage;
        }

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
    let lastLink = '';

    // generate list
    sitedataLang[key].slice().reverse().forEach((navItem, j) => {

      if (  (navItem.type == 'page')  &&  (navItem.publish !== 'false')  ) {


      let isCurr = '';
      let isCurrParent = ' navIsCurrentParent';

      if (page.title == navItem.title) {
        hasCurrInSub = true;
        isCurr = ' navIsCurrentPage';
      }

        let tempUl = '<a href="' + navItem.file_name + '" >' + navItem.title + '</a>';
        if (navItem.page_level == 2) {
          subNav = '<li class="'+isCurr+'">'+ tempUl +'</li>'+ subNav
        }

        if (navItem.page_level == 1) {

          if (navItem.directSubpages) {
            tempUl = '<a href="' + lastLink + '" >' + navItem.title + '</a>';
          }

          if (hasCurrInSub) {
            subNav = '<ul>'+subNav+'</ul>'
            topNav = '<li class="'+isCurrParent+'" >'+tempUl + subNav +'</li>'+topNav
            hasCurrInSub = false

          } else {
            let subClass= ''
            if (subNav != '') {
              subNav = '<button class="subMenuButton" id="'+navItem.title.toLowerCase()+'" aria-label="Open submenu for '+navItem.title+'"><svg viewBox="0 0 30 30" class="openArrow"> <polygon points="0,0 30,15 0,30" class="svgArrow"/> </svg></button><ul id="sub_'+navItem.title.toLowerCase()+'" class="subnav">'+subNav+'</ul>'
              subClass= 'subLi'
            }
            topNav = '<li class="'+subClass+'" id="parent_' + navItem.title.toLowerCase() + '">'+tempUl + subNav + '</li>'+topNav
          }
          subNav = ''

        }

        lastLink = navItem.file_name;

      }
    })
    sitedataLang[key][i].navigation_list = '<ul>'+topNav+'</ul>'
  })
}


}










//di specific
function homeExpertiseList() {
  let subPages = []
  let subPagesStore = ''

  for (const [key, value] of Object.entries(sitedataLang)) {
  sitedataLang[key].reverse().forEach((page, i) => {
    if (page.type == 'page') {


      if (page.page_level == 2) {
        subPages.push({
          title:page.title,
          summary: page.summary,
          file_name: page.file_name,
          featured_image: page.featured_image,
        })

      }
      if (page.page_level == 1) {
        if (page.title == 'Expertise') {
          subPagesStore = subPages.reverse()
        }
        else {
          subPages = []
        }
      }
    }

    })
    sitedataLang[key].forEach((page, j) => {
      sitedataLang[key][j].expertise = subPagesStore
    })
  }






  //createFile('outputsite.json',JSON.stringify(sitedataLang));
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
           let publication_dateToGet='2022-01-01'
           if (item.publication_date !== undefined) {
             publication_dateToGet = item.publication_date
           }
           const pubDate = new Date(publication_dateToGet);
           const unixTimestamp = Math.floor(pubDate.getTime() / 1000);


           pageList.push({
             file_name: item.file_name,
             title: item.title,
             author: item.author,
             type: item.type,
             htmlContent: item.htmlContent,
             publication_date: item.publication_date,
             dateOrder: unixTimestamp,
             summary: item.summary,
             featured_image: item.featured_image
           })
         }
       });

       pageList = sortByKey(pageList, 'dateOrder')
       pageList = pageList.reverse()



       // add the list to each page

       sitedataLang[key].forEach((page, j) => {
           sitedataLang[key][j][cat]= pageList;
       });
       catList = [];
       pageList = [];

     });

  }
//console.log(sitedataLang.nl_pages[0]);
//createFile('outputsite.json',JSON.stringify(sitedataLang));
}


function createLanguageToggle() {
  let langToggle=''
  for (const [key, value] of Object.entries(sitedataLang)) {
    let label = findInArray(sitedataLang[key], 10000, 'page_order', 'language')
    let link = findInArray(sitedataLang[key], 10000, 'page_order', 'file_name')


    let languageName

    switch (label) {
      case 'en':
        languageName = 'English'
        break;
      case 'nl':
        languageName = 'Nederlands'
        break;
      case 'fr':
        languageName = 'Français'
        break;
      case 'de':
        languageName = 'Deutsch'
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
  let templPath = 'src/templates/'
  if (customTemplate.status) {
    templPath = config.dirContent +'/template/'+ customTemplate.path+'/templates/'
  }

  for (const [key, value] of Object.entries(sitedataLang)) {
    sitedataLang[key].forEach((item) => {
      fs.readFile(templPath + item.template, "utf-8", function( error, source
      ) {
        var template = handlebars.compile(source);
        var html = template(item);
        html = handleHtmlDom(html);
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
  const dom = new JSDOM(fileContent);
  let img = dom.window.document.querySelectorAll(".read img")
  //console.log('img', img);


  for (var i = 0; i < img.length; i++) {

    if (img[i] !== null) {
      let altText = img[i].getAttribute('alt');
      let mfigur = dom.window.document.createElement("figure");
      mfigur.innerHTML = img[i].outerHTML+'<figcaption>'+altText+'</figcaption>';
      img[i].parentNode.replaceChild(mfigur, img[i]);
    }
  }

  return dom.serialize();
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function findInArray(arr, val, objectNameCompare, objectOut) {
  var out;
  for (var i = 0; i < arr.length; i++){
    if (arr[i][objectNameCompare] == val){
      out = arr[i][objectOut];
    }
  }
  return out;
}
