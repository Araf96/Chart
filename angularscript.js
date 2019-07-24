var app = angular.module("tester", ["demo"]);
    app.controller("mycontroller", function($scope,library) {


        var input=[
            {"status":"PAY_FAIL","value":6248,"image":"http://farm3.static.flickr.com/2666/3686946460_0acfa289fa_m.jpg"},
            {"status":"PAY_SUCCESS","value":868,"image":"https://www.w3schools.com/images/w3schools_green.jpg"},
            {"status":"PM_REQUESTED","value":11199,"image":"http://farm4.static.flickr.com/3611/3686140905_cbf9824a49_m.jpg"},
            {"status":"PAY_INIT","value":992,"image":"http://farm3.static.flickr.com/2666/3686946460_0acfa289fa_m.jpg"}
        ] ;



        var input1=[
            {"status":"PM_REQUESTED","value":11199,"image":"http://farm4.static.flickr.com/3611/3686140905_cbf9824a49_m.jpg"},
            {"status":"PAY_FAIL","value":6248,"image":"http://farm3.static.flickr.com/2666/3686946460_0acfa289fa_m.jpg"},
            {"status":"PAY_INIT","value":992,"image":"http://farm3.static.flickr.com/2666/3686946460_0acfa289fa_m.jpg"},
            {"status":"PAY_SUCCESS","value":868,"image":"https://www.w3schools.com/images/w3schools_green.jpg"}
            
        ] ;


        var config=[
        {"type":"font_name","value":"Arial"},
        {"type":"font_size","value":"15px"},
        {"type":"font_style","value":"Bold"},
        {"type":"canvas_height","value":"500"},
        {"type":"canvas_width","value":"500"},
        {"type":"background_color","value":"white"},
        {"type":"alignment","value":"canter"},
        {"type":"bar_size","value":"25"},
        {"type":"bar_space","value":1.2},
        {"type":"bar_image_src","value":"Img/bar4.jpg"},
        {"type":"chart_type","value":"funnel"},
        {"type":"font_color","value":"black"}
        ] ;



        var input2=[{"status":"PAY_FAIL","value":200},{"status":"PAY_SUCCESS","value":400},{"status":"PM_REQUESTED","value":400},{"status":"PAY_INIT","value":600}];
        
        $scope.myfn=function(){

            
            library._$runchart('myCanvas',input,config);
            
        }


        $scope.myfn();
        
});

//library._$runbarchart('myCanvas',input,config);
//library._$runbarchart('myCanvas2',input2,config);