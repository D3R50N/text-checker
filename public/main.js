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

oldText.innerHTML = localStorage.getItem("oldText");
newText.innerHTML = localStorage.getItem("newText");


oct.innerText = oldText.value.trim() == "" ? 0 : oldText.value.trim().split(" ").length;
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

    if (btnCheck.innerText == "Hide differences") {
        oldresultText.parentNode.appendChild(oldText);
        oldresultText.parentNode.removeChild(oldresultText);

        newresultText.parentNode.appendChild(newText);
        newresultText.parentNode.removeChild(newresultText);

        btnCheck.innerText = "Show differences";

        hintText.innerHTML = "";

        // document.getElementById("oldlabel").innerHTML = ` Old text (<span id="oct">${oldText.value.trim() == "" ? 0 : oldText.value.trim().split(" ").length}</span> words)`; 
        // document.getElementById("newlabel").innerHTML = ` New text (<span id="nct">${newText.value.trim() == "" ? 0 : newText.value.trim().split(" ").length}</span> words)`;

        return;
    }
    oldresultText.innerHTML = "";
    newresultText.innerHTML = "";

    var removed_count = 0;
    var added_count = 0;

    if (oldTextValue.split('\n').length > newTextValue.split('\n').length) {
        oldTextValue.split('\n').forEach((line, line_index) => {
            const newLine = line_index > newTextValue.split("\n").length - 1 ? "" : newTextValue.split("\n")[line_index];

            const result = checkAdded(line, newLine);
            const removedresult = checkRemoved(line, newLine);



            const n_div = document.createElement('p');
            const o_div = document.createElement('p');

            n_div.classList.add("linebrk");
            o_div.classList.add("linebrk");

            splitter(newLine).forEach((word, index) => {
                const span = document.createElement("span");
                span.innerHTML = word + "&nbsp";
                if (result.indexes.indexOf(index) !== -1) {
                    span.classList.add("added");
                    added_count++;
                }
                n_div.appendChild(span);
            });
            if (newLine.trim().length == 0) n_div.appendChild(document.createElement("br"))
            newresultText.appendChild(n_div);



            splitter(line).forEach((word, index) => {

                const span = document.createElement("span");
                span.innerHTML = word + "&nbsp";

                if (removedresult.indexes.indexOf(index) !== -1) {
                    span.classList.add("removed");
                    removed_count++;
                }
                o_div.appendChild(span);
            });
            if (line.trim().length == 0) o_div.appendChild(document.createElement("br"))
            oldresultText.appendChild(o_div);
        })

    }
    else {
        newTextValue.split('\n').forEach((line, line_index) => {
            const oldLine = line_index > oldTextValue.split("\n").length - 1 ? "" : oldTextValue.split("\n")[line_index];

            const result = checkRemoved(line, oldLine);
            const removedresult = checkAdded(line, oldLine);



            const n_div = document.createElement('p');
            const o_div = document.createElement('p');

            n_div.classList.add("linebrk");
            o_div.classList.add("linebrk");

            splitter(line).forEach((word, index) => {
                const span = document.createElement("span");
                span.innerHTML = word + "&nbsp";
                if (result.indexes.indexOf(index) !== -1) {
                    span.classList.add("added");
                    added_count++;
                }
                n_div.appendChild(span);
            });
            if (oldLine.trim().length == 0) n_div.appendChild(document.createElement("br"))
            newresultText.appendChild(n_div);



            splitter(oldLine).forEach((word, index) => {

                const span = document.createElement("span");
                span.innerHTML = word + "&nbsp";

                if (removedresult.indexes.indexOf(index) !== -1) {
                    span.classList.add("removed");
                    removed_count++;
                }
                o_div.appendChild(span);
            });
            if (line.trim().length == 0) o_div.appendChild(document.createElement("br"))
            oldresultText.appendChild(o_div);
        })

    }


    oldText.parentNode.appendChild(oldresultText);
    oldText.parentNode.removeChild(oldText);

    newText.parentNode.appendChild(newresultText);
    newText.parentNode.removeChild(newText);
    // Old text(<span id="oct"></span> words)
    // document.getElementById("oldlabel").innerHTML = "Removed (<span id='oct'>" + removed_count + "</span> words)";
    // document.getElementById("newlabel").innerHTML = "Added (<span id='nct'>" + added_count + "</span> words)";

    hintText.innerHTML = ((removed_count + added_count) / (oldText.value.trim().split(" ").length + newText.value.trim().split(" ").length) * 100).toFixed(2) + "% of the text is changed";
    btnCheck.innerText = "Hide differences";
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

    return word.split(' ');
    // return word.split(' ').join("####").split("\n").join("####").split("####");
}