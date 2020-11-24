const express = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//root route
app.get('/', (req, res) => {
    res.render('index', {data: data.projects});
}); 

//about route
app.get('/about', (req, res) =>{
    res.render('about');
});

//dynamic project route
//issues here with the project routes
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = data.projects.find( ({id}) => id === +projectId);

    res.render(`project/${id}`, {project});
});

app.listen(3000, ()=>{
    console.log('This application is running on localhost:3000');
});