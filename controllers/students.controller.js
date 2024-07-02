const BaseController = require('./base.Controller')
const { Students, Leads} = require('../db')

class StudentsController extends BaseController{
    constructor(){
        super(Students, "stud_id")
    }

    
    //Another functions of leads controller

    //FUNCTION TO FIND LEADS OF STUDENT
    async findStudentsLeads(req, res){
        try{
            const { studID } = req.body
            const studentWithLead = await Students.findOne({
                where: {stud_id: studID},
                include: Leads
            })
            if(!studentWithLead){
                return res.status(401).json({ message: "Can't find this student"});
            }
            const lead = studentWithLead.Lead
            return res.status(200).json({lead})
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    
}

module.exports = new StudentsController();