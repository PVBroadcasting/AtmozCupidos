jQuery(document).ready(function($) {

});

function login(){
	let email = document.getElementById('Inp_email_user').value;
	let password = document.getElementById('Inp_password_user').value;
	firebase.database().ref("Operator").orderByChild("correo").equalTo(email).once('value', function(snap) {      
	  snap.forEach((childSnapshot) => {
		  if(childSnapshot.val().Lock==false){
		
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
			  // Signed in
				location.href="../dashboard/dashboard.html";
			})
			.catch((error) => {
			  var errorCode = error.code;
			  if("auth/user-not-found"==errorCode){
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then((user) => {            
			
					firebase.auth().currentUser.sendEmailVerification();
					firebase.auth().currentUser.updateProfile({
					  displayName: childSnapshot.Nickname,
					});
					firebase.auth().signInWithEmailAndPassword(email, password)
					.then((user) => {
					  // Signed in
					  location.href="../dashboard/dashboard.html";
					})
					showLoading(false)
		
				})
				.catch((error) => {
				  swal("Warning",error.message,"warning")
				  showLoading(false)
				});
			  }
			});
		  }else{
			swal("Warning","This User is Lock","warning")
		  }

	  });
	}) 


}
