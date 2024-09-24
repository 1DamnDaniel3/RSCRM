const BaseController = require('./base.Controller')
const PaymentService = require('../services/payment.service')
const { Payment } = require('../db')

class PaymentController extends BaseController{
    constructor(){
        super(Payment, "payment_id")
    }
    //not null fields: abon_id client_id payment_date
    
    // FUNCTION TO CALCULATE MONTHLY PAYMENT OF ONE STUDENT
    async monthlyPayment(req, res){
        try{
            const {payment_id} = req.body;
            const paymentData = await PaymentService.getPaymentData(payment_id)

            if(!paymentData){
                
                return res.status(401).json({message: "Payment not found"})
            }

            //payment
            const payment_date = paymentData.payment_date;
            //abon
            const abonCost = paymentData.Abonement.abon_cost;
            const sessions = paymentData.Abonement.sessions;
            
            if (paymentData.Client && paymentData.Client.Students) {
                paymentData.Client.Students.forEach(student => {
                    if (student.Group) {
                        const weekdays = student.Group.Weekday_groups.map(wd => wd.Weekday.weekday_name);
                        console.log(`Weekdays for student ${student.first_name}:`, weekdays);
                    } else {
                        console.log(`Group or related data is missing for student ${student.first_name}`);
                    }
                });
            } else {
                console.log('Client or Students data is missing');
            }

            return res.status(200).json({paymentData})


            
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


    async monthlyPaymentBETA(req, res){
        try{
            const {payment_id} = req.body;
            const paymentData = await PaymentService.getPaymentData(payment_id)

            const {payment_date} = paymentData;
            // const {first_name} = paymentData.Clients.Student; 
            

            // return res.status(200).json({student_name})
            return res.status(200).json({paymentData})
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new PaymentController()