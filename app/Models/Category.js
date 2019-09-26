'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static boot() {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    static get primaryKey() {
        return 'id_category'
    }

    series() {
        return this.belongsToMany('App/Models/Serie')
    }

    scanlators() {
        return this.belongsToMany('App/Models/Scanlator')
    }
}

module.exports = Category
