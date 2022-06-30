userinflocal = JSON.parse(localStorage.getItem("user"));

var urlimagensend = "";
var imgPreviewch = document.getElementById("img-preview");
var imgPreviewTch = document.getElementById("img-previewT");

function shomessagesdata(chatid){
 
  let status = ""
  if(usertarge.status){
    status = '<i style="color:green" class="fas fa-circle"></i>'
  }else{
    status = '<i style="color:red" class="fas fa-circle-notch"></i>'
  }
  if(usertarge.Type == "UserFS"){
    firebase.database().ref("chatsFS/"+chatid+"/Createby/view/"+userinflocal.uid+"/v").set(true)
  }else{
    firebase.database().ref("chats/"+chatid+"/Createby/view/"+userinflocal.uid+"/v").set(true)   
  }
  if(document.getElementById('spanview'+chatid)){
    document.getElementById('spanview'+chatid).style.display = "none"
  }
  
  /*document.getElementById('usertargename').innerHTML = usertarge.Nickname
  document.getElementById('usertargestatus').innerHTML = status;*/

  commentsRefmsj = firebase.database().ref('messages/' + chatid);
  commentsRefmsj.on('child_added', (data) => {
      let date = new Date(data.val().CreateTime);
      let dateStr =("00" + date.getHours()).slice(-2) + ":" +("00" + date.getMinutes()).slice(-2);
      let stylemessage = "right"
      if(data.val().Createby.uid == userinflocal.uid){
        stylemessage = "right";
      }else{
        if(!data.val().view && chatid == data.val().chatid){
          setDataforFunctions('messages/' + chatid+"/"+data.key+"/view",true,function(){});
          if(countNG>0){
            countNG = (countNG-1)
            document.title = "HTML ("+countNG+")";
          }
        }
        stylemessage = "left";
      }

        if(!document.getElementById("li-"+data.key) && data.val().check){
          if(validateUrl(data.val().Content)){
            console.log(data.val().Content)
            let textimg = "";
          if(data.val().textimg){
            textimg =  data.val().textimg
          }
            document.getElementById("idchat").innerHTML += '<li  class="clearfix rounded-md" style="background:#B78D90;background: rgba(181, 141, 144, 0.8);">'
            +'<div class="chat-body clearfix ">'
                +'<div class="header">'
                +'<small class="pull-right text-white-600 text-sm" style="float: right;position: absolute;top: 0px;right: 16px;font-size: 12px;">'+dateStr+'</small>'
              +'</div>'   
              +'<div  class="h-60 max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 relative">'
              +'<img   class="object-contain w-full h-60" src="'+data.val().Content+'" alt="avatar">'             
              +'<p  style="font-size: 18px;">'
              + textimg
              +'</p>'
              +'</div>'
      
            +'</div>'
          +'</li>'
          scrollToBottom();
          }else{
            if(stylemessage == "left"){
              console.log(PictureProfileG)
              document.getElementById("idchat").innerHTML += '<li id="li-'+data.key+'" class="'+stylemessage+' clearfix" style="display:flex">'
              +'<img src='+PictureProfileG+' class="rounded-full w-12 h-12 mr-2">'
              +'<div style="background:#CAC1C1;background: rgba(202, 193, 193, 0.8);" class="chat-body clearfix" style="width: auto;">'            
                + '<div class="header">'
               
                  + '<small class="text-white-600 text-sm" style="float: left;position: absolute;top: 0px;right: 16px;font-size: 12px;">'+dateStr+'</small>'
                + '</div>'
                + '<p  style="font-size: 18px;">'
                + data.val().Content
                + '</p>'
              + '</div>'
            + '</li>'
            }else{
              document.getElementById("idchat").innerHTML += '<li id="li-'+data.key+'" class="'+stylemessage+' clearfix" style="display:flex">'
              +'<div style="background:#B78D90;background: rgba(181, 141, 144, 0.8);" class="chat-body clearfix" style="width: auto;">'            
                +'<div class="header">'
               
                  +'<small class="text-white-600 text-sm" style="float: right;position: absolute;top: 0px;right: 16px;font-size: 12px;">'+dateStr+'</small>'
                +'</div>'
                +'<p style="font-size: 18px;">'
                + data.val().Content
                +'</p>'
              +'</div>'
            +'</li>'
            }

          scrollToBottom();
          }
        }
  });

}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function showdataUserTarget(){
  document.getElementById("userinfodisplay").innerHTML = "";
  if (usertargereport==false) {
    
    firebase.database().ref("Users").orderByKey().equalTo(usertarge.key)
    .once('value', function(snap) {      
      snap.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        let img = [];
        let texthtmlimagen = "";
        let preferensehtml = "";
        let intereseshtml = "";
        img.push(childSnapshot.val().PictureProfile)
        if(childSnapshot.val().Boxs!=undefined){
          for(z = 0; z < childSnapshot.val().Boxs.length;z++){
            if(childSnapshot.val().Boxs[z] == "Cybersex" || childSnapshot.val().Boxs[z] == "Livedating" || childSnapshot.val().Boxs[z] == "Bodyfetishist" ||
            childSnapshot.val().Boxs[z] == "ExhibitionismNaturism" || childSnapshot.val().Boxs[z] == "Straight" || childSnapshot.val().Boxs[z] == "Coupleexchange" ||
            childSnapshot.val().Boxs[z] == "Roleplays" || childSnapshot.val().Boxs[z] == "BDSM" || childSnapshot.val().Boxs[z] == "ClothesToys" ||
            childSnapshot.val().Boxs[z] == "SexingroupsThreesomes" || childSnapshot.val().Boxs[z] == "Bisexual" || childSnapshot.val().Boxs[z] == "Massages" ||
            
            childSnapshot.val().Boxs[z] == "Gastronomy" || childSnapshot.val().Boxs[z] == "Gamer" || childSnapshot.val().Boxs[z] == "Spirituality" ||
            childSnapshot.val().Boxs[z] == "Fashion" || childSnapshot.val().Boxs[z] == "Environmentalism" || childSnapshot.val().Boxs[z] == "Vegetarianism" ||
            childSnapshot.val().Boxs[z] == "Feminism" || childSnapshot.val().Boxs[z] == "Astrology" || childSnapshot.val().Boxs[z] == "Politics" ||
            childSnapshot.val().Boxs[z] == "OutDoor" || childSnapshot.val().Boxs[z] == "Wine" || childSnapshot.val().Boxs[z] == "Animals"){
              if(childSnapshot.val().Boxs[z] == "Cybersex"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Cibersexo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Livedating"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Citas en vivo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Bodyfetishist"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Fetichista del cuerpo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "ExhibitionismNaturism"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Exhibicionismo/Naturismo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Straight"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Derecho</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Coupleexchange"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Intercambio de pareja</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Roleplays"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Juegos de rol</div>'
              }
              if(childSnapshot.val().Boxs[z] == "BDSM"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">BDSM</div>'
              }
              if(childSnapshot.val().Boxs[z] == "ClothesToys"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Ropa/Juguetes</div>'
              }
              if(childSnapshot.val().Boxs[z] == "SexingroupsThreesomes"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Sexo en grupo/Tríos</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Bisexual"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Bisexual</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Massages"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Mensajes</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Gastronomy"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Gastronomía</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Gamer"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Juegos</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Spirituality"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Espiritualidad</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Fashion"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Moda</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Environmentalism"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Ambientalismo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Vegetarianism"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Vegetarianismo</div>'
              }

              if(childSnapshot.val().Boxs[z] == "Feminism"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Feminismo</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Astrology"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Astrología</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Politics"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Política</div>'
              }
              if(childSnapshot.val().Boxs[z] == "OutDoor"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Exterior</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Wine"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Vino</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Animals"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Animales</div>'
              }
            }
            if(childSnapshot.val().Boxs[z] == "Affair" || childSnapshot.val().Boxs[z] == "Openrelationship" || childSnapshot.val().Boxs[z] == "Hangingout" ||
            childSnapshot.val().Boxs[z] == "Couplerelationship" || childSnapshot.val().Boxs[z] == "Onerightstands" || childSnapshot.val().Boxs[z] == "Friendship" ||
            childSnapshot.val().Boxs[z] == "GymSports" || childSnapshot.val().Boxs[z] == "ChatMails" || childSnapshot.val().Boxs[z] == "Dinnerdate" ||
            childSnapshot.val().Boxs[z] == "Datingwithoutissues" || childSnapshot.val().Boxs[z] == "Travel" || childSnapshot.val().Boxs[z] == "Otheractivites"){
              if(childSnapshot.val().Boxs[z] == "Openrelationship"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Relación abierta</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Hangingout"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">pasar el rato</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Couplerelationship"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Relación de pareja</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Onerightstands"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Salir una noche</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Friendship"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Amistad</div>'
              }
              if(childSnapshot.val().Boxs[z] == "GymSports"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Gimnasio/Deportes</div>'
              }
             
              if(childSnapshot.val().Boxs[z] == "ChatMails"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Chat/Correos</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Dinnerdate"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Citas para  cenar</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Datingwithoutissues"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Citas sin problemas</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Travel"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">Viaje</div>'
              }
              if(childSnapshot.val().Boxs[z] == "Otheractivites"){
                preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-2 px-4  rounded-full m-1">GOtras Actividades</div>'
              }
            }

          }
        }

        document.getElementById("imagen").innerHTML = "";
        if(childSnapshot.val().Pictures!=undefined){
          for (let index = 0; index < childSnapshot.val().Pictures.length; index++) {
            img.push(childSnapshot.val().Pictures[index].Url)
          }
          for (let index = 0; index < img.length; index++) {
            if(index==0){
              texthtmlimagen += '<div class="carousel-item  h-full active"><img style="height:50vh;"  src="'+img[index]+'" class="bg-cover bg-center h-2/5  w-100" alt=""></div>';
            }else{
              texthtmlimagen += '<div class="carousel-item h-full"><img style="height:50vh;"  src="'+img[index]+'" class="bg-cover bg-center h-2/5  w-100" alt=""></div>';
            }
          }
        }
        document.getElementById("imagen").innerHTML = "";
        if(childSnapshot.val().PicturePrivate!=undefined && childSnapshot.val().PicturePrivate.length>0){
          document.getElementById("FireImgPrivada").style.display = "block"
          for (let index = 0; index < childSnapshot.val().PicturePrivate.length; index++) {
            texthtmlimagen += '<div class="carousel-item h-full"><img style="height:50vh;"  src="'+childSnapshot.val().PicturePrivate[index].Url+'" class="bg-cover bg-center d-block filter  blur-md h-2/5  w-100"" alt=""></div>';
          }
        }else{
          document.getElementById("FireImgPrivada").style.display = "none"
        }


        PictureProfileG = childSnapshot.val().PictureProfile
        document.getElementById("userinfodisplay").innerHTML += '<div class="flex flex-col  justify-center max-w-sm mx-auto">'
        +'<div   style="background:#CAC1C1" class="">'
        +'<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">'
          +'<div class="carousel-inner" id="userinfodisplay">'
          + texthtmlimagen
          +'</div>'
          +'<button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">'
          +'<span class="carousel-control-prev-icon" aria-hidden="true"></span>'
          +'<span class="visually-hidden">Previous</span>'
          +'</button>'
          +'<button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">'
          +'<span class="carousel-control-next-icon" aria-hidden="true"></span>'
          +'<span class="visually-hidden">Next</span>'
          +'</button>'
          +'</div>'
          +'</div>'

        +'<div class="px-8" style="display:flex;margin-top:5px">'
        +'<span class="font-bold tracking-wide  uppercase " style="color:#520202;font-size:30px;font-family: "Work Sans", sans-serif;">'+childSnapshot.val().Nickname+'</span><span class="ml-4" style="font-size:30px;color:#520202">'+childSnapshot.val().Age+'</span>'
        +'</div>'
        +'<div  class="px-8" style="display:flex;">'
        +'<span class="tracking-wide uppercase dark:text-white flex" style="color:#520202;font-size:16px; font-style: italic;"><img src="images/marcador-de-posicion.png" class="w-6 h-6"></img>&nbsp;'+childSnapshot.val().Region+'</span>'
        +'</div>'
        +'<div class="px-8" style="display:flex;">'
        +'<span class="mb-2 mt-2 tracking-wide text-gray-500" style="color:#520202;font-size:18px;font-family: "Roboto", sans-serif;">'+childSnapshot.val().Describe+'</span>'
        +'</div>'
        +'<div  class="overflow-auto estobox" style="height:30vh;">'
        +'<div class="flex flex-col space-y-2 p-3">'
        +'<div style="color:#520202;font-size:16px; font-style: italic;">Intereses</div>'
        +'<div class="flex flex-wrap">'
        +intereseshtml
        +'</div>'
        +'</div>'
        +'<div class="flex flex-col space-y-2 p-3">'
        +'<div style="color:#520202;font-size:16px; font-style: italic;">Preferencias</div>'
        +'<div class="flex flex-wrap">'
        +preferensehtml
        +'</div>'
        +'</div>'
        +'</div>'

        +'</div>'
        +'</div>'
        +'</div>';
        verificfavoritebg(childSnapshot.key)
      });
    })  
  }
  var myCarousel = document.querySelector('#myCarousel')
    var carousel = new bootstrap.Carousel(myCarousel)
}

