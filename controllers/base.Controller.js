//БАЗОВЫЙ КОНТРОЛЛЕР ПОЗВОЛЯЕТ ВЫПОЛНЯТЬ CRUD ЦИКЛ ДЛЯ ВСЕХ МОДЕЛЕЙ ПУТЁМ ИСПОЛЬЗОВАНИЯ 
//ЕГО КОНСТРУКТОРА В КОНТРОЛЛЕРАХ МОДЕЛЕЙ
class BaseController{
    constructor(model, modelIdName) {
        this.model = model 
        this.modelIdName = modelIdName //to search by id
    }

    async create(req, res){
        try{
            const item = await this.model.create(req.body)
            res.status(201).json(item)
        } catch(error){
            res.status(400).json({message: error.message})
        }
         
    }

    async getAll(req, res){
        try{
            const items = await this.model.findAll()
            res.json(items)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async getOne(req, res){
        try{
            const item = await this.model.findByPk()
            if(!item){
                return res.status(404).json({message: 'Item not found'})
            }
            res.json(item)
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async updateData(req, res){
        try{
            const updatedItem = await this.model.update(req.body, {
                where: {[this.modelIdName]: req.params.id}, 
                returning: true,
            })
            if (updatedItem[0] === 0 || !updatedItem[1][0]) {
                return res.status(404).json({ message: 'Элемент не найден' });
            }
            res.json(updatedItem[1][0])
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
    async delete(req, res){
        try{
            const deletedItem = await this.model.destroy({
                where: {[this.modelIdName]: req.params.id},
            })
            if(!deletedItem){
                return res.status(404).json({message: 'Item not found'})
            }
            res.json({message: 'Item deleted'})
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = BaseController