'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      // table.increments()
      table.integer('id_category').primary()
      table.string('domain')
      table.string('name')
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
