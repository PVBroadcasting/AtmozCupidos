
(function () {  
  showLoading(true)
  setTimeout(() => {
    loadlistmainprofile()
  }, 4000);
})()

function test(data){
  console.log("holadev:"+data[0])
}


function loadlistmainprofile(){
    let userinflocal = JSON.parse(localStorage.getItem("user"));
      // let $botonRetroceder = document.querySelector('#retroceder'); Variables
    const IMAGENES = listmainprofile;

    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#imagen');
    let $CMbtnheart = document.querySelector('#CMbtnheart');
    let $CMUsername = document.querySelector('#CMUsername');
    let $NameshowtextV = document.querySelector('#NameshowtextV');
    let $DescribeshowtextV = document.querySelector('#DescribeshowtextV');
    let $SmokershowtextV= document.querySelector('#SmokershowtextV');
    let $CityshowtextV = document.querySelector('#CityshowtextV');
    let $RegionshowtextV  = document.querySelector('#RegionshowtextV');
    let $BodytypeshowtextV = document.querySelector('#BodytypeshowtextV');
    let $GendershowtextV = document.querySelector('#GendershowtextV');
    let $SeekingshowtextV = document.querySelector('#SeekingshowtextV');
    let $EyecolorshowtextV = document.querySelector('#EyecolorshowtextV');
    let $WeightshowtextV = document.querySelector('#WeightshowtextV');
    let $HeightshowtextV = document.querySelector('#HeightshowtextV');
    let $CMCountry = document.querySelector('#CMCountry');
    let $CMLanguange = document.querySelector('#CMLanguange');
    
    let $CMbtnChat = document.querySelector('#CMbtnChat');
    
    // Funciones
    
    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
     function addfavoriteUser(){
      firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key).once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key,false,test)
        }
        else {
          setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key,true,test)
        }
        verificfavorite();
    });
     
    }

    function pasarFoto() {
        showLoading(true)
        if(posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }
    function clikgoViewTochat(data) {
      console.log(IMAGENES[posicionActual])
      goViewTochat(IMAGENES[posicionActual].key,IMAGENES[posicionActual].Nickname
        ,IMAGENES[posicionActual].Online
        ,IMAGENES[posicionActual].Type
        ,IMAGENES[posicionActual].Age 
        ,IMAGENES[posicionActual].PictureProfile)
    }
    function verificfavorite(){
   
      firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key).once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          $CMbtnheart.style.color = "white"
          $CMbtnheart.style.background = "#dc3545"
        }
        else {
          $CMbtnheart.style.color = "#dc3545"
          $CMbtnheart.style.background = "white"
          console.log("No data available");
        }
    });
    }
    function showimgoncarousel(data){
      let img = [];
      img.push(data.PictureProfile)
      $imagen.innerHTML = "";
      if(data.Pictures!=null){
        for (let index = 0; index < data.Pictures.length; index++) {
          img.push(data.Pictures[index].Url)
        }
      }
      if(img!=null){
        for (let index = 0; index < img.length; index++) {
          if(index==0){
            $imagen.innerHTML += '<div class="carousel-item  h-96 active"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-72" alt=""></div>';
          }else{
            $imagen.innerHTML += '<div class="carousel-item h-96"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-72" alt=""></div>';
          }
        }
      }
      if(data.PicturePrivate!=null){

        for (let index = 0; index < data.PicturePrivate.length; index++) {
          $imagen.innerHTML += '<div class="carousel-item h-96"><img src="'+data.PicturePrivate[index].Url+'" class="bg-cover bg-center d-block filter  blur-md w-100  h-72" alt=""></div>';
        }
      }

    }
    /**
     * Funcion que cambia la foto en la anterior posicion
     *     function retrocederFoto() {
        showLoading(true)
        if(posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }
     */

    
    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
      if(IMAGENES[posicionActual]){
        $CMUsername.innerHTML = IMAGENES[posicionActual].Nickname ? IMAGENES[posicionActual].Nickname+", "+"Age: "+ IMAGENES[posicionActual].Age : "";
        
        $BodytypeshowtextV.innerHTML = IMAGENES[posicionActual].Bodytype ? IMAGENES[posicionActual].Bodytype : "";
        $EyecolorshowtextV.innerHTML = IMAGENES[posicionActual].Haircolor ? IMAGENES[posicionActual].Eyecolor : "";
        $HeightshowtextV.innerHTML = IMAGENES[posicionActual].Height ? IMAGENES[posicionActual].Height : "";
        $WeightshowtextV.innerHTML = IMAGENES[posicionActual].Weight ? IMAGENES[posicionActual].Weight : "";
        $SeekingshowtextV.innerHTML = IMAGENES[posicionActual].Seeking ? IMAGENES[posicionActual].Seeking : "";
        $GendershowtextV.innerHTML = IMAGENES[posicionActual].Sex ? IMAGENES[posicionActual].Sex : "";
        $NameshowtextV.innerHTML = IMAGENES[posicionActual].Name ? IMAGENES[posicionActual].Name : "";
        $DescribeshowtextV.innerHTML = IMAGENES[posicionActual].Describe ? IMAGENES[posicionActual].Describe : "";
        $CityshowtextV.innerHTML =  IMAGENES[posicionActual].City ? IMAGENES[posicionActual].City : "";
        $RegionshowtextV.innerHTML = IMAGENES[posicionActual].Region ? IMAGENES[posicionActual].Region : "";
        $SmokershowtextV.innerHTML = IMAGENES[posicionActual].Smoker ? IMAGENES[posicionActual].Smoker : "";
        $CMCountry.innerHTML = IMAGENES[posicionActual].Country ? "&nbsp;&nbsp;"+IMAGENES[posicionActual].Country+", "+IMAGENES[posicionActual].Region : "&nbsp;Country: ";
        
        showimgoncarousel(IMAGENES[posicionActual]);
        var element = "&nbsp;&nbsp;Languange: ";
        for (let index = 0; index < IMAGENES[posicionActual].Boxs.length; index++) {
          document.getElementById("labeltags").innerHTML += '<a href="#" class="inline-block rounded-full text-white bg-black hover:bg-gray-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100">'
          +IMAGENES[posicionActual].Boxs[index]
          +'</a>'
        }
        for (let index = 0; index < IMAGENES[posicionActual].Languange.length; index++) {
          if(index!=0){
            element += IMAGENES[posicionActual].Languange[index]+", ";
          }else{
            element += IMAGENES[posicionActual].Languange[index]+" ";
          }
                
        }
        $CMLanguange.innerHTML = element;
        showLoading(false);
      }else{
        $CMUsername.innerHTML ="data not found";
        $imagen.style.backgroundImage = `url()`;
      }
      verificfavorite();
    }
    
    
    // Eventos
    $CMbtnChat.addEventListener('click', clikgoViewTochat);
    $botonAvanzar.addEventListener('click', pasarFoto);
    $CMbtnheart.addEventListener('click', addfavoriteUser);
    /**
     * $botonRetroceder.addEventListener('click', retrocederFoto);
     */
    
    // Iniciar
    renderizarImagen();
    showLoading(false)
}

function onchCountryfilter(){
  VGCountry =  $("#Country :selected").val();
  posicionActual = 0;
  loadlistmainprofile();
}

function deleteProfileFs(key){
  swal({
  title: "Are you sure?",
  text: "Delete this profile!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.database().ref('ProfileFs/'+key).remove()
    swal("successful process", {
      icon: "success",
    }).then((value) => {
    location.href="index.html";
  });
  } else {

  }
});
}

function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

function hidemoreinfo(){
  if(document.getElementById("moreinfo").classList.contains("show")){
      document.getElementById("btnhidemoreinfo").innerText = "Más información"
      document.getElementById("moreinfo").classList.remove("show");
  }else{
    document.getElementById("moreinfo").classList.add("show");
    document.getElementById("btnhidemoreinfo").innerText = "Menos información"
  }
}