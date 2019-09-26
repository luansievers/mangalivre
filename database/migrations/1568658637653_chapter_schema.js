'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChapterSchema extends Schema {
  up () {
    this.create('chapters', (table) => {
      table.integer('id_chapter').primary()
      table.integer('serie_id').unsigned().references('id_serie').inTable('series')
      table.string('chapter_name')
      table.string('number')
      table.string('date')
      table.string('date_created')
    })
  }

  down () {
    this.drop('chapters')
  }
}

module.exports = ChapterSchema
