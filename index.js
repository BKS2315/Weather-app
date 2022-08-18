//By city Name(Manual Entry)
let flag = false;
function getData(){
    let citys = document.getElementById("city").value;
    flag = true;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citys}&appid=c22fc49a0b44308bc33445b1b9f58262`;

    fetch(url).then(function(res){          //fetching data
    
        return res.json();                //convertingdata
                        
     }).then(function(res){

             console.log(res);  //printingdata
             append(res)
             sevendays(res)
     }).catch(function(err){  

         console.log(err);

     });

}



function append(data){
    let container = document.getElementById("container");

        container.innerHTML = null;        //to clear the div so it won,t append again n again

       let city = document.createElement("p");
       city.innerText = `City : ${data.name}`;
       console.log("city: ",city)

       let map = document.querySelector("iframe");
       map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
       
       let temp = document.createElement("p");
       temp.innerText = `Temprature : ${Math.floor(data.main.temp - 273)}`;
       
       let humidity = document.createElement("p");
       humidity.innerText = `Humidity : ${data.main.humidity}`
       
       container.append(city,temp,humidity)
       
    }
    
    //Seven Days
    function sevendays(data){
        let city = document.querySelector("#city").value
        
        let lati = data.coord.lat;
        
        let longi =  data.coord.lon;

        console.log("lati,longi:: ",lati,longi)
        
        const url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}04&exclude=hourly,current&appid=c22fc49a0b44308bc33445b1b9f58262`
        
        //  console.log("city: ",url)
        
        fetch(url).then(function(response){
            
            return response.json()
            
        }).then(function(response){
            console.log("res777: ",response)
            
            append7(response)
            
            console.log("city: ",city)
        }).catch(function(err){
            console.log("err7777")
        })
        
    }
    
    function append7(data){
        let container7 = document.getElementById("container7");
        container7.innerHTML = null;

        for(let i=0 ; i<data.daily.length ; i++){

            let weather = document.createElement("p");

            weather.innerText = `Weather : ${data.daily[i].weather[0].description}`;

            let status = document.createElement("img");
            let des = data.daily[i].weather[0].description;
    
            if(des == "light rain"){
                status.src = "https://i.pinimg.com/originals/20/11/81/20118199fb65a61cf734a337633f1021.gif"
            }
            
            else if(des == "few clouds"){
                status.src = "https://c.tenor.com/PLqmB_SmXQMAAAAC/clouds-sky.gif"
            }

            else {
                status.src = "https://c.tenor.com/-NJHCQmv_fwAAAAC/excessive-heat-warning-sunshine.gif"
            }

            let dayn = document.createElement("h2");
            dayn.innerText = `Day ${i+1}`
            
            

            let d_temp = document.createElement("p");
            
            d_temp.innerText = `Day Temp : ${ Math.floor(data.daily[i].temp.day-273)}°C`;
            
            
            let max_temp = document.createElement("p");
            
            max_temp.innerText = `Max Temp : ${Math.floor(data.daily[i].temp.day-273)}°C`;
            
            let min_temp = document.createElement("p");
            
            min_temp.innerText = `Min Temp : ${Math.floor(data.daily[i].temp.day-273)}°C`;
            
            let day = document.createElement("div")
            day.setAttribute("id","day")
            day.append( dayn,status,weather,d_temp,max_temp, min_temp)
            
            container7.append(day)
            
        }
        
        
        
        
    }
    
    //By GPS
    function getDatalocation( lat,lon){
    
        // let city = document.querySelector("#city").value
       
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c22fc49a0b44308bc33445b1b9f58262`
       
       
        fetch(url).then(function(res){
           return res.json()
           
           }).then(function(res){
            //    console.log(res)
            //    gps(res)
               append(res)
           }).catch(function(err){
               console.log("err")
           })
       
       
       }
       
    function getWeather(){
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
         crd = position.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getDatalocation( crd.latitude,crd.longitude)

      }
    
  }

  if(flag == false ){
    getWeather();
  }

  

