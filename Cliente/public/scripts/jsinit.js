var listmainprofile = [];
var commentsReffs = false;
var userinflocal = "";
var commentsRef = false;
var contovermenuneed = 1000;
var commentsRefmsj = false;
var usertarge;
var usertargereport = false;
var userprofileview = "null";
var countNG = 0;
var posicionActual = 0;
var posicionNEXT = 1;
var posicionANTE = 0;
var VGCountry = "";
var typecode = 0;
var msjrepor = "";
var PictureProfileG = "";

    function initPayPalButton() {
      document.getElementById('paypal-button-container').innerHTML = "";
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'horizontal',
          label: 'paypal',
          
        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"EUR","value":40}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            
            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            addnewcustomermoney()
            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Gracias por su compra!</h3>';

            // Or go to another URL:  actions.redirect('thank_you.html');
            
          });
        },

        onError: function(err) {
          swal("",err,"warning")
          console.log(err);
        }
      }).render('#paypal-button-container');
    }



function initgetdatareallyuser(user,view){

  showLoading(true)
  if(user!=null){
      firebase.database().ref("Users/"+user.uid).once('value', (snapshot) => {
        let auxuser = snapshot.val();
        auxuser.uid = user.uid
        auxuser.email = user.email
        auxuser.Points = auxuser.Points?auxuser.Points:"0";
        VGCountry = auxuser.Country;
        document.getElementById("spannameUser").innerHTML = auxuser.Nickname
        localStorage.setItem("user", JSON.stringify(auxuser));   
        if(user.emailVerified && snapshot.child("verificarDataUser").val() != null && snapshot.child("verificarDataUser").val()){
          //
          loaddata(user.uid,auxuser);
          document.getElementById("imgprofileimageUser").src = user.photoURL;
          firebase.database().ref("Users/"+auxuser.uid+"/Online").set(true)  
          //
          notifyMepermiss();  
          setTimeout(function(){ 
            if(view=="chat"){
              showLoading(true);
              goViewmenuTochat();
            }
            if(view=="block"){
              showLoading(true);
              updatedataUser()
            }
            if(view=="favorite"){
             showLoading(true);
             goViewFavorites()
           }
           if(view=="searchpage"){
             showLoading(true);
             goViewsearchpage()
           }
          }, 200);
        }else{
          updatedataUser();
        }
     });
  }else{
    goView("login.html");
  }
}

(function () {
  showLoading(true)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {

      initgetdatareallyuser(user,"none");
      }else{
        goView("login.html");
      }
  });
})();

function activeTabB(data){
  let viewGlobal = data;
  /*document.querySelector('#HometabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #ProfiletabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #FavoritetabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #TochattabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #searchpagebB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #blocktabB').classList.remove('bg-red-800')
  
  if(viewGlobal!="nada"){
    document.querySelector(viewGlobal).classList.add('bg-red-800')
  
  }*/

}

function notifyMepermiss() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification

  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

function loaddata(uid,auxuser){
  firebase.database().ref("Users").once('value', (snapshot) => {
    listmainprofile = []
    snapshot.forEach((childSnapshot) => {
      if(uid != childSnapshot.key){
        var aux = childSnapshot.val();
        if(childSnapshot.val().Web && childSnapshot.val().Online && childSnapshot.val().Type == "UserFS"){
          aux.key = childSnapshot.key;
          listmainprofile.push(aux);
        }else if(childSnapshot.val().Type == "User"){
          if(childSnapshot.val().preferen!=undefined&&childSnapshot.val().preferen.inpilaprefereb){
            aux.key = childSnapshot.key;
            listmainprofile.push(aux);
          }else{
            aux.key = childSnapshot.key;
            listmainprofile.push(aux);
          }

        }     
      }
    });

    listmainprofile.sort(function() { return Math.random() - 0.5 });
    tapchatactive("Mensajesid")
    HTTP_GET("main.html", "containermain", null, null, true)
  });

  var commentsRefd = firebase.database().ref('notification/' + uid);
  commentsRefd.on('child_added', (data) => {
    if(data.val().type=="msj"){
      countNG++;
      document.title = "HTML ("+countNG+")";
      //Notiflix.Notify.Info("new messages. "+data.val().createby.displayName);
      var notification = new Notification("new messages!. "+data.val().createby.displayName);
      firebase.database().ref('notification/'+uid+"/"+data.key).remove()


    }

  });

}


