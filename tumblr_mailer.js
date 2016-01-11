var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv", 'utf8');
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');
var tumblr = require('tumblr.js');
// console.log(tumblr);

// var client = tumblr.createClient({
//   consumer_key: 'aGfdvJ9DIScJZZRsrAcLRcvjLJsIYxaTInHrCfyUIYa4Hr8X9d',
//   consumer_secret: 'XtisqWxDJXQfX4NpyqmfwCFaIkMxubGh9817lwtuyyPNIEJf9u',
//   token: '5F8ucqgeuOyQfFdqgIK7WHgtROA9ydWfGR6i7rEir7sCIggC1T',
//   token_secret: 'ugjQopD6G1yhnnzQgi44pwhDe4Y57jq3qNERgp3pLjSstGfiPj'
// });

var client = tumblr.createClient({
  consumer_key: 'dOwkuNgMVXdvPoo1TNLskd12rhsRAcrWxYUo9JZbUtmykQCzE6',
  consumer_secret: 'CJsGitoyyao4dzJIkbDHPwqap9YNHUm51MbBqoSYnLbsUzsnzW',
  token: 'pk6e6ImTTmhcTxAMKN7o19vNlrgcZSunzyL8H61HecJZg09Fpo',
  token_secret: 'OK7yImVZYB9JN9RjdYkrTVJU6Ig0axA04DVb5YyMsQp8g60E0E'
});

console.log(client);

client.userInfo(function (err, data) {
	console.log(err);
    console.log(data);
});

client.posts('HOST_NAME_OF_BLOG - ex: myblog.tumblr.com', function(err, blog){
  console.log(blog);
})

var csvParse = function(csvFile) {
	var result = [];
	// Split the file into array of lines
	var arr = csvFile.split('\n');
	var newObj;
	// firstName,lastName,numMonthsSinceContact,emailAddress
	keys = arr.shift().split(",")

	for( var i = 0; i < arr.length; i++) {
		// Split each line into array of 4 elements
		var linesArr = arr[i].split(',');
		// Create new object for each line
		newObj = {}
		for(var j = 0; j < linesArr.length; j++) {
			newObj[keys[j]] = linesArr[j];
		}
		result.push(newObj);
	}
	return result;
}

var friendList = csvParse(csvFile);

friendList.forEach(function (row) {

	var firstName = row['firstName'];
	var numMonthsSinceContact = row['numMonthsSinceContact'];

	var templateCopy = emailTemplate;

	templateCopy = templateCopy.replace(/FIRST_NAME/gi, firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

// 	console.log(templateCopy);
// })


// var customizedTemplate = ejs.render(emailTemplate, { 
// 	firstName: firstName,
// 	numMonthsSinceContact: numMonthsSinceContact;
// });

