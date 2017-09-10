//requires file system package to write cards
var fs = require("fs");

var inquirer = require("inquirer");

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var correct = 0;
var wrong = 0;


//create the inquirer to get info from the user
inquirer.prompt([{
  name: "command",
  message: "What would you like to do?  Choose add-card or show-cards or end",
  type: "List",
  //inside the list are the coices given to the user
  choices: [{
    name: "add-card"
  }, {
    name: "show-cards"
  }]


}]).then(function(answers) {
  //calls the function to add the cards to the deck
  if (answers.command === "add-card") {
    addCard();
    ///calls function to play the game
  } else if (answers.command === "show-cards") {
    showCards();
  }
});

//FUNCTION TO ADD THE CARDS TO THE DECK

var addCard = function() {
  //gets user input
  inquirer.prompt([{
    name: "cardType",
    message: "Do you want the basic set or the cloze set?",
    type: "list",
    choices: [{
      name: "basic"
    }, {
      name: "cloze"
    }]

    //function generates chosen card type answers with question

  }]).then(function(answers) {
    if (answers.cardType === "basic") {
      ///this allows user to input the question for the card and answers
      inquirer.prompt([{
        name: "front",
        message: "What is your question?",
      }, {
        name: "back",
        message: "What is the answer?",

      }]).then(function(answers) {
        var newBasic = new BasicCard(answer.front, answer.back);
        newBasic.create();
        whatsNext();
      });
    } else if (answers.cardType === "cloze") {
      inquirer.prompt([{
        name: 'text',
        message: 'What is the full text?',

      }, {
        name: "cloze",
        message: "What part of the statement do you want hidden?",

      }]).then(function(answers) {
        var text = answers.text;
        var cloze = answers.cloze;
        if (text.includes(cloze)) {
          var newCloze = new ClozeCard(text, cloze);
          newCloze.create();
          whatsNext();
        } else {
          console.log("The cloze portion of your answer is not found in the question. Please try again");
          addCard();
        }
      });
    };
    ///FUNCTION FOR CONTINUED ACTIONS AFTER ADDING OR VIEWING CARDS
    var whatsNext = function() {
      inquirer.prompt([{
        name: "nextAction",
        message: "What would you like to do next? Answer: create-new-card, show-cards, OR end",
        type: "list",
        choices: [{
          name: "create-new-card"
        }, {
          name: "show-cards"

        }, {
          name: "end"
        }]

      }]).then(function(answers) {
        if (answers.nextAction === "create-new-card") {
          addCard();
        } else if (answers.nextAction === "show-cards") {
          showCards();
        } else if (answers.nextAction === "end") {
          return;
        }

      });
    };

    ///FUNCTION FOR SHOWING THE cards

    var showCards = function() {
      //reads the txt file
      fs.readFile('./log.txt', 'utf8', function(error, data) {
        if (error) {
          console.log('Error occurred: ' + error);
        }
        var questions = data.split(";");
        var nempty = function(value) {
          return value;
        };
        questions = questions.filter(empty);
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestion(questions, count);
      });
    };
    var showQuestion = function(array, index) {
      question = array[index];
      var parsedQuestion = JSON.parse(question);
      var questionText;
      var correctReponse;
      if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
      } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
      }
      inquirer.prompt([{
        name: 'response',
        message: questionText
      }]).then(function(answer) {
        if (answer.response === correctReponse) {
          correct++;
          console.log('Correct!');
          if (index < array.length - 1) {
            showQuestion(array, index + 1);
          }
        } else {
          wrong--;
          console.log('Try Again!');
          if (index < array.length - 1) {
            showQuestion(array, index + 1);
          }
        }
      });
    };
  })
}

//Pseudocode
///find out why getting unhandled promise when cloze is chosen
//also getting unhandlend promis when asked to show cards
//cpounters for correct and wrong answers
//correct this error:  What would you like to do?  Choose add-card or show-cards or end add-card
// ? Do you want the basic set or the cloze set? basic
// ? What is your question? what color is the sky?
// ? What is the answer? blue
// (node:2248) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): ReferenceError: newBasicCard is not defined
// (node:2248) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code

//? What would you like to do?  Choose add-card or show-cards or end show-cards
// (node:2257) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): ReferenceError: showCards is not defined
// (node:2257) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
