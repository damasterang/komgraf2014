function reset(){
	$("input").val(0);
	$("#contentLine, #contentText").html('');
	$("#pLinePointStat, #statusCal").html('');
	$("#getLine, #additionVectorLine, #subtractionVectorLine, #dotPro, #crossPro").slideUp(200);
	$('.transformation').slideUp(400);
	arrayPoint, arraylineMethod = new Array();
	statusSymbol = 0;
}

function declaration(id,val,dur){

	oldText = $('#'+id+'').html();
	plusText = oldText + val;
	$('#'+id+'').html(plusText).fadeIn(dur);

};

function convertVal(po, poV){

	var poVV = parseFloat($("#"+poV+"").val());
	if (po == "x") {
		retVal = (scale * poVV) + center;
	} else {
		retVal = center - (scale * poVV);
	};

	return retVal;

};

function justConvertVal(po, poV){

	if (po == "x") {
		retVal = (scale * poV) + center;
	} else {
		retVal = center - (scale * poV);
	};

	return retVal;

};

function enConvertVal(po, poV){

	if (po == "x") {
		retVal = (poV - center) / scale;
	} else {
		retVal = (center - poV) / scale;
	};

	return retVal;

};

function getValId(id){

	var retVal = parseFloat($("#"+id+"").val());
	return retVal;

};

function pushArrPath(c){

	arrayPoint.push(c);
	$("div."+c+"").css("color","#a89e30");
	checkReadyPoint();

};

function pushArrLineMethod(c){

	arraylineMethod.push(c);
	$("div."+c+"").css("color","#7630a5");
	checkReadyLine();	

}

function removeClass(c){

	$("."+c+"").remove();

};

function removeClassShape(c){

	$("."+c+"").remove();

	for (var i = 0; i <= arrayPoint.length-1; i++) {
		$("div."+arrayPoint[i]+"").css("color","#35a530");
	};

	arrayPoint = new Array();

	$("#getLine, #dotPro, #crossPro").slideUp(300);

};

function removeClassLineMethod(c){

	$("."+c+"").remove();

	$(".lineObj").css("color","#3071a9");

	$("#additionVectorLine, #subtractionVectorLine, #dotPro, #crossPro").slideUp(300);

}


function checkReadyPoint(){

	if (arrayPoint.length >= 3) {

		$("#getLine").html("Get Shape");
		$("#getLine").slideDown(300);

	} else if (arrayPoint.length >= 2){

		$("#getLine").html("Get Line");
		$("#getLine").slideDown(300);

	}

};

function checkReadyLine(){
	
	if (arraylineMethod.length >= 2) {

		$("#additionVectorLine").slideDown(300);
		$("#subtractionVectorLine").slideDown(300);
		$("#dotPro").slideDown(300);
		$("#crossPro").slideDown(300);

	}

};

function checkSetSymbol(){

	statusSymbol++;
	if (arraySymbol.length-1 == statusSymbol ) statusSymbol = 0;

};


function zoomText(){

	$('.textZoom').mouseover(function(){
		$(this).attr("font-size", "1.5em");
	}).mouseleave(function(){
		$(this).attr("font-size", "1em");
	});

}

function rotatePoint(a, pointX, pointY, originX, originY){

	// x = Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX;
	// y = Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY;


	// var retVal = originX + (pointX - originX) * Math.cos(a) - (pointY - originY) * Math.sin(a);
	var retValX = (pointX - originX) * Math.cos(a) - (pointY - originY) * Math.sin(a) + originX;
	// var retVal = pointX * Math.cos(a) - pointY * Math.sin(a);

	// var retVal = originY + (pointX - originX) * Math.sin(a) + (pointY - originY) * Math.cos(a);
	var retValY = (pointX - originX) * Math.sin(a) + (pointY - originY) * Math.cos(a) + originY;
	// var retVal = pointX * Math.sin(a) + pointY * Math.cos(a);

	return {

		x: retValX,
		y: retValY

	}

}