const express = require("express");
const entryactivities = express.Router();
const pool = require("../connection");

entryactivities.get("/", (req, res) => {
    const entryID = req.query.entry_id;
    const activityID = req.query.activity_id;
 
    if (entryID !== undefined && activityID !== undefined) {
        pool.query(`select * from entryactivities where entry_id='${entryID}' AND activity_id='${activityID}'`).then((result) => {
            res.send(result.rows);
        });
    } else if (entryID !== undefined && activityID === undefined) {
        pool.query(`select * from entryactivities where entry_id='${entryID}'`).then((result) => {
            res.send(result.rows);
        });
    } else if (activityID !== undefined && entryID === undefined) {
        pool.query(`select * from entryactivities where activity_id='${activityID}'`).then((result) => {
            res.send(result.rows);
        });
    }
    else {
        pool.query(`select * from entryactivities ORDER BY entry_id desc`).then((result) => {
           console.log("pulling all from entryactivities");
            res.send(result.rows);
        });
    }

    entryactivities.get("/:id", (req, res) => {
        const id = req.params.id;
        pool.query(`select * from entryactivities where id = ${id}`).then((result) => {
        (result.rows.length > 0) ? res.send(result.rows[0]) : res.sendStatus(404);
        })
    });

    entryactivities.post("/", (req, res) => {
        const entryID = req.body.entry_id;
        const activityID = req.body.activity_id;
            pool.query(`insert into entryactivities (entry_id, activity_id) values (${entryID}, ${activityID})`).then((result) => { 
                res.json({message: 'success'});
            });
        });

    entryactivities.put("/:id", (req, res) => {
        const entryID = req.body.entry_id;
        const activityID = req.body.activity_id;
        const id = req.params.id;
        if (entryID !== undefined && activityID !== undefined) {
            pool.query(`update entryactivities set entry_id = ${entryID}, activity_id = ${activityID} where id = ${id}`).then(result => {
                res.send({data: 'Entry Updated'});
            }).catch((error) => {
                res.send({error: error});
            })
        }
        else if (entryID !== undefined) {
            pool.query(`update entryactivities set entry_id = ${entryID} where id = ${id}`).then(result => {
                res.send({data: 'Entry Updated'});
            }).catch((error) => {
                res.send({error: error});
            })
        }
        else if (activityID !== undefined) {
            pool.query(`update entryactivities set activity_id = ${activityID} where id = ${id}`).then(result => {
                res.send({data: 'Entry Updated'});
            }).catch((error) => {
                res.send({error: error});
            })
        } else {
            res.send({data: 'data'})
        }
    });

    entryactivities.delete("/:id", (req, res) => {
        const id = req.params.id;
        pool.query(`delete from entryactivities where id = ${id}`).then(result => {
            res.sendStatus(204);
        })
    })
})

module.exports = entryactivities;