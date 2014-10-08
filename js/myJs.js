var center = 250;
var statusClass = 0;
var scale = 12.5;
var arrayPoint = new Array();
var arraylineMethod = new Array();
var arrayRect = new Array();
var arrayTriangle = new Array();
var arraySymbol = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
var arraySymbolRect = new Array("A","B","C","D");
var statusSymbol = 0;

$('document').ready(function(){

	var isChromium = window.chrome,
	    vendorName = window.navigator.vendor;
	if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc.") {
	   console.log("chrome");
	} else { 
	   window.location.assign("./sorry.html");
	}

	createGrid();
	$("#getLine, #additionVectorLine, #subtractionVectorLine, #dotPro, #crossPro").hide();
	$(".transformation").hide();

	$("#run").click(createLine);
	$("#runPoint").click(createPoint);
	// $("#createRect").click(createRect);
	$("#createRectPoint").click(createRectPoint);
	$("#translate").click(translate);
	$("#scale").click(scaleTrans);
	$("#rotateRect").click(rotateRect);
	// $("#createTriangle").click(createTriangle);
	$("#createTriangle").click(createTrianglePoint);
	$("#createCircle").click(createCircle);
	$("#translateT").click(translateTriangle);
	$("#scaleT").click(scaleTriangle);
	$("#shearXTBtn").click(shearXTriangle);
	$("#shearYTBtn").click(shearYTriangle);

	$('.textZoom').mouseover(function(){
		$(this).attr("font-size", "1.5em");
	}).mouseleave(function(){
		$(this).attr("font-size", "1em");
	});

	$("#del").click(reset);

	$("#createRectPoint").mouseover(rectSameVal);

});

function rectSameVal(){
	sameVal("pXRect2","pXRect1");
	sameVal("pYRect2","pYRect3");
	sameVal("pXRect4","pXRect3");
	sameVal("pYRect4","pYRect1");
}

function sameVal(one, two){

	val = $("#"+one).val();
	$("#"+two).val(val);

}

function createGrid(){

	var arrayHelp = new Array(-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,2,4,6,8,10,12,14,16,18,20);

	var grid = '';
	var littleGrid = '';
	var textCartesian = '';

	for (var i = 0; i <= 5; i++) {
		var valGrid = i * 100;
		grid += "<line x1='"+valGrid+"' y1='0' x2='"+valGrid+"' y2='500'/><line y1='"+valGrid+"' x1='0' y2='"+valGrid+"' x2='500'/>";	
	}

	for (var i = 0; i <= 20; i++) {
		var val = i * 25;

		if (i > 0 && i < 20) {
			littleGrid += "<line y1='"+val+"' x1='245' y2='"+val+"' x2='255' stroke='black'/><line x1='"+val+"' y1='245' x2='"+val+"' y2='255' stroke='black'/>";
		};

		if (i > 0 && i < 20) {
			if (i < 10) {
				textCartesian += "<text x='"+(val-8)+"' y='240' fill='silver'>"+arrayHelp[i]+"</text><text x='260' y='"+(val+3)+"' fill='silver'>"+(-1*arrayHelp[i])+"</text>";
			} else if(i > 10){
				textCartesian += "<text x='"+(val-6)+"' y='265' fill='silver'>"+arrayHelp[i]+"</text><text x='225' y='"+(val+3)+"' fill='silver'>"+(-1*arrayHelp[i])+"</text>";
			}
		}
	};

	$("#grid").html(grid);
	$("#littleGrid").html(littleGrid);
	$("#textCartesian").html(textCartesian);

}

function createLine(){

	fromX = getValId("fromX");
	fromY = getValId("fromY");
	toX = getValId("toX");
	toY = getValId("toY");

	x1 = convertVal("x", "fromX");
	y1 = convertVal("y", "fromY");
	x2 = convertVal("x", "toX");
	y2 = convertVal("y", "toY");

	var symbol1 = arraySymbol[statusSymbol];
	checkSetSymbol();
	var symbol2 = arraySymbol[statusSymbol];

	var clas = "g"+statusClass;

	// Line declaration

	var line = "<line class='lineObj "+clas+"' x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' onclick=\"removeClass(\'"+clas+"')\" marker-start='url(#mC2)' marker-end='url(#mT2)'/>";
	declaration("contentLine",line,400);

	// text declaration

	var text1 = "<text class='textZoom "+clas+"' x='"+(x1-5)+"' y='"+(y1-5)+"' font-weight='bold'>"+symbol1+"<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom "+clas+"' x='"+(x2-5)+"' y='"+(y2-5)+"' font-weight='bold'>"+symbol2+"<text>";
	declaration("contentText",text2,500);

	// info declaration

	var lengthStat = "<button type='button' class='btn btn-default tooltipInfo' onclick='lengthVectorLine(\""+symbol1+"\",\""+symbol2+"\",\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Length'>L</button>";
	var removeClassLineMethod = "<button type='button' class='btn btn-default tooltipInfo' onclick='removeClassLineMethod(\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Remove'>R</button>";

	info = "<div class="+clas+" style='color: #3071a9'><div onclick='pushArrLineMethod(\""+clas+"\")'>[line] "+symbol1+"("+fromX+","+fromY+") to "+symbol2+"("+toX+","+toY+")</div>"+removeClassLineMethod+" "+lengthStat+"</div>";
	declaration("pLinePointStat",info,400);

	zoomText();
	statusClass++;
	checkSetSymbol();

};

function createPoint(){

	xPoint = getValId("xPoint");
	yPoint = getValId("yPoint");

	x = convertVal("x", "xPoint");
	y = convertVal("y", "yPoint");

	var clas = "g"+statusClass;

	var symbol = arraySymbol[statusSymbol];

	// point declaration

	var circle = "<circle class='"+clas+"' onclick='removeClass(\""+clas+"\")' cx="+x+" cy="+y+" r='2' fill='#35a530' stroke='#35a530'></circle>";
	declaration("contentLine",circle,400);


	// textStatus declaration

	var text = "("+xPoint+","+yPoint+")";
	text = "<text class='textZoom "+clas+"' x='"+(x-5)+"' y='"+(y-5)+"' font-weight='bold'>"+symbol+"<text>";
	declaration("contentText",text,400);

	// info declaration

	var removeClass = "<button type='button' class='"+clas+" btn btn-default tooltipInfo' onclick='removeClass(\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Remove'>R</button>";

	info = "<div clas='fullWidth'><div class='"+clas+" fullWidth' onclick='pushArrPath(\""+clas+"\")' style='color: #35a530'>[point] "+symbol+"("+xPoint+","+yPoint+")</div>"+removeClass+"</div>";
	declaration("pLinePointStat",info,400);

	zoomText();
	statusClass++;
	checkSetSymbol();

};

