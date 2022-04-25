var express = require('express');
// const app = require('../app');
var router = express.Router();
var con=require('../config/config');
var nodemailer = require('nodemailer');
/* GET users listing. */

router.get('/', function(req, res, next) {
  var sql="select * from product"
  var sql2="select userMail, count(*) as total FROM cart where userMail=?;"
  if(req.session.user){
    var email=req.session.user.email;
    }
    var user=req.session.user;
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(result)

        let product = result;
      con.query(sql2,[email],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
            var CartTotal = result[0].total;
          console.log(result)
          console.log("products===============",product)
          console.log(CartTotal)
          res.render('user/home',{product,user,CartTotal});
        }
      
      })
    }
  })
});
router.get('/userLogin',function(req,res,next){
  res.render("user/userLogin",{homepage:true})
})
router.get('/userReg',function(req,res,next){
  var msg=""
  res.render("user/userReg",{msg,homepage:true})
})
router.get("/cart/:mail",(req,res)=>{
sql="SELECT product.Product_name,product.Price,product.Image,product.Description,cart.userMail,cart.Id,cart.qnty FROM product INNER JOIN cart ON product.id = cart.Product_id AND cart.userMail=?;"
con.query(sql,[req.params.mail],(err,result)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("******",result)
    var user=req.session.user;
    res.render('user/cart',{homepage:true,product:result,user})
  }
})


})
router.post('/Ulogin',(req,res)=>{
  console.log(req.body);
  var email=req.body.email;
  var pass=req.body.password;
  var sql="select * from user where email=? and pass=?"
  con.query(sql,[email,pass],(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      if(result.length > 0){
          console.log("login successfull")
          req.session.user=result[0];
          console.log("session", req.session.user)
          res.redirect('/users')
      }else{
        console.log("login error")
      }
    }
  })
})
  // console.log(req.body.mail)
router.post('/Ureg',(req,res)=>{ 
  console.log(req.body);
data=req.body;
var email=req.body.email;
var sql1="select * from user where email=?"
var sql2="insert into user set ?"
con.query(sql1,[email],(err,result)=>{
  if(err){
    console.log(err)
  }
  else{
    if(result.length>0){
      console.log("This email id has been already taken.")
      var msg="This email id has been already taken."
      res.render('user/userReg',{msg,homepage:true})
    }
    else{
      con.query(sql2,data,(err,result)=>{
        if(err){
          console.log(err)
        } 
        else{
          var msg="Login to continue"
          console.log("success")
          res.render('user/userReg',{msg,homepage:true})
        }
      })
    }
  }
})
})
  // var sql="insert into user set ?"
  // var data=req.body;
  // con.query(sql,data,(error,result)=>{
  //   if(error){
  //     console.log(error)
  //   }
  //   else{
  //     console.log("successfully inserted");
  //   }
  // })

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/users')
})
router.get('/update/:email',(req,res)=>{
  var email=req.params.email;
  console.log(email);
  var sql="select * from user where email= ?"
  con.query(sql,[email],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      var userData=result[0];
      res.render('user/userEdit',{userData})
    }
  })
})
router.post('/updateInfo',(req,res)=>{
  var data=req.body;
  console.log(data);
  var id=req.body.id;
  var sql2=`update user set ? where id=${id}`
  con.query(sql2,data,(err,result)=>{
    if(err){
      console.log(err) 
    }
    else{
      var sql3=`select * from user where id=${id}`
      con.query(sql3,(err,row)=>{
        if(err){
          console.log(err)
        }
        else{
          req.session.user=row[0];
          res.redirect('/users/')
        }
       
      })
     
    }
  }) 
})
router.get("/addtoCart/:Pid",(req,res)=>{
  var Pid=req.params.Pid;
  var email=req.session.user.email;
  var qdata;
 sql  = "select * from cart where userMail= ? and Product_id= ?";
 sql2 = "update cart set qnty = ? where userMail = ? and Product_id= ?";
 sql3 = "  INSERT INTO cart (userMail, Product_id) VALUES (?,?);"
 con.query(sql,[email,Pid],(err,result)=>{
              if(err){
                  console.log(err)
              }else{
                if(result.length>0){
                  console.log("this product is already added");
                  console.log(result);
                    qdata = result[0].qnty + 1;
                    con.query(sql2,[qdata,email,Pid],(err,result)=>{
                      if(err){
                        console.log(err)
                      }else{
                        res.redirect('/users/')
                      }
                    })
                  

                }else{
                  console.log("cart not added")
                  con.query(sql3,[email,Pid],(err,result)=>{
                    if(err){
                      console.log(err)
                    }else{
                      res.redirect('/users/')
                    }
                  })


                }
              }
 })
 router.get("/remove/:Id",(req,res)=>{
   var Id=req.params.Id;
   console.log(Id)
   sql="DELETE from cart where Id=?"
   con.query(sql,[Id],(err,result)=>{
     if(err){
       console.log(err)
     }
     else{
      res.redirect('/users/')
     }
   })

 })
})

