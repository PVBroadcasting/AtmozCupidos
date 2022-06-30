var listmainprofile = [];
var commentsReffs = false;
var userinflocal = "";
var commentsRef = false;
var commentsRefmsj = false;
var usertarge;
var usertargereport = false;
var userprofileview = "null";
var countNG = 0;
var posicionActual = 0;
var VGCountry = "";
var typecode = 0;
var msjrepor = "";

function initgetdatareallyuser(user,view){
  showLoading(true)
  if(user!=null){
    if (user && user.emailVerified) {
      
     firebase.database().ref("Users/"+user.uid).once('value', (snapshot) => {
       let aux = snapshot.val();

       aux.uid = user.uid
       aux.email = user.email
       VGCountry = aux.Country
       notifyMepermiss();
       localStorage.setItem("user", JSON.stringify(aux));      
       document.getElementById("userimgsession").src = user.photoURL;
       document.getElementById("userNamesession").innerHTML = user.displayName
       document.getElementById("userpointsession").innerHTML = "Monedas: "+aux.Points  
       firebase.database().ref("Users/"+aux.uid+"/Online").set(true)      
       setTimeout(function(){ 
         if(view=="chat"){
           showLoading(true);
           goViewmenuTochat();
         }
         if(view=="block"){
           showLoading(true);
           goViewblock()
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
     });

             
       }else{
     if(!user.emailVerified){
       swal({
         title: "",
         text: "Please Verifie your Email!",
         icon: "warning",
         buttons: true,
       })
       .then((willDelete) => {
         if (willDelete) {
           firebase.auth().currentUser.sendEmailVerification();
           swal("Send Email Verification!", {
             icon: "success",
           }).then((val) => {
             swal("nothing was sent!");
           });
           

         } else {
           swal("nothing was sent!");
         }
       });
     }else{
       location.href="login.html";
     }
  
   }
  }else{
   location.href="login.html";
  }

}

(function () {
  showLoading(true)

  /*  document.addEventListener("click", function(e){

  var clic = e.target;
    console.log(clic);
    if(!document.querySelector('#showmenucorneroptions').classList.contains('hidden') && clic != document.getElementById('userimgsession')){
      document.querySelector('#showmenucorneroptions').classList.add('hidden') 
    }else if(clic == document.getElementById('userimgsession')){
      document.querySelector('#showmenucorneroptions').classList.remove('hidden') 
    }
    }, false);*/


  if (screen.width < 1024){
    document.querySelector('.listmenu').classList.add('hidden')
  }else{
    document.querySelector('.listmenu').classList.remove('hidden')
  }
  firebase.auth().onAuthStateChanged((user) => {
    initgetdatareallyuser(user)
    loaddata(user.uid)
  });
  $(window).resize(function() {
    if (screen.width < 1024){
      document.querySelector('.listmenu').classList.add('hidden')
    }else{
      document.querySelector('.listmenu').classList.remove('hidden')
    }
  });
  activeTabB("#HometabB");
  document.querySelector('[data-bs-toggle="mmenunav"]').addEventListener('click', function () {document.querySelector('.listmenu').classList.toggle('hidden')});
})();

function activeTabB(data){
  let viewGlobal = data;
  document.querySelector('#HometabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #ProfiletabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #FavoritetabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #TochattabB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #searchpagebB').classList.remove('bg-red-800')
  document.querySelector('.listmenu #blocktabB').classList.remove('bg-red-800')
  
  if(viewGlobal!="nada"){
    document.querySelector(viewGlobal).classList.add('bg-red-800')
  
  }

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

function loaddata(uid){
  firebase.database().ref("Users").orderByChild("Web").equalTo(true).once('value', (snapshot) => {
    listmainprofile = []
    snapshot.forEach((childSnapshot) => {
      if(uid != childSnapshot.key && childSnapshot.val().Online){
        var aux = childSnapshot.val();
        aux.key = childSnapshot.key;
        listmainprofile.push(aux);
      }
    });
    listmainprofile.sort(function() { return Math.random() - 0.5 });
    HTTP_GET("main.html", "containermain", null, null, true)
  });

  var commentsRefd = firebase.database().ref('notification/' + uid);
  commentsRefd.on('child_added', (data) => {
    if(data.val().type=="msj"){
      countNG++;
      document.title = "HTML ("+countNG+")";
      Notiflix.Notify.Info("new messages. "+data.val().createby.displayName);
      var notification = new Notification("new messages!. "+data.val().createby.displayName);
      firebase.database().ref('notification/'+uid+"/"+data.key).remove()


    }

  });

}

function confirbuy(){
  let ccname = $("#cc-name").val(); 
  let ccnumber = $("#cc-number").val(); 
  let exp_year = $("#exp_year").val(); 
  let exp_month = $("#exp_month").val(); 
  let cccvv = $("#cc-cvv").val();  
  if(ccname!=""&&ccnumber!=""&&exp_year!=""&&cccvv!=""&&exp_month!=""){
    document.getElementById("paymentmodalbtnclosen").click();
    let letuserinflocal = JSON.parse(localStorage.getItem("user"));
    HTTP_POST("https://us-central1-project-spcortana.cloudfunctions.net/app/addnewpoints", 
    {
      type:typecode,
      userid:letuserinflocal.uid,
      ccname:ccname,
      ccnumber:ccnumber,
      exp_year:exp_year,
      exp_month:exp_month,
      cccvv:cccvv
    }, function(data){
      document.getElementById("userpointsession").innerHTML = "Monedas:"+data+"  "
      swal("","Monedas:"+data,"success");
     })
  }
}

function addcosutonpost(data){
  typecode = data;
  if(typecode==0){
    document.getElementById("txttotal").innerHTML  = "14.99"
  }
  if(typecode==1){
    document.getElementById("txttotal").innerHTML  = "24.99"
  }
  if(typecode==2){
    document.getElementById("txttotal").innerHTML  = "44.99"
  }
  if(typecode==3){
    document.getElementById("txttotal").innerHTML  = "94.99"
  }
  if(typecode==4){
    document.getElementById("txttotal").innerHTML  = "249.99"
  }
  document.getElementById("closepriceofert").click();
}

function loadlistmainprofileGB(idkey){
  let IMAGENES = null;
  let userinflocal = JSON.parse(localStorage.getItem("user"));
    // let $botonRetroceder = document.querySelector('#retroceder'); Variables
 IMAGENES = listmainprofile.find(q => q.key == idkey);
  console.log(IMAGENES)
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
      
      if(userinflocallet.block[idkey]){
        $CMblock.innerHTML = '<a onclick="Blockchat('+"'"+idkey+"'"+','+"'chat'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-unlock"></i>&nbsp;Unblock</a>'
      }else{
        $CMblock.innerHTML = '<a onclick="Blockchat('+"'"+idkey+"'"+','+"'chat'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-lock"></i>&nbsp;block</a>'
      }     
      $CMreport.innerHTML = '<a onclick="createchatreport('+"'"+idkey+"'"+','+"'"+IMAGENES.Age+"'"+','+"'"+IMAGENES.Nickname+"'"+')" class="dropdown-item text-center"  href="#"><i class="fas fa-flag"></i>&nbsp;Report</a>'
  
      showimgoncarousel(IMAGENES);
      var element = "&nbsp;&nbsp;Languange: ";
      for (let index = 0; index < IMAGENES.Boxs.length; index++) {
        document.getElementById("labeltags").innerHTML += '<a href="#" class="inline-block rounded-full text-white bg-black hover:bg-gray-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100">'
        +IMAGENES.Boxs[index]
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
           initgetdatareallyuser(user,document.getElementById("viewprofileModal").dataset.view)
          }
        });
        }else{
        setDataforFunctions("Users/"+userinflocallet.uid+"/block/"+key,true,function(){
          let user = firebase.auth().currentUser;
          if (user !== null) {
            showLoading(true);
           initgetdatareallyuser(user,document.getElementById("viewprofileModal").dataset.view)
          }
        });
      }
    }
    else {
        setDataforFunctions("Users/"+userinflocallet.uid+"/block/"+key,true,function(){
          let user = firebase.auth().currentUser;
          if (user !== null) {
            showLoading(true);
           initgetdatareallyuser(user,document.getElementById("viewprofileModal").dataset.view)
          }
      });
    }
  });

}
function createchatreport(key,Age,nickname) {
  let userinflocallet = JSON.parse(localStorage.getItem("user"));
  firebase.database().ref("chatsReport/"+userinflocallet.uid+"report~").once('value', (snapshot) => {
    if (snapshot.exists() && snapshot.val()) {
      document.getElementById("viewprofileModal").style.display = "none";//ocultamos el modal
    
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
      swal("Write your report:", {
        content: "input",
      })
      .then((value) => {
        let timenow = firebase.database.ServerValue.TIMESTAMP
        var createby = {displayName:userinflocallet.Nickname,uid:userinflocallet.uid}
        let strngmjs = "Nickname: "+ nickname + " |Age: "+Age+" and key: "+key
        value = "Reason "+value+" \n"+strngmjs;
        let msj = new Messager(value,createby,"report",userinflocallet.uid+"report~",timenow);
        setListDataforFunctions("messages/"+userinflocallet.uid+"report~",msj,null);
        goViewTochatreport(userinflocallet.uid+"report~","Report",true,"Report","0","https://cdn.imagecomics.com/assets/img/default-user-square.svg")
      });


    }
    else {
      document.getElementById("viewprofileModal").style.display = "none";//ocultamos el modal
    
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
      swal("Write your report:", {
        content: "input",
      })
      .then((value) => {
        msjrepor = value;
        let timenow = firebase.database.ServerValue.TIMESTAMP
        let ul =  userinflocallet.uid
        let  userlocalinf = {
          key:userinflocallet.uid,
          PictureProfile:userinflocallet.PictureProfile,
          status:userinflocallet.Online,
          Age:userinflocallet.Age,
          Nickname:userinflocallet.Nickname,
          Type:userinflocallet.Type,
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
        let strngmjs = "Nickname"+nickname + " |Age:"+Age+" and key "+key
         value = "Reason "+value+" \n"+strngmjs;
         let cht = new Chat(userinf.uid,userinflocallet.uid+"report~","",false,false,"",value ,timenow,userinf,timenow);
          setDataforFunctions("chatsReport/"+userinflocallet.uid+"report~",cht,function(){
          let timenow = firebase.database.ServerValue.TIMESTAMP
          var createby = {displayName:userinflocallet.Nickname,uid:userinflocallet.uid}
          let msj = new Messager(value,createby,"report",userinflocallet.uid+"report~",timenow);
          setListDataforFunctions("messages/"+userinflocallet.uid+"report~",msj,null);
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
      });
    
    }

});

}
//route
function reloadviewmain(){
  activeTabB("#HometabB");
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


