// let button = document.getElementById('save-btn');
// let ul = document.getElementById('listofitems');
// let textValue = document.getElementById('textbox');

// button.addEventListener('click', () => {
//     let li = document.createElement('li');
//     li.textContent = textValue.value;
//     ul.appendChild(li);
//     textValue.value = ''; 
// });

let button = document.getElementById('save-btn');
let ul = document.getElementById('listofitem');
let textValue = document.getElementById('textbox').value;

button.addEventListener('click', () => {
    let li = document.createElement('li');
    li.textContent = textValue.value;
    ul.innerHTML += `<li>${textbox.value}</li>`;
});