function loadlistmainprofileGB(idkey){
  let IMAGENES = null;
  let chatonext = null;
  let userinflocal = JSON.parse(localStorage.getItem("user"));
  // let $botonRetroceder = document.querySelector('#retroceder'); Variables
  IMAGENES = listmainprofile.find(q => q.key == idkey);
  if( userinflocal.chats!=undefined){
    chatonext = userinflocal.chats[idkey];
  }

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
  let $CMblock = document.querySelector('#CMblock');
  let $CMreport = document.querySelector('#CMreport');
  let $varifiIcon = document.getElementById('varifiIconB');

  // Funciones
  /**
   * Funcion que cambia la foto en la siguiente posicion
   */
   function addfavoriteUser(){
    firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES.key).once('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val()) {
        setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES.key,false,function(){
          
        })
      }
      else {
        setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES.key,true,function(){
        
        })
      }
      verificfavorite();
  });
   
  }
  function blockchatf(){
    document.getElementById("viewprofileModal").style.display = "none";//ocultamos el modal
    
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
    showLoading(true);
    console.log(idkey)

  }
  function clikgoViewTochat() {
      $("#viewprofileModal").modal('hide');//ocultamos el modal
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal

    goViewTochat(IMAGENES.key,IMAGENES.Nickname
      ,IMAGENES.Online
      ,IMAGENES.Type
      ,IMAGENES.Age 
      ,IMAGENES.PictureProfile)
  }
  function verificfavorite(){

    firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES.key).once('value', (snapshot) => {

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
    for (let index = 0; index < data.Pictures.length; index++) {
      img.push(data.Pictures[index].Url)
    }
    for (let index = 0; index < img.length; index++) {
      if(index==0){
        $imagen.innerHTML += '<div class="carousel-item  h-72 active"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-72" alt=""></div>';
      }else{
        $imagen.innerHTML += '<div class="carousel-item h-72"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-72" alt=""></div>';
      }
    }
    for (let index = 0; index < data.PicturePrivate.length; index++) {
      $imagen.innerHTML += '<div class="carousel-item h-72"><img src="'+data.PicturePrivate[index].Url+'" class="bg-cover bg-center d-block filter  blur-md w-100  h-72" alt=""></div>';
    }
  }
  /**
   * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
   */
  function renderizarImagen() {
    let userinflocallet = JSON.parse(localStorage.getItem("user"));
    if(IMAGENES){
      if(IMAGENES.Verification && IMAGENES.Verification!==undefined && IMAGENES.Verification != null){
        $varifiIcon.style.display = "block"
      }else{
        $varifiIcon.style.display = "none"
      }

      $CMUsername.innerHTML = IMAGENES.Nickname ? IMAGENES.Nickname+", "+"Age: "+ IMAGENES.Age : "";
      
      $BodytypeshowtextV.innerHTML = IMAGENES.Bodytype ? IMAGENES.Bodytype : "";
      $EyecolorshowtextV.innerHTML = IMAGENES.Haircolor ? IMAGENES.Eyecolor : "";
      $HeightshowtextV.innerHTML = IMAGENES.Height ? IMAGENES.Height : "";
      $WeightshowtextV.innerHTML = IMAGENES.Weight ? IMAGENES.Weight : "";
      $SeekingshowtextV.innerHTML = IMAGENES.Seeking ? IMAGENES.Seeking : "";
      $GendershowtextV.innerHTML = IMAGENES.Sex ? IMAGENES.Sex : "";
      $NameshowtextV.innerHTML = IMAGENES.Name ? IMAGENES.Name : "";
      $DescribeshowtextV.innerHTML = IMAGENES.Describe ? IMAGENES.Describe : "";
      $CityshowtextV.innerHTML =  IMAGENES.City ? IMAGENES.City : "";
      $RegionshowtextV.innerHTML = IMAGENES.Region ? IMAGENES.Region : "";
      $SmokershowtextV.innerHTML = IMAGENES.Smoker ? IMAGENES.Smoker : "";
      $CMCountry.innerHTML = IMAGENES.Country ? "&nbsp;&nbsp;"+IMAGENES.Country+", "+IMAGENES.Region : "&nbsp;Country: ";
      var namefull = IMAGENES.Name!=undefined?IMAGENES.Name:IMAGENES.Nickname
      var chatnoexit = "NO EXISTE";
      if(userinflocallet.block!=undefined){
        if(userinflocallet.block[idkey]){
          $CMblock.innerHTML = '<a onclick="Blockchat('+"'"+idkey+"'"+','+"'chat'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-unlock"></i>&nbsp;Unblock</a>'
        }else{
          $CMblock.innerHTML = '<a onclick="Blockchat('+"'"+idkey+"'"+','+"'chat'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-lock"></i>&nbsp;block</a>'
        }  
      }
      
      if(chatonext!=null){
        $CMreport.innerHTML = '<a onclick="createchatreport('+"'"+chatonext.chatid+"'"+','+"'"+namefull+"'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-flag"></i>&nbsp;Report</a>'
  
      }else{
        $CMreport.innerHTML = '<a onclick="createchatreport('+"'"+chatnoexit+"'"+','+"'"+namefull+"'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-flag"></i>&nbsp;Report</a>'
  
      }

      showimgoncarousel(IMAGENES);
      var element = "&nbsp;&nbsp;Languange: ";
      for (let index = 0; index < IMAGENES.Boxs.length; index++) {
        document.getElementById("labeltags").innerHTML += '<a href="#" class="inline-block rounded-full text-white bg-black hover:bg-gray-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100">'
        if(IMAGENES.Boxs[index]=="Openrelationship"){
          + "Relación abierta";
        }
        if(IMAGENES.Boxs[index]=="Hangingout"){
          + "pasar el rato";
        }
        if(IMAGENES.Boxs[index]=="Couplerelationship"){
          + "Relación de pareja";
        }
        if(IMAGENES.Boxs[index]=="Onerightstands"){
          + "Salir una noche";
        }
        if(IMAGENES.Boxs[index]=="Friendship"){
          + "Amistad";
        }
        +'</a>'
      }
      for (let index = 0; index < IMAGENES.Languange.length; index++) {
        if(index!=0){
          element += IMAGENES.Languange[index]+", ";
        }else{
          element += IMAGENES.Languange[index]+" ";
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

  $CMblock.addEventListener('click', blockchatf);
  $CMbtnChat.addEventListener('click', clikgoViewTochat);
  $CMbtnheart.addEventListener('click', addfavoriteUser);
  $ModalFirebtn.addEventListener('click', ModalFirebtn);
  /**
   * $botonRetroceder.addEventListener('click', retrocederFoto);
   */
  
  // Iniciar
  renderizarImagen();
  showLoading(false)
}

function addfavoriteUserbg(key){
  firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+key).once('value', (snapshot) => {
    let $CMbtnheart = document.querySelector('#CMbtnheart');
    if (snapshot.exists() && snapshot.val()) {
      setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+key,false,function(){
        
      })
      $CMbtnheart.style.color = "white"
      $CMbtnheart.style.background = "#dc3545"
    }
    else {
        $CMbtnheart.style.color = "#dc3545"
       $CMbtnheart.style.background = "white"
      setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+key,true,function(){
        
      })
    }
    verificfavoritebg(key);
});   
}

function deletechat(id){

  swal({
    title: "Are you sure?",
    text: "Delete this chat!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      firebase.database().ref("Users/"+userinflocal.uid+"/chats/"+id).remove();
      let idvar =  "#"+id+"Chatlist";
      $(idvar).hide();
      swal("successful process", {
        icon: "success",
      }).then((value) => {
  
    });
    } else {
 
    }
  });
}
//
function verificfavoritebg(key){ 
  firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+key).once('value', (snapshot) => {
    let $CMbtnheart = document.querySelector('#CMbtnheart');
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

function Blockchat(key,view){
  showLoading(true);
  let userinflocallet = JSON.parse(localStorage.getItem("user"));
  firebase.database().ref("Users/"+userinflocallet.uid+"/block/"+key).once('value', (snapshot) => {
    if (snapshot.exists()) {
      if(snapshot.val()){
        setDataforFunctions("Users/"+userinflocallet.uid+"/block/"+key,false,function(){        
          let user = firebase.auth().currentUser;
          if (user !== null) {
            showLoading(true);
           initgetdatareallyuser(user,"404")
          }
        });
        }else{
        setDataforFunctions("Users/"+userinflocallet.uid+"/block/"+key,true,function(){
          let user = firebase.auth().currentUser;
          if (user !== null) {
            showLoading(true);
           initgetdatareallyuser(user,"404")
          }
        });
      }
    }
    else {
        setDataforFunctions("Users/"+userinflocallet.uid+"/block/"+key,true,function(){
          let user = firebase.auth().currentUser;
          if (user !== null) {
            showLoading(true);
           initgetdatareallyuser(user,"404")
          }
      });
    }
  });

}
function AandAcreatechatreport() {
  let userinflocallet = JSON.parse(localStorage.getItem("user"));
  firebase.database().ref("chatsReport/"+userinflocallet.uid+"report~").once('value', (snapshot) => {
    if (snapshot.exists() && snapshot.val()) {
      goViewTochatreport(userinflocallet.uid+"report~","Report",true,"Report","0","https://cdn.imagecomics.com/assets/img/default-user-square.svg")
    }
    else {
      let timenow = firebase.database.ServerValue.TIMESTAMP
      let ul =  userinflocallet.uid
      let  userlocalinf = {
        key:userinflocallet.uid,
        PictureProfile:userinflocallet.PictureProfile,
        status:userinflocallet.Online,
        Age:userinflocallet.Age,
        Nickname:userinflocallet.Nickname,
        Type:userinflocallet.Type!=null?userinflocallet.Type:"User",
      };
      let usertargefd = {
        key:userinflocallet.uid+"report~",
        PictureProfile:"https://cdn.imagecomics.com/assets/img/default-user-square.svg",
        status:true,
        Age:"0",
        Nickname:"Report",
        Type:"Report",
      };
      let userinf = {
        email:userinflocallet.email,
        uid:userinflocallet.uid,
        userT:usertargefd,
        userE:userlocalinf,
        view:"",
      }
       let cht = new Chat(userinf.uid,userinflocallet.uid+"report~","",false,false,"","" ,timenow,userinf,timenow);
        setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~",cht,function(){
        setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/Createby/view/"+userinflocal.uid,{
          v:true,
        },function(){});
        setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/Createby/view/"+usertargefd.key,{
          v:false,
        },function(){});
        setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/TypeChat","report",function(){});
        swal("successful process", {
          icon: "success",
        }).then((value) => {
          goViewTochatreport(userinflocallet.uid+"report~","Report",true,"Report","0","https://cdn.imagecomics.com/assets/img/default-user-square.svg")
      });
      });

    }

});

}
function createchatreport(key,nickname) {
  let userinflocallet = JSON.parse(localStorage.getItem("user"));
  firebase.database().ref("chatsReport/"+userinflocallet.uid+"report~").once('value', (snapshot) => {
    if (snapshot.exists() && snapshot.val()) {
      if(document.getElementById("viewprofileModal")){
        document.getElementById("viewprofileModal").style.display = "none";//ocultamos el modal
      }

    
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
      swal("Write your report:", {
        content: "input",
      })
      .then((value) => {
        if(value!=""&&value!=null){
          let timenow = firebase.database.ServerValue.TIMESTAMP
          var createby = {displayName:userinflocallet.Nickname,uid:userinflocallet.uid}
          let strngmjs = "Perfil Denunciado: "+ nickname +" \n"+
          "Motivo: "+value;
          let msj = new Messager(strngmjs,createby,key,userinflocallet.uid+"report~",timenow);
          console.log(msj)
          setListDataforFunctions("messages/"+userinflocallet.uid+"report~",msj,null);
          firebase.database().ref("chatsReport/"+userinflocallet.uid+"report~/Lastmessage").set(strngmjs)
          goViewTochatreport(userinflocallet.uid+"report~","Report",true,"Report","0","https://cdn.imagecomics.com/assets/img/default-user-square.svg")
        }

      });


    }
    else {
      if(document.getElementById("viewprofileModal")){
        document.getElementById("viewprofileModal").style.display = "none";//ocultamos el modal
      }

    
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
      swal("Write your report:", {
        content: "input",
      })
      .then((value) => {
        if(value!=""&&value!=null){
          msjrepor = value;
          let timenow = firebase.database.ServerValue.TIMESTAMP
          let ul =  userinflocallet.uid
          let  userlocalinf = {
            key:userinflocallet.uid,
            PictureProfile:userinflocallet.PictureProfile,
            status:userinflocallet.Online,
            Age:userinflocallet.Age,
            Nickname:userinflocallet.Nickname,
            Type:userinflocallet.Type!=null?userinflocallet.Type:"User",
          };
          let usertargefd = {
            key:userinflocallet.uid+"report~",
            PictureProfile:"https://cdn.imagecomics.com/assets/img/default-user-square.svg",
            status:true,
            Age:"0",
            Nickname:"Report",
            Type:"Report",
          };
          let userinf = {
            email:userinflocallet.email,
            uid:userinflocallet.uid,
            userT:usertargefd,
            userE:userlocalinf,
            view:"",
          }
          let strngmjs = "Perfil Denunciado: "+ nickname +" \n"+
          "Motivo: "+value;
           let cht = new Chat(userinf.uid,userinflocallet.uid+"report~","",false,false,"",value ,timenow,userinf,timenow);
            setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~",cht,function(){
            let timenow = firebase.database.ServerValue.TIMESTAMP
            var createby = {displayName:userinflocallet.Nickname,uid:userinflocallet.uid}
            let msj = new Messager(strngmjs,createby,key,userinflocallet.uid+"report~",timenow);
            setListDataforFunctions("messages/"+userinflocallet.uid+"report~",msj,null);
            firebase.database().ref("chatsReport/"+userinflocallet.uid+"report~/Lastmessage").set(strngmjs)
            setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/Createby/view/"+userinflocal.uid,{
              v:true,
            },function(){});
            setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/Createby/view/"+usertargefd.key,{
              v:false,
            },function(){});
            setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~"+"/TypeChat","report",function(){});
            swal("successful process", {
              icon: "success",
            }).then((value) => {
              goViewTochatreport(userinflocallet.uid+"report~","Report",true,"Report","0","https://cdn.imagecomics.com/assets/img/default-user-square.svg")
          });
          });

        }

      });
    
    }

});

}
//route
function reloadviewmain(){
  activeTabB("#HometabB");
  tapchatactive("Mensajesid")
  HTTP_GET("main.html", "containermain", null, null, true)
}

