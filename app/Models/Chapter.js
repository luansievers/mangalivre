'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chapter extends Model {
    static boot() {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get primaryKey() {
        return 'id_chapter'
    }

    releases() {
        return this.hasMany('App/Models/Release')
    } 
}

module.exports = Chapter
