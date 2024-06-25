const BaseController = require('./base.Controller')
const { Leads } = require('../db')

class LeadsController extends BaseController{
    constructor(){
        super(Leads, "lead_id")
    }
    //Another functions of leads controller
}

module.exports = new LeadsController();