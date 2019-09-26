'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SerieSchema extends Schema {
  up () {
    this.create('series', (table) => {
      // table.increments()
      table.integer('id_serie').primary()
      table.string('name')
      table.string('author')
      table.string('artist')
      table.string('description')
      table.boolean('is_complete')
      table.string('cover')
    })
  }

  down () {
    this.drop('series')
  }
}

module.exports = SerieSchema
