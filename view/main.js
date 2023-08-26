const pending = document.querySelector('.pending');
const completedDiv = document.querySelector('.completed');

async function getTasks() {
    let res = await fetch('http://localhost:3000/api/tasks');
    res = await res.json();

    res.forEach((task) => {
        pending.innerHTML += `
        <div class="element">
            <h1>${task.title}</h1>
            <p>${task.desc}</p>
            <button onclick="completedT(${task.id})">Complete</button>
            <button id="elim" onclick="erase(${task.id})">Erase</button>
        </div>
    `
    })
}

getTasks()

async function getCompleted() {
    let res = await fetch('http://localhost:3000/api/complete');
    res = await res.json();
    res.forEach((item) => {
        completedDiv.innerHTML += `
        <div class="element">
            <h1>${item.title}</h1>
            <p>${item.desc}</p>
        </div>
    `
    })
}

getCompleted()

async function createTask(e) {

    let title = document.querySelector('#title').value
    let desc = document.querySelector('#desc').value

    if (title == "undefined" || desc == "undefined") { alert("ERROR, uno de los valores ha sido undefined"); return }
    let newT = {
        title: title,
        desc: desc
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newT);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let req = await fetch('http://localhost:3000/api/tasks', requestOptions)
}

function erase(tid) {
    let newT = {
        id: tid
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newT);
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let res = fetch('http://localhost:3000/api/tasks', requestOptions).then(() => window.location.reload())
}

function completedT(tid) {
    let newT = {
        id: tid
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newT);
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let res = fetch('http://localhost:3000/api/tasks', requestOptions).then(() => window.location.reload())
}