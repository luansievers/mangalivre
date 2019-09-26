'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySerieSchema extends Schema {
  up () {
    this.create('category_serie', (table) => {
      table.integer('category_id').unsigned().references('id_category').inTable('categories')
      table.integer('serie_id').unsigned().references('id_serie').inTable('series')
    })
  }

  down () {
    this.drop('category_serie')
  }
}

module.exports = CategorySerieSchema
