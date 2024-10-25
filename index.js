const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const method_override = require("method-override");
 

app.use(express.urlencoded({ extended: true}));

app.use(method_override('_method'));

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// av tk to server ki setup thi.

let posts = [
    {
      id: uuidv4(),  
      username : "ujjawal jaiswal",
      content: "I love Myself! Coz i have some suddenly thougths called imagination that are un predictable ! yh jfen  rnnfjinri          rjgn rnfgwue    cfnuifvbh ffnoreufniv rnfurenuir fhfnurehnfu8rn fr urhvu8     ifgnerui"  
    },
    {
        id: uuidv4(), 
        username : "Akhand jaiswal",               // creating database here coz we dont have in actual.
        content: "I love Everything!"  
    },
    {
        id: uuidv4(), 
        username : "Tiwari ji",
        content: "No need to love"  
    }
];

app.get("/",(req,res)=>{
    res.send("server working well!");
});





//index route
app.get("/posts",(req,res)=>{
    res.render("index.ejs" , {posts});     //sending all posts to index ejs file. as array.
});




//create route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");     //now it return a form from view folder
});

app.post("/posts",(req , res)=>{
   let {username , content} = req.body;              //on the basis of form details we can use that details
   let id = uuidv4();
   posts.push({id ,username , content});                //adding an object element of array
  
   //    res.send("post request working"); 
   res.redirect("/posts");               //instead of sending a response we redirecting to the posts route directly after creating a new post . (it is also a get request to /posts).
});
   

//Show route (by id)
app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);     // return id if match to the id present in the posts (array).  if not matched -------> undefined
//   console.log(post); 
  if(post !== undefined){
    res.render("show.ejs",{post});
  }
  else{
    res.render("notFound.ejs");
    app.post("/posts",(req,res)=>{
        res.redirect("/posts"); 
    });
  }
 
});

//creating id's for new threads(posts).
 //UUID Package
 //Universally unique identifier        //by the way , ddatabase create a uniqe id itself . but here we can use UUID package---------------> npm install uuid




//update or edit post (thread) -------> Patch request or put request

app.patch("/posts/:id",(req , res) =>{
  let { id } = req.params;
  let newContent = req.body.content;

  let post = posts.find((p) => id === p.id); 
  post.content = newContent;
  console.log(post);
  // res.send("patch request working")
  res.redirect("/posts");
  
})
app.get("/posts/:id/edit",(req , res)=>{
  let { id } = req.params;
  let post = posts.find((p) => id === p.id); 
  res.render("edit.ejs",{ post });
})

//delete

app.delete("/posts/:id",(req,res)=>{
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id); 
  res.redirect("/posts");

})

app.listen(port , () => {
    console.log("Listening to Port : 8080");
});


