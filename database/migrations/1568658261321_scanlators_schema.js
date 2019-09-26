'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScanlatorSchema extends Schema {
  up () {
    this.create('scanlators', (table) => {
      // table.increments()
      table.integer('id_scanlator').primary()
      table.string('name')
      table.string('label')
      table.string('value')
      table.string('image')
    })
  }

  down () {
    this.drop('scanlators')
  }
}

module.exports = ScanlatorSchema
