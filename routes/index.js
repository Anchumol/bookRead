var express = require('express');
var router = express.Router();
var con=require('../config/config');
/* GET home page. */
router.get('/home', function(req, res, next) {
  var sql="select * from product"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(result)
      var admin = req.session.admin;
      res.render('admin/index',{result,admin});
    }
  })

  
});
router.get('/', function(req, res, next) {
  res.render('admin/login')
});

router.post('/login', function(req, res, next) {
 var name = "admin";
 var pass = "123"
 var user = {
   name:name,
   pass:pass
 }
 console.log(name.pass)
 var user=req.body.user;
 var password= req.body.password;
 if(name==user && pass==password){
   req.session.admin=user;
   res.redirect('/home')
 }else{
   res.redirect('/')
 }
});
router.get('/addProduct',function(req,res){
  res.render('admin/addProduct')
})

router.post('/addProduct',function(req,res){
var image_name;
if(!req.files) return res.status(400).send("no files were uploaded.");

var file=req.files.uploaded_image;
var image_name = file.name;
let sql="INSERT INTO product SET ?";

console.log(file)
console.log(image_name);
if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
){
  file.mv("public/images/product/"+file.name,function(err){
    if(err) return res.status(500).send(err);
    console.log(image_name);
var ID=0;
let data={
 
  Product_name:req.body.name,
  Description:req.body.description,
  Price:req.body.price,
  Image:image_name,
  aID:ID,
  aName:"admin"
}; 
console.log(data)
con.query(sql,data,(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.redirect('/')
  }
})
}) 
} 
})
router.get('/user',(req,res)=>{

  sql = "select * from user"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{
     res.render('admin/home',{product:result})
  }
})
})

router.get('/delete/:id',(req,res)=>{

  id=req.params.id;

 var sql = `Delete from  user where id  = ${id}`
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{
        res.redirect('/home')
    }
  })
}) 
  
module.exports = router;

