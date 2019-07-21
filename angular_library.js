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
			sorted_data = inputdata;
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

    var line_x_s = first_x;
    var line_x_e = third_x;
    var line_y = first_y;
    //set_font
    var font_sz =  dataconfig[2].value+" "+dataconfig[1].value+" "+dataconfig[0].value;
    context.font = font_sz;

    //size configuration
    var flg = 0;
    var i = 0;
    var cnt = 0;
    do{
        var line_x_s_t = line_x_s;
        var line_x_e_t = line_x_e;
 
        flg = 0;
        cnt++;

        for(var l = 0;l<datainput.length;l++)
        {
            var check_x_s = line_x_s_t + Math.round(inc/2);
            var check_x_e = line_x_e_t - Math.round(inc/2);
            var check_fit = check_x_e - check_x_s;

            var temp_stat = context.measureText(datainput[l].status).width;
            var temp_val = context.measureText(datainput[l].value).width;

            var total =temp_stat + temp_val;

            if(total+10>=check_fit)
            {
                line_x_s = line_x_s - x_diff;
                line_x_e = line_x_e + x_diff;
                flg = 1;
            }
            line_x_s_t = line_x_s_t + x_diff;
            line_x_e_t = line_x_e_t - x_diff;
        }
        
    }while(flg!=0);
    
    //draw funnelChart
    for(var i=0;i<datainput.length;i++)
    {
        if(i==(datainput.length-1))
        {
        	//draw line
            context.beginPath();
            context.moveTo(line_x_s, line_y+10);
            context.lineTo(line_x_e, line_y+10);
            context.lineTo(line_x_e - x_diff + 10  , line_y + y_diff - 10);
            context.lineTo(line_x_s + x_diff - 10, line_y + y_diff - 10);
            context.lineTo(line_x_s, line_y+10);
            context.fillStyle = '#'+ Math.random().toString().slice(3,6);
            context.fill();
            context.stroke();
            context.closePath();

            //write text
        
            context.fillStyle = dataconfig[11].value;

            var status_len =  context.measureText(datainput[i].status).width;
            var value_len =  context.measureText(datainput[i].value).width;
            var total_len = status_len+value_len;

            if(dataconfig[6].value == "left")
            {
                var text_x = (line_x_s + x_diff);
                var text_y = (line_y+line_y+y_diff)/2+5;
                context.fillText(datainput[i].status+": "+datainput[i].value,text_x, text_y + (y_diff*.1));
            }
            else if(dataconfig[6].value == "right"){
            	var temp_rx = line_x_e - x_diff; 
            	var text_x = temp_rx - total_len;

            	var text_y = (line_y+line_y+y_diff)/2;
            	//console.log(line_x_e+" "+x_diff+" "+temp_rx+" "+text_x);
            	context.fillText(datainput[i].status+": "+datainput[i].value,text_x, text_y+(y_diff*.1));
            }
            else{
                var text_x =line_x_s + (line_x_e-line_x_s)/2;
                var text_y = (line_y+line_y+y_diff)/2;
                var align = context.measureText(datainput[i].status+""+datainput[i].value).width/2;
                context.fillText(datainput[i].status+": "+datainput[i].value,text_x-align, text_y);
            }
        }
        else{
        	//draw line
            context.beginPath();
            context.moveTo(line_x_s, line_y+10);
            context.lineTo(line_x_e, line_y+10);
            context.lineTo(line_x_e - x_diff, line_y + y_diff);
            context.lineTo(line_x_s + x_diff, line_y + y_diff);
            context.lineTo(line_x_s, line_y+10);

            context.fillStyle = '#'+ Math.random().toString().slice(3,6);
            context.fill();
            context.stroke();
            context.closePath();


            
            //write text 
            context.fillStyle = dataconfig[11].value;
            //context.font = "15px Arial";
            var status_len =  context.measureText(datainput[i].status).width;
            var value_len =  context.measureText(datainput[i].value).width;
            var total_len = status_len+value_len;


            if(dataconfig[6].value == "left")
            {
                var text_x = (line_x_s + x_diff);
                var text_y = (line_y+line_y+y_diff)/2;
                context.fillText(datainput[i].status+": "+datainput[i].value,text_x, text_y+(y_diff*.1));
            }
            else if(dataconfig[6].value == "right"){
            	var temp_rx = line_x_e - x_diff; 
            	var text_x = temp_rx - total_len;
            	var text_y = (line_y+line_y+y_diff)/2;
            	context.fillText(datainput[i].status+": "+datainput[i].value,text_x, text_y+(y_diff*.1));
            }
            else{
                var text_x =line_x_s + (line_x_e-line_x_s)/2;
                var text_y = (line_y+line_y+y_diff)/2;
                var align = total_len/2;
                context.fillText(datainput[i].status+": "+datainput[i].value,text_x-align, text_y+(y_diff*.1));
                //context.fillText(datainput[i].status+": "+datainput[i].value,text_x, text_y);
            }
            
            line_x_s = line_x_s + x_diff;
            line_x_e = line_x_e - x_diff;
            line_y = line_y + y_diff;    
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
 
	
