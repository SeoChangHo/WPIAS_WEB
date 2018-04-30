function FirebaseCall()
{
		var config = {
		    apiKey: "AIzaSyBb2ow8BTUYxjCttLa9ncSVe1tRh6WXkPU",
		    authDomain: "wpias-94d18.firebaseapp.com",
		    databaseURL: "https://wpias-94d18.firebaseio.com",
		    projectId: "wpias-94d18",
		    storageBucket: "wpias-94d18.appspot.com",
		    messagingSenderId: "97343186628"
		  };
	
		if (!firebase.apps.length)
		{                               
			firebase.initializeApp(config);
			console.log("Success Firebase Init!!");
			
		}
}

function GetFcmToken()
{
    try{
		if (typeof FCMPlugin != 'undefined') {//App에서 실행
        FCMPlugin.onTokenRefresh(function(token){
                             $("#indexPage").attr("data-token", token);
                             });
        
        FCMPlugin.getToken(function(token){
                           $("#indexPage").attr("data-token", token);
                           });    
		}
    }
    catch(e)
    {
        alert(e.message);
    }
}

function SaveToken(uid)
{
    FirebaseCall();
    
    var db=firebase.database().ref("User/"+uid);
    
    if($("#indexPage").data('token')!="")
    {
    db.update(
              {
              OS: device.platform,
              Token:$("#indexPage").data('token')
              })
    }
}

function SendMessageToTarget(getTarget, getMessage)
{
	var HeaderData = 
	{
		'Authorization':' key=AAAAFqobJsQ:APA91bEHj_c08w_2GrtOMFyOBwb6S6cUQx-K3E56VkoG4Tq6NBR48T64JFvQyMqczVbr6ZJjlMMNXEPQuu5Gb6XB6OYetxXxXS894Amv2j1CmsFFurVYp_T5CQjTTh9ofssUt9AHA7ju',
		'Content-Type':'application/json'
	};	
	
	var Data = JSON.stringify({
        "to": getTarget,
        "notification": {
          "title": "WPIAS",
          "body": getMessage
         }
      })

    $.ajax({
        type : 'POST',
        url : "https://fcm.googleapis.com/fcm/send",
        headers : HeaderData,
        contentType : 'application/json',
        data : Data,
        success : function(response) {
            console.log("Success: "+response);
        },
        error : function(xhr, status, error) {
            console.log("Fail:" +xhr.error);      
            console.log(error);
        }
    })
}


function SendMessageToTopic(getTopic, getMessage)
{
	var HeaderData = 
	{
		'Authorization':' key=AAAAFqobJsQ:APA91bEHj_c08w_2GrtOMFyOBwb6S6cUQx-K3E56VkoG4Tq6NBR48T64JFvQyMqczVbr6ZJjlMMNXEPQuu5Gb6XB6OYetxXxXS894Amv2j1CmsFFurVYp_T5CQjTTh9ofssUt9AHA7ju',
		'Content-Type':'application/json'
	};	
	
	var Data = JSON.stringify({
        "to": "/topics/"+getTopic,
        "notification": {
          "title": "WPIAS",
          "body": getMessage
         }
      })

    $.ajax({
        type : 'POST',
        url : "https://fcm.googleapis.com/fcm/send",
        headers : HeaderData,
        contentType : 'application/json',
        data : Data,
        success : function(response) {
            console.log("Success: "+response);
        },
        error : function(xhr, status, error) {
            console.log("Fail:" +xhr.error);      
            console.log(error);
        }
    })
}	


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = d.getMinutes(),
        sec = d.getSeconds();
    	

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;
    if (sec.length < 2) sec = '0' + sec;
    

    return [year, month, day, hour, min, sec].join('-');
}



function getDiffDatetime(getdate)

{

   var date = getdate.split('-')

   var year = date[0]

   var month = String(Number(date[1])-1)

   var day = date[2]

   var hour = date[3]

   var minute = date[4]

   var second = date[5]

   var d = new Date(year, month, day, hour, minute, second)

console.log(d)

   var mTime =  d.getTime();

   var now = new Date();



   var diff =  600+(parseInt((mTime-now.getTime())/1000)); //1000을 나눠 초단위로 환산

   console.log(diff);
   
   return printDiffTime(diff);

}


function printDiffTime(time)
{
	var min = String(parseInt(time/60))
	var sec = String(parseInt(time%60))
	
	if (min.length < 2) min = '0' + min;
	if (sec.length < 2) sec = '0' + sec;
     
	var diffTime = min+":"+sec;
	
	return diffTime;
}






