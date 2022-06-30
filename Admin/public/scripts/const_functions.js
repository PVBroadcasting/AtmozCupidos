
//navegar a otra vista
function goView(path){
  location.href = path;
}

function signOut(){
  const userinflocal = JSON.parse(localStorage.getItem("user"));
  let uid = userinflocal.uid;

  firebase.auth().signOut().then(() => {
    location.href="../sign-in/index.html";
  }).catch((error) => {
    consoel.log(error)
    // An error happened.
  });
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
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

function copyToClipboardtext(elemento) {
  var aux = document.createElement("input");
  aux.setAttribute("value",elemento);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  swal("Codigo:"+elemento+" Copiado", {
    icon: "success",
  })
  }

function copyToClipboard(elemento) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elemento).innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  swal("Codigo:"+testcopi+" Copiado", {
    icon: "success",
  })
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

function setListDataforFunctions(path,data,_Callback){
  showLoading(true)
  var fn1 = setListItemOfFirebaseDatabase(path,data);
  Promise.all([fn1]).then(values => {
    if(_Callback){
      _Callback(values[0])
    }
    showLoading(false)
  });
}

function setDataforFunctions(path,data,_Callback){
  showLoading(true)
  var fn1 = setItemOfFirebaseDatabase(path,data);
  Promise.all([fn1]).then(values => {
    if(_Callback){
      _Callback(values[0])
    }
    showLoading(false)
  });
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
