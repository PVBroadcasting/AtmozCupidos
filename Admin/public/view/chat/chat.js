var userinflocal = JSON.parse(localStorage.getItem("user"));
var userinflocalN = "";
var usertargeN = "";
var gobalpoints = 0;
var gogalcontercat = 0;
const imgPreview = document.getElementById("img-preview");
const imgPreviewT = document.getElementById("img-previewT");
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


function shomessagesdata(chatid){
  firebase.database().ref("chatsFS").orderByKey().equalTo(chatid)
  .once('value', function(snap) {      
    snap.forEach((childSnapshot) => {
      showdataUserTarget(childSnapshot.val().UserEmi,chatid)
      showdataUserlocal(childSnapshot.val().Usertarge,chatid)

      firebase.database().ref("chatsFS/"+chatid+"/Createby/view/"+childSnapshot.val().Usertarge+"/v").set(true)
    });
  }) 
  document.getElementById("usertargename").innerHTML = '<p onclick="copyToClipboardtext(' + "'" + chatid + "'" + ')" style="font-size: x-small;margin-bottom: 0%;" >ID Chat: '+chatid+'</p>'
  var commentsRef = firebase.database().ref('messages/' + chatid);
  commentsRef.on('child_added', (data) => {
    
    let date = new Date(data.val().CreateTime);
    let dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    let stylemessage = "right"
    if(data.val().Createby.uid == userinflocal.uid){
      stylemessage = "right";
    }else{
      stylemessage = "left";
    }
    if(!data.val().view){
      setDataforFunctions('messages/' + chatid+"/"+data.key+"/view",true,function(){});
     
    }
    if(validateUrl(data.val().Content)){
      console.log(data.val().textimg)
      let textimg = "";
      if(data.val().textimg){
        textimg =  data.val().textimg
      }
      document.getElementById("idchat").innerHTML += '<li  class="clearfix rounded-md" style="background:#B78D90;background: rgba(181, 141, 144, 0.8);">'
      +'<div class="chat-body clearfix ">'
          +'<div class="header">'
          +'<small class="pull-right text-white-600 text-sm" style="float: right;position: absolute;top: 0px;right: 16px;font-size: 12px;">'+dateStr+'</small>'
        +'</div>'   
        +'<div  class="h-60 max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 relative">'
        +'<img   class="object-contain w-full h-60" src="'+data.val().Content+'" alt="avatar">'
        +'<p>'
         +textimg
        +'</p>'
        +'</div>'

      +'</div>'
    +'</li>'
    scrollToBottom();
    }else{
      document.getElementById("idchat").innerHTML += '<li class="'+stylemessage+' clearfix">'
      +'<div class="chat-body clearfix">'
        +'<div class="header">'
          +'<strong class="primary-font">'+data.val().Createby.displayName+'</strong>'
          +'<small class="pull-right text-muted">'+data.val().Usertarge+" "+dateStr+'<i class="fa fa-clock-o"></i></small>'
        +'</div>'
        +'<p>'
        + data.val().Content
        +'</p>'
      +'</div>'
    +'</li>'
    }

    document.getElementById("CaracteresNum").innerText = Math.round(data.val().Content.replace(/ /g, "").length*70/100);
    gogalcontercat = Math.round(data.val().Content.replace(/ /g, "").length*70/100);
    scrollToBottom();
  });

}

function colachatsv1(uid){
  
  firebase.database().ref("chatsFS").orderByChild("Lasttime").limitToFirst(1).once('value', (snapshot) => {       
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        let timenow = firebase.database.ServerValue.TIMESTAMP

        if(!childSnapshot.val().answered && !childSnapshot.val().view){
          firebase.database().ref("Operator/"+uid+"/chatOn").set(childSnapshot.key);
            firebase.database().ref("chatsFS/"+childSnapshot.key+"/view").set(true)
            shomessagesdata(childSnapshot.key)
        }else{
          firebase.database().ref("chatsFS").orderByChild("answered").equalTo(false).limitToFirst(1).once('value', (snapshot) => {       
            if (snapshot.exists()) {
              firebase.database().ref("chatsFS/"+childSnapshot.key+"/Lasttime").set(timenow)
              colachatsv1(uid)
             }
             else {
              swal("","No chat available", "warning")
             }
         });
         
        }

      });
     }
     else {
       console.log("No data available");
     }

 });
}

