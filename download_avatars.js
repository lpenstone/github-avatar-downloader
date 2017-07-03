var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, callback) {
  var GITHUB_USER = "lpenstone";
  var GITHUB_TOKEN = "84e700921c00da35fa0bd0e885a827f855b671bd";
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);
}