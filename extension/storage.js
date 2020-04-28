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

$("#save").on("click", function(){
	document.removeEventListener("mouseover", check_1, false);
	document.removeEventListener("keydown", show, false);
	current_selector=5;

	$("#insert_title").attr("value", document.title)
	$("#insert_targetUrl").attr("value", window.location.href)

	w_height = window.innerHeight;
  	w_width = $(document).width();

	$("#ui_html3").css("visibility", "hidden");
	$("#ui_html2").css("visibility", "hidden");
	$("#ui_html4").css("visibility", "hidden");
	$("#ui_html6").css("visibility", "visible");

	$("#select_opt").css("visibility", "visible");
	$("#select_opt").css("top", w_height/2-150);
	$("#select_opt").css("left", w_width/2-300);

	$("#editor").css("visibility", "hidden");

})

function check_login(){
	$.ajax({
		method : "POST",
		url : "https://pushit.live/api/v1_extension/check.php",
		dataType:'JSON',
		success : function(data) { 
			if(data.msg=="success"){
				post_templates()
			}
			else{
				var conf=confirm("PUSHT 로그인이 되어있지 않습니다. \n 로그인 페이지로 이동하시겠습니까 ?");
				if(conf){
					window.location.href="https://pushit.live/";
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
	dic["tag1"]=document.getElementById("insert_tag1").value;
	dic["tag2"]=document.getElementById("insert_tag2").value;
	dic["template"]=final_tem;
	dic["template_data"]=template_data;

    chrome.storage.local.get(['template_backup'], function(result) {
        for(var i in result.template_backup)
        {
            var template_backup=result.template_backup[i];

            $.ajax({
                method : "POST",
                url : "http://pushit.live/api/v1_extension/set_rss.php",
                data : dic,
                success : function(data) { 
                    document.getElementById("text-holder").innerHTML=document.getElementById("text-holder").innerHTML+"post success <br><br>";
                    chrome.storage.local.set({template_backup: ""})
                },
                error : function(e) {
                    document.getElementById("text-holder").innerHTML=document.getElementById("text-holder").innerHTML+"post error <br><br>";
                    chrome.storage.local.set({template_backup: ""})
                }
            });
        }           
    });
}

