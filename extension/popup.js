document.addEventListener('DOMContentLoaded', function() {
	document.body.style.width="200px";
    var link = document.getElementById('link');
    link.style.display="block";
    link.style.textAlign="center";
    // onClick's logic below:
    link.addEventListener('click', function() {
        hellYeah('xxx');
    });
    link.addEventListener('mouseover', function(e) {
        e.target.style.cursor="pointer";
    });
    link.addEventListener('mouseout', function(e) {
        e.target.style.cursor="default";
    });
});
function hellYeah(text) {
  document.getElementById("text-holder").innerHTML = text;
}
