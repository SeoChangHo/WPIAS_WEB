var Docbool;

$(document).on("pagebeforechange", function (e, data) {

	if (data.toPage[0].id == "settingpage") {
		$("#header").css("height", (window.innerHeight*0.074).toFixed(0));
		var uid =  $('#index_uid').html();
		FirebaseCall();
		
		if(window.innerWidth=="320"){
			$("#setting_userinfo li").css("padding-top","4%");
			$("#setting_push li").css("padding-top","4%");
			$("#setting_push").css("margin-bottom","8%");
			$("#setting_footer").css("padding-top","8%");
		}

		const db = firebase.database().ref();
		const user = db.child('User').child(uid);
		user.once('value', snap =>{
			//document.getElementById('setting_ul1').innerHTML+=
				$("#setting_nick").html(firebase.auth().currentUser.displayName);
				$("#setting_email").html(snap.child('email').val());
				$("#setting_birth").html(snap.child('birthday').val());
				if(snap.child('gender').val()=="male"){
					$("#setting_sex").html("남자");
				}else if(snap.child('gender').val()=="female"){
					$("#setting_sex").html("여자");
				}
				
				SwichConnect(snap.child('switch1').val(),snap.child('switch2').val(),snap.child('switch3').val(), uid);
				
				if(snap.child('isDoctor').val()=="false"){
					$("#setting_patient").show();
					Docbool=false;
				}else{
					$("#setting_doctor").show();
					Docbool=true;
				}
		})	
    }
	
	
	
	
});


$(document).on('pageshow', '#settingpage', function(event, data){
	
	
	
	

})

function btn_setting_updatenick()
{
	var cur_user = firebase.auth().currentUser;
	var update_nickname=cur_user.displayName;
	
	swal({
		  title: '닉네임',
		  text:'변경하고자 하는 닉네임을 입력해주세요!',
		  input: 'text',
		  inputValue: update_nickname,
		  inputPlaceholder: 'Enter nickname',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
		      if (value) {	    	  
		    	    if(value==update_nickname)//기존의 닉네임과 같을 때
		    	    	{
		    	    reject('기존 닉네임과 동일합니다.')
		    	    	}
		        if(value.length<2 ||value.length>8)//닉네임이 2글자와 8글자 사이가 아닐 때
		        {
		        	reject('닉네임은 2~8글자 사이입니다.')
		        }
		        else//통과
		        	{
		        	resolve()
		        	}
		      } else {//아무것도 적지 않았을 때
		        reject('닉네임을 적어주세요.')
		      }
		    })
		  }
		}).then(function (name) {
			
			cur_user.updateProfile({
				  displayName: name
				}).then(function() {
					
					if(Docbool)
						{
						AdviceDBupdate(name);
						AdviceRepleDBupdate(name);
						}
					else
						{
						QuestionDBupdate(name);
						}
		
				  swal
				  ({
					  title:'성공',
					  text:'닉네임이 '+name+'(으)로 변경되었습니다!',
					  type:'success',
					  allowOutsideClick: false
				  }).then(function()
						  {
					  			$("#setting_nick").html(name);
						  })
				}).catch(function(error) {
					console.log(error)  
					swal
					  ({
						  title:'실패',
						  text:'닉네임이 변경에 실패했습니다!',
						  type:'error'
					  })
				});
			
		}, function (dismiss) {
			  if (dismiss === 'cancel') {
				 console.log('cancel click');
			  }
			})
}


//Advice 닉네임 바꾸기
function AdviceDBupdate(name)
{
	var uid = $('#index_uid').html();
	const AdviceDB = firebase.database().ref().child('Advice').orderByChild('uid').equalTo(uid)
	AdviceDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							var AdviceDBtarget = firebase.database().ref().child('Advice/'+snapshot.key);							
							AdviceDBtarget.update(
									{
										nickname:name
									})
						})
			})
			
			var UserDB = firebase.database().ref().child('User/'+uid)
			
			UserDB.update(
					{
						nickname:name
					})
}

function AdviceRepleDBupdate(name)
{
	var uid = $('#index_uid').html();
	const AdviceRepleDB = firebase.database().ref().child('AdviceReple')
	AdviceRepleDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							const AdviceRepleDBtarget = firebase.database().ref().child('AdviceReple/'+snapshot.key).orderByChild('uid').equalTo(uid);							
							AdviceRepleDBtarget.once('value', function(RepleSnap)
									{
										RepleSnap.forEach(function(RepleSnapshot)
												{
													var AdviceRepleDBtarget = firebase.database().ref().child('AdviceReple/'+snapshot.key+'/'+RepleSnapshot.key);							
													AdviceRepleDBtarget.update(
															{
																nickname:name
															})
												})
									})
						})
			})

}


