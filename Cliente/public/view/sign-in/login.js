jQuery(document).ready(function($) {

});

function login(){
    showLoading(true);
    let email = document.getElementById('Inp_email_user').value;
    let password = document.getElementById('Inp_password_user').value;
  	firebase.auth().signInWithEmailAndPassword(email, password)
  	  .then((user) => {
  	    location.href="../../index.html";
        localStorage.setItem("usereditdata",null);
        localStorage.setItem("user",null);
        showLoading(false);
  	  })
  	  .catch((error) => {
        showLoading(false);
        swal("Warning",error.message,"warning")
  	    var errorCode = error.code;
  	    var errorMessage = error.message;
   });
}


function loginwithgoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    let uidlet = result.user.uid;
    firebase.database().ref("Users/"+uidlet).once('value', function(snap) {    
      if(snap.exists()){
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        location.href="../../index.html";
        localStorage.setItem("usereditdata",null);
        localStorage.setItem("user",null);
      } else{
        let us = new User(user.email,user.email,"User","",false,0)
        let key = user.uid;
        setDataforFunctions("Users/"+key,us,function redirec(){
          swal("Cuenta creada exitosamente","","success")
          .then((value) => {
            location.href="login.html";
          });
        });
        showLoading(false)
      }
    }) 

    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
document.getElementById("registerwithgoogle").addEventListener('click',function(){
  loginwithgoogle()
});
