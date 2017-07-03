var request = require('request');
var fs = require('fs');

var myArgs = process.argv.slice(2);
var owner = myArgs[0];
var name = myArgs[1];

if (!myArgs [0] || !myArgs [1]){ //If the request is incorrect
  console.log('Error! Please submit request in the form: "node download_avatars.js <owner> <repo>".')
  return
}


getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

//Downoad image
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) { //if there is an error requesting the data
    throw err;
  })
  .on('response', function (response) { //display status of downloads
    console.log('Download for ' + filePath + ' complete.');
  })
  .pipe(fs.createWriteStream(filePath)); //save avatar images in folder with user's name
}

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
        var avatarURL = json[user].avatar_url;
        var desiredFilePath = './avatars/' + json[user].login + '.jpg';
        downloadImageByURL(avatarURL, desiredFilePath);
      }
    }
  });
}


