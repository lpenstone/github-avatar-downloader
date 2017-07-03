var request = require('request');
var fs = require('fs');

var myArgs = process.argv.slice(2);
var owner = myArgs[0];
var name = myArgs[1];


getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


function getRepoContributors(repoOwner, repoName, callback) {
  var GITHUB_USER = "lpenstone";
  var GITHUB_TOKEN = "84e700921c00da35fa0bd0e885a827f855b671bd";
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';


  var options = {
    url: requestURL,
    headers: {'user-agent': 'lpenstone'},
  };



  request(options, function(err, response, body){
    if (err){
      console.log('Error fetching:', err);
      return
    }
    if (response.statusCode === 200) { //if the response if requested properly without error
      var json = JSON.parse(body);

      var dir = './avatars'; //Create a new avatars folder if one doesn't exist
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      for (var user in json){ //get avater URL and name for each contributor
        var avatar = json[user].avatar_url;
        var name = json[user].login;
        downloadImageByURL(avatar, name);
      }
    }
  });
}

//Downoad image
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) { //if there is an error requesting the data
    throw err;
  })
  .on('response', function (response) { //display status of downloads
    console.log('Response Status Code for ' + filePath + ': ' + response.statusMessage + '\nContent Type: ' + response.headers['content-type']);
    console.log('Download complete.');
  })
  .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg')); //save avatar images in folder with user's name
}