function goViewprofileview(id){
  activeTabB("nada")
  userprofileview = id
  HTTP_GET("profileview.html", "containermain", null, null, true)
}

function goViewmenuTochat(){
  activeTabB("#TochattabB");
  HTTP_GET("chat.html", "containermain", function(data){

  },null, true)
}

function goViewFavorites(){
  activeTabB("#FavoritetabB")
  HTTP_GET("favorite.html", "containermain", null, null, true)
}

function goViewblock(){
  activeTabB("#blocktabB")
  HTTP_GET("block.html", "containermain", null, null, true)
}

function updatedataUser(){
  activeTabB("#ProfiletabB")
  HTTP_GET("RegisterProfilesF.html", "containermain", null, null, true)
}

function goViewsearchpage(){
  activeTabB("#searchpagebB")
  HTTP_GET("searchpage.html", "containermain", null, null, true)
}

function goViewTochatreport(key,nickname,status,Type,Age,PictureProfile){
  activeTabB("#TochattabB");
  if(commentsReffs!=false){
    commentsReffs.off();
    commentsRef.off();
    if(commentsRefmsj){
      commentsRefmsj.off();
    }
   
  }
  console.log(key);
  usertargereport = true
  HTTP_GET("chat.html", "containermain", function(data){
    usertarge = {
      key:key,
      PictureProfile:PictureProfile,
      status:status,
      Age:Age,
      Nickname:nickname,
      Type:Type,
    };
  
  }, key, true)
}