function cargarimagen(input){
  var url = input.value;
  urlimagensend = input;
  var imgpreviewsendcard = document.getElementById("imgpreviewsendcard")
  //var cardpreviigm = document.getElementById("imgpreviewsend")
  imgpreviewsendcard.style.display = "block"
  console.log(input.files[0])
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {

        $('#imgpreviewsend').attr('src', e.target.result); // Renderizamos la imagen
    }
    reader.readAsDataURL(input.files[0]);
  }
  //cardpreviigm.src = url;
  scrollToBottom();
}
function cargarimagencancel(){
  var imgpreviewsendcard = document.getElementById("imgpreviewsendcard")
  imgpreviewsendcard.style.display = "none"
  scrollToBottom();
}

function showdataUserlocal(){
  firebase.database().ref("Users").orderByKey().equalTo(userinflocal.uid)
    .once('value', function(snap) {      
      snap.forEach((childSnapshot) => {
        document.getElementById("Nameshowtext").innerHTML = childSnapshot.val().Name
        document.getElementById("Ageshowtext").innerHTML = childSnapshot.val().Age
        document.getElementById("Gendershowtext").innerHTML = childSnapshot.val().Sex 

        var Seeking = "";
        for (let index = 0; index < childSnapshot.val().Seeking.length; index++) {
          Seeking += childSnapshot.val().Seeking[index]+"\n";
        }
        document.getElementById("Seekingshowtext").innerHTML = Seeking
        
        document.getElementById("Haircolorshowtext").innerHTML = childSnapshot.val().Haircolor 
        document.getElementById("Eyecolorshowtext").innerHTML = childSnapshot.val().Eyecolor 

        document.getElementById("Bodytypeshowtext").innerHTML = childSnapshot.val().Bodytype 
        document.getElementById("Heightshowtext").innerHTML = childSnapshot.val().Height
        document.getElementById("Weightshowtext").innerHTML = childSnapshot.val().Weight 
        document.getElementById("Smokershowtext").innerHTML = childSnapshot.val().Smoker
        
        imgPreviewch.style.display = "block";
        imgPreviewch.innerHTML = '<img height="150vh" width="100%" src="' + childSnapshot.val().PictureProfile + '" />';
      });
    })  
}

