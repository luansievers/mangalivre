'use strict'

const Chapter = use('App/Models/Chapter')

class ChapterController {
  async index ({ request, response, view }) {
  }
  
  async create ({ request, response, view }) {
  }
  
  async store ({ request, response }) {
  }
  
  async show ({ params, request, response, view }) {
    return await Chapter.find(params.id)
  }
  
  async edit ({ params, request, response, view }) {
  }
  
  async update ({ params, request, response }) {
  }
  
  async destroy ({ params, request, response }) {
  }
}

module.exports = ChapterController