function goViewTochat(key,nickname,status,Type,Age,PictureProfile){
  activeTabB("#TochattabB");
  if(commentsReffs!=false){
    commentsReffs.off();
    commentsRef.off();
    if(commentsRefmsj){
      commentsRefmsj.off();
    }
   
  }
  console.log(key);
  usertargereport = false;

  HTTP_GET("chat.html", "containermain", function(data){
    usertarge = {
      key:key,
      PictureProfile:PictureProfile,
      status:status,
      Age:Age,
      Nickname:nickname,
      Type:Type,
    };
  
  }, key, true)
}

function showmenucorner(){
  document.querySelector('#showmenucorneroptions').classList.toggle('hidden') 

}


function signOut(){
  let uid = JSON.parse(localStorage.getItem("user")).uid;
  setDataforFunctions("Users/"+uid+"/Online",false,null)
  firebase.auth().signOut().then(() => {
    location.href="landingpage.html";
  }).catch((error) => {
    consoel.log(error)
    // An error happened.
  });
}


//
//Cambiar entre favoritos y chats, en el menu lateral 
//
function tapchatactive(id){
  contovermenuneed = 1000;
  document.getElementById("Idfriendlist").innerHTML = "";
  document.getElementById("Favoritosid").style.zIndex = 0;
  document.getElementById("Favoritosid").style.backgroundColor = "#B78D90";
  document.getElementById("Mensajesid").style.zIndex = 0;
  document.getElementById("Mensajesid").style.backgroundColor = "#B78D90";
  //
  document.getElementById(id).style.zIndex = 10;
  document.getElementById(id).style.backgroundColor = "#CAC1C1";
 
  if("Favoritosid" == id){
   renderizaFavoritosid()
  }else{
 
   forEachtchats(userinflocal.uid)
  }
 }
