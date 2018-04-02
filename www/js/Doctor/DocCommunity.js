var bodydetail, bodystyle, burndetail, burnstyle, age, gender, genderdoc;
var piccount;
var advicecount;
var myadvicecount;
var adviceviewmoreclick;
var myadviceviewmoreclick
var myAnswerviewmoreclick;
var UploadCount;

var MyOpenList=[];
var AllOpenList=[];


$(document).on("pagebeforechange", function (e, data) {
		
	if (data.toPage[0].id == "DocCommunitypage")
	{
		myAnswerviewmoreclick=0;
		piccount=0;
		UploadCount=0;
		advicecount=0;
		adviceviewmoreclick=0;
		myadviceviewmoreclick=0;
		myadvicecount=0;
		$('.owl-carousel').owlCarousel({
		    loop:false,
		    margin:10,
		    nav:true,
		    items:1
		});
		LoadMyAnswerList();
		LoadAdvice();
		MYLoadAdvice();
		GetGenderDoc();
	}
})

$(document).on('pageshow', '#DocCommunitypage', function(event, data){
	ShowGIF("../img/giphy.gif");
	$('.owl-carousel').on('changed.owl.carousel', function(property){
		var current = property.item.index;
		console.log(current);
		
		if(current==0){

			ShutdownMyReple();
			AllOpenList = new Array();
			$("#staticpage1").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("html, body").animate({ scrollTop: "0" }, 0);
			pageNum = 1;
		}else if(current==1)
		{
			ShutdownAllReple();
			MyOpenList = new Array();
			$("#staticpage2").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage3").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("html, body").animate({ scrollTop: "0" }, 0);

			pageNum = 2;
		}
		else if(current==2)
		{
			MyOpenList = new Array();
			AllOpenList = new Array();
			ShutdownMyReple();
			ShutdownAllReple();
			

			$("#staticpage3").css({"color":"rgb(43, 117, 188)", "text-shadow":"none","background":"white","font-weight":"bold","border-bottom":"4px solid #2f459a"});
			$("#staticpage1").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("#staticpage2").css({"color":"gray", "text-shadow":"none","background":"white","border-bottom":"4px solid white"});
			$("html, body").animate({ scrollTop: "0" }, 0);

			pageNum = 3;
		}
	})
	
	setTimeout(function(){
		HideGIF();
		$("#communitymain").css("visibility","visible");
	}, 1000)
	
});

function GetGenderDoc()
{
	var getuid = $('#index_uid').html();
	
	var genderDB = firebase.database().ref('User/'+getuid)
	genderDB.once('value', function(snap)
			{
				genderdoc = snap.child('gender').val();
			})
}

function LoadMyAnswerList()
{
	FirebaseCall();
	var uid = $('#index_uid').html();
	const MyAnswerDB = firebase.database().ref('Question').orderByChild('answerdoc').equalTo(uid)
	
	MyAnswerDB.once('value', function(totalsnap)
			{	
		var totalcount = 	totalsnap.numChildren();
		console.log("total: "+totalcount);
			
			MyAnswerDB.limitToLast(8).once('value', function(snap)
					{							
						snap.forEach(function(snapshot)
								{
							UploadCount++;
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
							
							
							var PicListStruct ="<ul onclick='ShowAdvicePicList(\""+snapshot.key+"\")'>"
							+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
							+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
							+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()+"</div></li>"
							+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
							+"	<li class='myanswerpage_li4'></li>"
							+"</ul>";
							
							document.getElementById('AdviceMyAnswerList').insertAdjacentHTML('afterBegin',PicListStruct)
							
					})
					if(UploadCount<totalcount)
						{
							NeedViewMore(UploadCount+8);
						}
				})
			})

}

function NeedViewMore(getCount)
{
	$('#MyAnswerListMore').show();
	$('#MyAnswerListMore').attr('onclick', "MyAnswerListMoreClick("+getCount+")");
	
}

function MyAnswerListMoreClick(getCount)
{
	myAnswerviewmoreclick++;
	$('#MyAnswerListMore').hide();
	
	var moreDivStruct = "<div id='AdviceMyAnswerMoreList"+myAnswerviewmoreclick+"'></div>"
	document.getElementById('AdviceMyAnswerList').insertAdjacentHTML('beforeEnd',moreDivStruct)
	var resetcount=0;
	var uid = $('#index_uid').html();
	const MyAnswerDB = firebase.database().ref('Question').orderByChild('answerdoc').equalTo(uid)
	
	MyAnswerDB.once('value', function(totalsnap)
			{	
		var totalcount = 	totalsnap.numChildren();
		console.log("total: "+totalcount);
			
			MyAnswerDB.limitToLast(getCount).once('value', function(snap)
					{							
						snap.forEach(function(snapshot)
								{
							UploadCount++;
							resetcount++;
							if(UploadCount>totalcount)
								{
								console.log("return true!!");
								return true;
								}

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
							
							
							var PicListStruct ="<ul onclick='ShowAdvicePicList(\""+snapshot.key+"\")'>"
							+"	<li class='myanswerpage_li1'><div class='myanswerpage_img'>"+nodeimg+"</div></li>"
							+"	<li class='myanswerpage_li2'><div class='myanswerpage_new'>"+nodetext+"</div><div class='myanswerpage_date'>"+DesignDate+"</div>"
							+"		  <div class='myanswerpage_main'>"+snapshot.child('title').val()+"</div></li>"
							+"	<li class='myanswerpage_li3'><div class='myanswerpage_writer'>"+snapshot.child('nickname').val()+"</div></li>"
							+"	<li class='myanswerpage_li4'></li>"
							+"</ul>";
							
							document.getElementById('AdviceMyAnswerMoreList'+myAnswerviewmoreclick).insertAdjacentHTML('afterBegin',PicListStruct)
							
							if(resetcount==5)
							{
									return true;
							}
					})
					if(UploadCount<totalcount)
						{
							console.log("UploadCount: "+UploadCount);
							console.log("totalcount: "+totalcount);
							NeedViewMore(UploadCount+5);
						}
				})
			})
}

