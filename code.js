let html = '';

function renderXml (parsedXml) {

  const iterate = obj => {
    if (obj.attributes.length > 0) {
      html+=`<li><b>Элемент:</b> ${obj.localName}<br>`;
      for (let atr of obj.attributes) {
        html+=`<b>Атрибут:</b> ${atr.name} <b>Значение:</b> ${atr.nodeValue} <br>`;
      }
      html+="<ul>"
    } else html+=`<li><b>Элемент:</b> ${obj.localName}<ul> <br>`;

        for (key in obj) {
        if (key == "children") {
          
          for (let item of obj[key]) {
            if (item.children.length > 0) iterate(item)
            else if (item.attributes.length > 0) {
              html +=`<li><b>Элемент:</b> ${item.localName} <br> <b>Значение:</b> ${item.innerHTML} <br>`; 
              for (let atr of item.attributes) {
                html +=`<b>Атрибут:</b> ${atr.name} <b>Значение:</b> ${atr.nodeValue} <br> <br><br></li>`;
              }

            }
            else html +=`<li><b>Элемент:</b> ${item.localName} <br> <b>Значение:</b> ${item.innerHTML}<br><br></li>`;
          }
          
        }
      }
      html+=`</ul></li>`
    };

    document.getElementById("demo").innerHTML+= "<ul>";
    iterate(parsedXml)
    document.getElementById("demo").innerHTML+= html;
    document.getElementById("demo").innerHTML+= "</ul>";

}


function parseXml (xml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const parsedXml = xmlDoc.activeElement;
  renderXml(parsedXml);
  
}

function readFile (file) {
  const reader = new FileReader();
  reader.readAsText(file[0]);
  reader.onload = () => {
    parseXml(reader.result);
  };
};
