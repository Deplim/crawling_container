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

var target;
var selector;
var w_height=window.innerHeight;
var w_width;
var $mask = $('<div id="screenshot_mask"></div>').css("border-width", "0 0 " + w_height + "px 0");
$("body").append($mask);

chrome.storage.local.get(['On_Off'], function(result) {
	if(!result.On_Off){
		chrome.storage.local.set({On_Off: "On"})
	}
	else if(result.On_Off=="On"){
		$("#editor").css("visibility", "visible");
    	$mask.css("visibility", "visible")

    	document.addEventListener("mouseover", check_1, false);
		document.addEventListener("keydown", show, false);
	}
	else if(result.On_Off="Off"){
		$("#editor").css("visibility", "hidden");
    	$mask.css("visibility", "hidden")
	}
})

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log(request.data)
	if(request.data=="On_Off"){
		chrome.storage.local.get(['On_Off'], function(result) {
			if(result.On_Off=="On"){
				$("#editor").css("visibility", "hidden");
		    	$mask.css("visibility", "hidden")
		    	chrome.storage.local.set({On_Off: "Off"})

		    	document.removeEventListener("mouseover", check_1, false);
		    	document.removeEventListener("keydown", show, false);
			}
			else if(result.On_Off="Off"){
				$("#editor").css("visibility", "visible");
		    	$mask.css("visibility", "visible")
		    	chrome.storage.local.set({On_Off: "On"})

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
	target=event.target;
	drawing();
}

function drawing(){
	console.log(target);
	var height = window.innerHeight;
  	var width = $(document).width();
	var startY= target.getBoundingClientRect().top;
	var startX= target.getBoundingClientRect().left;
	var x = startX+target.getBoundingClientRect().width;
    var y = startY+target.getBoundingClientRect().height;

	var top = startY;
	var right = width - x;
	var bottom = height - y;
	var left = startX;
	$mask.css("border-width", [top + 'px', right + 'px', bottom + 'px', left + 'px'].join(' '));
}

function show(event){
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
		console.log("hi");
		target=target.parentNode;
		drawing();
	}
	if(key==68){
		target=target.children[0];
		drawing();
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
