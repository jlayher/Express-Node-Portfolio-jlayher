//variables/requirements
const express = require('express');
const app = express();
const {projects} = require('./data.json');
const path = require('path');

//set port
let port = process.env.PORT || 3000;

//set view engine
app.set('view engine', 'pug');

//serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

//root route
app.get('/', (req, res) => {
    res.render('index', {projects});
}); 

//about route
app.get('/about', (req, res) =>{
    res.render('about');
});

//error route
app.get('/error', (req, res) => {
    res.render('error');
});

//page-not-found route
app.get('/page-not-found', (req, res) => {
    res.render('page-not-found');
});

//dynamic project route
app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    if (project){
        res.render('project', {project});
    } else {
        res.redirect('/views/page-not-found');
    }  
});

//Handle 404 Errors
app.use((req, res, next) => {
    const err = new Error("404 Page Not Found");
    err.status = 404;
    next(err);
});

//Global Error Handler 
app.use((err, req, res, next) =>{
    if (err.status === 404) {
        err.message = "An Error Occured!  The Page Wasn't found!";
        res.status(404);
        res.render('page-not-found', {err});
        console.log(err.status + " Error: " + err.message);
    } else {
        err.message = `Looks Like a Server Error Ocurred!`;
        err.status = 500 || err.status;
        res.status(500);
        res.render('error', {err});
        console.log(err.status + " Error: " + err.message);
    }
});

app.listen(port, () => {
    console.log(`This application is listening on port http://localhost:${port}`)
});

