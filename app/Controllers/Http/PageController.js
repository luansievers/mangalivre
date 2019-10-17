'use strict'

const Page = use('App/Models/Page')

class CategoryController {
  async index ({ request, response, view }) {
  }
  
  async create ({ request, response, view }) {
  }
  
  async store ({ request, response }) {
  }
  
  async show ({ params, request, response, view }) {
    return await Page.find(params.id)
  }
  
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoryController
