const BaseController = require('./base.Controller')
const { Clients } = require('../db')

class ClientController extends BaseController{
    constructor(){
        super(Clients, "client_id")
    }
    //not null fields: lead_id first_name join_date
    
    
    
}

module.exports = new ClientController()