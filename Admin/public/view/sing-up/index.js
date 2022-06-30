import { User } from "../../scripts/model/Users.js";


function redirec(){
  swal("successful process","","success")
  .then((value) => {
    location.href="login.html";
  });
}

function registerwithgoogle(){
  
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    let us = new User(email,email,"User","",false,0)
    let key = user.uid;
    firebase.auth().currentUser.sendEmailVerification();
    firebase.auth().currentUser.updateProfile({
      displayName: email,
    });
    setDataforFunctions("Users/"+key,us,redirec);
    showLoading(false)
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

function RegisterUser(){
    showLoading(true)
    let name = document.getElementById('Inp_name_user').value;
    let email = document.getElementById('Inp_email_user').value;
    let password = document.getElementById('Inp_password_user').value;
    let termsandconditions = document.getElementById('termsandconditions').checked
    if(termsandconditions && name!=""){
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            
            let us = new User(name,email,"User","",false,0)
            let key = user.user.uid;
            firebase.auth().currentUser.sendEmailVerification();
            firebase.auth().currentUser.updateProfile({
              displayName: name,
            });
            setDataforFunctions("Users/"+key,us,redirec);
            showLoading(false)

        })
        .catch((error) => {
          swal("Warning",error.message,"warning")
          showLoading(false)
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }else{
        showLoading(false)
      if(!termsandconditions){
        swal("","it is necessary to accept the terms and conditions","warning")
      }
    }
}



document.getElementById("singupbtn").addEventListener('click',function(){
    RegisterUser()
});

document.getElementById("registerwithgoogle").addEventListener('click',function(){
  registerwithgoogle()
});

