var gobalpoints = 0;
var userinflocal = JSON.parse(localStorage.getItem("user"));
var userinflocalN = "";
var usertargeN = "";
var gobalpoints = 0;
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
      showdataUserlocal(childSnapshot.val().Usertarge,chatid)
      showdataUserTarget(childSnapshot.val().UserEmi,chatid)
    });
  }) 

  setTimeout(function(){
    document.getElementById("idchat").innerHTML = "";
    var commentsRef = firebase.database().ref('messages/' + chatid);
    commentsRef.on('child_added', (data) => {
      console.log(data.val())
      let date = new Date(data.val().CreateTime);
      let dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
      let stylemessage = "left"
      console.log(data.val().Createby.uid +"  "+ userinflocalN.uid )
      let btnimg = data.val().check==false? '<button style="float:right;margin-right:1px" onclick="checkmsjimg(' + "'" + data.key + "'" + ',' + "'" + chatid + "'" + ',' + "'" + data.val().Content + "'" 
      +',' + "'" + data.val().Createby.displayName + "'" + ',' + "'" + data.val().Usertarge + "'" + ')" class="col-2 btn btn-primary">check</button>':"";
      let btn = data.val().check==false? '<button style="float:right;margin-right:1px" onclick="checkmsj(' + "'" + data.key + "'" + ',' + "'" + chatid + "'" + ',' + "'" + data.val().Content + "'" 
      +',' + "'" + data.val().Createby.displayName + "'" + ',' + "'" + data.val().Usertarge + "'" + ')" class="col-2 btn btn-primary">check</button>':"";
      if(data.val().Createby.uid != userinflocalN.uid ){
        stylemessage = "right";
        if(validateUrl(data.val().Content)){
          let textimg = "";
          if(data.val().textimg){
            textimg =  data.val().textimg
          }
          console.log(data.val().Content)
          document.getElementById("idchat").innerHTML += '<li  class="'+stylemessage+' clearfix rounded-md" style="background:#B78D90;background: rgba(181, 141, 144, 0.8);">'
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
            +btnimg
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
        scrollToBottom();
      }else{
        stylemessage = "left";
        if(validateUrl(data.val().Content)){
          console.log(data.val().Content)
          document.getElementById("idchat").innerHTML += '<li  class="'+stylemessage+' clearfix rounded-md" style="background:#B78D90;background: rgba(181, 141, 144, 0.8);">'
          +'<div class="chat-body clearfix ">'
              +'<div class="header">'
              +'<small class="pull-right text-white-600 text-sm" style="float: right;position: absolute;top: 0px;right: 16px;font-size: 12px;">'+dateStr+'</small>'
            +'</div>'   
            +'<div  class="h-60 max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 relative">'
            +'<img   class="object-contain w-full h-60" src="'+data.val().Content+'" alt="avatar">'
            +'</div>'
            +btnimg
          +'</div>'
        +'</li>'
        scrollToBottom();
        }else{

          let btnEdit = data.val().check==false? '<button style="float:right;" onclick="Editmsj(' + "'" + data.key + "'" + ',' + "'" + chatid + "'" + ',' + "'" + data.val().Content + "'" 
          +',' + "'" + data.val().Createby.displayName + "'" + ',' + "'" + data.val().Usertarge + "'" + ')" class="col-2 btn btn-primary">Edit</button>':"";
          document.getElementById("idchat").innerHTML += '<li class="'+stylemessage+' clearfix">'
          +'<div class="chat-body clearfix">'
            +'<div class="header">'
              +'<strong class="primary-font">'+data.val().Createby.displayName+'</strong>'
              +'<small class="pull-right text-muted">'+data.val().Usertarge+" "+dateStr+'<i class="fa fa-clock-o"></i></small>'
            +'</div>'
            +'<p id='+data.key+"textedit"+' contenteditable="true">'
            + data.val().Content
            +'</p>'
            +btn
          +'</div>'
        +'</li>'
        }
 
        scrollToBottom();
      }
 
    });
  }, 2000);
}

