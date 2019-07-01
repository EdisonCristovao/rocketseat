const express = require("express");

const server = express();



// GLOBAL VARIABLES =======================
const projects = [];
let requestCounter = 0;

// MIDDLEWARES ============================
server.use(express.json());
server.use(requestCounterUp)

function thereIsId(res, req, next) {
  const { id } = res.params;
  if (!projects.some(project => project.id == id)) return req.status(400).send({ error: "There is not id" });

  return next();
}

function requestCounterUp(res, req, next) {
  requestCounter++;
  console.log(requestCounter);
  return next();
}

// ROTAS = /projects ======================

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.get("/projects", (req, res) => res.json(projects));

server.put("/projects/:id", thereIsId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);
  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", thereIsId, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id === id);
  projects.splice(index, 1);

  return res.status(200).send();
});

// ROTAS = /projects/:id/tasks ======================

server.post("/projects/:id/tasks", thereIsId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);
  project.tasks.push(title);

  return res.status(201).send();
});
server.listen(3000);
