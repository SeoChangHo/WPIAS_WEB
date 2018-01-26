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