function showdataUserTarget(key,chatid){
  firebase.database().ref("Notainfo/"+chatid+"/"+key)
  .once('value', function(snap) {      
    snap.forEach((childSnapshot) => {
      console.log(childSnapshot.val())
      if(childSnapshot.val()!=""){
        document.getElementById("listnotasUser").innerHTML += '<li>'+childSnapshot.val()+'</li>'
      }
     
    });
  }) 
  firebase.database().ref("Users").orderByKey().equalTo(key)
    .once('value', function(snap) {      
      snap.forEach((childSnapshot) => {
        let t = "TextareaUser";
        document.getElementById("btncontainerUser").innerHTML = '<button onclick="savenotainfo(' + "'" + chatid + "'" + ', ' + "'" + key + "'" + ', ' + "'" + t + "'" + ')" type="button" class="col-12 btn btn-primary">Save info</button>'
        usertargeN = childSnapshot.val();
        usertargeN.uid = key;
        console.log(usertargeN)

        document.getElementById("NicknameshowtextT").innerHTML = childSnapshot.val().Nickname
        document.getElementById("NameshowtextT").innerHTML = childSnapshot.val().Name
        document.getElementById("AgeshowtextT").innerHTML = childSnapshot.val().Age
        document.getElementById("GendershowtextT").innerHTML = childSnapshot.val().Sex 

        var Seeking = "";
        if(childSnapshot.val().Seeking!=undefined){
          for (let index = 0; index < childSnapshot.val().Seeking.length; index++) {
              Seeking += childSnapshot.val().Seeking[index]+"\n";
            }
      }
        document.getElementById("SeekingshowtextT").innerHTML = Seeking
        
        document.getElementById("HaircolorshowtextT").innerHTML = childSnapshot.val().Haircolor 
        document.getElementById("EyecolorshowtextT").innerHTML = childSnapshot.val().Eyecolor 

        document.getElementById("BodytypeshowtextT").innerHTML = childSnapshot.val().Bodytype 
        document.getElementById("HeightshowtextT").innerHTML = childSnapshot.val().Height
        document.getElementById("WeightshowtextT").innerHTML = childSnapshot.val().Weight 
        document.getElementById("SmokershowtextT").innerHTML = childSnapshot.val().Smoker
        document.getElementById("DescribeT").innerHTML = childSnapshot.val().Describe
        if(childSnapshot.val().Boxs){
          for (var i = 0; i < childSnapshot.val().Boxs.length; i++) {
            document.getElementById(childSnapshot.val().Boxs[i]+"T").style.display = "flex"
          }
        }
        imgPreviewT.style.display = "block";
        imgPreviewT.innerHTML = '<img height="150vh" src="' + childSnapshot.val().PictureProfile + '" />';
      });
    })  
}

