var ballzObj;
var distance = 5;
var time = 10;
var maxPos = 480;
var minPos = 0;
var moduleLength = 50;
var barGap = 80;

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
	//moveBallzz();
	console.log($('#gameElement').css("top"));
	ballzObj.move(ballzObj);
	//$(ballzObj.HTMLObj).animate({opacity: 0.25}, 5000);
	$('#gameElement').focus();
})

function init() {
	ballzObj = new Ballzz();
	ballzObj.render();
}

/* Position object top = x, left = y */
var Pos = function(x,y) {
	this.x = x;
	this.y = y;
}

/* Ball element */
var Ballzz = function(x,y) {
	this.HTMLObj = null;
	this.pos = new Pos(x,y);
	this.direction = 0;
	this.render = renderBallzz;
	this.move = moveBallzz;
}

function renderBallzz() {
	ballzObj.HTMLObj = document.createElement("span");
	$(ballzObj.HTMLObj).attr("id", "ballzz");
	$(ballzObj.HTMLObj).attr("class", "ballzz");
	//document.body.appendChild(ballzObj.HTMLObj);
	$('#gameElement').append(ballzObj.HTMLObj);
}
var counter = 0;

function moveBallzz(ball) {
	//console.log("Counter: "+counter++);
	//console.log(ball);
	var nextPosition = $(ball.HTMLObj).css("left").replace(/px/g,"");
	if((ball.direction == 1 && nextPosition < maxPos) || (ball.direction == -1 && nextPosition > minPos)) {
		nextPosition = (new Number(nextPosition)) + ball.direction*distance;
	}
	//console.log("Next Position: "+nextPosition + " Direction: " + ball.direction +" Comp: " + (ball.direction*distance));
	$(ball.HTMLObj).animate({left:nextPosition},time,function(){ball.move(ball)});
}

var Bar = function() {
	this.modules = new Array();
	this.isInGap = isInGap;
	this.pos = null;
	this.render = renderBar;
}

function isInGap(x,y) {
	var checkPos = y%moduleLength;
	var gap = false;
	if(this.modules.length > checkPos && this.modules[checkPos] == null) {
		gap = true;
	}
	return gap;
}

function renderBar() {
}
