var express=require("express");
var app=express();
var mysql=require("mysql");
var bodyParser=require("body-parser");
app.set("view engine","ejs"); 
 app.use(bodyParser.urlencoded({extended:true}));
 var con = mysql.createConnection({
  host: "localhost",
  user: "pradhumn",
  password: "root",
  database:"donar"
});
 
 app.get("/",function(req,res){
  var sql = "SELECT COUNT(*) AS count FROM customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var count=result[0].count;
  
 	res.render("firstpage.ejs",{data:count});
 });
});
app.get("/home",function(req,res){
	res.render("donor.ejs");
});
app.post("/home",function(req,res){
	var person={
		
  name:req.body.name ,
  email:req.body.email ,
  PHONE:req.body.phone ,
  age:req.body.age ,
  GENDER:req.body.GENDER,
  bloodgroup:req.body.blood_group,
  location:req.body.location
	};
	con.query('INSERT INTO customers SET ?',person,function(err,result){
		if(err) throw err;
		res.redirect("/home");
	});
});
app.get("/about",function(req,res){
res.render("about.ejs");
});
app.get("/search",function(req,res){
res.render("search.ejs");
});
app.post("/search",function(req,res){
  
 con.query(`SELECT * FROM customers WHERE location='${req.body.location}' AND bloodgroup='${req.body.blood_group}'`, function (err, data) {
    if (err) throw err;
    res.render('userlist', { title: 'User List', userData: data}); 
  });
});
app.get("/all",function(req,res){
	 con.query(`SELECT * FROM customers`, function (err, data) {
    if (err) throw err;
    res.render('alldonors', { title: 'User List', userData: data}); 
  });
});
app.listen(3000,function(){
 	console.log("hey there");
 }); 