function showdataUserlocal(key,chatid){
  console.log("showdataUserlocal")
  firebase.database().ref("Notainfo/"+chatid+"/"+key)
  .once('value', function(snap) {      
    snap.forEach((childSnapshot) => {
      console.log(childSnapshot.val())
      if(childSnapshot.val()!=""){
        document.getElementById("listnotaslocal").innerHTML += '<li>'+childSnapshot.val()+'</li>'
      }
     
    });
  }) 
  firebase.database().ref("Users").orderByKey().equalTo(key)
    .once('value', function(snap) {      
      snap.forEach((childSnapshot) => {
        let t = "TextareaLocal";
        console.log(childSnapshot.val().PictureProfile)
        document.getElementById("btncontainerlocal").innerHTML = '<button onclick="savenotainfo(' + "'" + chatid + "'" + ', ' + "'" + key + "'" + ', ' + "'" + t + "'" + ')" type="button" class="col-12 btn btn-primary">Save info</button>'
        userinflocalN = childSnapshot.val();
        userinflocalN.uid = key;
        console.log(userinflocalN)
         
        document.getElementById("Nicknameshowtext").innerHTML = childSnapshot.val().Nickname
        document.getElementById("Nameshowtext").innerHTML = childSnapshot.val().Name
        document.getElementById("Ageshowtext").innerHTML = childSnapshot.val().Age
        document.getElementById("Gendershowtext").innerHTML = childSnapshot.val().Sex 

        var Seeking = "";
        for (let index = 0; index < childSnapshot.val().Seeking.length; index++) {
          Seeking += childSnapshot.val().Seeking[index]+"\n";
        }
        document.getElementById("Seekingshowtext").innerHTML = Seeking
        
        document.getElementById("Haircolorshowtext").innerHTML = childSnapshot.val().Haircolor 
        document.getElementById("Eyecolorshowtext").innerHTML = childSnapshot.val().Eyecolor 

        document.getElementById("Bodytypeshowtext").innerHTML = childSnapshot.val().Bodytype 
        document.getElementById("Heightshowtext").innerHTML = childSnapshot.val().Height
        document.getElementById("Weightshowtext").innerHTML = childSnapshot.val().Weight 
        document.getElementById("Smokershowtext").innerHTML = childSnapshot.val().Smoker
        console.log(childSnapshot.val().Describe)
        document.getElementById("Describe").innerHTML = childSnapshot.val().Describe
        if(childSnapshot.val().PictureProfile){
          imgPreview.style.display = "block";
          imgPreview.innerHTML = '<img height="150vh" width="100%"  src="' + childSnapshot.val().PictureProfile + '" />';
        
        }
        if(childSnapshot.val().PicturePrivate){

          getDataforFunctions("LogImgPrivateSend/"+userinflocalN.uid+"/"+usertargeN.uid+"/PicturePrivate",function(data){
            console.log(data );
            if(data!=null){
              
              for (let indexd = 0; indexd < childSnapshot.val().PicturePrivate.length; indexd++) {
                for (let index = 0; index < data.length; index++) {
                  if(index==indexd){
                    document.getElementById("imagesUsersP").innerHTML  += '<div class="img-previewsNew">'+
                    '<img  class="imgUsercotent" style="border-radius: 0.5em;"    src="' + childSnapshot.val().PicturePrivate[indexd].Url + '" />'+
                   '</div></div>';
                  }else{
                    document.getElementById("imagesUsersP").innerHTML  += '<div class="img-previewsNew">'+
                    ' <input name="checkPrivateimgselectbuy" value="'+childSnapshot.val().PicturePrivate[indexd].Url+'" type="radio" >'+
                    '<img  class="imgUsercotent" style="border-radius: 0.5em;"    src="' + childSnapshot.val().PicturePrivate[indexd].Url + '" />'+
                   '</div></div>';
                  }
                  
                }
            }
            }else{
              for (let index = 0; index < childSnapshot.val().PicturePrivate.length; index++) {
          
                  document.getElementById("imagesUsersP").innerHTML  += '<div class="img-previewsNew">'+
                  ' <input name="checkPrivateimgselectbuy" value="'+childSnapshot.val().PicturePrivate[index].Url+'" type="radio" >'+
                  '<img  class="imgUsercotent" style="border-radius: 0.5em;"    src="' + childSnapshot.val().PicturePrivate[index].Url + '" />'+
                 '</div></div>';
    
              }
            }
          });


        }
        if(childSnapshot.val().Pictures){
          let Pictures = childSnapshot.val().Pictures
      
          for (var i = 0; i < Pictures.length; i++){
            if(Pictures[i]){
              console.log(Pictures[0])
              const imgPreviews = document.getElementById("img-previews"+i);
              imgPreviews.style.display = "block";
              imgPreviews.innerHTML = '<img height="80vh" width="50%" src="' + Pictures[i].Url + '" />';
            }
        
          }
        }
        if(childSnapshot.val().Boxs){
          for (var i = 0; i < childSnapshot.val().Boxs.length; i++) {
            document.getElementById(childSnapshot.val().Boxs[i]).style.display = "flex"
          }
        }
      });
    })  
}

