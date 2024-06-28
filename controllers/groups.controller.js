const BaseController = require('./base.Controller')
const { Groups } = require('../db')

class GroupsController extends BaseController{
    constructor(){
        super(Groups, "group_id")
    }
    //not null fields: group_type 
    
}

module.exports = new GroupsController()