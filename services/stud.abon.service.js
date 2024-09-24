const { StudentsAbonements, Abonements, Weekday_groups, Weekday, Groups, Students, FixAbonements } = require('../db');

class StudentsAbonementsService {

    // FUNCTION TO GET DATA ABOUT STUDENT ABONEMENT
    async getAbonementData(stud_abon_id) {
        //making a complex query that contains tables: students_abonements, abonements, students, groups, weekday_groups, weekday
        return await StudentsAbonements.findOne({
            where: { stud_abon_id },
            include: [{
                model: Abonements,
                attributes: ['sessions']
            }, {
                model: Students,
                include: [{
                    model: Groups,
                    include: [{
                        model: Weekday_groups,
                        include: [{
                            model: Weekday,
                            attributes: ['weekday_name']
                        }]
                    }]
                }]
            }]
        });
    }
    
    // another service function here
}

module.exports = new StudentsAbonementsService();