//import assets
import { outputValue } from "./app.js";

let progressBarElements = {};

//create the progress bar for visualize the number data
export function progressBar(){    
    //define the html elements of p.bar
    progressBarElements.drotate1 = document.getElementById('pbar1');
    progressBarElements.drotate2 = document.getElementById('pbar2');
    progressBarElements.drotate3 = document.getElementById('pbar3');
    progressBarElements.number1 = document.getElementById('vnumber1');
    progressBarElements.number2 = document.getElementById('vnumber2');
    progressBarElements.number3 = document.getElementById('vnumber3');

    //progressbar 1
    let degree1 = (225*outputValue.houseScoring)/10;
    progressBarElements.number1.innerHTML = `${outputValue.houseScoring}`;
    progressBarElements.drotate1.style.transform = `rotate(${degree1}deg)`;

    //progressbar 2
    let degree2 = (225*outputValue.costOfLiving)/10;
    progressBarElements.number2.innerHTML = `${outputValue.costOfLiving}`;
    progressBarElements.drotate2.style.transform = `rotate(${degree2}deg)`;

    //progressbar 3
    let degree3 = (225*outputValue.StartupScoring)/10;
    progressBarElements.number3.innerHTML = `${outputValue.StartupScoring}`;
    progressBarElements.drotate3.style.transform = `rotate(${degree3}deg)`;
};