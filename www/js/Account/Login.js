$(document).on('pageshow', '#LoginPage', function (event, data) 
		{

		})

function Login_Login()
{
	ShowGIF("../img/giphy.gif");
	console.log("Login버튼 클릭");
	FirebaseCall();
	
	var email = $("#Login_email").val();
	var password = $("#Login_pass").val();
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		HideGIF();
			swal
			({
				title:'실패!',
				text:'계정정보를 확인해주세요',
				type:'error'
			})
			return;
		}).then(function()
				{
			
			var user = firebase.auth().currentUser;
			
			if(user)
				{
			var verified = user.emailVerified;
 
					  if(verified==true) //이메일 인증이 되어 있을 때 
					  {
						  
						  var db=firebase.database().ref("User/"+user.uid);

						  db.once('value', function(snap)
						  {
							  console.log(snap.child('isDoctor').val());

							  if(snap.child('isDoctor').val()=="true")
								  {
									console.log("DoctorLogin & SubscribeTopic Doctor");
									if (typeof FCMPlugin != 'undefined') {//App에서 실행
										FCMPlugin.subscribeToTopic('Doctor'); 
									}
									
							  		$("#login_emailpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_passpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_loginbutton").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_repass").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_signup2").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_signup").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_footer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
									
							  		$("#login_logo").animate({margin:'43% 26% 15% 26%'}, 400);
									setTimeout(function(){
										SaveToken(user.uid);
										 $('#index_uid').html(user.uid)
										  $('#index_email').html(user.email);
										HideGIF();
										$.mobile.changePage("../Doctor/MainPageDoc.html",{transition:"none"});
									}, 400);
								  }
							  else
								  {
							  		console.log("UserLogin");
									if (typeof FCMPlugin != 'undefined') {//App에서 실행
							  		FCMPlugin.unsubscribeFromTopic('Doctor');
									}
							  		$("#login_emailpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_passpage").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_loginbutton").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_repass").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_signup2").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_signup").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		$("#login_footer").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
							  		
							  		$("#login_logo").animate({margin:'43% 26% 15% 26%'}, 400);
							  		setTimeout(function(){ 
                                               SaveToken(user.uid);
                                               $('#index_uid').html(user.uid)
                                                $('#index_email').html(user.email);
                                               HideGIF();
							  			$.mobile.changePage("../User/MainPage.html",{transition:"none"});
							  		}, 400);
							  		
								  }
						  })

					  }
					  else //이메일 인증이 되어 있지 않을 때 
					  {
						  HideGIF();
						  swal({
							  title:'미인증 계정',
							  html:'이메일 인증이 되지 않은 계정입니다.<br>인증페이지로 이동합니다.',
							  type:'warning'
						  }).then(function()
								  {
							  user.sendEmailVerification().then(function() {
								  
								  $.mobile.changePage("../Auth/Auth.html",{transition:"slideup"});
							  })
								  })
						 
					  }
				}
				})

	
}

function SignUp()
{	
		$.mobile.changePage("../Join/Agree.html",{transition:"slideup"});
}

function Mypage_Logout()
{
	FirebaseCall();
	firebase.auth().signOut();
	if (typeof FCMPlugin != 'undefined') {//App에서 실행
	FCMPlugin.unsubscribeFromTopic('Doctor');
	}
	$.mobile.changePage("../Login/Login.html", {transition:"slideup", reverse:true});
}

function Login_PasswordReset()
{
	FirebaseCall();
	var auth = firebase.auth();
	
	swal({
		  title: 'Email',
		  input: 'email',
		  inputPlaceholder: 'Enter your E-mail address',
		  text: '입력하신 이메일로 초기화 코드가 전송됩니다.',
		  showCancelButton: true,
		  allowOutsideClick: false
		  
		}).then(function (email) {
			
			auth.sendPasswordResetEmail(email).then(function() {
				swal(
						  '성공!',
						  '이메일을 확인해주세요.',
						  'success'
						)
				}).catch(function(error) {
					
					if(error.code=="auth/user-not-found")
						{
						swal({
							  title: '이런...',
							  text: '존재하지 않는 계정입니다.',
							  type:'error',
							  allowOutsideClick: false
							  
							}).then(function()
										{
									
										},
										function (dismiss) {
											  if (dismiss === 'cancel') {
												  console.log("cancel");
											  }
											  if(dismiss === 'esc')
												  {
												  console.log("esc")
												  }
										})
						}
				})
		},
		function (dismiss) {
			  if (dismiss === 'cancel') {
				  console.log("cancel");
			  }
			  if(dismiss === 'esc')
				  {
				  console.log("esc")
				  }
		})
}
