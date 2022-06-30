var gobalpoints = 0;
(function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
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
            initviewCountStats();
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
      } else {
        goView("../../view/sign-in/index.html");
      }
    });
  
    document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
  })();
  
  
  function initviewCountStats(){
      let userinflocal = JSON.parse(localStorage.getItem("user"));
      var statsvalue = [
    
          { points: '1701', valur: 0.25},
    
          { points: '1501', valur: 0.24},
   
          { points: '1301', valur: 0.23},
        
          { points: '1101', valur: 0.22},
    
          { points: '901', valur: 0.21},

          { points: '701', valur: 0.20},

          { points: '501', valur: 0.19},

          { points: '301', valur: 0.18},
          { points: '0', valur: 0.14}
      ];
      
      let hoy = new Date();
      var oneJan = new Date(hoy.getFullYear(),0,1);
      var numberOfDays = Math.floor((hoy - oneJan) / (24 * 60 * 60 * 1000));
      var result = Math.ceil(( hoy.getDay() + 1 + numberOfDays) / 7);
      let fechaLOG = hoy.getFullYear()  + '-' + ( result );
      let lastfechaLOG = hoy.getFullYear()  + '-' + ( result-1);
      var ponrtthisweek = 0  
      firebase.database().ref("UsersVerifFoto").once('value', (snapshotP) => {
        if (snapshotP.exists()) {   
            snapshotP.forEach((snaps) => {
              let statusV = "";
              if(snaps.val().aprobado && snaps.val().aprobado!==undefined){
                statusV = '<input  id="COVF-'+snaps.key+'" type="checkbox" onclick="onClickHandlerOnlinestatusVF('+"'"+snaps.key+"'"+')" checked />'
              }else{
                statusV = '<input  id="COVF-'+snaps.key+'" type="checkbox" onclick="onClickHandlerOnlinestatusVF('+"'"+snaps.key+"'"+')" />'
              }
              let htmlimg = '<a id="single_image" target="_blank" href="'+snaps.val().choosefilecardID+'"><img  height="85px" width="102px" src="'+snaps.val().choosefilecardID+'" alt=""></a>'
              let htmlimg2 = '<a id="single_image" target="_blank" href="'+snaps.val().choosefileSostenidoID+'"><img  height="85px" width="102px" src="'+snaps.val().choosefileSostenidoID+'" alt=""></a>'
                document.getElementById("MessagesummaryWEEk").innerHTML += "<tr><td style='line-height: 100px;'>"+snaps.key+"</td><td style='line-height: 100px;'>"+snaps.val().name+"</td><td style='line-height: 100px;'>"+snaps.val().verificountry+"</td><td>"+htmlimg+"</td><td >"+htmlimg2+"</td><td style='line-height: 100px;'>"+statusV+"</td></tr>";        
              });           
          }else{
  
          }

      }); 
      /* This is basic - uses default settings */
      $("a#single_image").fancybox();
  }
  

  function onClickHandlerOnlinestatusVF(id){
    if(document.getElementById("COVF-"+id).checked){
      setDataforFunctions("UsersVerifFoto/"+id+"/aprobado",document.getElementById("COVF-"+id).checked,function(){});
      setDataforFunctions("Users/"+id+"/Verification",document.getElementById("COVF-"+id).checked,function(){});
    }else{
      setDataforFunctions("UsersVerifFoto/"+id+"/aprobado",document.getElementById("COVF-"+id).checked,function(){});
      setDataforFunctions("Users/"+id+"/Verification",document.getElementById("COVF-"+id).checked,function(){});
    }
  }