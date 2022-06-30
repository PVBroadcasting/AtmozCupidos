import { User } from "../../scripts/model/Users.js";

function EditProfileF(){
  let profilekey = new URLSearchParams(location.search).get('IdProfileFs');
  var newdata = JSON.parse(localStorage.getItem("usereditdata"));
  var formulario = document.forms['formregister'];
  newdata.Nickname = formulario['Nickname'].value;
  newdata.Name = formulario['Name'].value;
  newdata.Age = formulario['Age'].value;
  newdata.Country = formulario['Country'].value;
  newdata.Region = formulario['Region'].value;
  newdata.Sex = formulario['Sex'].value;
  newdata.Seeking = $("#Seeking").val();
  newdata.State = formulario['state'].value;
  newdata.Bodytype = formulario['Bodytype'].value;
  newdata.Haircolor = formulario['Haircolor'].value;
  newdata.Eyecolor = formulario['Eyecolor'].value;
  newdata.Height = formulario['Height'].value;
  newdata.Weight = formulario['Weight'].value;
  newdata.Smoker = formulario['Smoker'].value;
  newdata.Languange = $("#Languange").val();
  newdata.Describe = formulario['Describe'].value;

  let boxs = [];
  $("input[type=checkbox]:checked").each(function(){
      boxs.push($(this).val())
  });
  var user = firebase.auth().currentUser;
  var  pictures = [];
  var  picturesp = [];
  if (user) {
    // User is signed in
  if(newdata.Languange!=""&&newdata.Nickname!=""&&newdata.Name!=""&&newdata.Country!=""&&newdata.Sex!=""&&
  newdata.Seeking!=""&&newdata.State!=""&&newdata.Bodytype!=""&&newdata.Haircolor!=""&&newdata.Eyecolor!=""&&
  newdata.Smoker!=""&&newdata.Weight!=""){
    showLoading(true)
    var loadData = new Promise((resolve, reject) => {
      var fileprofile = chooseFile.files[0];
      if(fileprofile){
        var storageRef = firebase.storage().ref("user/"+profilekey+"/profileimg");
          storageRef.put(fileprofile).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
              newdata.PictureProfile = Url
              resolve();
              });
          });
      }else{
        resolve();
      }
    });

    var loadData2 = new Promise((resolve, reject) => {

      if(chooseFilesp.files.length!=0){
        for (var i = 0; i < chooseFilesp.files.length; i++){
          var storageRefsp = firebase.storage().ref("user/"+profilekey+"/sp/"+i);
          storageRefsp.put(chooseFiles.files[i]).then(function(snapshotMp) {
            snapshotMp.ref.getDownloadURL().then(function(Url) {
              picturesp.push({Url});
             });

          });
          if(i == chooseFilesp.files.length-1){
            newdata.PicturePrivate = picturesp;
            resolve();
          }
        }
      }else{
        resolve();
      }
    });

    var loadData3 = new Promise((resolve, reject) => {
      if(chooseFiles.files.length!=0){
        for (var i = 0; i < chooseFiles.files.length; i++){
          var storageRefs = firebase.storage().ref("user/"+profilekey+"/s/"+i);
          storageRefs.put(chooseFiles.files[i]).then(function(snapshotM) {
            snapshotM.ref.getDownloadURL().then(function(Url) {
              pictures.push({Url});
             });

          });
          if(i == chooseFiles.files.length-1){
            newdata.Pictures = pictures;
            resolve();
          }
        }
      }else{
        resolve();
      }
    });

    Promise.all([loadData,loadData2,loadData3]).then(values => {
      console.log(pictures)
      setTimeout(function(){
        newdata.Boxs = boxs;
        var newprofileFs = firebase.database().ref("Users/"+profilekey);
        newprofileFs.set(newdata);
        showLoading(false)
        swal("","successful process", "success").then((value) => {
        location.href="RegisterProfilesF.html";
        });

      },3000)

    });

  }else{
    showLoading(false)
    swal("","some unfilled input is missing", "warning").then((value) => {

    });
  }
  }
}


