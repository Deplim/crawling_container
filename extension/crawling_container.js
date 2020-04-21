console.log("extension start!");

var template_data_list=Array();

var template_data={};
template_data['string']="[\n";
template_data['stage']=0;
template_data['properties_index']=0;
template_data['item_selector']="";
template_data['closing_string']=""
template_data_list.push(JSON.parse(JSON.stringify(template_data)));
template_data['closing_string']="\n\t\t]\n\t}\n}\n]"

var target=0;
var selector;
var w_height=window.innerHeight;
var w_width;
var $mask = $('<div id="main_mask"></div>');
var $mask2 = $('<div class="sub_mask"></div>');
var $mask3 = $('<div class="sub_mask"></div>');
$("body").append($mask);
$("body").append($mask2);
$("body").append($mask3);

chrome.storage.local.get(['On_Off'], function(result) {
	if(!result.On_Off){
		chrome.storage.local.set({On_Off: "On"})
	}
	else if(result.On_Off=="On"){
		$("#editor").css("visibility", "visible");
		$mask.css("visibility", "visible");
		$mask2.css("visibility", "visible");
		$mask3.css("visibility", "visible");

    	document.addEventListener("mouseover", check_1, false);
		document.addEventListener("keydown", show, false);
	}
	else if(result.On_Off="Off"){
		$("#editor").css("visibility", "hidden");
		$mask.css("visibility", "hidden");
		$mask2.css("visibility", "hidden");
		$mask3.css("visibility", "hidden");
	}
})

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log(request.data)
	if(request.data=="On_Off"){
		chrome.storage.local.get(['On_Off'], function(result) {
			if(result.On_Off=="On"){
				$("#editor").css("visibility", "hidden");
		    	chrome.storage.local.set({On_Off: "Off"})
				$mask.css("visibility", "hidden");
				$mask2.css("visibility", "hidden");
				$mask3.css("visibility", "hidden");
		    	
		    	document.removeEventListener("mouseover", check_1, false);
		    	document.removeEventListener("keydown", show, false);
			}
			else if(result.On_Off="Off"){
				$("#editor").css("visibility", "visible");
		    	chrome.storage.local.set({On_Off: "On"})
		    	$mask.css("visibility", "visible");
				$mask2.css("visibility", "visible");
				$mask3.css("visibility", "visible");

		    	document.addEventListener("mouseover", check_1, false);
		    	document.addEventListener("keydown", show, false);
			}
		})	
	}
	else if(request.data="go_login_page"){
		window.location.href="https://pushit.live/"
	}

    data="ok"
    sendResponse({data: data, success: true});
});
//$(document).on('click', function(e) { 
	//var top = window.pageYOffset + e.target.getBoundingClientRect().top;
	//data=document.querySelector(extract_css_selector(e.target));
//}); 




function check_1(event){
	if(event.target==editor || event.target.parentNode==editor || event.target==document.getElementById("main_mask")){
		return;
	}
	target=event.target;
	drawing();
}

function drawing(){
	matching_mask(target, $mask, 1);
	
	if(target.nextElementSibling){
		matching_mask(target.nextElementSibling, $mask2, 2);
		$mask2.css("visibility", "visible")
	}
	else{
		$mask2.css("visibility", "hidden")
	}

	if(target.nextElementSibling){
		if(target.nextElementSibling.nextElementSibling){
			matching_mask(target.nextElementSibling.nextElementSibling, $mask3, 3);
			$mask3.css("visibility", "visible")
		}
		else{
			$mask3.css("visibility", "hidden")
		}
	}
	else{
		$mask3.css("visibility", "hidden")
	}
	
}

function matching_mask(temp_target, temp_mask ,c){
	$(temp_mask).css("top", window.pageYOffset+temp_target.getBoundingClientRect().top)
	$(temp_mask).css("left", window.pageXOffset+temp_target.getBoundingClientRect().left)
	$(temp_mask).css("width", temp_target.getBoundingClientRect().width)
	$(temp_mask).css("height", temp_target.getBoundingClientRect().height)
}	

function show(event){
	document.removeEventListener("mouseover", check_1, false);
	document.removeEventListener("keydown", show, false);
	
	let key = event.keyCode;
	if(key==83){
		selector=extract_css_selector(target);
		console.log("\n\n"+"target>>");
		console.log("element : " + target)
		console.log("selector : " + selector)
		console.log("querySelector : ");
		console.log(document.querySelector(selector)+"\n\n");

		w_height = window.innerHeight;
  		w_width = $(document).width();
		if(template_data['stage']==0){
			current_selector=3;
			$("#ui_html3").css("visibility", "visible");
			$("#ui_html2").css("visibility", "hidden");
			$("#ui_html4").css("visibility", "hidden");
			$("#ui_html6").css("visibility", "hidden");
		}
		else{
			current_selector=2;
			$("#ui_html3").css("visibility", "hidden");
			$("#ui_html2").css("visibility", "visible");
			$("#ui_html4").css("visibility", "hidden");
			$("#ui_html6").css("visibility", "hidden");

			$('#select_attribute').html("<span>&nbsp Attribute</span><br>");
			var temp_att=Array();
			temp_att.push("text");
			for(var t=0; t<target.attributes.length; t++){
				temp_att.push(target.attributes[t]["name"]);
			}
			set_attribute_option(temp_att)
		}  		

		$("#select_opt").css("visibility", "visible");
		$("#select_opt").css("top", w_height/2-150);
		$("#select_opt").css("left", w_width/2-300);

		$("#editor").css("visibility", "hidden");
	}
	if(key==65){
		document.addEventListener("keydown", show, false);
		document.addEventListener("mouseover", check_1, false);
		if(target.parentNode && target.parentNode!=undefined){
			before_target=target;
			target=target.parentNode;
			drawing();
		}
	}
	if(key==68){
		document.addEventListener("keydown", show, false);
		document.addEventListener("mouseover", check_1, false);
		if(target.children[0] && target.children[0]!=undefined){
			before_target=target;
			target=target.children[0];
			drawing();
		}
	}
}

function extract_css_selector(el){
    if (!(el instanceof Element)) 
	    return;
	var path = [];
	while (el.nodeType === Node.ELEMENT_NODE) {
	    var selector = el.nodeName.toLowerCase();
	    if (el.id) {
	        selector += '#' + el.id;
	        path.unshift(selector);
	        break;
	    } else {
	        var sib = el, nth = 1;
	        while (sib = sib.previousElementSibling) {
	            nth++;
	        }
	        selector += ":nth-child("+nth+")";
	    }
	    path.unshift(selector);
	    el = el.parentNode;
	}
	return path.join(" > ");
}
