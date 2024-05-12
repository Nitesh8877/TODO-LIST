const {Schema,model} = require('mongoose');
const { todoStatus } = require('../../utils/constant');
const { ObjectId } = require('mongodb');

const todoItemSchema = new Schema({
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: todoStatus,
    default: todoStatus.PENDING
  },
  createdBy:ObjectId,
  
},{
    timestamps:true
});

const Todo= model('TodoItem', todoItemSchema);
module.exports =Todo;