function colachatsv1(uid){
  document.getElementById("btnSearchmore").innerHTML = "";
  firebase.database().ref("chatsFS").orderByChild("check").equalTo(false).limitToFirst(1).once('value', (snapshot) => {       
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        let timenow = firebase.database.ServerValue.TIMESTAMP
        if(childSnapshot.val().check != undefined){
            if(!childSnapshot.val().check && childSnapshot.val().view){
                firebase.database().ref("Operator/"+uid+"/chatcheckOn").set(childSnapshot.key);
                  shomessagesdata(childSnapshot.key)
                  document.getElementById("btnSearchmore").innerHTML = '<button onclick="updatadatanext()" type="button" class="col-12 btn btn-primary">Search more</button>'
              }else{
                firebase.database().ref("chatsFS").orderByChild("check").equalTo(false).limitToFirst(1).once('value', (snapshot) => {       
                  if (snapshot.exists()) {
                    firebase.database().ref("chatsFS/"+childSnapshot.key+"/Lasttime").set(timenow)
                    colachatsv1(uid)
                   }
                   else {
                    swal("","No chat available", "warning")
                   }
               });
               
              }
        }else{
            firebase.database().ref("chatsFS/"+childSnapshot.key+"/Lasttime").set(timenow)
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
  document.getElementById("btnSearchmore").innerHTML = "";
       if (userinflocal) {
         console.log(userinflocal)
          firebase.database().ref("Operator/"+userinflocal.uid+"/Pointscheck").once('value', (snapshotP) => {
           if (snapshotP.exists() && (parseInt(snapshotP.val()) > 0) ) {
              gobalpoints = parseInt(snapshotP.val())
              document.getElementById("operadorpoints").innerHTML = "M.Check: " + gobalpoints

            }else{
              gobalpoints = 0
              document.getElementById("operadorpoints").innerHTML = "M.Check: " + gobalpoints

            }
          });
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
         firebase.database().ref("Operator/"+userinflocal.uid+"/chatcheckOn").once('value', (snapshot) => {
          if (snapshot.exists() && snapshot.val() != "" && snapshot.val() != "Lasttime") {
              shomessagesdata(snapshot.val())
              console.log(snapshot.val())
              document.getElementById("btnSearchmore").innerHTML = '<button onclick="updatadatanext()" type="button" class="col-12 btn btn-primary">Search more</button>'
           }else {
            firebase.database().ref("chatsFS").orderByChild("check").equalTo(false).limitToFirst(1).once('value', (snapshot) => {       
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


    document.querySelector('[data-bs-toggle="operadores"]').addEventListener('click', function () {document.querySelector('.operadores-collapse').classList.toggle('open')});
})()

document.getElementById("sendmessagebtn").addEventListener('click',function(){
    sendmessage()
});


function scrollToBottom() {
  var div = $(".chat-message");
  div.scrollTop(div.prop('scrollHeight'));

}



function sendmessage() {
 
}

function updatadata(kety){
  scrollToBottom();
  let timenow = firebase.database.ServerValue.TIMESTAMP
  if(kety!=""&&kety!=null){
    firebase.database().ref("chatsFS/"+kety+"/check").set(true)

  }  
  firebase.database().ref("Operator/"+userinflocal.uid+"/chatcheckOn").remove();
  let hoy = new Date();
  var oneJan = new Date(hoy.getFullYear(),0,1);
  var numberOfDays = Math.floor((hoy - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil(( hoy.getDay() + 1 + numberOfDays) / 7);
  let fechaLOG = hoy.getFullYear()  + '-' + ( result );
  firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Pointscheck").once('value', (snapshotP) => {
    if (snapshotP.exists() && (parseInt(snapshotP.val()) > 0) ) {
       gobalpoints = parseInt(snapshotP.val())
       gobalpoints++;
       firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Pointscheck").set(gobalpoints) ;

     }else{
       gobalpoints = 1
       firebase.database().ref("OperatorLOG/"+userinflocal.uid+"/"+fechaLOG+"/Pointscheck").set(gobalpoints) ;
     }
   });
  setTimeout(function(){ location.reload() }, 1200);
 
}

function updatadatanext(){
  scrollToBottom();
  firebase.database().ref("Operator/"+userinflocal.uid+"/chatcheckOn").remove();
  setTimeout(function(){ location.reload() }, 1200);
 
}

function Editmsj(id,chatid,Content,createby,Usertarge){

}
function checkmsjimg(id,chatid,Content,createby,Usertarge){
  let timenow = firebase.database.ServerValue.TIMESTAMP
  var createby = createby
  let data = {
    text:"",
    type:"msj",
    createby:createby,
    createTime:timenow,
  }
  setListDataforFunctions("notification/"+Usertarge,data,function(){})
  firebase.database().ref("chatsFS/"+chatid+"/Lastmessage").set("&#128247;")
  firebase.database().ref("messages/"+chatid+"/"+id+"/check").set(true);
  updatadata(chatid)


}
function checkmsj(id,chatid,Content,createby,Usertarge){
  let textedit = document.getElementById(id+"textedit").innerText
  textedit = textedit.trim();
  firebase.database().ref("messages/"+chatid+"/"+id+"/Content").set(textedit.trim())
  let timenow = firebase.database.ServerValue.TIMESTAMP
  var createby = createby
  let data = {
    text:"",
    type:"msj",
    createby:createby,
    createTime:timenow,
  }
  setListDataforFunctions("notification/"+Usertarge,data,function(){})
  firebase.database().ref("chatsFS/"+chatid+"/Lastmessage").set(textedit.trim())
  firebase.database().ref("messages/"+chatid+"/"+id+"/check").set(true);
  updatadata(chatid)


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



   
