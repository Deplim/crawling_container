String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function select_opt_close(e){
	if(current_selector==2 || current_selector==3){
		var temp_string="";
		var temp_selector;
		if(template_data['stage']==0){
			if(target_item_type=="list"){
				temp_selector=selector.replaceAt(selector.lastIndexOf("nth-child")+10,"n")
				temp_string=temp_string+'{\n\t"item": {\n\t\t"selector": "'+temp_selector+'",\n\t\t"item-type": "'+target_item_type+'",\n\t\t"properties": [\n';
			}
			else{
				temp_string=temp_string+'{\n\t"item": {\n\t\t"selector": "'+selector+'",\n\t\t"item-type": "'+target_item_type+'",\n\t\t"properties": [\n';
			}
			template_data['item_selector']=selector;
		}
		else{
			if(target_attribute=="text") {
				temp_attribute=""
			}
			else {
				temp_attribute=',\n\t\t\t\t"attr": '+'"'+target_attribute+'"'
			}
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
		}  

		template_data["string"]=template_data["string"]+temp_string;
		template_data['stage']=1;
		template_data_list.push(JSON.parse(JSON.stringify(template_data)))

		$("#preview").html(template_data["string"]+template_data["closing_string"]);
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
		var final_tem=template_data["string"]+template_data["closing_string"];
		var dic={}
		dic["userIdx"]=document.getElementById("insert_userIdx").value;
		dic["title"]=document.getElementById("insert_title").value;
		dic["content"]=document.getElementById("insert_content").value;
		dic["targetUrl"]=document.getElementById("insert_targetUrl").value;
		dic["tag1"]=document.getElementById("insert_tag1").value;
		dic["tag2"]=document.getElementById("insert_tag2").value;
		dic["template"]=final_tem;
		dic["template_data"]=template_data;

		chrome.storage.local.get(['template_backup'], function(result) {
			console.log(result.template_backup)
			if(result.template_backup && result.template_backup!="" && result.template_backup!=undefined){
				var t=result.template_backup
				t.push(dic)
				console.log("\n\nstorage>>")
				console.log(t)
				chrome.storage.local.set({template_backup: t})
			}
			else{
				var t=Array();
				t.push(dic)
				console.log("\n\nstorage>>")
				console.log(t)
				chrome.storage.local.set({template_backup: t})
			}
		});

		$("#select_opt").css("visibility","hidden");
		$("#ui_html6").css("visibility","hidden");
		$("#editor").css("visibility","visible");
	}

	document.addEventListener("keydown", show, false);
}

$("#select_opt_finish").on('click', select_opt_close)






function add_list(){
	console.log("checkasdfasdfasdf");
	template_data['string']=template_data['string']+"\n\t\t]\n\t}\n},\n";
	template_data['stage']=0;
	template_data['properties_index']=0;
	template_data['item_selector']="";
}
$("#add").on('click', add_list)





function backward(){
	if(template_data_list.length>0){
		console.log(template_data_list)
		template_data=template_data_list.pop()
		$("#preview").html(template_data["string"]+template_data["closing_string"]);
	}
}
$('#backward').on('click', backward)