function lineFromPoint(){

	$(".greatLine").remove();
	$(".infoShape").remove();

	var cxArr = new Array();
	var cyArr = new Array();

	// console.log(arrayPoint.length);

	for (var i = 0; i <= arrayPoint.length; i++) {
		
		cxArr.push($("."+arrayPoint[i]+"").attr('cx'));
		cyArr.push($("."+arrayPoint[i]+"").attr('cy'));

	};

	var m = ""+cxArr[0]+","+cyArr[0]+"";
	var mPlus = "("+enConvertVal("x",cxArr[0])+","+enConvertVal("y",cyArr[0])+") ";
	var l ='';
	var lPlus ='';

	for (var j = 1; j <= arrayPoint.length-1; j++) {
		
		var l = l + " "+cxArr[j]+","+cyArr[j]+"";
		var lPlus = lPlus + " ("+enConvertVal("x",cxArr[j])+","+enConvertVal("y",cyArr[j])+")"

	};

	if (arrayPoint.length >= 3) {

		var valFinal = "<path class='greatLine g"+statusClass+"' d='M "+m+" L "+l+" "+m+"' fill='none' stroke='#a89e30' stroke-width='2'/>";
		info = "<div class='infoShape g"+statusClass+"' onclick='removeClassShape(\"g"+statusClass+"\")' style='color: #a89e30'>[shape] {"+mPlus+" "+lPlus+"}</div>";
		declaration("pLinePointStat",info,400);

	} else if (arrayPoint.length >= 2){

		var valFinal = "<line class='greatLine g"+statusClass+"' x1='"+cxArr[0]+"' y1='"+cyArr[0]+"' x2='"+cxArr[1]+"' y2='"+cyArr[1]+"' marker-start='url(#mC3)' marker-end='url(#mT3)' stroke='#a89e30'/>";
		info = "<div class='infoShape g"+statusClass+"' onclick='removeClassShape(\"g"+statusClass+"\")' style='color: #a89e30'>[line] ("+enConvertVal("x",cxArr[0])+","+enConvertVal("y",cyArr[0])+") to ("+enConvertVal("x",cxArr[1])+","+enConvertVal("y",cyArr[1])+")</div>";
		declaration("pLinePointStat",info,400);

	}


	statusClass++;
	declaration("contentLine",valFinal,400);

};

// function dotPro(){

// 	// 	P . Q 	= (6 i + 5 j) . (2 i − 8 j)
// 	// 			= (6 x 2) + (5 x -8)
// 	// 			= 12 − 40
// 	// 			= −28

// 	var xArr = new Array();
// 	var yArr = new Array();

// 	for (var i = 0; i <= 1; i++) {
		
// 		xArr.push(enConvertVal('x',parseFloat($("."+arrayPoint[i]+"").attr('cx'))));
// 		yArr.push(enConvertVal('y',parseFloat($("."+arrayPoint[i]+"").attr('cy'))));

// 		// result = (x1 * x2) + (y1 * y2)
// 		if (i == 1) var result = ( xArr[0] * xArr[1] ) + ( yArr[0] * yArr[1] );

// 	};

// 	var clas = "g"+statusClass;
	
// 	status = "<div class='"+clas+"' style='color: #35a530'>[dotPro] ("+xArr[0]+","+yArr[0]+") <strong>.</strong> ("+xArr[1]+","+yArr[1]+") <strong>is</strong> " +result+"</div>";
// 	declaration("statusCal",status,400);

// 	statusClass++;

// }

function dotPro(){

	// 	P . Q 	= (6 i + 5 j) . (2 i − 8 j)
	// 			= (6 x 2) + (5 x -8)
	// 			= 12 − 40
	// 			= −28

	var xArray = new Array();
	var yArray = new Array();

	for (var i = 0; i <= 1; i++) {
		
		var x1 = parseFloat($("."+arraylineMethod[i]+"").attr('x1'));
		var x2 = parseFloat($("."+arraylineMethod[i]+"").attr('x2'));
		var y1 = parseFloat($("."+arraylineMethod[i]+"").attr('y1'));
		var y2 = parseFloat($("."+arraylineMethod[i]+"").attr('y2'));

		var newX1 = enConvertVal("x",x1);
		var newX2 = enConvertVal("x",x2);
		var newY1 = enConvertVal("y",y1);
		var newY2 = enConvertVal("y",y2);

		xArray.push(newX2-newX1);
		yArray.push(newY2-newY1);

		// result = (x1 * x2) + (y1 * y2)

		if (i == 1) var result = ( xArray[0] * xArray[1] ) + ( yArray[0] * yArray[1] );
	};
	
	status = "<div style='color: #7630a5'>[dotPro] " +result+"</div>";
	declaration("statusCal",status,400);
	
}

function crossPro(){

	// 	In two dimensions, the analog of the cross product for u=(u_x,u_y) and  v=(v_x,v_y) is

	// u x v	=	det(uv)	
	// 			=	ux vy - uy vx

	var xArray = new Array();
	var yArray = new Array();

	for (var i = 0; i <= 1; i++) {
		
		var x1 = parseFloat($("."+arraylineMethod[i]+"").attr('x1'));
		var x2 = parseFloat($("."+arraylineMethod[i]+"").attr('x2'));
		var y1 = parseFloat($("."+arraylineMethod[i]+"").attr('y1'));
		var y2 = parseFloat($("."+arraylineMethod[i]+"").attr('y2'));

		var newX1 = enConvertVal("x",x1);
		var newX2 = enConvertVal("x",x2);
		var newY1 = enConvertVal("y",y1);
		var newY2 = enConvertVal("y",y2);

		xArray.push(newX2-newX1);
		yArray.push(newY2-newY1);

		if (i == 1) var result = ( xArray[0] * yArray[1] ) - ( yArray[0] * xArray[1] );
	};
	
	status = "<div style='color: #7630a5'>[crossPro] " +result+"</div>";
	declaration("statusCal",status,400);
	
}

function lengthVectorLine(sym1, sym2, c){

	var x1 = parseFloat($("."+c+"").attr("x1"));
	var x2 = parseFloat($("."+c+"").attr("x2"));
	var y1 = parseFloat($("."+c+"").attr("y1"));
	var y2 = parseFloat($("."+c+"").attr("y2"));

	var newX1 = enConvertVal("x",x1);
	var newX2 = enConvertVal("x",x2);
	var newY1 = enConvertVal("y",y1);
	var newY2 = enConvertVal("y",y2);

	var kx = Math.pow(newX1-newX2,2);
	var ky = Math.pow(newY1-newY2,2);

	var val = Math.sqrt(kx+ky).toFixed(4);
	
	console.log("x : "+x1+" y : "+y1+"");

	status = "<div class='"+c+"' style='color: #7630a5'>[length] "+sym1+" <strong>to</strong> "+sym2+" <strong>is</strong> "+val+"</div>";
	declaration("statusCal",status,400);

};

