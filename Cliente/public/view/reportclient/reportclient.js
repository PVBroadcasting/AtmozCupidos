var usertargereport = false;
var usertarge;
var commentsRef = false;
var commentsRefmsj = false;
var commentsReffs = false;
userinflocal = JSON.parse(localStorage.getItem("user"));


function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function shomessagesdata(chatid){
  let status = ""
  document.getElementById("idchat").innerHTML = "";
  if(usertarge.status){
    status = '<i style="color:green" class="fas fa-circle"></i>'
  }else{
    status = '<i style="color:red" class="fas fa-circle-notch"></i>'
  }
  if(usertarge.Type == "UserFS"){
    firebase.database().ref("chatsFS/"+chatid+"/Createby/view/"+userinflocal.uid+"/v").set(true)
  }else{
    firebase.database().ref("chats/"+chatid+"/Createby/view/"+userinflocal.uid+"/v").set(true)   
  }
  if(document.getElementById('spanview'+chatid)){
    document.getElementById('spanview'+chatid).style.display = "none"
  }
  
  document.getElementById('usertargename').innerHTML = usertarge.Nickname
  document.getElementById('usertargestatus').innerHTML = status;
  commentsRefmsj = firebase.database().ref('messages/' + chatid);
  commentsRefmsj.on('child_added', (data) => {
      let date = new Date(data.val().CreateTime);
      let dateStr =("00" + (date.getMonth() + 1)).slice(-2) + "-" +("00" + date.getDate()).slice(-2) + " " +("00" + date.getHours()).slice(-2) + ":" +("00" + date.getMinutes()).slice(-2) + ":" +("00" + date.getSeconds()).slice(-2);
      let stylemessage = "right"
      if(data.val().Createby.uid == userinflocal.uid){
        stylemessage = "left";
      }else{
        if(!data.val().view && chatid == data.val().chatid){
          setDataforFunctions('messages/' + chatid+"/"+data.key+"/view",true,function(){});
          if(countNG>0){
            countNG = (countNG-1)
            document.title = "HTML ("+countNG+")";
          }
        }
        stylemessage = "right";
      }
        if(!document.getElementById("li-"+data.key)){
          if(validateUrl(data.val().Content)){
            console.log(data.val().Content)
            document.getElementById("idchat").innerHTML += '<li  class="clearfix">'
            +'<div class="chat-body clearfix">'
                +'<div class="header">'
                +'<strong class="primary-font">'+data.val().Createby.displayName+'</strong>'
                +'<small class="pull-right text-muted">'+dateStr+'<i class="fa fa-clock-o"></i></small>'
              +'</div>'   
              +'<div  class="h-60 max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 relative">'
              +'<img  class="object-contain w-full h-60" src="'+data.val().Content+'" alt="avatar">'
              +'</div>'
      
            +'</div>'
          +'</li>'
          scrollToBottom();
          }else{
            document.getElementById("idchat").innerHTML += '<li id="li-'+data.key+'" class="'+stylemessage+' clearfix">'
            +'<div class="chat-body clearfix">'
              +'<div class="header">'
                +'<strong class="primary-font">'+data.val().Createby.displayName+'</strong>'
                +'<small class="pull-right text-muted">'+dateStr+'<i class="fa fa-clock-o"></i></small>'
              +'</div>'
              +'<p>'
              + data.val().Content
              +'</p>'
            +'</div>'
          +'</li>'
          scrollToBottom();
          }
        }
  });

}
(function () {  

  $(".img-circle").on("error", function(){
    $(this).attr('src', 'https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png');
  });
  document.getElementById("Idfriendlist").innerHTML = "";
  forEachtchats()
        // Execute a function when the user releases a key on the keyboard
        document.getElementById("textmessage").addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("sendmessagebtn").click();
          }
        });
        // Initializes and creates emoji set from sprite sheet

                // Execute a function when the user releases a key on the keyboard
                document.getElementById("textmessage").addEventListener("keyup", function(event) {
                  // Number 13 is the "Enter" key on the keyboard
                  if (event.keyCode === 13) {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    document.getElementById("sendmessagebtn").click();
                  }
                });
                // Initializes and creates emoji set from sprite sheet
})();

document.getElementById("sendmessagebtn").addEventListener('click',function(){
  sendmessage()
});


