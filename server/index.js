const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config()

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO games ( name, cost, category ) VALUES ( ?,?,? )";

  db.query(SQL, [name, cost, category], (err, result) => {
    console.log(err); 
  })
})

app.get("/getCards", (req,res) => {
  let SQL = "SELECT * FROM games";

  db.query(SQL, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, cost, category } = req.body;

  let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";

  db.query(SQL, [name, cost, category, id], (err, result) => {
    if(err) {
      console.log(err);
      res.send({ err: err });
    } else {
      console.log(result);
      res.send(result);
    }
  })
})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  let SQL = "DELETE FROM games WHERE idgames = ?";

  db.query(SQL, id, (err, result) => {
    if(err) {
      console.log(err);
      res.send({ err: err });
    } else {
      console.log(result);
      res.send(result);
    }
  })
})

app.listen(3001, () => {
  console.log("rodando servidor")
})