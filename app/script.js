let main = false;
let lan = false;
let tick = new Audio('./sound/tick.mp3');
let log = false;
let time = 15000;
let timeout = setTimeout(powerSave, time);

tick.volume = 0.1;
let userArr = [
    "Michi",
    "Martin",
    "Max",
    "Tina"
];
function startTime() {
    const today = new Date();
    tick.play();
    if(lan && document.getElementById('clock')) document.getElementById('clock').innerHTML =  "<p id='h'>" + checkTime(today.getHours()) + "</p>:<p id='m'>" + checkTime(today.getMinutes()) + "</p>:<p id='s'>" + checkTime(today.getSeconds()) + "</p>";
    else if(document.getElementById('clock')) document.getElementById('clock').innerHTML =  "<p id='h' class='time'>" + checkTime(today.getHours()) + "</p>:<p id='m' class='time'>" + checkTime(today.getMinutes()) + "</p>:<p id='s' class='time'>" + checkTime(today.getSeconds()) + "</p>";
    
    if(document.getElementById('clockMain')) document.getElementById('clockMain').innerHTML = checkTime(today.getHours()) + " : " + checkTime(today.getMinutes()) + " : " + checkTime(today.getSeconds());
    
    setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) i = "0" + i  // add zero in front of numbers < 10
    return i;
}
let daysArr = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
function startDate() {
    startTime();
    const today = new Date();
    if(document.getElementById('date'))document.getElementById('date').innerHTML =  today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + "\t" + daysArr[today.getDay()];
    if(document.getElementById('dateMain')) document.getElementById('dateMain').innerHTML =  today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + "\t" + daysArr[today.getDay()];
}

let clockcount = -1
if(localStorage.getItem("clockcount")){
    clockcount = parseInt(localStorage.getItem("clockcount"));
    changeClock();
}
else clockcount = 1;
console.log(clockcount);
function changeClock(){
    time = 15000;
    clearTimeout(timeout);
    timeout = setTimeout(powerSave, time);
    if(clockcount == 5) document.getElementById('clock').style.opacity = 0;
    else{
        document.getElementById('clock').style.opacity = 1;
        document.getElementById('clock').style.fontFamily = 'clock' + clockcount;
        localStorage.setItem("clockcount", clockcount);
    }
    console.log(clockcount);
    clockcount++;
    if(clockcount > 5) clockcount = 1;
}

let datecount = -1
if(localStorage.getItem("datecount")){
    datecount = parseInt(localStorage.getItem("datecount"));
    changeDate();
}
else datecount = 1;
console.log(datecount);
function changeDate(){
    time = 15000;
    clearTimeout(timeout);
    timeout = setTimeout(powerSave, time);
    if(datecount == 5) document.getElementById('date').style.opacity = 0;
    else{
        document.getElementById('date').style.opacity = 1;
        document.getElementById('date').style.fontFamily = 'clock' + datecount;
        localStorage.setItem("datecount", datecount);
    }
    console.log(datecount);
    datecount++;
    if(datecount > 5) datecount = 1;
}


let pressed = false;
pressAnyBtn()
function pressAnyBtn(){
    if(!pressed) $(document).ready(function () {
        if(!pressed) $("body").keypress(function () {
            console.log('pressed')
            console.log(!pressed);
            console.log(power)
            if(!pressed && power){
                
            pressed = true;
                $(".bg").css('filter', 'blur(10px)');
                $(".del").css('filter', 'blur(10px)');
                $(".del").css('opacity', '0');
                
                pinLogin();
                    setTimeout( () =>{
                    $('.del').empty();
                }, 350);
            }
            
        });
    });
}

function logOut(){
    document.body.removeEventListener("keyup", test8899);
    power = true;
    pressAnyBtn()
    console.log('logOut');
    log = false;
    clearTimeout(timeout);
    timeout = setTimeout(powerSave, time);
    $("body").fadeTo(300, 0);
    setTimeout(()=>{
        $("body").fadeTo(0, 0);
        $("body").fadeTo(300, 1);
        $("body").html(`
        <div class="bg"></div>
        <main>
            <div id="login"></div>
            <div class="del">
                <div class="paralax">
                    <div class="paralaximg"></div>
                    <div class="wrapper">
                        <div id="date" onclick="changeClock()"></div>
                        <div id="clock" onclick="changeDate()"></div>
                    </div>
                </div>

                <div class="changeClock btn" onclick="changeClock()"></div>
                <div class="changeDate btn" onclick="changeDate()"></div>
            </div>
        </main>`);
        main = false;
        pressed = false;
        startDate();
        startTime();
    }, 500);
}


