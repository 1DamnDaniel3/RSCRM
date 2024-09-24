const BaseController = require('./base.Controller')
const { Leads, Students } = require('../db')

class LeadsController extends BaseController{
    constructor(){
        super(Leads, "lead_id")
    }
    //not null fields: first_name phone qualification

    // FUNCTION TO FIND ALL STUDENTS OF ONE LEAD
    async allStudentsOfLead(req, res){
        try{
            const { leadID } = req.body
            const leadWithStudents = await Leads.findOne({
                where: {lead_id: leadID},
                include: Students
            })
            if(!leadWithStudents){
                return res.status(401).json({ message: "Can't find this lead"});
            }
            const student = leadWithStudents.Students

            return res.status(200).json({student})
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new LeadsController();