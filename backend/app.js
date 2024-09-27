const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Mongo_Url = 'mongodb://127.0.0.1:27017/TodoApp';
const Todo = require('./models/TodoDB')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

const main = async()=>{
    await mongoose.connect(Mongo_Url);
}
main()
.then(()=>{
    console.log('connection successfull');
}).catch((err)=>{
    console.log(err);
});


app.get('/get',async(req,res)=>{
    let todoItems = await Todo.find();
    console.log(todoItems);
    res.json(todoItems);
})

app.post('/add',async(req,res)=>{
    let {text , background , textColor} = req.body;
    console.log(text , background, textColor)
    let todo = new Todo({text , background , textColor});
    
    await todo.save();
    res.json({message:'Todo Added Successfully',item:todo})
    console.log(todo)
});

app.delete('/delete/:id',async(req,res)=>{
    let todoId = req.params._id;
    console.log(todoId);
    let result = await Todo.findOneAndDelete({id:todoId});
    if(result){
        res.json({message:"item delete successfully"});
    }
    console.log("item delte")
})


app.listen('3001',()=>{
    console.log("server is working");
})


