var ayudabtns = false;
var tagimagen = "";
const chooseFile = document.getElementById("choose-file");
const chooseFiles = document.getElementById("choose-files");
const chooseFilesp = document.getElementById("choose-filesp");

const choosefilecardID = document.getElementById("choose-filecardID");
const choosefileSostenidoID = document.getElementById("choose-fileSostenidoID");

const imgPreview = document.getElementById("img-preview");
const previewcardSostenidoID = document.getElementById("img-previewcardSostenidoID");
const previewcardID = document.getElementById("img-previewcardID");
var listimagenglobalprofileUser = [];
var  pictures = [];

function fayudabtns(){

  if(ayudabtns && tagimagen != ""){
    ayudabtns = false;
    document.getElementById("imagen").innerHTML = tagimagen;
    document.getElementById("btnhideormoreifno").style.display = "block"
    document.getElementById("displaynameubica").style.display = "block"
  }else{
    ayudabtns = true;
    tagimagen = document.getElementById("imagen").innerHTML;
    document.getElementById("imagen").innerHTML = "";  
    document.getElementById("btnhideormoreifno").style.display = "none"
    document.getElementById("displaynameubica").style.display = "none"
  }
}

(function () {
    'use strict'
    let usercurrentUser = firebase.auth().currentUser;
    console.log(usercurrentUser)
    if (usercurrentUser) {
      const userinflocal = JSON.parse(localStorage.getItem("user"));
   
      if(userinflocal!=undefined && userinflocal!=null  &&  userinflocal.verificarDataUser != null && userinflocal.verificarDataUser){
        loadDataforEdit(userinflocal.uid);
         firebase.database().ref("UsersVerifFoto/"+userinflocal.uid).once('value', (snapshot) => {
          if(snapshot.exists()){
            document.getElementById("verificountry").value = snapshot.val().verificountry;
            previewcardSostenidoID.innerHTML = '<img id="imgsosteniendoID"  width="100%"  class="rounded-2xl" style="height: 100%!important;margin-top:2xp" src="' + snapshot.val().choosefileSostenidoID + '" />';
            previewcardID.innerHTML = '<img  id="imgID" width="100%"  class="rounded-2xl" style="height: 100%!important;margin-top:2xp" src="' + snapshot.val().choosefilecardID + '" />';
          }
        });
      }else{
        document.getElementById("Nickname").value = userinflocal.Nickname;
        hidemoreinforeg();
      }
      //
      $('.js-example-basic-multiple').select2();
      $('select').val('-1').change();

      $('#Region').change(function(){
        $("#City option").each(function() {
            $(this).remove();
        });
        changesCitys($(this).val());
      });

      $('#Country').change(function(){
        $("#Region option").each(function() {
            $(this).remove();
        });
        changesregion($(this).val());
      });
      
    } else {
      goView("login.html");
    }

    let prefeinputdescuglobal =    '<div class="flex items-center">'+
    '<input  type="radio" name="lugarglobal" id="DESCUBRglobal" class="hidden checkboxpreferen" checked>'+
    '<label for="DESCUBRglobal" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>';

    let prefeinputdesculugar =   '<div class="flex items-center">'+
    '<input  type="radio" name="lugarglobal" id="DESCUBRlugar" class="hidden checkboxpreferen">'+
    '<label for="DESCUBRlugar" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>';
    //val checked true or false
    let checked = "checked";
    let checkedchnewmjs = "";
    let checkedchgustnew = "";
    let chfavoritoconect = "";
    let checkedchnewmjsE = "";
    let checkedchgustnewE = "";
    let chfavoritoconectE = "";
    if(userinflocal.preferen){
      if(userinflocal.preferen.chnewmjs){
        checkedchnewmjs = "checked"
      }
      if(userinflocal.preferen.chgustnew){
        checkedchgustnew = "checked"
      }
      if(userinflocal.preferen.chfavoritoconect){
        chfavoritoconect = "checked"
      }
      if(userinflocal.preferen.chnewmjsE){
        checkedchnewmjsE = "checked"
      }
      if(userinflocal.preferen.chgustnewE){
        checkedchgustnewE = "checked"
      }
      if(userinflocal.preferen.chfavoritoconectE){
        chfavoritoconectE = "checked"
      }
    }


    let checkedage = '<div class="flex items-center">'+
    '<input  type="radio" name="namefilterageprefereb" id="filteragepreferebTodo" class="hidden checkboxpreferen" checked>'+
    '<label for="filteragepreferebTodo" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>';

    let checkedagefilter =  '<div class="flex items-center">'+
    '<input  type="radio" name="namefilterageprefereb" id="filteragepreferebfromto" class="hidden checkboxpreferen">'+
    '<label for="filteragepreferebfromto" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>';   


    let fromv = userinflocal.Age;
    let tov = userinflocal.Age;
    if(userinflocal.preferen != undefined ){
      if(userinflocal.preferen.DESCUBRIMIENTOLugar=="GlobalP"){

      }else{
        prefeinputdescuglobal =    '<div class="flex items-center">'+
        '<input  type="radio" name="lugarglobal" id="DESCUBRglobal" class="hidden checkboxpreferen" >'+
        '<label for="DESCUBRglobal" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
        '</div>';

        prefeinputdesculugar =   '<div class="flex items-center">'+
        '<input  type="radio" name="lugarglobal" id="DESCUBRlugar" class="hidden checkboxpreferen" checked>'+
        '<label for="DESCUBRlugar" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
        '</div>';
      }
      if(!userinflocal.preferen.inpilaprefereb){
        checked = ""
      }
      if(userinflocal.preferen.filterAge!=undefined){
        if(userinflocal.preferen.filterAge.type != "GlobalP"){
          checkedage = '<div class="flex items-center">'+
          '<input  type="radio" name="namefilterageprefereb" id="filteragepreferebTodo" class="hidden checkboxpreferen">'+
          '<label for="filteragepreferebTodo" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
          '</div>';
          checkedagefilter =  '<div class="flex items-center">'+
          '<input  type="radio" name="namefilterageprefereb" id="filteragepreferebfromto" class="hidden checkboxpreferen" checked>'+
          '<label for="filteragepreferebfromto" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
          '</div>';   
          fromv = userinflocal.preferen.filterAge.from;
          tov = userinflocal.preferen.filterAge.to;
        }
      }

    }
    document.getElementById("Idfriendlist").classList.remove("px-4") 
    document.getElementById("Idfriendlist").innerHTML += '<li><div class="w-full bg-gray-400 py-2 px-3 font-bold">AJUSTES DE LA CUENTA</div></li>'+
    '<li><div class="w-full bg-white py-3 px-3 font-bold">Administrar cuenta de pago</div></li>'+ 
    '<li class="border-t border-gray-400 cursor-pointer " onclick="sendEmailresetpassword()" ><div class="w-full bg-white py-3 px-3 font-bold ">Restablecimiento de contraseña</div></li>'+
    '<li><div class="w-full bg-gray-400 py-2 px-3 font-bold">AJUSTES DE DESCUBRIMIENTO</div></li>'+
    '<li><div class="w-full bg-white py-2 px-3 font-bold">Preferencia de distancia</div></li>'+
    '<li class="bg-white flex"><div class="w-full py-2 px-3 font-bold">Global</div>'+

     prefeinputdescuglobal+

    '</li>'+ 
    '<li class="bg-white flex "><div class="w-full  px-3">Muéstrame solo a gente de este rango</div>'+
       prefeinputdesculugar+
  
    '</li>'+
    '<li class="flex py-2 bg-white space-x-4 pl-4" ><div class="mt-3">'+
    '<label class="font-bold " for="Country">País</label>'+
    '<select style="background-color: #A67777;" required class="block  px-2 py-2 mt-2 text-gray-700  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" id="Country" name="country">'+
    '<option value="España">España</option>'+
    '</select>'+
    '</div>'+
    '<div class="mt-3">'+
    '<label class="font-bold " for="Province">Provincia</label>'+
    '<select style="background-color: #A67777;" id="RegionPreferen" name="Region" required class="block  px-2 py-2 mt-2 text-gray-700  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >'+

    '</select>'+
    '</div></li>'+
    '<li class="bg-white flex  border-b border-gray-400">'+
    '<div class="w-full ml-4 ">'+ 

    '<a href="#" id="savepreferentbtn" style="cursor:pointer;"><svg class="relative float-right mr-4" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 340 75">'+
    '<g id="Grupo_64" data-name="Grupo 64" transform="translate(-1011 -825)">'+
    '<rect id="Rectángulo_96" data-name="Rectángulo 96" width="340" height="75" rx="20" transform="translate(1011 825)" fill="#785453"/>'+
    '</g>'+
    '<text id="GUARDAR" transform="translate(108 23)" fill="#dcd4d4" font-size="23" font-family="MicrosoftYaHeiUI-Bold, Microsoft YaHei UI" font-weight="700"><tspan x="0" y="23">GUARDAR</tspan></text>'+
    '</svg></a>'+
    '<div>'+
    '</li>'+
    '<li class="bg-white flex"><div class="w-2/4 py-2 px-3 font-bold">Preferencia de edad</div>'+

    '</li>'+
    '<li class="bg-white flex "><div class="w-full py-2 px-3">Todo el Rango</div>'+

    checkedage+

    '</li>'+
    '<li class="bg-white flex"><div class="w-full py-2 px-3">Muéstrame solo a gente de este rango</div>'+

    checkedagefilter+

    '</li>'+

    '<li class="bg-white flex">'+
    '<div class="flex ml-4">'+  
    '<input id="filterfrom" class="w-8" type="number" min="18" max="100" value="'+fromv+'"></input>'+
    '<span class="pt-1 h4 mr-2">-</span>'+
    '<input id="filterto" class="w-8" type="number" min="18" max="100" value="'+tov+'"></input>'+
    '<div>'+
    '</li>'+
    '<li class="bg-white flex  border-b border-gray-400">'+
    '<div class="w-full ml-4 ">'+ 

    '<a href="#" id="savepreferentbtn2" style="cursor:pointer;"><svg class="relative float-right mr-4" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 340 75">'+
    '<g id="Grupo_64" data-name="Grupo 64" transform="translate(-1011 -825)">'+
    '<rect id="Rectángulo_96" data-name="Rectángulo 96" width="340" height="75" rx="20" transform="translate(1011 825)" fill="#785453"/>'+
    '</g>'+
    '<text id="GUARDAR" transform="translate(108 23)" fill="#dcd4d4" font-size="23" font-family="MicrosoftYaHeiUI-Bold, Microsoft YaHei UI" font-weight="700"><tspan x="0" y="23">GUARDAR</tspan></text>'+
    '</svg></a>'+
    '<div>'+
    '</li>'+
    
    '<li class="flex bg-white"><div class="w-full  py-3 px-3 font-bold">Mostrarme en </div>'+
    '<div class="flex items-center">'+
    '<input  type="checkbox" id="inpilaprefereb" class="hidden checkboxpreferen" '+checked+'>'+
    '<label for="inpilaprefereb" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>'+
    '</li>'+
    '<li class="bg-white flex ">'+
    '<div class="w-full ml-4 ">'+ 

    '<a href="#" id="savepreferentbtn3" style="cursor:pointer;"><svg class="relative float-right mr-4" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 340 75">'+
    '<g id="Grupo_64" data-name="Grupo 64" transform="translate(-1011 -825)">'+
    '<rect id="Rectángulo_96" data-name="Rectángulo 96" width="340" height="75" rx="20" transform="translate(1011 825)" fill="#785453"/>'+
    '</g>'+
    '<text id="GUARDAR" transform="translate(108 23)" fill="#dcd4d4" font-size="23" font-family="MicrosoftYaHeiUI-Bold, Microsoft YaHei UI" font-weight="700"><tspan x="0" y="23">GUARDAR</tspan></text>'+
    '</svg></a>'+
    '<div>'+
    '</li>'+
    '<li><div class="w-full bg-gray-400 py-2 px-3 text-sm">Si está desactivado tu perfil no se mostrará en la pila de fichas. Puedes seguir viendo a tus personas compatibles y chateando con ellas.</div></li>'+
    '<li><div class="w-full bg-white py-3 px-3 font-bold">Contactos bloqueados</div></li>'+
    '<li><div class="w-full bg-gray-400 py-2 px-3 text-sm">Aquí verás los contactos que fueron bloqueados y puede desbloquearlos.</div>'+
    '<ul class="w-full bg-gray-400 py-2 px-3 text-sm" id="container-list-favorite"></ul>'+
    '</li>'+
    '<li><div class="w-full bg-white py-3 px-3 font-bold">Notificaciones </div></li>'+
    //notificaciones 
    '<li><div class="w-full bg-gray-400 py-2 px-3 text-sm">Aquí podrás manejar tus notificaciónes</div></li>'+

    '<li class="flex bg-white"><div class="w-full  py-3 px-3 ">Mensaje Nuevo</div>'+
    '<div class="flex items-center">'+
    '<input  type="checkbox" id="chnewmjs" class="hidden checkboxpreferen" '+checkedchnewmjs+'>'+
    '<label for="chnewmjs" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>'+
    '</li>'+

    '<li class="flex bg-white"><div class="w-full  py-3 px-3">Me gusta Nuevo</div>'+
    '<div class="flex items-center">'+
    '<input  type="checkbox" id="chgustnew" class="hidden checkboxpreferen" '+checkedchgustnew+'>'+
    '<label for="chgustnew" id="slider" class="relative mr-4 w-8 h-4 rounded-full bg-gray-200 cursor-pointer"></label>'+
    '</div>'+
    '</li>'+

    '<li class="bg-white flex ">'+
    '<div class="w-full ml-4 ">'+ 

    '<a href="#" id="savepreferentbtn4" style="cursor:pointer;"><svg class="relative float-right mr-4" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 340 75">'+
    '<g id="Grupo_64" data-name="Grupo 64" transform="translate(-1011 -825)">'+
    '<rect id="Rectángulo_96" data-name="Rectángulo 96" width="340" height="75" rx="20" transform="translate(1011 825)" fill="#785453"/>'+
    '</g>'+
    '<text id="GUARDAR" transform="translate(108 23)" fill="#dcd4d4" font-size="23" font-family="MicrosoftYaHeiUI-Bold, Microsoft YaHei UI" font-weight="700"><tspan x="0" y="23">GUARDAR</tspan></text>'+
    '</svg></a>'+
    '<div>'+
    '</li>'+


    '<li class="bg-white"><div class="w-full py-2 px-3 font-bold">Ayuda y asistencia </div></li>'+
    '<li><div class="w-full bg-gray-400 py-2 px-3 text-sm cursor-pointer" onclick="AandAcreatechatreport()">Ayuda y asistencia</div></li>'+
    '<li class="bg-white"><div class="w-full py-2 px-3 font-bold ">Legal </div></li>'+
    '<li class="border-t border-gray-500 cursor-pointer" onclick="fayudabtns()"><div class="w-full bg-gray-400 py-2 px-3 text-sm">Términos de servicio</div></li>'+
    '<li class="border-t border-gray-500 cursor-pointer" onclick="fayudabtns()"><div class="w-full bg-gray-400 py-2 px-3 text-sm">Políticas de cookies</div></li>'+
    '<li class="border-t border-gray-500 cursor-pointer" onclick="fayudabtns()"><div class="w-full bg-gray-400 py-2 px-3 text-sm">Políticas de privacidad</div></li>'+
    '<li><a href="#" onclick="signOut()"><div class="w-full bg-white py-10 font-bold"><center>Cerrar sesión</center></div></a></li>'+
    '<li class="border-t border-gray-500"><a href="#" onclick="deleteacount()"><div class="w-full bg-white py-10 font-bold"><center>Borrar cuenta</center></div></a></li>';
})();

