//documents elements aquisition
const PAGE_ELEMENTS = {
    inputText: document.getElementById('cinput'),
    inputButton: document.getElementById('cbutton'),
    outputSection: document.getElementById('coutput'),
    form: document.querySelector('.search')
}
let errorText = document.createElement('p');
let response;


//form submit event
PAGE_ELEMENTS.form.addEventListener('submit', async function(e){
    e.preventDefault();
    findCity();
});

//api call using Axios
function findCity(){
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${PAGE_ELEMENTS.inputText.value.replace(/\s/g, '-').toLowerCase()}/scores/`)
    //positive response
    .then( resp => {
        response = resp.data;
        errorText.remove();
        PageResults();
        })
    //error response
    .catch(err => {
        errorMessage();
    });
};

//page visualize results
async function PageResults(){
    //values
    const OUTPUT_VALUES = {
        cityName: await PAGE_ELEMENTS.inputText.value,
        citySummary: await response.summary,
        cityScore: await response.teleport_city_score.toFixed(0),
        houseScoring: await response.categories.at(0).score_out_of_10.toFixed(0),
        costOfLiving: await response.categories.at(1).score_out_of_10.toFixed(0),
        StartupScoring: await response.categories.at(2).score_out_of_10.toFixed(0)
    };
    //print the value in the html page
    PAGE_ELEMENTS.outputSection.className = "output-section";
    PAGE_ELEMENTS.outputSection.innerHTML = 
            `
            <h2>${OUTPUT_VALUES.cityName}</h2>
            <div class="card">
                <p>${OUTPUT_VALUES.citySummary}</p>
                <div class="value-container">
                    <div class="card-box"><p>City Score:</p></div>
                    <div class="card-box" id="roundbox"><p>${OUTPUT_VALUES.cityScore}</p></div>
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

    //create the progress bar for visualize the number data
    const PROGRESSBAR = {
        drotate1: document.getElementById('pbar1'),
        drotate2: document.getElementById('pbar2'),
        drotate3: document.getElementById('pbar3'),
        number1: document.getElementById('vnumber1'),
        number2: document.getElementById('vnumber2'),
        number3: document.getElementById('vnumber3'),
    }
    //progressbar 1
    let degree1 = (225*OUTPUT_VALUES.houseScoring)/10;
    PROGRESSBAR.number1.innerHTML = `${OUTPUT_VALUES.houseScoring}`;
    PROGRESSBAR.drotate1.style.transform = `rotate(${degree1}deg)`;
    PROGRESSBAR.drotate1.style.transition = '4s';
    //progressbar 2
    let degree2 = (225*OUTPUT_VALUES.costOfLiving)/10;
    PROGRESSBAR.number2.innerHTML = `${OUTPUT_VALUES.costOfLiving}`;
    PROGRESSBAR.drotate2.style.transform = `rotate(${degree2}deg)`;
    PROGRESSBAR.drotate2.style.transition = '4s';
    //progressbar 3
    let degree3 = (225*OUTPUT_VALUES.StartupScoring)/10;
    PROGRESSBAR.number3.innerHTML = `${OUTPUT_VALUES.StartupScoring}`;
    PROGRESSBAR.drotate3.style.transform = `rotate(${degree3}deg)`;
    PROGRESSBAR.drotate3.style.transition = '4s';
}

//error message visualize
function errorMessage(){
    errorText.className = 'error-message';
    PAGE_ELEMENTS.form.appendChild(errorText);
    errorText.innerHTML = 'Try another city';
}
