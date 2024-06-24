const UserTokensController = require('./user.tokens.controller')
const { Users } = require('../db')
const bcrypt = require('bcryptjs')

class UserController{
     // FUNCTION TO REGISTER NEW USER
     async userRegister(req, res){
        try{
            const user_data = await Users.create(req.body)
            res.status(201).json({message: "registration succseful"})
        } catch(error){
            res.status(400).json({massage: error.massege})
        }
        
    }

    // FUNCTION TO LOGIN USERS AND GIVE THEM TOKEN
    async userLogin(req, res){
        const {email, password} = req.body
        try {
            // find user by email
            const user = await Users.findOne({where: { email }})
            if(!user){
                return res.status(401).json({message: 'Invalid email or password'})
                
            }
            // check user password
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(401).json({message: 'Invalid email or password'})
            }
            // making new token for user
            const tokensController = new UserTokensController();
            const tokens = await tokensController.generateTokens(user.user_id);

            return res.status(200).json({ message: 'Login successful', tokens });
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // FUNCTION TO CHANGE USERS PASSWORD
    async userChangePassword(req, res) {
        const { userID, newPassword } = req.body;
        try {
            // find user by ID
            const user = await Users.findOne({ where: { user_id: userID } });
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
    
            // log before updating password
            console.log(`Old password: ${user.password}`);
            console.log(`New password: ${newPassword}`);
    
            // !!! passwords hashing in Users model by hooks 'beforeCreate' and 'beforeUpdate'
            user.password = newPassword;
            await user.save();
    
            // log after updating password
            console.log(`Updated password: ${user.password}`); 
    
            return res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new UserController();
