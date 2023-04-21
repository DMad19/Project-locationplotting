class student{
  constructor(reason,place){
    this.reason = reason
    this.place = place
  }
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
    for(let i=0;i<studentObjs.length;i++){
        let flag = 0
        for(let j=0;j<studentObjs[i].reason.length;j++){
          if(studentObjs[i].reason[j]==reason){
            flag = 1
            break
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
      })
  // var places = ['Chikkaballapura','Dharmavaram','Bengaluru','Devanahalli']
  // for(i=0;i<places.length;i++){
  //   const searchQuery = places[i]; 
  // const apiEndpoint = "https://nominatim.openstreetmap.org/search";


  // fetch(`${apiEndpoint}?q=${searchQuery}&format=json`)  
  // .then(response => response.json())
  // .then(data => {
  //   const lat = data[0].lat;
  //   const lon = data[0].lon;
  //   markers.push({lat:Number(lat),lng:Number(lon)})
  //   var marker = new ol.Feature({
  //     geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat]))
  //   });
  //   var vectorLayer = new ol.layer.Vector({
  //     source: new ol.source.Vector({
  //       features: [marker]
  //     }),
  //     style: new ol.style.Style({
  //       image: new ol.style.Icon({
  //         anchor: [0.5, 46],
  //         anchorXUnits: 'fraction',
  //         anchorYUnits: 'pixels',
  //         src: 'https://openlayers.org/en/latest/examples/data/icon.png'
  //       })
  //     })
  //   });
  //   map.addLayer(vectorLayer);
  // })
  // .catch(error => {
  //   console.error(error);
  // });
  // }
  