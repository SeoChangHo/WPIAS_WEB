var ViewCount;
var btnViewmoreClickCount;

$(document).on("pagebeforechange", function (e, data) {
    
	if (data.toPage[0].id == "myquestionpage") {
    	$("#header").css("height", (window.innerHeight*0.074).toFixed(0));

    	FirebaseCall();
    	ViewCount=0;
    	btnViewmoreClickCount=0;
    	getMyQuestion();	  	
    }
	
	if (data.toPage[0].id == "homepage" && $.mobile.activePage[0].id=="myquestionpage") 
	{
		
		var uid = $("#index_uid").html();
		var dbRef = firebase.database().ref(); 
    		const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(uid);

	}
});



function getMyQuestion()
{
	var uid = $("#index_uid").html();
	
	console.log(uid);
	var dbRef = firebase.database().ref();
	const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(uid)
	var numchild = 0;
	FirebaseCall();

	myQuestion.once('value', function(totalsnap)
			{
		var totalcount= totalsnap.numChildren();
		myQuestion.limitToLast(2).once('value', function(snap)
				{
			if(snap.numChildren()==0)
				{
				$('#myquestionBtn').hide();
				var user = firebase.auth().currentUser;
				var uid = user.uid;
				var userName = user.displayName;
				const userDB = firebase.database().ref('User/'+uid);
				
				
				$("#myquestion_user_name").html(userName);
				userDB.once('value', function(usersnap){
					if(usersnap.child('gender').val()=="male"){
						$("#myquestion_user_img img").attr("src","../img/profile/male.png");
						$("#myquestion_user_etc").html("남성 | "+"질문수 : 0");
					}else{
						$("#myquestion_user_img img").attr("src","../img/profile/female.png");
						$("#myquestion_user_etc").html("여성 | "+"질문수 : 0");
					}
					
					$('#myquestionBox_notquestion').html('현재 작성된 질문이 없습니다.');
					
				})
				}
			else//질문이 하나라도 있을 때
				{
				
				var user = firebase.auth().currentUser;
				var uid = user.uid;
				var userName = user.displayName;
				const userDB = firebase.database().ref('User/'+uid);
				
				
				$("#myquestion_user_name").html(userName);
				userDB.once('value', function(usersnap){
					if(usersnap.child('gender').val()=="male"){
						$("#myquestion_user_img img").attr("src","../img/profile/male.png");
						$("#myquestion_user_etc").html("남성 | "+"질문수 : "+totalcount+"");
					}else{
						$("#myquestion_user_img img").attr("src","../img/profile/female.png");
						$("#myquestion_user_etc").html("여성 | "+"질문수 : "+totalcount+"");
					}
					
					
				})
				
				
				
					$('#myquestionBox_notquestion').hide();
					if(snap.numChildren()>2)
					{
						console.log("질문 갯수: "+snap.numChildren());
						$('#myquestionBtn').show();
					}
					
				
					var visibleCount=0;
					
					snap.forEach(function(snapshot)
					{				
						const casedb = firebase.database().ref("Case/"+snapshot.key).orderByChild('visible').equalTo('true').limitToLast(1);
						casedb.once('value', function(casesnap)
						{
							///////

								casesnap.forEach(function(casesnapshot)
										{
											ViewCount++;
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
											
					
											if(snapshot.child('prostatus').val()=="A")
												{						  
												  var DivStructure = "<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"A\")'>"
													+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
													+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
													+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
													+"	 </ul>"
													+"	 <ul class='myquestion_title_ul2'>"
													+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
													+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
													+"		</li>"
													+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
													+"	 </ul>"
											  		+"</div>";
											  	document.getElementById('myquestionBox').insertAdjacentHTML('afterBegin', DivStructure);	
												}
											else if(snapshot.child('prostatus').val()=="F")
											{
													  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"F\")'>"
														+"	  <ul class='myquestion_title_ul1' >"
														+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
														+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
														+"	 </ul>"
														+"	 <ul class='myquestion_title_ul2'>"
														+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
														+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
														+"		</li>"
														+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
														+"	 </ul>"
												  		+"</div>";
												  document.getElementById('myquestionBox').insertAdjacentHTML('afterBegin', DivStructure);	
												  			
											}
											else if(snapshot.child('prostatus').val()=="Q")
											{
													  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"Q\")'>"
														+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
														+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
														+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
														+"	 </ul>"
														+"	 <ul class='myquestion_title_ul2'>"
														+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
														+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
														+"		</li>"
														+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
														+"	 </ul>"
												  		+"</div>";
												  document.getElementById('myquestionBox').insertAdjacentHTML('afterBegin', DivStructure);	
											}
									})
								
							///////
								if(totalcount>2)
								{
									$('#myquestionBtn').show();
									$('#btnViewmore').attr('onclick', "btnViewmoreClick("+ViewCount+")")
								}
						})
					})			
				}
		})
	})
}

