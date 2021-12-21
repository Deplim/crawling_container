document.getElementById("save").addEventListener("click", save_click, false);
function save_click(){
	document.removeEventListener("mouseover", check_1, false);
	document.removeEventListener("keydown", show, true);
	current_selector=5;

	$("#insert_title").attr("value", document.title)
	$("#insert_targetUrl").attr("value", window.location.href)

	w_height = window.innerHeight;
  	w_width = window.innerWidth;

	$("#ui_html3").css("visibility", "hidden");
	$("#ui_html2").css("visibility", "hidden");
	$("#ui_html4").css("visibility", "hidden");
	$("#ui_html6").css("visibility", "visible");

	$("#select_opt").css("visibility", "visible");
	$("#select_opt").css("top", w_height/2-150);
	$("#select_opt").css("left", w_width/2-300);

	$("#editor").css("visibility", "hidden");

}

function check_login(){
	console.log("check login")
	$.ajax({
		method : "POST",
		url : "https://pushit.live/api/v1_extension/check.php",
		dataType:'JSON',
		success : function(data) { 
			if(data.msg=="success"){
				console.log("login 확인함")
				post_templates()
			}
			else{
				var conf=confirm("PUSHT 로그인이 되어있지 않습니다. \n 로그인 페이지를 열겠습니까 ?");
				if(conf){
					window.open("https://pushit.live/");
				}
			}
		},
		error : function(e) {
			console.log("check 얻어오지 못함")
		}
	});	
}

function post_templates(){
	var final_tem=template_data["string"]+template_data["closing_string"];
	var dic={}
	dic["title"]=document.getElementById("insert_title").value;
	dic["content"]=document.getElementById("insert_content").value;
	dic["targetUrl"]=document.getElementById("insert_targetUrl").value;
	dic["tag"]=document.getElementById("insert_tag1").value;
	dic["template"]=final_tem;
	//dic["template_data"]=template_data;

	console.log(dic)

	$("#wrap-loading").css("top", w_height/2-125);
	$("#wrap-loading").css("left", w_width/2-125);
	$('#wrap-loading').removeClass('display-none');

	$("#editor").css("visibility", "hidden");
	chrome.storage.local.set({On_Off: "Off"})
	$mask.css("visibility", "hidden");
	for(var i=0; i<sub_masks_count; i++){
		$(sub_masks[i]).css("visibility", "hidden")
	}
	
	document.removeEventListener("mouseover", check_1, false);
	document.removeEventListener("keydown", show, true);
			

    $.ajax({
        method : "POST",
        url : "https://pushit.live/api/v1_extension/set_rss.php",
        data : dic,
        dataType:'JSON',
        success : function(data) { 
            alert("post success")
        },
        error : function(e) {
            alert("post error")
        },
	    complete : function(){
	        console.log("post complete")

	        $('#wrap-loading').addClass('display-none');

	        $("#editor").css("visibility", "visible");
	    	chrome.storage.local.set({On_Off: "On"})
	    	$mask.css("visibility", "visible");
			for(var i=0; i<sub_masks_count; i++){
				$(sub_masks[i]).css("visibility", "visible")
			}

	    	document.addEventListener("mouseover", check_1, false);
	    	document.addEventListener("keydown", show, true);
	    }
    });  
}

/*
$("#get").on("click", function(){
	document.removeEventListener("mouseover", check_1, false);
	document.removeEventListener("keydown", show, false);
	current_selector=4;


	chrome.storage.local.get(['template_backup'], function(result) {
		if(result.template_backup!=""){
			$("#storage_list_tbody").html("");
			for(var i in result.template_backup)
			{
				var template_backup=result.template_backup[i];
				var temp_html="<tr><td>&nbsp"+template_backup["title"]+"</td><td><textarea class='ta' readonly>"+template_backup["template"]+"</textarea></td></tr>";
				$("#storage_list_tbody").append(temp_html)

				var temp_target=document.getElementsByClassName("ta")[i]
				temp_target.onclick=function(){
					console.log("hi")
					console.log(result.template_backup[i])
					$("#preview").html(temp_target.innerHTML);
					template_backup=result.template_backup[i]["template_data"]
				}
			}
		}
	});

	w_height = window.innerHeight;
  	w_width = $(document).width();

	$("#ui_html3").css("visibility", "hidden");
	$("#ui_html2").css("visibility", "hidden");
	$("#ui_html4").css("visibility", "visible");
	$("#ui_html6").css("visibility", "hidden");

	$("#select_opt").css("visibility", "visible");
	$("#select_opt").css("top", w_height/2-150);
	$("#select_opt").css("left", w_width/2-300);

	$("#editor").css("visibility", "hidden");
})
*/
