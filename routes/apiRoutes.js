// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on Notes.
// ===============================================================================
var fs = require("fs");
var noteData = require("../db/db.json");
var {v4 : uuidv4} = require('uuid');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.send(noteData);
  });

  app.post("/api/notes", function(req, res) {

    let noteId = uuidv4();
    let noteNew = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const noteAll = JSON.parse(data);

      noteAll.push(noteNew);

      fs.writeFile("./db/db.json", JSON.stringify(noteAll, null, 2), err => {
        if (err) throw err;
        res.send(noteData);
        console.log("Your note has been created!")
      });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const noteAll = JSON.parse(data);
      const noteNewList = noteAll.filter(note => note.id != noteId);

      fs.writeFile("./db/db.json", JSON.stringify(noteNewList, null, 2), err => {
        if (err) throw err;
        res.send(noteData);
        console.log("Your note has been deleted!")
      });
    });
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
