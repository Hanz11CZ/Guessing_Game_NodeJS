const readLine = require("readline");
const readLineInterface = readLine.createInterface(process.stdin, process.stdout);

function ask(theThingToAsk) {
    return new Promise((resolve,reject) => {
        readLineInterface.question(theThingToAsk,resolve);
    });
}

start();
function rangeNum(min, max) {
    return Math.round(Math.random()*(max-min)+min);
}
async function start() {
    let startingNumber = Math.round(Math.random()*100);
    var numSubstracted = 0;
    var HighestNumTheySaidTheirIsLower = 100;
    var lowestNumTheySaidTheirIsHigher = 0;
    const introduction = await ask("\n\n1) Think of a random number between 1 and 100 (yes, it can be both 1 and 100).\n2) I'm gonna guess the number and you are gonna say whether your number is higher, lower or just the right one.\n3) Is it okay? (yes/no)\n");
    if (introduction == "no") {
        console.log("..Then ask me directly to explain it more - hit me on jsobotka@centrum.cz.");
        process.exit();
    } else if (introduction == "yes") {
        for (let quess=0; quess<100;quess++) {
            let higherOrLower = await ask("Is your number higher, lower or 'just the right one' as this one? "+startingNumber);
            if (higherOrLower == "lower") {
                let max = startingNumber-lowestNumTheySaidTheirIsHigher;
                if (startingNumber <= HighestNumTheySaidTheirIsLower) {
                    HighestNumTheySaidTheirIsLower = startingNumber;
                };
                numSubstracted = rangeNum(1,max);
                startingNumber -= numSubstracted;
            } else if (higherOrLower == "higher") {
                if (numSubstracted == 0) {
                    startingNumber += rangeNum(numSubstracted,100);
                } else {
                    let max = HighestNumTheySaidTheirIsLower-startingNumber;
                    if (startingNumber >= lowestNumTheySaidTheirIsHigher) {
                        lowestNumTheySaidTheirIsHigher = startingNumber;
                    };
                    startingNumber += rangeNum(1,max);
                }
            } else if (higherOrLower == "just the right one") {
                console.log("hurray!!")
                process.exit();
            } else {
                console.log("\n   I am not that clever to understand every Human word.\n\n    Please type in 'higher','lower' or 'just the right one'.\n");
                continue;
            }       
        }
        process.exit();
    } else {
        console.log("You were supposed to say either 'yes' or 'no', nothing else :(\nTry again next time...");
        process.exit();
    }   
}