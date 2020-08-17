const express = require("express");
const helmet = require("helmet");
const users = require("../users/users-model");
const { restart } = require("nodemon");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/api/users", async (req, res) => {
  const data = await users.getAll();
  res.status(200).json(data);
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await users.findBy({ id });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "user id doesn't exist" });
  }
});

server.post("/api/register", async (req, res) => {
  const userData = req.body;
  const user = await users.add(userData);
  res.status(201).json(user);
});

server.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = await users.remove(id);
  res.status(200).json({ deleted: data });
});

module.exports = server;
