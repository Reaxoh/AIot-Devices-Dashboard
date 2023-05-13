const chartCalendar     = document.getElementById('chartCalendar');
const chartCalendarDate = document.getElementById('chartCalendarDate');
const chartCalendarTime = document.getElementById('chartCalendarTime');
const DHT11Chart        = document.getElementById('DHT11Chart');
const spanDate          = document.getElementById('spanDate');
const tbody             = document.getElementById("tbody");
const dateRight         = document.getElementById("dateRight");
const dateLeft          = document.getElementById("dateLeft");

let toast;
let chart;

let chartDateYear       = 0;
let chartDateMonth      = 0;
let chartDateDate       = 0;
let chartDateHours      = 0;

let calendarDateYear    = 0;
let calendarDateMonth   = 0;

dateLeft.addEventListener("click", () => {
    if(calendarDateMonth == 1) {
        calendarDateYear--;
        calendarDateMonth = 12;
    } else {
        --calendarDateMonth;
    }
    loadCalender(getDateList(calendarDateYear, calendarDateMonth), calendarDateYear, calendarDateMonth);
});

dateRight.addEventListener("click", () => {
    if(calendarDateMonth == 12) {
        calendarDateYear  += 1;
        calendarDateMonth = 1;
    }else{
        ++calendarDateMonth;
    }
    loadCalender(getDateList(calendarDateYear, calendarDateMonth), calendarDateYear, calendarDateMonth);
});

chartCalendarTime.addEventListener("change", () => {
    chartDateHours = chartCalendarTime.value
    getDHT11Data();
});

chartCalendarDate.addEventListener("click", () => {
  toast = new bootstrap.Toast(chartCalendar);
  calendarDateYear  = chartDateYear;
  calendarDateMonth = chartDateMonth;
  loadCalender(getDateList(calendarDateYear, calendarDateMonth), calendarDateYear, calendarDateMonth);
  toast.show();
});

function initChart() {
  let date                    = new Date();
  chartDateYear               = date.getFullYear();
  chartDateMonth              = date.getMonth() + 1;
  chartDateDate               = date.getDate();
  chartDateHours              = date.getHours();
  chartCalendarDate.innerText = `${chartDateYear}年 ${chartDateMonth < 10 ? "0" + chartDateMonth : chartDateMonth}月 ${chartDateDate < 10 ? "0" + chartDateDate : chartDateDate}日`;

  for(let i = 0; i < 24; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerText = (((i < 10)? ("0" + i) : i) + "時");

    if(i === chartDateHours){
        option.selected = true;
    }

    chartCalendarTime.appendChild(option);
  }
  
  chart = new google.visualization.LineChart(document.getElementById('DHT11Chart'));
  getDHT11Data();
}

function getDHT11Data() {
  let request = new XMLHttpRequest();
  request.open("POST", window.location.origin + "/data/getDHT11Data", true);
  request.setRequestHeader("Content-Type", "application/json");
  
  let data = {
      "Name": "getDHT11Data",
      "Year":  chartDateYear,
      "Month": chartDateMonth,
      "Day":   chartDateDate,
      "Hour":  chartDateHours,
  };

  console.log("Send:", data);

  request.send(JSON.stringify(data));

  request.addEventListener("load", () => {
      console.log("Heroku Msg[Get DHT11 Data]:");
      let myJson = JSON.parse(request.responseText);
      console.log(myJson);
      if(myJson["Type"] === "OK") {
          drawChart(myJson["Data"], "溫溼度圖表");
      } else {
          drawChart({0: {Temp: 0, Hum: 0}}, "No Data");
      }
  });
}

function drawChart(myJson, title) {
  let options = {
      title: title,
      curveType: 'function',
      legend: { position: 'bottom' }
  };

  let chartData = [['Min', 'Temp', 'Hum']];

  for(let i = 0; i < 61; i++) {
      try{
          let temp = myJson[i]["Temp"];
          let Hum = myJson[i]["Hum"];
          let secData = [];
          secData.push(i);
          secData.push(temp);
          secData.push(Hum);
          chartData.push(secData);
      } catch(e) {
          continue;
      }
  }

  let data = google.visualization.arrayToDataTable(chartData);

  chart.draw(data, options);
}

