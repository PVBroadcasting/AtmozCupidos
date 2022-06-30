
//navegar a otra vista
function goView(path){
  location.href = path;
}

function reloadalldatauser(){
  let userdata = firebase.auth().currentUser;
  firebase.database().ref("Users/"+userdata.uid).once('value', (snapshot) => {
    let aux = snapshot.val();
    aux.uid = user.uid
    aux.email = user.email
    VGCountry = aux.Country
    loaddata(aux.uid)
    notifyMepermiss();
    localStorage.setItem("user", JSON.stringify(aux));      
    document.getElementById("userimgsession").src = user.photoURL;
    document.getElementById("userNamesession").innerHTML = user.displayName
    document.getElementById("userpointsession").innerHTML = "Monedas: "+aux.Points  
    firebase.database().ref("Users/"+aux.uid+"/Online").set(true)      

  });
}
function addnewcustomermoney(){
  let userinflocal = JSON.parse(localStorage.getItem("user"));
  if(userinflocal!=undefined){
    let p = parseInt(userinflocal.Points) + 100
    setDataforFunctions("Users/"+userinflocal.uid+"/Points",p,null,true)
    swal("","El Usuario tiene "+p+" puntos","success").then((value) => {
      userinflocal.Points = p
      localStorage.setItem("user", JSON.stringify(userinflocal));    
    });
  }

}


function sendEmailresetpassword(){
  showLoading(true)
  if(JSON.parse(localStorage.getItem("user")).email!=""&&JSON.parse(localStorage.getItem("user")).email.includes('@')){
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(JSON.parse(localStorage.getItem("user")).email)
    .then(function() {  
      swal("","Se envie un correo para restablecer la contraseña a:"+ JSON.parse(localStorage.getItem("user")).email,"success")
      showLoading(false)
    // Email sent.
    })
    .catch(function(error) {
    // An error happened.
    });
  }else{
    swal("","The field is empty","warning")
    showLoading(false)
  }

}

//control para mostrar el loading en pantalla y quitarlo tambien
function showLoading(bool) {
    var elementLoad = document.getElementById("Loading");
    if (bool) {
        elementLoad.style.display = "block";
    } else {
        elementLoad.style.display = "none";
    }
}

function reloaddataUserlocal(){
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  firebase.database().ref("Users/"+userinflocal.uid).once('value', (snapshot) => {
    let auxuser = snapshot.val();
    auxuser.uid = userinflocal.uid
    auxuser.email = userinflocal.email
    auxuser.Points = auxuser.Points?auxuser.Points:"0";
    localStorage.setItem("user", JSON.stringify(auxuser));   
 });
 swal("Se recargara la pagina para aplicar los filtros","", "success").then((value) => {
  location.href = "index.html";     
});

}

//obtener informacion para procesarla con una funcion callback
function getDataforFunctions(path,_Callback){
  showLoading(true)
  var fn1 = getItemOfFirebaseDatabase(path);
  Promise.all([fn1]).then(values => {
    if(_Callback){
      _Callback(values[0])
    }
    showLoading(false)
  });
}

function setListDataforFunctions(path,data,_Callback,showSpiners){
  try {
      if (showSpiners == undefined) { showLoading(false)  } else { if (showSpiners == true) { showLoading(true) } }
      var fn1 = setListItemOfFirebaseDatabase(path,data);
      Promise.all([fn1]).then(values => {
        if(_Callback){
          _Callback(values[0])
        }
        showLoading(false)
      });
  } catch (error) {
      showLoading(false);
  }
}

function setDataforFunctions(path,data,_Callback,showSpiners){
  try {
      if (showSpiners == undefined) { showLoading(false)  } else { if (showSpiners == true) { showLoading(true) } }
      var fn1 = setItemOfFirebaseDatabase(path,data);
      Promise.all([fn1]).then(values => {
        if(_Callback){
          _Callback(values[0])
        }
        showLoading(false)
      });
  } catch (error) {
      showLoading(false);
  }
}


//Firebase consultas promise
function getItemOfFirebaseDatabase(path){
  return new Promise((resolve, reject) => {
    firebase.database().ref(path).once('value', (snapshot) => {
      resolve(snapshot.val());
    }, function(error) {
        showLoading(false)
        swal("Warning",error.message,"warning")
    });
  });
}

function setItemOfFirebaseDatabase(path,item){
  return new Promise((resolve, reject) => {
     let referencia = firebase.database().ref(path);
     referencia.set(item).then(function() {
           resolve(referencia.key);
      }).catch(function(error) {
          showLoading(false)
          swal("Warning",error.message,"warning")
      });
  });
}

function setListItemOfFirebaseDatabase(path,item){
  return new Promise((resolve, reject) => {
     let referencia = firebase.database().ref(path).push(item);
     referencia.set(item).then(function() {
           resolve(referencia.key);
      }).catch(function(error) {
          showLoading(false)
          swal("Warning",error.message,"warning")
      });
  });
}