//닉넴변경할때 작성했던 질문의 닉네임도 바꾸기 & DB User Nickname 도 바꾸기
function QuestionDBupdate(name)
{
	var uid = $('#index_uid').html();
	const QuestionDB = firebase.database().ref().child('Question').orderByChild('uid').equalTo(uid)
	QuestionDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
							var QuestionDBtarget = firebase.database().ref().child('Question/'+snapshot.key);							
							QuestionDBtarget.update(
									{
										nickname:name
									})
						})
			})
			
			var UserDB = firebase.database().ref().child('User/'+uid)
			
			UserDB.update(
					{
						nickname:name
					})
}


function btn_setting_deletemember()
{
const user = firebase.auth().currentUser;
var dbRef = firebase.database().ref();
const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(user.uid);
var StorageRef = firebase.storage().ref();


	swal({
		  title: '패스워드',
		  text:'현재 비밀번호를 입력해주세요!',
		  input: 'password',
		  inputPlaceholder: 'Enter password',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
		      if (value) {	    	  
		        
		        resolve()
		        
		      } else {//아무것도 적지 않았을 때
		        reject('비밀번호를 입력해 주세요.')
		      }
		    })
		  }
		}).then(function (password) {
			const credential = firebase.auth.EmailAuthProvider.credential(
				    user.email, 
				    password
				);
			user.reauthenticate(credential).then(function() {
					user.delete().then(function() {
	
				    			dbRef.child('User/'+user.uid).remove().then(function()
				    					{			
													myQuestion.once('value', function(snap)
														{
													  snap.forEach(function(snapshot) {
														 
														  console.log(snapshot.key+" : snapshot Event")
														  if(snapshot.child('status').val()=='Q') //답변이 되지 않았스면 글과 스토리지 삭제
															  {
															  	console.log('status: =' +snapshot.child('status').val())
															  	var childkeyval = snapshot.key
															  	
															    dbRef.child('Question/'+childkeyval).remove().then(function()
															    		{
															    			var imagename = childkeyval.split("_");
															    			console.log(imagename[1]+"/"+imagename[0]);
															    			var StorageRefChild = StorageRef.child("Question/"+imagename[1]+"/"+imagename[0]+".png");
															    			StorageRefChild.delete();
															    		})
															  }
														  });												
														})
													firebase.auth().signOut();
													$.mobile.changePage("../Login/Login.html", {transition:"none"});
				    					})
										  swal
										  ({
											title:'성공!',
											text:'회원탈퇴가 완료되었습니다.',
											type: 'success'
										  })		
						}).catch(function(error) {
						  
						});	
				}).catch(function(error) {
					if(error.code=="auth/wrong-password") 
					{
					swal
					  ({
						text:'비밀번호가 일치하지 않습니다',
						type:'error'
					  })
					}
				});		
		}, function (dismiss) {
			  if (dismiss === 'cancel') {
				 console.log('cancel click');
			  }
			})
}

