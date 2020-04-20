// 크롤링 대상 주소들 얻어오는 버튼 앨리먼트 생성.
var tt_button = document.createElement('button');
tt_button.innerHTML=("post templates");
tt_button.style="position: fixed; top: 40px; right: 130px; z-index: 999;";
document.body.appendChild(tt_button);
tt_button.addEventListener('click', post_templates);

function post_templates(){
	chrome.storage.local.get(['template_backup'], function(result) {
		for(var i in result.template_backup)
		{
			var template_backup=result.template_backup[i];
			console.log(template_backup);
			$.ajax({
				method : "POST",
				url : "http://hushit.live/service/pageone/api/v1_extension/set_rss.php",
				data : {"userIdx" : template_backup["userIdx"], "title" : template_backup["title"], "content" : template_backup["content"], "targetUrl" : template_backup["targetUrl"], "tag1" : template_backup["tag1"], "tag2" : template_backup["tag2"], "template" : template_backup["template"]}, 
				success : function(data) { 
				    console.log("success response: ");
				    console.log(data);
				},
				// 서버에 데이터를 보내면 처리와 저장은 잘 되지만 error 처리가 되는데 해결하기 전까진 에러 콜백함수에서 후처리 하는 것으로 함.
				error : function(e) {
					console.log("error response: ");
					console.log(e);
				}
			});
		}			
	});
}