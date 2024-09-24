const BaseController = require('./base.Controller');
const { Entity_groups, Groups, Clients, Students, Leads } = require('../db'); 
const EntityGroupsService = require('../services/entityGroup.service')

class entityGroupsController extends BaseController {
    constructor() {
        super(Entity_groups, "entity_group_id");
    }

    // Получение сущностей по group_id и типу сущности
    async getEntitiesByGroup(req, res) {
        try {
            const { group_id, entity_type } = req.query;

            // Если entity_type не указан, возвращаем ошибку
            if (!entity_type) {
                return res.status(400).json({ message: 'Entity type is required' });
            }

            // Проверяем, что указан правильный тип сущности
            const validEntityTypes = ['clients', 'students', 'leads'];
            if (!validEntityTypes.includes(entity_type)) {
                return res.status(400).json({ message: 'Invalid entity type' });
            }

            // Получаем сущности по group_id и типу сущности
            let entityData;
            switch (entity_type) {
                case 'clients':
                    entityData = await Clients.findAll({
                        where: { group_id }
                    });
                    break;
                case 'students':
                    entityData = await Students.findAll({
                        where: { group_id }
                    });
                    break;
                case 'leads':
                    entityData = await Leads.findAll({
                        where: { group_id }
                    });
                    break;
                default:
                    return res.status(400).json({ message: 'Unknown entity type' });
            }

            // Возвращаем все сущности, связанные с указанной группой и типом сущности
            res.json(entityData);
        } catch (error) {
            console.error('Error fetching entities by group:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    //Получение списка групп, к которым принадлежит сущность
    async getAllGroupsOfEntityByType(req, res) {
        try {
            // Извлекаем entity_type из тела запроса
            const { entity_type } = req.body;

            // Проверяем, передано ли значение entity_type
            if (!entity_type) {
                return res.status(400).json({ message: 'Entity type is required' });
            }

            // Асинхронно получаем группы
            const groups = await EntityGroupsService.getGroups(entity_type);
            
            // Возвращаем результат
            res.status(200).json({ groups });
        } catch (error) {
            // Логируем ошибку и возвращаем статус 500
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
}

module.exports = new entityGroupsController();
