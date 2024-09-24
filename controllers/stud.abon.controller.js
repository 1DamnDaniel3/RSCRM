const BaseController = require('./base.Controller')
const { StudentsAbonements, FixAbonements, sequelize} = require('../db')
const StudentsAbonementsService = require('../services/stud.abon.service');
const { Op } = require('sequelize');

class StudentsAbonementsController extends BaseController{
    constructor(){
        super(StudentsAbonements, "stud_abon_id")
    }
    // not null fields: stud_id / abon_id / status / start_date /

    // FUNCTION TO CALCULATE ABONEMENT END DATE =========================================================
    async calculateEndDate(req, res){
        try{
            const {stud_abon_id} = req.body;
            
            const studAbonData = await StudentsAbonementsService.getAbonementData(stud_abon_id);

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

        const transaction = await sequelize.transaction();
        try{
            // pauseAbon returns fix_id. Use it to resume Abonement
            const {stud_abon_id, stop_date, stop_fix_date, fix_id} = req.body;
            const studAbonData = await StudentsAbonementsService.getAbonementData(stud_abon_id);

            if (!studAbonData) {
                return res.status(404).json({ error: 'Abonement not found' });
            }
    
            // If abonement already active
            if (studAbonData.status == 'active') {
                return res.status(400).json({ error: 'Abonement is already active' });
            }

            if (studAbonData.Student && studAbonData.Student.Group && studAbonData.Student.Group.Weekday_groups) {
                // Get data to calculate the remaining classes
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

                // Calculate new end_date
                let newEndDate = new Date();
                let classesCount = 0;

                while (classesCount < remainingClasses) {
                    newEndDate.setDate(newEndDate.getDate() + 1);
                    const currentDay = newEndDate.toLocaleString('ru-RU', { weekday: 'long' });
                    if (sortedWeekdaysLowercase.includes(currentDay)) {
                        classesCount++;
                    }
                }

                // ============= updating DB
                // set new values in fields status
                studAbonData.status = 'active';
                studAbonData.end_date = newEndDate;
                await studAbonData.save({transaction});

                // if stop_date not in request -> set actual date as end_fix_date
                const ifStopDateExist = stop_fix_date ? new Date(stop_fix_date):  new Date()
                const fixAbonement = await FixAbonements.update(
                    { end_fix_date: ifStopDateExist },
                    { where: { fix_id, end_fix_date: null }, transaction }
                );

                await transaction.commit();
                
                return res.status(200).json({ end_fix_date: ifStopDateExist, fix_id: fix_id});
        } 
        else {
            return res.status(400).json({ error: 'Required data is missing' });
        }

        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      }
      //FUNCTION TO PAUSE ABONEMENT ========================================================= IN PROGRESS
      async pauseAbon(req, res){

        const transaction = await sequelize.transaction()
        try{
            const { stud_abon_id, stop_date} = req.body;

            const stud_abon_status = await StudentsAbonementsService.getAbonementData(stud_abon_id)

            if (!stud_abon_status) {
                return res.status(404).json({ error: 'Abonement not found' });
            }
    
            // checking for stud_abon_status was not already "paused"
            if (stud_abon_status.status == 'paused') {
                return res.status(400).json({ error: 'Abonement is already paused' });
            }

            // Updating student abonement status
            await StudentsAbonements.update(
                { status: 'paused' },
                { where: { stud_abon_id } },
                { transaction }
            );

            // if stop_date not in request -> set actual date as start_fix_date
            const ifStopDateExist = stop_date ? new Date(stop_date) : new Date()

            const fixAbonement = await FixAbonements.create(
                {
                    stud_abon_id: stud_abon_id,
                    start_fix_date: ifStopDateExist,
                    end_fix_date: null
                },
                { transaction }
            );

            await transaction.commit();

            // const studAbonData = await StudentsAbonements.findOne({
            //     where: { stud_abon_id },
            //     attributes: ["status"],
            //     include: [{
            //         model: FixAbonements,
            //     }]
            // });


            return res.status(200).json({ fix_id: fixAbonement.fix_id,
                                          stop_date: ifStopDateExist,
                                          stud_abon_id: stud_abon_id});
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      }

}

module.exports = new StudentsAbonementsController();