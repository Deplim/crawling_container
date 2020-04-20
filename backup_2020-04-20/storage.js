$("#get").on("click", function(){
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