function additionVectorLine(){

	var xArray = new Array();
	var yArray = new Array();

	var clas = "g"+statusClass;
	var symbol1 = arraySymbol[statusSymbol];
	statusSymbol++;
	var symbol2 = arraySymbol[statusSymbol];

	for (var i = 0; i <= 1; i++) {
		
		var x1 = parseFloat($("."+arraylineMethod[i]+"").attr('x1'));
		var x2 = parseFloat($("."+arraylineMethod[i]+"").attr('x2'));
		var y1 = parseFloat($("."+arraylineMethod[i]+"").attr('y1'));
		var y2 = parseFloat($("."+arraylineMethod[i]+"").attr('y2'));

		var newX1 = enConvertVal("x",x1);
		var newX2 = enConvertVal("x",x2);
		var newY1 = enConvertVal("y",y1);
		var newY2 = enConvertVal("y",y2);

		console.log(x1+" "+x2+" "+y1+" "+y2);
		console.log(newX1+" "+newX2+" "+newY1+" "+newY2);

		xArray.push(newX2-newX1);
		yArray.push(newY2-newY1);

		console.log(xArray[i]+" "+yArray[i]);

		if (i == 1) {

			var tempX = xArray[0] + xArray[1];
			var tempY = yArray[0] + yArray[1];

			var finalX = justConvertVal("x",tempX);
			var finalY = justConvertVal("y",tempY);

			console.log(tempX+" "+tempY+" "+finalX+" "+finalY+"");

		} else if (i == 0) {

			var firstX = 250;
			var firstY = 250;

		}
	};

	convertFirstX = 0;
	convertFirstY = 0;
	convertFinalX = enConvertVal("x",finalX);
	convertFinalY = enConvertVal("y",finalY);

	var line = "<line class='lineObj "+clas+"' x1='"+firstX+"' y1='"+firstY+"' x2='"+finalX+"' y2='"+finalY+"' onclick=\"removeClass(\'"+clas+"')\" marker-start='url(#mC4)' marker-end='url(#mT4)' stroke='#7630a5'/>";
	declaration("contentLine",line,400);

	var lengthStat = "<button type='button' class='btn btn-default tooltipInfo' onclick='lengthVectorLine(\""+symbol1+"\",\""+symbol2+"\",\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Length'>L</button>";
	var removeClassLineMethod = "<button type='button' class='btn btn-default tooltipInfo' onclick='removeClassLineMethod(\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Remove'>R</button>";

	info = "<div class="+clas+" style='color: #7630a5'><div>[line] "+symbol1+"("+convertFirstX+","+convertFirstY+") to "+symbol2+"("+convertFinalX+","+convertFinalY+")</div>"+removeClassLineMethod+" "+lengthStat+"</div>";
	declaration("pLinePointStat",info,400);

	var text1 = "<text class='textZoom "+clas+"' x='"+(firstX-5)+"' y='"+(firstY-5)+"' font-weight='bold'>"+symbol1+"<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom "+clas+"' x='"+(finalX-5)+"' y='"+(finalY-5)+"' font-weight='bold'>"+symbol2+"<text>";
	declaration("contentText",text2,500);

	statusClass++;
	statusSymbol++;

}

function subtractionVectorLine(){

	var xArray = new Array();
	var yArray = new Array();

	var clas = "g"+statusClass;
	var symbol1 = arraySymbol[statusSymbol];
	statusSymbol++;
	var symbol2 = arraySymbol[statusSymbol];

	for (var i = 0; i <= 1; i++) {
		
		var x1 = parseFloat($("."+arraylineMethod[i]+"").attr('x1'));
		var x2 = parseFloat($("."+arraylineMethod[i]+"").attr('x2'));
		var y1 = parseFloat($("."+arraylineMethod[i]+"").attr('y1'));
		var y2 = parseFloat($("."+arraylineMethod[i]+"").attr('y2'));

		var newX1 = enConvertVal("x",x1);
		var newX2 = enConvertVal("x",x2);
		var newY1 = enConvertVal("y",y1);
		var newY2 = enConvertVal("y",y2);

		console.log(x1+" "+x2+" "+y1+" "+y2);
		console.log(newX1+" "+newX2+" "+newY1+" "+newY2);

		xArray.push(newX2-newX1);
		yArray.push(newY2-newY1);

		console.log(xArray[i]+" "+yArray[i]);

		if (i == 1) {

			var tempX = xArray[0] - xArray[1];
			var tempY = yArray[0] - yArray[1];

			var finalX = justConvertVal("x",tempX);
			var finalY = justConvertVal("y",tempY);

			console.log(tempX+" "+tempY+" "+finalX+" "+finalY+"");

		} else if (i == 0) {

			var firstX = 250;
			var firstY = 250;

		}
	};

	convertFirstX = 0;
	convertFirstY = 0;
	convertFinalX = enConvertVal("x",finalX);
	convertFinalY = enConvertVal("y",finalY);

	var line = "<line class='lineObj "+clas+"' x1='"+firstX+"' y1='"+firstY+"' x2='"+finalX+"' y2='"+finalY+"' onclick=\"removeClass(\'"+clas+"')\" marker-start='url(#mC4)' marker-end='url(#mT4)' stroke='#7630a5'/>";
	declaration("contentLine",line,400);

	var lengthStat = "<button type='button' class='btn btn-default tooltipInfo' onclick='lengthVectorLine(\""+symbol1+"\",\""+symbol2+"\",\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Length'>L</button>";
	var removeClassLineMethod = "<button type='button' class='btn btn-default tooltipInfo' onclick='removeClassLineMethod(\""+clas+"\")' data-toggle='tooltip'' data-placement='left' title='Remove'>R</button>";

	info = "<div class="+clas+" style='color: #7630a5'><div>[line] "+symbol1+"("+convertFirstX+","+convertFirstY+") to "+symbol2+"("+convertFinalX+","+convertFinalY+")</div>"+removeClassLineMethod+" "+lengthStat+"</div>";
	declaration("pLinePointStat",info,400);

	var text1 = "<text class='textZoom "+clas+"' x='"+(firstX-5)+"' y='"+(firstY-5)+"' font-weight='bold'>"+symbol1+"<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom "+clas+"' x='"+(finalX-5)+"' y='"+(finalY-5)+"' font-weight='bold'>"+symbol2+"<text>";
	declaration("contentText",text2,500);

	statusClass++;
	statusSymbol++;

}

function createRect(){

	$(".activeRect").remove();
	$(".activeTriangle").remove();
	$(".activeCircle").remove();
	$(".transResult").remove();
	$(".triangleT").slideUp(300);

	arrayRect = new Array();

	x0 = getValId("xRect");
	y0 = getValId("yRect");
	width0 = getValId("widthRect");
	height0 = getValId("heightRect");

	x = convertVal("x", "xRect");
	y = convertVal("y", "yRect");
	width = width0 * scale;
	height = height0 * scale;
	y = y - height;
	// console.log(x+" "+y+" "+width+" "+height);

	arrayRect.push(x,y,width,height);

	// simbol 1 = x-5,y-5
	// simbol 2 = x+width-5,y-5
	// simbol 3 = x+width+5,y+width+5
	// simbol 4 = x-5,y+width+5

	// A = ""+x+","+y+"";
	// B = ""+(x+width)+","+y+"";
	// C = ""+(x+width)+","+(y+height)+"";
	// D = ""+x+","+(y+height)+"";

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom activeRect' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom activeRect' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>B<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom activeRect' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>C<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom activeRect' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>D<text>";
	declaration("contentText",text4,400);

	var rect = "<rect class='activeRect' x='"+x+"' y='"+y+"' height='"+height+"' width='"+width+"' stroke='#3071a9' fill='none'/>"
	declaration("contentLine",rect,400);

	info = "<div class='activeRect' style='color: #3071a9'>[rect]</br> A("+ACoor+") B("+BCoor+") C("+CCoor+") D("+DCoor+")</div>";
	declaration("statusCal",info,400);

	$(".rectT").slideDown(400);

}

