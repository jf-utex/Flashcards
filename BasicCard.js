
//REQUIRES package for file system
var fs = require('fs');
module.exports = BasicCard;
//generates basic flashcard
function BasicCard(front, back){
  this.front = front;
  this.back = back;
  this.create = function(){
    var data = {
      front: this.front,
      back: this.back,
      type: "basic",
    };
    //add card to log.text
    fs.appendFile("log.txt", JSON.stringify(data) + ";", "utf8", function(error){
      if (error){
        console.log(error);
      }
    });
  };
}
