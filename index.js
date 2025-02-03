const btnScr = document.querySelector(".calc-screen");
const firstRow = document.querySelector(".first-row");
const numbers = document.querySelector(".numbers");
const sideRow = document.querySelector(".side-row");
const canNotBeFirst = ["/","*","%","^","=","."];
const endStageOperators = ["/","*",];
const CanBeFirst = ["+","-"];
const canNotBeLast = [".",];
let modifOne = "";
let modifTwo = "";
let fDot = false;
let sDot = false;
let plusMinus = false;
let btnId = -1;
let operationsStage = 0;
let onScreenString = "";
let Buttons = [];
let firstOp = "";
let currentOper = "";
let secondOp = "";  



onload = uiCrt ();

function uiCrt() {
    simpleNumbersCreation();
    firstRowCreation ();
    sideRowCreation ();
}

function Button (place, btnValue) {
    this.id = ++btnId;
    this.btnValue = btnValue;
    this.place = place;
    this.btnEl = document.createElement("div"),
    this.btnCr = () => {
        this.btnEl.className = `button`;
        this.btnEl.id = `b${btnId}`;
        this.btnEl.textContent = `${this.btnValue}`;
        this.btnEl.addEventListener("click", () => desider (this.btnValue));
        this.place.appendChild(this.btnEl);

    }

}

function onScreen () {
    btnScr.firstElementChild.textContent = firstOp+modifOne+" "+currentOper+" "+secondOp+modifTwo;


}

function clrScreen() {
    onScreenString = "";
    operationsStage = 0;
    btnScr.firstElementChild.textContent = "";
    firstOp = "";
    secondOp = "";
    currentOper ="";
    fDot = false;
    sDot = false;
    modifOne = "";
    modifTwo = "";

}


function simpleNumbersCreation() {
    for (let k = 1;k <= 3;k++) {
        let n;
        switch (k) {
            case 1:
                n = 7; 
                d = 9; 
                break;
            case 2:
                n = 4;
                d = 6
                break;
            default:
                n = 1;
                d = 3
                break;
        }
        for (n = n;n <= d;n++) {
            Buttons[n] = new Button (numbers, n);
            Buttons[n].btnCr();
        }
    }
    Buttons[Buttons.length] = new Button (numbers, 0);
    Buttons[Buttons.length-1].btnCr();
    Buttons[Buttons.length-1].btnEl.style.width = "210px";
    Buttons[Buttons.length] = new Button (numbers, ".");
    Buttons[Buttons.length-1].btnCr();
}   

function firstRowCreation () {
    Buttons[Buttons.length] = new Button (firstRow, "AC");
    Buttons[Buttons.length-1].btnCr();
    Buttons[Buttons.length-1].btnEl.style.backgroundColor = "orange";

    Buttons[Buttons.length] = new Button (firstRow, "/");
    Buttons[Buttons.length-1].btnCr();

    Buttons[Buttons.length] = new Button (firstRow, "*");
    Buttons[Buttons.length-1].btnCr();

    Buttons[Buttons.length] = new Button (firstRow, "^");
    Buttons[Buttons.length-1].btnCr();
}

function sideRowCreation () { 
    Buttons[Buttons.length] = new Button (sideRow, "-");
    Buttons[Buttons.length-1].btnCr();

    Buttons[Buttons.length] = new Button (sideRow, "+");
    Buttons[Buttons.length-1].btnCr();

    Buttons[Buttons.length] = new Button (sideRow, "%");
    Buttons[Buttons.length-1].btnCr();

    Buttons[Buttons.length] = new Button (sideRow, "=");
    Buttons[Buttons.length-1].btnCr();

}

function desider (symb) {
    if (symb == `AC`) {
        clrScreen();
        return;
    }

    switch (operationsStage) {
        case 0:
            firstVariable (symb);
            break;
        case 1:
            SecondVariable (symb);
            break;
        case 2:
            break;
        default:
            break;
    }
}


function firstVariable (symb) {
    if (firstOp == "") { if (canNotBeFirst.includes(symb,0)) {return}};
    if (symb == "%" && modifOne == "") {modifOne = "%"};
    if (symb == "." && fDot == false) {firstOp += symb; fDot = true;}
    if (CanBeFirst.includes(symb,0)) {plusMinus = true};
    if ((plusMinus == true && (symb == "+" || symb =="-")) || endStageOperators.includes(symb,0)) {
        currentOper = symb;
        plusMinus = false;
        operationsStage = 1};
    if (typeof symb == "number") {firstOp += symb};  
    if (symb == "^") {firstOp = Number(firstOp)* Number(firstOp)+"";}
    onScreen();
}

function SecondVariable (symb) {
    if (secondOp == "") { if (canNotBeFirst.includes(symb,0)) {return}};
    if (symb == "%" && modifTwo == "") {modifTwo = "%"};
    if (symb == "." && sDot == false) {secondOp += symb; sDot = true;}
    if (CanBeFirst.includes(symb,0)) {plusMinus = true};
    if (symb == "^") {secondOp = Number(secondOp)* Number(secondOp)+"";}
    if ((plusMinus == true && (symb == "+" || symb =="-")) || endStageOperators.includes(symb,0) || symb == "=") {
        desideOperator(symb);}
    if (typeof symb == "number") {secondOp += symb};  
    onScreen();
}

function desideOperator (symb) {

    if (modifOne == "%") {firstOp = Number(firstOp)/100;}
    if (modifTwo == "%") {secondOp = Number(secondOp)/100;}

    switch (currentOper) {

            case "/":
                firstOp = Number(firstOp)/Number(secondOp);
                break;

            case "*":
                firstOp = Number(firstOp)*Number(secondOp);
                break;

            case "-":
                firstOp = Number(firstOp)-Number(secondOp);
                break;

            case "+":
                firstOp = Number(firstOp)+Number(secondOp);
                break;

            default:
                break;

        }
    secondOp = "";
    if (symb != "=") {currentOper = symb; operationsStage = 1;}
    if (symb == "=") {currentOper = ""; operationsStage = 0;}
    firstOp = String(firstOp);
    firstOp.includes(".") ? fDot = true : fDot = false;
    sDot = false;
    modifOne = "";
    modifTwo = "";

}
