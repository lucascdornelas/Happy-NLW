//create mymap
const mymap = L.map('mapid').setView([-19.9188725,-44.0934527], 14);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

function addMarker({name, id, lat, lng}){
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="orphanage?id=${id}"> 
        <img src="/images/arrow-white.svg" > 
    </a>`);
    
    //create and
    L.marker([lat, lng], {icon})
        .addTo(mymap)
        .bindPopup(popup)
}

const orphanages = document.querySelectorAll(".orphanages span");
orphanages.forEach(orphanage => {

    const dataOrphanage = {
        id: orphanage.dataset.id, 
        name: orphanage.dataset.name,
        lat: orphanage.dataset.lat,
        lng: orphanage.dataset.lng
    }

    addMarker(dataOrphanage);
})
