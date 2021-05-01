const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".clock"),
    dayTitle = document.querySelector(".day");

const arrDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 ;
    const date1 = date.getDate();
    const day = date.getDay();
    const m = date.getMinutes();
    const h = date.getHours();
    const s = date.getSeconds();
    dayTitle.innerText = `${year}.${month}.${date1} (${arrDay[day]})`
    clockTitle.innerText = `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
}


function init(){
    getTime();
    setInterval(getTime, 1000);
}

init(); 