String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function select_opt_close(e){
	if(current_selector==2 || current_selector==3){
		var temp_string="";
		var temp_selector;

		if(template_data['stage']==0){
			template_data_list.push(JSON.parse(JSON.stringify(template_data)))

			if(target_item_type=="list"){
				if(selector.lastIndexOf("nth-child")!=-1){
					temp_selector=selector.replaceAt(selector.lastIndexOf("nth-child")+10,"n")
				}
				else{
					temp_selector=selector
				}
				temp_string=temp_string+'{\n\t"item": {\n\t\t"selector": "'+temp_selector+'",\n\t\t"item-type": "'+target_item_type+'",\n\t\t"properties": [\n';
			}
			else{
				temp_string=temp_string+'{\n\t"item": {\n\t\t"selector": "'+selector+'",\n\t\t"item-type": "'+target_item_type+'",\n\t\t"properties": [\n';
			}

			template_data['item_selector']=selector;
			template_data['closing_string']="\n\t\t]\n\t}\n}\n]"
		}
		else{
			// setting property
			if($("#insert_property").val()){
				target_property=$("#insert_property").val()
			}
			if(target_property==undefined || target_attribute==undefined || target_attribute==null || target_data_type==undefined){
				console.log(target_property + "\n" + target_attribute + "\n" + target_data_type)
				$("#announcement").html(" * 지정되지 않은 요소가 있습니다. * ")	
				return
			}
			else{
				$("#announcement").html("")	
				template_data_list.push(JSON.parse(JSON.stringify(template_data)))
			}

			//setting attribute
			target_attribute = $("#insert_attribute").val()
			if(target_attribute=="text") {
				temp_attribute=""
			}
			else {
				temp_attribute=',\n\t\t\t\t"attr": '+'"'+target_attribute+'"'
			}

			//setting data_type
			if(target_data_type=="date"){
				temp_format=',\n\t\t\t\t"format": "yy.MM.dd hh:mm:ss"'
			}	
			else{
				temp_format=""
			}

			temp_selector=selector.replace(template_data['item_selector'], "");
			temp_selector=temp_selector.replace(" > ", "");
			
			if(template_data['properties_index']==0){
				temp_string=temp_string+'\t\t\t{\n\t\t\t\t"property": "'+target_property+'",\n\t\t\t\t"selector": "'+temp_selector+'",\n\t\t\t\t"data-type": "'+target_data_type+'"'+temp_attribute+temp_format+'\n\t\t\t}';
			}
			else{
				temp_string=temp_string+',\n\t\t\t{\n\t\t\t\t"property": "'+target_property+'",\n\t\t\t\t"selector": "'+temp_selector+'",\n\t\t\t\t"data-type": "'+target_data_type+'"'+temp_attribute+temp_format+'\n\t\t\t}';

			}


			template_data['properties_index']=template_data['properties_index']+1;
			target_attribute=null;
			$("#insert_property").val("")
		}  

		template_data["string"]=template_data["string"]+temp_string;
		template_data['stage']=1;

		template_test()
		
		//$("#preview").html(template_data["string"]+template_data["closing_string"]);
		$("#select_opt").css("visibility","hidden");
		$("#ui_html2").css("visibility","hidden");
		$("#ui_html3").css("visibility","hidden");
		$("#editor").css("visibility","visible");
	}
	else if(current_selector==4){
		template_data_list.push(JSON.parse(JSON.stringify(template_data)))

		$("#select_opt").css("visibility","hidden");
		$("#ui_html4").css("visibility","hidden");
		$("#editor").css("visibility","visible");
	}
	else if(current_selector==5){
		check_login();

		$("#select_opt").css("visibility","hidden");
		$("#ui_html6").css("visibility","hidden");
		$("#editor").css("visibility","visible");
	}

	//console.log(template_data_list)
	document.addEventListener("mouseover", check_1, false);
	document.addEventListener("keydown", show, true);
	document.removeEventListener("keydown", lock_input, true);

	console.log("\n\n\n")
}

$("#select_opt_finish").on('click', select_opt_close)

/*--------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------
 */

function select_opt_x(){
	$("#select_opt").css("visibility","hidden");
	$("#ui_html2").css("visibility","hidden");
	$("#ui_html3").css("visibility","hidden");
	$("#ui_html4").css("visibility","hidden");
	$("#ui_html6").css("visibility","hidden");
	$("#editor").css("visibility","visible");

	document.addEventListener("mouseover", check_1, false);
	document.addEventListener("keydown", show, true);
	document.removeEventListener("keydown", lock_input, true);
}
$("#select_opt_x").on('click', select_opt_x)

/*--------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------
 */

function add_list(){
	template_data['string']=template_data['string']+"\n\t\t]\n\t}\n},\n";
	template_data['stage']=0;
	template_data['properties_index']=0;
	template_data['item_selector']="";

	alert("item 추가");
}
$("#add").on('click', add_list)

/*--------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------
 */

function backward(){
	if(template_data_list.length>0){
		template_data=template_data_list.pop()
		console.log(template_data)
		template_test()
	}
}
$('#backward').on('click', backward)

/*--------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------
 */

 function template_test(){
 	var p_template=JSON.parse(template_data["string"]+template_data["closing_string"])
 	var temp_preview="";
 	console.log("\n\n\n")
 	console.log(p_template)
 	for(var i in p_template){
 		var temp_template=p_template[i]
 		var base_selector=temp_template.item.selector 
 		var temp_prop=temp_template.item.properties
 		var target_items=document.querySelectorAll(base_selector)

 		for(var j=0; j<target_items.length; j++){
 			temp_preview=temp_preview+"ITEM > \n"
 			for(var k in temp_prop){
 				temp_preview=temp_preview+temp_prop[k].property+" : ";

 				temp_prop_element=target_items[j].querySelector(temp_prop[k].selector)
 				if(temp_prop[k].attr){
 					temp_attr=$(temp_prop_element).attr(temp_prop[k].attr)
 					
 					if(temp_prop[k].attr=="href" || temp_prop[k].attr=="src"){
 						console.log("check link")
 						temp_attr=new URL(temp_attr, window.location.href)
 					}

 					temp_preview=temp_preview+temp_attr+"\n"
 				}
 				else{
 					temp_preview=temp_preview+$(temp_prop_element).text()+"\n"
 				}

 			}
 			temp_preview=temp_preview+"----------------------------------------------\n"
 		}

 		$("#preview").html(temp_preview);
 	} 

 }