(function () {  
  $(".img-circle").on("error", function(){
    $(this).attr('src', 'https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png');
  });


  document.getElementById("imgprofileimageUser").src = userinflocal.PictureProfile
  document.getElementById("spannameUser").innerHTML = userinflocal.Nickname
  document.getElementById("Idfriendlist").innerHTML = "";
  setTimeout(function(){
    const button = document.querySelector('#emoji-button');

    const picker = new EmojiButton();
  
    button.addEventListener('click', () => {
      picker.togglePicker(button);
      
    });
    picker.on('emoji', emoji => {
      document.getElementById('textmessage').value += emoji;
  
    });
  },1000)
  //
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
         forEachtchats(user.uid)
         showdataUserTarget()
         firebase.database().ref("Users/"+user.uid+"/chats/"+usertarge.key).once('value', (snapshot) => {
           if (snapshot.exists()) {
              shomessagesdata(snapshot.val().chatid)
           }
           else {
             console.log("No data available");
             if (usertargereport) {
 
              shomessagesdata(user.uid+"report~")
            }
           }

       });
       } else {
        location.href="login.html";
    }
  });

        // Execute a function when the user releases a key on the keyboard
      document.getElementById("textmessage").addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            sendmessage();
          }
        });
        // Initializes and creates emoji set from sprite sheet
})()






