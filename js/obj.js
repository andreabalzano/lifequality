//html page elements
const PAGE_ELEMENTS = {
    inputText: document.getElementById('cinput'),
    inputButton: document.getElementById('cbutton'),
    outputSection: document.getElementById('coutput'),
    form: document.querySelector('.search')
}
//value from axios
let outputValue = {};
//progressbar elements
let progressbar = {};
//text to create in case of error
let errorText = document.createElement('p');

//export all variables
export{ PAGE_ELEMENTS, outputValue, errorText, progressbar };