var globallist = [];
var arrayOfArrays = [];
(function () {
    'use strict'
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      countresult();
    });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showLoading(true)
      document.getElementById("userEmailsession").innerHTML = user.email
      if(user.email=="Sassi.sntg@gmail.com" || user.email=="patrick.heingel@gmail.com" || user.email=="wagnernaima@gmail.com"){
        document.getElementById("hideM").style.display = "block"
        document.getElementById("hideS").style.display = "block"
      }

      localStorage.setItem("user", JSON.stringify(user));
      initviewCountmain()
    } else {
      goView("../../view/sign-in/index.html");
    }
  });

  document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
})();

function initviewCountmain(){
  globallist = [];
  arrayOfArrays = [];

 firebase.database().ref("Users").orderByChild("countmenssager").once('value', (snapshot) => {
   document.getElementById("totalprofile").innerHTML = "Total: "+snapshot.numChildren();
   snapshot.forEach((childSnapshot) => {
     childSnapshot.val().key = childSnapshot.key
    let ncauz = childSnapshot.val().countmenssager > 0 ? childSnapshot.val().countmenssager:0;
    if(ncauz>0){
        globallist.push({
            key:childSnapshot.key,
            PictureProfile:childSnapshot.val().PictureProfile,
            Online:childSnapshot.val().Online,
            Web:childSnapshot.val().Web,
            Codigo:childSnapshot.val().Codigo,
            Name:childSnapshot.val().Name,
            NickName:childSnapshot.val().Nickname,
            Age:childSnapshot.val().Age,
            countmenssager:childSnapshot.val().countmenssager > 0 ? childSnapshot.val().countmenssager:0,
            Country:childSnapshot.val().Country,
            Region:childSnapshot.val().Region,
            City:childSnapshot.val().City,
            Languange:childSnapshot.val().Languange,
            Createby:childSnapshot.val().Createby,
            Type:childSnapshot.val().Type
          })
    }

   });
   globallist = globallist.reverse();
   showLoading(false)
   var size = 50; 
   arrayOfArrays = [];
   for (var i=0; i<globallist.length; i+=size) {
       arrayOfArrays.push(globallist.slice(i,i+size));
   }
   document.getElementById("paginationMain").innerHTML = "";
   //diplay pagination
   for(var i = 1; i < arrayOfArrays.length + 1; i++) {
     if (i == 1) {
         document.getElementById("paginationMain").innerHTML +=
               '<li  id="idp' + i + '" class="page-item active"><a  onclick="functpagination(' + "'" + 0 + "'" + ',' + "'" + i + "'" + ')" class="page-link" >' + i + '</a></li>'
       } else {
         document.getElementById("paginationMain").innerHTML +=
               '<li  id="idp' + i +'" class="page-item" ><a  class="page-link" onclick="functpagination(' + "'" + (i - 1)+ "'" + ',' + "'" + i + "'" + ')">' + i + '</a></li>'
     }
 
   }
   diplaydataontable(0,1); 
 });

}


function diplaydataontable(num,n){
 var elements = document.getElementsByClassName('page-item');
 for (var i=0; i<elements.length; i++) {
     elements[i].classList.remove("active");
 }
 document.getElementById("idp"+n).classList.add("active")
 document.getElementById("myTable").innerHTML = "";
 console.log(arrayOfArrays[num])
 for (var i=0; i < arrayOfArrays[num].length; i++) {
  
   if(arrayOfArrays[num][i].Type=="UserFS"){
     let status = ""
   document.getElementById("myTable").innerHTML += '<tr>'
     +'<td style="display:flex"><img  height="70px" width="90px" src="'+arrayOfArrays[num][i].PictureProfile+'" alt=""><a style="position: inherit;margin-left: -23px;" onclick="goViewToEdit(' + "'" + arrayOfArrays[num][i].key + "'" + ')" href="#"><i class="fas fa-user-edit"></i></a></td>'
     +'<td>'+arrayOfArrays[num][i].Name+'</td>'
     +'<td>'+arrayOfArrays[num][i].Age+'</td>'
     +'<td>'+arrayOfArrays[num][i].Country+'</td>'
     +'<td>'+arrayOfArrays[num][i].City+'</td>'
     +'<td>'+arrayOfArrays[num][i].countmenssager+'</td>'
     +'</tr>';
   }
 }
 countresult()
}

function functpagination(num,n){
  diplaydataontable(num,n)
}

function searchprofilemain(){
  
}

function onClickHandlerOnlinestatus(id){
  if(document.getElementById("CO-"+id).checked){
    setDataforFunctions("Users/"+id+"/Online",document.getElementById("CO-"+id).checked,function(){});
  }else{
    setDataforFunctions("Users/"+id+"/Online",document.getElementById("CO-"+id).checked,function(){});
  }
}

function onClickHandlerWEBstatus(id){
  console.log(id)
  if(document.getElementById("CW-"+id).checked){
    document.getElementById("CO-"+id).disabled = false;
    firebase.database().ref("Users/"+id+"/Web").set(document.getElementById("CW-"+id).checked)
  }else{
    document.getElementById("CO-"+id).disabled = true;
    firebase.database().ref("Users/"+id+"/Web").set(document.getElementById("CW-"+id).checked)
  }
}

function goViewToEdit(key){
var path = "RegisterProfilesF.html?IdProfileFs="+key;
var a = document.createElement('a');
  a.target="_blank";
  a.href=path;
  a.click();

}

function countresult(){
  var nrows = 0;
  $("#myTable tr").each(function(){
    
   if ($(this).is(':visible')) {
    nrows++;
    document.getElementById("totalprofileresult").innerHTML = "Result:"+nrows
   }

  })
}


function deleteProfileFs(key){
  var radiobtn = document.getElementsByName('typedelete');

    swal({
      title: "Are you sure?",
      text: "Delete selected profiles!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then((willDelete) => {
      if (willDelete) {
        for (var i = 0, length = radiobtn.length; i < length; i++) {
          if (radiobtn[i].checked) { 
            firebase.database().ref('Users/'+radiobtn[i].value).remove()
            swal("successful process", {
              icon: "success",
            }).then((value) => {
            location.href="index.html";
          });
  
          } 
      }
  
      } else {
      
      }
      });
    
 

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
