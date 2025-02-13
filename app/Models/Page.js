'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Page extends Model {
    static boot() {
        super.boot()
        this.addTrait('NoTimestamp')
    }

    release() {
        return this.belongsTo('App/Models/Release')
    }
}

module.exports = Page
