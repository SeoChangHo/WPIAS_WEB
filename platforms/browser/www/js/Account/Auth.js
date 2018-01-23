$(document).on('pageshow', '#AuthPage', function (event, data) 
		{
	
			FirebaseCall();
			firebase.auth().onAuthStateChanged(function(user) {
	  if (user)
	  {
		  if($.mobile.pageContainer.pagecontainer('getActivePage').attr('id')=="AuthPage")
			  {
		  console.log(user);
		  $("#h3Text").html(user.email+"로<br>이메일이 도착하지 않았다면<br>이메일 재전송 버튼을 눌러주세요.")
			  }
	  }
	  else
	  {
		  if($.mobile.pageContainer.pagecontainer('getActivePage').attr('id')=="AuthPage")
			  {
		  console.log("Logout");
		  $.mobile.changePage("../Login/Login.html",{transition:"pop", reverse:true});  
			  }
	  }
	});
		})





function reAuth()
{
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  $("#div").innerHTML(user.email+"로<br>이메일이 도착하지 않았다면<br>이메일 재전송 버튼을 눌러주세요.");
	}, function(error) {
	  // An error happened.
	});
}

function Login()
{
	var email = $("#email").val();
	var password = $("#pass").val();
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});	
}

function goLogin()
{
	FirebaseCall();
	firebase.auth().signOut();
}
