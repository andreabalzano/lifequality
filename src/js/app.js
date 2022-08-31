//assets import
import { progressBar } from "./progressbar.js";

//html page elements
const pageElements = {
    inputText: document.getElementById('cinput'),
    inputButton: document.getElementById('cbutton'),
    outputSection: document.getElementById('coutput'),
    form: document.querySelector('.search')
}
//value from axios
export let outputValue = {};
//text to create in case of error
let errorText = document.createElement('p');
let loaderIcon = document.createElement('div');


//form submit event
pageElements.form.addEventListener('submit', async function(e){
    e.preventDefault();
    clearData();
});

function clearData(){
    pageElements.outputSection.className = "";
    pageElements.outputSection.innerHTML = "";
    outputValue = {};
    response = "";
    errorText.remove();
    loadingStatus();
}

//loading status
function loadingStatus() {
    loaderIcon.className = "data-loader";
    pageElements.form.appendChild(loaderIcon);
    findCity();
}

//api call using Axios
let response;
function findCity(){
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${pageElements.inputText.value.replace(/\s/g, '-').toLowerCase()}/scores/`)
    //positive response
    .then( resp => {
        response = resp.data;
        })
    .finally(() => {
        loaderIcon.remove();
        PageResults();
    })
    //error response
    .catch( () => {
        errorMessage();
    });
};

//page visualize results
function PageResults(){
    //values
    outputValue.cityName = pageElements.inputText.value;
    outputValue.citySummary = response.summary;
    outputValue.cityScore = response.teleport_city_score.toFixed(0);
    outputValue.houseScoring = response.categories.at(0).score_out_of_10.toFixed(0);
    outputValue.costOfLiving = response.categories.at(1).score_out_of_10.toFixed(0);
    outputValue.StartupScoring = response.categories.at(2).score_out_of_10.toFixed(0);
    //print the value in the html page
    pageElements.outputSection.className = "output-section";
    pageElements.outputSection.innerHTML =
            `
            <h2>${outputValue.cityName}</h2>
            <div class="card">
                <p>${outputValue.citySummary}</p>
                <div class="value-container">
                    <div class="card-box"><p>City Score:</p></div>
                    <div class="card-box" id="roundbox"><p>${outputValue.cityScore}</p></div>
                </div>
            </div>
            <div class="other-values">
                <div class="score-parameter">
                    <h3>House Scoring</h3>
                    <div class="card">
                        <div class="shadow">
                            <div class="progressbar" id="pbar1"></div>
                            <div class="center-circle">
                                <p id="vnumber1">0</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="score-parameter">
                        <h3>Cost of Living</h3>
                        <div class="card">
                            <div class="shadow">
                                <div class="progressbar" id="pbar2"></div>
                                <div class="center-circle">
                                    <p id="vnumber2">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="score-parameter">
                        <h3>Startup Scoring</h3>
                        <div class="card">
                            <div class="shadow">
                                <div class="progressbar" id="pbar3"></div>
                                <div class="center-circle">
                                    <p id="vnumber3">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>`;
    progressBar();
}

//error message visualize
function errorMessage(){
    errorText.className = 'error-message';
    pageElements.form.appendChild(errorText);
    errorText.innerHTML = 'Try another city';
    pageElements.outputSection.className = "output-section-hidden";
    loaderIcon.remove();
    location.reload();
}