function igmE(key){
  console.log(key)
  
  document.getElementById("imgchatE"+key).src = "https://cdn.imagecomics.com/assets/img/default-user-square.svg"
}

function scrollToBottom() {
  countNG = 0;
  document.title = "HTML";
  var div = $(".chat-message");
  div.scrollTop(div.prop('scrollHeight'));

}

function showmenuchat(){
  document.querySelector('#showmenuchatoptions').classList.toggle('hidden') 
}

function updatapointuser(points){
  points = (points - 1);
  firebase.database().ref("Users/"+userinflocal.uid+"/Points").set(points)
}

function sendimgmessage() {
  showLoading(true)
    countNG = 0;
    document.title = "HTML";
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocal.Nickname,uid:userinflocal.uid}
    var file = document.getElementById("seandimagenbtn").files;

  firebase.database().ref("Users/"+userinflocal.uid+"/Points").once('value', (snapshotP) => {
    if (snapshotP.exists() && (parseInt(snapshotP.val()) >= 10) ) {
      firebase.database().ref("Users/"+userinflocal.uid+"/chats/"+usertarge.key).once('value', (snapshot) => {
        if (snapshot.exists()) {

          var storageRef = firebase.storage().ref("messages/"+snapshot.val().chatid+"/"+file[0].name);
          storageRef.put(file[0]).then(function(snapshotfile) {
            snapshotfile.ref.getDownloadURL().then(function(Url) {
                  let msj = new Messager(Url,createby,usertarge.key,snapshot.val().chatid,timenow);
                  setListDataforFunctions("messages/"+snapshot.val().chatid,msj,function(){
                      cargarimagencancel()
                      updatapointuser(snapshotP.val());
                      let data = {
                        text:"",
                        type:"msj",
                        createby:createby,
                        createTime:timenow,
                      }
                      setListDataforFunctions("notification/"+usertarge.key,data,function(){
                        if(usertarge.Type == "UserFS"){
                          firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/Createby/view/"+usertarge.key+"/v").set(false)
                          firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/Lastmessage").set("&#128247;")
                          firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/view").set(false)
                        }else{
                          firebase.database().ref("chats/"+snapshot.val().chatid+"/Createby/view/"+usertarge.key+"/v").set(false)
                          firebase.database().ref("chats/"+snapshot.val().chatid+"/Lastmessage").set("&#128247;")
                        }
                      })
                      showLoading(false)
                  })
                });
            });

            document.getElementById("textmessage").value = "";
        }else {
          updatapointuser(snapshotP.val());
          if (usertargereport==false) {
            createchat();
          }else{
            var storageRef = firebase.storage().ref("messages/"+userinflocal.uid+"report~"+"/"+file[0].name);
            storageRef.put(file[0]).then(function(snapshotfile) {
              snapshotfile.ref.getDownloadURL().then(function(Url) {
                    let msj = new Messager(Url,createby,usertarge.key,userinflocal.uid+"report~",timenow);
                    setListDataforFunctions("messages/"+userinflocal.uid+"report~",msj,function(){
                        cargarimagencancel()
                        updatapointuser(snapshotP.val());
                        let data = {
                          text:"",
                          type:"msj",
                          createby:createby,
                          createTime:timenow,
                        }
                        document.getElementById("textmessage").value = "";
                        setListDataforFunctions("notification/"+usertarge.key,data,function(){
                          if(usertarge.Type == "UserFS"){
                            firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/Createby/view/"+usertarge.key+"/v").set(false)
                            firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/Lastmessage").set("&#128247;")
                            firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/view").set(false)
                          }else{
                            firebase.database().ref("chats/"+userinflocal.uid+"report~"+"/Createby/view/"+usertarge.key+"/v").set(false)
                            firebase.database().ref("chats/"+snapshot.val().chatid+"/Lastmessage").set("&#128247;")
                          }
                        })
                        showLoading(false)
                    })
                  });
              });
          }
          
        }
      });
     
    }
    else {
      swal("","You Need the Coins","warning")
    }
  });
}