//
//Mostrar los favoritos en el menu lateral, pintar el html.
//
 function renderizaFavoritosid() {
  document.getElementById("Idfriendlist").innerHTML = "";
  firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser").once('value', (snapshotp) => {
      if (snapshotp.exists()) {
          snapshotp.forEach((childSnapshot) => {
              if(childSnapshot.val()){
                  firebase.database().ref("Users/"+childSnapshot.key).once('value', (snapshot) => {
                      if (snapshot.exists()) {
                        contovermenuneed--;
                        var namefull = snapshot.val().Name!=undefined?snapshot.val().Name:snapshot.val().Nickname
                        document.getElementById("Idfriendlist").innerHTML +=
                         '<li class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
                         '<div style="background:#CAC1C1" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                         '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + snapshot.key+ "'" + ',' + "'" + snapshot.val().Nickname+ "'" + ',' + "'" + snapshot.val().status+ "'" + ',' + "'" + snapshot.val().Type+ "'" + ',' + "'" +snapshot.val().PictureProfile+ "'" + ')" >'+  
                         '<img id="imgchatE'+snapshot.key+'" onerror="igmE('+"'"+snapshot.key+"'"+')" src="'+snapshot.val().PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                           '<span class="bg-lime-500 w-4 h-4 rounded-full relative right-8 top-5"></span>'+
                           '<div class="flex-1 pl-1 mr-16">'+
                             '<div style="color:#520202" class="font-bold text-lx">'+snapshot.val().Nickname+'</div>'+
                             '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lx">'+snapshot.val().City+'</div>'+
                           '</div>'+
                           '</a>'+
                           '<div class="dropdown absolute bottom-0 right-2">'+
                           '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                           '<i style="color:#520202" class="fas fa-ellipsis-h text-2xl"></i>'+
                           '</button>'+
                           '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                             '<li><a class="dropdown-item" onclick="deletefavorite('+"'"+snapshot.key+"'"+')" href="#">Eliminar de favorito</a></li>'+
                             '<li><a class="dropdown-item" onclick="Blockchat('+"'"+snapshot.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'+
                             '<li><a class="dropdown-item" onclick="createchatreport('+"'"+snapshot.key+"'"+','+"'"+namefull+"'"+')"  href="#">Reportar Usuario</a></li>'+
                             '</ul>'+
                            '</div>'+
                         '</div>'+
            
                       '</li>'                 
                      }
                  });
              }

          });  
     
      }
  });
}
//
//obtener, procesar y ordenar los chat o chat report en el menu lateral, para llamar a shomessagesdatachats y pintar el html
//
function forEachtchats(uid){
  firebase.database().ref("Users/"+uid+"/chats").once('value', (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        shomessagesdatachats(childSnapshot.val().chatid)
      });   
    }else {
      console.log("No data available");
    }
  });
  shomessagesdatachatsreport(userinflocal.uid+"report~")

  setTimeout(function(){ 

    commentsReffs = firebase.database().ref('chatsFS');
    commentsReffs.on('child_changed', (data) => {
      if(data.val().UserEmi == uid || data.val().Usertarge == uid){
        var viewdata = data.val().Createby.view
        if(document.getElementById("Lastmessage"+data.key)){
          document.getElementById("Lastmessage"+data.key).innerHTML = data.val().Lastmessage
          if(!viewdata[userinflocal.uid].v){
            document.getElementById("spanview"+data.key).style.display = "block"
          }else{
            document.getElementById("spanview"+data.key).style.display = "none"
          }
        }
  
      }
    });
    commentsRef = firebase.database().ref('chats');
    commentsRef.on('child_changed', (data) => {
      if(data.val().UserEmi == uid || data.val().Usertarge == uid){
        var viewdata = data.val().Createby.view
        if(document.getElementById("Lastmessage"+data.key)){
          document.getElementById("Lastmessage"+data.key).innerHTML = data.val().Lastmessage
          if(!viewdata[userinflocal.uid].v){
            document.getElementById("spanview"+data.key).style.display = "block"
          }else{
            document.getElementById("spanview"+data.key).style.display = "none"
          }
        }else{
          /*firebase.database().ref("Users/"+uid+"/chats").once('value', (snapshot) => {
            if (snapshot.exists()) {
              snapshot.forEach((childSnapshot) => {
                shomessagesdatachats(childSnapshot.val().chatid)
              });   
            }
            else {
              console.log("No data available");
            }
          });*/
        }
  
      }
    });
   }, 5000);
 
}