function ShowAdvicePicList(key)
{
	
	var count = 0;
	var picnum=0;
	swal({
		title:"사진선택",
		html:"<img id='DivPickImg'></div><div id='DivImgContainer'></div>"
	}).then(function()
			{
				$('#AdviceMyAnswer').hide();
				$("#compare_photo_back").attr('src', $('#DivPickImg').attr('src'));
				$("#docAnswer_photo").attr('src', $('#DivPickImg').attr('src'));
				
				var getBurnInfoDB = firebase.database().ref('Question/'+seq);
				getBurnInfoDB.once('value', function(snap)
						{
							burnstyle=snap.child('burnstyle').val();
							burndetail=snap.child('burndetail').val();
							bodystyle=snap.child('bodystyle').val();
							bodydetail=snap.child('bodydetail').val();		
							age=snap.child('age').val();
							gender=snap.child('gender').val();
						})
						$("#DocCommunityTxtArea").show();
			});
	
	
	
	const MyPicDB = firebase.database().ref('Case/'+key).orderByChild('visible').equalTo("true")
	MyPicDB.once('value', function(childsnap)
			{
		piccount = 0;
		picnum = picnum+(childsnap.numChildren()*2)
		console.log("픽넘 : " + picnum);
				childsnap.forEach(function(childsnapshot)
						{
								piccount++;	
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+key+" id='GetImg"+piccount+"' onclick='swalDivClick(this.id)'>"
															  +  "<img width='100%' src="+childsnapshot.child('imgurl1').val()+">")
															  +"</div>";

								piccount++;
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+key+" id='GetImg"+piccount+"' onclick='swalDivClick(this.id)'>"
								  								+  "<img width='100%' src="+childsnapshot.child('imgurl2').val()+">")
								  								+"</div>";
								console.log("픽카운트 : " + piccount);
								if(piccount==picnum)
								{
									$("#DivPickImg").attr('src', childsnapshot.child('imgurl1').val());
									seq=key;
									src=childsnapshot.child('imgurl1').val();
								}
						})														
			})		
			
			
			
}



//내 답변목록 사진 가져오기
function btnGetMyAnswerPicClick()
{
	FirebaseCall();
	var uid = $('#index_uid').html();
	const MyAnswerDB = firebase.database().ref('Question').orderByChild('answerdoc').equalTo(uid);
	var count = 0;
	
	swal({
		title:"사진선택",
		html:"<img id='DivPickImg'></div><div id='DivImgContainer'></div>"
	}).then(function()
			{
				$("#compare_photo_back").attr('src', $('#DivPickImg').attr('src'));
				$("#docAnswer_photo").attr('src', $('#DivPickImg').attr('src'));
				
				var getBurnInfoDB = firebase.database().ref('Question/'+seq);
				getBurnInfoDB.once('value', function(snap)
						{
							burnstyle=snap.child('burnstyle').val();
							burndetail=snap.child('burndetail').val();
							bodystyle=snap.child('bodystyle').val();
							bodydetail=snap.child('bodydetail').val();
							age=snap.child('age').val();
							gender=snap.child('gender').val();
						})
						$("#DocCommunityTxtArea").show();
			})
	MyAnswerDB.once('value', function(snap)
			{
				snap.forEach(function(snapshot)
						{
								count++;
								console.log(snapshot.child('title').val());
								GetMyAnswerSnapKey(snapshot.key, count);
						})
			})
}


function GetMyAnswerSnapKey(key, count)
{
	console.log(count+"번: "+key);
	var picnum=0;
	
	const MyPicDB = firebase.database().ref('Case/'+key).orderByChild('visible').equalTo("true")
	MyPicDB.once('value', function(childsnap)
			{
		picnum = picnum+(childsnap.numChildren()*2)
		console.log("픽넘 : " + picnum);
				childsnap.forEach(function(childsnapshot)
						{
								piccount++;	
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+key+" id='GetImg"+piccount+"' onclick='swalDivClick(this.id)'>"
															  +  "<img width='100%' src="+childsnapshot.child('imgurl1').val()+">")
															  +"</div>";

								piccount++;
								document.getElementById('DivImgContainer').insertAdjacentHTML('afterBegin', "<div data-seq="+key+" id='GetImg"+piccount+"' onclick='swalDivClick(this.id)'>"
								  								+  "<img width='100%' src="+childsnapshot.child('imgurl2').val()+">")
								  								+"</div>";
								if(piccount==picnum)
								{
									$("#DivPickImg").attr('src', childsnapshot.child('imgurl1').val());
									seq=key;
									src=childsnapshot.child('imgurl1').val();
								}
						})														
			})		
}

//자문 올리기 버튼 클릭
function btnInsertCommunityClick()
{
	var user = firebase.auth().currentUser
	
	var uid = $("#index_uid").html();
	var now = new Date();
	var nickname = user.displayName;

	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();
	var milsec = now.getMilliseconds().toString();

	var date = year+"-"+(month[1]? month:'0'+month[0])+"-"+(day[1]? day:'0'+day[0])
	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+"_"+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0])+"_"+milsec;

	
	var src = $('#docAnswer_photo').attr('src');
	var contents= $('#txtDocCommunity').val().replace(/\n/g, '<br>');
	var AdviceDB = firebase.database().ref('Advice/'+Fulldate+"_"+uid);
	
	AdviceDB.set({
		uid:uid,
		bodydetail:bodydetail,
		bodystyle:bodystyle,
		burndetail:burndetail,
		burnstyle:burnstyle,
		age:age,
		gender:gender,
		genderdoc:genderdoc,
		imgurl:src,
		contents:contents,
		advicecount:0,
		year:year,
		nickname:nickname,
		month:(month[1]? month:'0'+month[0]),
		day:(day[1]? day:'0'+day[0]),
		time:(hour[1]? hour:'0'+hour[0])+":"+(min[1]? min:'0'+min[0])
	}).then(function()
			{
				swal({
					type:'success',
					title:'성공',
					text:'자문이 성공적으로 등록되었습니다.'
				}).then(function()
						{
							btnCancelCommunityClick();
						})
			})
}


function btnCancelCommunityClick()
{
	$('#AdviceMyAnswer').show();
	$('#docAnswer_photo').attr('src', "");
	$('#DocCommunityTxtArea').hide();
	$('#txtDocCommunity').val("");
}


