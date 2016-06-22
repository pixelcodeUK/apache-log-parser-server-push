var fs  = require('fs'),
    url = require('url');

var stats = {};

fs.readFile('/http2_log', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.replace(new RegExp("\r", "g"),'');

  var lines = data.split("\n");
  for(var i = 0;i < lines.length;i++){
    if(lines[i].length < 2) continue;

    var parts = lines[i].split(" ");

    var referer = parts[0].replace('[','').replace(']',''),
    time        = parts[1].replace('[','') + parts[2].replace(']',''),
    method      = parts[3],
    file        = parts[4],
    protocol    = parts[5];

    var refererFile = url.parse(referer).path;

   if(referer.length > 4 && protocol.toLowerCase() === 'http/2'){
     if(!stats[refererFile]){
       stats[refererFile] = new Set();
     }
     stats[refererFile].add(file);
   }else{
     //ignore
   }
  }

  Object.getOwnPropertyNames(stats).forEach(function(val) {
    if(stats[val].has('/bower_components/polymer/polymer.html')){
      stats[val].fresh = true;
    }else{
      stats[val].fresh = false;
    }
  });

  console.log(require('util').inspect(stats, true, 3));
  //console.log(data);
});