//
//Mostrar los chat en el menu lateral, pintar el html.
//
function shomessagesdatachats(uid){
  let blok = [];
  var getuserreallyT = [];
  firebase.database().ref("chatsFS").orderByKey().equalTo(uid).once('value', (snapshot) => {
    if (snapshot.exists()) {
     
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        var viewdata = childSnapshot.val().Createby.view
        var viewdatatag = "";
        var statusdatatag = "";
        var stringcontenhtm = "";
        var stringOnlinehtml = "";
        if(userinflocal.uid!=childSnapshot.val().Usertarge && listmainprofile.find(q => q.key == childSnapshot.val().Usertarge).Online){
          stringOnlinehtml = '<span style="background:green" class="w-4 h-4 rounded-full relative right-4 top-5"></span>'
        }else if(listmainprofile.find(q => q.key == childSnapshot.val().Usertarge).Online){
          stringOnlinehtml = '<span style="background:green" class="w-4 h-4 rounded-full relative right-4 top-5"></span>'
        }
        getuserreallyT = childSnapshot.val().Createby.userT.key == userinflocal.uid?childSnapshot.val().Createby.userE.key:childSnapshot.val().Createby.userT.key;
        var namefull = childSnapshot.val().Createby.userT.Name!=undefined?childSnapshot.val().Createby.userT.Name:childSnapshot.val().Createby.userT.Nickname
        if(!viewdata[userinflocal.uid].v){
          viewdatatag = '<span id="spanview'+uid+'" style="display:block; top: 3.5vh;   right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }else{
          viewdatatag = '<span id="spanview'+uid+'" style="display:none;  top: 3.5vh;  right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }
        if(childSnapshot.val().Createby.userT.status){
          statusdatatag = '<i style="color:green    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle"></i>'
        }else{
          statusdatatag = '<i style="color:red    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle-notch"></i>'
        }

       
          if(userinflocal.block!=undefined){   
     
            Object.keys(viewdata).forEach(function(skeys) { 
              if(skeys == userinflocal.uid){
         
               }else{
                if(userinflocal.block[skeys]===undefined){
                  contovermenuneed--;
                  stringcontenhtm =
                  '<li id='+childSnapshot.val().Createby.userT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2"  style="z-index:'+(contovermenuneed)+'">'+
                  '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                  '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
                  '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                    stringOnlinehtml +
                    '<div class="flex-1 pl-1 mr-16">'+
                      '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                      '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
                    '</div>'+
                    '</a>'+
                    '<div class="dropdown absolute bottom-0 right-2">'+
                    '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                    '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
                    '</button>'+
                    '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                      '<li><a class="dropdown-item" onclick="deletechat('+"'"+childSnapshot.val().Createby.userT.key+"'"+')" href="#">Eliminar chat</a></li>'+
                      '<li><a class="dropdown-item" onclick="Blockchat('+"'"+childSnapshot.val().Createby.userT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'+
                      '<li><a class="dropdown-item" onclick="createchatreport('+"'"+childSnapshot.key+"'"+','+"'"+namefull+"'"+')"  href="#">Reportar Usuario</a></li>'+
                      '</ul>'+
                     '</div>'+
                  '</div>'+

                '</li>'
                 
                 }else if(!userinflocal.block[skeys]){
                  contovermenuneed--;
                  stringcontenhtm =
                  '<li id='+childSnapshot.val().Createby.userT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
                  '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                  '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
                  '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                    stringOnlinehtml +
                    '<div class="flex-1 pl-1 mr-16">'+
                      '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                      '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 200150pxpx;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
                    '</div>'+
                    '</a>'+
                    '<div class="dropdown absolute bottom-0 right-2">'+
                    '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                    '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
                    '</button>'+
                    '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                      '<li><a class="dropdown-item" onclick="deletechat('+"'"+childSnapshot.val().Createby.userT.key+"'"+')" href="#">Eliminar chat</a></li>'+
                      '<li><a class="dropdown-item" onclick="Blockchat('+"'"+childSnapshot.val().Createby.userT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'+
                      '<li><a class="dropdown-item" onclick="createchatreport('+"'"+childSnapshot.key+"'"+','+"'"+namefull+"'"+')"  href="#">Reportar Usuario</a></li>'+
                      '</ul>'+
                     '</div>'+
                  '</div>'+

                '</li>'

                 
                  
                 }
               }
              });

          }else{
            contovermenuneed--;
            stringcontenhtm =
             '<li id='+childSnapshot.val().Createby.userT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
             '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
             '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
             '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                stringOnlinehtml +
               '<div class="flex-1 pl-1 mr-16">'+
                 '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                 '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
               '</div>'+
               '</a>'+
               '<div class="dropdown absolute bottom-0 right-2">'+
               '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
               '<i style="color:#520202" class="fas fa-ellipsis-h text-2xl"></i>'+
               '</button>'+
               '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                 '<li><a class="dropdown-item" onclick="deletechat('+"'"+childSnapshot.val().Createby.userT.key+"'"+')" href="#">Eliminar chat</a></li>'+
                 '<li><a class="dropdown-item" onclick="Blockchat('+"'"+childSnapshot.val().Createby.userT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'+
                 '<li><a class="dropdown-item" onclick="createchatreport('+"'"+childSnapshot.key+"'"+','+"'"+namefull+"'"+')"  href="#">Reportar Usuario</a></li>'+
                 '</ul>'+
                '</div>'+
             '</div>'+

           '</li>'

            
            
          }
          document.getElementById("Idfriendlist").innerHTML += stringcontenhtm;
         
      });   

    }else{
      firebase.database().ref("chats").orderByKey().equalTo(uid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          var stringOnlinehtml = "";
          if(userinflocal.uid!=childSnapshot.val().Usertarge && listmainprofile.find(q => q.key == childSnapshot.val().Usertarge).Online){
            stringOnlinehtml = '<span style="background:green" class="w-4 h-4 rounded-full relative right-4 top-5"></span>'
          }else if(listmainprofile.find(q => q.key == childSnapshot.val().Usertarge).Online){
            stringOnlinehtml = '<span style="background:green" class="w-4 h-4 rounded-full relative right-4 top-5"></span>'
          }
          snapshot.forEach((childSnapshot) => {
            var viewdata = childSnapshot.val().Createby.view
            var viewdatatag = "";
            var statusdatatag = "";
            getuserreallyT = childSnapshot.val().Createby.userT.key == userinflocal.uid?childSnapshot.val().Createby.userE.key:childSnapshot.val().Createby.userT.key;
            if(!viewdata[userinflocal.uid].v){
              viewdatatag = '<span id="spanview'+uid+'" style="display:block; top: 3.5vh;   right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
            }else{
              viewdatatag = '<span id="spanview'+uid+'" style="display:none;  top: 3.5vh;  right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
            }
            if(getuserreallyT.status){
              statusdatatag = '<i style="color:green    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle"></i>'
            }else{
              statusdatatag = '<i style="color:red    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle-notch"></i>'
            }

            if(userinflocal.block!=undefined){   
              
              Object.keys(viewdata).forEach(function(skeys) { 
                if(skeys == userinflocal.uid){
           
                 }else{
                  if(userinflocal.block[skeys]===undefined){
                    contovermenuneed--;
                    document.getElementById("Idfriendlist").innerHTML +=
                    '<li id='+getuserreallyT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
                    '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                    '<a class="flex flex-1 items-center"  href="#" onclick="goViewTochat(' + "'" + getuserreallyT.key+ "'" + ',' + "'" + getuserreallyT.Nickname+ "'" + ',' + "'" + getuserreallyT.status+ "'" + ',' + "'" + getuserreallyT.Type+ "'" + ',' + "'" +getuserreallyT.PictureProfile+ "'" + ')" >'+  
                    '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+getuserreallyT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                       stringOnlinehtml+
                      '<div class="flex-1 pl-1 mr-16">'+
                        '<div style="color:#520202" class="font-bold text-lx">'+getuserreallyT.Nickname+'</div>'+
                        '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+getuserreallyT.Lastmessage+'</div>'+
                      '</div>'+
                      '</a>'+
                      '<div class="dropdown absolute bottom-0 right-2">'+
                      '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                      '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
                      '</button>'+
                      '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                      +'<li><a class="dropdown-item" onclick="deletechat('+"'"+getuserreallyT.key+"'"+')" href="#">Eliminar chat</a></li>'
                      +'<li><a class="dropdown-item" onclick="Blockchat('+"'"+getuserreallyT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'
                      +'<li><a class="dropdown-item" onclick="createchatreport('+"'"+getuserreallyT.key+"'"+','+"'"+getuserreallyT.Age+"'"+','+"'"+getuserreallyT.Nickname+"'"+')"  href="#">Reportar Usuario</a></li>'
                        '</ul>'+
                       '</div>'+
                    '</div>'+
       
                  '</li>'
                   
                   }else if(!userinflocal.block[skeys]){
                    contovermenuneed--;
                    document.getElementById("Idfriendlist").innerHTML +=
                    '<li id='+getuserreallyT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
                    '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                    '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + getuserreallyT.key+ "'" + ',' + "'" + getuserreallyT.Nickname+ "'" + ',' + "'" + getuserreallyT.status+ "'" + ',' + "'" + getuserreallyT.Type+ "'" + ',' + "'" +getuserreallyT.PictureProfile+ "'" + ')" >'+  
                    '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+getuserreallyT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center"></img>'+
                    stringOnlinehtml+
                      '<div class="flex-1 pl-1 mr-16">'+
                        '<div style="color:#520202" class="font-bold text-lx">'+getuserreallyT.Nickname+'</div>'+
                        '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+getuserreallyT.Lastmessage+'</div>'+
                      '</div>'+
                      '</a>'+
                      '<div class="dropdown absolute bottom-0 right-2">'+
                      '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                      '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
                      '</button>'+
                      '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                      +'<li><a class="dropdown-item" onclick="deletechat('+"'"+getuserreallyT.key+"'"+')" href="#">Eliminar chat</a></li>'
                      +'<li><a class="dropdown-item" onclick="Blockchat('+"'"+getuserreallyT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'
                      +'<li><a class="dropdown-item" onclick="createchatreport('+"'"+getuserreallyT.key+"'"+','+"'"+getuserreallyT.Age+"'"+','+"'"+getuserreallyT.Nickname+"'"+')"  href="#">Reportar Usuario</a></li>'
                        '</ul>'+
                       '</div>'+
                    '</div>'+
       
                  '</li>'
                    
                   }
                 }
                });



            }else{
              contovermenuneed--;
              document.getElementById("Idfriendlist").innerHTML +=
              '<li id='+getuserreallyT.key+"Chatlist"+' class="border-gray-400 flex flex-row mb-2" style="z-index:'+(contovermenuneed)+'">'+
              '<div style="background:#A67777" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
              '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + getuserreallyT.key+ "'" + ',' + "'" + getuserreallyT.Nickname+ "'" + ',' + "'" + getuserreallyT.status+ "'" + ',' + "'" + getuserreallyT.Type+ "'" + ',' + "'" +getuserreallyT.PictureProfile+ "'" + ')" >'+  
              '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+getuserreallyT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center"></img>'+
              stringOnlinehtml+
                '<div class="flex-1 pl-1 mr-16">'+
                  '<div style="color:#520202" class="font-bold text-lx">'+getuserreallyT.Nickname+'</div>'+
                  '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+getuserreallyT.Lastmessage+'</div>'+
                '</div>'+
                '</a>'+
                '<div class="dropdown absolute bottom-0 right-2">'+
                '<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'+
                '<i style="color:#520202" class="fas fa-ellipsis-h"></i>'+
                '</button>'+
                '<ul style="transform: translate(-121px, -102px);!important" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'+
                +'<li><a class="dropdown-item" onclick="deletechat('+"'"+getuserreallyT.key+"'"+')" href="#">Eliminar chat</a></li>'
                +'<li><a class="dropdown-item" onclick="Blockchat('+"'"+getuserreallyT.key+"'"+','+"'chat'"+')" href="#">Bloquear Usuario</a></li>'
                +'<li><a class="dropdown-item" onclick="createchatreport('+"'"+getuserreallyT.key+"'"+','+"'"+getuserreallyT.Age+"'"+','+"'"+getuserreallyT.Nickname+"'"+')"  href="#">Reportar Usuario</a></li>'
                  '</ul>'+
                 '</div>'+
              '</div>'+
 
            '</li>'

              
              
            }
  

          });          
        }
        else {
          console.log("No data available");
        }
    
      });
    }
  });
}
//
//Mostrar los chat report en el menu lateral, pintar el html.
//
function shomessagesdatachatsreport(uid){
  let blok = [];
  var getuserreallyT = [];
  firebase.database().ref("chatsReport").orderByKey().equalTo(uid).once('value', (snapshot) => {
    if (snapshot.exists()) {
     
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        var viewdata = childSnapshot.val().Createby.view
        var viewdatatag = "";
        var statusdatatag = "";
        getuserreallyT = childSnapshot.val().Createby.userT.key == userinflocal.uid?childSnapshot.val().Createby.userE.key:childSnapshot.val().Createby.userT.key;

        /*if(!viewdata[userinflocal.uid].v){
          viewdatatag = '<span id="spanview'+uid+'" style="display:block; top: 3.5vh;   right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }else{
          viewdatatag = '<span id="spanview'+uid+'" style="display:none;  top: 3.5vh;  right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }
        if(childSnapshot.val().Createby.userT.status){
          statusdatatag = '<i style="color:green    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle"></i>'
        }else{
          statusdatatag = '<i style="color:red    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle-notch"></i>'
        }*/

       
          if(userinflocal.block!=undefined){   
     
            Object.keys(viewdata).forEach(function(skeys) { 
              if(skeys == userinflocal.uid){
         
               }else{
                if(userinflocal.block[skeys]===undefined){
                  document.getElementById("Idfriendlist").innerHTML +=
                  '<li class="border-gray-400 flex flex-row mb-2">'+
                  '<div style="background:#CAC1C1" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                  '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
                  '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                    '<span class="bg-lime-500 w-4 h-4 rounded-full relative right-8 top-5"></span>'+
                    '<div class="flex-1 pl-1 mr-16">'+
                      '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                      '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
                    '</div>'+
                    '</a>'+

     
                '</li>'
                 
                 }else if(!userinflocal.block[skeys]){
                  document.getElementById("Idfriendlist").innerHTML +=
                  '<li class="border-gray-400 flex flex-row mb-2">'+
                  '<div style="background:#CAC1C1" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
                  '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
                  '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
                    '<span class="bg-lime-500 w-4 h-4 rounded-full relative right-8 top-5"></span>'+
                    '<div class="flex-1 pl-1 mr-16">'+
                      '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                      '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
                    '</div>'+
                    '</a>'+
     
                '</li>'
                 
                  
                 }
               }
              });

          }else{
             document.getElementById("Idfriendlist").innerHTML +=

             '<li class="border-gray-400 flex flex-row mb-2">'+
             '<div style="background:#CAC1C1" class="opacity-95 select-none cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">'+
             '<a class="flex flex-1 items-center" href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userT.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userT.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userT.PictureProfile+ "'" + ')" >'+  
             '<img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')" src="'+childSnapshot.val().Createby.userT.PictureProfile+'" class="flex flex-col rounded-full w-14 h-14 bg-gray-300 justify-center items-center "></img>'+
               '<span class="bg-lime-500 w-4 h-4 rounded-full relative right-8 top-5"></span>'+
               '<div class="flex-1 pl-1 mr-16">'+
                 '<div style="color:#520202" class="font-bold text-lx">'+childSnapshot.val().Createby.userT.Nickname+'</div>'+
                 '<div style="color:#520202;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 150px;" class="text-lg">'+childSnapshot.val().Lastmessage+'</div>'+
               '</div>'+
               '</a>'+
             '</div>'+

           '</li>'

            
            
          }


    

       
      });   

    }
  });
}


