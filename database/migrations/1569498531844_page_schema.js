'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PageSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.integer('release_id').unsigned().references('id_release').inTable('releases')
      table.integer('number')
      table.string('link')
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PageSchema
