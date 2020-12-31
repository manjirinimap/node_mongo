const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const connection =require('./connection');
const route=require('./routes');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use('/api',route);
app.use(express.static(path.join(__dirname, '/')));



const port =4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
