const { ObjectId } = require("mongodb");
const { iserror, badReq, rm, noContent } = require("../../utils/common");
const { responseCode, responseMessage } = require("../../utils/constant");
const { createTodoDB, getTodoDB, updateTodoDB, deleteTodoDB, getAllTodoDB, listingTodoDB, downloadCSVDB, uploadDataDB } = require("./query");
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const csvParser = require('csv-parser');

const fastcsv = require('fast-csv');

module.exports = {
    createTodo: async (req, res) => {
        try {
            console.log(req.authUser)
            const { description, status } = req.body;
            const newTodo =await createTodoDB({description,status,createdBy:req.authUser?._id})
            if(newTodo) return rm(res, responseCode.CREATED, responseMessage.TODO_CREATED,newTodo)
        } catch (error) {
                console.log(error)
            return iserror(res)
        }
    }
    ,
    
    updateTodo: async (req, res) => {
        try {
            const { description, status } = req.body;
            const todo = await getTodoDB({_id:req.params.id});
            if (!todo) {
                return badReq(res, responseMessage.NOT_FOUND)
            }
            let updated=await updateTodoDB({_id:req.params.id}, {description,status});
            if(updated) return rm(res, responseCode.OK, responseMessage.TODO_UPDATED);

             return badReq(res);
        } catch (error) {
            console.log(error)
                 return iserror(res)
                }
    }
    ,
    
    deleteTodo: async (req, res) => {
        try {
            const todo =await deleteTodoDB({_id:req.params.id});
            if(todo) return rm(res, responseCode.OK, responseMessage.TODO_DELETED);
            return badReq(res)
        } catch (error) {
            console.log(error)
                    return iserror(res)
                }
    }
    ,
    getAllTodos: async (req, res) => {
        try {
            const todos = await getAllTodoDB({createdBy:req.authUser?._id});
            if(todos[0]) return rm(res, responseCode.OK, responseMessage.TODO_GET_SUCCESS,todos);
            return noContent(res)
        }catch (error) {
            console.log(error)
                    return iserror(res)
                }
    }
,    

getTodoById: async (req, res) => {
    try {
        const todo =await getTodoDB({_id:req.params.id, createdBy:req.authUser?._id});
        if(todo) return rm(res, responseCode.OK, responseMessage.TODO_GET_SUCCESS, todo);
        return noContent(res)
    } catch (error) {
        console.log(error)
                return iserror(res)
            }
}
,

uploadTodosFromCSV: async (req, res) => {
    try {
        if (!req.file) {
            return badReq(res, 'CSV file is required' );
        }
        const csvData = req.file.buffer.toString(); 
        const rows = [];
        fastcsv.parseString(csvData, { headers: true })
            .on('data', (row) => rows.push({...row,createdBy:req.authUser?._id}))
            .on('end', async () => {
               let created=await uploadDataDB(rows);
               if(created) return rm(res, responseCode.OK, "File Upload successfully");
               return badReq(res)
            });
    } catch (error) {
        console.error(error);
        return iserror(res)
    }
},


  downloadTodosAsCSV: async (req, res) => {
      try {
        const { status, sortBy, order } = req.query;
        const filter = {createdBy:new ObjectId(req.authUser?._id)};
        const sort={}
        if (status) {
            filter.status = status;
        }
        if (sortBy) {
            sort[sortBy] = order=== 1?1: -1;
        }else {
            sort['createdAt']=-1
        }
          const todos = await downloadCSVDB(filter,sort)
          const csvWriter = createObjectCsvWriter({
              path: 'todos.csv',
              header: [
                  { id: 'description', title: 'Description' },
                  { id: 'status', title: 'Status' },
                  {id:'createdBy', title:"createdBy"}
              ]
          });        
          await csvWriter.writeRecords(todos);
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename="todos.csv"');
          res.status(200).download('todos.csv');
      } catch (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
      }
  },
  

  listingTodo: async (req, res) => {
    try {
        const { status, page, limit, sortBy, order } = req.query;

        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;

        const skip = (pageNumber - 1) * pageSize;
        const filter = {createdBy:new ObjectId(req.authUser?._id)};
        const sort={}
        if (status) {
            filter.status = status;
        }
        if (sortBy) {
            sort[sortBy] = order=== 1?1: -1;
        }else {
            sort['createdAt']=-1
        }

        // Execute query
        const todos = await listingTodoDB(filter,pageSize,skip,sort);
        if(todos) return rm(res,responseCode.OK, responseMessage.TODO_GET_SUCCESS,todos)

       return noContent(res)
    }catch (error) {
        console.log(error)
                return iserror(res)
            }
}


};