function forEachtchats(){

  firebase.database().ref("chatsReport").on('value', (snapshot) => {
    document.getElementById("Idfriendlist").innerHTML = "";
    console.log(snapshot.val())
    if (snapshot.exists()) {
 
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        var viewdata = childSnapshot.val().Createby.view
        var viewdatatag = "";
        var statusdatatag = "";
        getuserreallyT = childSnapshot.val().Createby.userT.key == userinflocal.uid?childSnapshot.val().Createby.userE.key:childSnapshot.val().Createby.userT.key;

        /*if(!viewdata[userinflocal.uid+"report~"].v){
          viewdatatag = '<span id="spanview'+childSnapshot.key+'" style="display:block; top: 3.5vh;   right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }else{
          viewdatatag = '<span id="spanview'+childSnapshot.key+'" style="display:none;  top: 3.5vh;  right: 40px;width: 10px;height: 10px;border-radius: 50%;background: #007bff;"></span>'
        }
        if(childSnapshot.val().Createby.userT.status){
          statusdatatag = '<i style="color:green    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle"></i>'
        }else{
          statusdatatag = '<i style="color:red    bottom: 13px;position: absolute;left: 6px;" class="fas fa-circle-notch"></i>'
        }*/
        document.getElementById("Idfriendlist").innerHTML +=
        '<li class="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">'
        +'<a href="#" onclick="goViewTochat(' + "'" + childSnapshot.val().Createby.userE.key+ "'" + ',' + "'" + childSnapshot.val().Createby.userE.Nickname+ "'" + ',' + "'" + childSnapshot.val().Createby.userE.status+ "'" + ',' + "'" + childSnapshot.val().Createby.userE.Type+ "'" + ',' + "'" +childSnapshot.val().Createby.userE.PictureProfile+ "'" + ')" >'
        +'<div class="flex ml-2"> <img id="imgchatE'+childSnapshot.key+'" onerror="igmE('+"'"+childSnapshot.key+"'"+')"src="'+childSnapshot.val().Createby.userE.PictureProfile+'"   class="rounded-full w-12 h-12">'
        +'<div class="flex flex-col ml-2"> <span class="font-medium text-black">'+childSnapshot.val().Createby.userE.Nickname+'</span> <span class="text-sm text-gray-400 truncate w-32">'+childSnapshot.val().Lastmessage+'</span> </div>'
        +viewdatatag
         +'</div>'
        +'<div class="flex flex-col items-center">'
        +'</a>'
        +'<div class="dropdown">'

 
       +'</li>'

    

       
      });   

    }else{
      console.log("asd")
    }
  });

  /*setTimeout(function(){ 

    commentsReffs = firebase.database().ref('chatsFS');
    commentsReffs.on('child_changed', (data) => {
      if(data.val().UserEmi == uid || data.val().Usertarge == uid){
        var viewdata = data.val().Createby.view
        if(document.getElementById("Lastmessage"+data.key)){
          document.getElementById("Lastmessage"+data.key).innerHTML = data.val().Lastmessage
          if(!viewdata[userinflocal.uid].v){
            document.getElementById("spanview"+data.key).style.display = "block"
          }else{
            document.getElementById("spanview"+data.key).style.display = "none"
          }
        }
  
      }
    });
    commentsRef = firebase.database().ref('chats');
    commentsRef.on('child_changed', (data) => {
      if(data.val().UserEmi == uid || data.val().Usertarge == uid){
        var viewdata = data.val().Createby.view
        if(document.getElementById("Lastmessage"+data.key)){
          document.getElementById("Lastmessage"+data.key).innerHTML = data.val().Lastmessage
          if(!viewdata[userinflocal.uid].v){
            document.getElementById("spanview"+data.key).style.display = "block"
          }else{
            document.getElementById("spanview"+data.key).style.display = "none"
          }
        }else{
          firebase.database().ref("Users/"+uid+"/chats").once('value', (snapshot) => {
            if (snapshot.exists()) {
              snapshot.forEach((childSnapshot) => {
                shomessagesdatachats(childSnapshot.val().chatid)
              });   
            }
            else {
              console.log("No data available");
            }
          });
        }
  
      }
    });
   }, 5000);
 */
}


function goViewTochat(key,nickname,status,Type,Age,PictureProfile){

  if(commentsReffs!=false){
    commentsReffs.off();
    commentsRef.off();
    if(commentsRefmsj){
      commentsRefmsj.off();
    }
   
  }
  usertargereport = false;
      usertarge = {
      key:key,
      PictureProfile:PictureProfile,
      status:status,
      Age:Age,
      Nickname:nickname,
      Type:Type,
    };
    shomessagesdata(key+"report~")
}


function scrollToBottom() {
  countNG = 0;
  document.title = "HTML";
  var div = $(".chat-message");
  div.scrollTop(div.prop('scrollHeight'));

}



function sendmessage() {
  let textmessage = document.getElementById("textmessage").value;
  if(textmessage){
    let timenow = firebase.database.ServerValue.TIMESTAMP
    var createby = {displayName:userinflocal.Nickname,uid:userinflocal.uid}
   
    firebase.database().ref("chatsReport/"+usertarge.key+"report~").once('value', (snapshot) => {
      if (snapshot.exists()) {
          let msj = new Messager(textmessage,createby,usertarge.key,usertarge.key+"report~",timenow);
          setListDataforFunctions("messages/"+usertarge.key+"report~",msj,function(){
              scrollToBottom();
              let data = {
                text:"",
                type:"msj",
                createby:createby,
                createTime:timenow,
              }
              setListDataforFunctions("notification/"+usertarge.key,data,function(){

                firebase.database().ref("chatsReport/"+usertarge.key+"report~"+"/Createby/view/"+usertarge.key+"/v").set(false)
                firebase.database().ref("chatsReport/"+usertarge.key+"report~"+"/Lastmessage").set(textmessage)
                firebase.database().ref("chatsReport/"+usertarge.key+"report~"+"/view").set(false)

              })

          })
          document.getElementById("textmessage").value = "";
      }else{

      }
    });
  }
}