function sendmessage() {
  let textmessage = document.getElementById("textmessage").value;
  if(textmessage){
    countNG = 0;
    document.title = "HTML";
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocal.Nickname,uid:userinflocal.uid}
    firebase.database().ref("Users/"+userinflocal.uid+"/Points").once('value', (snapshotP) => {
      if (snapshotP.exists() && (parseInt(snapshotP.val()) >= 1) ){   
        firebase.database().ref("Users/"+userinflocal.uid+"/chats/"+usertarge.key).once('value', (snapshot) => {
          if (snapshot.exists()) {
              let msj = new Messager(textmessage,createby,usertarge.key,snapshot.val().chatid,timenow);
              setListDataforFunctions("messages/"+snapshot.val().chatid,msj,function(){
                  scrollToBottom();
                  updatapointuser(snapshotP.val());
                  let data = {
                    text:"",
                    type:"msj",
                    createby:createby,
                    createTime:timenow,
                  }
                  setListDataforFunctions("notification/"+usertarge.key,data,function(){
                    if(usertarge.Type == "UserFS"){
                      firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/Createby/view/"+usertarge.key+"/v").set(false)
                      firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/Lastmessage").set(textmessage)
                      firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/view").set(false)
                      firebase.database().ref("chatsFS/"+snapshot.val().chatid+"/answered").set(false)
                    }else{
                      firebase.database().ref("chats/"+snapshot.val().chatid+"/Createby/view/"+usertarge.key+"/v").set(false)
                      firebase.database().ref("chats/"+snapshot.val().chatid+"/Lastmessage").set(textmessage)
                    }
                  })
    
              })
              document.getElementById("textmessage").value = "";
          }
          else {
            updatapointuser(snapshotP.val());
            if (usertargereport==false) {
              createchat();
            }else{
              let msj = new Messager(textmessage,createby,usertarge.key,userinflocal.uid+"report~",timenow);
              setListDataforFunctions("messages/"+userinflocal.uid+"report~",msj,function(){
                  cargarimagencancel()
                  updatapointuser(snapshotP.val());
                  let data = {
                    text:"",
                    type:"msj",
                    createby:createby,
                    createTime:timenow,
                  }
                  document.getElementById("textmessage").value = "";
                  setListDataforFunctions("notification/"+usertarge.key,data,function(){
                    if(usertarge.Type == "UserFS"){
                      firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/Createby/view/"+usertarge.key+"/v").set(false)
                      firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/Lastmessage").set("&#128247;")
                      firebase.database().ref("chatsFS/"+userinflocal.uid+"report~"+"/view").set(false)
                    }else{
                      firebase.database().ref("chats/"+userinflocal.uid+"report~"+"/Createby/view/"+usertarge.key+"/v").set(false)
                      firebase.database().ref("chats/"+snapshot.val().chatid+"/Lastmessage").set("&#128247;")
                    }
                  })
                  showLoading(false)
              })
            }
          }
        });
      }
    });

  }
}
function hidemoreinfoche(){
  if(document.getElementById("moreinfoche").classList.contains("show")){
      document.getElementById("btnhidemoreinfoe").innerText = "Más información"
      document.getElementById("moreinfoche").classList.remove("show");
  }else{
    document.getElementById("moreinfoche").classList.add("show");
    document.getElementById("btnhidemoreinfoe").innerText = "Menos información"
  }
}


