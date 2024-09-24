// groupsController.js

const BaseController = require('./base.Controller');
const { Groups, Entity_groups, Clients, Students, Leads, sequelize } = require('../db');

class GroupsController extends BaseController {
    constructor() {
        super(Groups, "group_id");
    }

    // Удаление группы и перемещение сущностей в группу "Неопределённые"
    async deleteGroup(req, res) {
        const { id } = req.params;

        try {
            // Начинаем транзакцию
            await sequelize.transaction(async (t) => {
                // Получаем группу "Неопределённые" для этого типа сущности
                const entityGroup = await Entity_groups.findOne({ where: { entity_group_id: id }, transaction: t });
                const defaultGroup = await Groups.findOne({ where: { group_name: 'Неопределённые' }, transaction: t });

                if (!entityGroup || !defaultGroup) {
                    return res.status(404).json({ message: 'Default group or entity group not found' });
                }

                // Переводим сущности в группу "Неопределённые"
                await Clients.update({ group_id: defaultGroup.group_id }, { where: { group_id: id }, transaction: t });
                await Students.update({ group_id: defaultGroup.group_id }, { where: { group_id: id }, transaction: t });
                await Leads.update({ group_id: defaultGroup.group_id }, { where: { group_id: id }, transaction: t });

                // Удаляем группу
                await Entity_groups.destroy({ where: { entity_group_id: id }, transaction: t });
                await Groups.destroy({ where: { group_id: id }, transaction: t });
            });

            res.status(200).json({ message: 'Group deleted and entities moved to default group' });
        } catch (error) {
            console.error('Error deleting group:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new GroupsController();
