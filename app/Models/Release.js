'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Release extends Model {
    static boot() {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get primaryKey() {
        return 'id_release'
    }

    chapter() {
        return this.belongsTo('App/Models/Chapter')
    }

    scanlator() {
        return this.belongsTo('App/Models/Scanlator')
    }
}

module.exports = Release
