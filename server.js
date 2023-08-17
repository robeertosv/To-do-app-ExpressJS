const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3000

app.use(express.json())
app.use(express.static('./view'))

let tasks = [] //Tareas pendientes
let completed = [] //Tareas completadas
let newId = 0; //ID de la tarea

server.listen(port, () => console.log(`VIEW APP IN: http://localhost:${port}`))  //Arrancar server en el puerto almacenado en la variable port

//Mostrar index.html y sus archivos asociados al acceder a la url /
app.get('/', (req, res) => {
    res.send('./view')
})

//Devuelve un JSON con la id de la tarea más nueva
app.get('/api/tasks/id', (req, res) => {
    res.json(newId)
})

//Devuelve un JSON con todas las tareas pendientes al acceder a /api/tasks con GET
app.get('/api/tasks', (req, res) => {
    res.json(tasks)
})

//Crea una nueva tarea al acceder a /api/tasks con POST
app.post('/api/tasks', (req, res) => {
    let newT = {
        id: newId,
        title: req.body.title,
        desc: req.body.desc,
        completed: false
    }
    tasks.push(newT)
    newId++

    res.status(201).json(newT)
})

//Devuelve un JSON con las tareas completadas al acceder a /api/complete con GET
app.get('/api/complete', (req, res) => {
    res.json(completed)
})

//Elimina la tarea por id al acceder a /api/delete con POST
app.post('/api/delete', (req, res) => {

    let idToDelete = req.body.id;

    tasks = tasks.filter(obj => obj.id !== idToDelete);

    res.status(202).json(tasks)
})

//Añade a la lista de tareas completadas la tarea con el id requerido usando el método POST
app.post('/api/complete', (req, res) => {
    let idToDelete = req.body.id;


    tasks = tasks.filter(obj => {
        if (obj.id === idToDelete) {
            completed.push(obj); // Hacer push del objeto al array de objetos borrados
            return false; // No incluir este objeto en el nuevo array
        }
        return true; // Incluir este objeto en el nuevo array
    });
    res.status(202).json(completed)

})