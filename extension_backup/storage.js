$("#get").on("click", function(){
	current_selector=4;

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


