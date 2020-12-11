const express = require('express');
const app = express();
const {projects} = require('./data.json');
const path = require('path');

app.set('view engine', 'pug');

//this or the stuff below
//app.use('/static', express.static('public'));
//app.use('/images', express.static('images'));

app.use("/static", express.static(path.join(__dirname, "/public")));
app.use("/images", express.static(path.join(__dirname, "/images/")));

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
//issues here with the project routes
app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    console.log(project);
    res.render('project', {project});
});

//Handle 404 Erros
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    next(err);
});

//Global Error Handler
app.use((err, req, res, next) =>{
    if (err.status === 400) {
        console.log("404 Error.  Page Not Found");
        res.locals.message = "An Error Occured!  The Page Wasn't found!";
        res.status(404);
        res.render('error', {err});
    } else {
        const err = new Error();
    

    }

});

app.listen(3000, ()=>{
    console.log('This application is running on localhost:3000');
});