function updateusersdata(data){
  setDataforFunctions("Users/"+userinflocal.uid+"/chats/"+usertarge.key,{
    chatid:data,
  },function(){
    let textmessage = document.getElementById("textmessage").value;
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocal.Nickname,uid:userinflocal.uid}
    let msj = new Messager(textmessage,createby,usertarge.key,data,timenow);
    document.getElementById("textmessage").value = "";
    firebase.database().ref("chatsFS/"+data+"/Lastmessage").set(textmessage)
    firebase.database().ref("chatsFS/"+data+"/answered").set(false)
    if(usertarge.Type == "UserFS"){
      setListDataforFunctions("messages/"+data,msj,null)
      setDataforFunctions("chatsFS/"+data+"/Createby/view/"+userinflocal.uid,{
        v:true,
      },function(){});
      setDataforFunctions("chatsFS/"+data+"/Createby/view/"+usertarge.key,{
        v:false,
      },function(){});

      scrollToBottom();
    }else{
      setDataforFunctions("Users/"+usertarge.key+"/chats/"+userinflocal.uid,{
        chatid:data,
      },function(){
        setListDataforFunctions("messages/"+data,msj,null)
        setDataforFunctions("chats/"+data+"/Createby/view/"+userinflocal.uid,{
          v:true,
        },function(){});
        setDataforFunctions("chats/"+data+"/Createby/view/"+usertarge.key,{
          v:false,
        },function(){});
        scrollToBottom();
      });
    }

  });
  firebase.database().ref("Users/"+userinflocal.uid+"/chats/"+usertarge.key).once('value', (snapshot) => {
    if (snapshot.exists()) {
      shomessagesdata(snapshot.val().chatid)

    }
    else {
      console.log("No data available");
    }

});
}

function createchat() {
  let timenow = firebase.database.ServerValue.TIMESTAMP
  let ul =  userinflocal.uid
  let  userlocalinf = {
    key:userinflocal.uid,
    PictureProfile:userinflocal.PictureProfile,
    status:userinflocal.Online,
    Age:userinflocal.Age,
    Nickname:userinflocal.Nickname,
    Type:userinflocal.Type,
  };
  let userinf = {
    email:userinflocal.email,
    uid:userinflocal.uid,
    userT:usertarge,
    userE:userlocalinf,
    view:"",
  }
  let cht = new Chat(userinf.uid,usertarge.key,"",false,false,"","" ,timenow,userinf,timenow);
  if(usertarge.Type == "UserFS"){
    setListDataforFunctions("chatsFS",cht,updateusersdata)
  }else{
    setListDataforFunctions("chats",cht,updateusersdata)
  }

}