chooseFile.addEventListener("change", function () {
  getImgData();
});

chooseFiles.addEventListener("change", function () {
  getImgDatas();
});

chooseFilesp.addEventListener("change", function () {
  getImgDatasp();
});

choosefilecardID.addEventListener("change", function () {
  getImgDataschoosefilecardID();
});

choosefileSostenidoID.addEventListener("change", function () {
  getImgDataspchoosefileSostenidoID();
});

function getImgDataschoosefilecardID() {
  const files = choosefilecardID.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      previewcardID.style.display = "block";
      previewcardID.innerHTML = '<img id="imgID" width="100%" heigth="40vh" style="height: 100%!important;margin-top:2xp" src="' + this.result + '" />';
    });
  }
}
function getImgDataspchoosefileSostenidoID() {
  const files = choosefileSostenidoID.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      previewcardSostenidoID.style.display = "block";
      previewcardSostenidoID.innerHTML = '<img id="imgsosteniendoID" width="100%" heigth="40vh" style="height: 100%!important;margin-top:2xp" src="' + this.result + '" />';
    });
  }
}



function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });
  }
}

function getImgDatas() {
  loadScript('https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js',function(){
    loadScript('view/assets/dist/js/bootstrap.bundle.min.js');
  });
  if(chooseFiles.files.length<=5){
    for (var i = 0; i < chooseFiles.files.length; i++){
      let imgPreviews = document.getElementById("imagesUsers");
      const fileReader = new FileReader();
      var filename = chooseFiles.files[i].name
      var objetimg = chooseFiles.files[i];
      fileReader.readAsDataURL(chooseFiles.files[i]);
      fileReader.addEventListener("load", function () {   
        listimagenglobalprofileUser.push({
          url:this.result,
          file:objetimg,
          role:"N",
          });
        imgPreviews.innerHTML += '<div class="img-previewsNew"><img  class="imgUsercotent" style="border-radius: 0.5em;"    src="' + this.result + '" />'+
        '<div style="position: relative;left: 68px;bottom: 38px;" class="dropdown ">'+
        '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
        '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
        '</button>'+
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
        '<li><a class="dropdown-item" onclick="selecimgprifilePictures('+"'"+filename+"'"+','+"'"+this.result+"'"+')" href="#">Foto de Perfil</a></li>'+
        '<li><a class="dropdown-item" onclick="selecimgPrivadaPictures('+"'"+filename+"'"+')" href="#">Foto Privada</a></li>'+
        '<li><a class="dropdown-item" onclick="selecimgDeletePictures('+"'"+this.result+"'"+')" href="#">Eliminar</a></li>'+
          '</ul>'+
         '</div>'+
         '</div></div>';


      });
    }
  }
}

