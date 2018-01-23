$(document).on("pagebeforechange", function (e, data) {
    if (data.toPage[0].id == "myanswerdetailpage") {
    	$("#header_detail").css("height", (window.innerHeight*0.074).toFixed(0));
        var num = data.options.num;
        $("#index_Anum").html(num)
        
        MyDetail_ArticleViewer(num);
        
    }
});


function MyDetail_ArticleViewer(num)
{	
	FirebaseCall();
	var db=firebase.database().ref("Question/"+num)
	
	
	db.once('value', function(snap)
			{
				if(snap.child("burnstyle").val()=="1"){
					var nodeimg = "<img src='../img/burnkind/yultang/yultang"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "열탕화상";
					var backgroundcolor = "style='background:rgba(255,115,115,1)'";
				}else if(snap.child("burnstyle").val()=="2"){
					var nodeimg = "<img src='../img/burnkind/hwayum/hwayum"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "화염화상";
					var backgroundcolor = "style='background:rgba(255,184,115,1)'";
				}else if(snap.child("burnstyle").val()=="3"){
					var nodeimg = "<img src='../img/burnkind/jungi/jungi"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "전기화상";
					var backgroundcolor = "style='background:rgba(29,29,192,1)'";
				}else if(snap.child("burnstyle").val()=="4"){
					var nodeimg = "<img src='../img/burnkind/jubchok/jubchok"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "접촉화상";
					var backgroundcolor = "style='background:rgba(255,115,207,1)'";
				}else if(snap.child("burnstyle").val()=="5"){
					var nodeimg = "<img src='../img/burnkind/juon/juon"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "저온화상";
					var backgroundcolor = "style='background:rgba(115,210,255,1)'";
				}else if(snap.child("burnstyle").val()=="6"){
					var nodeimg = "<img src='../img/burnkind/hwahag/hwahag"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "화학화상";
					var backgroundcolor = "style='background:rgba(123,77,255,1)'";
				}else if(snap.child("burnstyle").val()=="7"){
					var nodeimg = "<img src='../img/burnkind/junggi/junggi"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "증기화상";
					var backgroundcolor = "style='background:rgba(0,231,141,1)'";
				}else if(snap.child("burnstyle").val()=="8"){
					var nodeimg = "<img src='../img/burnkind/machar/machar"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "마찰화상";
					var backgroundcolor = "style='background:rgba(197,115,255,1)'";
				}else if(snap.child("burnstyle").val()=="9"){
					var nodeimg = "<img src='../img/burnkind/hatbit/hatbit"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "햇빛화상";
					var backgroundcolor = "style='background:rgba(210,233,17,1)'";
				}else if(snap.child("burnstyle").val()=="10"){
					var nodeimg = "<img src='../img/burnkind/heubib/heubib"+snap.child("burndetail").val()+".png' width='100%'>";
					var nodetext = "흡입화상";
					var backgroundcolor = "style='background:rgba(0,136,161,1)'";
				}
				  
				if(snap.child("scarstyle").val()=="burn"){
					var scartext = "상처";
				}else{
					var scartext = "흉터";
				}
				
				if(snap.child("gender").val()=="male"){
					var genderimg = "<img src='../img/question/male.png' width='100%'>";
				}else{
					var genderimg = "<img src='../img/question/female.png' width='100%'>";
				}
				
				const burndb = firebase.database().ref("Burnarea/"+snap.child("bodystyle").val());
				var bodyarea = "";
				var bodyimg = "<img src='../img/body/bodyicon/"+snap.child("bodystyle").val()+".jpg' width='100%'>";
				
				burndb.once('value', function(shotshot){
					
					bodyarea = shotshot.child(snap.child("bodydetail").val()).val();
					
					$("#myanswerDetailTitle").html(snap.child("title").val());
					$("#myanswerDetailDate").html(snap.child("timestyle").val());					//성별, 나이
					$("#myanswerDetailAge_img").html(genderimg);
					$("#myanswerDetailAge").html(snap.child("age").val());
					//신체부위
					$("#myanswerDetailArea_img").html(bodyimg);
					$("#myanswerDetailArea").html(bodyarea);
					//화상부위
					$("#myanswerDetailburn_img").html(nodeimg);
					$("#myanswerDetailburn").html(nodetext+"("+scartext+")");

					
					 
					const casedb = firebase.database().ref("Case/"+num).orderByChild('visible').equalTo('true');
					casedb.once('value', function(casesnap)
							{				
								var total = casesnap.numChildren();
								console.log("CaseTotal: "+total);
								casesnap.forEach(function(casesnapshot)
										{
											var SeqFulldate = snap.key.split("_")
											
											var SeqYearVal = SeqFulldate[0].substr(0,4);
											var SeqMonthVal = SeqFulldate[0].substr(4,2);
											var SeqDayVal = SeqFulldate[0].substr(6,2);									
											var MathDate = SeqYearVal+"-"+SeqMonthVal+"-"+SeqDayVal;
											var Fulldate = casesnapshot.child('date').val();									
											var YearVal =  Fulldate.substr(0,4);
											var MonthVal = Fulldate.substr(4,2);
											var DayVal = Fulldate.substr(6,2);	
											var DesignDate = YearVal+"년 "+MonthVal+"월 "+DayVal+"일";							
											var CaseMathDate = YearVal+"-"+MonthVal+"-"+DayVal;								
											
//											CasedescArr[RowCount][ColCount]=num;0
//				
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('imgurl1').val();1
//											
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('imgurl2').val()2
//											
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('picturecount').val()3
//											
//											CasedescArr[RowCount][ColCount] = casesnapshot.key4
//		
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('contents').val()5
//											
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('status').val()6
//		
//											CasedescArr[RowCount][ColCount] = casesnapshot.child('visible').val()7
//											
//											CasedescArr[RowCount][ColCount] = (Number(dateDiff(CaseMathDate, MathDate))+1);8
//											
//											CasedescArr[RowCount][ColCount] = DesignDate9
//											
//											CasedescArr[RowCount][ColCount] = Fulldate10
											
											if(casesnapshot.child('status').val()=="Q"){
									 			var complete = "<div class='myanswer_case_wait_text' >답변대기</div>";
										 	}else{
										 		var complete = "<div class='myanswer_case_delete_text' >답변완료</div>";
										 	}
											
										    var DivStruct=
											    	"<div class='myanswer_case_design1'></div>"
											    	+"<div class='myanswer_case_design2'><img src='../img/dot.png' width='100%'></div>"
											    	+"<div class='myanswer_case_design3'>"+ DesignDate+"</div>"
											    	+ "<div class='myanswer_case_div' onclick=PageAnswerCaseDetail('"+num+"','"+casesnapshot.key+"')>"
													+"	<ul >"
													+"		<li>"
													+"			<div class='myanswer_case_img'> <img  width='100%' src="+casesnapshot.child('imgurl1').val()+"></div>"
													+"		</li>"
													+"		<li>"
													+complete
													+"			<div class='myanswer_case_date'>"+(Number(dateDiff(CaseMathDate, MathDate))+1)+"일 차</div>"
													+"			<div class='myanswer_case_contents'>"+casesnapshot.child('contents').val()+"</div>"
													+"	 	</li>"
													+" </ul>"
												    +"</div>";
										    
										    document.getElementById('myanswerDetailContents').insertAdjacentHTML('afterBegin',DivStruct);
										})
							})			
				})
			})
}


function PageAnswerCaseDetail(num, casenum)
{
		 $.mobile.pageContainer.pagecontainer( "change", "myanswercasedetail.html", { transition:"slide", num:num, casenum:casenum} )
}


function btnTopBackToMYAnswer() 
{
	$.mobile.pageContainer.pagecontainer( "change", "myanswer.html", { transition:"slide", reverse: true} )
}


