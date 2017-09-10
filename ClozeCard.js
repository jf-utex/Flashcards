
//console.log ("cloze connected");
//used to make sure files were loading

//NEED FS TO ACESS A FILE SYSTEM
var fs = require("fs");

//REQUIRE THE CONSTRUCTOR CLOZECARD
module.exports = ClozeCard;

//CONSTRUCTOR FOR THE CLOZECARD

function ClozeCard(text, cloze){
//why are these closed with ; instead of ,???
  this.text = text;
  this.cloze = cloze;
  this.clozeDeleted = this.text.replace(this.cloze, "________");
  this.create = function(){
    var data = {
      text: this.text,
      cloze: this.cloze,
      clozeDeleted: this.clozeDeleted,
      type: "cloze"
    };
    //add card to log.text
    fs.appendFile("log.txt", JSON.stringify(data) + ';', "utf8", function(error){
      if (error){
        console.log(error);
      };
    });
  };

};
