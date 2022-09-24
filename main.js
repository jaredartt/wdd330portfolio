const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html"
  },
  {
    label: "Week2 notes",
    url: "week2/index.html"
  }
]

var cont = document.getElementById('block1');

// create ul element and set the attributes.
var ol = document.createElement('ol');
cont.appendChild(ol);       // add list to the container.

for (i = 0; i < links.length; i++) {
    var li = document.createElement('li');     // create li element.     
    var a = document.createElement('a');     // create a element.     
    a.innerHTML = links[i].label;      // assigning text to li using array value.
    a.href = links[i].url;      // assigning text to li using array value.

    ol.appendChild(li);  // append li to ul.
    li.appendChild(a);  // append li to ul.
}