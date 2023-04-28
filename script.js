class student{
  constructor(reason,place){
    this.reason = reason
    this.place = place
  }
}
function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}
function countOccurrences(arr, val) {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
	  if (arr[i] === val) {
		count++;
	  }
	}
	return count;
}
let studentObjs = []
fetch('studentDataForm.xlsx')
.then(response => response.arrayBuffer())
.then(data => {
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  data = XLSX.utils.sheet_to_json(worksheet);
  data.forEach(row=>{
    let reasons =row['Why did you join this college?'].split(',')
    let a = new student(reasons,row['Location'])
    studentObjs.push(a)
  })
})
.catch(error => console.error(error));
const reasonS = document.querySelector('#reasonSelect')
var lng =  77.72881;
var lat = 13.39505;
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lng, lat]),
      zoom: 10
    })
  });
  
  var markers = [];
  reasonS.addEventListener('click',(e)=>{
    var layers = map.getLayers().getArray();
    layers.forEach(function(layer) {
      layer.getSource().clear();
    });
    let reason = e.target.id
    let choices = document.getElementsByName('reason')
    let checked = []
    for(let i=0;i<choices.length;i++){
      if (choices[i].checked){
        checked.push(choices[i].id)
      }
    }
    let dictionary = {}
    for(let i=0;i<studentObjs.length;i++){
        let flag = 0
        for(let j=0;j<studentObjs[i].reason.length;j++){
          if(!(studentObjs[i].reason[j] in dictionary)){
            dictionary[studentObjs[i].reason[j]] = []
          }
          for(let k=0;k<checked.length;k++){
            if(studentObjs[i].reason[j]==checked[k]){
              dictionary[studentObjs[i].reason[j]].push(studentObjs[i].place)
              flag = 1
              break
            }
          }
        }
        if(flag){
          const searchQuery = studentObjs[i].place;
          const apiEndpoint = "https://nominatim.openstreetmap.org/search";
        fetch(`${apiEndpoint}?q=${searchQuery}&format=json`)  
        .then(response => response.json())
        .then(data => {
          const lat = data[0].lat;
          const lon = data[0].lon;
          markers.push({lat:Number(lat),lng:Number(lon)})
          var marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat]))
          });
          var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
              features: [marker]
            }),
            style: new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://openlayers.org/en/latest/examples/data/icon.png'
              })
            })
          });
          map.addLayer(vectorLayer);
        })
        .catch(error => {
          console.error(error);
        });
		}
        }
		let keys = Object.keys(dictionary)
		const analysiscont = document.querySelector('.analysisCont')
		analysiscont.textContent = ''
		for(let i=0;i<keys.length;i++){
			if(dictionary[keys[i]].length!=0){
				let heading = document.createElement('h2')
        heading.className = 'heading'
				heading.textContent = keys[i] + ":"
				analysiscont.append(heading)
				let uniques = removeDuplicates(dictionary[keys[i]])
				for(let j=0;j<uniques.length;j++){
					let places = document.createElement('h5')
					places.textContent = `${uniques[j]}: ${countOccurrences(dictionary[keys[i]],uniques[j])}`
					analysiscont.append(places)
				}
			}
		  }
      })