$(function () {
    const deg = 6;
    const hr = document.getElementById('hour');
    const mn = document.getElementById('min');
    const sc = document.getElementById('sec');
    const date = document.getElementById("date");
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    date.innerText = day.toLocaleDateString() + " " + day.toLocaleTimeString();
    hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

    setInterval(() => {
        day = new Date();
        date.innerText = day.toLocaleDateString() + " " + day.toLocaleTimeString();
        hh = day.getHours() * 30;
        mm = day.getMinutes() * deg;
        ss = day.getSeconds() * deg;

        hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`;
    }, 11000);
});