//모든 자문 보기
function LoadAdvice()
{
	 
	var AdviceListDB = firebase.database().ref('Advice')
	AdviceListDB.off('child_added');
	AdviceListDB.once('value', function(countsnap)
			{
			if(countsnap.numChildren()>5)
				{
					$('#AllAdviceViewMore').show();
				}
			AdviceListDB.limitToLast(5).on('child_added', function(snap)
					{					
							var bodyname = body(snap.child("bodystyle").val(), snap.child("bodydetail").val()); 
				
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
							
							if(snap.child("gender").val()=="male"){
								var genderimg = "<img src='../img/question/male.png' width='100%'>";
							}else{
								var genderimg = "<img src='../img/question/female.png' width='100%'>";
							}
							
							if(snap.child("genderdoc").val()=="male"){
								var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
							}else{
								var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
							}
							var bodyimg = "<img src='../img/body/bodyicon/"+snap.child("bodystyle").val()+".jpg' width='100%'>";
							
							advicecount++;
							var DivStruct = "<div class='DivStruct' id='"+snap.key+"'>"
															+"<div class='community_writer'>"
															+"<div class='community_profile'>"+profileimg+"</div>"
															+"<div class='community_nickname'>"+snap.child('nickname').val()+"</div>"
															+"<div class='community_time'>"+snap.child('time').val()+"<br>"+snap.child('year').val()+"-"+snap.child('month').val()+"-"+snap.child('day').val()+"</div>"
															+"</div>"
															+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snap.child('imgurl').val()+"')>"
															+"<img src="+snap.child('imgurl').val()+">"
															+"</div>"
															+"<div class='communitydetailinfo'>"
															+"<div class='community_detail'>환자정보</div>"
															+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snap.child('age').val()+"</div></div>"
															+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
															+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
															+"</div>"
															+"<div class='communitycontents'>"+snap.child('contents').val()+"</div>"
															+"<div id='repleCount"+advicecount+"' class='community_reple_all' onclick=ShowReple('"+snap.key+"','"+advicecount+"')>"
																+"<div id=reple_"+snap.key+" class='community_reple'>댓글:"+snap.child('advicecount').val()+"개</div>"
														    +"</div>"
														    +"<div id=display_"+snap.key+" style='display:none'>"
														    		+"<div id='RepleArea"+advicecount+"'>"
														    		+"</div>"
														    		+"<div class='RepleInsertArea'>"
													    			+"<textarea id='txt_"+snap.key+"' class='community_textarea'></textarea>"
													    			+"<button id='btn_"+snap.key+"' onclick=RepleInsertClick('"+snap.key+"')>등록</button>"
													    			+"</div>"
														    +"</div>"
														+"</div>"			
							document.getElementById('AdviceList').insertAdjacentHTML('afterBegin',DivStruct)	
					})
			})
			
			AdviceListDB.on('child_changed', function(snap)
					{
						const changeRepleCount = document.getElementById('reple_'+snap.key);
						if(changeRepleCount!=null)
							{
							changeRepleCount.innerText = "댓글:"+snap.child('advicecount').val()+"개";
							}
					})
					

}

