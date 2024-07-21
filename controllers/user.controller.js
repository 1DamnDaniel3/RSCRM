const UserTokensController = require('./user.tokens.controller')
const BaseController = require('./base.Controller')
const { Users, UserToken } = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


class UserController extends BaseController { // inherit from the base controller to make effective routes
    constructor() {
        super(Users, 'user_id')
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
            const tokens = await tokensController.generateTokens(res ,user.user_id);

            //don't sending tokens in responce to client, because we sending it in the coockies in user.tokens.controller
            return res.status(200).json({ message: 'Login successful'});
        }catch(error){
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // FUNCTION TO CHANGE USERS PASSWORD
    async userChangePassword(req, res) {
        const { email, newPassword } = req.body;
        try {
            // find user by ID
            const user = await Users.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            // !!! passwords hashing in Users model by hooks 'beforeCreate' and 'beforeUpdate'
            user.password = newPassword;
            await user.save();
    
            return res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // FUNCTION TO AUTHENTICATE USER AND RETURN USER DATA

    async authenticateUser(req, res) {
        const token = req.cookies.token;
        try{
            if (!token) {
                return res.status(401).json({ message: "Token not found" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const DBtokenResponse = await UserToken.findOne({
                where: {user_id: decoded.user_id},
                attributes:['token', 'user_id']
            })
            
            const DBtoken = DBtokenResponse?.dataValues?.token;
            const userID = DBtokenResponse?.dataValues?.user_id

            if(DBtoken === token){
                res.status(200).json({message: "Authentication successful!", user_id: userID})
            } else {
                return res.status(401).json({ message: "Token mismatch" });
            }
            
        }catch(error){
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new UserController();
