const express = require("express");
const entries = express.Router();
const pool = require("../connection");

entries.get("/", (req, res) => {
    const mood = req.query.mood;
    const entryDate = req.query.entrydate;
    const entryTime = req.query.entrytime;
    const journalEntry = req.query.journalentry; 
    const user_id = req.query.user_id;

    let where;
    let and;
    let moodString;
    let entryDateString;
    let entryTimeString;
    let journalEntryString;
    let user_idString;

    (mood || entryDate || entryTime || journalEntry || user_id) ? where  = " where " : where = "";
    (mood) ? moodString = `mood = ${mood} ` : moodString = "";
    
    if (entryDate) {
        (mood) ? and = "and " : and = "";
        entryDateString = `${and}entrydate='${entryDate}' `;
    } else {entryDateString = "";}

    if (entryTime) {
        (mood || entryDate) ? and = "and " : and = "";
        entryTimeString = `${and}entrytime='${entryTime}' `;
    } else {entryTimeString = "";}

    if (journalEntry) {
        (mood || entryDate || entryTime) ? and = "and " : and = "";
        journalEntryString = `${and}journalentry='${journalEntry}' `;
    } else {journalEntryString = "";}

    if (user_id) {
        (mood || entryDate || entryTime || journalEntry) ? and = "and " : and = "";
        user_idString = `${and}user_id='${user_id}' `;
    } else {user_idString = "";}

    pool.query(`select * from entries${where}${moodString}${entryDateString}${entryTimeString}${journalEntryString}${user_idString} ORDER BY id desc`).then((result) => {
        (result) ? res.send(result.rows) : res.sendStatus(404);
    });
});

entries.get("/:id", (req, res) => {
    const id = req.params.id;

    pool.query(`select * from entries where id = ${id}`).then((result) => {
        (result.rows.length > 0) ? res.send(result.rows[0]) : res.sendStatus(404);
    })
});

entries.post("/", (req, res) => {
    const mood = req.body.mood;
    const entryDate = req.body.entrydate;
    const entryTime = req.body.entrytime;
    const journalEntry = req.body.journalentry; 
    const user_id = req.body.user_id;

    (journalEntry) ? journalEntryString = `${journalEntry}` : journalEntryString = "";

    pool.query(`insert into entries (mood, entrydate, entrytime, journalentry, user_id) values (${mood},'${entryDate}', '${entryTime}', '${journalEntryString}', '${user_id}')`).then((result) => { 
        res.json({message: 'success'});
    })
});

entries.put("/:id", (req, res) => {
    console.log("you hit me")
    const mood = req.body.mood;
    const entryDate = req.body.entrydate;
    const entryTime = req.body.entrytime;
    const journalEntry = req.body.journalentry; 
    const user_id = req.body.user_id;
    const bodyId = req.body.id;

    pool.query(`update entries set mood='${mood}', entrydate='${entryDate}', entrytime='${entryTime}', journalentry='${journalEntry}', user_id='${user_id}' where id=${bodyId}`).then((result) => {
        res.send({data: 'Entry Updated'});
    })
    .catch((error) => {
        console.log("ERROR Object.keys():", Object.keys(error));
        res.send({error: error});
    })
});

entries.delete("/:id", (req, res) => {
    const id = req.params.id;

    pool.query(`delete from entries where id = ${id}`).then((result) => {
        res.sendStatus(204);
    })
});

module.exports = entries;