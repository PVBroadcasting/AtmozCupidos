const chooseFile = document.getElementById("choose-file");
const chooseFiles = document.getElementById("choose-files");
const chooseFilesp = document.getElementById("choose-filesp");
const imgPreview = document.getElementById("img-preview");

function consolefn(){
  let params = new URLSearchParams(location.search).get('IdProfileFs');
  alert(params)
}

(function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      firebase.database().ref("Operator").orderByChild("correo").equalTo(user.email).once('value', function(snap) {      
        snap.forEach((childSnapshot) => {
          var valll = childSnapshot.val();
          document.getElementById("userEmailsession").innerHTML = childSnapshot.val().Nickname
          valll.uid = childSnapshot.key
          var stringRole = "";
          if(valll.type==0){
            stringRole = 
           
            '<li class="nav-item"><a class="nav-link" href="../operadores/index.html">Profile Management</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../chat/chat.html">Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../stats/stats.html">Stats</a></li>'
          }
          if(valll.type==1){
            stringRole =  
            '<li class="nav-item"><a class="nav-link" href="../operadores/index.html">Profile Management</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../checkmsj/checkmsj.html">Check Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../searchChat/searchChat.html">Search Chat</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../reportclient/reportclient.html">Support</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../stats/stats.html">Stats</a></li>'
          }
          if(valll.type==2){
            stringRole =  
            '<li class="nav-item"><a class="nav-link" href="../operadores/index.html">Profile Management</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../operadores/CreateOperator.html">Create operator</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../chat/chat.html">Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../checkmsj/checkmsj.html">Check Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../searchChat/searchChat.html">Search Chat</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../reportclient/reportclient.html">Support</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../staff/staff.html">staff</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../stats/stats.html">Stats</a></li>'
          }
          if(valll.type==3){
            stringRole =   
            '<li class="nav-item"><a class="nav-link" href="../operadores/index.html">Profile Management</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../operadores/CreateOperator.html">Create operator</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../chat/chat.html">Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../checkmsj/checkmsj.html">Check Chats</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../searchChat/searchChat.html">Search Chat</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../reportclient/reportclient.html">Support</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../staff/staff.html">staff</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../Verification/Verification.html">Verification</a></li>'+
            '<li class="nav-item"><a class="nav-link" href="../stats/stats.html">Stats</a></li>'

          }
          document.getElementById("menuaccess").innerHTML = stringRole;

          localStorage.setItem("user", JSON.stringify(valll));
          var statsvalue = [{ points: '1701', valur: 0.25},
    
          { points: '1501', valur: 0.24},
   
          { points: '1301', valur: 0.23},
        
          { points: '1101', valur: 0.22},
    
          { points: '901', valur: 0.21},

          { points: '701', valur: 0.20},

          { points: '501', valur: 0.19},

          { points: '301', valur: 0.18},
          { points: '0', valur: 0.14}];

          let hoy = new Date();
          var oneJan = new Date(hoy.getFullYear(),0,1);
          var numberOfDays = Math.floor((hoy - oneJan) / (24 * 60 * 60 * 1000));
          var result = Math.ceil(( hoy.getDay() + 1 + numberOfDays) / 7);
          let fechaLOG = hoy.getFullYear()  + '-' + ( result );
          firebase.database().ref("OperatorLOG/"+childSnapshot.key+"/"+fechaLOG).once('value', (snapshotP) => {
            if (snapshotP.exists()) {
               gobalpoints = parseInt(snapshotP.val().Points)
 
             
               for(var i = 0; i < statsvalue.length; i++){
                 if(gobalpoints>statsvalue[i].points){
                     document.getElementById("totalmoneyconvertB").innerHTML = "??? :  "+((gobalpoints * statsvalue[i].valur)+(snapshotP.val().Pointscheck * 0.10)).toFixed(2)   
                     i = 100; 
                 }
               }
             }else{
               for(var i = 0; i < statsvalue.length; i++){
                 if(gobalpoints>statsvalue[i].points){
                     document.getElementById("totalmoneyconvertB").innerHTML = "??? :  "+((gobalpoints * statsvalue[i].valur)).toFixed(2)
                     i = 100; 
                 }
               }
             }
           });
        });
      }) 

    } else {
      goView("../../view/sign-in/index.html");
    }
  });
    let params = new URLSearchParams(location.search).get('IdProfileFs');
    if(params){
       loadDataforEdit(params)
       document.getElementById("btnEdit").style.display="block";
    }else{
  
      firebase.database().ref('Users').orderByChild('Type').equalTo("UserFS").limitToLast(1).once('value').then(function(snapshot) {
       
          snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val().Codigo)
            let cod = (parseInt(childSnapshot.val().Codigo)+parseInt(1));
            document.getElementById("codigo").innerHTML = '<a style="color:blue;cursor:pointer" id="'+cod+'" onclick="copyToClipboard(' + "'" + cod + "'" + ')">'+cod+'</a>'
            document.getElementById("codigo").value = cod
        });
 

      }, function(error){
        console.log(error);
    });
 
      document.getElementById("btnRegister").style.display="block";
    }

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

