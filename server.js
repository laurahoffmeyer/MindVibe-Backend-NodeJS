const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const entries = require("./routes/entries");
const activities = require("./routes/activities");
const entryactivities = require("./routes/entryactivities");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use('/entries', entries);
app.use('/activities', activities);
app.use('/entryactivities', entryactivities);

app.use(function(req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 });

app.listen(port, () => console.log(`listening on port ${port}`));