function createRectPoint(){

	$(".activeRect").remove();
	$(".activeTriangle").remove();
	$(".activeCircle").remove();
	$(".transResult").remove();
	$(".triangleT").slideUp(300);

	arrayRect = new Array();

	pXRect1 = getValId("pXRect1");
	pYRect1 = getValId("pYRect1"); 
	pXRect2 = getValId("pXRect2"); 
	pYRect2 = getValId("pYRect2"); 
	pXRect3 = getValId("pXRect3"); 
	pYRect3 = getValId("pYRect3"); 
	pXRect4 = getValId("pXRect4"); 
	pYRect4 = getValId("pYRect4"); 

	x0 = pXRect2;
	y0 = pYRect2;
	width0 = pXRect3 - pXRect2;
	height0 = pYRect2 - pYRect1;

	x = convertVal("x", "pXRect2");
	y = convertVal("y", "pYRect2");
	width = width0 * scale;
	height = height0 * scale;
	// console.log(x+" "+y+" "+width+" "+height);

	arrayRect.push(x,y,width,height);

	// simbol 1 = x-5,y-5
	// simbol 2 = x+width-5,y-5
	// simbol 3 = x+width+5,y+width+5
	// simbol 4 = x-5,y+width+5

	// A = ""+x+","+y+"";
	// B = ""+(x+width)+","+y+"";
	// C = ""+(x+width)+","+(y+height)+"";
	// D = ""+x+","+(y+height)+"";

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom activeRect' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom activeRect' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>B<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom activeRect' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>C<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom activeRect' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>D<text>";
	declaration("contentText",text4,400);

	var rect = "<rect class='activeRect' x='"+x+"' y='"+y+"' height='"+height+"' width='"+width+"' stroke='#3071a9' fill='none'/>"
	declaration("contentLine",rect,400);

	info = "<div class='activeRect' style='color: #3071a9'>[rect]</br> A("+ACoor+") B("+BCoor+") C("+CCoor+") D("+DCoor+")</div>";
	declaration("statusCal",info,400);

	$(".rectT").slideDown(400);

}

function translate(){

	$(".transResult").remove();

	xId = getValId("xTranslate") + enConvertVal("x", arrayRect[0]);
	yId = getValId("yTranslate") + enConvertVal("y", arrayRect[1]);

	var width = arrayRect[2];
	var height = arrayRect[3];

	xTranslate = justConvertVal("x",xId);
	yTranslate = justConvertVal("y",yId)-height;


	var rect = "<rect class='transResult' x='"+xTranslate+"' y='"+yTranslate+"' height='"+height+"' width='"+width+"' stroke='#7630a5' fill='none'/>";
	declaration("contentLine",rect,400);

	var line = "<line class='transResult' x1='"+arrayRect[0]+"' y1='"+(arrayRect[1]+height)+"' x2='"+xTranslate+"' y2='"+(yTranslate+height)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	declaration("contentLine",line,400);

	x = xTranslate;
	y = yTranslate;

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[trans]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);

}

function scaleTrans(){

	$(".transResult").remove();

	scaleVal = getValId("scaleVal");

	widthScale = arrayRect[2] * scaleVal;
	heightScale = arrayRect[3] * scaleVal;

	var rect = "<rect class='transResult' x='"+arrayRect[0]+"' y='"+(arrayRect[1]+arrayRect[3]-heightScale)+"' height='"+heightScale+"' width='"+widthScale+"' stroke='#7630a5' fill='none'/>";
	declaration("contentLine",rect,400);

	var line = "<line class='transResult' x1='"+(arrayRect[0]+arrayRect[2])+"' y1='"+(arrayRect[1])+"' x2='"+(arrayRect[0]+widthScale)+"' y2='"+(arrayRect[1]+arrayRect[3]-heightScale)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	declaration("contentLine",line,400);

	x = arrayRect[0];
	y = arrayRect[1]+arrayRect[3]-heightScale;
	width = widthScale;
	height = heightScale;

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[scale]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);

}


function shearX(){

	$(".transResult").remove();

	shearXInp = getValId("shear");
	scaleShear = shearXInp * scale;

	cornerPointX = arrayRect[0];
	cornerPointY = arrayRect[1] + arrayRect[3];

	A = ""+(cornerPointX+scaleShear)+","+(cornerPointY-arrayRect[3])+"";
	B = ""+(cornerPointX+scaleShear+arrayRect[2])+","+(cornerPointY-arrayRect[3])+"";
	C = ""+(cornerPointX+arrayRect[2])+","+cornerPointY+"";
	D = ""+cornerPointX+","+cornerPointY+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+D+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	x = cornerPointX+scaleShear;
	y = cornerPointY-arrayRect[3];
	width = arrayRect[2];
	height = arrayRect[3];

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", cornerPointX+arrayRect[2])+","+enConvertVal("y",cornerPointY)+"";
	DCoor = ""+enConvertVal("x", cornerPointX)+","+enConvertVal("y",cornerPointY)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(cornerPointX+arrayRect[2]+3)+"' y='"+(cornerPointY+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(cornerPointX-10)+"' y='"+(cornerPointY+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[shear X]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);

}

function shearY(){

	$(".transResult").remove();

	shearYInp = getValId("shear");
	scaleShear = shearYInp * scale;

	cornerPointX = arrayRect[0];
	cornerPointY = arrayRect[1] + arrayRect[3];

	A = ""+(cornerPointX)+","+(cornerPointY-arrayRect[3])+"";
	B = ""+(cornerPointX+arrayRect[2])+","+(cornerPointY-arrayRect[3]-scaleShear)+"";
	C = ""+(cornerPointX+arrayRect[2])+","+(cornerPointY-scaleShear)+"";
	D = ""+cornerPointX+","+cornerPointY+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+D+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	x = cornerPointX;
	y = cornerPointY-arrayRect[3];
	width = arrayRect[2];
	height = arrayRect[3];

	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", cornerPointX+arrayRect[2])+","+enConvertVal("y",cornerPointY-arrayRect[3]-scaleShear)+"";
	CCoor = ""+enConvertVal("x", cornerPointX+arrayRect[2])+","+enConvertVal("y",cornerPointY-scaleShear)+"";
	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(cornerPointX+arrayRect[2]+3)+"' y='"+(cornerPointY-arrayRect[3]-scaleShear-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(cornerPointX+arrayRect[2]+3)+"' y='"+(cornerPointY-scaleShear+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text4,400);
	
	info = "<div class='transResult' style='color: #7630a5'>[shear Y]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);
}

function createTriangle(){

	$(".activeTriangle").remove();
	$(".activeRect").remove();
	$(".activeCircle").remove();
	$(".transResult").remove();
	$(".rectT").slideUp(300);

	arrayTriangle = new Array();

	x = getValId("xTriangle");
	y = getValId("yTriangle");

	x = convertVal("x", "xTriangle");
	y = convertVal("y", "yTriangle");

	s = getValId("sideTriangle");

	arrayTriangle.push(x,y,s);

	halfSide = s / 2;
	t = Math.sqrt(Math.pow(s, 2) - Math.pow(halfSide, 2));
	s = s * scale;
	halfSide = halfSide * scale;
	t = t * scale;
	arrayTriangle.push(s,t);

	// x - y - sN - s - t

	A = ""+(x+halfSide)+","+(y-t)+"";
	B = ""+(x+s)+","+(y)+"";
	C = ""+x+","+y+"";

	var pathFinal = "<path class='activeTriangle' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#3071a9' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+enConvertVal("x", x+halfSide)+","+enConvertVal("y",y-t).toFixed(2)+"";
	BCoor = ""+enConvertVal("x", x+s)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";

	var text1 = "<text class='textZoom activeTriangle' x='"+(x+halfSide-5)+"' y='"+(y-t-5)+"' font-weight='bold'>A<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom activeTriangle' x='"+(x+s+2)+"' y='"+(y+10)+"' font-weight='bold'>B<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom activeTriangle' x='"+(x-10)+"' y='"+(y+10)+"' font-weight='bold'>C<text>";
	declaration("contentText",text3,400);

	info = "<div class='activeTriangle' style='color: #3071a9'>[triangle]</br> A("+ACoor+") B("+BCoor+") C("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);


}

function createTrianglePoint(){

	$(".activeTriangle").remove();
	$(".activeRect").remove();
	$(".activeCircle").remove();
	$(".transResult").remove();
	$(".rectT").slideUp(300);

	arrayTriangle = new Array();

	pXTri1 = getValId("pXTri1");
	pYTri1 = getValId("pYTri1");
	pXTri2 = getValId("pXTri2");
	pYTri2 = getValId("pYTri2");
	pXTri3 = getValId("pXTri3");
	pYTri3 = getValId("pYTri3");

	// x1 = convertVal("x", "pXTri1");
	// y1 = convertVal("y", "pYTri1");
	// x2 = convertVal("x", "pXTri2");
	// y2 = convertVal("y", "pYTri2");
	// x3 = convertVal("x", "pXTri3");
	// y3 = convertVal("y", "pYTri3");

	for (var i = 1; i <= 3; i++) {
		temp = convertVal("x","pXTri"+i);
		arrayTriangle.push(temp);
		temp = convertVal("y","pYTri"+i);
		arrayTriangle.push(temp);
	};

	A = ""+arrayTriangle[0]+","+arrayTriangle[1]+"";
	B = ""+arrayTriangle[2]+","+arrayTriangle[3]+"";
	C = ""+arrayTriangle[4]+","+arrayTriangle[5]+"";

	var pathFinal = "<path class='activeTriangle' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#3071a9' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+pXTri1+","+pYTri1+"";
	BCoor = ""+pXTri2+","+pYTri2+"";
	CCoor = ""+pXTri3+","+pYTri3+"";

	var text1 = "<text class='textZoom activeTriangle' x='"+(arrayTriangle[0]-5)+"' y='"+(arrayTriangle[1]-5)+"' font-weight='bold'>A<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom activeTriangle' x='"+(arrayTriangle[2]+2)+"' y='"+(arrayTriangle[3]+10)+"' font-weight='bold'>B<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom activeTriangle' x='"+(arrayTriangle[4]-10)+"' y='"+(arrayTriangle[5]+10)+"' font-weight='bold'>C<text>";
	declaration("contentText",text3,400);

	info = "<div class='activeTriangle' style='color: #3071a9'>[triangle]</br> A("+ACoor+") B("+BCoor+") C("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);


}

