//create mymap
const mymap = L.map("mapid").setView([-19.9188725, -44.0934527], 15);

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

//create and add marker
mymap.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remover icon
  marker && mymap.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(mymap);
});

//add field photon
function addPhotoField(event) {
  //Pegar o container de fotos #images
  const images = document.querySelector("#images");

  //pegar o container para duplicar .new-images
  const newImages = document.querySelectorAll(".new-upload");

  //clonar o container de #images
  const clonedNewImages = newImages[newImages.length - 1].cloneNode(true);

  //verificar se o campo está vazio
  if (clonedNewImages.children[0].value == "") {
    return;
  }

  //limpar o conteudo do input
  clonedNewImages.children[0].value = "";

  //addicionar mais um elemento no clonedNewImages
  images.appendChild(clonedNewImages);
}

//delete field photo
function deleteField(event){
    const span = event.currentTarget;

    const newImages = document.querySelectorAll(".new-upload");

    if(newImages.length <= 1){
        newImages[0].children[0].value = "";
        return;
    }

    span.parentNode.remove();
}

//select yes of no
function toggleSelect(event){
    const button = event.currentTarget;

    const input = document.querySelector("#open_on_weekends");

    const buttons = document.querySelector(".button-select").children;
    buttons[0].className = "";
    buttons[1].className = "";

    button.className = "active";

    input.value = button.firstChild.data;
}

function validate(event){
  const lat = document.querySelector('[name="lat"]');
  const lng = document.querySelector('[name="lng"]');

  const isValidade = (lat.value == "" & lng.value == "") == 1 ? true : false;
  if(isValidade){
    event.preventDefault();
    alert("Selecione a localização no mapa.");
  }
}