function RegisterProfileF(){
  var newprofileFs = firebase.database().ref("Users").push();
  var formulario = document.forms['formregister'];
  let nickname = formulario['Nickname'].value;
  let name = formulario['Name'].value;
  let age = formulario['Age'].value;

  let country = formulario['Country'].value;
  let region = formulario['Region'].value;

  let sex = formulario['Sex'].value;
  let seeking = $("#Seeking").val();
  let state = formulario['state'].value;

  let bodytype = formulario['Bodytype'].value;
  let haircolor = formulario['Haircolor'].value;
  let eyecolor = formulario['Eyecolor'].value;

  let height = formulario['Height'].value;
  let weight = formulario['Weight'].value;
  let smoker = formulario['Smoker'].value;
  let languange = $("#Languange").val();

  let describe = formulario['Describe'].value;
  let boxs = [];
  $("input[type=checkbox]:checked").each(function(){
      boxs.push($(this).val())
  });
  var user = firebase.auth().currentUser;
  var picProfile = "";
  var  pictures = [];
  var  picturesp = [];
  if (user) {
    // User is signed in
  if(languange!=""&&nickname!=""&&name!=""&&country!=""&&sex!=""&&seeking!=""&&state!=""&&bodytype!=""&&haircolor!=""&&eyecolor!=""&&smoker!=""&&weight!=""){
    showLoading(true)
    var loadData = new Promise((resolve, reject) => {
      var fileprofile = chooseFile.files[0];
      if(fileprofile){
        var storageRef = firebase.storage().ref("profilePicturesF/"+newprofileFs.key+"/profileimg");
          storageRef.put(fileprofile).then(function(snapshot) {
           snapshot.ref.getDownloadURL().then(function(Url) {
              picProfile = Url
              resolve();
              });
          });
      }else{
        resolve();
      }
    });

    var loadData2 = new Promise((resolve, reject) => {

      if(chooseFilesp.files.length!=0){
        for (var i = 0; i < chooseFilesp.files.length; i++){
          var storageRefsp = firebase.storage().ref("profilePicturesF/"+newprofileFs.key+"/sp/"+i);
          storageRefsp.put(chooseFiles.files[i]).then(function(snapshotMp) {
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
      if(chooseFiles.files.length!=0){
        for (var i = 0; i < chooseFiles.files.length; i++){
          var storageRefs = firebase.storage().ref("profilePicturesF/"+newprofileFs.key+"/s/"+i);
          storageRefs.put(chooseFiles.files[i]).then(function(snapshotM) {
            snapshotM.ref.getDownloadURL().then(function(Url) {
              pictures.push({Url});
             });

          });
          if(i == chooseFiles.files.length-1){
            resolve();
          }
        }
      }else{
        resolve();
      }
    });

    var loadData4 = new Promise((resolve, reject) => {
       firebase.database().ref('Users').orderByChild('Codigo').limitToLast(1).once('value').then(function(snapshot) {
        snapshot.forEach((childSnapshot) => {
            resolve(childSnapshot.val().Codigo+1)
        });
        /*var usuario = (snapshot.val()) || 'No Existe';
        if(usuario!='No Existe'){

        }else{

        }*/
      }, function(error){
        //En caso de error de conexion con Firebase
        console.log(error);
    });

});

    Promise.all([loadData,loadData2,loadData3,loadData4]).then(values => {
      console.log(pictures)
      var userinflocal = JSON.parse(localStorage.getItem("user"));
      var sessionsRef = firebase.database().ref("sessions");
      let timenow = firebase.database.ServerValue.TIMESTAMP
      firebase.database().ref('Users').orderByChild('Type').equalTo("UserFS").limitToLast(1).once('value').then(function(snapshot) {
        snapshot.forEach((childSnapshot) => {
          let codigo = (parseInt(childSnapshot.val().Codigo)+parseInt(1));
          document.getElementById("codigo").innerHTML = '<a style="color:blue;cursor:pointer" id="'+codigo+'" onclick="copyToClipboard(' + "'" + codigo + "'" + ')">'+codigo+'</a>'
          document.getElementById("codigo").value = codigo
          let userinf = {
            email:userinflocal.correo,
            uid:userinflocal.uid,
          }
          let us = new User(nickname,"","UserFS",name,false,0,age,timenow,userinf,timenow,picProfile,pictures,picturesp,country,region,languange,sex,seeking,boxs,codigo,state,bodytype,haircolor,eyecolor,height,weight,smoker,describe)

            setTimeout(function(){
    
            newprofileFs.set(us);
            showLoading(false)
            swal("","successful process", "success").then((value) => {
            location.href="RegisterProfilesF.html";
            });
    
          },3000)
      });
    });
  });
  }else{
    showLoading(false)
    swal("","some unfilled input is missing", "warning").then((value) => {

    });
  }
 }
}


document.getElementById("btnEdit").addEventListener('click',function(){
    EditProfileF()
});

document.getElementById("btnRegister").addEventListener('click',function(){
    RegisterProfileF()
});
