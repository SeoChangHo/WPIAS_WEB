var currentcount;
var AnswerViewMoreClick;

$(document).on("pagebeforechange", function (e, data) {
    
	if (data.toPage[0].id == "answerpage") {
		
		currentcount=0;
		AnswerViewMoreClick=0;
		LoadWaitAnswer();
		AnswerGetDoctorProfile()
    }
	
});

$(document).on("pageshow", "#answerpage", function (e, data) {

});


function AnswerGetDoctorProfile()
{
	
	FirebaseCall();
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const answerdb = dbRef.child('Question').orderByChild('answerdoc').equalTo(uid);
	
	$("#answer_doctor_name").html(doctorName);
	
	answerdb.once('value', function(snap){
		
		var AnswerCount = snap.numChildren();
	 	$("#answer_doctor_img img").attr("src","../img/profile/doctor_male.png");
		$("#answer_doctor_etc").html("화상외과 | 답변수 : " + AnswerCount);
	})

}


function LoadWaitAnswer()
{
	FirebaseCall();
	const WaitAnswerDB = firebase.database().ref().child("Question").orderByChild('prostatus').equalTo("Q")
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const myQuestion = dbRef.child("Question").orderByChild('answerdoc').equalTo(uid);
	const answerdb = dbRef.child('Answer');
	var count =0;

		WaitAnswerDB.once('value', function(totalsnap){
			
			var TotalCount = totalsnap.numChildren();
			console.log(TotalCount);


			WaitAnswerDB.limitToLast(4).once('value', function(snap){
				
					snap.forEach(function(snapshot) {
						
						currentcount++;
						
						if(snapshot.child('burnstyle').val()=="1"){
							var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "열탕화상";
							var backgroundcolor = "style='background:rgba(255,115,115,1)'";
						}else if(snapshot.child('burnstyle').val()=="2"){
							var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "화염화상";
							var backgroundcolor = "style='background:rgba(255,184,115,1)'";
						}else if(snapshot.child('burnstyle').val()=="3"){
							var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "전기화상";
							var backgroundcolor = "style='background:rgba(29,29,192,1)'";
						}else if(snapshot.child('burnstyle').val()=="4"){
							var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "접촉화상";
							var backgroundcolor = "style='background:rgba(255,115,207,1)'";
						}else if(snapshot.child('burnstyle').val()=="5"){
							var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "저온화상";
							var backgroundcolor = "style='background:rgba(115,210,255,1)'";
						}else if(snapshot.child('burnstyle').val()=="6"){
							var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "화학화상";
							var backgroundcolor = "style='background:rgba(123,77,255,1)'";
						}else if(snapshot.child('burnstyle').val()=="7"){
							var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "증기화상";
							var backgroundcolor = "style='background:rgba(0,231,141,1)'";
						}else if(snapshot.child('burnstyle').val()=="8"){
							var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "마찰화상";
							var backgroundcolor = "style='background:rgba(197,115,255,1)'";
						}else if(snapshot.child('burnstyle').val()=="9"){
							var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "햇빛화상";
							var backgroundcolor = "style='background:rgba(210,233,17,1)'";
						}else if(snapshot.child('burnstyle').val()=="10"){
							var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
							var nodetext = "흡입화상";
							var backgroundcolor = "style='background:rgba(0,136,161,1)'";
						}
						
						var Fulldate = snapshot.child('date').val();
						var YearVal =  Fulldate.substr(0,4);
						var MonthVal = Fulldate.substr(4,2);
						var DayVal = Fulldate.substr(6,2);	
						var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
						
					var DivStruct=
						"<a href='#' onclick='AnswerDetail(\""+snapshot.key+"\")'>"
					  	+"<ul class='answer_date_ul' "+backgroundcolor+">"
						+"	<li><div class='answer_answer'><img src='../img/questionmark.png' width='100%'></div><div class='answer_date'>"+nodetext+"</div></li>"
						+"</ul>"
						+"<ul class='answer_title_ul1' "+backgroundcolor+">"
						+"	<li><div class='answer_title'>"+snapshot.child('title').val()+"</div></li>"
						+"	<li><div class='answer_kinds'>"+snapshot.child('nickname').val()+"&nbsp;&nbsp;|&nbsp;&nbsp;"+DesignDate+"</div></li>"
						+"</ul>"
						+"<ul class='answer_img_ul'>"
						+"	<li><div class='answer_img'>"+nodeimg+"</div></li>"
						+"</ul>"
						+"<ul><li>　</li></ul>"
						+"</a>"	
								
						
						document.getElementById('answerpage_box_ul').insertAdjacentHTML('afterBegin', DivStruct);	
//									descArr[RowCount][ColCount]=snapshot.key;			
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.key);					
//									ColCount++;
//									
//									
//									descArr[RowCount][ColCount] = snapshot.child('title').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('title').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('date').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('date').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('burnstyle').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('burnstyle').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('burndetail').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('burndetail').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('finish').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('finish').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('bodystyle').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('bodystyle').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('bodydetail').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('bodydetail').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('age').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('age').val());			
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('nickname').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('nickname').val());	
//									ColCount++;
//									
//									descArr[RowCount][ColCount] = snapshot.child('scarstyle').val()
//									console.log("ARR["+RowCount+"]"+"["+ColCount+"]= "+snapshot.child('scarstyle').val());	
		
						});
					
					if(TotalCount>4)
					{
						$('#WaitAnswerbtn').show();
						$('#btnWaitAnswer').attr('onclick', 'btnWaitAnswerClick')
						$('#btnWaitAnswer').attr('onclick', "btnWaitAnswerClick("+currentcount+")")
					}
			})

			}); 
}

