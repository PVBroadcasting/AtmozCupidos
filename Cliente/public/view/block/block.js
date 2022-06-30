
(function () {
    showLoading(true)
    setTimeout(() => {
        loadlistfavorite()
    }, 2000);
  })()

  
  function loadlistfavorite(){
      let userinflocal = JSON.parse(localStorage.getItem("user"));

      let $containerlistfavorite = document.querySelector('#container-list-favorite');

      
      // Funciones
   

   
      function renderizarImagen() {
        $containerlistfavorite.innerHTML = "";
        firebase.database().ref("Users/"+userinflocal.uid+"/block").once('value', (snapshotp) => {
            if (snapshotp.exists()) {
                snapshotp.forEach((childSnapshot) => {
                    Object.keys(userinflocal.block).forEach(function(key) { 
                        if(key==childSnapshot.key && userinflocal.block[key]){
                            var count = 1000000;
                            firebase.database().ref("Users/"+childSnapshot.key).once('value', (snapshot) => {
                                if (snapshot.exists()) {
                                    $containerlistfavorite.innerHTML += 
                                
                                
                                '<li    style="z-index:'+count+'"  class="p-2 w-full">'
                                +'<div  class="h-full flex items-center  p-1 rounded-xl  bg-gray-100" style="background:#A67777">'
                                +'<img alt="team" class=" w-10 h-10 bg-gray-100 bg-cover bg-center flex-shrink-0 rounded-full mr-4" src="'+snapshot.val().PictureProfile+'">'
                                +'<div  class=" flex-grow">'
                                +'<a  class="text-gray-100 title-font font-medium">'+snapshot.val().Nickname+'</a>'
                                +'<p class="text-gray-400">'+snapshot.val().Region+'</p>'
                                +'</div>'
                                +'<div class="dropdown">'
                                +'<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'
                                +'<i class="fas fa-ellipsis-v"></i>'
                                +'</button>'
                                +'<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'
                                +'<li><a onclick="Blockchat('+"'"+snapshot.key+"'"+','+"'block'"+')" class="dropdown-item" href="#"><i class="fas fa-flag"></i>&nbsp;Desbloquear</a></li>'
                                +'</ul>'
                                +'</div>'
                                +'</li>'        
                                count--;       
                                }
                            });
                         }
                        });
     
                });  
           
            }
        });
     
        showLoading(false)
      }
      
      
      // Eventos

 
      
      // Iniciar
      renderizarImagen();
  }
  