function getImgDatasp() {
  if(chooseFilesp.files.length<=3){
    for (var i = 0; i < chooseFilesp.files.length; i++){
      const imgPreviewsp = document.getElementById("img-previewsp"+i);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(chooseFilesp.files[i]);
      fileReader.addEventListener("load", function () {
        imgPreviewsp.style.display = "block";
        imgPreviewsp.innerHTML = '<img src="' + this.result + '" />';
      });
    }
  }else{
    swal("","must be 3 photo", "warning").then((value) => {

    });
  }

}

function changesCitys(val){
  if(val=="Álava"){
    let AlemaniaRegion = ["Amurrio","Laudio","Vitoria-Gasteiz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Albacete"){
    let AlemaniaRegion = ["Albacete","Almansa","Caudete","Hellín","La Roda","Villarobledo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Albacete"){
    let AlemaniaRegion = ["Albacete","Almansa","Caudete","Hellín","La Roda","Villarobledo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Alicante"){
    let AlemaniaRegion = ["Albatera", "Alcoy", "Alicante", "Almoradí", "Altea", "Aspe", "Benidorm", "Benissa", "Callosa de Segura", "Calpe", "Castalla", "Cocentaina", "Crevillent", "Dénia", "Elche", "Elda", "Guardamar del Segura", "Ibi", "Jávea", "Monóvar", "Muro de Alcoy", "Mutxamel", "Novelda", "Orihuela", "Pego", "Petrer", "Pilar de la Horadada", "Rojales", "Sant Vicent del Raspeig", "Sant Joan d`Alacant", "Santa Pola", "Teulada", "Torrevieja", "Villajoyosa", "Villena", "El Campello", "L`Alfás del Pi", "La Nucia"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Almeria"){
    let AlemaniaRegion = ["Adra", "Albox", "Almería", "Berja", "Cuevas del Almanzora", "El Ejido", "Garrucha", "Huércal de Almería", "Huércal-Overa", "La Mojonera", "Pulpí", "Roquetas de Mar", "Vera", "Vícar"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Asturias"){
    let AlemaniaRegion = ["Aller", "Avilés", "Cangas del Narcea", "Carreño", "Castrillón", "Corvera de Asturias", "Gijón", "Grado", "Langredo", "Laviana", "Lena", "Llanera", "Llanes", "Mieres", "Oviedo", "San Martín del Rey Aurelio", "Siero", "Tineo", "Valdés", "Villaviciosa"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Avila"){
    let AlemaniaRegion = ["Avila"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Badajoz"){
    let AlemaniaRegion = ["Almendranejo", "Badajoz", "Don Benito", "Jerez de los Caballeros", "Mérida", "Montijo", "Olivenza", "Villafranca de los Barros", "Villanueva de la Serena", "Zafra"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Baleares"){
    let AlemaniaRegion = ["Alaior", "Alcúdia", "Andrach", "Calviá", "Campos", "Capdepera", "Ciudadela", "Felanich", "Formentera", "Ibiza", "Inca", "Lluchmayor", "Mahón", "Manacor", "Marrachí", "Palma de Mallorca", "Pollensa", "La Puebla", "San Antonio Abad", "San José", "Santa Eulalia del Río", "Santa Margarita", "Santañi", "Sóller", "Son Servera"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Barcelona"){
    let AlemaniaRegion = ["Abrera", "Arenys de Mar", "Argentona", "Badalona", "Badía del Vallés", "Barberá del Vallés", "Barcelona", "Berga", "Caldas de Montbui", "Calella", "Canet de Mar", "Canovellas", "Cardedeu", "Castellar del Valles", "Castelbisbal", "Casteldefels", "Corbera de Llobregat", "Cornellá de Llobregat", "Cubellas", "Esparraguera", "Esplugas de Llobregat", "Las Franquesas del Vallés", "La Garriga", "Gavá", "Granollers", "Hospitalet de Llobregat", "Igualada", "La Llagosta", "Llissá de Munt", "Malgrat de Mar", "Manlleu", "Manresa", "Martorell", "El Masnou", "Mataró", "Molins de Rey", "Mollet del Vallés", "Moncada y Reixach", "Montgat", "Montornés del Valles", "Olesa de Montserrat", "Palau de Plegamans", "Pallejá", "Parets", "Piera", "Pineda del Mar", "El Prat de Llobregat", "Premiá de Dalt", "Premiá de Mar", "Ripollet", "La Roca del Vallés", "Sabadell", "San Adrián de Besós", "San Andrés de la Barca", "San Baudillo de Llobregat", "San Celoni", "San Cugat del Vallés", "San Felíu de Llobregat", "San Juan de Torruella", "San Juan Despí", "San Justi Desvern", "San Pedro de Ribas", "San Quirico del Vallés", "San Sadurní de Noya", "San Vicente dels Horts", "Santa Coloma de Gramanet", "Santa Perpetua de Moguda", "Sardañola del Vallés", "Sitges", "Tarrasa", "Tordera", "Torelló", "Vallirana", "Vich", "Viladecans", "Vilanova del Camí", "Vilasar de Mar", "Villafranca del Panadés", "Villanueva y Geltrú"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Burgos"){
    let AlemaniaRegion = ["Aranda del Duero", "Burgos", "Miranda de Ebro"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cáceres"){
    let AlemaniaRegion = ["Cáceres", "Coria", "Navalmoral de la Mata", "Plasencia", "Trujillo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cádiz"){
    let AlemaniaRegion = ["Algeciras", "Arcos de la Frontera", "Barbate", "Cádiz", "Chiclana de la Frontera", "Chipiona", "Conil de la Frontera", "El Puerto de Santa María", "Jerez de la Frontera", "Jimena de la Frontera", "La Linea de la Concepción", "Los Barrios", "Medina Sidonia", "Puerto Real", "Rota", "San Fernando", "San Roque", "Sanlúcar de la Barrameda", "Tarifa", "Ubrique", "Vejer de la Frontera", "Villamartín"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cantabria"){
    let AlemaniaRegion = ["El Astillero", "Camargo", "Castro-Urdiales", "Los Corrales de Buelna", "Laredo", "Piélagos", "Santa Cruz de Bezana", "Santa María de Cayón", "Santander", "Santoña", "Torrelavega"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Castellón"){
    let AlemaniaRegion = ["Alcora", "Almazora", "Benicarló", "Benicasim", "Burriana", "Castellón de la Plana", "Nules", "Onda", "Vall de Uxó", "Villareal", "Vinaroz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Ciudad_Real"){
    let AlemaniaRegion = ["Álcazar de San Juan", "Bolaños de Calatrava", "Campo de Criptana", "Ciudad Real", "Daimiel", "Manzanares", "Miguelturra", "Puertollano", "Socuéllamos", "La Solana", "Tomelloso", "Valdepeñas", "Villarubia de los Ojos"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Córdoba"){
    let AlemaniaRegion = ["Aguilar de la Frontera", "Baena", "Cabra", "La Carlota", "Córdoba", "Fuente Palmera", "Lucena", "Montilla", "Montoro", "Palma del Río", "Peñarroya-Pueblonevo", "Pozoblanco", "Priego de Córdona", "Puente Genil", "Rute"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cuenca"){
    let AlemaniaRegion = ["Cuenca", "Tarancón" ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Gerona"){
    let AlemaniaRegion = ["Bañolas", "La Bisbal del Ampurdán", "Blanes", "Calonge", "Castellón de Ampurias", "Castillo de Aro", "Figueras", "Gerona", "Lloret del Mar", "Olot", "Palafrugell", "Palamós", "Ripoll", "Rosas", "Salt", "San Feliu de Guixols", "Santa Coloma de Farnés", "Torroella de Montgrí", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Granada"){
    let AlemaniaRegion = ["Albolote", "Almuñecar", "Armilla", "Atarfe", "Baza", "Churriana de la Vega", "Las Gabias", "Granada", "Guadix", "Huétor Tájar", "Huétor Vega", "Íllora", "Loja", "Maracena", "Motril", "Ogíjares", "Peligros", "Pinos Puente", "Salobreña", "Santa Fe", "Vegas del Genil", "La Zubia"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Guadalajara"){
    let AlemaniaRegion = ["Alovera", "Azuqueca de Henares", "Cabanillas del Campo", "El Casar", "Guadalajara"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Guipuzcoa"){
    let AlemaniaRegion = ["Andoáin", "Azcoitia", "Azpeitia", "Beasáin", "Éibar", "Elgóibar", "Fuenterrabía", "Hernani", "Irún", "Lasarte-Oria", "Mondragón", "Oñate", "Oyarzun", "Pasajes", "Rentería", "San Sebastián", "Tolosa", "Vergara", "Villafranca de Ordizia", "Zarauz", "Zumárraga", "Zumaya"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Huelva"){
    let AlemaniaRegion = ["Aljaraque", "Almonte", "Ayamonte", "Bollullos Par del Condado", "Cartaya", "Gibraleón", "Huelva", "Isla Cristina", "Lepe", "Moguer", "La Palma del Condado", "Palos de la Frontera", "Punta Umbría", "San Juan del Puerto", "Valverde del Camino"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Huesca"){
    let AlemaniaRegion = ["Barbastro", "Binéfar", "Fraga", "Huesca", "Jaca", "Monzón"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Jaen"){
    let AlemaniaRegion = ["Alcalá la Real", "Alcaudete", "Andujar", "Baeza", "Bailén", "La Carolina", "Jaén", "Jódar", "Linares", "Mancha Real", "Martos", "Mengíbar", "Torredelcampo", "Torredonjimeno", "Úbeda", "Villacarrillo", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="La_Coruña"){
    let AlemaniaRegion = ["Ferrol", "Narón", "Fene", "Puentes de Garcia Rodríguez", "Betanzos", "Arteixo", "La Coruña", "Oleiros", "Sada", "Culleredo", "Cambre", "Carballo", "Laracha", "Santa Comba", "Órdenes", "Noya", "Ribera", "Puebla del Caramiñal", "Boiro", "Rianxo", "Ames", "Santiago de Compostela", "Teo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="La_Rioja"){
    let AlemaniaRegion = ["La Rioja", "Alfaro", "Arnedo", "Calahorra", "Haro", "Logroño"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Las_Palmas"){
    let AlemaniaRegion = ["Agüimes", "Antigua", "Arrecife", "Arucas", "Gáldar", "Ingenio", "Mogán", "La Oliva", "Pájara", "Las Palmas de Gran Canaria", "Puerto del Rosario", "San Bartolomé", "San Bartolomé de Tirajana", "Santa Brígida", "Santa Lucía de Tirajana", "Santa María de Guía de Gran Canaria", "Teguise", "Telde", "Teror", "Tías", "Tuineje", "Yaiza"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="León"){
    let AlemaniaRegion = ["Astorga", "La Bañeza", "León", "Ponferrada", "San Andrés del Rabanedo", "Villaquilambre"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Lérida"){
    let AlemaniaRegion = ["Balaguer", "Lérida", "Mollerusa", "Seo de Urgel", "Tárrega"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Lugo"){
    let AlemaniaRegion = ["Chantada", "Foz", "Lugo", "Monforte de Lemos", "Ribadeo", "Sarria", "Villalba", "Vivero"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Madrid"){
    let AlemaniaRegion = ["Alcalá de Henares", "Alcobendas", "Alcorcón", "Algete", "Alpedrete", "Aranjuez", "Arganda del Rey", "Arroyomolinos", "Boadilla del Monte", "Brunete", "Ciempozuelos", "Collado Villalba", "Colmenar Viejo", "Coslada", "Daganzo de Arriba", "El Escorial", "Fuenlabrada", "Galapagar", "Getafe", "Griñón", "Guadarrama", "Humanes de Mdrid", "Leganés", "Madrid", "Majadahonda", "Meco", "Mejorada del Campo", "Moralzarzal", "Móstoles", "Navalcarnero", "Paracuellos del Jarama", "Parla", "Pinto", "Pozuelo de Alarcón", "Rivas-Vaciamadrid", "Las Rozas Madrid", "San Agustín del Guadalix", "San Fernando de Henares", "San Lornzo del Escorial", "San Martín de la Vega", "San Sebastián de los Reyes", "Torrejón de Ardoz", "Torrelodones", "Tres Cantos", "Valdemorillo", "Valdemoro", "Velilla de San Antonio", "Villalba", "Villanueva de la Cañada", "Villanueva del Pardillo", "Villaviviosa de Odón", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Málaga"){
    let AlemaniaRegion = ["Málaga", "Marbella", "Vélez-Málaga", "Mijas", "Fuengirola", "Torremolinos", "Benalmádena", "Estepona", "Rincón de la Victoria", "Antequera", "Alhaurín de la Torre", "Ronda", "Cártama", "Alhaurín el Grande", "Coín", "Nerja", "Torrox", "Manilva", "Álora"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Murcia"){
    let AlemaniaRegion = ["Abarán", "Águilas", "Alcantarilla", "Los Alcázeres", "Alhama de Murcia", "Archena", "Beniel", "Bullas", "Calasparra", "Caravaca de la Cruz", "Cartagena", "Cahegín", "Ceutí", "Cieza", "Fortuna", "Fuente Álamo de Murcia", "Jumilla", "Lorca", "Mazarrón", "Molina de Segura", "Mula", "Murcia", "Puerto Lumbreras", "San Javier", "San Pedro del Pinatar", "Santomera", "Torre Pacheco", "Las Torres de Cotillas", "Totana", "La Unión", "Yecla", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Navarra"){
    let AlemaniaRegion = ["Ansoáin", "Barañáin", "Berriozar", "Burlada", "Valle de Egüés", "Estella", "Pamplona", "Tafalla", "Tudela", "Villava", "Zizur Mayor"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Orense"){
    let AlemaniaRegion = ["El Barco de Valdeorras", "Carballino", "Xinzo de Limia", "Orense", "Verín"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Palencia"){
    let AlemaniaRegion = ["palencia"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Pontevedra"){
    let AlemaniaRegion = ["La Estrada", "La Guardia", "Baiona", "Bueu", "Caldas de Reyes", "Cambados", "Cangas", "Gondomar", "Lalín", "Marín", "Moaña", "Mos", "Nigrán", "El Grove", "Porriño", "Poio", "Ponteareas", "Pontevedra", "Redondela", "Salvatierra de Miño", "Sanjenjo", "Tomiño", "Tui", "Vigo", "Villagarcía de Arosa", "Villanueva de Arosa"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Salamanca"){
    let AlemaniaRegion = ["Béjar", "Ciudad Rodrigo", "Salamanca", "Santa Marta de Tormes"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Islas_Canarias"){
    let AlemaniaRegion = ["Adeje (Tenerife)", "Arona (Tenerife)", "Candelario (Tenerife)", "Granadilla de Abona (Tenerife)", "Guía de Isora (Tenerife)", "Güímar", "Icod de los Vinos (Tenerife)", "Los Llanos de Aridane (La Palma)", "La Matanza de Acentejo (Tenerife)", "La Orotava (Tenerife)", "Puerto de la Cruz (Tenerife)", "Los Realejos (Tenerife)", "El Rosario (Tenerifo)", "San Cristóbal de La Laguna (Tenerife)", "San Miguel de Abona (Tenerife)", "San Sebastián de la Gomera (La Gomera)", "Santa Cruz de La Palma (La Palma)", "Santa Cruz de Tenerife (Tenerife)", "Santa Úrsula (Tenerife)", "Santiago del Teide (Tenerife)", "Tacoronte (Tenerife)", "Tegueste (Tenerife)"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Segovia"){
    let AlemaniaRegion = ["Segovia"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Sevilla"){
    let AlemaniaRegion = ["Alcalá de Guadaíra", "Alcolea del Rio", "La Algaba", "Arahal", "Bollullos de la Mitación", "Bormujos", "Brenes", "Las Cabezas de San Juan", "Camas", "Cantillana", "Carmona", "Castilleja de la Cuesta", "Coria del Río", "Dos Hermanas", "Écija", "Espartinas", "Estepa", "Gelves", "Gines", "Guillena", "Lebrija", "Lora del Río", "Mairena del Alcor", "Mairena del Aljarafe", "Marchena", "Morón de la Frontera", "Osuna", "Los Palacios y Villafranca", "Pilas", "La Puebla de Cazalla", "La Puebla del Río", "La Rinconada", "San Juan de Aznalfarache", "Sanlúcar la Mayor", "Sevilla", "Tomares", "Utrera", "El Viso del Alcor"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Soria"){
    let AlemaniaRegion = ["soria"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Tarragona"){
    let AlemaniaRegion = ["Valls", "Cambrils", "Montroig", "Reus", "Deltebre", "Tortosa", "Calafell", "Cunit", "Vendrell", "Alcanar", "Amposta", "San Carlos de la Rápita", "Salou", "Tarragona", "Torredembarra", "Vilaseca"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Teruel"){
    let AlemaniaRegion = ["Teruel", "Alcañiz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Toledo"){
    let AlemaniaRegion = ["Bargas", "Consuegra", "Fuensalida", "Illescas", "Madridejos", "Mora", "Ocaña", "Quintanar de la Orden", "Seseña", "Sonseca", "Talavera de la Reina", "Toledo", "Torrijos", "Villacañas", "Yuncos"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Valencia"){
    let AlemaniaRegion = ["Alacuás", "Albal", "Alberique", "Alboraya", "Alcácer", "Alcira", "La Alcudía", "Aldaya", "Alfafar", "Algemesí", "Alginet", "Benaguacil", "Benetúser", "Benifayó", "Bétera", "Buñol", "Burjasot", "Canals", "Carcagente", "Carlet", "Catarroja", "Chirivella", "Chiva", "Quart de Poblet", "Cullera", "La Eliana", "Gandía", "Godella", "Játiva", "Lliria", "Manises", "Masamagrell", "Meliana", "Mislata", "Moncada", "Oliva", "Onteniente", "Paiporta", "Paterna", "Picaña", "Picasent", "Puebla de Vallbona", "Puzol", "Requena", "Ribarroja del Turia", "Sagunto", "Sedaví", "Silla", "Sueca", "Tabernes Blanques", "Tabernes de Valldigna", "Torrente", "Utiel", "Valencia", "Villamarchante"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Valladolid"){
    let AlemaniaRegion = ["Arroyo de la Encomienda", "Laguna de Duero", "Medina del Campo", "Valladolid"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Vizcaya"){
    let AlemaniaRegion = ["Abanto y Ciérvana", "Amorebieta-Etxano", "Arrigorriaga", "Barakaldo", "Basauri", "Bermeo", "Bilbao", "Durango", "Erandio", "Ermua", "Etxebarri", "Galdakao", "Gernika-Lumo", "Getxo", "Leioa", "Mungia", "Portugalete", "Santurtzi", "Sestao", "Sopela", "Valle de Trápaga"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Zamora"){
    let AlemaniaRegion = ["Benavente", "Zamora"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Zaragoza"){
    let AlemaniaRegion = ["Calatayud", "Caspe", "Ejea de los Caballeros", "Tarazona", "Utebo", "Zaragoza"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
}


function changesregion(val){      
  if(val=="España"){
    let EspañaRegion = ["Álava","Albacete","Alicante","Almeria","Asturias","Avila","Badajoz","Baleares","Barcelona"
    ,"Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad_Real","Córdoba","Cuenca","Gerona","Granada",
    "Guadalajara","Guipuzcoa","Huelva","Huesca","Jaen","La_Coruña","La_Rioja","Las_Palmas","León","Lérida",
    "Lugo","Madrid","Málaga","Murcia","Navarra","Orense","Palencia","Pontevedra","Salamanca","Islas_Canarias",
    "Segovia","Sevilla","Spria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"]
    for (var i = 0; i < EspañaRegion.length; i++) {
      document.getElementById('Region').innerHTML += "<option value="+EspañaRegion[i]+">"+EspañaRegion[i]+"</option>"
      document.getElementById('RegionPreferen').innerHTML += "<option value="+EspañaRegion[i]+">"+EspañaRegion[i]+"</option>"
    }
    $('#Region').val('-1').change();
    $('#RegionPreferen').val('-1').change();
  }
}

function showDataForEdit(data){
  showLoading(true)
  if(data!=undefined && data!=null){
    localStorage.setItem("usereditdata", JSON.stringify(data));
    //
    document.getElementById("Username").innerHTML = data.Nickname;
    document.getElementById("Name").value = data.Name;
    document.getElementById("Nickname").value = data.Nickname;
    document.getElementById("Age").value = data.Age;
    document.getElementById("state").value = data.State;
    document.getElementById("Bodytype").value = data.Bodytype;
    document.getElementById("Haircolor").value = data.Haircolor;
    document.getElementById("Eyecolor").value = data.Eyecolor;
    document.getElementById('Height').value = data.Height;
    document.getElementById("Weight").value = data.Weight;
    document.getElementById("Smoker").value = data.Smoker;
    document.getElementById('Describe').value = data.Describe;
    //
    $('#Seeking').val(data.Seeking).change();
    $('#Languange').val(data.Languange).change();
    if(data.Country!=undefined){
      document.getElementById('Country').value = data.Country;
      changesregion(data.Country)
    }
   
    if(data.preferen!=undefined&& data.preferen.DESCUBRIMIENTOLugar != "GlobalP"){
      document.getElementById('RegionPreferen').value = data.preferen.DESCUBRIMIENTOLugar;
    }
    if(data.Region!=undefined){
      document.getElementById('Region').value = data.Region;
      changesCitys(data.Region)
      document.getElementById("UserUbication").innerHTML =  data.Region;
    }

    if(data.City!=undefined){
      document.getElementById("City").value = data.City;
    }
    listimagenglobalprofileUser = [];
    if(data.Boxs){
      for (var i = 0; i < data.Boxs.length; i++) {
        $("input:checkbox[value="+data.Boxs[i]+"]").attr("checked","true")
      }
    }
    if(data.PictureProfile){
      document.querySelector('#imagen').innerHTML = '<div class="carousel-item  h-full active"><img src="'+data.PictureProfile+'" class="bg-cover bg-center d-block w-100  h-full" alt=""></div>'
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + data.PictureProfile + '" />';
    }
    if(data.Pictures){
      pictures = data.Pictures;
      for (var i = 0; i < data.Pictures.length; i++){
        if(data.Pictures[i]){
          if(data.Pictures[i].role == "P"){
            let imgPreviews = document.getElementById("imagesUsers");
            imgPreviews.innerHTML += '<div class="img-previewsNew"><img class="imgUsercotent" style="border:solid;border-radius: 0.5em;"   src="' + data.Pictures[i].Url + '" />'+
            '<div style="position: relative;left: 68px;bottom: 38px;" class="dropdown ">'+
            '<button class="btn" type="button" id="'+data.Pictures[i].Url+'" data-bs-toggle="dropdown" aria-expanded="false">'+
            '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
            '</button>'+
            '<ul class="dropdown-menu" aria-labelledby="'+data.Pictures[i].Url+'">'+
              '<li><a class="dropdown-item" onclick="selecimgprifilePictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Foto de Perfil</a></li>'+
              '<li><a class="dropdown-item" onclick="selecimgPrivadaPictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Foto Privada</a></li>'+
              '<li><a class="dropdown-item" onclick="selecimgDeletePictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Eliminar</a></li>'+
              '</ul>'+
            '</div>'+
            '</div></div>';
          }else{
            let imgPreviews = document.getElementById("imagesUsers");
            imgPreviews.innerHTML += '<div class="img-previewsNew"><img class="imgUsercotent" style="border-radius: 0.5em;"   src="' + data.Pictures[i].Url + '" />'+
            '<div style="position: relative;left: 68px;bottom: 38px;" class="dropdown ">'+
            '<button class="btn" type="button" id="'+data.Pictures[i].Url+'" data-bs-toggle="dropdown" aria-expanded="false">'+
            '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
            '</button>'+
            '<ul class="dropdown-menu" aria-labelledby="'+data.Pictures[i].Url+'">'+
              '<li><a class="dropdown-item" onclick="selecimgprifilePictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Foto de Perfil</a></li>'+
              '<li><a class="dropdown-item" onclick="selecimgPrivadaPictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Foto Privada</a></li>'+
              '<li><a class="dropdown-item" onclick="selecimgDeletePictures('+"'"+data.Pictures[i].Url+"'"+')" href="#">Eliminar</a></li>'+
              '</ul>'+
            '</div>'+
            '</div></div>';
          }

        }
    
      }
    }
    if(data.PicturePrivate){
      for (var i = 0; i < data.PicturePrivate.length; i++){
        if(data.PicturePrivate[i]){
          console.log(data.PicturePrivate[i].Url)
          const imgPreviews = document.getElementById("img-previewsp"+i);
          imgPreviews.style.display = "block";
          imgPreviews.innerHTML = '<img src="' + data.PicturePrivate[i].Url + '" />';
        }
    
      }
    }
    setTimeout(function(){
      showLoading(false)
      loadScript('https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js',function(){
        loadScript('view/assets/dist/js/bootstrap.bundle.min.js');
      })
    },3000)
  }else{
    hidemoreinforeg();
    setTimeout(function(){
      showLoading(false)
      loadScript('https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js',function(){
        loadScript('view/assets/dist/js/bootstrap.bundle.min.js');
      })
    },2000)
  }
}

function loadDataforEdit(key){
  var path = "Users/"+key
  getDataforFunctions(path,showDataForEdit);
}

function btnverific(){
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let profilekey = userinflocal.uid
  let datafotos = [];
    // User is signed in
    showLoading(true)
    var loadDatav = new Promise((resolve, reject) => {
      var choosefscilecardID = choosefilecardID.files[0];

      if(choosefscilecardID){
        var storageRef = firebase.storage().ref("user/"+profilekey+"/profileimgcardID");
          storageRef.put(choosefscilecardID).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
            datafotos.push(Url)
              resolve();
              });
          });
      }else{
        if(document.getElementById("imgID")){
          choosefscilecardID =  $("#imgID").attr('src');
          var storageRef = firebase.storage().ref("user/"+profilekey+"/profileimgcardID");
          storageRef.put(choosefscilecardID).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
            datafotos.push(Url)
              resolve();
              });
          });
        }else{
          showLoading(false)
        }

      }
    });
    var loadData1v = new Promise((resolve, reject) => {
      var choosefileSostenisssdoID = choosefileSostenidoID.files[0];
      if(choosefileSostenisssdoID){
        var storageRef = firebase.storage().ref("user/"+profilekey+"/profileimgSostenidoID");
          storageRef.put(choosefileSostenisssdoID).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
            datafotos.push(Url)
              resolve();
              });
          });
      }else{
        if(document.getElementById("imgsosteniendoID")){
          choosefileSostenisssdoID =  $("#imgsosteniendoID").attr('src')
          var storageRef = firebase.storage().ref("user/"+profilekey+"/profileimgSostenidoID");
          storageRef.put(choosefileSostenisssdoID).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
            datafotos.push(Url)
              resolve();
              });
          });
        }else{
          showLoading(false)
        }

      }
    });

    Promise.all([loadDatav,loadData1v]).then(values => {
      setTimeout(function(){
        let verificountry = document.getElementById("verificountry").value
        datafotos = {
          name:userinflocal.Nickname,
          verificountry:verificountry,
          choosefilecardID:datafotos[0],
          choosefileSostenidoID:datafotos[1],
          aprobado:false,
        } 
        if(verificountry!=""){
          var newprofileFs = firebase.database().ref("UsersVerifFoto/"+profilekey);
          newprofileFs.set(datafotos);
     
          swal("Su cuenta está siendo verificada recibirá un correo en las próximas 72hs","", "success").then((value) => {
         
          });
        }

      },3000)

    });
}



function EditProfileF(){
  var  picturesp = [];
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let profilekey = userinflocal.uid
  var newdata = JSON.parse(localStorage.getItem("usereditdata"))!=null?JSON.parse(localStorage.getItem("usereditdata")):new Object;
  newdata.Nickname = document.getElementById('Nickname').value;
  newdata.Name = document.getElementById('Name').value;
  newdata.Age = document.getElementById('Age').value;
  newdata.Country = document.getElementById('Country').value;
  newdata.Region = document.getElementById('Region').value;
  newdata.City = document.getElementById("City").value;
  newdata.Seeking = $("#Seeking").val();
  newdata.verificarDataUser = true;
  newdata.State = document.getElementById('state').value;
  newdata.Bodytype = document.getElementById("Bodytype").value;
  newdata.Haircolor = document.getElementById("Haircolor").value;
  newdata.Eyecolor = document.getElementById("Eyecolor").value;
  newdata.Height = document.getElementById('Height').value;
  newdata.Weight = document.getElementById("Weight").value;
  newdata.Smoker = document.getElementById("Smoker").value;
  newdata.Languange = $("#Languange").val();
  newdata.Describe =  document.getElementById('Describe').value;
  newdata.Type = "User";
  let boxs = [];
  $("input[type=checkbox]:checked").each(function(){
      boxs.push($(this).val())
  });

  var user = firebase.auth().currentUser;
  user.reload()
  console.log(pictures.find(q => q.role == "P"))
  console.log(listimagenglobalprofileUser.find(q => q.role == "P"))
  if (user && user.emailVerified) {
    // User is signed in
    if((pictures.find(q => q.role  == "P")!=undefined || listimagenglobalprofileUser.find(q => q.role == "P")!=undefined) &&newdata.Nickname!=""&&newdata.Name!=""&&newdata.Age!=""&&newdata.Country!=""&&newdata.Region!=""&&newdata.City!=""&&newdata.Languange!=""&&newdata.Seeking!=""&&newdata.State!=""&&newdata.Bodytype!=""&&newdata.Haircolor!=""&&newdata.Height!=""&&newdata.Weight!=""&&newdata.Smoker!=""){
      showLoading(true)
      var loadData2 = new Promise((resolve, reject) => {

        if(chooseFilesp.files.length!=0){
          for (var i = 0; i < chooseFilesp.files.length; i++){
            var storageRefsp = firebase.storage().ref("user/"+profilekey+"/sp/"+i);
            storageRefsp.put(chooseFilesp.files[i]).then(function(snapshotMp) {
              snapshotMp.ref.getDownloadURL().then(function(Url) {
                picturesp.push({Url});
              });

            });
            if(i == chooseFilesp.files.length-1){
              resolve();
            }
          }
        }else{
          resolve();
        }
      });

      var loadData3 = new Promise((resolve, reject) => {
        if(listimagenglobalprofileUser.length!=0){
          for (var i = 0; i < listimagenglobalprofileUser.length; i++){
            const ROLE = listimagenglobalprofileUser[i].role;
            console.log("loadData3")
            var storageRefs = firebase.storage().ref("user/"+profilekey+"/sN/"+listimagenglobalprofileUser[i].file.name);
            storageRefs.put(listimagenglobalprofileUser[i].file).then(function(snapshotM) {
              snapshotM.ref.getDownloadURL().then(function(Url) {
                pictures.push({
                  Url:Url,
                  role:ROLE,
                });

              });
            });
            if(i == listimagenglobalprofileUser.length-1){
              resolve();
            }
          }
        }else{
          resolve();
        }
      });


      Promise.all([loadData2,loadData3]).then(values => {
        setTimeout(function(){
          newdata.Boxs = boxs;
          if(pictures.length>0){
            newdata.Pictures = pictures
          }
          if(pictures.length>0){
            for (let index = 0; index < pictures.length; index++) {
              if(pictures[index].role=="P"){
                newdata.PictureProfile = pictures[index].Url
              }
            }
          }
          var newprofileFs = firebase.database().ref("Users/"+profilekey);
          newprofileFs.set(newdata);
          firebase.auth().currentUser.updateProfile({
            displayName: newdata.Nickname,
            photoURL:newdata.PictureProfile
          });
          showLoading(false)
          swal("","Perfil Completo", "success").then((value) => {
            location.href="index.html";  
          location.href="index.html";
            location.href="index.html";  
          });
        },5000)

      });

    }else{
      showLoading(false)
      if((pictures.find(q => q.role  == "P")==undefined && listimagenglobalprofileUser.find(q => q.role == "P")==undefined)){
        swal("","debe tener al menos una foto de perfil", "warning").then((value) => {
        
        });
      }else{
        swal("","Algunos campos no están completos", "warning").then((value) => {
        
        });
      }

    }
  }else if(!user.emailVerified){
    swal("","Debe verificar su email primero: "+user.email, "warning").then((value) => {
      user.reload()
      firebase.auth().currentUser.sendEmailVerification();
    });
  }

}


document.getElementById("btnverific").addEventListener('click',function(){
  btnverific()
});

document.getElementById("btnEdit").addEventListener('click',function(){
    EditProfileF()
});

document.getElementById("savepreferentbtn").addEventListener('click',function(){
  savepreferentbtn()
});
document.getElementById("savepreferentbtn2").addEventListener('click',function(){
  savepreferentbtn()
});
document.getElementById("savepreferentbtn3").addEventListener('click',function(){
  savepreferentbtn()
});
document.getElementById("savepreferentbtn4").addEventListener('click',function(){
  savepreferentbtn()
});

function savepreferentbtn(){
  let filterAge = {
    type:"GlobalP",
    from:0,
    to:0,
  };
  if(document.getElementById("filteragepreferebfromto").checked) {
    filterAge.type="filter"
    let vfrom = document.getElementById("filterfrom").value;
    let vto = document.getElementById("filterto").value;
    filterAge.from=vfrom;
    filterAge.to=vto;
  }
  //lugar
  let DESCUBRIMIENTOLugar = "GlobalP";
    if(document.getElementById("DESCUBRlugar").checked) {
      if(document.getElementById('RegionPreferen').value != ""){
        DESCUBRIMIENTOLugar = document.getElementById('RegionPreferen').value;
      }else{
        swal("","Seleccione un Lugar", "warning").then((value) => {
          DESCUBRIMIENTOLugar = "GlobalP"
          document.getElementById("DESCUBRlugar").checked = false;
          document.getElementById("DESCUBRglobal").checked = true;
        });
      }
    }else{
      DESCUBRIMIENTOLugar = "GlobalP"
    }
  //en cola 
  let valucheck = document.getElementById("inpilaprefereb").checked
  //checkboxs 
  let chnewmjs = document.getElementById("chnewmjs").checked
  let chgustnew = document.getElementById("chgustnew").checked

  //and  checkboxs
  let inpilaprefereb = {
    chnewmjs:chnewmjs,
    chgustnew:chgustnew,
    inpilaprefereb:valucheck,
    DESCUBRIMIENTOLugar:DESCUBRIMIENTOLugar,
    filterAge:filterAge
  }
  setDataforFunctions("Users/"+userinflocal.uid+"/preferen",inpilaprefereb,function(){
    reloaddataUserlocal()
  },true);
}

function hidemoreinforeg(){
  if(document.getElementById("moreinfo").classList.contains("show")){
    document.getElementById("divdescript").style.background = "rgba(255,255,255,0.0)";
    document.getElementById("divdescript").classList.remove("backdrop-filter");
    document.getElementById("divdescript").classList.remove("backdrop-blur-sm");
    document.getElementById("divdescript").classList.remove("transform");
    document.getElementById("divdescript").classList.remove("mb-6");
    document.getElementById("divdescript").classList.remove("-translate-y-96");
    document.getElementById("moreinfo").classList.remove("show");
    document.getElementById("imagen").classList.remove("opacity-0");
    document.getElementById("displaynameubica").classList.remove("hidden")
    document.getElementById("btnhideormoreifno").classList.remove("hidden")
    document.getElementById("divdescript").classList.remove("top-96");
    document.getElementById("divdescript").classList.remove("h-full");
    //


}else{
  document.getElementById("moreinfo").classList.add("show");
  document.getElementById("displaynameubica").classList.add("hidden")
  document.getElementById("btnhideormoreifno").classList.add("hidden")
  document.getElementById("divdescript").style.background = "rgba(255,255,255,0.4)";
  document.getElementById("imagen").classList.add("opacity-0");
  document.getElementById("divdescript").classList.add("backdrop-filter");
  document.getElementById("divdescript").classList.add("backdrop-blur-sm");

  document.getElementById("divdescript").classList.add("top-96");
  document.getElementById("divdescript").classList.add("h-full");
  //
  document.getElementById("divdescript").classList.add("transform");
  document.getElementById("divdescript").classList.add("mb-6");
  document.getElementById("divdescript").classList.add("-translate-y-96");
}
}

function selecimgprifilePictures(url,url2){
  var elementosimg = document.querySelectorAll('.imgUsercotent');
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let profilekey = userinflocal.uid
  for (let index = 0; index < elementosimg.length; index++) {
    elementosimg[index].style.border = "none";
  }
  if(pictures.length>0){
    for (let index = 0; index < pictures.length; index++) {
      pictures[index].role="N"
      if(pictures[index].Url == url){
        pictures[index].role="P";
        for (let s = 0; s < elementosimg.length; s++) {
          if(pictures[index].Url == elementosimg[s].src){
            elementosimg[s].style.border = "solid";
          }
   
        }
        firebase.database().ref("Users/"+profilekey+"/PictureProfile").set(url);
      }
    }
  }

  for (let index = 0; index < listimagenglobalprofileUser.length; index++) {
    listimagenglobalprofileUser[index].role="N"
    if(listimagenglobalprofileUser[index].url == url2){
      listimagenglobalprofileUser[index].role="P"
      for (let s = 0; s < elementosimg.length; s++) {
        if(url2 == elementosimg[s].src){
          elementosimg[s].style.border = "solid";
        }
 
      }
    }
  }
}

function selecimgDeletePictures(url,url2){
  showLoading(true);
  let elementosimg = document.querySelectorAll('.imgUsercotent');
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let profilekey = userinflocal.uid
  if(pictures.length>0){
    for (let index = 0; index < pictures.length; index++) {
      if(pictures[index].Url == url){
        let imageRef = firebase.storage().refFromURL(url);
        imageRef.delete().then(() => {

        pictures.splice(index, 1);
        for (let index = 0; index < elementosimg.length; index++) {
          if(elementosimg[index].src == url){
            showLoading(false);
            document.getElementById("imagesUsers").removeChild(elementosimg[index].parentElement);

          }
      
        }
        firebase.database().ref("Users/"+profilekey+"/Pictures").set(pictures);
   
        }).catch(err => console.log())
        
      }
    }
  }
  //
  if(listimagenglobalprofileUser.length>0){
    for (let index = 0; index < listimagenglobalprofileUser.length; index++) {
      if(listimagenglobalprofileUser[index].url ==  url){
        listimagenglobalprofileUser.splice(index, 1);
        for (let index = 0; index < elementosimg.length; index++) {
          if(elementosimg[index].src == url){
            showLoading(false);
            document.getElementById("imagesUsers").removeChild(elementosimg[index].parentElement);
          
          }
      
        }
        
      }
    }
  }

  //
 


}

function selecimgPrivadaPictures(url){
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let profilekey = userinflocal.uid
  if(pictures.length>0){
    for (let index = 0; index < pictures.length; index++) {
      if(pictures[index].Url == url && pictures[index].role != "P"){
        pictures[index].role="X";
      }else{
        if(pictures[index].Url == url && pictures[index].role == "P"){
          swal("","La foto de perfil no puede ser privada", "warning").then((value) => {
  
          });
        }
      }
    }
  }
  for (let index = 0; index < listimagenglobalprofileUser.length; index++) {
    if(listimagenglobalprofileUser[index].file.name == url && listimagenglobalprofileUser[index].role != "P"){
      listimagenglobalprofileUser[index].role="X"
    }else{
      if(listimagenglobalprofileUser[index].role == "P"){
        swal("","La foto de perfil no puede ser privada", "warning").then((value) => {

        });
      }
    }
  }
}

//this function will work cross-browser for loading scripts asynchronously
function loadScript(src, callback) {
  var s,
      r,
      t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function() {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if ( !r && (!this.readyState || this.readyState == 'complete') )
    {
      r = true;
      if (callback !== undefined) {
        callback();
      }
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}
