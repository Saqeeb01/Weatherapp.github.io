const http = require('http');
const fs = require('fs');
const requests = require('requests');




const homeFile = fs.readFileSync("Home.html", "utf-8");

const stylecss = fs.readFileSync("style.css", "utf-8")

const scriptjs = fs.readFileSync("script.js", "utf-8")


const replaceVal = (tempVal, orgVal) => {
   let temprature = tempVal.replace("{%tempval%}",orgVal.main.temp);
   temprature = temprature .replace("{%tempmin%}",orgVal.main.temp_min);
   temprature = temprature .replace("{%tempmax%}",orgVal.main.temp_max);
   temprature = temprature .replace("{%location%}",orgVal.name);
   temprature = temprature .replace("{%country%}",orgVal.sys.country);
   temprature = temprature .replace("{%tempstatus%}",orgVal.weather[0].main);
   return temprature;

};

const server = http.createServer((req, res)=> {
   if (req.url == "/"){
      requests("https://api.openweathermap.org/data/2.5/weather?q=belgaum&units=metric&appid=18f2ca25f628d5d5f97dc5c9c5831a3f"
   )
      .on("data",(chunk) => {
         const objData =JSON.parse(chunk);
         const arrData = [objData];
         // console.log(arrData);
         const realTimeData = arrData.map((val) => replaceVal(homeFile, val))
         .join("");
         res.write(realTimeData);
         // console.log(realTimeData);
         })
      .on("end", (err) => {
         if (err) return console.log("connection closed due to errors", err);
         res.end();
         console.log("end");
      })
   
   }
   });

   server.listen(8000, "127.0.0.1", ( () => { 
      console.log("listening to the port number 8000:") 
      }));
       




 