document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
})()

chooseFile.addEventListener("change", function () {
  getImgData();
});

chooseFiles.addEventListener("change", function () {
  getImgDatas();
});

chooseFilesp.addEventListener("change", function () {
  getImgDatasp();
});

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
  if(chooseFiles.files.length<=5){
    for (var i = 0; i < chooseFiles.files.length; i++){
      const imgPreviews = document.getElementById("img-previews"+i);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(chooseFiles.files[i]);
      fileReader.addEventListener("load", function () {
        imgPreviews.style.display = "block";
        imgPreviews.innerHTML = '<img src="' + this.result + '" />';
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
  if(val=="??lava"){
    let AlemaniaRegion = ["Amurrio","Laudio","Vitoria-Gasteiz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Albacete"){
    let AlemaniaRegion = ["Albacete","Almansa","Caudete","Hell??n","La Roda","Villarobledo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Albacete"){
    let AlemaniaRegion = ["Albacete","Almansa","Caudete","Hell??n","La Roda","Villarobledo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Alicante"){
    let AlemaniaRegion = ["Albatera", "Alcoy", "Alicante", "Almorad??", "Altea", "Aspe", "Benidorm", "Benissa", "Callosa de Segura", "Calpe", "Castalla", "Cocentaina", "Crevillent", "D??nia", "Elche", "Elda", "Guardamar del Segura", "Ibi", "J??vea", "Mon??var", "Muro de Alcoy", "Mutxamel", "Novelda", "Orihuela", "Pego", "Petrer", "Pilar de la Horadada", "Rojales", "Sant Vicent del Raspeig", "Sant Joan d`Alacant", "Santa Pola", "Teulada", "Torrevieja", "Villajoyosa", "Villena", "El Campello", "L`Alf??s del Pi", "La Nucia"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Almeria"){
    let AlemaniaRegion = ["Adra", "Albox", "Almer??a", "Berja", "Cuevas del Almanzora", "El Ejido", "Garrucha", "Hu??rcal de Almer??a", "Hu??rcal-Overa", "La Mojonera", "Pulp??", "Roquetas de Mar", "Vera", "V??car"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Asturias"){
    let AlemaniaRegion = ["Aller", "Avil??s", "Cangas del Narcea", "Carre??o", "Castrill??n", "Corvera de Asturias", "Gij??n", "Grado", "Langredo", "Laviana", "Lena", "Llanera", "Llanes", "Mieres", "Oviedo", "San Mart??n del Rey Aurelio", "Siero", "Tineo", "Vald??s", "Villaviciosa"]
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
    let AlemaniaRegion = ["Almendranejo", "Badajoz", "Don Benito", "Jerez de los Caballeros", "M??rida", "Montijo", "Olivenza", "Villafranca de los Barros", "Villanueva de la Serena", "Zafra"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Baleares"){
    let AlemaniaRegion = ["Alaior", "Alc??dia", "Andrach", "Calvi??", "Campos", "Capdepera", "Ciudadela", "Felanich", "Formentera", "Ibiza", "Inca", "Lluchmayor", "Mah??n", "Manacor", "Marrach??", "Palma de Mallorca", "Pollensa", "La Puebla", "San Antonio Abad", "San Jos??", "Santa Eulalia del R??o", "Santa Margarita", "Santa??i", "S??ller", "Son Servera"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Barcelona"){
    let AlemaniaRegion = ["Abrera", "Arenys de Mar", "Argentona", "Badalona", "Bad??a del Vall??s", "Barber?? del Vall??s", "Barcelona", "Berga", "Caldas de Montbui", "Calella", "Canet de Mar", "Canovellas", "Cardedeu", "Castellar del Valles", "Castelbisbal", "Casteldefels", "Corbera de Llobregat", "Cornell?? de Llobregat", "Cubellas", "Esparraguera", "Esplugas de Llobregat", "Las Franquesas del Vall??s", "La Garriga", "Gav??", "Granollers", "Hospitalet de Llobregat", "Igualada", "La Llagosta", "Lliss?? de Munt", "Malgrat de Mar", "Manlleu", "Manresa", "Martorell", "El Masnou", "Matar??", "Molins de Rey", "Mollet del Vall??s", "Moncada y Reixach", "Montgat", "Montorn??s del Valles", "Olesa de Montserrat", "Palau de Plegamans", "Pallej??", "Parets", "Piera", "Pineda del Mar", "El Prat de Llobregat", "Premi?? de Dalt", "Premi?? de Mar", "Ripollet", "La Roca del Vall??s", "Sabadell", "San Adri??n de Bes??s", "San Andr??s de la Barca", "San Baudillo de Llobregat", "San Celoni", "San Cugat del Vall??s", "San Fel??u de Llobregat", "San Juan de Torruella", "San Juan Desp??", "San Justi Desvern", "San Pedro de Ribas", "San Quirico del Vall??s", "San Sadurn?? de Noya", "San Vicente dels Horts", "Santa Coloma de Gramanet", "Santa Perpetua de Moguda", "Sarda??ola del Vall??s", "Sitges", "Tarrasa", "Tordera", "Torell??", "Vallirana", "Vich", "Viladecans", "Vilanova del Cam??", "Vilasar de Mar", "Villafranca del Panad??s", "Villanueva y Geltr??"]
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
  if(val=="C??ceres"){
    let AlemaniaRegion = ["C??ceres", "Coria", "Navalmoral de la Mata", "Plasencia", "Trujillo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="C??diz"){
    let AlemaniaRegion = ["Algeciras", "Arcos de la Frontera", "Barbate", "C??diz", "Chiclana de la Frontera", "Chipiona", "Conil de la Frontera", "El Puerto de Santa Mar??a", "Jerez de la Frontera", "Jimena de la Frontera", "La Linea de la Concepci??n", "Los Barrios", "Medina Sidonia", "Puerto Real", "Rota", "San Fernando", "San Roque", "Sanl??car de la Barrameda", "Tarifa", "Ubrique", "Vejer de la Frontera", "Villamart??n"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cantabria"){
    let AlemaniaRegion = ["El Astillero", "Camargo", "Castro-Urdiales", "Los Corrales de Buelna", "Laredo", "Pi??lagos", "Santa Cruz de Bezana", "Santa Mar??a de Cay??n", "Santander", "Santo??a", "Torrelavega"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Castell??n"){
    let AlemaniaRegion = ["Alcora", "Almazora", "Benicarl??", "Benicasim", "Burriana", "Castell??n de la Plana", "Nules", "Onda", "Vall de Ux??", "Villareal", "Vinaroz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Ciudad_Real"){
    let AlemaniaRegion = ["??lcazar de San Juan", "Bola??os de Calatrava", "Campo de Criptana", "Ciudad Real", "Daimiel", "Manzanares", "Miguelturra", "Puertollano", "Socu??llamos", "La Solana", "Tomelloso", "Valdepe??as", "Villarubia de los Ojos"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="C??rdoba"){
    let AlemaniaRegion = ["Aguilar de la Frontera", "Baena", "Cabra", "La Carlota", "C??rdoba", "Fuente Palmera", "Lucena", "Montilla", "Montoro", "Palma del R??o", "Pe??arroya-Pueblonevo", "Pozoblanco", "Priego de C??rdona", "Puente Genil", "Rute"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Cuenca"){
    let AlemaniaRegion = ["Cuenca", "Taranc??n" ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Gerona"){
    let AlemaniaRegion = ["Ba??olas", "La Bisbal del Ampurd??n", "Blanes", "Calonge", "Castell??n de Ampurias", "Castillo de Aro", "Figueras", "Gerona", "Lloret del Mar", "Olot", "Palafrugell", "Palam??s", "Ripoll", "Rosas", "Salt", "San Feliu de Guixols", "Santa Coloma de Farn??s", "Torroella de Montgr??", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Granada"){
    let AlemaniaRegion = ["Albolote", "Almu??ecar", "Armilla", "Atarfe", "Baza", "Churriana de la Vega", "Las Gabias", "Granada", "Guadix", "Hu??tor T??jar", "Hu??tor Vega", "??llora", "Loja", "Maracena", "Motril", "Og??jares", "Peligros", "Pinos Puente", "Salobre??a", "Santa Fe", "Vegas del Genil", "La Zubia"]
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
    let AlemaniaRegion = ["Ando??in", "Azcoitia", "Azpeitia", "Beas??in", "??ibar", "Elg??ibar", "Fuenterrab??a", "Hernani", "Ir??n", "Lasarte-Oria", "Mondrag??n", "O??ate", "Oyarzun", "Pasajes", "Renter??a", "San Sebasti??n", "Tolosa", "Vergara", "Villafranca de Ordizia", "Zarauz", "Zum??rraga", "Zumaya"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Huelva"){
    let AlemaniaRegion = ["Aljaraque", "Almonte", "Ayamonte", "Bollullos Par del Condado", "Cartaya", "Gibrale??n", "Huelva", "Isla Cristina", "Lepe", "Moguer", "La Palma del Condado", "Palos de la Frontera", "Punta Umbr??a", "San Juan del Puerto", "Valverde del Camino"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Huesca"){
    let AlemaniaRegion = ["Barbastro", "Bin??far", "Fraga", "Huesca", "Jaca", "Monz??n"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Jaen"){
    let AlemaniaRegion = ["Alcal?? la Real", "Alcaudete", "Andujar", "Baeza", "Bail??n", "La Carolina", "Ja??n", "J??dar", "Linares", "Mancha Real", "Martos", "Meng??bar", "Torredelcampo", "Torredonjimeno", "??beda", "Villacarrillo", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="La_Coru??a"){
    let AlemaniaRegion = ["Ferrol", "Nar??n", "Fene", "Puentes de Garcia Rodr??guez", "Betanzos", "Arteixo", "La Coru??a", "Oleiros", "Sada", "Culleredo", "Cambre", "Carballo", "Laracha", "Santa Comba", "??rdenes", "Noya", "Ribera", "Puebla del Carami??al", "Boiro", "Rianxo", "Ames", "Santiago de Compostela", "Teo"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="La_Rioja"){
    let AlemaniaRegion = ["La Rioja", "Alfaro", "Arnedo", "Calahorra", "Haro", "Logro??o"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Las_Palmas"){
    let AlemaniaRegion = ["Ag??imes", "Antigua", "Arrecife", "Arucas", "G??ldar", "Ingenio", "Mog??n", "La Oliva", "P??jara", "Las Palmas de Gran Canaria", "Puerto del Rosario", "San Bartolom??", "San Bartolom?? de Tirajana", "Santa Br??gida", "Santa Luc??a de Tirajana", "Santa Mar??a de Gu??a de Gran Canaria", "Teguise", "Telde", "Teror", "T??as", "Tuineje", "Yaiza"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Le??n"){
    let AlemaniaRegion = ["Astorga", "La Ba??eza", "Le??n", "Ponferrada", "San Andr??s del Rabanedo", "Villaquilambre"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="L??rida"){
    let AlemaniaRegion = ["Balaguer", "L??rida", "Mollerusa", "Seo de Urgel", "T??rrega"]
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
    let AlemaniaRegion = ["Alcal?? de Henares", "Alcobendas", "Alcorc??n", "Algete", "Alpedrete", "Aranjuez", "Arganda del Rey", "Arroyomolinos", "Boadilla del Monte", "Brunete", "Ciempozuelos", "Collado Villalba", "Colmenar Viejo", "Coslada", "Daganzo de Arriba", "El Escorial", "Fuenlabrada", "Galapagar", "Getafe", "Gri????n", "Guadarrama", "Humanes de Mdrid", "Legan??s", "Madrid", "Majadahonda", "Meco", "Mejorada del Campo", "Moralzarzal", "M??stoles", "Navalcarnero", "Paracuellos del Jarama", "Parla", "Pinto", "Pozuelo de Alarc??n", "Rivas-Vaciamadrid", "Las Rozas Madrid", "San Agust??n del Guadalix", "San Fernando de Henares", "San Lornzo del Escorial", "San Mart??n de la Vega", "San Sebasti??n de los Reyes", "Torrej??n de Ardoz", "Torrelodones", "Tres Cantos", "Valdemorillo", "Valdemoro", "Velilla de San Antonio", "Villalba", "Villanueva de la Ca??ada", "Villanueva del Pardillo", "Villaviviosa de Od??n", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="M??laga"){
    let AlemaniaRegion = ["M??laga", "Marbella", "V??lez-M??laga", "Mijas", "Fuengirola", "Torremolinos", "Benalm??dena", "Estepona", "Rinc??n de la Victoria", "Antequera", "Alhaur??n de la Torre", "Ronda", "C??rtama", "Alhaur??n el Grande", "Co??n", "Nerja", "Torrox", "Manilva", "??lora"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Murcia"){
    let AlemaniaRegion = ["Abar??n", "??guilas", "Alcantarilla", "Los Alc??zeres", "Alhama de Murcia", "Archena", "Beniel", "Bullas", "Calasparra", "Caravaca de la Cruz", "Cartagena", "Caheg??n", "Ceut??", "Cieza", "Fortuna", "Fuente ??lamo de Murcia", "Jumilla", "Lorca", "Mazarr??n", "Molina de Segura", "Mula", "Murcia", "Puerto Lumbreras", "San Javier", "San Pedro del Pinatar", "Santomera", "Torre Pacheco", "Las Torres de Cotillas", "Totana", "La Uni??n", "Yecla", ]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Navarra"){
    let AlemaniaRegion = ["Anso??in", "Bara????in", "Berriozar", "Burlada", "Valle de Eg????s", "Estella", "Pamplona", "Tafalla", "Tudela", "Villava", "Zizur Mayor"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Orense"){
    let AlemaniaRegion = ["El Barco de Valdeorras", "Carballino", "Xinzo de Limia", "Orense", "Ver??n"]
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
    let AlemaniaRegion = ["La Estrada", "La Guardia", "Baiona", "Bueu", "Caldas de Reyes", "Cambados", "Cangas", "Gondomar", "Lal??n", "Mar??n", "Moa??a", "Mos", "Nigr??n", "El Grove", "Porri??o", "Poio", "Ponteareas", "Pontevedra", "Redondela", "Salvatierra de Mi??o", "Sanjenjo", "Tomi??o", "Tui", "Vigo", "Villagarc??a de Arosa", "Villanueva de Arosa"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Salamanca"){
    let AlemaniaRegion = ["B??jar", "Ciudad Rodrigo", "Salamanca", "Santa Marta de Tormes"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Islas_Canarias"){
    let AlemaniaRegion = ["Adeje (Tenerife)", "Arona (Tenerife)", "Candelario (Tenerife)", "Granadilla de Abona (Tenerife)", "Gu??a de Isora (Tenerife)", "G????mar", "Icod de los Vinos (Tenerife)", "Los Llanos de Aridane (La Palma)", "La Matanza de Acentejo (Tenerife)", "La Orotava (Tenerife)", "Puerto de la Cruz (Tenerife)", "Los Realejos (Tenerife)", "El Rosario (Tenerifo)", "San Crist??bal de La Laguna (Tenerife)", "San Miguel de Abona (Tenerife)", "San Sebasti??n de la Gomera (La Gomera)", "Santa Cruz de La Palma (La Palma)", "Santa Cruz de Tenerife (Tenerife)", "Santa ??rsula (Tenerife)", "Santiago del Teide (Tenerife)", "Tacoronte (Tenerife)", "Tegueste (Tenerife)"]
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
    let AlemaniaRegion = ["Alcal?? de Guada??ra", "Alcolea del Rio", "La Algaba", "Arahal", "Bollullos de la Mitaci??n", "Bormujos", "Brenes", "Las Cabezas de San Juan", "Camas", "Cantillana", "Carmona", "Castilleja de la Cuesta", "Coria del R??o", "Dos Hermanas", "??cija", "Espartinas", "Estepa", "Gelves", "Gines", "Guillena", "Lebrija", "Lora del R??o", "Mairena del Alcor", "Mairena del Aljarafe", "Marchena", "Mor??n de la Frontera", "Osuna", "Los Palacios y Villafranca", "Pilas", "La Puebla de Cazalla", "La Puebla del R??o", "La Rinconada", "San Juan de Aznalfarache", "Sanl??car la Mayor", "Sevilla", "Tomares", "Utrera", "El Viso del Alcor"]
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
    let AlemaniaRegion = ["Valls", "Cambrils", "Montroig", "Reus", "Deltebre", "Tortosa", "Calafell", "Cunit", "Vendrell", "Alcanar", "Amposta", "San Carlos de la R??pita", "Salou", "Tarragona", "Torredembarra", "Vilaseca"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Teruel"){
    let AlemaniaRegion = ["Teruel", "Alca??iz"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Toledo"){
    let AlemaniaRegion = ["Bargas", "Consuegra", "Fuensalida", "Illescas", "Madridejos", "Mora", "Oca??a", "Quintanar de la Orden", "Sese??a", "Sonseca", "Talavera de la Reina", "Toledo", "Torrijos", "Villaca??as", "Yuncos"]
    for (var i = 0; i < AlemaniaRegion.length; i++) {
      document.getElementById('City').innerHTML += "<option value="+AlemaniaRegion[i]+">"+AlemaniaRegion[i]+"</option>"
    }
  }
  if(val=="Valencia"){
    let AlemaniaRegion = ["Alacu??s", "Albal", "Alberique", "Alboraya", "Alc??cer", "Alcira", "La Alcud??a", "Aldaya", "Alfafar", "Algemes??", "Alginet", "Benaguacil", "Benet??ser", "Benifay??", "B??tera", "Bu??ol", "Burjasot", "Canals", "Carcagente", "Carlet", "Catarroja", "Chirivella", "Chiva", "Quart de Poblet", "Cullera", "La Eliana", "Gand??a", "Godella", "J??tiva", "Lliria", "Manises", "Masamagrell", "Meliana", "Mislata", "Moncada", "Oliva", "Onteniente", "Paiporta", "Paterna", "Pica??a", "Picasent", "Puebla de Vallbona", "Puzol", "Requena", "Ribarroja del Turia", "Sagunto", "Sedav??", "Silla", "Sueca", "Tabernes Blanques", "Tabernes de Valldigna", "Torrente", "Utiel", "Valencia", "Villamarchante"]
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
    let AlemaniaRegion = ["Abanto y Ci??rvana", "Amorebieta-Etxano", "Arrigorriaga", "Barakaldo", "Basauri", "Bermeo", "Bilbao", "Durango", "Erandio", "Ermua", "Etxebarri", "Galdakao", "Gernika-Lumo", "Getxo", "Leioa", "Mungia", "Portugalete", "Santurtzi", "Sestao", "Sopela", "Valle de Tr??paga"]
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
  if(val=="Espa??a"){
    let Espa??aRegion = ["??lava","Albacete","Alicante","Almeria","Asturias","Avila","Badajoz","Baleares","Barcelona"
    ,"Burgos","C??ceres","C??diz","Cantabria","Castell??n","Ciudad_Real","C??rdoba","Cuenca","Gerona","Granada",
    "Guadalajara","Guipuzcoa","Huelva","Huesca","Jaen","La_Coru??a","La_Rioja","Las_Palmas","Le??n","L??rida",
    "Lugo","Madrid","M??laga","Murcia","Navarra","Orense","Palencia","Pontevedra","Salamanca","Islas_Canarias",
    "Segovia","Sevilla","Spria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"]
    for (var i = 0; i < Espa??aRegion.length; i++) {
      document.getElementById('Region').innerHTML += "<option value="+Espa??aRegion[i]+">"+Espa??aRegion[i]+"</option>"
    }
    $('#Region').val('-1').change();
  }
}


function showDataForEdit(data){
  console.log(data)
  let profilekey = new URLSearchParams(location.search).get('IdProfileFs');
  localStorage.setItem("usereditdata", JSON.stringify(data));
  changesregion(data.Country)
  changesCitys(data.Region)
  var formulario = document.forms['formregister'];
  formulario['Nickname'].value = data.Nickname;
  formulario['Name'].value = data.Name;
  formulario['Age'].value = data.Age;
  formulario['Country'].value = data.Country;
  formulario['Sex'].value = data.Sex;
  formulario['state'].value = data.State;
  formulario['Bodytype'].value = data.Bodytype;
  formulario['Haircolor'].value = data.Haircolor;
  formulario['Eyecolor'].value = data.Eyecolor;
  formulario['Height'].value = data.Height;
  formulario['Weight'].value = data.Weight;
  formulario['Smoker'].value = data.Smoker;
  formulario['Describe'].value = data.Describe;
  formulario['Region'].value = data.Region;
  formulario['City'].value = data.City;
  $('#Seeking').val(data.Seeking).change();
  $('#Languange').val(data.Languange).change();
  if(data.Boxs){
    for (var i = 0; i < data.Boxs.length; i++) {
      $("input:checkbox[value="+data.Boxs[i]+"]").attr("checked","true")
    }
  }



if(data.PictureProfile){
  imgPreview.style.display = "block";
  imgPreview.innerHTML = '<img src="' + data.PictureProfile + '" /><a onclick="deleteImgProfile(' + "'" + data.PictureProfile + "'" + ')" style="font-size: 2vw;position: relative;right: -24.5vw;top: -3vw;"  href="#"><i class="fas fa-trash-alt"></i></a>';
}

if(data.Pictures){
  for (var i = 0; i < data.Pictures.length; i++){
    if(data.Pictures[i]){
      console.log(data.Pictures[i])
      const imgPreviews = document.getElementById("img-previews"+i);
      imgPreviews.style.display = "block";
      imgPreviews.innerHTML = '<img src="' + data.Pictures[i].Url + '" /><a onclick="deleteImgProfiles(' + "'" + data.Pictures[i].Url + "'" + ',' + "'" + i + "'" + ')" style="font-size: 2vw;top: -3vw;position: relative;"  href="#"><i class="fas fa-trash-alt"></i></a>';
    }

  }
}
if(data.PicturePrivate){
  for (var i = 0; i < data.PicturePrivate.length; i++){
    if(data.PicturePrivate[i]){
      console.log(data.PicturePrivate[i].Url)
      const imgPreviews = document.getElementById("img-previewsp"+i);
      imgPreviews.style.display = "block";
      imgPreviews.innerHTML = '<img src="' + data.PicturePrivate[i].Url + '" /><a onclick="deleteImgProfilesp(' + "'" + data.PicturePrivate[i].Url + "'" + ',' + "'" + i + "'" + ')" style="font-size: 2vw;top: -3vw;position: relative;"  href="#"><i class="fas fa-trash-alt"></i></a>';
    }

  }
}

}

function deleteImgProfilesp(url,n){
  let params = new URLSearchParams(location.search).get('IdProfileFs');
  let imageRef = firebase.storage().refFromURL(url);
  imageRef.delete().then(() => {
    document.getElementById("img-previews"+n).style.display = "none";
    document.getElementById("img-previews"+n).innerHTML = '';
   firebase.database().ref('/Users/'+params+'/PicturePrivate/'+n).remove();
   location.reload();
  }).catch(err => console.log(err))
}

function deleteImgProfiles(url,n){
  let params = new URLSearchParams(location.search).get('IdProfileFs');
  let imageRef = firebase.storage().refFromURL(url);
  imageRef.delete().then(() => {
    document.getElementById("img-previewsp"+n).style.display = "none";
    document.getElementById("img-previewsp"+n).innerHTML = '';
   firebase.database().ref('/Users/'+params+'/Pictures/'+n).remove();
   location.reload();
  }).catch(err => console.log(err))
}

function deleteImgProfile(url){
    let params = new URLSearchParams(location.search).get('IdProfileFs');
    let imageRef = firebase.storage().refFromURL(url);
    imageRef.delete().then(() => {
     imgPreview.style.display = "none";
     imgPreview.innerHTML = '';
     firebase.database().ref('/Users/'+params+'/PictureProfile').set("");
    }).catch(err => console.log(err))
}

function loadDataforEdit(key){
  var path = "Users/"+key
  getDataforFunctions(path,showDataForEdit);
}