function btnViewmoreClick(getCount)
{
	$('#myquestionBtn').hide();
	console.log(getCount);
	btnViewmoreClickCount++;
	var resetcount=0;
	
	var moreDivStruct = "<div id='myquestionBoxList"+btnViewmoreClickCount+"'></div>"
	document.getElementById('myquestionBox').insertAdjacentHTML('beforeEnd',moreDivStruct)

	var uid = $("#index_uid").html();
	
	console.log(uid);
	var dbRef = firebase.database().ref();
	const myQuestion = dbRef.child("Question").orderByChild('uid').equalTo(uid)
	var numchild = 0;
	FirebaseCall();

	myQuestion.once('value', function(totalsnap)
			{
		var totalcount= totalsnap.numChildren();
		if(totalcount-ViewCount>=5) // 이거 부르고도 또 있을 때
			{
		myQuestion.limitToLast(getCount+5).once('value', function(snap)
				{	
					$('#myquestionBox_notquestion').hide();
					if(snap.numChildren()>2)
					{
						console.log("질문 갯수: "+snap.numChildren());
						$('#myquestionBtn').show();
					}	
					var visibleCount=0;				
					snap.forEach(function(snapshot)
					{			
						resetcount++;
						ViewCount++;
						console.log("title: "+snapshot.child('title').val());
						const casedb = firebase.database().ref("Case/"+snapshot.key).orderByChild('visible').equalTo('true').limitToLast(1);
						casedb.once('value', function(casesnap)
						{
								casesnap.forEach(function(casesnapshot)
										{
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
											
					
											if(snapshot.child('prostatus').val()=="A")
												{						  
												  var DivStructure = "<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"A\")'>"
													+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
													+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
													+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
													+"	 </ul>"
													+"	 <ul class='myquestion_title_ul2'>"
													+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
													+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
													+"		</li>"
													+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
													+"	 </ul>"
											  		+"</div>";
											  	document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
												}
											else if(snapshot.child('prostatus').val()=="F")
											{
													  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"F\")'>"
														+"	  <ul class='myquestion_title_ul1' >"
														+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
														+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
														+"	 </ul>"
														+"	 <ul class='myquestion_title_ul2'>"
														+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
														+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
														+"		</li>"
														+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
														+"	 </ul>"
												  		+"</div>";
												  document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
												  			
											}
											else if(snapshot.child('prostatus').val()=="Q")
											{
													  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"Q\")'>"
														+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
														+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
														+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
														+"	 </ul>"
														+"	 <ul class='myquestion_title_ul2'>"
														+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
														+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
														+"		</li>"
														+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
														+"	 </ul>"
												  		+"</div>";
												  document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
											}

									})
								
							///////
								if(totalcount>ViewCount)
								{
									$('#myquestionBtn').show();
									$('#btnViewmore').attr('onclick', "btnViewmoreClick("+ViewCount+")")
								}

						})
						if(resetcount==5)
						{
							console.log("return true!!");
							return true;
						}
					})			
				
		})
			}
		else//이걸 마지막으로 부를 게 없을 때
			{
				console.log("5개 미만 남았다 ")
				var LastCount= totalcount-ViewCount
				console.log(LastCount);
				
				myQuestion.limitToFirst(LastCount).once('value', function(snap)
						{
	
							var visibleCount=0;
							
							snap.forEach(function(snapshot)
							{			
								ViewCount++;
								const casedb = firebase.database().ref("Case/"+snapshot.key).orderByChild('visible').equalTo('true').limitToLast(1);
								casedb.once('value', function(casesnap)
								{
										casesnap.forEach(function(casesnapshot)
												{
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
													
							
													if(snapshot.child('prostatus').val()=="A")
														{						  
														  var DivStructure = "<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"A\")'>"
															+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
															+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
															+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
															+"	 </ul>"
															+"	 <ul class='myquestion_title_ul2'>"
															+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
															+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
															+"		</li>"
															+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
															+"	 </ul>"
													  		+"</div>";
													  	document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
														}
													else if(snapshot.child('prostatus').val()=="F")
													{
															  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"F\")'>"
																+"	  <ul class='myquestion_title_ul1' >"
																+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
																+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
																+"	 </ul>"
																+"	 <ul class='myquestion_title_ul2'>"
																+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
																+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
																+"		</li>"
																+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
																+"	 </ul>"
														  		+"</div>";
														  document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
														  			
													}
													else if(snapshot.child('prostatus').val()=="Q")
													{
															  var DivStructure ="<div class='myquestionbox_background' onclick='myquestionDetail(\""+snapshot.key+"\",\"Q\")'>"
																+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
																+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
																+"		<li><div class='myquestion_title'>"+snapshot.child('title').val()+"</div></li>"
																+"	 </ul>"
																+"	 <ul class='myquestion_title_ul2'>"
																+"	 	<li><div class='myquestion_title_img1'><img src='"+casesnapshot.child('imgurl1').val()+"' width='100%'></div>"
																+"			<div class='myquestion_title_img2'><img src='"+casesnapshot.child('imgurl2').val()+"' width='100%'></div>"
																+"		</li>"
																+"		<li><div class='myquestion_content'>"+casesnapshot.child('contents').val()+"</div></li>"
																+"	 </ul>"
														  		+"</div>";
														  document.getElementById('myquestionBoxList'+btnViewmoreClickCount).insertAdjacentHTML('afterBegin', DivStructure);	
													}
											})					
									///////
								})
							})			
						
				})
			}
	})

}

