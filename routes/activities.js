const express = require("express");
const activities = express.Router();
const pool = require("../connection");

activities.get("/", (req, res) => {
    const name = req.query.name;
    const category = req.query.category;
 
    if (name !== undefined && category !== undefined) {
        pool.query(`select * from activities where name='${name}' AND category='${category}'`).then((result) => {
            res.send(result.rows);
        });
    } else if (category !== undefined && name === undefined) {
        pool.query(`select * from activities where category='${category}'`).then((result) => {
            res.send(result.rows);
        });
    }  else if (name !== undefined && category === undefined) {
        pool.query(`select * from activities where name='${name}'`).then((result) => {
            res.send(result.rows);
        });
    }
    else {
        pool.query(`select * from activities ORDER BY category desc`).then((result) => {
           console.log("pulling all from activities");
            res.send(result.rows);
        });
    }
});

activities.get("/:id", (req, res) => {
    const id = req.params.id;

    pool.query(`select * from activities where id = ${id}`).then((result) => {
        (result.rows.length > 0) ? res.send(result.rows[0]) : res.sendStatus(404);
    })
});

module.exports = activities;