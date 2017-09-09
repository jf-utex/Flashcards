//determines if user wants to form basic or cloze style flashcards.
//info from command line to add or play
var command1 = process.argv[2];
//requires file system package to write cards
var fs = require("fs");

if (command1 === "basic") {
  var basic = require("./BasicCard.js");
  basic();

} else if (command1 === "cloze") {
  var cloze = require("./cloze.js");
  cloze();
} else {
  console.log("You came to the wrong place - find another app");
}
