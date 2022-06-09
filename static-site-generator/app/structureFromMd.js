const fs = require("fs-extra");
const path = require("path");
let sass = require("sass");
let markdown = require("markdown").markdown;

const config = require("../../config.json");




const { readdir } = require('fs').promises;

const getFileList = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileList(`${dirName}/${item.name}`)),
            ];
        } else {
          let filename = `${dirName}/${item.name}`
          filename = filename.replace(config.dirMarkdown+'/', '')
          let fileExtention = filename.substr(filename.length - 3)

          if (fileExtention == '.md') {
            let nameParts = filename.split('/')
            files.push({lang:nameParts[0], fileName: nameParts[1]});
          }


        }
    }

    return files;
};

getFileList(config.dirMarkdown)
  .then(createSiteJson)
  .then(orderingData)
  .then(logOut)






function createSiteJson(files) {


  return new Promise((resolve, reject) => {
  //console.log(files);
  let siteData = []

  files.forEach((file, i) => {

    fs.readFile(config.dirMarkdown+'/'+file.lang + '/' + file.fileName, 'utf-8', function(error, source) {


      let fileExtention = file.fileName.substr(file.fileName.length - 3)

        let pageObj = {}

        pageObj.language = file.lang
        let level1 = file.fileName.substr(0, 2)
        let level2 = file.fileName.substr(3, 2)
        let order = '1' + level1 + level2;
        pageObj.page_order = parseInt(order)
        if (level2 != '00') {
          pageObj.page_level = 2
        } else {
          pageObj.page_level = 1
        }
        pageObj.name = file.fileName.substr(6)

        // other data
        pageObj.url = config.url
        pageObj.markup = config.markup
        pageObj.siteName = config.siteName
        pageObj.content = config.content
        pageObj.customTemplateFolder = config.customTemplateFolder

        // level



        // content of the file
        var contentArr = source.split('\n');

        // each line
        let status = '';
        let text = '';
        contentArr.forEach((mdFileRow, j) => {

          switch (status) {
            // catch first ---
            case '':
              if (mdFileRow == '---') {
                status = 'inMeta'
              } else {
                status = 'inTxt'
                text += mdFileRow + '\n';
              }
              break;

              // metadata
            case 'inMeta':
              // catch last ---
              if (mdFileRow == '---') {
                status = 'inTxt'
              } else { // store metdata
                pageObj[strToObject(mdFileRow).key] = strToObject(mdFileRow).vall
              }
              break;


              // txt
            case 'inTxt':
              text += mdFileRow + '\n';
              if ((contentArr.length - 1) == j) {
                text = markdown.toHTML(text)
                text = text.replaceAll('\n', ' ')
                text = text.replaceAll('&lt;', '<')
                text = text.replaceAll('&gt;', '>')
                pageObj.htmlContent = text
              }
              break;

          }
        }) // trough lines
        siteData.push(pageObj)
        //console.log(pageObj.title);

        // console.log('i',i);
        // console.log('f',files.length-1);

        if ( i == files.length-1) {
          resolve(siteData);
        }

    });

  });
})

}



function orderingData(siteData) {
  //console.log('func sort',siteData);
  return new Promise((resolve, reject) => {
    siteData = sortByKey(siteData, 'page_order')
    siteData = validateData(siteData)
    resolve(siteData);
  })
}



function logOut(siteData) {
  //console.log('end',siteData);
  createFile(config.dirJson+'/site.json', JSON.stringify(siteData));
}


function strToObject(str) {
  let keyVals = str.split(': ');
  return {
    key: keyVals[0],
    vall: keyVals[1]
  }
}


function sortByKey(array, key) {
  //console.log('sort',array);
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


function validateData(siteDataIm) {
  siteDataIm.forEach((siteItem, i) => {
    config.defaults.forEach((defItem, j) => {
      if (siteDataIm[i][defItem.name] === undefined) {
        siteDataIm[i][defItem.name] = defItem.val
      }
    });
    // fileName
    //console.log('filename',siteDataIm[i].title);
    let filename = siteDataIm[i].title
    filename = filename.replaceAll(' ','-')
    filename = filename.replaceAll('&','')
    if ( (siteDataIm[i].page_order == 10000) && (siteDataIm[i].language == config.languageDefault) ) {
      siteDataIm[i].file_name = 'index.html'
    } else {
      siteDataIm[i].file_name = filename.toLowerCase()+'-'+siteDataIm[i].language+'.html'
    }
  });
  return siteDataIm;
}


function createFile(fileName, content) {
  fs.writeFile(fileName, content, function(err) {
    if (err) throw err;
  });
}