function btnWaitAnswerClick(getCount)
{
	$('#WaitAnswerbtn').hide();
	AnswerViewMoreClick++;
	
	
	var moreDivStruct = "<ul id='answerpage_box_ul"+AnswerViewMoreClick+"'></ul>"
	document.getElementById('answerpage_box').insertAdjacentHTML('beforeEnd',moreDivStruct)
	
	var resetcount=0;
	const WaitAnswerDB = firebase.database().ref().child("Question").orderByChild('prostatus').equalTo("Q")
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var doctorName = user.displayName;
	var dbRef = firebase.database().ref();
	const myQuestion = dbRef.child("Question").orderByChild('answerdoc').equalTo(uid);
	const answerdb = dbRef.child('Answer');
	var count =0;
	
		WaitAnswerDB.once('value', function(totalsnap){
			
			var TotalCount = totalsnap.numChildren();

			if(TotalCount-currentcount>=4) // 이거 부르고도 또 있을 때
			{
			WaitAnswerDB.limitToLast(getCount+4).once('value', function(snap){
				
					snap.forEach(function(snapshot) {
						
						currentcount++;
						resetcount++;
						if(snapshot.child('burnstyle').val()=="1"){
								var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "열탕화상";
								var backgroundcolor = "style='background:rgba(255,115,115,1)'";
							}else if(snapshot.child('burnstyle').val()=="2"){
								var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "화염화상";
								var backgroundcolor = "style='background:rgba(255,184,115,1)'";
							}else if(snapshot.child('burnstyle').val()=="3"){
								var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "전기화상";
								var backgroundcolor = "style='background:rgba(29,29,192,1)'";
							}else if(snapshot.child('burnstyle').val()=="4"){
								var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "접촉화상";
								var backgroundcolor = "style='background:rgba(255,115,207,1)'";
							}else if(snapshot.child('burnstyle').val()=="5"){
								var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "저온화상";
								var backgroundcolor = "style='background:rgba(115,210,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="6"){
								var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "화학화상";
								var backgroundcolor = "style='background:rgba(123,77,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="7"){
								var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "증기화상";
								var backgroundcolor = "style='background:rgba(0,231,141,1)'";
							}else if(snapshot.child('burnstyle').val()=="8"){
								var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "마찰화상";
								var backgroundcolor = "style='background:rgba(197,115,255,1)'";
							}else if(snapshot.child('burnstyle').val()=="9"){
								var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "햇빛화상";
								var backgroundcolor = "style='background:rgba(210,233,17,1)'";
							}else if(snapshot.child('burnstyle').val()=="10"){
								var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
								var nodetext = "흡입화상";
								var backgroundcolor = "style='background:rgba(0,136,161,1)'";
							}
							
							var Fulldate = snapshot.child('date').val();
							var YearVal =  Fulldate.substr(0,4);
							var MonthVal = Fulldate.substr(4,2);
							var DayVal = Fulldate.substr(6,2);	
							var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
							
						var DivStruct=
							"<a href='#' onclick='AnswerDetail(\""+snapshot.key+"\")'>"
						  	+"<ul class='answer_date_ul' "+backgroundcolor+">"
							+"	<li><div class='answer_answer'><img src='../img/questionmark.png' width='100%'></div><div class='answer_date'>"+nodetext+"</div></li>"
							+"</ul>"
							+"<ul class='answer_title_ul1' "+backgroundcolor+">"
							+"	<li><div class='answer_title'>"+snapshot.child('title').val()+"</div></li>"
							+"	<li><div class='answer_kinds'>"+snapshot.child('nickname').val()+"&nbsp;&nbsp;|&nbsp;&nbsp;"+DesignDate+"</div></li>"
							+"</ul>"
							+"<ul class='answer_img_ul'>"
							+"	<li><div class='answer_img'>"+nodeimg+"</div></li>"
							+"</ul>"
							+"<ul><li>　</li></ul>"
							+"</a>"	

							
							document.getElementById('answerpage_box_ul'+AnswerViewMoreClick).insertAdjacentHTML('afterBegin', DivStruct);	
			
						if(resetcount==4)
						{
							console.log("4개 더불러오기 끝");
							return true;
						}

						});
						

						
						if(TotalCount>currentcount)
						{
							$('#WaitAnswerbtn').show();
							$('#btnWaitAnswer').attr('onclick', 'btnWaitAnswerClick')
							$('#btnWaitAnswer').attr('onclick', "btnWaitAnswerClick("+currentcount+")")
						}
				})

			}
			else //이거 부르고 더이상 부를거 없을 때
				{
					console.log("4개 미만 남았다 ")
					var LastCount= TotalCount-currentcount
					console.log(LastCount);
					
					
					WaitAnswerDB.limitToFirst(LastCount).once('value', function(snap){
						
						snap.forEach(function(snapshot) {
							
							currentcount++;
							resetcount++;
							if(snapshot.child('burnstyle').val()=="1"){
									var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "열탕화상";
									var backgroundcolor = "style='background:rgba(255,115,115,1)'";
								}else if(snapshot.child('burnstyle').val()=="2"){
									var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "화염화상";
									var backgroundcolor = "style='background:rgba(255,184,115,1)'";
								}else if(snapshot.child('burnstyle').val()=="3"){
									var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "전기화상";
									var backgroundcolor = "style='background:rgba(29,29,192,1)'";
								}else if(snapshot.child('burnstyle').val()=="4"){
									var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "접촉화상";
									var backgroundcolor = "style='background:rgba(255,115,207,1)'";
								}else if(snapshot.child('burnstyle').val()=="5"){
									var nodeimg = "<img src='../img/burnkind/juon/juon"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "저온화상";
									var backgroundcolor = "style='background:rgba(115,210,255,1)'";
								}else if(snapshot.child('burnstyle').val()=="6"){
									var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "화학화상";
									var backgroundcolor = "style='background:rgba(123,77,255,1)'";
								}else if(snapshot.child('burnstyle').val()=="7"){
									var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "증기화상";
									var backgroundcolor = "style='background:rgba(0,231,141,1)'";
								}else if(snapshot.child('burnstyle').val()=="8"){
									var nodeimg = "<img src='../img/burnkind/machar/machar"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "마찰화상";
									var backgroundcolor = "style='background:rgba(197,115,255,1)'";
								}else if(snapshot.child('burnstyle').val()=="9"){
									var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "햇빛화상";
									var backgroundcolor = "style='background:rgba(210,233,17,1)'";
								}else if(snapshot.child('burnstyle').val()=="10"){
									var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snapshot.child('burndetail').val()+".png' width='100%'>";
									var nodetext = "흡입화상";
									var backgroundcolor = "style='background:rgba(0,136,161,1)'";
								}
								
								var Fulldate = snapshot.child('date').val();
								var YearVal =  Fulldate.substr(0,4);
								var MonthVal = Fulldate.substr(4,2);
								var DayVal = Fulldate.substr(6,2);	
								var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
								
							var DivStruct=
								"<a href='#' onclick='AnswerDetail(\""+snapshot.key+"\")'>"
							  	+"<ul class='answer_date_ul' "+backgroundcolor+">"
								+"	<li><div class='answer_answer'><img src='../img/questionmark.png' width='100%'></div><div class='answer_date'>"+nodetext+"</div></li>"
								+"</ul>"
								+"<ul class='answer_title_ul1' "+backgroundcolor+">"
								+"	<li><div class='answer_title'>"+snapshot.child('title').val()+"</div></li>"
								+"	<li><div class='answer_kinds'>"+snapshot.child('nickname').val()+"&nbsp;&nbsp;|&nbsp;&nbsp;"+DesignDate+"</div></li>"
								+"</ul>"
								+"<ul class='answer_img_ul'>"
								+"	<li><div class='answer_img'>"+nodeimg+"</div></li>"
								+"</ul>"
								+"<ul><li>　</li></ul>"
								+"</a>"	

								
								document.getElementById('answerpage_box_ul'+AnswerViewMoreClick).insertAdjacentHTML('afterBegin', DivStruct);	
				})
			}); 
		}
	})
				
}

function AnswerDetail(qnum)
{	
	$.mobile.pageContainer.pagecontainer( "change", "answerdetail.html", { transition:"slide", num:qnum } )
}