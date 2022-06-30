var globallist = [];
var arrayOfArrays = [];
var gobalpoints = 0;
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
      document.getElementById("menuaccess").innerHTML = "";
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
                  let chpoint  =   snapshotP.val().Pointscheck == undefined ? 0 : snapshotP.val().Pointscheck 
                     document.getElementById("totalmoneyconvertB").innerHTML = "€ :  "+((gobalpoints * statsvalue[i].valur)+(chpoint * 0.10)).toFixed(2)   
                     i = 100; 
                 }
               }
             }else{
               for(var i = 0; i < statsvalue.length; i++){
                 if(gobalpoints>statsvalue[i].points){
                     document.getElementById("totalmoneyconvertB").innerHTML = "€ :  "+((gobalpoints * statsvalue[i].valur)).toFixed(2)
                     i = 100; 
                 }
               }
             }
           });
        });

      }) 

  
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

 firebase.database().ref("Users").orderByChild("Type").equalTo("UserFS").once('value', (snapshot) => {
   document.getElementById("totalprofile").innerHTML = "Total: "+snapshot.numChildren();
   snapshot.forEach((childSnapshot) => {
     childSnapshot.val().key = childSnapshot.key

     globallist.push({
       key:childSnapshot.key,
       PictureProfile:childSnapshot.val().PictureProfile,
       Online:childSnapshot.val().Online,
       Web:childSnapshot.val().Web,
       Codigo:childSnapshot.val().Codigo,
       Name:childSnapshot.val().Name,
       NickName:childSnapshot.val().Nickname,
       Age:childSnapshot.val().Age,
       Verification:childSnapshot.val().Verification,
       Country:childSnapshot.val().Country,
       Region:childSnapshot.val().Region,
       City:childSnapshot.val().City,
       Languange:childSnapshot.val().Languange,
       Createby:childSnapshot.val().Createby,
       Type:childSnapshot.val().Type
     })
   });
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
     let statusV = "";
     if(arrayOfArrays[num][i].Online){
       status = "Online"
     }else{
       status = "Offline"
     }
     if(arrayOfArrays[num][i].Web){
      if(arrayOfArrays[num][i].Online){
        status = '<input  id="CO-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatus('+"'"+arrayOfArrays[num][i].key+"'"+')" checked />'
      }else{
        status = '<input  id="CO-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatus('+"'"+arrayOfArrays[num][i].key+"'"+')" />'
      }
      if(arrayOfArrays[num][i].Verification && arrayOfArrays[num][i].Verification!==undefined){
        statusV = '<input  id="COV-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatusV('+"'"+arrayOfArrays[num][i].key+"'"+')" checked />'
      }else{
        statusV = '<input  id="COV-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatusV('+"'"+arrayOfArrays[num][i].key+"'"+')" />'
      }
      statusweb = '<input id="CW-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerWEBstatus('+"'"+arrayOfArrays[num][i].key+"'"+')" checked />'
    }else{
      if(arrayOfArrays[num][i].Online){
        status = '<input disabled id="CO-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatus('+"'"+arrayOfArrays[num][i].key+"'"+')" checked />'
      }else{
        status = '<input disabled id="CO-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatus('+"'"+arrayOfArrays[num][i].key+"'"+')" />'
      }
      if(arrayOfArrays[num][i].Verification && arrayOfArrays[num][i].Verification!==undefined){
        statusV = '<input disabled  id="COV-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatusV('+"'"+arrayOfArrays[num][i].key+"'"+')" checked />'
      }else{
        statusV = '<input disabled  id="COV-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerOnlinestatusV('+"'"+arrayOfArrays[num][i].key+"'"+')" />'
      }
      statusweb = '<input id="CW-'+arrayOfArrays[num][i].key+'" type="checkbox" onclick="onClickHandlerWEBstatus('+"'"+arrayOfArrays[num][i].key+"'"+')" />'
    }

   document.getElementById("myTable").innerHTML += '<tr>'
     +'<td ><input style="" type="checkbox"  name="typedelete" value="'+arrayOfArrays[num][i].key+'"></td>'
     +'<td style="display:flex"><img  height="85px" width="102px" src="'+arrayOfArrays[num][i].PictureProfile+'" alt=""><a style="position: inherit;margin-left: -23px;" onclick="goViewToEdit(' + "'" + arrayOfArrays[num][i].key + "'" + ')" href="#"><i class="fas fa-user-edit"></i></a></td>'
     +'<td>'+status+'</td>'
     +'<td>'+statusweb+'</td>'
     +'<td>'+statusV+'</td>'
     +'<td><a style="color:blue;cursor:pointer" id="'+arrayOfArrays[num][i].Codigo+'" onclick="copyToClipboard(' + "'" + arrayOfArrays[num][i].Codigo + "'" + ')">'+arrayOfArrays[num][i].Codigo+'</a></td>'
     +'<td>'+arrayOfArrays[num][i].Name+'</td>'
     +'<td>'+arrayOfArrays[num][i].NickName+'</td>'
     +'<td>'+arrayOfArrays[num][i].Age+'</td>'
     +'<td>'+arrayOfArrays[num][i].Country+'</td>'
     +'<td>'+arrayOfArrays[num][i].Region+'</td>'
     +'<td>'+arrayOfArrays[num][i].City+'</td>'
     +'<td>'+arrayOfArrays[num][i].Languange+'</td>'
     +'<td>'+(arrayOfArrays[num][i].Createby ? arrayOfArrays[num][i].Createby.email : "")+'</td>'
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

function onClickHandlerOnlinestatusV(id){
  if(document.getElementById("COV-"+id).checked){
    setDataforFunctions("Users/"+id+"/Verification",document.getElementById("COV-"+id).checked,function(){});
  }else{
    setDataforFunctions("Users/"+id+"/Verification",document.getElementById("COV-"+id).checked,function(){});
  }
}

function onClickHandlerWEBstatus(id){
  console.log(id)
  if(document.getElementById("CW-"+id).checked){
    document.getElementById("CO-"+id).disabled = false;
    document.getElementById("COV-"+id).disabled = false;
    firebase.database().ref("Users/"+id+"/Web").set(document.getElementById("CW-"+id).checked)
  
  }else{
    document.getElementById("CO-"+id).disabled = true;
    document.getElementById("CO-"+id).checked = false;
    document.getElementById("COV-"+id).disabled = true;
    document.getElementById("COV-"+id).checked = false;
    firebase.database().ref("Users/"+id+"/Web").set(document.getElementById("CW-"+id).checked)
    setDataforFunctions("Users/"+id+"/Online",document.getElementById("CW-"+id).checked,function(){});
    setDataforFunctions("Users/"+id+"/Verification",document.getElementById("CW-"+id).checked,function(){});
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



 
function initviewCountStats(){
  let userinflocal = JSON.parse(localStorage.getItem("user"));
  var statsvalue = [
      { points: '1700', valur: 25},
      { points: '1600', valur: 24.5},
      { points: '1500', valur: 24},
      { points: '1400', valur: 23.5},
      { points: '1300', valur: 23},
      { points: '1200', valur: 22.5},
      { points: '1100', valur: 22},
      { points: '1000', valur: 21.5},
      { points: '900', valur: 21},
      { points: '800', valur: 20.5},
      { points: '700', valur: 20},
      { points: '600', valur: 19.5},
      { points: '500', valur: 19},
      { points: '400', valur: 18.5},
      { points: '300', valur: 18},
      { points: '0', valur: 14}
  ];
  firebase.database().ref("Operator/"+userinflocal.uid+"/Points").once('value', (snapshotP) => {
      if (snapshotP.exists() && (parseInt(snapshotP.val()) >= 0) ) { 
        var pont = parseInt(snapshotP.val()); 
        for(var i = 0; i < statsvalue.length; i++){
          if(pont>statsvalue[i].points){
              document.getElementById(i+"td").style.background = "#0dcaf0"
              document.getElementById("totalmoneyconvert").innerHTML = "Total :  "+(pont * statsvalue[i].valur)
              i = 100; 
          }
        }           
      }else{
        var pontEx  = 0;
        for(var i = 0; i < statsvalue.length; i++){
          if(pontEx>=statsvalue[i].points){
              document.getElementById(i+"td").style.background = "#0dcaf0"
              document.getElementById("totalmoneyconvert").innerHTML = "Total :  "+(pontEx * statsvalue[i].valur)
              i = 100; 
          }
        }
      }
  }); 
}
