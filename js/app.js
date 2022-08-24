//assets import
import{ PAGE_ELEMENTS, outputValue, errorText } from "./obj.js";
import { progressBar } from "./progressbar.js";

//api call using Axios
let response;
export function findCity(){
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${PAGE_ELEMENTS.inputText.value.replace(/\s/g, '-').toLowerCase()}/scores/`)
    //positive response
    .then( resp => {
        response = resp.data;
        errorText.remove();
        PageResults();
        })
    //error response
    .catch( () => {
        errorMessage();
    });
};

//page visualize results
async function PageResults(){
    //values
    outputValue.cityName = await PAGE_ELEMENTS.inputText.value;
    outputValue.citySummary = await response.summary;
    outputValue.cityScore = await response.teleport_city_score.toFixed(0);
    outputValue.houseScoring = await response.categories.at(0).score_out_of_10.toFixed(0);
    outputValue.costOfLiving = await response.categories.at(1).score_out_of_10.toFixed(0);
    outputValue.StartupScoring = await response.categories.at(2).score_out_of_10.toFixed(0);
    //print the value in the html page
    PAGE_ELEMENTS.outputSection.className = "output-section";
    PAGE_ELEMENTS.outputSection.innerHTML = 
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
    PAGE_ELEMENTS.form.appendChild(errorText);
    errorText.innerHTML = 'Try another city';
    PAGE_ELEMENTS.outputSection.className = "output-section-hidden";
}