function deletefavorite(key){
  firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+key).once('value', (snapshot) => {
    if (snapshot.exists() && snapshot.val()) {
      setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+key,false,function(){
        
      })
    }
    else {
      setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+key,true,function(){
      
      })
    }
    renderizaFavoritosid();
});
}




var myBlurFunction = function(state) {
  /* state can be 1 or 0 */
  var containerElement = document.getElementById('main_container');
  var overlayEle = document.getElementById('overlay');

  if (state) {
      overlayEle.style.display = 'block';
      containerElement.setAttribute('class', 'blur');
  } else {
      overlayEle.style.display = 'none';
      containerElement.setAttribute('class', null);
  }
};

function htmlUsername(posicionActual,Nickname,Age,Country,Region){
  let fsf =  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="120" viewBox="0 0 604 127">'+
  '<defs>'+
   '<filter id="'+posicionActual+'N" x="0" y="0" width="604" height="127" filterUnits="userSpaceOnUse">'+
   '<feOffset dy="8" input="SourceAlpha"/>'+
   '<feGaussianBlur stdDeviation="3" result="blur"/>'+
   '<feFlood flood-opacity="0.89"/>'+
     '<feComposite operator="in" in2="blur"/>'+
     '<feComposite in="SourceGraphic"/>'+
     '</filter>'+
   '</defs>'+
 '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#'+posicionActual+'N)">'+
   '<text id="'+posicionActual+'N-2" transform="translate(9 1)" fill="#d7b6b6" font-size="50" font-family="ArialRoundedMTBold, Arial Rounded MT">'+
     '<tspan x="0" y="47" xml:space="preserve">'+Nickname+" "+ Age+' </tspan><tspan font-size="30" font-family="MicrosoftYaHeiUI, Microsoft YaHei UI">'+
     '<tspan y="99" x="25" font-size="40" font-family="MicrosoftJhengHeiUIBold, Microsoft JhengHei UI">'+Country+" "+Region+'</tspan><tspan></text>'+
   '</g>'+
 '</svg>';
 return fsf;
}



function deleteacount(){
  swal({
    title: "Esta seguro?",
    text: "Una vez eliminada, no podrá recuperar esa cuenta!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      const user = firebase.auth().currentUser;

      user.delete().then(() => {
        swal("Cuenta Eleminada", {
          icon: "success",
        }).then(()=>{
          location.href="login.html";
        })
      }).catch((error) => {
        swal(error, {
          icon: "success",
        });
        // An error ocurred
        // ...
      });

    } else {

    }
  });

}