const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
console.log(process.env.DATABASE_URL_1)

student_id = 4

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL_1
  
})

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {res.render('pages/index')})


app.get('/class', (req, res)=> {
  var getUsersQuery = 'SELECT * FROM student order by id;';
  pool.query(getUsersQuery, (error, result)=>{
    if(error)
      res.end(error);
    var results = {'rows':result.rows}

    res.render('pages/display', results)
  })
})

app.get('/student/:id', (req, res)=> {
  var id = req.params.id;
  
  var getStudentQuery = `SELECT * FROM student where id=${id};`;
  pool.query(getStudentQuery, (error, result)=>{
    if(error)
      res.end(error);
    var results = {'student': result.rows};
    res.render('pages/update', results);
  
  })
})

app.post('/adduser', (req, res) => {
  console.log("add request")
  var name = req.body.name
  var height = req.body.height
  var weight = req.body.weight
  var gpa = req.body.gpa
  var hair = req.body.hair
  var addStudentQuery = `insert into student (name,height,weight,hair_color, gpa) values  ('${name}','${height}', '${weight}','${hair}','${gpa}')`;
  pool.query(addStudentQuery, (error, result)=>{
    if(error)
      res.send(error);
    else
      console.log(student_id);
      student_id += 1;
      res.redirect('/class')
    })
 
})

app.post('/update', (req, res) => {
  console.log("update request")
  var id = req.body.id
  var name = req.body.name
  var height = req.body.height
  var weight = req.body.weight
  var gpa = req.body.gpa
  var hair = req.body.hair
  var updateStudentQuery = `update student set name ='${name}', height = '${height}', weight = '${weight}',hair_color = '${hair}', gpa = '${gpa}' where id='${id}';`;
  pool.query(updateStudentQuery, (error, result)=>{
    if(error)
      res.send(error);
    else
      console.log(student_id);
      res.redirect('/class')
    })
 
})

app.post('/delete', (req, res) => {
  console.log("delete request")
  var id = req.body.id;
  var deleteStudentQuery = `delete from student where id='${id}';`;
  pool.query(deleteStudentQuery, (error, result)=>{
    if(error)
      res.send(error);
    else
      console.log(id);
      res.redirect('/class')
    })
 
})


app.get('/cool', (req, res) => res.send(cool()))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

