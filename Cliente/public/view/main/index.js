
(function () {  
  document.getElementById("Idfriendlist").style.background = "#735151";
  document.getElementById("Idfriendlist").classList.add("px-4") 

  showLoading(true)
  setTimeout(() => {
    loadlistmainprofile()
  }, 4000);
})()

function test(data){
  console.log("holadev:"+data[0])
}


function loadlistmainprofile(){

    userinflocal = JSON.parse(localStorage.getItem("user"));
    tapchatactive("Mensajesid")
      // let $botonRetroceder = document.querySelector('#retroceder'); Variables
    let aux = listmainprofile;
    if(userinflocal.preferen!=undefined){
      if(userinflocal.preferen.DESCUBRIMIENTOLugar!="GlobalP"){
        aux = aux.filter(q => q.Region == userinflocal.preferen.DESCUBRIMIENTOLugar);
      }else{

      }
      if(userinflocal.preferen.filterAge!=undefined){
        if(userinflocal.preferen.filterAge.type!="GlobalP"){
          aux = aux.filter(q => q.Age > userinflocal.preferen.filterAge.from && q.Age < userinflocal.preferen.filterAge.to);
        }
      }

    }
    const IMAGENES = aux;
    if(IMAGENES.length>0){
    posicionANTE = IMAGENES.length-1;
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#imagen');
    let $imagenext = document.querySelector('#imagenext');
    let $imagenantes = document.querySelector('#imagenantes');
    let $varifiIcon = document.getElementById('varifiIcon');
    let $CMbtnheart = document.querySelector('#CMbtnheart');
    let $CMUsername = document.querySelector('#CMUsername');
    let $NameshowtextV = document.querySelector('#NameshowtextV');
    let $DescribeshowtextV = document.querySelector('#DescribeshowtextV');
    let $SmokershowtextV= document.querySelector('#SmokershowtextV');
    let $CityshowtextV = document.querySelector('#CityshowtextV');
    let $RegionshowtextV  = document.querySelector('#RegionshowtextV');
    let $BodytypeshowtextV = document.querySelector('#BodytypeshowtextV');
    let $GendershowtextV = document.querySelector('#GendershowtextV');
    let $SeekingshowtextV = document.querySelector('#SeekingshowtextV');
    let $EyecolorshowtextV = document.querySelector('#EyecolorshowtextV');
    let $WeightshowtextV = document.querySelector('#WeightshowtextV');
    let $HeightshowtextV = document.querySelector('#HeightshowtextV');
    let $CMCountry = document.querySelector('#CMCountry');
    let $CMLanguange = "";
    let $botonbackFoto = document.querySelector('#botonbackFoto');
    let $CMbtnChat = document.querySelector('#CMbtnChat');
    let $ModalImgPrivateNameUser = document.getElementById('ModalImgPrivateNameUser');
    let $UsergetAllImgforPointsbtn =  document.getElementById('UsergetAllImgforPointsbtn');
    let $UsergetSelectedImgforPointsbtn =  document.getElementById('UsergetSelectedImgforPointsbtn');
    // Funciones
    
    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
     function addfavoriteUser(){
       alert("22")
      firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key).once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key,false,function(){

          },true)
        }
        else {
          setDataforFunctions("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key,true,function(){

          },true)
        }
        verificfavorite();
    });
     
    }

      function UsergetAllImgforPoints(){
        console.log(userinflocal.Points > (IMAGENES[posicionActual].PicturePrivate.length*2))
        if(IMAGENES[posicionActual].PicturePrivate!=null && IMAGENES[posicionActual].PicturePrivate.length>0 && userinflocal.Points > (IMAGENES[posicionActual].PicturePrivate.length*2)){
          let pointsprise =  (IMAGENES[posicionActual].PicturePrivate.length*2);
          let totalrestant = (userinflocal.Points - pointsprise);
       
          setDataforFunctions("Users/"+userinflocal.uid+"/Points",totalrestant,function(){
            setDataforFunctions("PaidprivateimagforUser/"+userinflocal.uid+"/"+IMAGENES[posicionActual].key,IMAGENES[posicionActual].PicturePrivate,function(){
              setDataforFunctions("Users/"+userinflocal.uid+"/PaidprivateimagforUser/"+IMAGENES[posicionActual].key,true,function(){
                getDataforFunctions("Users/"+userinflocal.uid+"/PaidprivateimagforUser",function(itemupdatedata){
                  userinflocal.PaidprivateimagforUser = itemupdatedata
                  userinflocal.Points =totalrestant
                 localStorage.setItem("user", JSON.stringify(userinflocal)); 
                  swal("Proceso Completo", {
                    icon: "success",
                  }).then((value) => {
                    showimgoncarousel(IMAGENES[posicionActual],IMAGENES[(posicionNEXT)],IMAGENES[(posicionANTE)]);
                  });
                });
             


              },false)
            },false)
          },true)
        }
      }
      function UsergetSelectedImgforPoints(){
        console.log(userinflocal.Points > (IMAGENES[posicionActual].PicturePrivate.length*2))
        if(IMAGENES[posicionActual].PicturePrivate!=null && IMAGENES[posicionActual].PicturePrivate.length>0 && userinflocal.Points > (IMAGENES[posicionActual].PicturePrivate.length*2)){
     

          let auxlist = IMAGENES[posicionActual].PicturePrivate;
          let pointsprise = 0;
           let comprovat = false;
           $('input[name=checkPrivateimgselectbuy]:checked').each(
            function()
            {
              comprovat = true;
              pointsprise =  (1*2);
            }
           );
           if(comprovat){
            $('input[name=checkPrivateimgselectbuy]:checkbox:not(:checked)').each(function() {
     
              
              auxlist[$(this).val()].Url = "";
             });

             let totalrestant = (userinflocal.Points - pointsprise);
            setDataforFunctions("Users/"+userinflocal.uid+"/Points",totalrestant,function(){
              setDataforFunctions("PaidprivateimagforUser/"+userinflocal.uid+"/"+IMAGENES[posicionActual].key,auxlist,function(){
                setDataforFunctions("Users/"+userinflocal.uid+"/PaidprivateimagforUser/"+IMAGENES[posicionActual].key,true,function(){
                  getDataforFunctions("Users/"+userinflocal.uid+"/PaidprivateimagforUser",function(itemupdatedata){
                    userinflocal.PaidprivateimagforUser = itemupdatedata
                    userinflocal.Points =totalrestant
                    localStorage.setItem("user", JSON.stringify(userinflocal)); 
                    swal("Proceso Completo", {
                      icon: "success",
                    }).then((value) => {
                      getDataforFunctions("Users/"+IMAGENES[posicionActual].key,function(dataUs){
                        IMAGENES[posicionActual].PicturePrivate = dataUs.PicturePrivate
                        console.log(dataUs.PicturePrivate)
                        showimgoncarousel(IMAGENES[posicionActual],IMAGENES[(posicionNEXT)],IMAGENES[(posicionANTE)]);
                       });
               
                    });
                  });              
                },false)
              },false)
            },true)
          }else{
            swal("Selecciona alguna foto", {
              icon: "warning",
            }).then((value) => {

            });
          }
        }
      }
    function backFoto() {
      showLoading(true)

        if(posicionActual==0){
          posicionActual = IMAGENES.length - 1
          posicionANTE = IMAGENES.length - 2
          posicionNEXT = 0;
        }else{
          posicionNEXT = posicionActual
          posicionActual--;
          posicionANTE = posicionActual - 1
        }


      renderizarImagen();
  }
    function pasarFoto() {
        showLoading(true)
        if(posicionActual >= IMAGENES.length-1) {
            posicionActual = 0;
            posicionNEXT = 1;
            posicionANTE = IMAGENES.length - 1;
        } else {
            posicionANTE =posicionActual;
            posicionActual++;
            posicionNEXT = posicionActual+1;
        }
   
        renderizarImagen();
    }
    function clikgoViewTochat(data) {
      console.log(IMAGENES[posicionActual])
      goViewTochat(IMAGENES[posicionActual].key,IMAGENES[posicionActual].Nickname
        ,IMAGENES[posicionActual].Online
        ,IMAGENES[posicionActual].Type
        ,IMAGENES[posicionActual].Age 
        ,IMAGENES[posicionActual].PictureProfile)
    }
    function verificfavorite(){
   
      firebase.database().ref("Users/"+userinflocal.uid+"/favoriteUser/"+IMAGENES[posicionActual].key).once('value', (snapshot) => {
        if (snapshot.exists() && snapshot.val()) {
          document.getElementById("CMbtnheart").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="56" viewBox="0 0 92 94">'+
          '<defs>'+
            '<pattern id="patternh" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 512 512">'+
              '<image width="512" height="512" xlink:href="data:image/png;base64,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"/>'+
              '</pattern>'+
            '<filter id="heart" x="0" y="0" width="92" height="94" filterUnits="userSpaceOnUse">'+
              '<feOffset dy="8" input="SourceAlpha"/>'+
              '<feGaussianBlur stdDeviation="1" result="blur"/>'+
              '<feFlood flood-opacity="0.427"/>'+
              '<feComposite operator="in" in2="blur"/>'+
              '<feComposite in="SourceGraphic"/>'+
              '</filter>'+
            '</defs>'+
          '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#heart)">'+
            '<rect id="heart-2" data-name="heart" width="86" height="83" transform="translate(3)" fill="url(#patternh)"/>'+
            '</g>'+
        '</svg>';
        }
        else {
          document.getElementById("CMbtnheart").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="56" viewBox="0 0 92 94">'+
          '<defs>'+
          '<pattern id="patternh" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 512 512">'+
              '<image width="512" height="512" xlink:href="data:image/png;base64,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"/>'+
              '</pattern>'+
              '<filter id="heart" x="0" y="0" width="92" height="94" filterUnits="userSpaceOnUse">'+
              '<feOffset dy="8" input="SourceAlpha"/>'+
              '<feGaussianBlur stdDeviation="1" result="blur"/>'+
              '<feFlood flood-opacity="0.427"/>'+
              '<feComposite operator="in" in2="blur"/>'+
              '<feComposite in="SourceGraphic"/>'+
              '</filter>'+
              '</defs>'+
              '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#heart)">'+
              '<path id="heart-2" data-name="heart" d="M9,0H77a9,9,0,0,1,9,9V74a9,9,0,0,1-9,9H9a9,9,0,0,1-9-9V9A9,9,0,0,1,9,0Z" transform="translate(3)" opacity="0.43" fill="url(#patternh)"/>'+
              '</g>'+
              '</svg>';
          console.log("No data available");
        }
    });
    }

    function showimgoncarousel(data,mmas,mmenos){
      let img = [];
      img.push(data.PictureProfile)
      $imagen.innerHTML = "";
      if(data.Pictures!=null){
        for (let index = 0; index < data.Pictures.length; index++) {
          img.push(data.Pictures[index].Url)
        }
      }
      if(img!=null){
        for (let index = 0; index < img.length; index++) {
          if(index==0){
            $imagen.innerHTML += '<div class="carousel-item  h-full active"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-full" alt=""></div>';
          }else{
            $imagen.innerHTML += '<div class="carousel-item h-full"><img src="'+img[index]+'" class="bg-cover bg-center d-block w-100  h-full" alt=""></div>';
          }
        }
      }
      if(data.PicturePrivate!=null && data.PicturePrivate.length>0){
        document.getElementById("imagesUsersP").innerHTML = "";
        document.getElementById("FireImgPrivada").style.display = "block"


        if((userinflocal.PaidprivateimagforUser != undefined && userinflocal.PaidprivateimagforUser[data.key] != undefined ) && userinflocal.PaidprivateimagforUser[data.key] ){
          getDataforFunctions("PaidprivateimagforUser/"+userinflocal.uid+"/"+data.key,function(itemprivateimg){
            for (let index = 0; index < itemprivateimg.length; index++) {
              if(itemprivateimg[index].Url!=""){
                $imagen.innerHTML += '<div class="carousel-item h-full"><img src="'+itemprivateimg[index].Url+'" class="bg-cover bg-center  w-100  h-full" alt=""></div>';
  
                $ModalImgPrivateNameUser.innerHTML = data.Nickname
                document.getElementById("imagesUsersP").innerHTML  += '<a href="#" onclick="abrirNuevoTab('+"'"+itemprivateimg[index].Url+"'"+')"><div class="img-previewsNew">'+
                  ' <input name="checkPrivateimgselectbuy" value="'+index+'" type="checkbox" disabled checked >'+
                  '<img  class="imgUsercotent " style="border-radius: 0.5em;"    src="' + itemprivateimg[index].Url + '" />'+
                 '</div></div></a>';
              }else{

                $imagen.innerHTML += '<div class="carousel-item h-full"><img src="'+data.PicturePrivate[index].Url+'" class="bg-cover bg-center d-block filter  blur-md w-100  h-full" alt=""></div>';

                $ModalImgPrivateNameUser.innerHTML = data.Nickname
                document.getElementById("imagesUsersP").innerHTML  += '<div class="img-previewsNew">'+
                  ' <input name="checkPrivateimgselectbuy" value="'+index+'" type="checkbox" >'+
                  '<img  class="imgUsercotent d-block filter  blur-sm" style="border-radius: 0.5em;"    src="' + data.PicturePrivate[index].Url + '" />'+
                 '</div></div>';
              }

            }
          });
        }else{
          console.log("no PaidprivateimagforUser")
          for (let index = 0; index < data.PicturePrivate.length; index++) {
            $imagen.innerHTML += '<div class="carousel-item h-full"><img src="'+data.PicturePrivate[index].Url+'" class="bg-cover bg-center d-block filter  blur-md w-100  h-full" alt=""></div>';

            $ModalImgPrivateNameUser.innerHTML = data.Nickname
            document.getElementById("imagesUsersP").innerHTML  += '<div class="img-previewsNew">'+
              ' <input name="checkPrivateimgselectbuy" value="'+index+'" type="checkbox" >'+
              '<img  class="imgUsercotent d-block filter  blur-sm" style="border-radius: 0.5em;"    src="' + data.PicturePrivate[index].Url + '" />'+
             '</div></div>';
          }
  
        }   

      }else{
        document.getElementById("FireImgPrivada").style.display = "none"
      }
      if(mmas!=undefined){
        $imagenext.innerHTML = '<img src="'+mmas.PictureProfile+'" class="bg-cover bg-center d-block filter w-100  h-full" alt="">';
      }else{
        $imagenext.innerHTML = '<img src="'+mmenos.PictureProfile+'" class="bg-cover bg-center d-block filter w-100  h-full" alt="">';
      }

      $imagenantes.innerHTML = '<img src="'+mmenos.PictureProfile+'" class="bg-cover bg-center d-block filter   w-100  h-full" alt="">';
    }
    function renderizarImagen() {
      if(IMAGENES[posicionActual]){
        if(IMAGENES[posicionActual].Verification && IMAGENES[posicionActual].Verification!==undefined && IMAGENES[posicionActual].Verification != null){
          $varifiIcon.style.display = "block"
        }else{
          $varifiIcon.style.display = "none"
        }


          let textName =  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="120" viewBox="0 0 604 127">'+
         '<defs>'+
          '<filter id="'+posicionActual+'N" x="0" y="0" width="604" height="127" filterUnits="userSpaceOnUse">'+
          '<feOffset dy="8" input="SourceAlpha"/>'+
          '<feGaussianBlur stdDeviation="3" result="blur"/>'+
          '<feFlood flood-opacity="0.89"/>'+
            '<feComposite operator="in" in2="blur"/>'+
            '<feComposite in="SourceGraphic"/>'+
            '</filter>'+
          '</defs>'+
        '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#'+posicionActual+'N)">'+
          '<text id="'+posicionActual+'N-2" transform="translate(9 1)" fill="#d7b6b6" font-size="50" font-family="ArialRoundedMTBold, Arial Rounded MT">'+
            '<tspan x="0" y="47" xml:space="preserve">'+IMAGENES[posicionActual].Nickname+" "+ IMAGENES[posicionActual].Age+' </tspan><tspan font-size="30" font-family="MicrosoftYaHeiUI, Microsoft YaHei UI">'+
            '<tspan y="99" x="25" font-size="40" font-family="MicrosoftJhengHeiUIBold, Microsoft JhengHei UI">'+IMAGENES[posicionActual].Country+" "+IMAGENES[posicionActual].Region+'</tspan><tspan></text>'+
          '</g>'+
        '</svg>';

      
        $CMUsername.innerHTML = textName
     
        $BodytypeshowtextV.innerHTML = IMAGENES[posicionActual].Bodytype ? IMAGENES[posicionActual].Bodytype : "";
        $EyecolorshowtextV.innerHTML = IMAGENES[posicionActual].Haircolor ? IMAGENES[posicionActual].Eyecolor : "";
        $HeightshowtextV.innerHTML = IMAGENES[posicionActual].Height ? IMAGENES[posicionActual].Height : "";
        $WeightshowtextV.innerHTML = IMAGENES[posicionActual].Weight ? IMAGENES[posicionActual].Weight : "";
        $SeekingshowtextV.innerHTML = IMAGENES[posicionActual].Seeking ? IMAGENES[posicionActual].Seeking : "";
        $GendershowtextV.innerHTML = IMAGENES[posicionActual].Sex ? IMAGENES[posicionActual].Sex : "";
        $NameshowtextV.innerHTML = IMAGENES[posicionActual].Name ? IMAGENES[posicionActual].Name : "";
        $DescribeshowtextV.innerHTML = IMAGENES[posicionActual].Describe ? IMAGENES[posicionActual].Describe : "";
        $CityshowtextV.innerHTML =  IMAGENES[posicionActual].City ? IMAGENES[posicionActual].City : "";
        $RegionshowtextV.innerHTML = IMAGENES[posicionActual].Region ? IMAGENES[posicionActual].Region : "";
        $SmokershowtextV.innerHTML = IMAGENES[posicionActual].Smoker ? IMAGENES[posicionActual].Smoker : "";

        
        showimgoncarousel(IMAGENES[posicionActual],IMAGENES[(posicionNEXT)],IMAGENES[(posicionANTE)]);
        var element = "&nbsp;&nbsp;Languange: ";
        var intereseshtml = "";
        var preferensehtml = "";
        if(IMAGENES[posicionActual].Boxs!==undefined){
          for (let z = 0; z < IMAGENES[posicionActual].Boxs.length; z++) {
            if(IMAGENES[posicionActual].Boxs[z] == "Cybersex" || IMAGENES[posicionActual].Boxs[z] == "Livedating" || IMAGENES[posicionActual].Boxs[z] == "Bodyfetishist" ||
            IMAGENES[posicionActual].Boxs[z] == "ExhibitionismNaturism" || IMAGENES[posicionActual].Boxs[z] == "Straight" || IMAGENES[posicionActual].Boxs[z] == "Coupleexchange" ||
            IMAGENES[posicionActual].Boxs[z] == "Roleplays" || IMAGENES[posicionActual].Boxs[z] == "BDSM" || IMAGENES[posicionActual].Boxs[z] == "ClothesToys" ||
            IMAGENES[posicionActual].Boxs[z] == "SexingroupsThreesomes" || IMAGENES[posicionActual].Boxs[z] == "Bisexual" || IMAGENES[posicionActual].Boxs[z] == "Massages" ||
            IMAGENES[posicionActual].Boxs[z] == "Gastronomy" || IMAGENES[posicionActual].Boxs[z] == "Gamer" || IMAGENES[posicionActual].Boxs[z] == "Spirituality" ||
            IMAGENES[posicionActual].Boxs[z] == "Fashion" || IMAGENES[posicionActual].Boxs[z] == "Environmentalism" || IMAGENES[posicionActual].Boxs[z] == "Vegetarianism" ||
            IMAGENES[posicionActual].Boxs[z] == "Feminism" || IMAGENES[posicionActual].Boxs[z] == "Astrology" || IMAGENES[posicionActual].Boxs[z] == "Politics" ||
            IMAGENES[posicionActual].Boxs[z] == "OutDoor" || IMAGENES[posicionActual].Boxs[z] == "Wine" || IMAGENES[posicionActual].Boxs[z] == "Animals"){
              preferensehtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-1 px-2  rounded-full m-1">'+IMAGENES[posicionActual].Boxs[z]+'</div>'
            }
            if(IMAGENES[posicionActual].Boxs[z] == "Affair" || IMAGENES[posicionActual].Boxs[z] == "Openrelationship" || IMAGENES[posicionActual].Boxs[z] == "Hangingout" ||
            IMAGENES[posicionActual].Boxs[z] == "Couplerelationship" || IMAGENES[posicionActual].Boxs[z] == "Onerightstands" || IMAGENES[posicionActual].Boxs[z] == "Friendship" ||
            IMAGENES[posicionActual].Boxs[z] == "GymSports" || IMAGENES[posicionActual].Boxs[z] == "ChatMails" || IMAGENES[posicionActual].Boxs[z] == "Dinnerdate" ||
            IMAGENES[posicionActual].Boxs[z] == "Datingwithoutissues" || IMAGENES[posicionActual].Boxs[z] == "Travel" || IMAGENES[posicionActual].Boxs[z] == "Otheractivites"){
              intereseshtml += '<div style="color:#520202;padding-top: 0.5em; padding-bottom: 0.5rem;background:#B78D90;" class="text-sm p-1 px-2  rounded-full m-1">'+IMAGENES[posicionActual].Boxs[z]+'</div>'
            }


            document.getElementById("labeltags").innerHTML += '<a href="#" class="inline-block rounded-full text-white bg-black hover:bg-gray-500 duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100">'
            +IMAGENES[posicionActual].Boxs[z]
            +'</a>'
          }
          document.getElementById("intereseshtml").innerHTML = intereseshtml
          document.getElementById("preferensehtml").innerHTML = preferensehtml
          
        }

        for (let index = 0; index < IMAGENES[posicionActual].Languange.length; index++) {
          if(index!=0){
            element += IMAGENES[posicionActual].Languange[index]+", ";
          }else{
            element += IMAGENES[posicionActual].Languange[index]+" ";
          }
                
        }

        showLoading(false);
      }else{
        $CMUsername.innerHTML ="data not found";
        $imagen.style.backgroundImage = `url()`;
      }
      verificfavorite();
     /* document.getElementById("CMbtnheart").addEventListener("mouseover", function( event ) {
        // highlight the mouseover target
        document.getElementById("CMbtnheart").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="56" viewBox="0 0 92 94">'+
        '<defs>'+
          '<pattern id="patternh" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 512 512">'+
            '<image width="512" height="512" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASFgAAEhYBzJG4DAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d13uCRVnf/x9wyCigiYMOBP2ZWVY1jTKoZVykCti2JicVVQURGzomJAMSzrmhAFxIhilqCwrAqiHlCOWcwoUBgQRFFRJDPAwNzfH9UDzDB3buqub3fX+/U898G5t7vq4x/3nk+fqjpn2czMDJIkqV+WRweQJEndswBIktRDFgBJknrIAiBJUg9ZACRJ6iELgCRJPWQBkCSphywAkiT1kAVAkqQesgBIktRDFgBJknrIAiBJUg9ZACRJ6iELgCRJPWQBkCSphywAkiT1kAVAkqQesgBIktRDFgBJknrIAiBJUg9ZACRJ6iELgCRJPWQBkCSphywAkiT1kAVAkqQesgBIktRDFgBJknrIAiBJUg9ZACRJ6iELgCRJPWQBkCSphywAkiT1kAVAkqQesgBIktRDFgBJknrIAiBJUg9ZACRJ6iELgCRJPWQBkCSphywAkiT1kAVAkqQesgBIktRDFgBJknrIAiBJUg9ZACRJ6qEbRQdQrKaubgTcfJ5fNwFWAlfN8t+VwMXAX1Z/pVwu7PD/jjRVmrpaDtwGuO3ga1Pa38MbD76u/79Xf11B+3t4/a+L1v5eyuWqLv+/aPwsm5mZic6gEWnqakPgLsA2wF0H/90G2JJ2QN+E9g/IKF3F9QrB4OtM4AzgV8CvUy4rRpxBGktNXd0OSIOvrYHbcd1gf1vg1oxupvZK1iwF5wDN9b9SLheM6NwaAxaAKdDU1e254SC/DfAPwAaB0eZjBvgD1xWCXwGnAj9MuVwUGUwalqau7gLck+sG+9Vfm0fmmofzWKsUDL7OTrmsigympbMATJimrm4BVMAjgQfTDvQ3Dw01GjPA6cD3r/d1qn90NO6autoU2BZ4IPCgwdetQ0MN3xW0Zb0Bvg18PeVyamwkLZQFYMw1dbUJ8FDaAf+RwH3p782blwIn05aBE4Bvp1xWxkZS3zV1dSegpi3kDwLuRj9/R/8MfH3wdWLK5azYOJqLBWDMNHV1Y+AhXDfgPwDYMDTU+LoUOBH4CnB8yuXs4DzqgcG9NQ8FHgPsANwjNtHYOpNBGaCdITgvOI/WYgEYA01d3RvYkXbAfwijvzFvWjXA8bSF4CTvctawNHW1Je1gvwPtp/1pvOw2SjPAL1mzEFwWG0kWgCCDG/d2AZ4J3Cs4zjS6EDgKOAwo3jughWrq6rbAU2h/Tx8YHGfaXAocDXyKtqz7+xnAAtChpq42Bp5IO+hvz/jfoT8tzgWOBA5LufwoOozG1+AGvp1oB/1H4u9oF84BPgN8KuXSRIfpEwvAiDV1tYz2rv1nAjvj1GG0XwGHA59MufwuOoziNXW1Ee0luF2Ax+IluEg/BD4JHJFyOT86zLSzAIxIU1fbAM8YfN0pOI5uaBXwZeBgIKdc/EXomcF1/RcAzwO2CI6jNa0EjqO9RHCc9/OMhgVgiJq62oD2muGetM8BazL8Cng/8ImUy8XRYTRaTV09DHgp8CRcDn0S/J121u6glMuvo8NMEwvAEAymEHcDXku79K4m06W0nzjen3I5LTqMhqepq5sCuwIvAe4dHEeLcw3wOeCtLjo0HBaAJRjc1LcH8Gra9fU1PY4D9k25/DA6iBavqavNgZfTfuK/ZXAcDccMcAzwPymXn0aHmWQWgEVo6moz4MW0f1huExxHo/Vl2iJwcnQQzd9g4H8F7eW4zYLjaHSOoy0C348OMoksAAvQ1NWtaQf9l+Aflb45nrYI/CA6iGY32CvjFcDL8He0T06gLQIlOsgksQDMw+Bu4VfR3i28cXAcxfoK8F8WgfEyGPhfSTvwbxocR3G+Dbwl5fK16CCTwAKwHoONePal/cS/UXAcjZcjgNekXM6JDtJng3X5XwK8GT/x6zonA69OuXwzOsg4swDMoqmrnYED8eY+zW4F8E5gv5TLiugwfdPU1Q7AAbRbYkvr8inaIuBGROtgAVhLU1dbA+8DHh2dRRPjHNo/MkdGB+mDwSJb76HdjU+ay4XAPsCH3HNgTRaAgaaubgLsPfi6cXAcTaZvA3umXH4SHWQaDZ6+eRPtI31uka2F+jHwQh/tvY4FAGjq6tG0n/q3js6iibeKdlXB17nd6fA0dbUL7SU5H7vVUqwCPkL7+3lBdJhovS4Ag7v7D6TdpEcapt8Cu/tY0tI0dXU74IO0u2hKw/JX4DW0m4L1dhDsZQFo6upGtI8L7QtsEhxH02uGdmbJ2YBFGHzqPxhX8NPofIf2ssAvooNE6F0BGNxAdARwn+gs6g1nAxbAT/3q2NXAu4E3pFyujg7TpV4VgKaudgU+hJ/61b3VswF7p1wujw4zrvzUr0DfA57Sp7U9elEABjuBHQzsHp1FvXc6sLO7Da6pqaubA4cAT43Ool77O7BbyuXY6CBdmPoC0NTV3Wi3kLxndBZp4DLa646fjg4yDpq6uhfweeCu0Vkk2tm6/YHXT/slgakuAE1d7Ub7SNbNorNI6/BR4KUplyuig0Rp6moP4L3ATaKzSGv5LvDUab4kMJUFoKmrm9EO/LtFZ5Hm8HPgySmXX0cH6dLgd/TDwK7RWaT1OB94Zsrly9FBRmHqCkBTV/eknfK/W3QWaZ4uBp6bcvl8dJAuDH5HPw+k6CzSPMwA+zGFTwlMVQFo6mp32pv9bhqdRVqEd9Bed5yeX8q1DDbZ+hT+jmryfIf2ksAfooMMy1QUgKauNqB9bniP6CzSEn2O9i7kqbsvoKmr19CWnGXRWaRF+hvtJbuTooMMw8QXgMEmPkcAT4jOIg3J94AnpFz+Gh1kGAYrb34AC7qmw5XArimXo6ODLNVEF4CmrjYHvgg8LDqLNGRnAo9JuZwRHWQpmrralPZ6/79FZ5GGaBXw4pTLh6KDLMXy6ACL1dTVHYBv4uCv6fSPwPeaunp4dJDFaurqTrTXTR38NW2WAx9s6urN0UGWYiJnAJq6uivwVWCr4CjSqF1Fu4/AZ6KDLERTV/8CHAvcLjqLNGIfBF6SclkVHWShJq4ANHX1AODLwK2js0gdmQFekHI5JDrIfDR19RDgeGDT6CxSR44Cnp5yuTI6yEJM1CWApq7+Dfg6Dv7ql2XAh5q6elF0kLk0dVXRzs45+KtPdgaOH9zzMjEmpgA0dfU02ilFd/JTHy0D3t/U1Z7RQWbT1NX2tLNz/o6qjx4BnNTU1W2jg8zXRBSAwR+9zwIbRmeRgh3Y1NWrokOsramrfwe+BGwcnUUKdF/gu01d3SU6yHyMfQFo6mpv4EBcPERa7V1NXb0uOsRqTV09DvgCbugjQfsEz3cGO9GOtbG+CbCpq+cAh0bnkMbUm1Iub4kM0NTVTrQLcTk7J63pHOAh47x08NgWgKauHg/8L7BBdBZpjL0s5XJwxIkHN+Uei4O/NJvTgIelXP4eHWRdxrIANHX1UOBruGGINJdVwNNSLp/r8qRNXW1L+0TOzbo8rzSBvg88KuVyeXSQtY1dARhsFfotYPPoLNKEuArYIeXy9S5O1tRVAr4N3KqL80lT4Hjg8eO2nfBY3QTY1NWdga/g4C8txEbAMU1d3WfUJ2rq6o60z/k7+EvztwPw8aauxupm9rEpAE1d3Zr2D8uW0VmkCbQp7UIk/ziqEzR1dUva39E7jeoc0hR7OrB/dIjrG4sC0NTVzYDjgG2is0gT7HbAV5u6us2wD9zU1ca0N/zdfdjHlnrklU1dvTY6xGrhBaCpqw2Bo4Fto7NIU2Br4EtNXW00rAMOpi0PAx48rGNKPfaOpq6eHR0CggvA4A/Lx4FHR+aQpswDgfcN8XhvBp4wxONJffeRwQJaoaJnAN4A7BqcQZpGezR1tcdSD9LU1ROANw0hj6TrbAAc2dTVfSNDhD0G2NTVw4ETcKEfaVSuArZLufxgMW8eLGX6A+DmQ00labXfAPdLuVwScfKQGYCmrragvabo4C+NzkbA0YvZnaypq82A/8PBXxqlrYFDok7eeQFo6mo57c5+t+/63FIPbQl8vqmrG833DYN7cz4D3HVkqSSt9tSmrp4XceKIGYB9gO0Dziv11cOA9yzg9fsCO44oi6QbOqipq3t1fdJO7wHwur8UaqeUyzHre0FTVzXtYj9jtWKZ1ANnAPdPuVza1Qk7mwHwur8U7pCmrm432w+buroV8Akc/KUI2wAf6vKEnRSAwXX/z+B1fynSrYFD1/PzQ4A7dJRF0g3t2tTV7l2drKsZgNcDdUfnkjS7xzR19YK1vzlYmWyngDyS1nTwYFfckRv5PQBNXVXAiTj1L42Ly4H7pFx+DTDYQOjnwCahqSStdjrwgJTLZaM8yUgLwGBTkp/j1L80bk4G/hWYAb6F6/xL4+aTKZdnjfIEo74E8G4c/KVxtC3tI7n74OAvjaPdmrp6/ChPMLIZgKautgPKSA4uaRiuHvx33osESerU2cDdUy6Xj+LgI5kBGKw69oFRHFvS0NwIB39pnN0ZeOOoDj6qSwAvB+4xomNLktQXew025hq6oReApq62pN0/XJIkLc2GwAdHceBRzAAcgI8TSZI0LFVTV88Y9kGHehPgYB3xrw3tgJIkCeA8YJuUy4XDOuDQZgCautoIeN+wjidJkq61BfD2YR5wmJcAXo37h0uSNCrPa+pq22EdbCiXAJq62go4Dbjpkg8mSZJm8xNg25TLNUs90LBmAA7CwV+SpFG7H/CiYRxoyTMA3vgnSVKnLgb+MeVy/lIOMowZgJGtUiRJkm5gU9oF95ZkSTMArvcvSVKIi4A7p1wuWuwBljoD8IYlvl+SJC3cZsCLl3KARc8ADB5F+MFSTi5Jkhbtb8BWKZfLFvPmpcwA7LOE90qSpKW5NfD8xb55UTMATV3dC/gZsGyxJ5YkSUv2J+AfUi5XLvSNi50B2AcHf0mSot0eeM5i3rjgGYCmrrahXfVvFDsJSpKkhTkb+KeUy8qFvGkxg/jrFvk+SZI0fHcGnr7QNy1oBmCw5v+vgRst9ESSJGlkfg2klMuq+b5hoZ/k98bBX5KkcfNPwH8u5A3zLgBNXW0BPGuBgSRJUjdet5AXL2QGYBfgxgvLIkmSOnKvpq4eMN8XL6QAPHMRYSRJUnd2m+8L53UTYFNX9wB+uZREkiRp5M4H7pByuWquF853BsBP/5Ikjb9bAY+dzwvnLABNXS0Hdl1qIkmS1Il5fWifzwzAI4Etl5ZFkiR15LFNXd1qrhfNpwA4/S9J0uTYEHjaXC9abwFo6upmwE7DSiRJkjox59MAc80A7ATcbDhZJElSR+7f1NXd1veCuQqA0/+SJE2m9c4CzLoOQFNXWwK/x53/JEmaRH8E7jTbBkHrG9x3nePnkiRpfG0JPGq2H65vgH/K8LNIkqQOzfo0wDoLQFNXtwDuM7I4kiSpC9vP9oPZZgCq9fxMkiRNhv/X1NU/resHsw3yjxxhGEmS1J113gcwWwF4xAiDSJKk7qyzANzgMcCmrrYA/gws6yCUJEkarfOB26Rc1hjw1zUD8HAc/CVJmha3Au699jfXVQCc/pckabrc4DLAugqANwBKkjRdbjC2r3EPQFNXd6BdOlCSJE2PS4FbplxWrv7G2jMATv9LkjR9NgG2vf431i4ATv9LkjSd1rgPwBkASZL6YY0P+dfeA9DU1Z2AsyMSSZKkkbsK2CzlcgWsOQNwz5g8kiSpAxsBafU/rl8Atuk+iyRJ6tA6C0BaxwslSdL0cAZAkqQecgZAkqQeunasXzYzM0NTV5sBFwYGkiRJo7cC2CTlsmr1DIDT/5IkTb+bAneC6y4BOP0vSVI/JLiuADgDIElSP1gAJEnqobuBlwAkSeqbdgagqasNgK2Dw0iSpG5cewlgK+DGoVEkSVJXtmjq6hbLgbtEJ5EkSZ3aejmwWXQKSZLUqVssB24enUKSJHVqUwuAJEn9YwGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD222HNgkOoUkSeqUMwCSJPWQBUCSpB6yAEiS1EObeg+AJEn9s8ly4IroFJIkqVNXLgcuik4hSZI6dbEFQJKk/rEASJLUQxYASZJ66OLlwMXRKSRJUqecAZAkqYcsAJIk9ZAFQJKkHrrEewAkSeofZwAkSeohC4AkST108XLgwugUkiSpUxcvB34TnUKSJHXqrGUzMzM0dXUJbgssSVIfXAPcbPngH6dHJpEkSZ35bcrlytUF4LTQKJIkqSunAVgAJEnqFwuAJEk9ZAGQJKmH1igAZwErwqJIkqQurAIaGBSAlMu135AkSVPrrJTLCrhuBgC8DCBJ0rS7dqy3AEiS1B8WAEmSemidBeCXAUEkSVJ3blgAUi6/Ac4NiSNJkkZtBXDK6n8sX+uHJ3SbRZIkdeQ7KZcrV//DAiBJUj+sMcZbACRJ6ocTr/+PNQpAyuVPwKmdxpEkSaN2AfCT639j7RkAgNxNFkmS1JGTBqv+XmtdBcDLAJIkTZcT1/7GugpAAVaOPoskSerIDT7c36AApFwuBb7fSRxJkjRqf0y5nLH2N9c1AwDeByBJ0rS4wfQ/zF4AvA9AkqTpsKACcDJw8eiySJKkjsy/AKRcrpntDZIkaWI0KZc/rusHs80AABwxojCSJKkbX5rtB+srAF/EywCSJE2yz8z2g1kLQMrlCuCokcSRJEmjdkrK5ZTZfri+GQBYT3OQJEljbb1j+FwF4CTgnKFFkSRJXVgFHLa+F6y3AKRcZuY6gCRJGjvfmO3u/9XmmgEA+PSQwkiSpG7MeQl/zgKQcjkV+OlQ4kiSpFFbARw914vmMwMA3gwoSdKk+GLK5ZK5XjTfAnA4cM3S8kiSpA7M69L9vApAyuVPuDSwJEnj7q/AV+fzwvnOAIA3A0qSNO6OTLlcPZ8XLqQAHINLA0uSNM7m/WF93gUg5XIZcMii4kiSpFH7ecrl5Pm+eCEzAAAHASsX+B5JkjR671nIixdUAFIufwCOXFAcSZI0aufSPrE3bwudAQDYfxHvkSRJo3NwymVBM/QLLgApl58DJyz0fZIkaSQuAz680DctZgYAnAWQJGlcfCzlcsFC37SoApBy+Srwi8W8V5IkDc0q4MDFvHGxMwDgLIAkSdGOSbmcuZg3LqUAHA6sd69hSZI0Uu9e7BsXXQAGdxu+d7HvlyRJS/K9lMv3FvvmpcwAQHvX4ZxbDkqSpKFb9Kd/WGIBSLlcBHx0KceQJEkLdibwf0s5wFJnAAAOAK4cwnEkSdL8HJhyuWYpB1hyAUi5nAO8b6nHkSRJ83IuQ5h9H8YMAMDbgIuGdCxJkjS7fVMuK5Z6kKEUgJTL34F3DONYkiRpVmcAHxvGgYY1AwDtVsHnDvF4kiRpTfukXK4exoGGVgAG0xH/NazjSZKkNfww5XL0sA42zBkAaKclmiEfU5IkwWuHebChFoDBIwmvH+YxJUkSX025fGOYBxz2DAApl2OA7w/7uJIk9dQM8LphH3ToBWBgqNMUkiT12BEpl58O+6AjKQApl28Cx43i2JIk9chK4I2jOPCoZgAA9gZWjfD4kiRNu0NSLr8dxYFHVgBSLr8EPj2q40uSNOUuA94yqoOPcgYA2icCLh7xOSRJmkbvTrn8ZVQHH2kBSLmcC7xhlOeQJGkKnQW8c5QnGPUMAMD7gR91cB5JkqbFS1Mul4/yBCMvACmXVcALgCXtWyxJUk8ck3I5dtQn6WIGgJTLj2lnAiRJ0uwuBfbs4kSdFICBN+BugZIkrc9/pVzO6eJEnRWAlMsldNRqJEmaQKcAB3V1si5nAEi5HAV8uctzSpI0AWaAF6Zcru7qhJ0WgIGXACsCzitJ0rg6NOXy3S5P2HkBSLn8Dvjvrs8rSdKY+hsBm+hFzAAAvBs4NejckiSNk1enXP7e9UmXzczMdH1OAJq6eijwTWBZSABJkuJ9M+VSRZw4agaAlMu3gY9GnV+SpGArgRdGnTysAAzsBfwuOIMkSRHekXI5LerkoQVgsDbAM4BVkTkkSerYjxnhVr/zET0DQMrlO4x4xyNJksbICuAZKZeVkSHCC8DAm4GfRoeQJKkDe6dcTo8OMRYFYNCCng5cEZ1FkqQROgE4ODoEjEkBABjcCPG66BySJI3IBcCzUi4xz9+vZWwKwMBBwInRISRJGoEXpVz+GB1itbCFgGbT1NUdgV8Am0dnkSRpSA5PuewSHeL6xm0GgJTLH4AXReeQJGlIxnJcG7sCAJByORw4IjqHJElLNEN73f/C6CBrG8sCMPAi2tYkSdKkem/KZSzvbRvbApByuQB4Nm17kiRp0pwG7B0dYjZjWwAAUi4nAG+LziFJ0gJdRbva39iubzPWBWDgzfhooCRpsuyVcvlJdIj1GbvHANelqastgJ8AW0ZnkSRpDkemXJ4aHWIukzADQMrlPOApwNXRWSRJWo8GeG50iPmYiAIA1+4a+JroHJIkzeIyYOeUy6XRQeZjYgoAQMrlAOCo6BySJK3D81Mup0aHmK+JKgADzwF+FR1CkqTr+VDK5bPRIRZi4gpAyuUS4D+Ay6OzSJIE/Ah4eXSIhZq4AgCQcvkl8ILoHJKk3rsAeHLK5croIAs1kQUAIOXyaeDD0TkkSb01Azwz5XJWdJDFmNgCMLAn8OPoEJKkXnpHyuXY6BCLNdEFYDDlsjPtFIwkSV35BvDG6BBLMdEFAGAw9fJU4JrgKJKkfvgT8LSUy0SPOxNfAABSLl+jvRwgSdIoXQE8KeXyl+ggSzUVBQAg5fJ+4APROSRJU+05KZcfRIcYhqkpAAN7Ajk6hCRpKr0l5XJ4dIhhmaoCkHK5GvhP4IzoLJKkqfJ52u3pp8ZEbAe8UE1dbQ38ALhldBZJ0sT7EbBdymVFdJBhmqoZgNVSLr+hXS54ZXQWSdJE+yPwhGkb/GFKCwBAyuUk4MXROSRJE+ty4PEpl3Ojg4zC1BYAgJTLR4ADonNIkibODPCMlMtPooOMylQXgIFXAV+ODiFJmihvSLn8b3SIUZrKmwDX1tTVzYHvAveMziJJGnufSbk8IzrEqPVhBoCUyyXA44C/RmeRJI217wHPjQ7RhV4UALh2z4DHAZcFR5EkjaezgScONpqber0pAACD5RufDFwdnUWSNFb+DuyQcjkvOkhXelUAAFIuxwO7097hKUnSCuBxKZfTo4N0qXcFACDl8ilg7+gckqRw1wBPSbl8NzpI13pZAABSLvvhGgGS1HfPT7l8KTpEhN4WgIG9gMOiQ0iSQrwx5XJodIgovVgHYH2autoQOA6oo7NIkjrzgZRLr5eL7/sMACmXlcBOtLs9SZKm39HAS6NDROv9DMBqTV3dhna1wK2js0iSRqYAj+7Ls/7rYwG4nqau/oG2BNwuOoskaehOAbZLuVwUHWQc9P4SwPWlXH4H7ABcHJ1FkjRUZ9Mu9OPgP2ABWEvK5WfAE4HeTw9J0pQ4n3ba/9zoIOPEArAOKZdvADsDK6OzSJKW5DLgsSmXM6KDjBsLwCxSLscCT6NdJUqSNHlWADsO9oHRWiwA65FyORrYDVgVnUWStCBXAk9KuZwUHWRcWQDmkHL5LPA83DxIkibFSuDJKZevRgcZZxaAeRgsFdn7RSMkaQJcA+zS1/X9F8ICME8pl/cDr47OIUma1Spgt5TLUdFBJoEFYAFSLvsDb4rOIUm6gRlgj8FlW82DBWCBUi5vAd4enUOStIaXpFw+Fh1iklgAFiHl8nrgwOgckiQA9kq5fCA6xKSxACxSyuUVwIejc0hSz+2TcnlPdIhJZAFYmhcCn4wOIUk99ZaUy9uiQ0wqdwNcoqauNgA+CjwrOIok9cn+KRefzFoCZwCWKOVyDfAc4H3RWSSpJ/Zz8F86ZwCGqKmrtwN7R+eQpCn2hpTLW6NDTAMLwJA1dfU6wGtSkjRcM8CeKZeDo4NMCwvACDR19VLgIGBZdBZJmgLXAM9NuXwiOsg0sQCMSFNXzwY+AmwQnUWSJthK2rX9Xd53yCwAI9TU1ZOBzwIbRmeRpAm0AviPlMvx0UGmkQVgxJq6egxwNHCT6CySNEEuAR6XcinRQaaVBaADTV09AvgisEl0FkmaAH8H/j3l8sPoINPMAtCRpq4eCBwP3CI6iySNsT8Ddcrll9FBpp0FoENNXd0b+BqwRXQWSRpDvwcelXL5TXSQPnAlwA6lXH4ObAf8ITqLJI2ZXwEPdfDvjgWgYymXM4CHAb+NziJJY+IUYLuUyznRQfrEAhAg5XIWbQk4LTiKJEX7AfDwlMtfooP0jQUgSMrlT0AF/CQ6iyQF+QawfcrlguggfWQBCJRy+RvwSOA70VkkqWPHAY9JuVwaHaSvLADBUi4XAf8G5OgsktSRI4EnpVyuiA7SZxaAMZByuRx4HPCF6CySNGKH0q7tvzI6SN9ZAMZEyuVKYGfgsOgskjQiBwJ7pFxWRQeRCwGNnaaulgMfBJ4XnUWShugtKZc3RYfQdSwAY6qpq3cDr4zOIUlD8OqUy/7RIbQmLwGMqZTLXsC+0TkkaQlWAS9w8B9PzgCMuaauXgS8F9ggOoskLcDVwG4pF+9rGlMWgAnQ1NUOtI/N3Dw6iyTNw8XAk1MuX4sOotlZACbEYCfBY4E7RmeRpPU4G9jR7XzHn/cATIjBToIPBH4anUWSZnEy8EAH/8lgAZggKZdzaTcR+lJ0Fklay9G4qc9EsQBMmJTLZcATaW8MlKRxsB/tNf8V0UE0f94DMMGaunopcAA+ISApxtXAi1IuH4kOooWzAEy4pq52BA4HNonOIqlXLgJ2TrmcEB1Ei2MBmAJNXd2H9gmBLaOzSOqFs4DHplxOiw6ixfMegCmQcvkZ7RMCP4vOImnq/YD2Tn8H/wlnAZgSKZc/0j4hcFx0FklT6yjgESmX86KDaOksAFMk5XIp8ATgfdFZJE2ddwD/6Z3+08N7AKZUU1d7Au/BkidpaVYCL0y5HBodRMNlAZhiTV09HjgMuFl0FkkT6ULaO/1PjA6i4bMATLmmru5HQGYYWQAACqlJREFU+4TA7aOzSJoov6O90//06CAaDaeHp1zK5Se0TwicEp1F0sT4Pu2d/g7+U8wC0AMpl3OAhwJfic4iaex9jvZO/79GB9FoWQB6IuVyCbAj8MHoLJLG1tuAp6ZcrogOotHzHoAeaurqlcC7sABKaq0Enp9y+Xh0EHXHAtBTTV09EfgssHF0FkmhLgR2Srl8IzqIumUB6LGmru4PfAG4Q3QWSSHOpL3Tv4kOou45BdxjKZcfAf8CfCs6i6TOFeBBDv79ZQHouZTLn4FHAQdHZ5HUmQOA7b3Tv9+8BKBrNXX1DODDwE2js0gaicuA3VMuR0YHUTwLgNbQ1NV9gf8FtgqOImm4fk17s98vo4NoPHgJQGtIufwUuD+Qo7NIGpovAQ9w8Nf1WQB0AymX84EdgHdGZ5G0JKuANwJPSLlcFB1G48VLAFqvpq7+A/gEsElwFEkLcwGwS8rFJcC1ThYAzampq7sDxwB3jc4iaV5+Rnu9/3fRQTS+vASgOaVcTgMeAHwxOoukOX0aeIiDv+biDIDmramrZbTXE9+M5VEaNyuBV6Rc3h8dRJPBAqAFa+rqMbT7CGwenUUSAH8Cdk65fDc6iCaHBUCL0tTV1rTrBfxzdBap574NPHmwqqc0b07jalFSLr8BHgy4opgU573AIxz8tRjOAGjJmrrai3bNgA2is0g9cTnwvJTLZ6ODaHJZADQUTV09knY24NbRWaQp91vaR/xOiQ6iyeYlAA1FyuXrtFsL/yg6izTFvgzc38Ffw2AB0NCkXH4PPAz4eHQWacrMAPsCO6ZcLowOo+ngJQCNRFNXLwQOBDaKziJNuAuBp6dcjosOouliAdDINHX1YOBzwB2js0gT6hTa6/2/jQ6i6eMlAI1MyuV7wL1ptyKVtDAfAx7s4K9RcQZAnWjqak9gP7wkIM3lYuD5KZcjooNoulkA1Jmmrv4FOALYOjqLNKZ+CDw15XJmdBBNPy8BqDMplx8D9wMOj84ijZkZYH/gXx381RVnABSiqavdaZcx3Tg6ixTsPGC3lMtXooOoXywACtPU1d1pVw+8Z3QWKcgJwDNcy18RvASgMCmX04BtgY9EZ5E6djXweuDRDv6K4gyAxkJTV08BDgE2jc4ijdjZwNMGj8lKYZwB0FhIuRwJ3Jf2LmhpWh0F3MfBX+PAGQCNlaauNgTeAbwCWBYcRxqWFcArUi4fjg4irWYB0Fhq6uqxwCdwe2FNvlNpn+3/ZXQQ6fq8BKCxNNj45D7AN6OzSEtwCPAAB3+NI2cANNaautoAeBPwBiysmhwXAXukXD4fHUSajQVAE6Gpq4cDnwXuEBxFmsv3ae/yPys6iLQ+fqLSREi5nER7SeD44CjSbGZob2B9mIO/JoEzAJooTV0tA/YC3gZsGBxHWu3PwDNTLjk6iDRfFgBNpKautgUOA+4SnUW991Xawf+86CDSQngJQBMp5XIy7SUBlxFWlCto16vYwcFfk8gZAE28pq52BD4K3DY6i3rjx7Sb+JweHURaLGcANPFSLsfS7ih4THQWTb2rgf8GHuTgr0nnDICmSlNXzwIOwk2FNHxn0F7rPzk6iDQMzgBoqqRcPgHcG1cQ1PDMAO8D7uvgr2niDICmUlNXy2kfF/wfYKPgOJpcfwCenXI5ITqINGwWAE21pq7+GfgMcK/oLJo4nwVeknK5MDqINAoWAE29pq42op0J2Asve2lu5wMvSLkcFR1EGiULgHqjqavtgE8CWwVH0fj6MrB7yuXP0UGkUbMAqFeauro57VMCz47OorFyKbBXyuWQ6CBSVywA6qWmrp5Iu1f7baKzKNx3aB/vOzM6iNQlr4eql1Iu/wf8M3BsdBaFuQrYG9jOwV995AyAeq+pqz2A9wCbRGdRZ06hXcr3lOggUhRnANR7KZeP0C4e9N3oLBq5VcB+wAMc/NV3zgBIA01dbQC8BngzcOPgOBq+M4HdUi7fjg4ijQMLgLSWpq7uDnwc2DY6i4ZiFe1Svq9PuVwWHUYaFxYAaR0GswGvpN357SbBcbR4De1z/V7ekdZiAZDWo6mrbYCPAQ+JzqIFuRp4F7BvyuXK6DDSOLIASHMYbCz0MuCtwMbBcTS3nwHPSbn8NDqINM4sANI8NXV1F+BQoIrOonW6kvaSzX4pl6ujw0jjzgIgLUBTV8uAFwLvxHUDxsn3aK/1nx4dRJoUFgBpEZq62gr4CLB9cJS+uwzYBzg45bIqOow0SSwA0hIMVhHcH9g0OksPnQjskXL5XXQQaRJZAKQlaurqjrQbC+0QnaUnLqLdue/Q6CDSJLMASEPS1NWzgAOAzYOjTLMvAi9MuZwbHUSadBYAaYiauro98CHg8dFZpsxfgZelXI6IDiJNCwuANAJNXe0CvBe4VXSWKXAYsGfK5W/RQaRpYgGQRqSpqy2Ag4CnRmeZUOcAL0q5HBsdRJpGFgBpxJq6qoEPAFtHZ5kQK4EDaZfxdfMeaUQsAFIHmrq6MfB64LW41fD6fJP2U/+p0UGkaWcBkDrU1NVdaWcDHhWdZcycB7w65fKp6CBSX1gApABNXe0KvBu4bXSWYKuADwOvT7lcGB1G6hMLgBSkqavNgbcDzwOWB8eJ8GPaZ/p/GB1E6iMLgBSsqasH0q4dcJ/oLB25iHb9/g+6fr8UxwIgjYGmrjYAXka7ne007zL4GeBVKZe/RAeR+s4CII2Rwb4CBwE7RWcZstNp7+4/KTqIpJYFQBpDTV3tCBwMbBUcZakup53VeE/KZWV0GEnXsQBIY6qpq42BNwGvBDYMjrMYX6Bdv//30UEk3ZAFQBpzTV3dg/YmwYdGZ5mn39EO/C7hK42xPj56JE2Uwap42wG7A+cHx1mfq4C3Avdw8JfGnzMA0gRp6upWwLuAZwHLYtOs4UTgxSmXM6KDSJofC4A0gZq6ehjtZYG7B0f5E7BXyuXw4BySFshLANIESrl8i3bhoNfR3mnftWuA9wLJwV+aTM4ASBOuqautgPcBj+3olN+nXcL3Zx2dT9IIWACkKdHU1U60n8q3HNEp/g7sDXw05eIfDmnCWQCkKdLU1SbAG4GXAxsN6bDXAIcC+6Rc/jakY0oKZgGQplBTV1vTbjf8+CUe6uvAK1Iupyw9laRxYgGQplhTV9sDBwL3WOBbf0O7ac8Xhp9K0jjwKQBpiqVcTgDuDbyE9hr+XC4CXk27mI+DvzTFnAGQeqKpq1sC+wIvAG601o+vAT4KvDHl8teus0nqngVA6pnB3gIHAPXgWyfSXuf/RVwqSV2zAEg91dTV4wFSLl+MziKpexYASZJ6yJsAJUnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD1kAJEnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD1kAJEnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD1kAJEnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD1kAJEnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB6yAEiS1EMWAEmSesgCIElSD1kAJEnqIQuAJEk9ZAGQJKmHLACSJPWQBUCSpB76/yUHSiyuZjswAAAAAElFTkSuQmCC"/>'+
            '</pattern>'+
          '<filter id="heart" x="0" y="0" width="92" height="94" filterUnits="userSpaceOnUse">'+
            '<feOffset dy="8" input="SourceAlpha"/>'+
            '<feGaussianBlur stdDeviation="1" result="blur"/>'+
            '<feFlood flood-opacity="0.427"/>'+
            '<feComposite operator="in" in2="blur"/>'+
            '<feComposite in="SourceGraphic"/>'+
            '</filter>'+
          '</defs>'+
        '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#heart)">'+
          '<rect id="heart-2" data-name="heart" width="86" height="83" transform="translate(3)" fill="url(#patternh)"/>'+
          '</g>'+
      '</svg>';
      }, false);
      document.getElementById("CMbtnheart").addEventListener("mouseout", function( event ) {
        // highlight the mouseover target

        document.getElementById("CMbtnheart").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="54" height="56" viewBox="0 0 92 94">'+
        '<defs>'+
        '<pattern id="patternh" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 512 512">'+
            '<image width="512" height="512" xlink:href="data:image/png;base64,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"/>'+
            '</pattern>'+
            '<filter id="heart" x="0" y="0" width="92" height="94" filterUnits="userSpaceOnUse">'+
            '<feOffset dy="8" input="SourceAlpha"/>'+
            '<feGaussianBlur stdDeviation="1" result="blur"/>'+
            '<feFlood flood-opacity="0.427"/>'+
            '<feComposite operator="in" in2="blur"/>'+
            '<feComposite in="SourceGraphic"/>'+
            '</filter>'+
            '</defs>'+
            '<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#heart)">'+
            '<path id="heart-2" data-name="heart" d="M9,0H77a9,9,0,0,1,9,9V74a9,9,0,0,1-9,9H9a9,9,0,0,1-9-9V9A9,9,0,0,1,9,0Z" transform="translate(3)" opacity="0.43" fill="url(#patternh)"/>'+
            '</g>'+
            '</svg>';
      }, false);
      */
    }
    
    
    // Eventos
    $CMbtnChat.addEventListener('click', clikgoViewTochat);
    $botonAvanzar.addEventListener('click', pasarFoto);
    $botonbackFoto.addEventListener('click', backFoto);
    $CMbtnheart.addEventListener('click', addfavoriteUser);
    $UsergetAllImgforPointsbtn.addEventListener('click', UsergetAllImgforPoints);
    $UsergetSelectedImgforPointsbtn.addEventListener('click', UsergetSelectedImgforPoints);
    /**
     * $botonRetroceder.addEventListener('click', retrocederFoto);
     */
    
    // Iniciar
    renderizarImagen();
    showLoading(false)
  }else{
    swal("","No hay perfiles en el lugar seleccionado o por la edad filtrada como preferencia, cambie esta preferencia para continuar", "warning").then((value) => {
      updatedataUser();
    });

  }
}

