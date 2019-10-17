'use strict'

const Category = use('App/Models/Category')
const Serie = use('App/Models/Serie')

class SerieController {
  async index({ request, response, view }) {
    let pagination = request.only(['page', 'limit'])
    let filter = request.only(['category'])
    
    if(filter.category){
      const category = await Category.find(filter.category)
      return await category.series().paginate(pagination.page, pagination.limit)
    }else{
      return await Serie.query().paginate(pagination.page, pagination.limit)
    }
  }

  async create({ request, response, view }) {
  }

  async store({ request, response }) {
  }

  async show({ params, request, response, view }) {
    return await Serie.find(params.id)
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = SerieController
