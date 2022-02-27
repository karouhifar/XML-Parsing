// ---------------------------------
//
//  Parsing the XML XPath Elements using JavaScript
//
// ---------------------------------

// --- XML HTTP request
let httpXPath = new XMLHttpRequest();
httpXPath.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    myFunctionXPath(this.responseXML);
  }
};
httpXPath.open("GET", "plant_catalog.xml", true);
httpXPath.send();

convertPriceToNum = (xml) => {
  let xmlArray = xml.getElementsByTagName("PLANT");
  for (let i = 0; i < xmlArray.length; i++) {
    xmlArray[i].childNodes[9].childNodes[0].nodeValue =
      xmlArray[i].childNodes[9].childNodes[0].nodeValue.substring(1);
  }
};

function myFunctionXPath(xml) {
  convertPriceToNum(xml);
  let txtXPath = "";
  let path = "/CATALOG/PLANT[PRICE<4]";
  if (xml.evaluate) {
    let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
    let result = nodes.iterateNext();
    while (result) {
      txtXPath +=
        result.childNodes[1].childNodes[0].nodeValue +
        " - $" +
        result.childNodes[9].childNodes[0].nodeValue +
        "<br>";
      result = nodes.iterateNext();
    }
  } else {
    alert(
      "Please use the modern browser for parsing XML files (Chrome or Edge)"
    );
  }
  document.getElementById("taskOneXPath").innerHTML = txtXPath;
}