(function () {
       if (userinflocal) {
         console.log(userinflocal)
         document.getElementById("menuaccess").innerHTML = "";
         firebase.database().ref("Operator").orderByChild("correo").equalTo(userinflocal.correo).once('value', function(snap) {      
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
   
                 document.getElementById("operadorpoints").innerHTML = "Message Sent: " + gobalpoints
                 for(var i = 0; i < statsvalue.length; i++){
                  if(i!=0){
                    document.getElementById("operadorpointsprox").innerHTML = "Messages For Next Bonus: " + ((statsvalue[i-1].points)-gobalpoints)
                  }else if(i==0){
                    document.getElementById("operadorpointsprox").innerHTML = "Messages For Next Bonus: MAX"
                  }  
                  if(gobalpoints>statsvalue[i].points){
                      document.getElementById("totalmoneyconvert").innerHTML = "€ :  "+((gobalpoints * statsvalue[i].valur)).toFixed(2)
                      i = 100; 
                  }
                 }
               }else{
                gobalpoints = 0
                document.getElementById("operadorpoints").innerHTML = "Message Sent: " + gobalpoints
                for(var i = 0; i < statsvalue.length; i++){
                  if(gobalpoints>statsvalue[i].points){
                      document.getElementById("totalmoneyconvert").innerHTML = "€ :  "+((gobalpoints * statsvalue[i].valur)+(snapshotP.val().Pointscheck * 0.10)).toFixed(2)
                      i = 100; 
                  }
                }
               }
             });
          });
        }) 


          

         firebase.database().ref("Operator/"+userinflocal.uid+"/chatOn").once('value', (snapshot) => {
          if (snapshot.exists() && snapshot.val() != "" && snapshot.val() != "Lasttime") {
              shomessagesdata(snapshot.val())
           }else {
            firebase.database().ref("chatsFS").orderByChild("answered").equalTo(false).limitToFirst(1).once('value', (snapshot) => {       
              if (snapshot.exists()) {
                colachatsv1(userinflocal.uid)
               }
               else {
                swal("","No chat available", "warning")
               }         
           }); 
           }
       });
       } else {
        location.href="login.html";
       }
     let textmessage = document.getElementById("textmessage");
        // Execute a function when the user releases a key on the keyboard
        textmessage.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("sendmessagebtn").click();
          }
        });
        // Initializes and creates emoji set from sprite sheet

    document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
})()

document.getElementById("sendmessagebtn").addEventListener('click',function(){
    sendmessage()
});


function scrollToBottom() {
  var div = $(".chat-message");
  div.scrollTop(div.prop('scrollHeight'));

}



function sendimgmessage() {
  document.getElementById("ModalimgPrivate").style.display = "none";//ocultamos el modal
    
  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal}
  swal("Añade texto al pie de la imagen:", {
    content: "input",
  }).then((value) => {
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocalN.Nickname,uid:userinflocalN.uid}

    
    if(document.querySelector('input[name="checkPrivateimgselectbuy"]:checked') !=null){
      var URl =  document.querySelector('input[name="checkPrivateimgselectbuy"]:checked').value;
      for (let index = 0; index < userinflocalN.PicturePrivate.length; index++) {
        if(userinflocalN.PicturePrivate[index].Url==URl){
          setDataforFunctions("LogImgPrivateSend/"+userinflocalN.uid+"/"+usertargeN.uid+"/PicturePrivate/"+index,true,null)
        }
      }
      firebase.database().ref("Operator/"+userinflocal.uid+"/chatOn").once('value', (snapshot) => {
        if (snapshot.exists()) {
          let kety = snapshot.val();
          let msj = new Messager(URl,createby,usertargeN.uid,kety,timenow);
          msj.textimg = value;
          //firebase.database().ref("chatsFS/"+kety+"/Lastmessage").set(textmessage)
          setListDataforFunctions("messages/"+kety,msj,updatadata(kety));
          var d = new Date();
          var date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2),('0' + d.getDate()).slice(-2)].join('-');
          console.log(date)
          //setListDataforFunctions("Report/"+userinflocal.uid+"/"+date,msj,function(){})
          let data = {
            text:"",
            type:"msj",
            createby:createby,
            createTime:timenow,
          }
          //setListDataforFunctions("notification/"+usertargeN.uid,data,function(){})
          document.getElementById("textmessage").value = "";
        }
        else {
          console.log("no existe el chat")
        }
      });
    }else{
      console.log("no seleccion")
    }
  });
  



}

