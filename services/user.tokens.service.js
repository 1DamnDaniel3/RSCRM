const { UserToken } = require('../db');

class UserTokensService{
    // Вспомогательный метод для создания токена без req и res
    async createToken(data) {
        try {
            const item = await UserToken.create(data);
            return item;
        } catch (error) {
            console.error('Error creating token:', error.message);
            throw new Error('Error creating token');
        }
    }
    // Запись токенов в Coockies
    async writeToCoockies(res ,token, refreshToken){
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // используйте secure: true в продакшене с HTTPS
            maxAge: 3600000 // 1 час в миллисекундах
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 604800000 // 7 дней в миллисекундах
        });
    }
}

module.exports = new UserTokensService();