require("dotenv").config();
const axios = require("axios");
const express = require("express");
const { warn, info, error } = require("./utils/logging");

const app = express();
const PORT = process.env.PORT || 4747;

app.get("/", (req, res) => {
  res.status(200).send("App Home Page");
});

app.get("/health", (req, res) => {
  res.status(200).send("I am healthy");
});

app.get("/users", async (req, res) => {
  const users = await axios.get(`${process.env.MOCK_API}/users`);
  if (users.data.length === 0) {
    warn("There are no users");
    return res.status(users.status).json(users.data);
  }
  res.status(users.status).json(users.data);
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await axios.get(
      `${process.env.MOCK_API}/users/${req.params.id}`
    );
    res.status(user.status).json(user.data);
  } catch (err) {
    error(`User with id ${req.params.id} not found`);
    res
      .status(err.toJSON().status)
      .json(`User with id ${req.params.id} not found`);
  }
});

app.get("/songs", async (req, res) => {
  const songs = await axios.get(`${process.env.MOCK_API}/songs`);
  if (songs.data.length === 0) {
    warn("There are no songs");
    return res.status(songs.status).json(songs.data);
  }
  res.status(songs.status).json(songs.data);
});

app.get("/songs/:id", async (req, res) => {
  try {
    const song = await axios.get(
      `${process.env.MOCK_API}/songs/${req.params.id}`
    );
    res.status(song.status).json(song.data);
  } catch (err) {
    error(`Song with id ${req.params.id} not found`);
    res
      .status(err.toJSON().status)
      .json(`Song with id ${req.params.id} not found`);
  }
});

app.use((req, res) => {
  const errMsg = `Route Not Found: ${req.originalUrl}`;
  warn(errMsg);
  res.status(404).json({ error: errMsg });
});

app.use((error, req, res, next) => {
  error(`Server Error: ${error.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => info(`App running on port ${PORT}`));
