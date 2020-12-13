const express = require('express');
const app = express();
const {projects} = require('./data.json');
const path = require('path');

app.set('view engine', 'pug');

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

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

//Handle 404 Erros
app.use((req, res, next) => {
    const err = new Error("404 Page Not Found");
    err.status = 404;
    next(err);
});

//Global Error Handler
app.use((err, req, res, next) =>{
    if (err.status === 404) {
        console.log("404 Error.  Page Not Found");
        err.message = "An Error Occured!  The Page Wasn't found!";
        res.status(404);
        res.render('page-not-found', {err});
    } else {
        console.log("A Server Error Occurred! -__- Try Returning to the Home Page!");
        err.message = `Looks Like a Server Error Ocurred \\('0')/`;
        err.status = 500 || err.status;
        res.status(500);
        res.render('error', {err});
    }
});

app.listen(3000, ()=>{
    console.log('This application is running on localhost:3000');
});