// ---------------------------------
//
//  Parsing the XML DOM Elements using JavaScript
//
// ---------------------------------
// --- Task 1 var
let data = [];
let xhttp = new XMLHttpRequest();
let elementOne = "";
// --- Task 2 var
let removeChild = [];
let elementTwo = "";
// --- Task 3 var
let txt = "";
let elementThree = "";

// --- XML HTTP request
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    myFunction(this);
  }
};
xhttp.open("GET", "plant_catalog.xml", true);
xhttp.send();

function myFunction(xml) {
  //------------------------------------------------------------------
  // --- Task 1
  let xmlArray = xml.responseXML.getElementsByTagName("PLANT");
  for (let i = 0; i < xmlArray.length; i++) {
    if (xmlArray[i].childNodes[9].childNodes[0].nodeValue.substring(1) < 3.0)
      data.push(xmlArray[i]);
  }
  data.forEach((e) => {
    elementOne +=
      e.childNodes[1].childNodes[0].nodeValue +
      " - " +
      e.childNodes[9].childNodes[0].nodeValue +
      "<br>";
  });
  document.getElementById("taskOne").innerHTML = elementOne;
  //------------------------------------------------------------------
  // --- Task 2
  data = [];

  txt =
    "Total length Before removing children where price > $ 5.00: " +
    "<mark>" +
    xmlArray.length +
    "</mark> <br>";
  let root = xml.responseXML.documentElement;

  for (let i = 0; i < xmlArray.length; ++i) {
    if (
      parseFloat(
        xmlArray[i].childNodes[9].childNodes[0].nodeValue.substring(1)
      ) > 5.0
    )
      removeChild.push(xmlArray[i]);
  }
  removeChild.forEach((e) => {
    elementTwo +=
      e.childNodes[1].childNodes[0].nodeValue +
      " - " +
      e.childNodes[9].childNodes[0].nodeValue +
      "<br>";
    e.parentNode.removeChild(e);
  });
  txt +=
    "Total length after removing children where price > $ 5.00: " +
    "<mark>" +
    xmlArray.length +
    "</mark><br>";
  txt += "<b style='color:red'>Removed Item: <br></b>" + elementTwo;
  document.getElementById("taskTwo").innerHTML = txt;
  //------------------------------------------------------------------
  // --- Task 3
  data = [];

  for (let i = 0; i < xmlArray.length; i++) {
    data.push(xmlArray[i]);
  }
  data.forEach((e) => {
    elementThree +=
      e.childNodes[1].childNodes[0].nodeValue +
      " - " +
      e.childNodes[9].childNodes[0].nodeValue +
      "<br>";
  });
  document.getElementById("taskThree").innerHTML = elementThree;
}
