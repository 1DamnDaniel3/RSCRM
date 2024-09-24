const { Payment, StudentsAbonements, Students, Clients, Abonements, Groups, Weekday_groups, Weekday, sequelize } = require('../db');

class PaymentService{
    async getPaymentData(payment_id){
        return await Payment.findOne({
            where: {payment_id},
            attributes: ['payment_date'],
            include: [{
                model: Clients,
                attributes: ['first_name', 'last_name', 'patronymic', 'phone'],
                include:[{
                    model: Students,
                    attributes: ['second_name', 'first_name', 'patronymic', 'phone'],
                    include: [{
                        model:Groups,
                        attributes: ['group_name'],
                        include: [{
                            model: Weekday_groups,
                            attributes: ['wkd_id'],
                            include: [{
                                model: Weekday,
                                attributes: ['weekday_name']
                            }]
                        }]
                    }]
                }]
            }, {
                model: Abonements,
                attributes: ['abon_type', 'abon_cost', 'sessions'],
            }]
        }
        )
    }
}

module.exports = new PaymentService;