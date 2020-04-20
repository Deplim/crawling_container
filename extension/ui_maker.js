var target_property;
var target_attribute;
var target_data_type;
var target_item_type;
var target_tag1;
var target_tag2;
var current_selector=0;

var ui_html=`<img id="backward" src="https://github.com/Deplim/crawling_container/blob/master/icon/backward.png?raw=true">
		<img id="get" src="https://github.com/Deplim/crawling_container/blob/master/icon/get.png?raw=true">
		<img id="save" src="https://github.com/Deplim/crawling_container/blob/master/icon/save.png?raw=true">
		<img id="add" src="https://github.com/Deplim/crawling_container/blob/master/icon/add.png?raw=true">
		<textarea id="preview" readonly></textarea>`
var ui_html2=`<div id="ui_html2">
		<div id="select_property">
			<span>&nbsp Property</span><br>
		</div>
		<div id="select_attribute">
			<span>&nbsp Attribute</span><br>
		</div>
		<div id="select_data-type">
			<span>&nbsp Data-type</span><br>
		</div>
		</div>`
var ui_html3=`<div id="ui_html3">
		<div id="select_item-type">
			<span>&nbsp Item-type</span><br>
		</div>
		</div>`
var ui_html4=`<div id="ui_html4">
		<div id="storage_list">
			<table id="storage_list_table">
				<tbody id="storage_list_tbody">
				</tbody>
			</table>
		</div>
		</div>`
var ui_html6=`<div id="ui_html6">
		<div id="insert_option">
			<table id="insert_option_table">
		        <tbody>
			        <tr>
			          <td>userIdx<br><input id="insert_userIdx" type="text" class="input" value="자동(입력할필요x)"></td>
			          <td>title<br><input id="insert_title" type="text" class="input" value="default"></td>
			          <td>content<br><input id="insert_content" type="text" class="input" value="default"></td>
			        </tr>
			        <tr>
			          <td>targetUrl<br><input id="insert_targetUrl" type="text" class="input"></td>
			          <td>tag1<br><input id="insert_tag1" type="text" class="input"></td>
			          <td>tag2<br><input id="insert_tag2" type="text" class="input"></td>
			        </tr>
		        </tbody>
			</table>
		</div>				
		</div>`



var editor = document.createElement('div');
editor.id = "editor";
document.body.appendChild(editor);

var select_opt = document.createElement('div');
select_opt.id = "select_opt";
document.body.appendChild(select_opt);

editor.innerHTML=ui_html;
select_opt.innerHTML=ui_html2+ui_html3+ui_html4+ui_html6+"<button id='select_opt_finish' class='black_btn'>   F<br>i<br>n<br>i<br>s<br>h  </button> <button id='select_opt_x' class='black_btn'>   X  </button>"

document.getElementById("preview").placeholder = "미리보기";






function m_over(e){
	e.target.style.border="2px dashed gray";
	e.target.style.cursor="pointer";
}
function m_out(e){
	e.target.style.border=null;
	e.target.style.cursor="default";
}
function m_over2(e){
	e.target.style.background="#383838";
	e.target.style.color="white";
	e.target.style.cursor="pointer";
}
function m_out2(e){
	e.target.style.background="white";
	e.target.style.color="#383838";
	e.target.style.cursor="default";
}
function dragMouseDown(event, target) {
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        target.style.left = pageX - shiftX + 'px';
        target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    target.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        target.onmouseup = null;
    };
};
$("#backward").on('mouseover', m_over)
$("#backward").on('mouseout', m_out)
$("#save").on('mouseover', m_over)
$("#save").on('mouseout', m_out)
$("#add").on('mouseover', m_over)
$("#add").on('mouseout', m_out)
$("#get").on('mouseover', m_over)
$("#get").on('mouseout', m_out)

document.getElementById("select_opt_finish").addEventListener("mouseover", m_over2, false);
document.getElementById("select_opt_finish").addEventListener("mouseout", m_out2, false);
document.getElementById("select_opt_x").addEventListener("mouseover", m_over2, false);
document.getElementById("select_opt_x").addEventListener("mouseout", m_out2, false);


editor.setAttribute('draggable', true);
$("#editor").on('mousedown', function(event) {
  dragMouseDown(event, event.target);
})
$("#editor").on('dragstart', function() {
  return false;
})







var property_option=["title","linkUrl", "author", "content", "registDate", "imageUrl"];
var data_type_option=["text", "number", "date"];
var item_type_option=["list", "row"]

var p_op_buttons=Array();
var d_op_buttons=Array();
var i_op_buttons=Array();

function property_option_click(e){
	for(o in p_op_buttons){
		p_op_buttons[o].style.background="white";
	}
	e.target.style.background="#a1a1a1";
	target_property=e.target.innerHTML;
}
function data_type_option_click(e){
	for(o in d_op_buttons){
		d_op_buttons[o].style.background="white";
	}
	e.target.style.background="#a1a1a1";
	target_data_type=e.target.innerHTML;
}
function item_type_option_click(e){
	for(o in i_op_buttons){
		i_op_buttons[o].style.background="white";
	}
	e.target.style.background="#a1a1a1";
	target_item_type=e.target.innerHTML;
}
for (var i=0; i<property_option.length; i++){
	var temp_el = document.createElement('button');
	temp_el.innerHTML=property_option[i];
	temp_el.style="width:90px; height:30px; font-size:14px; background-color:white; color:black;"
	temp_el.onclick="property_option_click();";
	$(temp_el).on("click" ,property_option_click);
	$('#select_property').append(temp_el);
	p_op_buttons.push(temp_el);
}
for (var i=0; i<data_type_option.length; i++){
	var temp_el = document.createElement('button');
	temp_el.innerHTML=data_type_option[i];
	temp_el.style="width:90px; height:30px; font-size:14px; background-color:white; color:black;"
	$(temp_el).on("click" ,data_type_option_click);
	$('#select_data-type').append(temp_el);
	d_op_buttons.push(temp_el);
}
for (var i=0; i<item_type_option.length; i++){	
	var temp_el = document.createElement('button');
	temp_el.innerHTML=item_type_option[i];
	temp_el.style="width:90px; height:30px; font-size:14px; background-color:white; color:black;"
	$(temp_el).on("click" ,item_type_option_click);
	$('#select_item-type').append(temp_el);
	i_op_buttons.push(temp_el);
}

function set_attribute_option(at_array){
	var attribute_option=at_array;
	var a_op_buttons=Array();
	function attribute_option_click(e){
		for(o in a_op_buttons){
			a_op_buttons[o].style.background="white";
		}
		e.target.style.background="#a1a1a1";
		target_attribute=e.target.innerHTML;
	}
	for (var i=0; i<attribute_option.length; i++){
		var temp_el = document.createElement('button');
		temp_el.innerHTML=attribute_option[i];
		temp_el.style="width:90px; height:30px; font-size:14px; background-color:white; color:black;"
		$(temp_el).on("click" ,attribute_option_click);
	 	$('#select_attribute').append(temp_el);
		a_op_buttons.push(temp_el);
	}
}




