var ballzObj;
var distance = 5;
var time = 10;
var maxPos = 480;
var minPos = 0;
var moduleLength = 50;
var barGap = 80;
var numnerOfModules = Math.floor(maxPos/moduleLength)+1;
var parentEle;
var barStartPos = 20;

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
	console.log(parentEle.css("top"));
	ballzObj.move(ballzObj);
	//$(ballzObj.HTMLObj).animate({opacity: 0.25}, 5000);
	parentEle.focus();
})

function init() {
	parentEle = $('#gameElement');
	ballzObj = new Ballzz();
	ballzObj.render();
	var bar = generateBar();
	//console.log(bar);
	bar.render();
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
	parentEle.append(ballzObj.HTMLObj);
}
//var counter = 0;

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

/* Maze bar */
var Bar = function() {
	this.modules = new Array();
	this.isInGap = isInGap;
	this.pos = null;
	this.render = renderBar;
	this.htmlObj =  document.createElement("div");
	$(this.htmlObj).addClass("bar");
	$(this.htmlObj).css("width", maxPos+20);
	$(this.htmlObj).css("top", barStartPos);
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
	parentEle.append(this.htmlObj);
	var m;
	for(m in this.modules) {
		//console.log(this.modules[m]);
		this.modules[m].render();
	}
}

function generateBar() {
	var numberOfGaps = Math.round(Math.random()*100000)%3;
	var gapsPos = new Array();

	var gapPos;
	while(numberOfGaps > -1) {
		gapPos = Math.round(Math.random()*100000)%numnerOfModules;
		if(gapsPos.indexOf(gapPos) == -1) {
			gapsPos.push(gapPos);
			numberOfGaps--;
		}
	}
	gapsPos.sort();
	console.log(gapsPos);
	var module;
	var bar = new Bar();
	for(var modIndex=0; modIndex<numnerOfModules;modIndex++) {
		module = new Module();
		module.htmlObj = document.createElement("span");
		$(module.htmlObj).css("width", moduleLength);
		if(gapsPos.indexOf(modIndex) != -1) {
			this.gap = true;
		}
		bar.modules.push(module);
		module.bar = bar;
	}

	return bar;
}

/* Module of BAR */
var Module = function() {
	this.gapDirection = 0;
	this.htmlObj = null;
	this.pos = null;
	this.render = renderModule;
	this.bar = null;
	this.gap = false;
}

function renderModule() {
	$(this.htmlObj).addClass("module");
	$(this.bar.htmlObj).append(this.htmlObj);
}
