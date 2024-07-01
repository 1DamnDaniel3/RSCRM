const BaseController = require('./base.Controller')
const { StudentsAbonements } = require('../db')

class StudentsAbonementsController extends BaseController{
    constructor(){
        super(StudentsAbonements, "stud_abon_id")
    }
    // not null fields: stud_id / abon_id / status / start_date /


}

module.exports = new StudentsAbonementsController();