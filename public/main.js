const oldText = document.getElementById('old');
const newText = document.getElementById('new');
const btnCheck = document.getElementById('btn-check');
const btnsave = document.getElementById('btn-save');
const btnalert = document.getElementById('alert-btn');
const newresultText = document.getElementById('newresult');
const oldresultText = document.getElementById('oldresult');
const hintText = document.getElementById('hint');

const oct = document.getElementById('oct');
const nct = document.getElementById('nct');

oldText.innerHTML= localStorage.getItem("oldText");
newText.innerHTML= localStorage.getItem("newText");


oct.innerText = oldText.value.trim() == "" ? 0: oldText.value.trim().split(" ").length;
nct.innerText = newText.value.trim() == "" ? 0 : newText.value.trim().split(" ").length;

oldText.oninput = (e) => {
    oct.innerText = oldText.value.trim() == "" ? 0 : oldText.value.trim().split(" ").length;
}

newText.oninput = (e) => {
    nct.innerText = newText.value.trim() == "" ? 0 : newText.value.trim().split(" ").length;
}


btnCheck.addEventListener('click', () => {
   
    const oldTextValue = String(oldText.value);
    const newTextValue = String(newText.value);

    if (btnCheck.innerText == "Return back") {
        oldresultText.parentNode.appendChild(oldText);
        oldresultText.parentNode.removeChild(oldresultText);

        newresultText.parentNode.appendChild(newText);
        newresultText.parentNode.removeChild(newresultText);

        btnCheck.innerText = "Check difference";

        return;
    }


    const result = checkAdded(oldTextValue, newTextValue);
    const removedresult = checkRemoved(oldTextValue, newTextValue);
    
    oldresultText.innerHTML = "";
    newresultText.innerHTML = "";
 
    splitter(newTextValue).forEach((word, index) => {
        const span = document.createElement("span");
        span.innerHTML = word + " ";
        if (result.indexes.indexOf(index) !== -1) {
            span.classList.add("added");
        }
        newresultText.appendChild(span);
    });

    splitter(oldTextValue).forEach((word, index) => {
        const span = document.createElement("span");
        span.innerHTML = word + " ";
        if (removedresult.indexes.indexOf(index) !== -1) {
            span.classList.add("removed");
        }
        oldresultText.appendChild(span);
    });

    oldText.parentNode.appendChild(oldresultText);
    oldText.parentNode.removeChild(oldText);

    newText.parentNode.appendChild(newresultText);
    newText.parentNode.removeChild(newText);
    // hintText.innerHTML = `
    //     <p>Added: ${result.newresult.join(' ; ')}</p>
    //     <p>Indexes: ${result.indexes.join(', ')}</p>
    //     <p>Removed: ${removedresult.oldresult.join(' ; ')}</p>
    //     <p>Indexes: ${removedresult.indexes.join(', ')}</p>
    // `;

    btnCheck.innerText = "Return back";
});

btnsave.onclick = save;
if (!navigator.cookieEnabled) {
    document.querySelector(".alert").style.display = "flex";
}
btnalert.onclick = () => {
    document.querySelector(".alert").style.display = "none";
 };

function save() {
    const oldTextValue = String(oldText.value).trim();
    const newTextValue = String(newText.value).trim();

    localStorage.setItem("oldText", oldTextValue);
    localStorage.setItem("newText", newTextValue);
    alert("Saved");
    return;
}

function checkAdded(oldText = "", newText = "") {
    const oldTextArray = splitter(oldText);
    const newTextArray = splitter(newText);
    const indexes = [];
    const newresult = newTextArray.filter((word, index) => {
        if (oldTextArray.indexOf(word) === -1) {
            indexes.push(index);
            return true;
        }

        return false;
    });

    return { newresult, indexes };
}


function checkRemoved(oldText = "", newText = "") {
    const oldTextArray = splitter(oldText);
    const newTextArray = splitter(newText);
    const indexes = [];
    const oldresult = oldTextArray.filter((word, index) => {
        if (newTextArray.indexOf(word) === -1) {
            indexes.push(index);
            return true;
        }

        return false;
    });

    return { oldresult, indexes };
}


function splitter(word) {
    return word.split(' ').join("####").split("\n").join("####").split("####");
}