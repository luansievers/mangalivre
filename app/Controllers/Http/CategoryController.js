'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response, view }) {
    return await Category.all()
  }
  
  async create ({ request, response, view }) {
  }
  
  async store ({ request, response }) {
  }
  
  async show ({ params, request, response, view }) {
    return await Category.find(params.id)
  }
  
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoryController
