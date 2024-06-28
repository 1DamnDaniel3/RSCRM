const { Weekday_groups } = require('../db')
const BaseController = require('./base.Controller')

class GroupsController extends BaseController{
    constructor(){
        super(Weekday_groups, "wkd_id")
    }
    //not null fields: weekday_id group_id 


    
}

module.exports = new GroupsController()

// async create(req, res){
//     try{
//         const newLink = await Weekday_groups.create(req.body)
//         res.status(201).json(newLink)
//     } catch(error){
//         res.status(400).json({message: error.message})
//     }
     
// }

// async delete(req, res){
//     try{
//         const deletedItem = await Weekday_groups.destroy({
//             where: {group_id: req.params.id},
//         })
//         if(!deletedItem){
//             return res.status(404).json({message: 'Item not found'})
//         }
//         res.json({message: 'Item deleted'})
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// }