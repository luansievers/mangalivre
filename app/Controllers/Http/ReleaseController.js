'use strict'

const Release = use('App/Models/Release')

class ReleaseController {
  async index ({ request, response, view }) {
  }
  
  async create ({ request, response, view }) {
  }
  
  async store ({ request, response }) {
  }
  
  async show ({ params, request, response, view }) {
    return await Release.find(params.id)
  }
  
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = ReleaseController
