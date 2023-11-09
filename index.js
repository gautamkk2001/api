var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://gautamkrishnasamy:Gautam2001@cluster0.gshdv94.mongodb.net/?retryWrites=true&w=majority";


var DATABASENAME = "myDataBase";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongodb connection successful");
    });
})

// ---------->Products CRUD

app.get('/api/medcare/getProducts',(request,response)=>{
    database.collection("productData").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.delete('/api/medcare/deleteProducts', (request, response)=>{
    database.collection("productData").deleteOne({
        id:request.query.id
   });
   response.json("Delete Successfully from DB");
})

// ---------->Users CRUD

app.get('/api/medcare/getUsers',(request,response)=>{
    database.collection("registeredUser").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/medcare/addUsers', multer().none(),(request,response)=>{
    database.collection("registeredUser").count({},function(error, numOfDocs){
        database.collection("registeredUser").insertOne({
            id:(numOfDocs+1).toString(),
            username: request.body.username,
            email: request.body.email,
            mobile: request.body.mobile,
            date: request.body.date,
            password1: request.body.password1,
            cpassword1: request.body.cpassword1,
            gender: request.body.gender,
        });
        response.json("Added SuccessFully");
    })
})

app.delete('/api/medcare/deleteUsers', (request, response)=>{
    database.collection("registeredUser").deleteOne({
        id:request.query.id
   });
   response.json("Delete Successfully from DB");
})

// ---------------> Cart Products
app.post('/api/medcare/addToCart', multer().none(),(request,response)=>{
  database.collection("cartData").count({},function(error, numOfDocs){
      database.collection("cartData").insertOne({
          id:(numOfDocs+1).toString(),
          originalId : request.body.originalId,
          title : request.body.title,
          description : request.body.description,
          Quantity :  request.body.Quantity,
          rating :  request.body.rating,
          originalAmount :  request.body.originalAmount,
          cartQuantity :  request.body.cartQuantity,
          stock :  request.body.stock,
          subtotal :  request.body.subtotal,
          email :  request.body.email,
          username :  request.body.username,
          status : request.body.status
      });
      response.json("Added Cart SuccessFully");
  })
})

app.get('/api/medcare/getCartData',(request,response)=>{
  database.collection("cartData").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

app.delete('/api/medcare/deleteCart', (request, response)=>{
  database.collection("cartData").deleteOne({
      id:request.query.id
 });
 response.json("Delete Successfully from DB");
})

// ---------->Admin
app.get('/api/medcare/getAdmin',(request,response)=>{
  database.collection("adminData").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

//------->FeaturedProducts
app.get('/api/medcare/getFeaturedProduct',(request,response)=>{
  database.collection("featured").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

//------> Wishlist Data
app.get('/api/medcare/getWishlist',(request,response)=>{
  database.collection("wishlistData").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

// ------------->Blog
app.get('/api/medcare/getBlogData',(request,response)=>{
  database.collection("blog-data").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

// -------->OrderedProducts
app.get('/api/medcare/getOrderedProducts',(request,response)=>{
  database.collection("orderedProducts").find({}).toArray((error,result)=>{
      response.send(result);
  });
})

// ---------->AllOrders
app.get('/api/medcare/getOrdersAll',(request,response)=>{
  database.collection("ordersAll").find({}).toArray((error,result)=>{
      response.send(result);
  });
})


// --------------->OrderDate
app.get('/api/medcare/getOrderDate',(request,response)=>{
  database.collection("orderDate").find({}).toArray((error,result)=>{
      response.send(result);
  });
})
