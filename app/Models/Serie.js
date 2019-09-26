'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Serie extends Model {
    static boot() {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get primaryKey() {
        return 'id_serie'
    }

    categories() {
        return this.belongsToMany('App/Models/Category')
    }
}

module.exports = Serie