router.get('/orders/:id/:qnty',(req,res)=>{
  var total;

  sql="SELECT product.Product_name,product.Price,product.Image,product.Description,cart.userMail,cart.Id,cart.qnty FROM product INNER JOIN cart ON product.id = cart.Product_id where cart.Id = ?"
  sql2="insert into orders set ?"
  var mail= req.session.user.email;
  con.query(sql,[req.params.id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log("haiiiiiiiiiiiiiiiiii",result)
      total = result[0].qnty * result[0].Price;
      let payDetails = {
        totalAmount : total,
        img : result[0].Image,
        qnty:result[0].qnty,
        mail_id:mail

      }
      con.query(sql2,payDetails,(err,row)=>{
        if(err){
          console.log(err)
        }else{
          console.log(payDetails)
          res.render('user/orders',{payDetails})
        }
      })
      
      
    }
  })
})

router.get('/readNow/:id',(req,res)=>{
  var id = req.params.id;
  sql="Select * from Product where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      var user = req.session.user;
      res.render('user/read',{data:result,homepage:true,user})
    }
  })
})

router.get('/addProduct',function(req,res){
  var user = req.session.user;
  res.render('user/addProduct',{user})
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
  
  let data={
   
    Product_name:req.body.name,
    Description:req.body.description,
    Price:req.body.price,
    Image:image_name,
    userId:req.session.user.id,
    username:req.session.user.user_name	
  }; 
  console.log(data)
  con.query(sql,data,(err,result)=>{
    if(err){
      console.log(err)
    }else{
          var sql3 = "select userMail from follow where authorId = ?"
          con.query(sql3,[req.session.user.id],(err,datas)=>{
            if(err){
              console.log(err)
            }else{
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  //althafhussain816@gmail.com
                  user: 'greencartkottayam@gmail.com',
                      pass: 'ashwinbabu@123',
                },
                tls:{
                  rejectUnauthorized : false,
                },
              });
              
                datas.map((obj)=>{


                  let mailOptions = {
                    from: 'Book READING',
                    to: obj.userMail,
                    subject: 'Notification',
                    text: `new book uploaded by ${req.session.user.user_name}`
                  }; 
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      }
                  });
                  console.log("daatsss..................",obj.userMail)
                })
            }
          })




      res.redirect('/users/')
    }
  })
  }) 
  } 
  })

  router.get('/mybooks',(req,res)=>{
    var id = req.session.user.id;
    sql = "select * from product where userId = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var user = req.session.user;
        res.render('user/mybooks',{product:result,user,homepage:true})
      }
    })
  })
  var message = "";
  router.get('/authors',(req,res)=>{
    var id = req.session.user.id;
    sql = "select * from user"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var user = req.session.user;
        res.render('user/auther',{product:result,homepage:true,user,message})
      }
    })
  }) 
   router.get('/follow/:id/:name',(req,res)=>{
     var user = req.session.user;
     var sql2 ="select * from follow where userID = ? and authorId = ?"
     con.query(sql2,[req.session.user.id,req.params.id],(err,row)=>{
       if(err){
        console.log(err)
       }else{
         if(row.length > 0 ){
              console.log("already Following")
              message = "already Following"
              res.render('user/err',{homepage:true,user})
        }else{
          var id = req.session.user.id;
          sql = "insert into follow set ?"
          var data = {
            userID:req.session.user.id,
            userName:req.session.user.user_name,
            userMail:req.session.user.email,
            authorName:req.params.name,
            authorId:req.params.id
      
          }
          con.query(sql,data,(err,result)=>{
            if(err){
              console.log(err)
            }else{
              var user = req.session.user;
              res.redirect('/users/authors')
            }
          })
         }
       }
     })
  
  })
  router.get('/followers',(req,res)=>{
    var id = req.session.user.id;
    sql = "select * from follow where authorId=?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var user = req.session.user;
        res.render('user/followers',{product:result,homepage:true,user})
      }
    })
  }) 

  
  router.get('/Following',(req,res)=>{
    var id = req.session.user.id;
    sql = "select * from follow where userID=?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var user = req.session.user;
        res.render('user/following',{product:result,homepage:true,user})
      }
    })
  }) 
 
  router.get('/paymentR',(req,res)=>{
    var id = req.session.user.id;
    sql = "select * from payment where autherID=?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var user = req.session.user;
        res.render('user/rpayment',{product:result,homepage:true,user})
      }
    })
  }) 


  router.get('/contribute/:id',(req,res)=>{
        var id = req.params.id;
        var user = req.session.user;
        res.render('user/pay',{id,user})
    
  }) 
  router.post('/payment',(req,res)=>{
    console.log(req.body)
    var sql = "insert into  payment set ?"
    con.query(sql,req.body,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/users/')
      }
    })

}) 
  router.get('/unfollow/:id',(req,res)=>{
    var id = req.session.user.id;
    aid=req.params.id;
    console.log(id,aid)
   var sql = `Delete from follow where userID = ${id} and authorId = ${aid}`
    con.query(sql,(err,result)=>{
      if(err){
        console.log(err)
      }else{
          res.redirect('/users/followers')
      }
    })
  }) 
module.exports = router;
