// Imports
const express = require('express');
const Datastore = require('nedb');
const app = express()
const port = 3000

const database = new Datastore('database.db');
database.loadDatabase();
// Static Files
app.use(express.static('public'))
app.use(express.json({limit:'1mb'}));
// Print main index html file
app.get('',(req,res)=>{
    res.sendFile(__dirname+'/View/index.html')
})

// Routes
app.get('/api',(req,res)=>{
    database.find({},(err,data)=>{
        res.json({data});
    });
});
app.post('/api',(req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    const mood = req.body.mood;
    data.timestamp = timestamp;
    database.insert(data)
    console.log(data); //<- To print in Server terminal what's being inserted in the database.
    res.json({data});
});

app.listen(port, () => console.info('Listening on port '+port))
