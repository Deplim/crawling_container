console.log("extension start!");

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("On Off switch");

    if(On_Off=="On"){
    	$("#editor").css("visibility", "hidden");
    	$mask.css("visibility", "hidden")
    	On_Off="Off";
    }
    else{
		$("#editor").css("visibility", "visible");
    	$mask.css("visibility", "visible")
    	On_Off="On";
    }

    data="ok"
    sendResponse({data: data, success: true});
});

var template_data={};
template_data['string']="";
template_data['stage']=0;
template_data['properties_index']=0;
template_data['item_selector']="";
template_data['closing_string']="\n\t\t]\n\t}\n}"

var On_Off="On"
var target;
var selector;
var height = window.innerHeight;
var $mask = $('<div id="screenshot_mask"></div>').css("border-width", "0 0 " + height + "px 0");
$("body").append($mask);

//$(document).on('click', function(e) { 
	//var top = window.pageYOffset + e.target.getBoundingClientRect().top;
	//data=document.querySelector(extract_css_selector(e.target));
//}); 

document.addEventListener("mouseover", check_1, false);
function check_1(event){
	target=event.target;
	drawing();
}

function drawing(){
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

document.addEventListener("keydown", show, false);
function show(event){
	console.log("버튼 입력")
	let key = event.keyCode;
	if(key==83){
		selector=extract_css_selector(target);
		console.log("target>>");
		console.log("element : " + target)
		console.log("selector : " + selector)
		console.log("querySelector : ");
		console.log(document.querySelector(selector));

		var height = window.innerHeight;
  		var width = $(document).width();
		if(template_data['stage']==0){
			current_selector=3;
			$("#ui_html3").css("visibility", "visible");
			$("#ui_html2").css("visibility", "hidden");
		}
		else{
			current_selector=2;
			$("#ui_html3").css("visibility", "hidden");
			$("#ui_html2").css("visibility", "visible");
		}  		
		$("#select_opt").css("visibility", "visible");
		$("#select_opt").css("top", height/2-100);
		$("#select_opt").css("left", width/2-300);

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
