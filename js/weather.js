var latitude;
        var longitude; 
            
            
            //convert imperial to metric
            function convertToMetric() {
                
                var celsius = Math.round(($("#temperature").html() - 32) * 5/9); 
                var kmph = Math.round(($("#wind").html())*1.6093); 
                
                $("#temperature").html(celsius); 
                $("#tempsign").html("C");
                $("#wind").html(kmph); 
                $("#windsign").html(" km/h"); 
                $("#button").html("Imperial");
                
            }
            
            //convert metric to imperial            
            function convertToImperial() {
                
                var fahrenheit = Math.round($("#temperature").html() * 9/5 + 32); 
                var milesph = Math.round($("#wind").html()*0.62137);
                
                $("#temperature").html(fahrenheit); 
                $("#tempsign").html("F");
                $("#wind").html(milesph); 
                $("#windsign").html(" miles/h"); 
                $("#button").html("Metric");
            }
            
                                           
                
                    
                    //get location of user in latitude and longitude
                    $.getJSON("http://ipinfo.io/geo", function(loc) {
                       
                            var json = JSON.stringify(loc);
                            var jsonObject = JSON.parse(json);
                            
                            //console.log(jsonObject);
                            
                            $("#location").html(jsonObject.city + ", " + jsonObject.region); 
                            var locArray = jsonObject.loc.split(',')
                            
                            latitude = locArray[0];
                            longitude = locArray[1];
                            var api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=171fbe7e29d7d4cff5088e5cd6cddfd9`;
                        
                        
                        //get the weather API
                        $.getJSON(api, function(result){
                    
                            var weatherJson = JSON.stringify(result);
                            var weatherObject = JSON.parse(weatherJson);
                            var time = (new Date()).getHours(); 
                            
                            $("#weather").html(weatherObject.weather[0].description);
                            
                                                      
                            //changing the weather icon based on weather description
                            if (time > 7 && time < 17) {
                                switch ($("#weather").html()) {

                                case "clear sky": 
                                    $("i").attr("class", "wi wi-day-sunny");
                                    $("body").css("background", "url('images/clearsky_day.jpg') no-repeat 100% 100%");
                                    break; 
                                case "few clouds":
                                case "scattered clouds":
                                case "broken clouds":
                                case "overcast clouds":
                                    $("i").attr("class", "wi wi-day-cloudy");
                                        $("body").css("background", "url('images/clouds_fog_day.jpg') no-repeat 100% 100%");
                                    break;
                                case "shower rain":
                                case "light rain": 
                                case "rain":
                                    $("i").attr("class", "wi wi-day-rain");
                                        $("body").css("background", "url('images/rain_day.jpg') no-repeat 100% 100%");
                                    break;
                                case "thunderstorm":
                                    $("i").attr("class", "wi wi-day-thunderstorm");
                                        $("body").css("background", "url('images/rain_day.jpg') no-repeat 100% 100%");
                                    break;
                                case "snow":
                                    $("i").attr("class", "wi wi-day-snow");
                                        $("body").css("background", "url('images/snow_day.jpg') no-repeat 100% 100%");
                                    break;
                                case "mist": 
                                    $("i").attr("class", "wi wi-day-fog");
                                        $("body").css("background", "url('images/clouds_fog_day.jpg') no-repeat 100% 100%");
                                    break;
                                    default: 
                                        $("i").attr("class", "wi wi-day-sunny");
                                        $("body").css("background", "url('images/clearsky_day.jpg') no-repeat 100% 100%");
                                        break;                                        

                                                    }
                            } else {
                                
                                switch ($("#weather").html()) {

                                case "clear sky": 
                                    $("i").attr("class", "wi wi-night-clear");
                                    $("body").css("background", "url('images/clearsky_night.jpg') no-repeat 100% 100%");
                                    break; 
                                case "few clouds":
                                case "scattered clouds":
                                case "broken clouds":
                                case "overcast clouds":
                                    $("i").attr("class", "wi wi-night-cloudy");
                                        $("body").css("background", "url('images/clouds_fog_night.jpg') no-repeat 100% 100%");
                                    break;
                                case "shower rain":
                                case "rain":
                                case "light rain": 
                                    $("i").attr("class", "wi wi-night-rain");
                                        $("body").css("background", "url('images/rain_night.jpg') no-repeat 100% 100%");
                                    break;
                                case "thunderstorm":
                                    $("i").attr("class", "wi wi-night-thunderstorm");
                                        $("body").css("background", "url('images/rain_night.jpg') no-repeat 100% 100%");
                                    break;
                                case "snow":
                                    $("i").attr("class", "wi wi-night-snow");
                                        $("body").css("background", "url('images/snow_night.jpg') no-repeat 100% 100%");
                                    break;
                                case "mist": 
                                    $("i").attr("class", "wi wi-night-fog");
                                        $("body").css("background", "url('images/clouds_fog_night.jpg') no-repeat 100% 100%");
                                    break;  
                                        default: 
                                        $("i").attr("class", "wi wi-night-clear");
                                        $("body").css("background", "url('images/clearsky_night.jpg') no-repeat 100% 100%");
                                        break;                      
                                                            }                
                                
                            };
                            
                            
                            $("#wind").html(Math.round(weatherObject.wind.speed *60*60 / 1000 * 0.621371)); 
                            $("#temperature").html(Math.round(weatherObject.main.temp * 9/5 - 459.67));
                            $("#humidity").html(weatherObject.main.humidity);
                            
                    
                        });
                                                
                    });
                

            //changing between imperial and metric on button click            
            $("#changeUnits").click(function(){
                
                var button = $("#button").html(); 
                
                if (button == "Metric") {
                    
                    convertToMetric();   
                    
                } else {
                    
                    convertToImperial(); 
                }
                
                
            }); 
        
        //items learned - get date;
        //geting location using ipinfo.io
    