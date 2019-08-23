let express =require('express')
let app = express();
let morgan = require('morgan') //middleware to log user request (Get or POST)
let bodyParser = require('body-parser');
let ejs=require('ejs');

let db=[]

//ejs
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');


app.get('/',function(req,res){
    res.render(__dirname+'/public/'+"index_ejs.html",{userName:'TIM',ar:db});
    //res.render("index_ejs.html",{userName:'TIM'})
});


//________________________________________________________________//
//static
// app.use(express.static(__dirname +"/public"));
// app.use(express.static(__dirname +"/img"));

//________________________________________________________________//
//body parser
app.use(bodyParser.urlencoded({    //tell parser i need you to accept url; e.g. localhost:8080?name=Tim&Age=23
     extended: false }));

app.use(bodyParser.json());   //json is for where we need to send complex data (nested object)

//________________________________________________________________//
//morgan
// app.use(morgan('tiny'));// print out to terminal a string contain protocal itself miliseconds 
// app.use(morgan('common'));

app.use(function(res,req,next){
    let data= new Date();
    console.log("I got a request at "+ data.getHours());
    next();
})
//________________________________________________________________//
//middleware
// app.use(function(req, res,next){
//     console.log("Middleware...1");
//     next();
// });

// app.use(function(req, res,next){
//     console.log("Middleware...2");
//     next();
// });

//________________________________________________________________//
//express
// app.get('/',function(req,res){
//     console.log("Hello from app.get");
//     res.send("Hello");
// });


app.get('/',function(req,res){
    console.log("I go a GET request");
    // res.send("Thank you for your response");
    res.sendFile("index.html");
});

app.get('/about',function(req,res){
    console.log("about");
    res.sendFile(__dirname+'/public/'+"about.html");
});

app.get('/',function(req,res){
    console.log("about");
    res.sendFile(__dirname+'/public/'+"index_bodyparser.html");
});


app.post('/data',function(req,res){
    console.log("I got a post request");
    res.send("Thank you!!")
    console.log(req.body)
    db.push(req.body);
    console.log("I have "+ db.length+" records")
})


app.listen(8080);