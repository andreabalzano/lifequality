//import assets
import { progressbar, outputValue } from "./obj.js";

//create the progress bar for visualize the number data
export function progressBar(){    
    //define the html elements of p.bar
    progressbar.drotate1 = document.getElementById('pbar1');
    progressbar.drotate2 = document.getElementById('pbar2');
    progressbar.drotate3 = document.getElementById('pbar3');
    progressbar.number1 = document.getElementById('vnumber1');
    progressbar.number2 = document.getElementById('vnumber2');
    progressbar.number3 = document.getElementById('vnumber3');

    //progressbar 1
    let degree1 = (225*outputValue.houseScoring)/10;
    progressbar.number1.innerHTML = `${outputValue.houseScoring}`;
    progressbar.drotate1.style.transform = `rotate(${degree1}deg)`;

    //progressbar 2
    let degree2 = (225*outputValue.costOfLiving)/10;
    progressbar.number2.innerHTML = `${outputValue.costOfLiving}`;
    progressbar.drotate2.style.transform = `rotate(${degree2}deg)`;

    //progressbar 3
    let degree3 = (225*outputValue.StartupScoring)/10;
    progressbar.number3.innerHTML = `${outputValue.StartupScoring}`;
    progressbar.drotate3.style.transform = `rotate(${degree3}deg)`;
};