//4digidpin
const pinCode1 = 1919;
const pinCode2 = 9191;
const pinCode3 = 3737;
const pinCode4 = 7373;
function pinLogin() {
    log = true;
    time = 30000;
    document.getElementById("login").innerHTML = `
    <div id="pin">
        <form>
            <input type="password" maxlength="1"/>
            <input type="password" maxlength="1"/>
            <input type="password" maxlength="1"/>
            <input type="password" maxlength="1"/>
        </form>
    </div>1919 oder 9191 oder 3737 oder 7373 (je eigener user)`;
    
    $("#login").fadeTo(300, 1);
    //document.getElementById("login").style = "opacity = 1;";
    

    console.log('pin')
    const inputs = document.querySelectorAll("input");
    setTimeout(()=>{
        inputs[0].focus();
    }, 100);
    inputs.forEach((input, key) => {
        if (key !== 0) {
            input.addEventListener("click", function () {
                inputs[0].focus();
            });
        }
        input.addEventListener("keyup", function (event) {
            console.log("key: " + event.key)
            if(event.key === 'Escape') logOut();
            if(event.key === "ArrowLeft" && key != 0 || event.key === "Backspace" && key != 0){
                inputs[key - 1].focus();
            }
            if(event.key === "ArrowRight"){
                inputs[key + 1].focus();
            }
            if (input.value) {
                
                if (key === 3) {
                    const userCode = [...inputs].map((input) => input.value).join("");
                    console.log("code = " + userCode)
                    if(userCode == pinCode1 || userCode == pinCode2 || userCode == pinCode3 || userCode == pinCode4){
                        if(userCode == pinCode1) localStorage.setItem("user", 1);
                        if(userCode == pinCode2) localStorage.setItem("user", 2);
                        if(userCode == pinCode3) localStorage.setItem("user", 3);
                        if(userCode == pinCode4) localStorage.setItem("user", 4);
                        loggedIn();
                    }
                } else {
                    inputs[key + 1].focus();
                }
            }
        });
    });
}
let isOnlineS = "isOnline1";
let filterARR = [
    "invert(77%) sepia(100%) saturate(2270%) hue-rotate(19deg) brightness(104%) contrast(107%)",
    "invert(30%) sepia(79%) saturate(7500%) hue-rotate(354deg) brightness(96%) contrast(128%)"
];
function loggedIn(){
    log = true;
    $("main").empty();
    //document.body.innerHTML += `<div class="logOut btn" onclick="logOut()"></div>`;
    main = true;
    
    let user = parseInt(localStorage.getItem("user"));
    
    $(".bg").css('filter', 'blur(5px)');
    $("main").html(`
    <nav>
    <div class="user-avatar -large -online-ring" style="background-image: url(./img/userimg1.png)">A</div>
    <div id="clockMain"></div>
    <div class="welcome">Willkommen TestUser1!</div>
    <div id="dateMain"></div>
    <div class="logOut btn" onclick="logOut()"></div>
</nav>
<main class="haupt">
    <div class="flexWrapper">
                <div class="links noFelx">
                    <a href="http://michi.myddns.com/" target="_blank"><div class="link PV" onclick="window.location.href='http://michi.myddns.com';">PV-Anlage</div></a>
                    <a href="http://michi.myddns.com:3000" target="_blank"><div class="link Auto" onclick="window.location.href='http://michi.myddns.com:3000';">Auto</div></a>
                    <a href="http://michi.myddns.com/pool.php" target="_blank"><div class="link Pool" onclick="window.location.href='http://michi.myddns.com/pool.php';">Pool</div></a> 
                </div>
        <div class="switches">
            <div class="switch">
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">Wohnzimmer</p>
                </label>
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">PC</p>
                </label>
            </div>
            <div class="switch">
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">Leselampe</p>
                </label>
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">Zimmerlicht</p>
                </label>
            </div>
            <div class="switch">
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">Stehlampe</p>
                </label>
                <label>
                    <input onclick="toggleCharging()" class="toggleCharging" type="checkbox" name="toggleCharging">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <p class="switchtxt">Schreibtischlampe</p>
                </label>    
            </div>
        </div>
        <div class="temp"><iframe width='300' height='365' name='FC3' style='border:5px solid;border-radius:20px;border-color:#0063b1; opacity:.8;' src='https://api.wetteronline.de/wetterwidget?gid=11010&modeid=FC3&seourl=linz&locationname=Linz&lang=de'></iframe></div>
    </div>
    <div class="flexWrapper">
        <div class="chart">
            <canvas id="myChart"></canvas>
        </div>

        <div class="spotifyPlayer">
            <iframe style="border-radius:20px" src="https://open.spotify.com/embed/playlist/2LxMOzFAxMjm8gswLe2pdg?utm_source=generator" width="100%" height="280" frameBorder="0" allowfullscreen="" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        <div class="mitbewohner noFelx">
            <div class="nameWrapper">
                <svg id="isOnline1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M314.3 8.486C326.6-2.829 345.4-2.829 357.7 8.486L565.7 200.5C575.4 209.4 578.6 223.4 573.8 235.7C569 247.9 557.2 256 544 256H512V368C512 394.5 490.5 416 464 416H296.4C272.7 317.5 195.4 239.1 97.06 215.8C98.58 210.1 101.7 204.7 106.3 200.5L314.3 8.486zM304 192C295.2 192 287.1 199.2 287.1 208V272C287.1 280.8 295.2 288 304 288H368C376.8 288 384 280.8 384 272V208C384 199.2 376.8 192 368 192H304zM256 488C256 501.3 245.3 512 232 512C218.7 512 208 501.3 208 488C208 386.4 125.6 304 24 304C10.75 304 0 293.3 0 280C0 266.7 10.75 256 24 256C152.1 256 256 359.9 256 488zM0 480C0 462.3 14.33 448 32 448C49.67 448 64 462.3 64 480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480zM0 376C0 362.7 10.75 352 24 352C99.11 352 160 412.9 160 488C160 501.3 149.3 512 136 512C122.7 512 112 501.3 112 488C112 439.4 72.6 400 24 400C10.75 400 0 389.3 0 376z" />
                </svg>
                <p class="name">${userArr[0]}</p>
            </div>
            <div class="nameWrapper">
                <svg id="isOnline2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M314.3 8.486C326.6-2.829 345.4-2.829 357.7 8.486L565.7 200.5C575.4 209.4 578.6 223.4 573.8 235.7C569 247.9 557.2 256 544 256H512V368C512 394.5 490.5 416 464 416H296.4C272.7 317.5 195.4 239.1 97.06 215.8C98.58 210.1 101.7 204.7 106.3 200.5L314.3 8.486zM304 192C295.2 192 287.1 199.2 287.1 208V272C287.1 280.8 295.2 288 304 288H368C376.8 288 384 280.8 384 272V208C384 199.2 376.8 192 368 192H304zM256 488C256 501.3 245.3 512 232 512C218.7 512 208 501.3 208 488C208 386.4 125.6 304 24 304C10.75 304 0 293.3 0 280C0 266.7 10.75 256 24 256C152.1 256 256 359.9 256 488zM0 480C0 462.3 14.33 448 32 448C49.67 448 64 462.3 64 480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480zM0 376C0 362.7 10.75 352 24 352C99.11 352 160 412.9 160 488C160 501.3 149.3 512 136 512C122.7 512 112 501.3 112 488C112 439.4 72.6 400 24 400C10.75 400 0 389.3 0 376z" />
                </svg>
                <p class="name">${userArr[1]}</p>
            </div>
            <div class="nameWrapper">
                <svg id="isOnline3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M314.3 8.486C326.6-2.829 345.4-2.829 357.7 8.486L565.7 200.5C575.4 209.4 578.6 223.4 573.8 235.7C569 247.9 557.2 256 544 256H512V368C512 394.5 490.5 416 464 416H296.4C272.7 317.5 195.4 239.1 97.06 215.8C98.58 210.1 101.7 204.7 106.3 200.5L314.3 8.486zM304 192C295.2 192 287.1 199.2 287.1 208V272C287.1 280.8 295.2 288 304 288H368C376.8 288 384 280.8 384 272V208C384 199.2 376.8 192 368 192H304zM256 488C256 501.3 245.3 512 232 512C218.7 512 208 501.3 208 488C208 386.4 125.6 304 24 304C10.75 304 0 293.3 0 280C0 266.7 10.75 256 24 256C152.1 256 256 359.9 256 488zM0 480C0 462.3 14.33 448 32 448C49.67 448 64 462.3 64 480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480zM0 376C0 362.7 10.75 352 24 352C99.11 352 160 412.9 160 488C160 501.3 149.3 512 136 512C122.7 512 112 501.3 112 488C112 439.4 72.6 400 24 400C10.75 400 0 389.3 0 376z" />
                </svg>
                <p class="name">${userArr[2]}</p>
            </div>
            <div class="nameWrapper">
                <svg id="isOnline4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                    d="M314.3 8.486C326.6-2.829 345.4-2.829 357.7 8.486L565.7 200.5C575.4 209.4 578.6 223.4 573.8 235.7C569 247.9 557.2 256 544 256H512V368C512 394.5 490.5 416 464 416H296.4C272.7 317.5 195.4 239.1 97.06 215.8C98.58 210.1 101.7 204.7 106.3 200.5L314.3 8.486zM304 192C295.2 192 287.1 199.2 287.1 208V272C287.1 280.8 295.2 288 304 288H368C376.8 288 384 280.8 384 272V208C384 199.2 376.8 192 368 192H304zM256 488C256 501.3 245.3 512 232 512C218.7 512 208 501.3 208 488C208 386.4 125.6 304 24 304C10.75 304 0 293.3 0 280C0 266.7 10.75 256 24 256C152.1 256 256 359.9 256 488zM0 480C0 462.3 14.33 448 32 448C49.67 448 64 462.3 64 480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480zM0 376C0 362.7 10.75 352 24 352C99.11 352 160 412.9 160 488C160 501.3 149.3 512 136 512C122.7 512 112 501.3 112 488C112 439.4 72.6 400 24 400C10.75 400 0 389.3 0 376z" />
                </svg>
                <p class="name">${userArr[3]}</p>
            </div>
                
        </div>
    </div>

</main>
    `);
    document.getElementsByClassName("user-avatar")[0].style.backgroundImage = `url(./img/userimg${user}.png)`;
    document.getElementsByClassName("user-avatar")[0].innerHTML = user;
    document.getElementsByClassName("welcome")[0].innerHTML = "Welcome " + userArr[user-1] + "!"

    
    isOnlineS = "isOnline" + user;
    document.getElementById("isOnline1").style.filter = filterARR[Math.round(Math.random())];
    document.getElementById("isOnline2").style.filter = filterARR[Math.round(Math.random())];
    document.getElementById("isOnline3").style.filter = filterARR[Math.round(Math.random())];
    document.getElementById("isOnline4").style.filter = filterARR[Math.round(Math.random())];
    setInterval(changeIsOnline, 10000);
    document.getElementById(isOnlineS).style.filter = filterARR[0];
    
    const labels = [
        /*'Jänner',
        'Februar',
        'März',*/
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
    ];
    const data = {
        labels: labels,
        datasets: [{
            //label: 'kW',
            label: '',
            data: [/*165, 159, 180,*/ 631, 896, 1125, 1310, 940, 730, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 2,
        }]
    };
//vllt onclick auf monat
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: 'white'}
                },
                x: {
                    ticks: { color: 'white'}
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'PV-Anlage',
                    color: 'white'
                }
            }
        },
    };


    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    document.body.addEventListener("keyup", function (event) {
        console.log("key: " + event.key)
        if(event.key === 'Escape') logOut();
    });
    
    startDate();
}