function btn_setting_updatepassword()
{
	
	const user = firebase.auth().currentUser;
	
	
	swal({
		  title: '패스워드',
		  text:'현재 비밀번호를 입력해주세요!',
		  input: 'password',
		  inputPlaceholder: 'Enter password',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  inputValidator: function (value) {
		    return new Promise(function (resolve, reject) {
		      if (value) {	    	  
		        
		        resolve()
		        
		      } else {//아무것도 적지 않았을 때
		        reject('비밀번호를 입력해 주세요!')
		      }
		    })
		  }
		}).then(function (password) {
			
			console.log(password);
			
			const credential = firebase.auth.EmailAuthProvider.credential(
				    user.email, 
				    password
				);
			
			user.reauthenticate(credential).then(function() {
				  
				//////////////////
				
				
				swal({
					  title: '패스워드 변경',
					  html:
						  '변경하실 비밀번호를 입력해주세요.<br>'+
					    '<input id="swal-input1" class="swal2-input" type="password" placeholder="Enter new password">' +
					    '<input id="swal-input2" class="swal2-input" type="password" placeholder="Enter confirm password" >',
					    allowOutsideClick: false,
						showCancelButton: true,
					  preConfirm: function () {
					    return new Promise(function (resolve, reject) {
					    if($('#swal-input1').val()!=$('#swal-input2').val())//비번중복체크실패
					    	{
					    	reject('비밀번호 중복체크 오류입니다.');
					    	}
					    else if($('#swal-input1').val()==password)//현재패스워드와 같을 때
					    	{
					    	reject('현재 비밀번호와 동일합니다.');
					    	}
					    else if($('#swal-input1').val().length<6)//비번이 6글자 미만일 때
					    {
					    	reject('비밀번호는 6글자 이상으로 설정해주세요.')
					    }
					    else//통과
					    	{
					    	
					    	resolve([
					        $('#swal-input1').val(),
					        $('#swal-input2').val()
					      ])
					    
					    	}
					    
					    })
					  }
					}).then(function (result) {
					  
						user.updatePassword(result[0]).then(function() {
							  swal
							  ({
								title:'성공!',
								text:'비밀번호가 성공적으로 변경되었습니다',
								type:'success'
							  })
							}).catch(function(error) {
							  swal
							  ({
								text:error.message,
								type:'error'
							  })
							});				
					}, function (dismiss) {
						  if (dismiss === 'cancel') {
							 console.log('cancel click');
						  }
						})				
				
				}).catch(function(error) {
					if(error.code=="auth/wrong-password") 
					{
					swal
					  ({
						text:'비밀번호가 일치하지 않습니다',
						type:'error'
					  })
					}
				});
			
		}, function (dismiss) {
			  if (dismiss === 'cancel') {
				 console.log('cancel click');
			  }
			})
}


function btn_setting_test()
{	
	const user = firebase.auth().currentUser;
	var dbRef = firebase.database().ref();
	const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(user.uid);
	var StorageRef = firebase.storage().ref();
	
	
	  swal
	  ({
		title:'성공!',
		text:'회원탈퇴가 완료되었습니다.',
		type: 'success'
	  }).then(function()
			  {						  
			dbRef.child('User/'+user.uid).remove().then(function()
					{
								myQuestion.once('value', function(snap)
									{
								  snap.forEach(function(child) {
									    console.log(child.key);
									    var childkeyval = child.key
									    dbRef.child('Question/'+child.key).remove().then(function()
									    		{
									    			var imagename = childkeyval.split("_");
									    			var StorageRefChild = StorageRef.child("Question/"+imagename[1]+"/"+imagename[0]+".png");
									    			StorageRefChild.delete();
									    		})
									  });												
									})			    						
					})
					
			  })
}

function SwichConnect(switchVal1, switchVal2, switchVal3 , uid)
{
	var switchupdate=firebase.database().ref("User/"+uid);
    
	
	console.log(switchVal1);
	console.log(switchVal2);
	console.log(switchVal3);
	
	if(switchVal1=="On")
	{
		$("#setting_switch1").val("On");
		$("#setting_switch1").trigger('change');
	}
	
	if(switchVal2=="On")
	{
		$("#setting_switch2").val("On");
		$("#setting_switch2").trigger('change');
	}
	
	if(switchVal3=="On")
	{
		$("#setting_switch3").val("On");
		$("#setting_switch3").trigger('change');
	}
	
	
	
	
		$("#setting_switch1").change(function()
		{
		if($("#setting_switch1").val()=="On")
			{
			switchupdate.update(
		              {
		              switch1: "On"
		              })
		              
		    FCMPlugin.subscribeToTopic('WpiasOn');
			}
		else
			{
			switchupdate.update(
		              {
		              switch1: "Off"
		              })
		    FCMPlugin.unsubscribeFromTopic('WpiasOn');
			}
		})
		
		
		
		$("#setting_switch2").change(function()
		{
		if($("#setting_switch2").val()=="On")
			{
			switchupdate.update(
		              {
		              switch2: "On"
		              })
			}
		else
			{
			switchupdate.update(
		              {
		              switch2: "Off"
		              })
			}
		})
		
		
		
		$("#setting_switch3").change(function()
		{
		if($("#setting_switch3").val()=="On")
			{
					 switchupdate.update(
		              {
		              switch3: "On"
		              })
		              FCMPlugin.subscribeToTopic('Doctor');
			}
		else
			{
					switchupdate.update(
		              {
		              switch3: "Off"
		              })
					  FCMPlugin.unsubscribeFromTopic('Doctor');
			}
		})
		

		
		
}







