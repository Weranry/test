async function updateCalendar() {
    const response = await fetch('/api/getapi');
    const data = await response.json();

    document.getElementById('solarDate').textContent = data.SolarMonth + data.SolarDay;
    document.getElementById('weekDay').textContent = data.WeekDay;
    document.getElementById('lunarDate').textContent = data.lunarMonth + data.lunarDay;
    document.getElementById('ganzhi').textContent = data.ganzhiYear;
    document.getElementById('wuhou').textContent = data.wuhou;
}

updateCalendar();