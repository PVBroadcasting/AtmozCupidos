
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
          if(document.querySelector('#container-list-favorite')){
            $containerlistfavorite.innerHTML = "";
            firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser").once('value', (snapshotp) => {
                if (snapshotp.exists()) {
                    snapshotp.forEach((childSnapshot) => {
                        if(childSnapshot.val()){
                            firebase.database().ref("Users/"+childSnapshot.key).once('value', (snapshot) => {
                                if (snapshot.exists()) {
                                    $containerlistfavorite.innerHTML += 
                                    
                                    
                                    '<div  class="p-2 w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">'
                                    +'<div  class="h-full flex items-center  p-1 rounded-xl  bg-gray-100" style="background:#A67777">'
                                    +'<img data-bs-toggle="modal" data-bs-target="#viewprofileModal"  onclick="loadlistmainprofileGB('+"'"+snapshot.key+"'"+')" alt="team" class=" w-10 h-10 bg-gray-100 bg-cover bg-center flex-shrink-0 rounded-full mr-4" src="'+snapshot.val().PictureProfile+'">'
                                    +'<div data-bs-toggle="modal" data-bs-target="#viewprofileModal"  onclick="loadlistmainprofileGB('+"'"+snapshot.key+"'"+')" class=" flex-grow">'
                                    +'<a  class="text-gray-100 title-font font-medium">'+snapshot.val().Nickname+'</a>'
                                    +'<p class="text-gray-400">'+snapshot.val().Region+'</p>'
                                    +'</div>'
                                    +'<div class="dropdown">'
                                    +'<button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">'
                                    +'<i class="fas fa-ellipsis-v"></i>'
                                    +'</button>'
                                    +'<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'
                                    +'<li><a id="CMblock" class="dropdown-item" href="#"><i class="fas fa-flag"></i>&nbsp;Block</a></li>'
                                    +'<li><a id="CMreport" class="dropdown-item" href="#"><i class="fas fa-flag"></i>&nbsp;Report</a></li>'
                                    +'</ul>'
                                    +'</div>'
                                    +'</div>'                  
                                    
                                }
                            });
                        }
    
                    });  
               
                }
            });
         
          }

        showLoading(false)
      }
      
      
      // Eventos

 
      
      // Iniciar
      renderizarImagen();
  }
  