function changeIsOnline(){
    if(isOnlineS !== "isOnline1" && Math.round(Math.random()) == 1)document.getElementById("isOnline1").style.filter = filterARR[Math.round(Math.random())];
    if(isOnlineS !== "isOnline2" && Math.round(Math.random()) == 1) document.getElementById("isOnline2").style.filter = filterARR[Math.round(Math.random())];
    if(isOnlineS !== "isOnline3" && Math.round(Math.random()) == 1) document.getElementById("isOnline3").style.filter = filterARR[Math.round(Math.random())];
    if(isOnlineS !== "isOnline4" && Math.round(Math.random()) == 1) document.getElementById("isOnline4").style.filter = filterARR[Math.round(Math.random())];
}

let landing = false;
function landingPage(){
    landing = true;
    document.body.style = 'background-image: url(./img/hintergrund.png); height: 100%; background-position-y: 10; background-repeat: no-repeat; background-size: cover;';
    
    document.getElementById("date").style.fontSize = ".5em";
    document.getElementById("clock").style.fontSize = "1em";
    document.getElementById("date").style.position = "absolute";
    document.getElementById("date").style.right = "21.35vw";
    document.getElementById("date").style.top = "-11.5vh";

    
    document.getElementById("clock").style.position = "absolute";
    document.getElementById("clock").style.right = "21vw";
    document.getElementById("clock").style.top = "-10.5vh";
    lan = true
    
    startDate()
}
let power = true;
function powerSave(){
    if(!log && !landing){
        $("body").fadeTo(400, 0);
        power = false;
        document.body.addEventListener("keyup", test8899);
        clearTimeout(timeout);
        timeout = setTimeout(powerSave, time);
    }
}
function test8899(){
    if(!log) logOut();
}