function myquestionDetail(QNum, bool)
{
	 $.mobile.pageContainer.pagecontainer( "change", "myquestionDetail.html", { transition:"slide", num:QNum, bool:bool } )
}


function Viewmore(getcount)
{
	var scroll = $(document).scrollTop()
	var btncount = getcount;
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var userName = user.displayName;
	const userDB = firebase.database().ref('User/'+uid);
	
	
	$("#myquestion_user_name").html(userName);
	userDB.once('value', function(snap){
		if(snap.child('gender').val()=="male"){
			$("#myquestion_user_img img").attr("src","../img/profile/male.png");
			$("#myquestion_user_etc").html("남성 | "+"질문수 : " + getcount);
		}else{
			$("#myquestion_user_img img").attr("src","../img/profile/female.png");
			$("#myquestion_user_etc").html("여성 | "+"질문수 : " + getcount);
		}
	})


	for(var i = getcount-1; i>getcount-3; i--)
	{
		btncount--;		
		if(i<0)
		{
			$('#myquestionBtn').hide();
			break;
		}
		if(snap.child('burnstyle').val()=="1"){
			var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "열탕화상";
			var backgroundcolor = "style='background:rgba(255,115,115,1)'";
		}else if(snap.child('burnstyle').val()=="2"){
			var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "화염화상";
			var backgroundcolor = "style='background:rgba(255,184,115,1)'";
		}else if(snap.child('burnstyle').val()=="3"){
			var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "전기화상";
			var backgroundcolor = "style='background:rgba(29,29,192,1)'";
		}else if(snap.child('burnstyle').val()=="4"){
			var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "접촉화상";
			var backgroundcolor = "style='background:rgba(255,115,207,1)'";
		}else if(snap.child('burnstyle').val()=="5"){
			var nodeimg = "<img src='../img/burnkind/juon/juon"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "저온화상";
			var backgroundcolor = "style='background:rgba(115,210,255,1)'";
		}else if(snap.child('burnstyle').val()=="6"){
			var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "화학화상";
			var backgroundcolor = "style='background:rgba(123,77,255,1)'";
		}else if(snap.child('burnstyle').val()=="7"){
			var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "증기화상";
			var backgroundcolor = "style='background:rgba(0,231,141,1)'";
		}else if(snap.child('burnstyle').val()=="8"){
			var nodeimg = "<img src='../img/burnkind/machar/machar"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "마찰화상";
			var backgroundcolor = "style='background:rgba(197,115,255,1)'";
		}else if(snap.child('burnstyle').val()=="9"){
			var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "햇빛화상";
			var backgroundcolor = "style='background:rgba(210,233,17,1)'";
		}else if(snap.child('burnstyle').val()=="10"){
			var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snap.child('burndetail').val()+".png' width='100%'>";
			var nodetext = "흡입화상";
			var backgroundcolor = "style='background:rgba(0,136,161,1)'";
		}
		
		var Fulldate = snap.child('date').val();
		var YearVal =  Fulldate.substr(0,4);
		var MonthVal = Fulldate.substr(4,2);
		var DayVal = Fulldate.substr(6,2);	
		var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";
		

		if(snap.child('prostatus').val()=="A")
			{
		  document.getElementById('myquestionBox').innerHTML+=
				"<div class='myquestionbox_background' onclick='myquestionDetail(\""+descArr[i][0]+"\",\"A\")'>"
				+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
				+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
				+"		<li><div class='myquestion_title'>"+descArr[i][1]+"</div></li>"
				+"	 </ul>"
				+"	 <ul class='myquestion_title_ul2'>"
				+"	 	<li><div class='myquestion_title_img1'><img src='"+descArr[i][10]+"' width='100%'></div>"
				+"			<div class='myquestion_title_img2'><img src='"+descArr[i][11]+"' width='100%'></div>"
				+"		</li>"
				+"		<li><div class='myquestion_content'>"+descArr[i][9]+"</div></li>"
				+"	 </ul>"
		  		+"</div>";
			
			}
		else if(snap.child('prostatus').val()=="F")
		{
			  document.getElementById('myquestionBox').innerHTML+=
					"<div class='myquestionbox_background' onclick='myquestionDetail(\""+descArr[i][0]+"\",\"F\")'>"
					+"	  <ul class='myquestion_title_ul1' >"
					+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
					+"		<li><div class='myquestion_title'>"+descArr[i][1]+"</div></li>"
					+"	 </ul>"
					+"	 <ul class='myquestion_title_ul2'>"
					+"	 	<li><div class='myquestion_title_img1'><img src='"+descArr[i][10]+"' width='100%'></div>"
					+"			<div class='myquestion_title_img2'><img src='"+descArr[i][11]+"' width='100%'></div>"
					+"		</li>"
					+"		<li><div class='myquestion_content'>"+descArr[i][9]+"</div></li>"
					+"	 </ul>"
			  		+"</div>";
			  			
		}
		else if(snap.child('prostatus').val()=="Q")
		{
			  document.getElementById('myquestionBox').innerHTML+=
					"<div class='myquestionbox_background' onclick='myquestionDetail(\""+descArr[i][0]+"\",\"Q\")'>"
					+"	  <ul class='myquestion_title_ul1' "+backgroundcolor+">"
					+"		<li><div class='myquestion_kinds'>"+nodetext+" | "+DesignDate+"</div></li>"
					+"		<li><div class='myquestion_title'>"+descArr[i][1]+"</div></li>"
					+"	 </ul>"
					+"	 <ul class='myquestion_title_ul2'>"
					+"	 	<li><div class='myquestion_title_img1'><img src='"+descArr[i][10]+"' width='100%'></div>"
					+"			<div class='myquestion_title_img2'><img src='"+descArr[i][11]+"' width='100%'></div>"
					+"		</li>"
					+"		<li><div class='myquestion_content'>"+descArr[i][9]+"</div></li>"
					+"	 </ul>"
			  		+"</div>";
		}
	}
	if(btncount==0)
	{
	$('#myquestionBtn').hide();
	}
	$('#btnViewmore').attr("onclick", 'Viewmore('+btncount+')')
	
	$(document).scrollTop(scroll);
}

