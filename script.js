class student{
  constructor(reason,place){
    this.reason = reason
    this.place = place
  }
}
const reasonS = document.querySelector('#reasonSelect')
let a = new student('Good Academics','Chikkaballapura')
let b = new student('Good Placements','Dharmavaram')
let c = new student('Reputation or Brand','Bengaluru')
let d = new student('Near to Home','Devanahalli')
let e = new student('Sports Facilities','Dharmavaram')
let f = new student('Good Infrastructure or Facilities','Bagepalli')
let students = [a,b,c,d,e,f]
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
  
  var markers = [  {lat:13.4355, lng:  77.73158},  {lat: 13.39205,  lng: 77.86416},  {lat: 13.7832,  lng: 77.7963},  {lat: 13.2476, lng: 77.7114}];
  reasonS.addEventListener('click',(e)=>{
    var layers = map.getLayers().getArray();
    layers.forEach(function(layer) {
      layer.getSource().clear();
    });
    let reason = e.target.id
    for(let i=0;i<students.length;i++){
        if(students[i].reason==reason){
          const searchQuery = students[i].place;
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
  