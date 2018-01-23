$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "joinpage") {
    	
	

    }
});

function DateClick(id)
{
	$("#"+id).attr("type", "date");
	$("#"+id).val(new Date().toDateInputValue())
	
}


Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function Join_Join()
{
	
	
	var join_bool = joinvalidation();
	
	if(join_bool==true)
		{
		ShowGIF("../img/giphy.gif");
	FirebaseCall();
	console.log("validation success!!");
	var email = document.querySelector("#Join_email").value;
	var password = document.querySelector("#Join_pass").value;
	
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {		
			if(error.code=="auth/invalid-email")
				{
				swal(
						  '이메일',
						  '유효한 이메일을 입력해주세요!',
						  'error'
						)
						HideGIF();
				}
			else if(error.code=="auth/email-already-in-use")
				{
				swal(
						  '이메일',
						  '이미 사용중인 이메일 입니다!',
						  'error'
						)
						HideGIF();
				}
			else
				{
				console.log(error.code);
				}
		}).then(function()
				{
					var user = firebase.auth().currentUser;
				    var email = user.email;
				    var uid = user.uid;
				    var birth = $("#Join_date").val();
				    var gender = $("input:radio[name=gender]:checked").val();
					var displayName = $("#Join_nick").val();
					  if (user) {
						  
						  //유저 닉네임 저장
						  user.updateProfile({
							  displayName: $("#Join_nick").val()
							}).then(function () {

											try{
		
											////////////////////////////////

										    
											const DoctorDB = firebase.database().ref('Doctor').orderByChild('email').equalTo(email);
											
											DoctorDB.once('value', function(snap)
													{
														if(snap.numChildren()==0)//일반 사용자 회원가입시도
															{
															console.log("일반사용자입니다.");
															firebase.database().ref('User/' + uid).set({
																nickname: displayName,
															    email: email,
															    birthday: birth,
															    gender: gender,
															    isDoctor:"false",
															    switch1:"On",
															    switch2:"On"
															  }).then(function ()
																	  {
																	user.sendEmailVerification().then(function() {
																		

																		if (typeof FCMPlugin != 'undefined') {//App에서 실행
																			FCMPlugin.subscribeToTopic('WpiasOn');
																	      }
																	    else//Phonegap App에서 실행
																	    {
																	    		console.log("Phonegap")
																	    }
																		
																		
																		
																		  $.mobile.changePage("../Auth/Auth.html",{transition:"slide"});
																		}, function(error) {
																		  swal(error.message);
																		});
																	  })
															}
														else//의사 회원가입 시도
															{
															console.log("의사입니다.");
															firebase.database().ref('User/' + uid).set({
																nickname: displayName,
															    email: email,
															    birthday: birth,
															    gender: gender,
															    isDoctor:"true",
															    switch1:"On",
															    switch3:"On"
															  }).then(function ()
																	  {
																	user.sendEmailVerification().then(function() {
																		HideGIF();
																		
																		if (typeof FCMPlugin != 'undefined') {//App에서 실행
																			FCMPlugin.subscribeToTopic('Doctor');
																			FCMPlugin.subscribeToTopic('WpiasOn');
																	      }
																	    else//Phonegap App에서 실행
																	    {
																	    		console.log("Phonegap")
																	    }

																		  $.mobile.changePage("../Auth/Auth.html",{transition:"slide"});
																		}, function(error) {
																		  swal(error.message);
																		});
																	  })
															}
													})
											////////////////////////////

											}
											catch(error)
											{
												swal({
													title:"에러발생",
													text: error.message,
													type: 'error'
												})
												HideGIF();
											}
							}, function(error) {
								swal({
									title:"에러발생",
									text: error.message,
									type: 'error'
								})
								HideGIF();
							});    
				}
		});
		}
}

function joinvalidation()
{
	if($("#Join_pass").val().length<6)
		{
		swal(
				  '비밀번호',
				  '비밀번호는 6글자 이상으로 설정해주세요!',
				  'error'
				)
				
				return false;
		}
	
	if($("#Join_pass").val()!=$("#Join_pass2").val())
		{
		swal(
				  '비밀번호',
				  '비밀번호 중복체크를 확인해주세요!',
				  'error'
				)
				
				return false;
		}
	
	if($("#Join_nick").val().length<2 || $("#Join_nick").val().length>8)
		{
			swal(
				  '닉네임',
				  '닉네임은 2글자이상 8글자 이하로 설정해주세요!',
				  'error'
				)
				
				return false;
		}
	
	if($("#Join_date").val().length==0)
		{
		swal(
				  '생년월일',
				  '생년월일을 선택해주세요!',
				  'error'
				)
				
				return false;
		}
	
	if($("input:radio[name=gender]:checked").length==0)
	{
	swal(
			  '성별',
			  '성별을 선택해주세요!',
			  'error'
			)
			
			return false;
	}
	
	return true;
}

function genderselect(){
	
	if($("input:radio[name=gender]:checked").val()=="male"){
		$("#gender_img_men").attr("src", "../img/checkon.png");
		$("#gender_img_women").attr("src", "../img/checkoff.png");
	}else{
		$("#gender_img_men").attr("src", "../img/checkoff.png");
		$("#gender_img_women").attr("src", "../img/checkon.png");
	}
	
}
