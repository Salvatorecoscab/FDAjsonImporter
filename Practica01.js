//npm install prompt-sync
let option;
let filename = "";
let newADF;
let alphabet = [];
let states = [];
let initialState = "";
let finalStates = [];
let transitionsTable = [];
const prompt = require("prompt-sync")({ sigint: true });
function menu() {
    try{
        newADF=readFile(filename);
         alphabet = newADF.alphabet;
         states = newADF.states;
         initialState = newADF.initialState;
         finalStates = newADF.finalStates;
         transitionsTable = newADF.transitionsTable;
    }
    catch(e){
        console.log("File not imported");
    }
    console.log("Menu");
    console.log("1. Import FDA");
    console.log("2. Introduce word");
    console.log("3. Exit");
}
function switchOption(option) {
    switch (option) {
        case "1":
            console.log("Introduce the filename: ");
            filename=importFDA();
        break;
        case "2":
            if(newADF==undefined){
                console.log("You must import a file first");
                break;
            }
            verifyWord(introduceWord());
            
        break;
        case "3":
            console.log("Exit");
        break;
        default:
            console.log("Option not valid");
        break;
    }
}
//function that reads a file
function readFile(filename) {
    const readline = require("readline");
    const fs = require("fs");
    const ADF = filename;
    const newADF = JSON.parse(fs.readFileSync(ADF, "utf8"));
    return newADF;
}
function importFDA() {
    let name="";
    name = prompt("Write the path of the JSON file:");
    console.log(`The path is ${name}`);
    return name;
}
function introduceWord() {
    let word="";
    word = prompt("Write the word:");
    console.log(`The word is ${word}`);
    return word;
}
function verifyWord(word) {
    let currentState = initialState;
            while (word.length > 0) {
                let currentSymbol = word.charAt(0);
                if (!alphabet.includes(currentSymbol)) {
                    console.log(
                        "🛑You have introduced an invalid character🛑"
                    );
                    currentState = undefined;
                    break;
                }
                word = word.substring(1);
                let nextState = transitionsTable[currentState][currentSymbol];
                console.log("nextState: " +nextState + " " + "currentState: " + currentState + " " + "currentSymbol: " +currentSymbol +" " + "word: " + word);
                if (nextState == undefined) {
                    console.log(
                        "🛑The word is not accepted because the transition is not defined🛑"
                    );
                    break;
                }
                currentState = nextState;
            }
            if (finalStates.includes(currentState)) {
                console.log("✅The word is accepted✅");
            } else {
                console.log("❌The word is not accepted❌");
            }
}

function main() {
    do{
        console.log("\n\n\n==================================")
        menu();
        option = prompt("Select an option:");
        console.log(`Your option is ${option}`);
        switchOption(option);
    }while(option != 3);
}
main();