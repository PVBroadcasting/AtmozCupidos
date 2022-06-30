var gobalpoints = 0;
(function () {
   	
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    document.getElementById("datetimenow").innerHTML = " Fecha: "+fecha +" "+hora
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        firebase.database().ref("Operator").orderByChild("correo").equalTo(user.email).once('value', function(snap) {      
          snap.forEach((childSnapshot) => {
            firebase.database().ref("Operator/"+childSnapshot.key+"/Online").set(true) 
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
            initviewCountStats()
            localStorage.setItem("user", JSON.stringify(valll));
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
                       document.getElementById("totalmoneyconvertB").innerHTML = "€ :  "+((gobalpoints * statsvalue[i].valur)+(snapshotP.val().Pointscheck * 0.10)).toFixed(2)   
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
   
      } else {
        goView("../../view/sign-in/index.html");
      }
    });
  
    document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
  })();

 


  function initviewCountStats(){
    let userinflocal = JSON.parse(localStorage.getItem("user"));

    document.getElementById("msjSinresponder").innerHTML = 0;
    firebase.database().ref("chatsFS").orderByChild("answered").equalTo(false).once('value', (snapshot) => {       
        if (snapshot.exists() && !snapshot.val().view) {
            document.getElementById("msjSinresponder").innerHTML = snapshot.numChildren();
         }       
     }); 
     firebase.database().ref("chatsFS").orderByChild("check").equalTo(false).once('value', (snapshot) => {       

        if (snapshot.exists()) {
            document.getElementById("msjSincheck").innerHTML = snapshot.numChildren();
         }else{
            document.getElementById("msjSincheck").innerHTML = 0;
         }       
     }); 
     var onlineperfil = 0;
     firebase.database().ref("Users").orderByChild("Type").equalTo("UserFS").once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if(childSnapshot.val().Online){
                onlineperfil++;
              
            }
        });
        document.getElementById("totalperfilesOnline").innerHTML = onlineperfil;
    });
 
   var totalOperadoresOnline = 0;
   firebase.database().ref("Operator").orderByChild("Online").equalTo(true).once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        if(childSnapshot.val().Online && childSnapshot.val().type == "0"){
            totalOperadoresOnline++;          
        }
    });
    document.getElementById("totalOperadoresOnline").innerHTML = totalOperadoresOnline;
});


var totalOperadoresOnlinesuperv = 0;
firebase.database().ref("Operator").orderByChild("Online").equalTo(true).once('value', (snapshot) => {
 snapshot.forEach((childSnapshot) => {
     if(childSnapshot.val().Online && (childSnapshot.val().type == "1" || childSnapshot.val().type == "2" || childSnapshot.val().type == "3")){
         totalOperadoresOnlinesuperv++;          
     }
 });
 document.getElementById("totalOperadoresOnlinesuperv").innerHTML = totalOperadoresOnlinesuperv;
});
   
}
