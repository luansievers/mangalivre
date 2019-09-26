'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryScanlatorSchema extends Schema {
  up () {
    this.create('category_scanlator', (table) => {
      table.integer('category_id').unsigned().references('id_category').inTable('categories')
      table.integer('scanlator_id').unsigned().references('id_scanlator').inTable('scanlators')
    })
  }

  down () {
    this.drop('category_serie')
  }
}

module.exports = CategoryScanlatorSchema
