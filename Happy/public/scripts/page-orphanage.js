const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

//create mymap
const mymap = L.map('mapid', options).setView([lat, lng], 16);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

//create and
L.marker([lat, lng], {icon})
    .addTo(mymap)


/* image gallery */
function selectImage(event){
    const button = event.currentTarget;

    //remover toda classe .active
    const buttons = document.querySelectorAll(".images button");
    buttons.forEach(button => {
        button.classList.remove("active");
    })

    //selecionar a imagem clicada
    const image = button.children[0];
    const imageContainer = document.querySelector(".orphanage-details > img");

    //atualizar o container de imagem
    imageContainer.src = image.src;

    //adicionar a classe active no botão
    button.classList.add("active");
}

