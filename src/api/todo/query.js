
const Todo=require('./model');

module.exports={
    createTodoDB:(data)=>Todo.create(data),
    updateTodoDB:(filter, data)=>Todo.findOneAndUpdate(filter, {$set:data},{new:true}),
    deleteTodoDB:(filter)=>Todo.findOneAndDelete(filter),
    getTodoDB:(filter)=>Todo.findOne(filter),
    listingTodoDB:(filter,limit,skip,sort)=>Todo.aggregate([
        {$match:filter},
        {
            $sort:sort
        },
        {
            $skip:skip,
        },
        {
            $limit:limit
        }
      
    ]),
    getAllTodoDB:(filter)=>Todo.find(filter),

    downloadCSVDB:(filter,sort)=>Todo.aggregate([
        {
            $match:filter,
        },
        {
            $sort:sort
        },{
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"createdBy"
            }
        },{
            $unwind:"$createdBy"
        },
        {
            $project:{
                _id:0,
                status:"$status",
                description:1,
                createdBy:"$createdBy.name"
            }
        }

    ]),
    uploadDataDB:(data)=>Todo.insertMany(data)
}