const BaseController = require('./base.Controller')
const { StudentsAbonements, Abonements, Weekday_groups, Weekday , Groups, Students} = require('../db')
const { Op } = require('sequelize');

class StudentsAbonementsController extends BaseController{
    constructor(){
        super(StudentsAbonements, "stud_abon_id")
    }
    // not null fields: stud_id / abon_id / status / start_date /

    // FUNCTION TO CALCULATE ABONEMENT END DATE
    async calculateEndDate(req, res){
        try{
            const {stud_abon_id} = req.body;
            //making a complex query that contains tables: students_abonements, abonements, students, groups, weekday_groups, weekday
            const studAbonData = await StudentsAbonements.findOne({
                where: {stud_abon_id},
                include:[{
                    model: Abonements,
                    attributes: ['sessions']
                }, {
                    model: Students,
                    include:[{
                        model:Groups,
                        include:[{
                            model:Weekday_groups,
                            include:[{
                                model: Weekday,
                                attributes: ['weekday_name']
                            }]
                        }]
                    }]
                }
                ]

            });

            if(!studAbonData){
                return res.status(404).json({ error: 'Abonement not found' });
            }
            
            
            // Check if Student, Group, and Weekday_groups exist
        if (studAbonData.Student && studAbonData.Student.Group && studAbonData.Student.Group.Weekday_groups) {
            const { start_date } = studAbonData // abonement start date
            const { sessions } = studAbonData.Abonement // amount of sessions in abonement
            const weekdays = studAbonData.Student.Group.Weekday_groups.map(wd => wd.Weekday.weekday_name); //array of training weekdays
            let currentDate = new Date(start_date);
            let classesCount = 0;

            // //sorting weekdays of training
            const sortedWeekdays = weekdays.sort((a, b) => {
                const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
                return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
              });
              
              // to compare with currentDay need to sortedWeekdays be in lowercase
              const sortedWeekdaysLowercase = sortedWeekdays.map(day => day.toLowerCase());
            
            
              // calculating end date of abonement
              while (classesCount < sessions) {
                currentDate.setDate(currentDate.getDate() + 1);
                const currentDay = currentDate.toLocaleString('ru-RU', { weekday: 'long' });
                if (sortedWeekdaysLowercase.includes(currentDay)) {
                  classesCount++;
                }
              }
          
              // Обновляем дату окончания абонемента
              studAbonData.end_date = currentDate;
              await studAbonData.save();

            return res.status(200).json({ studAbonData, weekdays });
        } 
        else {
            return res.status(400).json({ error: 'Required data is missing' });
        }
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
        

      };


}

module.exports = new StudentsAbonementsController();