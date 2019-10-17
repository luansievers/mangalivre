'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.resource('categories', 'CategoryController').apiOnly()
    Route.resource('series', 'SerieController').apiOnly()
    Route.resource('scanlators', 'ScanlatorController').apiOnly()
    Route.resource('chapters', 'ChapterController').apiOnly()
    Route.resource('releases', 'ReleaseController').apiOnly()
    Route.resource('pages', 'PageController').apiOnly()
  }).prefix('api/v1')
