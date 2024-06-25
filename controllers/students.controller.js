const BaseController = require('./base.Controller')
const { Students } = require('../db')

class StudentsController extends BaseController{
    constructor(){
        super(Students, "stud_id")
    }
    //Another functions of leads controller
}

module.exports = new StudentsController();