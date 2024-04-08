const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db")

const port = 5000 || process.env.PORT;

// Middleware

app.use(cors());
// app.use(express.json());

// Routes

// Params => http://localhost:5000/:id => req.params
// Query Parameter => http://localhost:5000/?name=henry = req.query

app.get("/users", async(req, res) => {

    try {

        const { name } = req.query;

        // first_name last_name => %{}%
        // "Henry Ly" => %ly%
        // || => OR SQL || => Concat

        // sql injection const users = await pool.query(`SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE '%${name}%'`;

        // library recommended way
        const users = await pool.query("SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1", [`%${name}%`]);

        res.json(users.rows);
        
    } catch (err) {

        console.error(err.message);
        
    }

})

// 
app.listen(port, () => {

    console.log(`Server has started on port: ${port}`);

})