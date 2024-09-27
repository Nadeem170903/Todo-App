const mongoose = require('mongoose');
const schema = mongoose.Schema;


const TodoSchema = new schema({
    text:{
        type:String,
    },
    background:{
        type:String,
    },
    textColor:{
        type:String,
    }
})

const Todo = mongoose.model('Todo', TodoSchema);


module.exports = Todo;