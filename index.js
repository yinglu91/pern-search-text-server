require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

// routes

// params => http://localhost:5000/:id  => req.params  -- specific resource
// query parameter => http://localhost:5000/?name=henry = req.query

app.get('/users', async(req, res)=>{
  try {
    const {name} = req.query
    const users = await pool.query(`
          SELECT * 
          FROM users 
          WHERE first_name || ' ' || last_name ILIKE $1
        `, [`%${name}%`])

    res.json(users.rows)
  } catch (err) {
    console.log(err.message)
  }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