function scaleTriangle(){

	$(".transResult").remove();

	// arrayTriangle[0-5]
	var arrayTransform = new Array();

	// x1 = arrayTriangle[0];
	// y1 = arrayTriangle[1];
	// x2 = arrayTriangle[2];
	// y2 = arrayTriangle[3];
	// x3 = arrayTriangle[4];
	// y3 = arrayTriangle[5];

	scaleVal = getValId("scaleValT");

	for (var i = 0; i <= 5; i++){
		if (i%2 == 0) {
			// norm = enConvertVal("x",arrayTriangle[0]) - enConvertVal("x",arrayTriangle[i]);
			// console.log("norm : "+norm);
			temp = ( enConvertVal("x",arrayTriangle[i]) * scaleVal );
			arrayTransform.push(justConvertVal("x",temp));
		} else {
			// norm = enConvertVal("y",arrayTriangle[1]) - enConvertVal("y",arrayTriangle[i]);
			temp = ( enConvertVal("y",arrayTriangle[i]) * scaleVal );
			arrayTransform.push(justConvertVal("y",temp));
		};
		console.log(arrayTransform[i]);
	}

	x1 = arrayTransform[0]+arrayTriangle[0]-arrayTransform[0];
	y1 = arrayTransform[1]+arrayTriangle[1]-arrayTransform[1];
	x2 = arrayTransform[2]+arrayTriangle[0]-arrayTransform[0];
	y2 = arrayTransform[3]+arrayTriangle[1]-arrayTransform[1];
	x3 = arrayTransform[4]+arrayTriangle[0]-arrayTransform[0];
	y3 = arrayTransform[5]+arrayTriangle[1]-arrayTransform[1];

	xEn1 = enConvertVal("x", x1);
	yEn1 = enConvertVal("y", y1);
	xEn2 = enConvertVal("x", x2);
	yEn2 = enConvertVal("y", y2);
	xEn3 = enConvertVal("x", x3);
	yEn3 = enConvertVal("y", y3);

	A = ""+x1+","+y1+"";
	B = ""+x2+","+y2+"";
	C = ""+x3+","+y3+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// var line = "<line class='transResult' x1='"+(x+arrayTriangle[3]/2)+"' y1='"+(y-arrayTriangle[4]/3)+"' x2='"+(x+halfSide)+"' y2='"+(y-t/3)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	// declaration("contentLine",line,400);

	ACoor = ""+xEn1+","+yEn1+"";
	BCoor = ""+xEn2+","+yEn2+"";
	CCoor = ""+xEn3+","+yEn3+"";

	var text1 = "<text class='textZoom transResult' x='"+(x1-5)+"' y='"+(y1-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x2+2)+"' y='"+(y2+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x3-10)+"' y='"+(y3+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[scale]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

}

function translateTriangle(){

	$(".transResult").remove();

	// arrayTriangle [0-5]

	x = getValId("xTranslateT");
	y = getValId("yTranslateT");

	x = x * scale;
	y = y * scale;

	pXTri1 = getValId("pXTri1");
	pYTri1 = getValId("pYTri1");
	pXTri2 = getValId("pXTri2");
	pYTri2 = getValId("pYTri2");
	pXTri3 = getValId("pXTri3");
	pYTri3 = getValId("pYTri3");

	A = ""+(arrayTriangle[0]+x)+","+(arrayTriangle[1]-y)+"";
	B = ""+(arrayTriangle[2]+x)+","+(arrayTriangle[3]-y)+"";
	C = ""+(arrayTriangle[4]+x)+","+(arrayTriangle[5]-y)+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	ACoor = ""+(pXTri1+x/scale)+","+(pYTri1+y/scale)+"";
	BCoor = ""+(pXTri2+x/scale)+","+(pYTri2+y/scale)+"";
	CCoor = ""+(pXTri3+x/scale)+","+(pYTri3+y/scale)+"";

	var text1 = "<text class='textZoom transResult' x='"+(arrayTriangle[0]+x-5)+"' y='"+(arrayTriangle[1]-y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(arrayTriangle[2]+x+2)+"' y='"+(arrayTriangle[3]-y+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTriangle[4]+x-10)+"' y='"+(arrayTriangle[5]-y+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[translate]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);

}

// function translateTriangle(){

// 	$(".transResult").remove();

// 	x = getValId("xTranslateT");
// 	y = getValId("yTranslateT");

// 	x = convertVal("x", "xTranslateT");
// 	y = convertVal("y", "yTranslateT");

// 	var s = arrayTriangle[2];

// 	halfSide = s / 2;
// 	t = Math.sqrt(Math.pow(s, 2) - Math.pow(halfSide, 2));
// 	s = s * scale;
// 	halfSide = halfSide * scale;
// 	t = t * scale;

// 	A = ""+(x+halfSide)+","+(y-t)+"";
// 	B = ""+(x+s)+","+(y)+"";
// 	C = ""+x+","+y+"";

// 	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
// 	declaration("contentLine",pathFinal,400);

// 	var line = "<line class='transResult' x1='"+arrayTriangle[0]+"' y1='"+arrayTriangle[1]+"' x2='"+x+"' y2='"+y+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
// 	declaration("contentLine",line,400);

// 	ACoor = ""+enConvertVal("x", x+halfSide)+","+enConvertVal("y",y-t).toFixed(2)+"";
// 	BCoor = ""+enConvertVal("x", x+s)+","+enConvertVal("y",y)+"";
// 	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";

// 	var text1 = "<text class='textZoom transResult' x='"+(x+halfSide-5)+"' y='"+(y-t-5)+"' font-weight='bold'>A'<text>";
// 	declaration("contentText",text1,400);

// 	var text2 = "<text class='textZoom transResult' x='"+(x+s+2)+"' y='"+(y+10)+"' font-weight='bold'>B'<text>";
// 	declaration("contentText",text2,400);

// 	var text3 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+10)+"' font-weight='bold'>C'<text>";
// 	declaration("contentText",text3,400);

// 	info = "<div class='transResult' style='color: #7630a5'>[trans]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
// 	declaration("statusCal",info,400);

// }

// function scaleTriangle(){

// 	$(".transResult").remove();

// 	var s = arrayTriangle[2];

// 	scaleValT = getValId("scaleValT");

// 	s = s * scaleValT;
// 	console.log(s);

// 	halfSide = s / 2;
// 	t = Math.sqrt(Math.pow(s, 2) - Math.pow(halfSide, 2));
// 	s = s * scale;
// 	halfSide = halfSide * scale;
// 	t = t * scale;
// 	x = arrayTriangle[0];
// 	y = arrayTriangle[1];

// 	A = ""+(x+halfSide)+","+(y-t)+"";
// 	B = ""+(x+s)+","+(y)+"";
// 	C = ""+x+","+y+"";

// 	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
// 	declaration("contentLine",pathFinal,400);

// 	var line = "<line class='transResult' x1='"+(x+arrayTriangle[3]/2)+"' y1='"+(y-arrayTriangle[4]/3)+"' x2='"+(x+halfSide)+"' y2='"+(y-t/3)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
// 	declaration("contentLine",line,400);

// 	ACoor = ""+enConvertVal("x", x+halfSide)+","+enConvertVal("y",y-t).toFixed(2)+"";
// 	BCoor = ""+enConvertVal("x", x+s)+","+enConvertVal("y",y)+"";
// 	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";

// 	var text1 = "<text class='textZoom transResult' x='"+(x+halfSide-5)+"' y='"+(y-t-5)+"' font-weight='bold'>A'<text>";
// 	declaration("contentText",text1,400);

// 	var text2 = "<text class='textZoom transResult' x='"+(x+s+2)+"' y='"+(y+10)+"' font-weight='bold'>B'<text>";
// 	declaration("contentText",text2,400);

// 	var text3 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+10)+"' font-weight='bold'>C'<text>";
// 	declaration("contentText",text3,400);

// 	info = "<div class='transResult' style='color: #7630a5'>[scale]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
// 	declaration("statusCal",info,400);

// }

// function shearTriangle(){

// 	$(".transResult").remove();

// 	shearT = getValId("shearT");
// 	console.log(shearT);
// 	shearT = shearT * scale;

// 	s = arrayTriangle[3];

// 	halfSide = s / 2;
// 	t = arrayTriangle[4];
// 	x = arrayTriangle[0];
// 	y = arrayTriangle[1];

// 	A = ""+(x+halfSide+shearT)+","+(y-t)+"";
// 	B = ""+(x+s)+","+(y)+"";
// 	C = ""+x+","+y+"";

// 	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
// 	declaration("contentLine",pathFinal,400);

// 	ACoor = ""+enConvertVal("x", x+halfSide+shearT)+","+enConvertVal("y",y-t).toFixed(2)+"";
// 	BCoor = ""+enConvertVal("x", x+s)+","+enConvertVal("y",y)+"";
// 	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";

// 	var text1 = "<text class='textZoom transResult' x='"+(x+halfSide+shearT-5)+"' y='"+(y-t-5)+"' font-weight='bold'>A'<text>";
// 	declaration("contentText",text1,400);

// 	var text2 = "<text class='textZoom transResult' x='"+(x+s+2)+"' y='"+(y+10)+"' font-weight='bold'>B'<text>";
// 	declaration("contentText",text2,400);

// 	var text3 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+10)+"' font-weight='bold'>C'<text>";
// 	declaration("contentText",text3,400);

// 	info = "<div class='transResult' style='color: #7630a5'>[shear]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
// 	declaration("statusCal",info,400);

// }

function shearXTriangle(){

	$(".transResult").remove();

	// arrayTriangle [0-5]

	pXTri1 = getValId("pXTri1");
	pYTri1 = getValId("pYTri1");
	pXTri2 = getValId("pXTri2");
	pYTri2 = getValId("pYTri2");
	pXTri3 = getValId("pXTri3");
	pYTri3 = getValId("pYTri3");

	shearT = getValId("shearT");
	shearT = shearT * scale;

	A = ""+arrayTriangle[0]+","+arrayTriangle[1]+"";
	B = ""+(arrayTriangle[2]+shearT)+","+arrayTriangle[3]+"";
	C = ""+arrayTriangle[4]+","+arrayTriangle[5]+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	ACoor = ""+pXTri1+","+pYTri1+"";
	BCoor = ""+(pXTri2+shearT/scale)+","+pYTri2+"";
	CCoor = ""+pXTri3+","+pYTri3+"";

	var text1 = "<text class='textZoom transResult' x='"+(arrayTriangle[0]-5)+"' y='"+(arrayTriangle[1]-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+((arrayTriangle[2]+shearT)+2)+"' y='"+(arrayTriangle[3]+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTriangle[4]-10)+"' y='"+(arrayTriangle[5]+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[shear X]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);

}

function shearYTriangle(){

	$(".transResult").remove();

	// arrayTriangle [0-5]

	pXTri1 = getValId("pXTri1");
	pYTri1 = getValId("pYTri1");
	pXTri2 = getValId("pXTri2");
	pYTri2 = getValId("pYTri2");
	pXTri3 = getValId("pXTri3");
	pYTri3 = getValId("pYTri3");

	shearT = getValId("shearT");
	shearT = shearT * scale;

	A = ""+arrayTriangle[0]+","+arrayTriangle[1]+"";
	B = ""+arrayTriangle[2]+","+arrayTriangle[3]+"";
	C = ""+arrayTriangle[4]+","+(arrayTriangle[5]-shearT)+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+pXTri1+","+pYTri1+"";
	BCoor = ""+pXTri2+","+pYTri2+"";
	CCoor = ""+pXTri3+","+(pYTri3+shearT/scale)+"";

	var text1 = "<text class='textZoom transResult' x='"+(arrayTriangle[0]-5)+"' y='"+(arrayTriangle[1]-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(arrayTriangle[2]+2)+"' y='"+(arrayTriangle[3]+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTriangle[4]-10)+"' y='"+((arrayTriangle[5]-shearT)+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[shear Y]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);

}

function rotateT(){

	$(".transResult").remove();

	xEn1 = enConvertVal("x", arrayTriangle[0]);
	yEn1 = enConvertVal("y", arrayTriangle[1]);
	xEn2 = enConvertVal("x", arrayTriangle[2]);
	yEn2 = enConvertVal("y", arrayTriangle[3]);
	xEn3 = enConvertVal("x", arrayTriangle[4]);
	yEn3 = enConvertVal("y", arrayTriangle[5]);

	centerPointX = ( xEn1 + xEn2 + xEn3 ) / 3;
	centerPointY = ( yEn1 + yEn2 + yEn3 ) / 3;

	angle = getValId("angleT");
	angle = angle * (Math.PI / 180);

	a = rotatePoint(angle, xEn1, yEn1, centerPointX, centerPointY);
	aX = a.x;
	aY = a.y;

	b = rotatePoint(angle, xEn2, yEn2, centerPointX, centerPointY);
	bX = b.x;
	bY = b.y;

	c = rotatePoint(angle, xEn3, yEn3, centerPointX, centerPointY);
	cX = c.x;
	cY = c.y;

	a1 = justConvertVal("x", aX);
	a2 = justConvertVal("y", aY);
	b1 = justConvertVal("x", bX);
	b2 = justConvertVal("y", bY);
	c1 = justConvertVal("x", cX);
	c2 = justConvertVal("y", cY);

	A = ""+a1+","+a2+"";
	B = ""+b1+","+b2+"";
	C = ""+c1+","+c2+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	ACoor = ""+aX.toFixed(2)+"<strong> , </strong>"+aY.toFixed(2)+"";
	BCoor = ""+bX.toFixed(2)+"<strong> , </strong>"+bY.toFixed(2)+"";
	CCoor = ""+cX.toFixed(2)+"<strong> , </strong>"+cY.toFixed(2)+"";

	var text1 = "<text class='textZoom transResult' x='"+(a1-10)+"' y='"+(a2-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(b1+3)+"' y='"+(b2-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(c1+3)+"' y='"+(c2+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[rotate]</br> <strong>A'</strong>("+ACoor+") <strong>B'</strong>("+BCoor+") <strong>C'</strong>("+CCoor+")</div>";
	declaration("statusCal",info,400);

}
function mirrorXT(){

	$(".transResult").remove();

	var arrayTransform = new Array();
	var arrayTransformId = new Array();

	for (var i = 0; i <= 5; i++) {
		if (i%2 == 0) {
			arrayTransform.push(arrayTriangle[i]);
			arrayTransformId.push(enConvertVal("x", arrayTriangle[i]));
		} else {
			finalVal = justConvertVal("y", enConvertVal("y", arrayTriangle[i]) * (-1))
			arrayTransform.push(finalVal);
			arrayTransformId.push(enConvertVal("y", finalVal));
		}
	};

	A = ""+arrayTransform[0]+","+arrayTransform[1]+"";
	B = ""+arrayTransform[2]+","+arrayTransform[3]+"";
	C = ""+arrayTransform[4]+","+arrayTransform[5]+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+arrayTransformId[0]+","+arrayTransformId[1]+"";
	BCoor = ""+arrayTransformId[2]+","+arrayTransformId[3]+"";
	CCoor = ""+arrayTransformId[4]+","+arrayTransformId[5]+"";

	var text1 = "<text class='textZoom transResult' x='"+(arrayTransform[0]-5)+"' y='"+(arrayTransform[1]-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(arrayTransform[2]+2)+"' y='"+(arrayTransform[3]+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTransform[4]-10)+"' y='"+(arrayTransform[5]+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror X]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);	

}
function mirrorYT(){

	$(".transResult").remove();

	var arrayTransform = new Array();
	var arrayTransformId = new Array();

	for (var i = 0; i <= 5; i++) {
		if (i%2 == 1) {
			arrayTransform.push(arrayTriangle[i]);
			arrayTransformId.push(enConvertVal("y", arrayTriangle[i]));
		} else {
			finalVal = justConvertVal("x", enConvertVal("x", arrayTriangle[i]) * (-1))
			arrayTransform.push(finalVal);
			arrayTransformId.push(enConvertVal("x", finalVal));
		}
	};

	A = ""+arrayTransform[0]+","+arrayTransform[1]+"";
	B = ""+arrayTransform[2]+","+arrayTransform[3]+"";
	C = ""+arrayTransform[4]+","+arrayTransform[5]+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+arrayTransformId[0]+","+arrayTransformId[1]+"";
	BCoor = ""+arrayTransformId[2]+","+arrayTransformId[3]+"";
	CCoor = ""+arrayTransformId[4]+","+arrayTransformId[5]+"";

	var text1 = "<text class='textZoom transResult' x='"+(arrayTransform[0]-5)+"' y='"+(arrayTransform[1]-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(arrayTransform[2]+2)+"' y='"+(arrayTransform[3]+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTransform[4]-10)+"' y='"+(arrayTransform[5]+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror Y]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);	

}
function mirrorXYT(){

	$(".transResult").remove();

	var arrayTransform = new Array();
	var arrayTransformId = new Array();

	for (var i = 0; i <= 5; i++) {
		if (i%2 == 0) {
			finalVal = justConvertVal("x", enConvertVal("x", arrayTriangle[i]) * (-1))
			arrayTransform.push(finalVal);
			arrayTransformId.push(enConvertVal("x", finalVal));
		} else {
			finalVal = justConvertVal("y", enConvertVal("y", arrayTriangle[i]) * (-1))
			arrayTransform.push(finalVal);
			arrayTransformId.push(enConvertVal("y", finalVal));
		}
	};

	A = ""+arrayTransform[0]+","+arrayTransform[1]+"";
	B = ""+arrayTransform[2]+","+arrayTransform[3]+"";
	C = ""+arrayTransform[4]+","+arrayTransform[5]+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	// ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	// BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	// CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";

	ACoor = ""+arrayTransformId[0]+","+arrayTransformId[1]+"";
	BCoor = ""+arrayTransformId[2]+","+arrayTransformId[3]+"";
	CCoor = ""+arrayTransformId[4]+","+arrayTransformId[5]+"";

	var mLine = "<line class='transResult' x1='"+(center*2)+"' y1='"+0+"' x2='"+0+"' y2='"+(center*2)+"' stroke='silver' stroke-width='2px'/> <text class='transResult' x="+30+" y="+10+" fill='silver' stroke='none' transform='rotate(45)'>X = Y</text>";
	declaration("contentLine",mLine,400);

	var text1 = "<text class='textZoom transResult' x='"+(arrayTransform[0]-5)+"' y='"+(arrayTransform[1]-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(arrayTransform[2]+2)+"' y='"+(arrayTransform[3]+10)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(arrayTransform[4]-10)+"' y='"+(arrayTransform[5]+10)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror XY]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+")</div>";
	declaration("statusCal",info,400);

	$(".triangleT").slideDown(300);	

}

function rotateRect(){

	$(".transResult").remove();

	x = enConvertVal("x", arrayRect[0]);
	y = enConvertVal("y", arrayRect[1]);
	w = arrayRect[2] / scale;
	h = arrayRect[3] / scale;


	centerX = x + w / 2;
	centerY = y - h / 2;

	angle = getValId("angleRect");
	angle = angle * (Math.PI / 180);

	a = rotatePoint(angle, x, y, centerX, centerY);
	aX = a.x;
	aY = a.y;

	b = rotatePoint(angle, (x + w), y, centerX, centerY);
	bX = b.x;
	bY = b.y;

	c = rotatePoint(angle, (x + w), (y - h), centerX, centerY);
	cX = c.x;
	cY = c.y;

	d = rotatePoint(angle, x, (y - h), centerX, centerY);
	dX = d.x;
	dY = d.y;

	a1 = justConvertVal("x", aX);
	a2 = justConvertVal("y", aY);
	b1 = justConvertVal("x", bX);
	b2 = justConvertVal("y", bY);
	c1 = justConvertVal("x", cX);
	c2 = justConvertVal("y", cY);
	d1 = justConvertVal("x", dX);
	d2 = justConvertVal("y", dY);

	A = ""+a1+","+a2+"";
	B = ""+b1+","+b2+"";
	C = ""+c1+","+c2+"";
	D = ""+d1+","+d2+"";

	var pathFinal = "<path class='transResult' d='M "+A+" L "+B+" "+C+" "+D+" "+A+"' fill='none' stroke='#7630a5' stroke-width='2px'/>";
	declaration("contentLine",pathFinal,400);

	ACoor = ""+aX.toFixed(2)+"<strong> , </strong>"+aY.toFixed(2)+"";
	BCoor = ""+bX.toFixed(2)+"<strong> , </strong>"+bY.toFixed(2)+"";
	CCoor = ""+cX.toFixed(2)+"<strong> , </strong>"+cY.toFixed(2)+"";
	DCoor = ""+dX.toFixed(2)+"<strong> , </strong>"+dY.toFixed(2)+"";

	var text1 = "<text class='textZoom transResult' x='"+(a1-10)+"' y='"+(a2-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(b1+3)+"' y='"+(b2-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(c1+3)+"' y='"+(c2+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(d1-10)+"' y='"+(d2+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[rotate]</br> <strong>A'</strong>("+ACoor+") <strong>B'</strong>("+BCoor+") <strong>C'</strong>("+CCoor+") <strong>D'</strong>("+DCoor+")</div>";
	declaration("statusCal",info,400);

}


function mirrorX(){

	$(".transResult").remove();

	x = arrayRect[0];
	y = justConvertVal("y", enConvertVal("y", arrayRect[1]) * (-1));
	w = arrayRect[2];
	h = arrayRect[3];
	y = y - h;

	var rect = "<rect class='transResult' x='"+x+"' y='"+y+"' height='"+h+"' width='"+w+"' stroke='#7630a5' fill='none'/>";
	declaration("contentLine",rect,400);

	console.log(y);

	var line = "<line class='transResult' x1='"+(arrayRect[0]+arrayRect[2]/2)+"' y1='"+(arrayRect[1]+arrayRect[3]/2)+"' x2='"+(x+w/2)+"' y2='"+(y+h/2)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	declaration("contentLine",line,400);

	DCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	CCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	BCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	ACoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror X]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);	

}

function mirrorY(){

	$(".transResult").remove();

	x = justConvertVal("x", enConvertVal("x", arrayRect[0]) * (-1));
	y = arrayRect[1];
	w = arrayRect[2];
	h = arrayRect[3];
	x = x - w;

	var rect = "<rect class='transResult' x='"+x+"' y='"+y+"' height='"+h+"' width='"+w+"' stroke='#7630a5' fill='none'/>";
	declaration("contentLine",rect,400);

	console.log(y);

	var line = "<line class='transResult' x1='"+(arrayRect[0]+arrayRect[2]/2)+"' y1='"+(arrayRect[1]+arrayRect[3]/2)+"' x2='"+(x+w/2)+"' y2='"+(y+h/2)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	declaration("contentLine",line,400);

	BCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	ACoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	DCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror Y]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);	

}

function mirrorXY(){

	$(".transResult").remove();

	x = justConvertVal("x", enConvertVal("x", arrayRect[0]) * (-1));
	y = justConvertVal("y", enConvertVal("y", arrayRect[1]) * (-1));
	w = arrayRect[2];
	h = arrayRect[3];
	x = x - w;
	y = y - h;

	var rect = "<rect class='transResult' x='"+x+"' y='"+y+"' height='"+h+"' width='"+w+"' stroke='#7630a5' fill='none'/>";
	declaration("contentLine",rect,400);

	console.log(y);

	var line = "<line class='transResult' x1='"+(arrayRect[0]+arrayRect[2]/2)+"' y1='"+(arrayRect[1]+arrayRect[3]/2)+"' x2='"+(x+w/2)+"' y2='"+(y+h/2)+"' stroke='#7630a5' stroke-dasharray='10 10' stroke-width='2px' marker-start='url(#mC4)' marker-end='url(#mT4)'/>";
	declaration("contentLine",line,400);

	var mLine = "<line class='transResult' x1='"+0+"' y1='"+0+"' x2='"+(center*2)+"' y2='"+(center*2)+"' stroke='silver' stroke-width='2px'/> <text class='transResult' x="+30+" y="+10+" fill='silver' stroke='none' transform='rotate(45)'>X = Y</text>";
	declaration("contentLine",mLine,400);


	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";
	DCoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y)+"";
	ACoor = ""+enConvertVal("x", x+width)+","+enConvertVal("y",y+height)+"";
	BCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y+height)+"";

	var text1 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y-5)+"' font-weight='bold'>A'<text>";
	declaration("contentText",text1,400);

	var text2 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y-5)+"' font-weight='bold'>D'<text>";
	declaration("contentText",text2,400);

	var text3 = "<text class='textZoom transResult' x='"+(x+width+3)+"' y='"+(y+height+12)+"' font-weight='bold'>C'<text>";
	declaration("contentText",text3,400);

	var text4 = "<text class='textZoom transResult' x='"+(x-10)+"' y='"+(y+height+12)+"' font-weight='bold'>B'<text>";
	declaration("contentText",text4,400);

	info = "<div class='transResult' style='color: #7630a5'>[mirror XY]</br> A'("+ACoor+") B'("+BCoor+") C'("+CCoor+") D'("+DCoor+")</div>";
	declaration("statusCal",info,400);	

}

function createCircle(){

	$(".activeTriangle").remove();
	$(".activeRect").remove();
	$(".activeCircle").remove();
	$(".transResult").remove();
	$(".rectT").slideUp(300);
	$(".triangleT").slideUp(300);

	x = getValId("xCircle");
	y = getValId("yCircle");

	x = convertVal("x", "xCircle");
	y = convertVal("y", "yCircle");

	s = getValId("rCircle") * scale;

	// var pathFinal = "<path class='activeTriangle' d='M "+A+" L "+B+" "+C+" "+A+"' fill='none' stroke='#3071a9' stroke-width='2px'/>";
	var pathFinal = "<circle class='activeCircle' cx="+x+" cy="+y+" r="+s+" stroke='#3071a9' stroke-width='3' fill='none'/>";
	declaration("contentLine",pathFinal,400);
	var pathFinal = "<circle class='activeCircle' cx="+x+" cy="+y+" r='1' stroke='#3071a9' stroke-width='3' fill='none'/>";
	declaration("contentLine",pathFinal,400);

	CCoor = ""+enConvertVal("x", x)+","+enConvertVal("y",y)+"";

	var text1 = "<text class='textZoom activeTriangle' x='"+(x-5)+"' y='"+(y-5)+"' font-weight='bold'>C<text>";
	declaration("contentText",text1,400);

	info = "<div class='activeCircle' style='color: #3071a9'>[circle]</br> C("+CCoor+") R("+(s/scale)+")</div>";
	declaration("statusCal",info,400);


}
