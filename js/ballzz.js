var ballzObj;
var distance = 5;
var time = 10;
var log;
var maxPos = 480;
var minPos = 0;

$(document).ready(function() {
	init();
	$(document).keypress(function(eventObj){
		if(eventObj.keyCode == 39) {
			ballzObj.direction = 1;
		}
		else if(eventObj.keyCode == 37) {
			ballzObj.direction = -1;
		}
	});
	moveBallzz();
	//$(ballzObj.HTMLObj).animate({opacity: 0.25}, 5000);
})

function init() {
	ballzObj = new Ballzz();
	ballzObj.HTMLObj = document.createElement("span");
	$(ballzObj.HTMLObj).attr("id", "ballzz");
	$(ballzObj.HTMLObj).attr("class", "ballzz");
	document.body.appendChild(ballzObj.HTMLObj);
	log = document.createElement("div");
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(log);
}

function moveBallzz() {
	var nextPosition = $(ballzObj.HTMLObj).css("left").replace(/px/g,"");
	if((ballzObj.direction == 1 && nextPosition < maxPos) || (ballzObj.direction == -1 && nextPosition > minPos)) {
		nextPosition = (new Number(nextPosition)) + ballzObj.direction*distance;
	}
	console.log("Next Position: "+nextPosition + " Direction: " + ballzObj.direction +" Comp: " + (ballzObj.direction*distance));
	$(ballzObj.HTMLObj).animate({left:nextPosition},time,function(){moveBallzz()});
}

var Ballzz = function() {
	this.HTMLObj = null;
	this.Pos = null;
	this.X = null;
	this.Y = null;
	this.direction = 0;
}