function setChartCalendar() {
  calendarDateYear  = chartDateYear;
  calendarDateMonth = chartDateMonth;
  loadCalender(getDateList(calendarDateYear, calendarDateMonth), calendarDateYear, calendarDateMonth);
  toast.show();
}

function loadCalender(date_list, year, month) {
  spanDate.innerText = month > 9? `${year} ${month}` : `${year} 0${month}` ;

  tbody.innerHTML     = "";
  for(let i = 0; i < date_list.length; i++) {
      let tr = document.createElement("tr");
      for(let y = 0; y < date_list[i].length; y++) {
          let td = document.createElement("td");
          let day = date_list[i][y]

          if(i == 0 && day > 7) {
              td.style.color = "gray";
              td.addEventListener("click", () => {
                  let _year, _month;
                  if(month == 1) {
                      _year  = year - 1;
                      _month = 12;
                  } else {
                      _year  = year
                      _month = month - 1;
                  }
                  chartDateYear   = _year;
                  chartDateMonth  = _month;
                  chartDateDate   = day;
                  console.log(_year, "/", _month, "/", day);
                  chartCalendarDate.innerText = `${chartDateYear}年 ${chartDateMonth < 10 ? "0" + chartDateMonth : chartDateMonth}月 ${chartDateDate < 10 ? "0" + chartDateDate : chartDateDate}日`;
                  toast.hide();
                  getDHT11Data();
              });
          } else if(i == date_list.length - 1 && day < 8) {
              td.addEventListener("click", () => {
                  let _year, _month;
                  if(month == 12) {
                      _year  = year + 1;
                      _month = 1;
                  } else {
                      _year  = year
                      _month = month + 1;
                  }
                  chartDateYear   = _year;
                  chartDateMonth  = _month;
                  chartDateDate   = day;
                  console.log(_year, "/", _month, "/", day);
                  chartCalendarDate.innerText = `${chartDateYear}年 ${chartDateMonth < 10 ? "0" + chartDateMonth : chartDateMonth}月 ${chartDateDate < 10 ? "0" + chartDateDate : chartDateDate}日`;
                  toast.hide();
                  getDHT11Data();
              });
          } else {
              td.addEventListener("click", () => {
                  chartDateYear   = year;
                  chartDateMonth  = month;
                  chartDateDate   = day;
                  console.log(year, "/", month, "/", day);
                  chartCalendarDate.innerText = `${chartDateYear}年 ${chartDateMonth < 10 ? "0" + chartDateMonth : chartDateMonth}月 ${chartDateDate < 10 ? "0" + chartDateDate : chartDateDate}日`;
                  toast.hide();
                  getDHT11Data();
              });
          }

          td.innerText = day;
          tr.appendChild(td);
      }
      tbody.appendChild(tr);
  }
}

function getDateList(year, month) {
  month          -= 1;
  let nowDate     = new Date(year, month);
  let lastDate    = new Date(nowDate - (24 * 60 * 60 * 1000));   //上個月
  let nextDate    = new Date(year, (month + 1));
  let nowLastDate = new Date(nextDate - (24 * 60 * 60 * 1000));
  let dateList    = [];
  let rowDateList = [];
  let nowDay      = 1;

  if(nowDate.getDay() !== 0) {
      for (let i = 0; i <= lastDate.getDay(); i++) {
          rowDateList.push(lastDate.getDate() - i);
      }
      rowDateList.reverse();

      for (let i = nowDate.getDay(); i < 7; i++) {
          nowDay = nowDate.getDate() + i - nowDate.getDay();
          rowDateList.push(nowDay);
      }

      dateList.push(rowDateList);
      nowDay += 1;
  }

  for(let i = nowDay; i <= nowLastDate.getDate(); i) {
      rowDateList = [];
      for(let y = 0; y < 7; y++) {
          if(i > nowLastDate.getDate())
              break;
          rowDateList.push(i++);
      }
      dateList.push(rowDateList);
  }

  if(nowLastDate.getDay() !== 6) {
      let y = 1;
      let num = dateList[dateList.length - 1].length;
      for(let i = num; i < 7; i++) {
          rowDateList.push(y++);
      }
  }

  return dateList;
}