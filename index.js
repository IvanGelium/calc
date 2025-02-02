const btnScr = document.querySelector(".calc-screen");
const firstRow = document.querySelector(".first-row");
const numbers = document.querySelector(".numbers");
const sideRow = document.querySelector(".side-row");
let btnId = -1;
let onScreenString = "";
let Buttons = [];
let firstOp = "";
let secondOp = "";  
let isSecond = false;
let isDot = false; 


onload = uiCrt ();

function uiCrt() {
    simpleNumbersCreation();
    firstRowCreation ();
    sideRowCreation ();
}

function btnMutate () {
    
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

function onScreen (symb) {
    onScreenString += symb;
    btnScr.firstElementChild.textContent = onScreenString;


}

function clrScreen() {
    onScreenString = "";
    btnScr.firstElementChild.textContent = onScreenString;
    isDot = false;
    isSecond1 = false;
    firstOp = "";
    secondOp = "";

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

    if (isSecond == false) {
        if (symb == ".") {
            if  (onScreenString == "") {
                return;
            }
    
            if (isDot == true) {
                return;
            }
    
            if (onScreenString > "") {
                isDot = true;
                onScreen(symb);
    
            }
        }
        
        if (typeof symb == "number") {
            onScreen(symb);
        }
    }

    if (isSecond == true) {
        if (symb == ".") {
            if  (secondOp == "") {
                return;
            }
    
            if (isDot == true) {
                return;
            }
    
            if (secondOp > "") {
                isDot = true;
                secondOp += symb;
                onScreen(symb);
    
            }
        }
        
        if (typeof symb == "number") {
            secondOp += symb;
            onScreen(symb);
        }
    }

    if (typeof symb == 'string') {
        switch (symb) {

            case "/":
                if (onScreenString == "") {
                    return;
                }

                if (isSecond == false) {
                    firstOp = Number(onScreenString);
                    onScreen(symb);
                    isSecond = true;
                    isDot = false;
                    return;
                }

                if (isSecond == true) {
                    onScreenString = "";
                    isDot = false;
                    firstOp = firstOp/secondOp; 
                    secondOp = "";
                    onScreen(firstOp);
                }


                break;
            case "*":
                break;
            case "^":
                break;
            case "-":
                break;
            case "+":
                break;
            case "%":
                break;
            default:
                break;

        }
    }

}


