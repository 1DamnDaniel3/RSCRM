const BaseController = require('./base.Controller')
const { Abonements } = require('../db')

class AbonementsController extends BaseController{
    constructor(){
        super(Abonements, "abon_id")
    }
    //not null fields: abon_type abon_cost
    
}

module.exports = new AbonementsController()