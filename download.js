var http = require("http");

// Utility function to download url and invoke a callback
function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on("end", function() {
			callback(data)
		});
	}).on("error",function() {
		callback(null);
	});
}

var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html";

var cheerio = require("cheerio");

download(url, function(data) {
	if(data){
		//console.log(data);
		var fs = require('fs');
		var output = [];
		
		var $ = cheerio.load(data);
		$("div.artSplitter > img.blkBorder").each(function(i, e) {
			output.push($(e).attr("src"));
		});
		
		fs.writeFile("tempResults/result", output.join('\n'), function (err) { if(err) console.log(err); console.log("Done!");});
		
		console.log("done!");
	} else {
		console.log("error");
	}
});