function sendmessage() {
  console.log(userinflocalN.uid)
  let textmessage = document.getElementById("textmessage").value;
  let textmessageCount = document.getElementById("CaracteresNum").innerText

  var regularExpresion = /([a-zA-Z])\1{2,}/;
  if(textmessage && (textmessageCount==0) && !regularExpresion.test(textmessage)){
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocalN.Nickname,uid:userinflocalN.uid}
        firebase.database().ref("Operator/"+userinflocal.uid+"/chatOn").once('value', (snapshot) => {
          if (snapshot.exists()) {
            let kety = snapshot.val();
            let msj = new Messager(textmessage,createby,usertargeN.uid,kety,timenow);
            
            //firebase.database().ref("chatsFS/"+kety+"/Lastmessage").set(textmessage)
            setListDataforFunctions("messages/"+kety,msj,updatadata(kety));
            var d = new Date();
            var date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2),('0' + d.getDate()).slice(-2)].join('-');
            console.log(date)
            //setListDataforFunctions("Report/"+userinflocal.uid+"/"+date,msj,function(){})
            let data = {
              text:"",
              type:"msj",
              createby:createby,
              createTime:timenow,
            }
            //setListDataforFunctions("notification/"+usertargeN.uid,data,function(){})
            document.getElementById("textmessage").value = "";
          }
          else {
            console.log("no existe el chat")
          }
        });
  }else{
    if((textmessageCount>0)){
      swal("","Faltan: "+textmessageCount+" Caracteres", "warning")
    }
    if((regularExpresion.test(textmessage))){
      swal("","Muchos caracteres repetidos continuamente", "warning")
    }
  }
}


function updatadata(kety){
  scrollToBottom();
  console.log(kety)
  let timenow = firebase.database.ServerValue.TIMESTAMP
  if(kety!=""&&kety!=null){
    firebase.database().ref("chatsFS/"+kety+"/Createby/view/"+usertargeN.uid+"/v").set(false)
    firebase.database().ref("chatsFS/"+kety+"/answered").set(true)
    firebase.database().ref("chatsFS/"+kety+"/check").set(false)
    firebase.database().ref("chatsFS/"+kety+"/Lasttime").set(timenow)

  }
  	
  let hoy = new Date();
  var oneJan = new Date(hoy.getFullYear(),0,1);
  var numberOfDays = Math.floor((hoy - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil(( hoy.getDay() + 1 + numberOfDays) / 7);
  let fechaLOG = hoy.getFullYear()  + '-' + ( result );
  firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Points").once('value', (snapshotP) => {
  if (snapshotP.exists() && (parseInt(snapshotP.val()) >= 0) ) { 
    var pont = parseInt(snapshotP.val()); 
    pont++;
    firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Points").set(pont);
    for(var i = 0; i < statsvalue.length; i++){
      if(pont>statsvalue[i].points){
          document.getElementById("totalmoneyconvert").innerHTML = "€ :  "+(pont * statsvalue[i].valur)
          i = 100; 
      }
    }
    document.getElementById("operadorpoints").innerHTML = "M.E: "+pont
   }else{
    var pont = 0; 
    pont++;
    firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Points").set(pont);
    for(var i = 0; i < statsvalue.length; i++){
      if(pont>statsvalue[i].points){
          document.getElementById("totalmoneyconvert").innerHTML = "€ :  "+((pont * statsvalue[i].valur)/100)
          i = 100; 
      }
    }
    document.getElementById("operadorpoints").innerHTML = "M.E: "+pont
   }
  });
  firebase.database().ref("Users/"+usertargeN.uid+"/countmenssager").once('value', (snapshotP) => {
    snapshotP.val()
    if (snapshotP.exists() && (parseInt(snapshotP.val()) >= 0) ) { 
      var pont = parseInt(snapshotP.val()); 
      pont++;
      firebase.database().ref("Users/"+usertargeN.uid+"/countmenssager").set(pont);
     }else{
      var pont = 0; 
      pont++;
      firebase.database().ref("Users/"+usertargeN.uid+"/countmenssager").set(pont);
     }
    });
  firebase.database().ref("Operator/"+userinflocal.uid+"/chatOn").remove();
  setTimeout(function(){ location.reload() }, 1200);
 
}


function savenotainfo(keychat, keyuser, from){

  let textmessage = document.getElementById(from).value;
  if(textmessage){
    document.getElementById(from).value = "";
    setListDataforFunctions("Notainfo/"+keychat+"/"+keyuser,textmessage,nada())

  }
}

function nada(){
  swal("Saved", {
    icon: "success",
  });
}

   

function updateValue() {
  let textmessageest = document.getElementById("textmessage").value;
  let totalactual = gogalcontercat - textmessageest.replace(/ /g, "").length;
  console.log(totalactual)
  if(totalactual>0){
    document.getElementById("CaracteresNum").innerText = totalactual;
  }else{
    document.getElementById("CaracteresNum").innerText = 0;
  }
  
}
