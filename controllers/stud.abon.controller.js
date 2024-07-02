const BaseController = require('./base.Controller')
const { StudentsAbonements, Abonements, Weekday_groups, Weekday , Groups, Students} = require('../db')
const { Op } = require('sequelize');

class StudentsAbonementsController extends BaseController{
    constructor(){
        super(StudentsAbonements, "stud_abon_id")
    }
    // not null fields: stud_id / abon_id / status / start_date /

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

    // FUNCTION TO CALCULATE ABONEMENT END DATE =========================================================
    async calculateEndDate(req, res){
        try{
            const {stud_abon_id} = req.body;
            
            const studAbonData = await this.getAbonementData(stud_abon_id);

            if(!studAbonData){
                return res.status(404).json({ error: 'Abonement not found' });
            }

            if (studAbonData.status === 'paused') {
                return res.status(400).json({ error: 'Abonement is paused' });
            }
            
            
            // Check if Student, Group, and Weekday_groups exist
        if (studAbonData.Student && studAbonData.Student.Group && studAbonData.Student.Group.Weekday_groups) {
            const { start_date } = studAbonData // abonement start date
            const { sessions } = studAbonData.Abonement // amount of sessions in abonement
            const weekdays = studAbonData.Student.Group.Weekday_groups.map(wd => wd.Weekday.weekday_name); //array of training weekdays
            let currentDate = new Date(start_date);
            let classesCount = 1;

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
          
              // Update end_date in DB
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

      //FUNCTION TO RENEW ABONEMENT IF IT WAS STOPPED =========================================================

      async resumeAbon(req, res){
        try{

            const {stud_abon_id, stop_date} = req.body;
            const studAbonData = await this.getAbonementData(stud_abon_id);

            if (!studAbonData) {
                return res.status(404).json({ error: 'Abonement not found' });
            }
    
            // Проверка, что абонемент приостановлен
            if (studAbonData.status !== 'paused') {
                return res.status(400).json({ error: 'Abonement is not paused' });
            }

            if (studAbonData.Student && studAbonData.Student.Group && studAbonData.Student.Group.Weekday_groups) {
                // Получаем данные для вычисления оставшихся занятий
                const { start_date, end_date } = studAbonData;
                const { sessions } = studAbonData.Abonement;
                const weekdays = studAbonData.Student.Group.Weekday_groups.map(wd => wd.Weekday.weekday_name);

                let completedClasses = 0;

                const sortedWeekdays = weekdays.sort((a, b) => {
                    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
                    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
                });
                const sortedWeekdaysLowercase = sortedWeekdays.map(day => day.toLowerCase());
                
                // function for calculating classes before stopping
                const calculateCompletedClasses = (startDate, endDate) => {
                    let date = new Date(startDate);
                    let classesCount = 0;
        
                    while (date < endDate) {
                        const currentDay = date.toLocaleString('ru-RU', { weekday: 'long' });
                        if (sortedWeekdaysLowercase.includes(currentDay)) {
                            classesCount++;
                        }
                        date.setDate(date.getDate() + 1);
                    }
        
                    return classesCount;
                    };
                    
                // taking completed classes 
                const effectiveEndDate = stop_date ? new Date(stop_date) : new Date();
            

                completedClasses = calculateCompletedClasses(start_date, effectiveEndDate);

                // calculating remaining classes
                const remainingClasses = sessions - completedClasses;
                if (remainingClasses <= 0) {
                    return res.status(400).json({ error: 'No remaining classes in abonement' });
                }

                // Вычисляем новую дату окончания абонемента
                let newEndDate = new Date();
                let classesCount = 0;

                while (classesCount < remainingClasses) {
                    newEndDate.setDate(newEndDate.getDate() + 1);
                    const currentDay = newEndDate.toLocaleString('ru-RU', { weekday: 'long' });
                    if (sortedWeekdaysLowercase.includes(currentDay)) {
                        classesCount++;
                    }
                }
                studAbonData.status = 'active';
                studAbonData.end_date = newEndDate;
                await studAbonData.save();
                
                return res.status(200).json({ studAbonData, weekdays });
        } 
        else {
            return res.status(400).json({ error: 'Required data is missing' });
        }

        }catch(error){

        }
      }
      //FUNCTION TO PAUSE ABONEMENT ========================================================= IN PROGRESS
      async stopAbon(req, res){
        try{
            const studAbonData = await StudentsAbonements.findOne({
                where: { stud_abon_id },
                include: [{
                    model: Abonements,
                    attributes: ['sessions']
                }]})


        }catch(error){

        }
      }

}

module.exports = new StudentsAbonementsController();