function onchCountryfilter(){
  VGCountry =  $("#Country :selected").val();
  posicionActual = 0;
  loadlistmainprofile();
}

function deleteProfileFs(key){
  swal({
  title: "Are you sure?",
  text: "Delete this profile!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    firebase.database().ref('ProfileFs/'+key).remove()
    swal("successful process", {
      icon: "success",
    }).then((value) => {
    location.href="index.html";
  });
  } else {

  }
});
}

function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

function hidemoreinfo(){

}

function hidemoreinfonew(){
  if(document.getElementById("moreinfo").classList.contains("show")){
    document.getElementById("divdescript").style.background = "rgba(255,255,255,0.0)";
    document.getElementById("divdescript").classList.remove("backdrop-filter");
    document.getElementById("divdescript").classList.remove("backdrop-blur-sm");
    document.getElementById("divdescript").classList.remove("transform");
    document.getElementById("divdescript").classList.remove("mb-6");
    document.getElementById("divdescript").classList.remove("-translate-y-96");
    document.getElementById("moreinfo").classList.remove("show");
    document.getElementById("divdescript").classList.remove("top-96");
    document.getElementById("divdescript").classList.remove("h-full");
    //


}else{
  document.getElementById("moreinfo").classList.add("show");
  document.getElementById("divdescript").style.background = "rgba(255,255,255,0.4)";

  document.getElementById("divdescript").classList.add("backdrop-filter");
  document.getElementById("divdescript").classList.add("backdrop-blur-sm");

  document.getElementById("divdescript").classList.add("top-96");
  document.getElementById("divdescript").classList.add("h-full");
  //


  document.getElementById("divdescript").classList.add("transform");
  document.getElementById("divdescript").classList.add("mb-6");
  document.getElementById("divdescript").classList.add("-translate-y-96");
}


}
function abrirNuevoTab(url) {
  // Abrir nuevo tab
  var win = window.open(url, '_blank');
  // Cambiar el foco al nuevo tab (punto opcional)
  win.focus();
}