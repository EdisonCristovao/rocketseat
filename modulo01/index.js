 const express = require("express");

const server = express();

server.use(express.json())

// Query params = ?users=1
// Route params = /users/1
// Request Body = { "name": "edison" }

// server.get('/users/:id', (req, res) => {
//     const { id } = req.params
//     const nome = req.query.nome

//     return res.json({ manssage: `Id ${id}, Nome: ${nome}`, user: users[id]});
// });

// CRUD = Create, Read, Update, Delete

const users = ['Diego', 'Edison', 'João']

server.use((req, res, next) => {
    console.time('request')
    console.log(`Method: ${req.method}, Url: ${req.url}`)

    next()

    console.timeEnd('request')
})

function checkUserExists(req, res, next) {
    if (!req.body.name) return res.status(400).json({error: 'User name is required'})

    return next();
}

server.get('/users', (req, res) => res.json(users));

server.get('/users/:id', (req, res) => {
    const { id } = req.params
    return res.json(users[id]);
});

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body
    
    users.push(name);

    res.json(users)
});

server.put('/users/:id', checkUserExists, (req, res) => {
    const { name } = req.body
    const { id } = req.params

    users[id] = name;

    res.json(users)
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params

    users.splice(id, 1);

    return res.send();
});

server.listen(3000);
