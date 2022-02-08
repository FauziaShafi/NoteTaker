const router = require('express').Router();
const fs = require("fs");
// Get the unique ID
const {
    v4: uuidv4
} = require('uuid');


//GET NOTES 
router.get("/notes", (req, res) => {
    console.log("Api Notes get all notes ");
    //Read file 
    fs.readFile("./db/db.json", "utf8", (error, response) => {


        //converting it into a JSON object 
        const dbNotes = JSON.parse(response);

        res.json(dbNotes);

    })
})

//add notes 
router.post("/notes", (req, res) => {

    const newNote = {
        ...req.body,
        id: uuidv4()
    };
    console.log("New", newNote);

    //Read file 
    fs.readFile("./db/db.json", 'utf8', (error, response) => {


        const previousNotes = JSON.parse(response);

        previousNotes.push(newNote);
        const stringNotes = JSON.stringify(previousNotes, null, 4);
        console.log("Add both", stringNotes);


        fs.writeFile('./db/db.json', stringNotes, (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully updated notes!'));


        res.json(stringNotes);
    })


})



module.exports = router;