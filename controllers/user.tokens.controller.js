const jwt = require('jsonwebtoken');
const BaseController = require('./base.Controller');
const { UserToken } = require('../db');

class UserTokensController extends BaseController {
    constructor() {
        super(UserToken, 'token_id');
    }

    // Вспомогательный метод для создания токена без req и res
    async createToken(data) {
        try {
            const item = await this.model.create(data);
            return item;
        } catch (error) {
            console.error('Error creating token:', error.message);
            throw new Error('Error creating token');
        }
    }

    async generateTokens(userId) {
        try {
            // Удалить старые токены
            await UserToken.destroy({ where: { user_id: userId } });

            // Создать новые токены
            const token = jwt.sign({ user_id: userId }, 'your_jwt_secret', { expiresIn: '1h' });
            const refreshToken = jwt.sign({ user_id: userId }, 'your_refresh_secret', { expiresIn: '7d' });

            // Записать их в базу данных
            const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 час
            await this.createToken({
                user_id: userId,
                token,
                refresh_token: refreshToken,
                expires_at: expiresAt,
            });

            return { token, refreshToken };
        } catch (error) {
            console.error('Error generating tokens:', error.message);
            throw new Error('Failed to generate tokens');
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        try {
            const decoded = jwt.verify(refreshToken, 'your_refresh_secret');
            const userToken = await this.findOne({ user_id: decoded.user_id, refresh_token: refreshToken });

            if (!userToken) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            const newToken = jwt.sign({ user_id: userToken.user_id }, 'your_jwt_secret', { expiresIn: '1h' });
            const newRefreshToken = jwt.sign({ user_id: userToken.user_id }, 'your_refresh_secret', { expiresIn: '7d' });

            await UserToken.update({
                token: newToken,
                refresh_token: newRefreshToken,
                expires_at: new Date(Date.now() + 3600 * 1000),
            }, {
                where: { token_id: userToken.token_id },
            });

            return res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error('Error refreshing token:', error.message);
            return res.status(403).json({ message: 'Invalid refresh token', error: error.message });
        }
    }
}

module.exports = UserTokensController;