//나의 자문 더보기 클릭
function MyAdviceViewMoreClick()
{
	$('#MyAdviceViewMore').hide();
	myadviceviewmoreclick++;
	document.getElementById('MyAdviceMore').insertAdjacentHTML('beforeEnd', "<div id='myadviceviewmorediv"+myadviceviewmoreclick+"'></div>");
	
	var uid = $('#index_uid').html();
	var mycountFive = 0;
	
	var AdviceTotalCountDB = firebase.database().ref('Advice').orderByChild('uid').equalTo(uid);
	
	AdviceTotalCountDB.once('value', function(countsnap)
			{
				var mytotalcount = countsnap.numChildren()
				console.log("토탈:" +mytotalcount);
				console.log("현재:" +advicecount);
				
				if(mytotalcount-myadvicecount-5>0)//이거말고도 불러올 것이 더 있을 때
				{
				console.log("불러올거더 있음");
				$('#MyAdviceViewMore').show();
				AdviceTotalCountDB.limitToLast(advicecount+5).once('value', function(snap)
						{
							console.log("total: "+snap.numChildren());
									snap.forEach(function(snapshot)
											{
										var bodyname = body(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
										
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
										
										if(snapshot.child("gender").val()=="male"){
											var genderimg = "<img src='../img/question/male.png' width='100%'>";
										}else{
											var genderimg = "<img src='../img/question/female.png' width='100%'>";
										}
										
										if(snapshot.child("genderdoc").val()=="male"){
											var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
										}else{
											var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
										}
										
										
										var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
										
										
										mycountFive++;
										myadvicecount++;
										var DivStruct = "<div class='DivStruct' id='"+snapshot.key+"'>"
										+"<div class='community_writer'>"
										+"<div class='community_profile'>"+profileimg+"</div>"
										+"<div class='community_nickname'>"+snapshot.child('nickname').val()+"</div>"
										+"<div class='community_time'>"+snapshot.child('time').val()+"<br>"+snapshot.child('year').val()+"-"+snapshot.child('month').val()+"-"+snapshot.child('day').val()+"</div>"
										+"</div>"
										+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snapshot.child('imgurl').val()+"')>"
											+"<img src="+snapshot.child('imgurl').val()+">"
										+"</div>"
										+"<div class='communitydetailinfo'>"
										+"<div class='community_detail'>환자정보</div>"
										+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snapshot.child('age').val()+"</div></div>"
										+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
										+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
										+"</div>"
										+"<div class='communitycontents'>"+snapshot.child('contents').val()+"</div>"
										+"<div id='my_repleCount"+myadvicecount+"' class='community_reple_all'>"
											+"<div id=my_reple_"+snapshot.key+" class='community_reple' onclick=MyShowReple('"+snapshot.key+"','"+myadvicecount+"')>댓글:"+snapshot.child('advicecount').val()+"개</div>"
											+"<div id='community_deleteadvice' onclick='DeleteAdvice(\""+snapshot.key+"\")'><img src='../img/question/trash.png'></div>"
									    +"</div>"
									    +"<div id=my_"+snapshot.key+" style='display:none'>"
									    		+"<div id='my_RepleArea"+myadvicecount+"'>"
									    		+"</div>"
									    		+"<div class='RepleInsertArea'>"
								    			+"<textarea id='my_txt_"+snapshot.key+"' class='community_textarea'></textarea>"
								    			+"<button id='btn_"+snapshot.key+"' onclick=MyRepleInsertClick('"+snapshot.key+"')>등록</button>"
								    			+"</div>"
									    +"</div>"
									+"</div>";
										document.getElementById("myadviceviewmorediv"+myadviceviewmoreclick).insertAdjacentHTML('afterBegin',DivStruct);
										
											if(mycountFive==5)
												{
													console.log('countFive: '+mycountFive)
													return true;
												}

											})
								})
							}						
							else//이거만 불러오고 더이상 불러올 것이 없을 때
							{
								console.log("불러올거 이제 더 없음");

								var PlusVal = 5+(mytotalcount-myadvicecount-5)
								console.log(PlusVal);
								
								if(PlusVal>0)
									{
										AdviceTotalCountDB.limitToFirst(PlusVal).once('value', function(snap)
												{
													snap.forEach(function(snapshot)
															{
																var bodyname = body(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
														
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
																
																if(snapshot.child("gender").val()=="male"){
																	var genderimg = "<img src='../img/question/male.png' width='100%'>";
																}else{
																	var genderimg = "<img src='../img/question/female.png' width='100%'>";
																}
																
																if(snapshot.child("genderdoc").val()=="male"){
																	var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
																}else{
																	var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
																}
																
																var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
														
																myadvicecount++;
																var DivStruct = "<div class='DivStruct' id='"+snapshot.key+"'>"
																+"<div class='community_writer'>"
																+"<div class='community_profile'>"+profileimg+"</div>"
																+"<div class='community_nickname'>"+snapshot.child('nickname').val()+"</div>"
																+"<div class='community_time'>"+snapshot.child('time').val()+"<br>"+snapshot.child('year').val()+"-"+snapshot.child('month').val()+"-"+snapshot.child('day').val()+"</div>"
																+"</div>"
																+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snapshot.child('imgurl').val()+"')>"
																	+"<img src="+snapshot.child('imgurl').val()+">"
																+"</div>"
																+"<div class='communitydetailinfo'>"
																+"<div class='community_detail'>환자정보</div>"
																+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snapshot.child('age').val()+"</div></div>"
																+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
																+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
																+"</div>"
																+"<div class='communitycontents'>"+snapshot.child('contents').val()+"</div>"
																+"<div id='my_repleCount"+myadvicecount+"' class='community_reple_all'>"
																	+"<div id=my_reple_"+snapshot.key+" class='community_reple' onclick=MyShowReple('"+snapshot.key+"','"+myadvicecount+"')>댓글:"+snapshot.child('advicecount').val()+"개</div>"
																	+"<div id='community_deleteadvice' onclick='DeleteAdvice(\""+snapshot.key+"\")'><img src='../img/question/trash.png'></div>"
															    +"</div>"
															    +"<div id=my_"+snapshot.key+" style='display:none'>"
															    		+"<div id='my_RepleArea"+myadvicecount+"'>"
															    		+"</div>"
															    		+"<div class='RepleInsertArea'>"
														    			+"<textarea id='my_txt_"+snapshot.key+"' class='community_textarea'></textarea>"
														    			+"<button id='btn_"+snapshot.key+"' onclick=MyRepleInsertClick('"+snapshot.key+"')>등록</button>"
														    			+"</div>"
															    +"</div>"
															+"</div>";
																document.getElementById("myadviceviewmorediv"+myadviceviewmoreclick).insertAdjacentHTML('afterBegin',DivStruct);
															})
												})
									}
								document.getElementById('MyAdviceList').insertAdjacentHTML('beforeEnd',"<div id='community_not_text'>더 이상 불러올 질문이 없습니다.</div>");
							}
						
	
			})
	
			
			AdviceTotalCountDB.on('child_changed', function(snap)
					{
						const MYchangeRepleCount = document.getElementById('my_reple_'+snap.key);
						if(MYchangeRepleCount!=null)
							{
							console.log('my_reple_'+snap.key);
							console.log('댓글갯수: '+snap.child('advicecount').val()+"개")
							MYchangeRepleCount.innerText = "댓글:"+snap.child('advicecount').val()+"개";
							}
					})

					

}

//내가 작성한 자문 보기
function MYLoadAdvice()
{
	const MYAdviceListDB = firebase.database().ref('Advice').orderByChild('uid').equalTo($('#index_uid').html());
	MYAdviceListDB.off('child_added');
	MYAdviceListDB.once('value', function(totalsnap)
			{
			var mytotalcount = totalsnap.numChildren();
			console.log("myAdviceTotal: "+mytotalcount);
			if(mytotalcount>5)//더 부를 목록이 있다
				{
					$('#MyAdviceViewMore').show();
				}
			MYAdviceListDB.limitToLast(5).on('child_added', function(snap)
					{
						var bodyname = body(snap.child("bodystyle").val(), snap.child("bodydetail").val()); 
						
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
						
						if(snap.child("gender").val()=="male"){
							var genderimg = "<img src='../img/question/male.png' width='100%'>";
						}else{
							var genderimg = "<img src='../img/question/female.png' width='100%'>";
						}
						
						if(snap.child("genderdoc").val()=="male"){
							var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
						}else{
							var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
						}
						var bodyimg = "<img src='../img/body/bodyicon/"+snap.child("bodystyle").val()+".jpg' width='100%'>";
					
						myadvicecount++;
						var DivStruct = "<div class='DivStruct' id='"+snap.key+"'>"
														+"<div class='community_writer'>"
														+"<div class='community_profile'>"+profileimg+"</div>"
														+"<div class='community_nickname'>"+snap.child('nickname').val()+"</div>"
														+"<div class='community_time'>"+snap.child('time').val()+"<br>"+snap.child('year').val()+"-"+snap.child('month').val()+"-"+snap.child('day').val()+"</div>"
														+"</div>"
														+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snap.child('imgurl').val()+"')>"
															+"<img src="+snap.child('imgurl').val()+">"
														+"</div>"
														+"<div class='communitydetailinfo'>"
														+"<div class='community_detail'>환자정보</div>"
														+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snap.child('age').val()+"</div></div>"
														+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
														+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
														+"</div>"
														+"<div class='communitycontents'>"+snap.child('contents').val()+"</div>"
														+"<div id='my_repleCount"+myadvicecount+"' class='community_reple_all'>"
															+"<div id=my_reple_"+snap.key+" class='community_reple' onclick=MyShowReple('"+snap.key+"','"+myadvicecount+"')>댓글:"+snap.child('advicecount').val()+"개</div>"
															+"<div id='community_deleteadvice' onclick='DeleteAdvice(\""+snap.key+"\")'><img src='../img/question/trash.png'></div>"
													    +"</div>"
													    +"<div id='my_"+snap.key+"' style='display:none'>"
													    		+"<div id='my_RepleArea"+myadvicecount+"'>"
													    		+"</div>"
													    		+"<div class='RepleInsertArea'>"
												    			+"<textarea id='my_txt_"+snap.key+"' class='community_textarea'></textarea>"
												    			+"<button id='btn_"+snap.key+"' onclick=MyRepleInsertClick('"+snap.key+"')>등록</button>"
												    			+"</div>"
													    +"</div>"
													+"</div>"			
						document.getElementById('MyAdviceList').insertAdjacentHTML('afterBegin',DivStruct)
					})
			})

			MYAdviceListDB.on('child_changed', function(snap)
					{
						const mychangeRepleCount = document.getElementById('my_reple_'+snap.key);
						if(mychangeRepleCount!=null)
							{
							mychangeRepleCount.innerText = "댓글:"+snap.child('advicecount').val()+"개";
							}
					})
					
			MYAdviceListDB.on('child_removed', function(snap)
			{
				console.log("스냅킥다무 : " + snap.key);
				var removekey = snap.key;
				$("div#"+removekey+".DivStruct").hide();
			})
}


function AllAdviceViewMoreClick()
{
	adviceviewmoreclick++;
	document.getElementById('AdviceMore').insertAdjacentHTML('beforeEnd', "<div id='adviceviewmorediv"+adviceviewmoreclick+"'></div>");
	
	
	var countFive = 0;
	
	AdviceTotalCountDB = firebase.database().ref('Advice');
	
	AdviceTotalCountDB.once('value', function(countsnap)
			{
				var totalcount = countsnap.numChildren()
				console.log("토탈:" +totalcount);
				console.log("현재:" +advicecount);
				
				if(totalcount-advicecount-5>0)//이거말고도 불러올 것이 더 있을 때
				{
				console.log("불러올거더 있음");
				AdviceTotalCountDB.limitToLast(advicecount+5).once('value', function(snap)
						{
							console.log("total: "+snap.numChildren());
									snap.forEach(function(snapshot)
											{
										var bodyname = body(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
										
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
										
										if(snapshot.child("gender").val()=="male"){
											var genderimg = "<img src='../img/question/male.png' width='100%'>";
											var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
										}else{
											var genderimg = "<img src='../img/question/female.png' width='100%'>";
											var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
										}
										
										var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
										
										
										countFive++;
										advicecount++;
										var DivStruct = "<div class='DivStruct' id='"+snapshot.key+"'>"
																		+"<div class='community_writer'>"
																		+"<div class='community_profile'>"+profileimg+"</div>"
																		+"<div class='community_nickname'>"+snapshot.child('nickname').val()+"</div>"
																		+"<div class='community_time'>"+snapshot.child('time').val()+"<br>"+snapshot.child('year').val()+"-"+snapshot.child('month').val()+"-"+snapshot.child('day').val()+"</div>"
																		+"</div>"
																		+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snapshot.child('imgurl').val()+"')>"
																			+"<img src="+snapshot.child('imgurl').val()+">"
																		+"</div>"
																		+"<div class='communitydetailinfo'>"
																		+"<div class='community_detail'>환자정보</div>"
																		+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snapshot.child('age').val()+"</div></div>"
																		+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
																		+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
																		+"</div>"
																		+"<div class='communitycontents'>"+snapshot.child('contents').val()+"</div>"
																		+"<div id='repleCount"+advicecount+"' class='community_reple_all' onclick=ShowReple('"+snapshot.key+"','"+advicecount+"')>"
																			+"<div id=reple_"+snapshot.key+" class='community_reple'>댓글:"+snapshot.child('advicecount').val()+"개</div>"
																	    +"</div>"
																	    +"<div id=display_"+snapshot.key+" style='display:none'>"
																	    		+"<div id='RepleArea"+advicecount+"'>"
																	    		+"</div>"
																	    		+"<div class='RepleInsertArea'>"
																    			+"<textarea id='txt_"+snapshot.key+"' class='community_textarea'></textarea>"
																    			+"<button id='btn_"+snapshot.key+"' onclick=RepleInsertClick('"+snapshot.key+"')>등록</button>"
																    			+"</div>"
																	    +"</div>"
																	+"</div>"			
																	document.getElementById("adviceviewmorediv"+adviceviewmoreclick).insertAdjacentHTML('afterBegin',DivStruct);
										
											if(countFive==5)
												{
													console.log('countFive: '+countFive)
													return true;
												}

											})
								})
							}						
							else//이거만 불러오고 더이상 불러올 것이 없을 때
							{
								console.log("불러올거 이제 더 없음");
								$('#AllAdviceViewMore').hide();
								var PlusVal = 5+(totalcount-advicecount-5)
								console.log(PlusVal);
								
								if(PlusVal>0)
									{
										const AdviceViewmoreLastDB = firebase.database().ref('Advice').limitToFirst(PlusVal);
										AdviceViewmoreLastDB.once('value', function(snap)
												{
													snap.forEach(function(snapshot)
															{
																var bodyname = body(snapshot.child("bodystyle").val(), snapshot.child("bodydetail").val()); 
														
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
																
																if(snapshot.child("gender").val()=="male"){
																	var genderimg = "<img src='../img/question/male.png' width='100%'>";
																	var profileimg = "<img src='../img/profile/doctor_male.png' width='100%'>";
																}else{
																	var genderimg = "<img src='../img/question/female.png' width='100%'>";
																	var profileimg = "<img src='../img/profile/doctor_female.png' width='100%'>";
																}
																var bodyimg = "<img src='../img/body/bodyicon/"+snapshot.child("bodystyle").val()+".jpg' width='100%'>";
														
																advicecount++;
																var DivStruct = "<div class='DivStruct' id='"+snapshot.key+"'>"
																								+"<div class='community_writer'>"
																								+"<div class='community_profile'>"+profileimg+"</div>"
																								+"<div class='community_nickname'>"+snapshot.child('nickname').val()+"</div>"
																								+"<div class='community_time'>"+snapshot.child('time').val()+"<br>"+snapshot.child('year').val()+"-"+snapshot.child('month').val()+"-"+snapshot.child('day').val()+"</div>"
																								+"</div>"
																								+"<div class='DivImgArea' onclick=ShowAdviceImg('"+snapshot.child('imgurl').val()+"')>"
																									+"<img src="+snapshot.child('imgurl').val()+">"
																								+"</div>"
																								+"<div class='communitydetailinfo'>"
																								+"<div class='community_detail'>환자정보</div>"
																								+"<div class='community_detail1'><div class='community_datail_img'>"+genderimg+"</div><div class='community_datail_text'>"+snapshot.child('age').val()+"</div></div>"
																								+"<div class='community_detail2'><div class='community_datail_img'>"+nodeimg+"</div><div class='community_datail_text'>"+nodetext+"</div></div>"
																								+"<div class='community_detail3'><div class='community_datail_img1'>"+bodyimg+"</div><div class='community_datail_text'>"+bodyname+"</div></div>"
																								+"</div>"
																								+"<div class='communitycontents'>"+snapshot.child('contents').val()+"</div>"
																								+"<div id='repleCount"+advicecount+"' class='community_reple_all' onclick=ShowReple('"+snapshot.key+"','"+advicecount+"')>"
																									+"<div id=reple_"+snapshot.key+" class='community_reple'>댓글:"+snapshot.child('advicecount').val()+"개</div>"
																							    +"</div>"
																							    +"<div id=display_"+snapshot.key+" style='display:none'>"
																							    		+"<div id='RepleArea"+advicecount+"'>"
																							    		+"</div>"
																							    		+"<div class='RepleInsertArea'>"
																						    			+"<textarea id='txt_"+snapshot.key+"' class='community_textarea'></textarea>"
																						    			+"<button id='btn_"+snapshot.key+"' onclick=RepleInsertClick('"+snapshot.key+"')>등록</button>"
																						    			+"</div>"
																							    +"</div>"
																							+"</div>";
																document.getElementById("adviceviewmorediv"+adviceviewmoreclick).insertAdjacentHTML('afterBegin',DivStruct);
															})
												})
									}
								document.getElementById('AdviceList').insertAdjacentHTML('beforeEnd',"<div id='community_not_text'>더 이상 불러올 질문이 없습니다.</div>");
							}
						
	
			})
	
			
			AdviceTotalCountDB.on('child_changed', function(snap)
					{
						const changeRepleCount = document.getElementById('reple_'+snap.key);
						changeRepleCount.innerText = "댓글:"+snap.child('advicecount').val()+"개";
					})
					

}



//사진 클릭시 Swal로 확대해서 보기
function ShowAdviceImg(src)
{
	swal({
		  imageUrl: src,
		  imageWidth: window.innerWidth*0.85,
		  imageHeight: window.innerWidth*0.85,
		  animation: false
		})
}

//댓글창 열기
function ShowReple(key, count)
{
	
	var ArrLength = AllOpenList.length;
	console.log("길이: "+Number(AllOpenList.length));

	AllOpenList[ArrLength] = new Array();
	AllOpenList[ArrLength][0] =key;
	AllOpenList[ArrLength][1] = count;
	
	
	
	var Splitkey  = key.split('_');
	$('#RepleArea'+count).html("");
	var writer = Splitkey[3];
	console.log('writer: '+writer);
	$("#display_"+key).show();
	$('#repleCount'+count).attr('onclick', "HideReple('"+key+"','"+count+"')")
	
	LoadRepleDB = firebase.database().ref('AdviceReple/'+key);
	LoadRepleDB.off('child_added');
	LoadRepleDB.on('child_added', function(snap)
			{	
				var email = snap.child('email').val()
				var id = email.split('@');

				var GetId = id[0];
		
				for(var i=3; i<id[0].length; i++)
				{
				var GetId = GetId.replaceAt(i,"*");
				}
				
	    			var replaceEmail = GetId+"@"+id[1];
	    			
					//자문 작성자가 댓글을 달았을 때
					if(snap.child('uid').val()==writer)
						{
							var SumID = "<div class='reple_nickname' style='color:#2f459a;'>"+snap.child('nickname').val()+"</div><div class='reple_email'>("+replaceEmail+")</div>";
						}
					else
						{
							var SumID = "<div class='reple_nickname'>"+snap.child('nickname').val()+"</div><div class='reple_email'>("+replaceEmail+")</div>";
						}
				var RepleStruct = "<div id='RepleChild_"+snap.key+"' class='reple_collection'><div class='reple_name'>"+SumID+"</div><div class='reple_contents'>"+snap.child('reple').val()+"</div></div>"
				document.getElementById('RepleArea'+count).insertAdjacentHTML('beforeEnd',RepleStruct)	

				//본인이 작성한 댓글 일 때 삭제버튼 만들기
				if(snap.child('uid').val()==$('#index_uid').html())
					{
						var DeleteStruct="<div onclick = DeleteReple('"+key+"','"+snap.key+"') class='reple_delete'>삭제</div>";
						document.getElementById('RepleChild_'+snap.key).insertAdjacentHTML('beforeEnd',DeleteStruct)
					}
			
			})
			
			
			LoadRepleDB.on('child_removed', function(snap)
			{
				const RemoveRepleDIV = document.getElementById('RepleChild_'+snap.key);
				RemoveRepleDIV.innerText = "";
			})
}


//나의 자문 댓글창 열기
function MyShowReple(key, count)
{
	console.log("MyShowReple");
	var MyArrLength = MyOpenList.length;
	console.log("길이: "+Number(MyOpenList.length));

	MyOpenList[MyArrLength] = new Array();
	MyOpenList[MyArrLength][0] =key;
	MyOpenList[MyArrLength][1] = count;
	
	
	var Splitkey  = key.split('_');
	$('#my_RepleArea'+count).html("");
	var writer = Splitkey[3];
	console.log('writer: '+writer);
	$("#my_"+key).show();
	$('#my_reple_'+key).attr('onclick', "MyHideReple('"+key+"','"+count+"')")
	
	MyLoadRepleDB = firebase.database().ref('AdviceReple/'+key);
	MyLoadRepleDB.off('child_added');
	MyLoadRepleDB.on('child_added', function(snap)
			{
		
				var email = snap.child('email').val()
				var id = email.split('@');
		
		
				var GetId = id[0];
		
				for(var i=3; i<id[0].length; i++)
				{
				var GetId = GetId.replaceAt(i,"*");
				}
				
	    			var replaceEmail = GetId+"@"+id[1];
	    			
					//자문 작성자가 댓글을 달았을 때
					if(snap.child('uid').val()==writer)
					{
						var SumID = "<div class='reple_nickname' style='color:#2f459a;'>"+snap.child('nickname').val()+"</div><div class='reple_email'>("+replaceEmail+")</div>";
					}
					else
					{
						var SumID = "<div class='reple_nickname'>"+snap.child('nickname').val()+"</div><div class='reple_email'>("+replaceEmail+")</div>";
					}
					

				
				var MyRepleStruct = "<div id='my_RepleChild_"+snap.key+"' class='reple_collection'><div class='reple_name'>"+SumID+"</div><div class='reple_contents'>"+snap.child('reple').val()+"</div></div>"
				document.getElementById('my_RepleArea'+count).insertAdjacentHTML('beforeEnd',MyRepleStruct)
				
				

				//본인이 작성한 댓글 일 때 삭제버튼 만들기
				if(snap.child('uid').val()==$('#index_uid').html())
					{
						var DeleteStruct="<div onclick = DeleteReple('"+key+"','"+snap.key+"') class='reple_delete' >삭제</div>";
						document.getElementById('my_RepleChild_'+snap.key).insertAdjacentHTML('beforeEnd',DeleteStruct)
					}
			
			})
			
			
			MyLoadRepleDB.on('child_removed', function(snap)
			{
				const myRemoveRepleDIV = document.getElementById('my_RepleChild_'+snap.key);
				myRemoveRepleDIV.innerText = "";
			})
}


//댓글창 닫기
function HideReple(key, count)
{
	$('#RepleArea'+count).html("");
	$("#display_"+key).hide();
	$('#repleCount'+count).attr('onclick', " ShowReple('"+key+"','"+count+"')");
}

//댓글창 닫기
function MyHideReple(key, count)
{
	console.log("MyHideReple");
	$('#my_RepleArea'+count).html("");
	$("#my_"+key).hide();
	$('#my_reple_'+key).attr('onclick', " MyShowReple('"+key+"','"+count+"')");
}


function DisconnectAllReple()
{
	var DisconnectDB = firebase.database().ref('Advice');
	DisconnectDB.off('child_added');
	DisconnectDB.off('child_changed');
	DisconnectDB.off('child_removed');
	
	if(AllOpenList.length>0)
		{
			for(var i=0; i<AllOpenList.length; i++)
			{
				ChildAddedOff_Reple(AllOpenList[i][0]);
			}
		}
} 

function DisconnectMyReple()
{
	var DisconnectDB = firebase.database().ref('Advice').orderByChild('uid').equalTo($('#index_uid').html());
	DisconnectDB.off('child_added');
	DisconnectDB.off('child_changed');
	DisconnectDB.off('child_removed');
	
	var DisconnectDB = firebase.database().ref('Advice');
	if(MyOpenList.length>0)
	{
			for(var i=0; i<MyOpenList.length; i++)
			{
				ChildAddedOff_MyReple(MyOpenList[i][0]);
			}
	}
}



//열었던 모든 자문보기 댓글 창 Child_Added 종료
function ChildAddedOff_Reple(key)
{
	var OffEventDB = firebase.database().ref('AdviceReple/'+key);
	OffEventDB.off('child_added');
	OffEventDB.off('child_changed');
	OffEventDB.off('child_removed');
}

//열었던 나의 자문보기 댓글 창 Child_Added 종료
function ChildAddedOff_MyReple(key)
{
	var OffEventDB = firebase.database().ref('AdviceReple/'+key);
	OffEventDB.off('child_added');
	OffEventDB.off('child_changed');
	OffEventDB.off('child_removed');
}


//댓글 입력
function RepleInsertClick(key)
{
	var user = firebase.auth().currentUser;
	
	
	var reple = $('#txt_'+key).val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
	$('#txt_'+key).val("");
	var nickname = user.displayName;
	var uid = $("#index_uid").html();
	var email =$("#index_email").html()
	var now = new Date();
	
	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();
	var milsec = now.getMilliseconds().toString();

	var date = year+"-"+(month[1]? month:'0'+month[0])+"-"+(day[1]? day:'0'+day[0])
	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+"_"+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0])+"_"+milsec;

	
	var RepleInsertDB = firebase.database().ref('AdviceReple/'+key+"/"+Fulldate+"_"+uid)
	RepleInsertDB.set({
		reple:reple,
		year:year,
		month:(month[1]? month:'0'+month[0]),
		day:(day[1]? day:'0'+day[0]),
		time:(hour[1]? hour:'0'+hour[0])+":"+(min[1]? min:'0'+min[0]),
		uid:uid,
		email:email,
		nickname:nickname
	}).then(function()
			{
				var countPlusDB = firebase.database().ref('Advice').child(key).child('advicecount')
				countPlusDB.transaction(function(snap)
						{
							return (snap || 0) + 1
						})
			})
	
	
}

function MyRepleInsertClick(key)
{
	var user = firebase.auth().currentUser;
	
	
	var reple = $('#my_txt_'+key).val().replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
	$('#my_txt_'+key).val("");
	var nickname = user.displayName;
	var uid = $("#index_uid").html();
	var email =$("#index_email").html()
	var now = new Date();
	
	
	var year = (now.getYear()+1900).toString(); 
	var month = (now.getMonth()+1).toString();
	var day = (now.getDate()).toString();
	var hour = now.getHours().toString();
	var min = now.getMinutes().toString();
	var sec = now.getSeconds().toString();
	var milsec = now.getMilliseconds().toString();

	var date = year+"-"+(month[1]? month:'0'+month[0])+"-"+(day[1]? day:'0'+day[0])
	var Fulldate = year+(month[1]? month:'0'+month[0])+(day[1]? day:'0'+day[0])+"_"+(hour[1]? hour:'0'+hour[0])+(min[1]? min:'0'+min[0])+(sec[1]? sec:'0'+sec[0])+"_"+milsec;

	
	var RepleInsertDB = firebase.database().ref('AdviceReple/'+key+"/"+Fulldate+"_"+uid)
	RepleInsertDB.set({
		reple:reple,
		year:year,
		month:(month[1]? month:'0'+month[0]),
		day:(day[1]? day:'0'+day[0]),
		time:(hour[1]? hour:'0'+hour[0])+":"+(min[1]? min:'0'+min[0]),
		uid:uid,
		email:email,
		nickname:nickname
	}).then(function()
			{
				var countPlusDB = firebase.database().ref('Advice').child(key).child('advicecount')
				countPlusDB.transaction(function(snap)
						{
							return (snap || 0) + 1
						})
			})
	
	
}


//본인댓글 삭제하기
function DeleteReple(key, snapkey)
{
	swal({
		  title: '삭제하시겠습니까?',
		  text: "삭제된 댓글은 복구할 수 없습니다!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '삭제',
		  cancelButtonText:'취소',
		  allowOutsideClick:false
		}).then(function(){	  
				var DeleteRepleDB = firebase.database().ref().child('AdviceReple/'+key+"/"+snapkey);
				DeleteRepleDB.remove().then(function()
						{
							var countPlusDB = firebase.database().ref('Advice').child(key).child('advicecount')
							countPlusDB.transaction(function(snap)
									{
										if(snap)
											{
											return snap - 1;
											}
									})								
									    swal(
											      '삭제완료!',
											      '회원님의 댓글이 삭제되었습니다.',
											      'success'
											    )
											$('#RepleChild_'+snapkey).hide();
											$('#my_RepleChild_'+snapkey).hide();
											
						})	  
		}, function (dismiss) {
			  if (dismiss === 'cancel')
			  {		   
			  }
			})
}

//본인 글 삭제하기
function DeleteAdvice(key)
{
	swal({
		  title: '삭제하시겠습니까?',
		  text: "삭제된 글은 복구할 수 없습니다!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '삭제',
		  cancelButtonText:'취소',
		  allowOutsideClick:false
		}).then(function(){	  
				var DeleteRepleDB = firebase.database().ref().child('Advice/'+key);
				DeleteRepleDB.remove().then(function()
						{
							var countPlusDB = firebase.database().ref().child('AdviceReple/'+key);
							countPlusDB.remove().then(function()
									{
										swal(
									      '삭제완료!',
									      '회원님의 글이 삭제되었습니다.',
									      'success'
									    )
									})								
						})	  
		}, function (dismiss) {
			  if (dismiss === 'cancel')
			  {		   
			  }
			})
}

function ShutdownAllReple()
{
	if(AllOpenList.length>0)
		{
			for(var i=0; i<AllOpenList.length; i++)
			{
				HideReple(AllOpenList[i][0], AllOpenList[i][1]);
			}
		}
}

function ShutdownMyReple()
{
	if(MyOpenList.length>0)
	{
			for(var i=0; i<MyOpenList.length; i++)
			{
				MyHideReple(MyOpenList[i][0], MyOpenList[i][1]);
			}
	}
}



function body(bodystyle, bodydetail){
	
	if(bodystyle=="1"){
		switch(bodydetail){
		case "1" : return "이마"; break;
		case "2" : return "눈"; break;
		case "3" : return "코"; break;
		case "4" : return "입"; break;
		case "5" : return "귀"; break;
		case "6" : return "볼"; break;
		case "7" : return "목"; break;
		case "8" : return "뒤통수"; break;
		case "9" : return "목덜미"; break;
		case "10" : return "기타"; break;
		}
	}else if(bodystyle=="2"){
		switch(bodydetail){
		case "1" : return "좌측 어깨"; break;
		case "2" : return "우측 어깨"; break;
		case "3" : return "양쪽 어깨"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="3"){
		switch(bodydetail){
		case "1" : return "좌측 가슴"; break;
		case "2" : return "우측 가슴"; break;
		case "3" : return "가슴 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="4"){
		switch(bodydetail){
		case "1" : return "좌측 등"; break;
		case "2" : return "우측 등"; break;
		case "3" : return "등 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="5"){
		switch(bodydetail){
		case "1" : return "좌측 배"; break;
		case "2" : return "우측 배"; break;
		case "3" : return "배 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="6"){
		switch(bodydetail){
		case "1" : return "좌측 허리"; break;
		case "2" : return "우측 허리"; break;
		case "3" : return "허리 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="7"){
		switch(bodydetail){
		case "1" : return "좌측 팔뚝"; break;
		case "2" : return "우측 팔뚝"; break;
		case "3" : return "팔뚝 전체"; break;
		case "4" : return "좌측 하박"; break;
		case "5" : return "우측 하박"; break;
		case "6" : return "하박 전체"; break;
		case "7" : return "기타"; break;
		}
	}else if(bodystyle=="8"){
		switch(bodydetail){
		case "1" : return "좌측 손바닥"; break;
		case "2" : return "우측 손바닥"; break;
		case "3" : return "양쪽 손바닥"; break;
		case "4" : return "좌측 손등"; break;
		case "5" : return "우측 손등"; break;
		case "6" : return "양쪽 손등"; break;
		case "7" : return "좌측 손가락"; break;
		case "8" : return "우측 손가락"; break;
		case "9" : return "양쪽 손가락"; break;
		case "10" : return "기타"; break;
		}
	}else if(bodystyle=="9"){
		switch(bodydetail){
		case "1" : return "음부"; break;
		case "2" : return "기타"; break;
		}
	}else if(bodystyle=="10"){
		switch(bodydetail){
		case "1" : return "좌측 엉덩이"; break;
		case "2" : return "우측 엉덩이"; break;
		case "3" : return "엉덩이 전체"; break;
		case "4" : return "기타"; break;
		}
	}else if(bodystyle=="11"){
		switch(bodydetail){
		case "1" : return "좌측 허벅지"; break;
		case "2" : return "우측 허벅지"; break;
		case "3" : return "양쪽 허벅지"; break;
		case "4" : return "좌측 종아리"; break;
		case "5" : return "우측 종아리"; break;
		case "6" : return "양쪽 종아리"; break;
		case "7" : return "기타"; break;
		}
	}else if(bodystyle=="12"){
		switch(bodydetail){
		case "1" : return "좌측 발등"; break;
		case "2" : return "우측 발등"; break;
		case "3" : return "양쪽 발등"; break;
		case "4" : return "좌측 발가락"; break;
		case "5" : return "우측 발가락"; break;
		case "6" : return "양쪽 발가락"; break;
		case "7" : return "좌측 발바닥"; break;
		case "8" : return "우측 발바닥"; break;
		case "9" : return "양쪽 발바닥"; break;
		case "10" : return "좌측 뒤끔치"; break;
		case "11" : return "우측 뒤끔치"; break;
		case "12" : return "양쪽 뒤끔치"; break;
		case "13" : return "기타"; break;
		}
	}else if(bodystyle=="13"){
		switch(bodydetail){
		case "1" : return "호흡기"; break;
		case "2" : return "기타"; break;
		}
	}
	
}

function DocCommunityBack()
{
	DisconnectAllReple();
	DisconnectMyReple();
	
	FirebaseCall();
	var useruid = $('#index_uid').html();
	
	const db = firebase.database().ref();
	const user = db.child('User').child(useruid);
	user.once('value', snap =>{
		if(snap.child('isDoctor').val()=="false"){
			
			$("#titlebackground1").css({"opacity":"0"});
			$("#titlebackground2").css({"opacity":"0"});
			$("#titlebackground3").css({"opacity":"0"});
			$("#titlebackground4").css({"opacity":"0"});
			
			$("#questionmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#myquestionmain").css({"display":"none"});
			$("#informationmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#comparemain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			
			$("#topback").css("display","none");
			$("#toptitle").css("display","none");
			$(".displaynone").css({"visibility":"visible"});
			$(".displaynone2").css({"visibility":"visible"});
			$(".displaynone").animate({"margin-top":"18%"}, 400);
			$(".displaynone2").animate({"margin-top":"0%"}, 400);
			
			setTimeout(function(){
				$.mobile.changePage("../User/MainPage.html", {transition:"none"});
			}, 400);
			 
		}else{
			
			$("#titlebackground1").css({"opacity":"0"});
			$("#titlebackground2").css({"opacity":"0"});
			$("#titlebackground3").css({"opacity":"0"});
			$("#titlebackground4").css({"opacity":"0"});
			
			$("#answermain").css({"display":"none"});
			$("#myanswermain").css({"display":"none"});
			$("#informationmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#statisticsmain").css({"opacity":"0", "visibility":"hidden", "transition":"visibility 0s, opacity 0.5s linear"});
			$("#communitymain").css({"visibility":"hidden"});
			
			$("#topback").css("display","none");
			$("#toptitle").css("display","none");
			$(".displaynone").css({"visibility":"visible"});
			$(".displaynone2").css({"visibility":"visible"});
			$(".displaynone").animate({"margin-top":"18%"}, 400);
			$(".displaynone2").animate({"margin-top":"0%"}, 400);
			
			setTimeout(function(){
				$.mobile.changePage("../Doctor/MainPageDoc.html", {transition:"none"});
			}, 400)
		}
	})	
}

