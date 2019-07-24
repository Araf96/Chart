var app = angular.module("demo", []);
var datainput =[];
var dataconfig =[];
var sorted_data =[];
var canvasid="";

			
		    

app.factory('library', function() {
    return {
        //_$runbarchart:function(canvas_id,inputdata,configdata){
        _$runchart:function(canvas_id,inputdata,configdata){
			var flag=0;
			datainput=inputdata;
			dataconfig=configdata;
			canvasid=canvas_id;
			for (var k=0;k<datainput.length;k++) {
				sorted_data[k] = inputdata[k];
			}
			if(dataconfig[10].value=="funnel")
			{
				_$funnelchart();
			}
			else if(dataconfig[10].value=="bar"){
				_$barchart();
			}						
		}  
    };
});



			
				

var _$funnelchart=function(){

	
    var temp_canvas = document.getElementById(this.canvasid);
    var context = temp_canvas.getContext('2d');


    var wid = dataconfig[3].value;
    var hgt = dataconfig[4].value;

    temp_canvas.width = wid;
    temp_canvas.height = hgt;

    var tot_val = 0;

    var n_hgt = Number(hgt);
    var n_wid = Number(wid);


    var first_x = Math.round(n_wid*.2);
    var first_y = Math.round(n_hgt*.2);

    var second_x = Math.round(n_wid*.5);
    var second_y = Math.round(n_hgt*.8);

    var third_x = Math.round(n_wid*.8);
    var third_y = Math.round(n_hgt*.2);

    var x_diff = (third_x - first_x)/(datainput.length*2);
    var y_diff = (second_y - first_y)/datainput.length;

    var inc = (third_x - first_x)/(datainput.length*2);

    sorted_data.sort(function(a, b){
            return parseFloat(b.value) - parseFloat(a.value);
    });    


    for(var p=0;p<datainput.length;p++){
    	tot_val = tot_val + datainput[p].value;
    }

    var line_x_s = first_x - x_diff;
    var line_x_e = third_x + x_diff;
    var line_y = first_y;
    //set_font
    var font_sz =  dataconfig[2].value+" "+dataconfig[1].value+"px"+" "+dataconfig[0].value;
    context.font = font_sz;

    var mid = n_wid/2;


    var diffrence = line_x_e - line_x_s;

    var color = ['red', 'blue', 'yellow', 'grey', 'green', 'orange','lightsalmon',"indianred","darkorange",
	    	"darkkhaki","khaki","lawngreen","chartreuse","limegreen","greenyellow","springgreen","mediumspringgreen",
	    	"lightgreen","palegreen","mediumseagreen","olivedrab","aqua","darkcyan","turquoise","cornflowerblue",
	    	"fuchsia","violet","silver","mistyrose"];

    //number alignment
    if(dataconfig[12].value=="number"){
    	    	    //draw funnelChart
	    for(var i=0;i<sorted_data.length;i++)
	    {
	    	let idx=0;
	    	for(var l=0;l<datainput.length;l++){
	    		if((sorted_data[i].status == datainput[l].status) && (sorted_data[i].value == datainput[l].value))
	    		{
	    			idx = l;    			
	    			break;
	    		}
	    	}
	    	
			var strokeStyle = color[Math.floor(Math.random() * color.length)];
	    	
			var proportion = datainput[idx].value/sorted_data[0].value;
	        
	        var lng = (diffrence*proportion)/2;

	        //console.log(lng);

	        var ang = lng*.3;

	        context.beginPath();
	        context.moveTo((mid-lng)+x_diff, line_y+(idx*y_diff)+10);
	        context.lineTo(mid+lng+x_diff, line_y+(idx*y_diff)+10);
	        context.lineTo( mid+lng - ang +x_diff, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng + ang+x_diff, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng+x_diff, line_y+(idx*y_diff)+10);

	        //context.fillStyle = '#'+ Math.random().toString().slice(3,6);
	        context.fillStyle = strokeStyle;
	        context.fill();
	        context.stroke();
	        context.closePath();


	        
	    	//write text 
		    context.fillStyle = dataconfig[11].value;
		    //context.font = "15px Arial";
		    let status_len =  context.measureText(datainput[idx].status).width;
		    let value_len =  context.measureText(datainput[idx].value).width;
		    // var total_len = status_len;


	        let tempImage = new Image();
		    tempImage.src = datainput[idx].image;



		    let text_x = (mid-lng)+x_diff-status_len;
            let text_y = (line_y+(idx*y_diff)+(y_diff/2));
            //console.log("len: "+ (text_x-status_len));
            //let align = total_len/2;
            if((text_x-status_len)<0){
            	let change_font = Number(dataconfig[1].value);
            	for(let k=change_font;k>=10;k--)
            	{
            		context.font = dataconfig[2].value+" "+ k.toString()+"px"+" "+dataconfig[0].value;
//k.toString()+"px"+" "+dataconfig[1].value+" "+dataconfig[0].value;
            		let temp_len = context.measureText(datainput[idx].status).width;
            		text_x = (mid-lng+ang) - temp_len ;
            		if((text_x - temp_len)<0)
            		{
            			continue;
            		}
            		else{
            			break;
            		}
            	}
            }
            context.fillText(datainput[idx].status,text_x, text_y+(y_diff*.1));
            tempImage.onload = function() {
			    context.drawImage(tempImage, text_x - (.6*x_diff), text_y - (y_diff*.1), x_diff*.5, y_diff*.25);
			}

			context.font = font_sz;
			context.fillText(datainput[idx].value,mid-lng + ang+x_diff, text_y+(y_diff*.1));

			
	    }
    }
    else if(dataconfig[12].value=="none"){
    	for(var i=0;i<sorted_data.length;i++)
	    {
	    	let idx=0;
	    	for(var l=0;l<datainput.length;l++){
	    		if((sorted_data[i].status == datainput[l].status) && (sorted_data[i].value == datainput[l].value))
	    		{
	    			idx = l;    			
	    			break;
	    		}
	    	}
	    	
			var strokeStyle = color[Math.floor(Math.random() * color.length)];
	    	
			var proportion = datainput[idx].value/sorted_data[0].value;
	        
	        var lng = (diffrence*proportion)/2;

	        //console.log(lng);

	        var ang = lng*.3;

	        context.beginPath();
	        context.moveTo((mid-lng)+x_diff, line_y+(idx*y_diff)+10);
	        context.lineTo(mid+lng+x_diff, line_y+(idx*y_diff)+10);
	        context.lineTo( mid+lng - ang +x_diff, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng + ang+x_diff, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng+x_diff, line_y+(idx*y_diff)+10);

	        //context.fillStyle = '#'+ Math.random().toString().slice(3,6);
	        context.fillStyle = strokeStyle;
	        context.fill();
	        context.stroke();
	        context.closePath();


	        
	    	//write text 
		    context.fillStyle = dataconfig[11].value;
		    //context.font = "15px Arial";
		    let status_len =  context.measureText(datainput[idx].status).width;
		    let value_len =  context.measureText(datainput[idx].value).width;
		    let total_len = status_len+value_len;


	        let tempImage = new Image();
		    tempImage.src = datainput[idx].image;


		    let text_x = (mid-lng)+x_diff- total_len ;
            let text_y = (line_y+(idx*y_diff)+(y_diff/2));
            //console.log("len: "+ (text_x-status_len));
            //let align = total_len/2;
            if((text_x-total_len)<0){
            	let change_font = Number(dataconfig[1].value);
            	for(let k=change_font;k>=10;k--)
            	{
            		context.font = dataconfig[2].value+" "+ k.toString()+"px"+" "+dataconfig[0].value;
//k.toString()+"px"+" "+dataconfig[1].value+" "+dataconfig[0].value;
            		let temp_len = context.measureText(datainput[idx].status+""+datainput[idx].value).width;
            		text_x = (mid-lng+ang) - temp_len ;
            		if((text_x - temp_len)<0)
            		{
            			continue;
            		}
            		else{
            			break;
            		}
            	}
            }
            context.fillText(datainput[idx].status+":"+datainput[idx].value,text_x-4, text_y+(y_diff*.1));
            tempImage.onload = function() {
			    context.drawImage(tempImage, text_x - (.6*x_diff)-4, text_y - (y_diff*.1), x_diff*.5, y_diff*.25);
			}

			context.font = font_sz;
			//context.fillText(datainput[idx].value,mid-lng + ang+x_diff, text_y+(y_diff*.1));

			
	    }
    }
    else{
    	    //draw funnelChart
	    for(var i=0;i<sorted_data.length;i++)
	    {


	    	let idx=0;
	    	for(var l=0;l<datainput.length;l++){
	    		if((sorted_data[i].status == datainput[l].status) && (sorted_data[i].value == datainput[l].value))
	    		{
	    			idx = l;
	    			
	    			break;
	    		}
	    	}


	    	
			var strokeStyle = color[Math.floor(Math.random() * color.length)];
	    	
			var proportion = datainput[idx].value/sorted_data[0].value;

	    	/*context.beginPath();
	        context.moveTo((line_x_s+(i*x_diff)), line_y+(idx*y_diff)+10);
	        context.lineTo((line_x_e-(i*x_diff)), line_y+(idx*y_diff)+10);
	        context.lineTo((line_x_e-(i*x_diff) - x_diff), line_y+(idx*y_diff) + y_diff);
	        context.lineTo((line_x_s+(i*x_diff) + x_diff), line_y+(idx*y_diff) + y_diff);
	        context.lineTo((line_x_s+(i*x_diff)), line_y+(idx*y_diff)+10);

	        //context.fillStyle = '#'+ Math.random().toString().slice(3,6);
	        context.fillStyle = strokeStyle;
	        context.fill();
	        context.stroke();
	        context.closePath();*/

	        
	        var lng = (diffrence*proportion)/2;

	        //console.log(lng);

	        var ang = lng*.3;

	        context.beginPath();
	        context.moveTo(mid-lng, line_y+(idx*y_diff)+10);
	        context.lineTo(mid+lng, line_y+(idx*y_diff)+10);
	        context.lineTo( mid+lng - ang, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng + ang, line_y+(idx*y_diff) + y_diff);
	        context.lineTo(mid-lng, line_y+(idx*y_diff)+10);

	        //context.fillStyle = '#'+ Math.random().toString().slice(3,6);
	        context.fillStyle = strokeStyle;
	        context.fill();
	        context.stroke();
	        context.closePath();


	        
	    	//write text 
		    context.fillStyle = dataconfig[11].value;
		    //context.font = "15px Arial";
		    var status_len =  context.measureText(datainput[idx].status).width;
		    var value_len =  context.measureText(datainput[idx].value).width;
		    var total_len = status_len+value_len;


	        let tempImage = new Image();
		    tempImage.src = datainput[idx].image;
		  

	       if(dataconfig[6].value == "left")
	        {
	            let text_x = (line_x_s+(i*x_diff) + (x_diff/2));
	            //var text_y = (line_y+line_y+y_diff)/2;
	            let text_y = (line_y+(idx*y_diff)+(y_diff/2));
	            context.fillText(datainput[idx].status+": "+datainput[idx].value,text_x+(x_diff*.8), text_y+(y_diff*.1));
	            tempImage.onload = function() {
					context.drawImage(tempImage, text_x+(.2*x_diff), text_y - (y_diff*.1), x_diff*.5, y_diff*.25);
				}
	        }
	        else if(dataconfig[6].value == "right"){
	        	let temp_rx = line_x_e - (i*x_diff)- x_diff; 
	        	let text_x = temp_rx - total_len;
	        	//var text_y = (line_y+line_y+y_diff)/2;
	        	let text_y = (line_y+(idx*y_diff)+(y_diff/2));
	        	context.fillText(datainput[idx].status+": "+datainput[idx].value,text_x, text_y+(y_diff*.1));
			    tempImage.onload = function() {
				    context.drawImage(tempImage, text_x - (.6*x_diff), text_y - (y_diff*.1), x_diff*.5, y_diff*.25);
				}
	        }
	        else{
	            let text_x = (line_x_s + line_x_e)/2;
	            let text_y = (line_y+(idx*y_diff)+(y_diff/2));
	            let align = total_len/2;
	            context.fillText(datainput[idx].status+": "+datainput[idx].value,text_x-align, text_y+(y_diff*.1));
	            tempImage.onload = function() {
				    context.drawImage(tempImage, text_x-align - (.6*x_diff), text_y - (y_diff*.1), x_diff*.5, y_diff*.25);
				}
	        }

	    }
    }    
}			

			
		
		

			

			

			
var _$barchart=function() {


	var json=JSON.parse(JSON.stringify(datainput));

	var jsonconfig=JSON.parse(JSON.stringify(dataconfig));

	
	
	//var json=JSON.parse($scope.datainput);
	//console.log(json[0].status);


	

	
	var cheight=jsonconfig[3].value;
	var cwidth=jsonconfig[4].value;

	
	var newx;
	var newy;
	
	for(var k=0;k<=1;k++){
		var c = document.getElementById(this.canvasid);
		c.width=cwidth;
		c.height=cheight;
		
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, cwidth, cheight);

		ctx.fillStyle = jsonconfig[5].value;
		ctx.fillRect(0, 0, c.width, c.height);

		ctx.fillStyle ="black";//color for font
		//console.log(cwidth);
		//console.log(cheight);


		

		var maxwidth=0;
		var maxvalue=0;
		var textwidth=0;
		
		ctx.scale(cwidth/1920,cheight/1080);
		ctx.translate(newx,newy);

		//var verlegth=[];
		var horlength=[];
		//ctx.scale(1,1);
		var verlegth=0;
		

		var totalvalue=0;
		var statuswidth=0;

		for(var i=0;i<json.length;i++){//printing the status and value member of json
			var tempfont=jsonconfig[2].value+' '+jsonconfig[1].value+' '+jsonconfig[0].value;
			ctx.font = tempfont;
			
			var strings=json[i].status+"("+json[i].value+")";
			var statustring=json[i].status;

			if(ctx.measureText(statustring).width>statuswidth){
				statuswidth=ctx.measureText(statustring).width;
			}	

			if(ctx.measureText(strings).width>maxwidth){
				maxwidth=ctx.measureText(strings).width;
				var tempstr=json[i].status;
				textwidth=ctx.measureText(tempstr).width;
			} 

			if(Number(json[i].value)>maxvalue){
				maxvalue=Number(json[i].value);      //updating the max value of json
			}
			totalvalue=totalvalue+Number(json[i].value);
			

		}
		var statusvpix=20;

		for(var i=0;i<json.length;i++){
			strings=json[i].status;
			var tempval=(statuswidth-ctx.measureText(strings).width);
			ctx.fillText(strings, 0+tempval, statusvpix);
			statusvpix+=45;
		}
		maxvalue=maxvalue+maxvalue+maxwidth;//maxvalue is the higest range of pixel of bar
		
		var barsize=Number(jsonconfig[7].value);         //size of the small bar
		var nbar=0;				//number of bar
		var vpix=0		//vertical start pixel at for bar
		var scaleing=1; 

		var barspace=jsonconfig[8].value;
		        //scaling number for dynamic page
		if(maxvalue>c.width){
			scaleing=maxvalue/(1920-maxwidth);			
		}
		
		//console.log(maxvalue);
		//console.log(scaleing);


		var imagePaper = new Image();
		imagePaper.src = jsonconfig[9].value;

		imagePaper.onload = function(){
			vpix=0;
			var statusvpix=20;
			for(var i=0;i<json.length;i++){
				var hpix=textwidth+15; //horizontal pixel start at for bar
				
				var value=Number(json[i].value) ;
				//scaleing=1;
				nbar=((value)/barsize)/scaleing; //number of required bar
				nbar=parseInt(nbar);
				//console.log(nbar)


				
				for(var j=0;j<nbar;j++){
					ctx.drawImage(imagePaper,hpix,vpix,barsize,barsize);
					//ctx.fillRect(hpix,vpix,barsize,barsize);
					hpix+=barsize*barspace;
				}


				var tempvalue1=(Number(json[i].value)/totalvalue)*100
				tempvalue1=tempvalue1.toFixed(2);
				var tempvalue="("+tempvalue1+"%)";
				ctx.fillText(tempvalue, hpix, statusvpix);
				hpix+=ctx.measureText(tempvalue).width
				var num=Number(hpix)+75;
				//horlength.push(num);
				//console.log((horlength.length)+" maxhorlength");//something needs to be done here for alignment
				vpix+=45;
				statusvpix+=45;
			}
		}


		// this block is for calculation
		{	vpix=0;
			var statusvpix=20;
			for(var i=0;i<json.length;i++){
				var hpix=textwidth+15; //horizontal pixel start at for bar
				
				var value=Number(json[i].value) ;
				//scaleing=1;
				nbar=((value)/barsize)/scaleing; //number of required bar
				nbar=parseInt(nbar);
				//console.log(nbar)


				
				for(var j=0;j<nbar;j++){
					//ctx.drawImage(imagePaper,hpix,vpix,barsize,barsize);
					//ctx.fillRect(hpix,vpix,barsize,barsize);
					hpix+=barsize*barspace;
				}


				var tempvalue1=(Number(json[i].value)/totalvalue)*100
				tempvalue1=tempvalue1.toFixed(2);
				var tempvalue="("+tempvalue1+"%)";
				//ctx.fillText(tempvalue, hpix, statusvpix);
				hpix+=ctx.measureText(tempvalue).width
				var num=Number(hpix)+75;
				horlength.push(num);
				//console.log((horlength.length)+" maxhorlength");//something needs to be done here for alignment
				vpix+=45;
				statusvpix+=45;
			}
		}
		


		//console.log((horlength.length)+" maxhorlength");
		//console.log(horlength);
		var maxhorlength=0;
		
		for(var a=0;a<horlength.length;a++){

			if(maxhorlength<Number(horlength[a])){
				maxhorlength=Number(horlength[a]);

			}
		}
		//console.log("hello "+maxhorlength);
		verlegth=vpix-15;


		if(jsonconfig[6].value=="centerleft"){
			newx=0;
			newy=(1080-verlegth)/2;
		}
		else if(jsonconfig[6].value=="center"){
			newx=(1920-maxhorlength)/2;
			newy=(1080-verlegth)/2;
		}
		else if(jsonconfig[6].value=="centerright"){
			newx=1920-maxhorlength+75;
			newy=(1080-verlegth)/2;
		}

		else if(jsonconfig[6].value=="topleft"){
			newx=0;
			newy=0;
		}
		else if(jsonconfig[6].value=="topright"){
			newx=1920-maxhorlength+75;
			newy=0;
		}
		else if(jsonconfig[6].value=="bottomleft"){
			newx=0;
			newy=1080-verlegth;
		}
		else if(jsonconfig[6].value=="bottomright"){
			newx=1920-maxhorlength+75;;
			newy=1080-verlegth;
		}


		


		//newx=(1920-maxhorlength)/2
		//newy=(1080-verlegth)/2;

	

	
		//console.log(verlegth);
	
	}	
	
  

}


   
   //$scope.myrunner();
 
	
