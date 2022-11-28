var form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("action", "/");
form.setAttribute("id", "form");

var inpt1 = document.createElement("input");
inpt1.setAttribute("type", "hidden");
inpt1.setAttribute("name", "oldTextValue");
inpt1.value = oldTextValue;

var inpt2 = document.createElement("input");
inpt2.setAttribute("type", "hidden");
inpt2.setAttribute("name", "newTextValue");
inpt2.value = newTextValue;

form.appendChild(inpt1);
form.appendChild(inpt2);
document.body.appendChild(form);
form.submit();


