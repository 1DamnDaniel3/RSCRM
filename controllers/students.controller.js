const BaseController = require('./base.Controller')
const { Students, Leads, StudentsAbonements, sequelize } = require('../db')

class StudentsController extends BaseController{
    constructor(){
        super(Students, "stud_id")
    }
    //not null fields for a student: lead_id / abon_id / second_name / first_name / phone / birthdate / hiredate
    // not null fields for students_abonements: abon_id / status / start_date / 
    //FUNCTION TO REGISTER STUDENT AND ADD HIS ABONEMENT IN students_abonements
    async create(req, res) {
        const transaction = await sequelize.transaction(); // Начало транзакции
        try {
            // Создание записи в таблице students
            const student = await Students.create(req.body, { transaction });
    
            // Создание записи в таблице students_abonements
            const abonementData = {
                stud_id: student.stud_id, // Используем ID созданного студента
                abon_id: req.body.abonement.abon_id, // Получаем из вложенного объекта abonement
                status: req.body.abonement.status || 'active', 
                start_date: req.body.abonement.start_date, 
                end_date: req.body.abonement.end_date 
            };
            const abonement = await StudentsAbonements.create(abonementData, { transaction });
    
            // Фиксация транзакции
            await transaction.commit();
    
            res.status(201).json({ student, abonement });
        } catch (error) {
            // Откат транзакции в случае ошибки
            await transaction.rollback();
            res.status(400).json({ message: error.message });
        }
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