const nowDate       = document.getElementById("nowDate");
const nowTime       = document.getElementById("nowTime");
const nowTempData   = document.getElementById("nowTempData");
const nowHumData    = document.getElementById("nowHumData");

let nowDateYear     = 0;
let nowDateMonth    = 0;
let nowDateDate     = 0;
let nowDateHours    = 0;
let nowDateMinutes  = 0;
let nowDateSeconds  = 0;

function setNowDate() {
    let date           = new Date();
    nowDateYear        = date.getFullYear();
    nowDateMonth       = date.getMonth() + 1;
    nowDateDate        = date.getDate();
    nowDateHours       = date.getHours();
    nowDateMinutes     = date.getMinutes();
    nowDateSeconds     = date.getSeconds();
    nowDate.innerText = `${nowDateYear}年 ${nowDateMonth < 10 ? "0" + nowDateMonth : nowDateMonth}月 ${nowDateDate < 10 ? "0" + nowDateDate : nowDateDate}日`;
    nowTime.innerText = `${nowDateHours < 10 ? "0" + nowDateHours : nowDateHours}:${nowDateMinutes < 10 ? "0" + nowDateMinutes : nowDateMinutes}:${nowDateSeconds < 10 ? "0" + nowDateSeconds : nowDateSeconds}`;
}

function setNowDHT11Data() {
    console.log("setNowDHT11Data");
    let request = new XMLHttpRequest();
    request.open("POST", window.location.origin + "/data/getNowDHT11Data", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({name: "getNowDHT11Data"}));

    request.addEventListener("load", () => {
        let myJson = JSON.parse(request.responseText);
        console.log("Heroku Msg[Get Now DHT11 Data]:");
        console.log(myJson);
        
        try {
            let nowTime  = new Date();
            let dataTime = new Date(myJson["Year"], myJson["Month"] - 1, myJson["Day"], myJson["Hour"], myJson["Min"]);
            let time = nowTime - dataTime;
            console.log("Get Now DHT11 Data[Time]:", time);
            if(time > 180000) {
                nowTempData.innerText = "No Data";
                nowHumData .innerText = "No Data";
            } else {
                nowTempData.innerText = `${myJson["Temp"]}\u00B0C`;
                nowHumData .innerText = `${myJson["Hum"]}%`;
            }
        } catch(e) {
            console.log("Get Now DHT11 Data[Error]:", e);
        }
        
    });
}