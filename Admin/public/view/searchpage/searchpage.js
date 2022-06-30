userinflocal = JSON.parse(localStorage.getItem("user"));
(function () {
    'use strict'
  
    if(userinflocal){
        changesregion("España")
        showresult(listmainprofile);
    }
})();

function btnactSearch(){
    let listinter = [];
    let selectSeeking = document.getElementById("selectSeeking").value
    let Regionsearch = document.getElementById("Regionsearch").value
    for (let index = 0; index < listmainprofile.length; index++) {
        if("All"==selectSeeking){
            if("All"==Regionsearch){
                listinter.push(listmainprofile[index]);
            }else if(listmainprofile[index].Region.includes(Regionsearch)){
                listinter.push(listmainprofile[index]);
            }
           
        }else{
            if(listmainprofile[index].Sex==selectSeeking){
                if("All"==Regionsearch){
                    listinter.push(listmainprofile[index]);
                }else if(listmainprofile[index].Region.includes(Regionsearch)){
                    listinter.push(listmainprofile[index]);
                }
            }
        }  

    }
    showresult(listinter)
}

function showresult(data){
    console.log(data)
    document.getElementById("container-list-searchpage").innerHTML = "";
    for (let index = 0; index < data.length; index++) {

        document.getElementById("container-list-searchpage").innerHTML += '<div class="flex flex-col items-center justify-center max-w-sm mx-auto m-2">'
        +'<img src="'+data[index].PictureProfile+'" class="bg-cover bg-center h-96  w-72 rounded-lg" alt="">'
        +'<div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">'
            +'<h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">'+data[index].Nickname+'</h3>' 
            +'<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">'
                +'<div>'
                +'<button onclick="goViewTochat('+"'"+data[index].key+"'"+','+"'"+data[index].Nickname+"'"+','+"'"+data[index].State+"'"+','+"'"+data[index].Type+"'"+','+"'"+data[index].Age+"'"+','+"'"+data[index].PictureProfile+"'"+')"  style="float: right;" class="btn  btn-outline-secondary"><i class="far fa-envelope"></i> Chat</button>'
                +'<button id="heart_'+data[index].key+'" onclick="addfavoriteUserbg('+"'"+data[index].key+"'"+')"  type="button" class="btn btn-outline-danger"><i class="fas fa-heart"></i></button>'
                +'</div>'
                +'<button data-bs-toggle="modal" data-bs-target="#viewprofileModal"  onclick="loadlistmainprofileGB('+"'"+data[index].key+"'"+')"  type="button" class="btn btn-outline-primary"><i class="fas fa-eye"></i></button>'
                +'</div>'
            +'</div>'
        +'</div>';
    }
    verificfavoriteall();
}

function test(data){
console.log("holadev:"+data[0])
}



function verificfavoriteall(){
    firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser").once('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val()) {
        snapshot.forEach((childSnapshot) => {
            document.getElementById("heart_"+childSnapshot.key).style.color = "white"
            document.getElementById("heart_"+childSnapshot.key).style.background = "#dc3545"
          });
      }
  });
  }

function verificfavorite(key){
    let $CMbtnheart =  document.getElementById("heart_"+key);
    firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+key).once('value', (snapshot) => {
      if (snapshot.exists() && snapshot.val()) {
        $CMbtnheart.style.color = "white"
        $CMbtnheart.style.background = "#dc3545"
      }
      else {
        $CMbtnheart.style.color = "#dc3545"
        $CMbtnheart.style.background = "white"
        console.log("No data available");
      }
  });
  }

function changesregion(val){      
    if(val=="España"){
      let EspañaRegion = ["All","Álava","Albacete","Alicante","Almeria","Asturias","Avila","Badajoz","Baleares","Barcelona"
      ,"Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad_Real","Córdoba","Cuenca","Gerona","Granada",
      "Guadalajara","Guipuzcoa","Huelva","Huesca","Jaen","La_Coruña","La_Rioja","Las_Palmas","León","Lérida",
      "Lugo","Madrid","Málaga","Murcia","Navarra","Orense","Palencia","Pontevedra","Salamanca","Islas_Canarias",
      "Segovia","Sevilla","Spria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"]
      for (var i = 0; i < EspañaRegion.length; i++) {
        document.getElementById('Regionsearch').innerHTML += "<option value="+EspañaRegion[i]+">"+EspañaRegion[i]+"</option>"
      }
    }
  }

