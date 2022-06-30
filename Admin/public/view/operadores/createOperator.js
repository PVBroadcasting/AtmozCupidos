var gobalpoints = 0;
function Operator(nickname,correo,type,online,points,picProfile,account,typepg,lock){
    this.correo= correo ? correo : "";
    this.Nickname=nickname ? nickname : "";
    this.type = type ? type:"";
    this.Online= online ? online : false;
    this.PictureProfile = picProfile ? picProfile : "";
    this.Points = points ? points : 0;
    this.Account = account ? account : "";
    this.Typepg = typepg ? typepg : "";
    this.Lock = lock ? lock : false;
  }
  document.getElementById("singupbtn").addEventListener('click',function(){
      
  });
  
  
  (function () {
      'use strict'
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        showLoading(true)
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
   firebase.database().ref("Operator").once('value', (snapshot) => {
     document.getElementById("bodytableOperator").innerHTML = "";
     snapshot.forEach((childSnapshot) => {
       if(childSnapshot.val().type!=undefined && childSnapshot.val().Nickname!=undefined && childSnapshot.val().correo!=undefined){
       childSnapshot.val().key = childSnapshot.key
       let type = "" 
       if(childSnapshot.val().type==0){
          type = 'Newbie'
       }
       if(childSnapshot.val().type==1){
          type = 'Supervisor'
      }
      if(childSnapshot.val().type==2){
          type = 'Pro Operador'
      }
      if(childSnapshot.val().type==3){
          type = 'Admin'
      }
       document.getElementById("bodytableOperator").innerHTML += '<tr  class="border-b hover:bg-orange-100 bg-gray-100">'
       +'<td class="p-3 px-5" class="bg-transparent">'+childSnapshot.val().Lock+'</td>'
       +'<td class="p-3 px-5" class="bg-transparent">'+childSnapshot.val().Nickname+'</td>'
       +'<td class="p-3 px-5" class="bg-transparent">'+childSnapshot.val().correo+'</td>'
       +'<td class="p-3 px-5" class="bg-transparent">'+type+'</td>'
       +'<td class="p-3 px-5">'
       +'<button onclick="deleteuseroperador(' + "'" + childSnapshot.key + "'" + ',' + "'" + childSnapshot.val().key + "'" + ')" type="button" class="btn btn-danger" m-1><i class="fas fa-user-minus"></i></button>'
       +'<button onclick="lockuseroperador(' + "'" + childSnapshot.key + "'" + ',' + "'" + childSnapshot.val().Lock + "'" + ')" type="button" class="btn btn-warning m-1"><i class="fas fa-user-lock"></i></button>'
       +'</td>'
       +'</tr>'
     }
     });
     showLoading(false)
   });
  
  }
  
  function lockuseroperador(id,val){
    if(val==true){
      firebase.database().ref("Operator/"+id+"/Lock").set(false);
    }else{
      firebase.database().ref("Operator/"+id+"/Lock").set(true);
    }
    location.reload();
  }
  
  function deleteuseroperador(id,key){
    if(key == 'undefined'){
       firebase.database().ref("Operator/"+id).remove();
       goView("../../view/dashboard/dashboard.html");
    }else{
      firebase.database().ref("Operator/"+id).remove();
      goView("../../view/dashboard/dashboard.html");
    }
  
  }
  
  function redirec(){
      swal("successful process","","success")
      .then((value) => {
        location.href="../operadores/CreateOperator.html";
      });
    }
  
  function Registeroperator(){
      showLoading(true)
      let name = document.getElementById('Inp_name_user').value;
      let email = document.getElementById('Inp_email_user').value;
      let Account = document.getElementById('Inp_Account').value;
      let selectRole = document.getElementById('selectRole').value;
      let selectPaymenttype = document.getElementById('selectPaymenttype').value;
  
      if(selectPaymenttype != null && selectRole != null && name!="" && email != ""&& Account != ""){
        let us = new Operator(name,email,selectRole,false,0,"",Account,selectPaymenttype);
        setListDataforFunctions("Operator",us,redirec);
  
      }else{
        swal("Warning","warning")
        showLoading(false)
      }
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
