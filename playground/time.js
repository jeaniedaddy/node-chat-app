//Jan 1st 1972 00:00:10 am
//10:35 am
// unpadded for hours but padded for minutes.
var moment = require('moment');

// var time = new Date(10000);
// console.log(time);
// console.log(time.getMonth());

var date = moment();
var dateFormated = date.add(2,'hour').format('h:mm a');

console.log(dateFormated);