const { Entity_groups, Groups, Clients, Students, Leads } = require('../db'); 

class EntityGroupsService{
    
    async getGroups(entity_type){
        return await Entity_groups.findAll({
            where: {entity_type},
            attributes: ['group_id'],
            include: [{
                model: Groups,
                attributes: ['group_name'],
            }]
        })
    }

}

module.exports = new EntityGroupsService;