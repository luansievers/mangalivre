'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReleaseSchema extends Schema {
  up () {
    this.create('releases', (table) => {
      table.integer('id_release').primary()
      table.integer('scanlator_id').unsigned().references('id_scanlator').inTable('scanlators')
      table.integer('chapter_id').unsigned().references('id_chapter').inTable('chapters')
      table.string('link')
    })
  }

  down () {
    this.drop('releases')
  }
}

module.exports = ReleaseSchema
