'use strict'

const Scanlator = use('App/Models/Scanlator')

class ScanlatorController {
  async index ({ request, response, view }) {
  }
  
  async create ({ request, response, view }) {
  }
  
  async store ({ request, response }) {
  }
  
  async show ({ params, request, response, view }) {
    return await Scanlator.find(params.id)
  }
  
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = ScanlatorController
