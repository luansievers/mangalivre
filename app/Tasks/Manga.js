'use strict'

const Task = use('Task')

const axios = require('axios');
const _cliProgress = require('cli-progress');
var _ = require('lodash');

axios.defaults.baseURL = 'https://mangalivre.com'
axios.defaults.headers.common['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3';
axios.defaults.headers.common['accept-language'] = 'en-US,en;q=0.9,pt;q=0.8';
axios.defaults.headers.common['cache-control'] = 'no-cache';
axios.defaults.headers.common['cookie'] = '_ga=GA1.2.569553888.1567012048; vg=7ad8217b-4f45-4a7e-bb94-9d2e050c5c74; mP_registerTip=1; mP_already_regTip=true; mP_already_regTip=1; mZ_swAuth=none; __cfduid=d0b943e8b7672227db6454f922d64fd441568635152; _mz_latest_readings=%5B%22193967%22%5D; mZ_sess=616536633934626136656532316264326265363132336265376465626263396537633232626638383834323639353866613438316661623731643763666564321a09e84ae9e1b3e345a145e9f59216da2da2efe719d5790ee4906b91d7117f7aaeb54f905380970b69b1060eac204d29ac08efe25d651077918de6e84893dd4d; _awl=2.1568988648.0.4-9b8a3318-7c8c2e8b7541cdac054498b4a6b06ab3-6763652d75732d6561737431-5d84dde8-0; cf_clearance=11b5ed7d1a25ae281e4ad82d68477c55e952786c-1569330407-86400-150';
axios.defaults.headers.common['dnt'] = '1';
axios.defaults.headers.common['pragma'] = 'no-cache';
axios.defaults.headers.common['sec-fetch-mode'] = 'same-origin';
axios.defaults.headers.common['sec-fetch-site'] = 'same-origin';
axios.defaults.headers.common['upgrade-insecure-requests'] = '1';
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['content-type'] = 'application/json';

const Serie = use('App/Models/Serie')
const Category = use('App/Models/Category')
const Scanlator = use('App/Models/Scanlator')
const Chapter = use('App/Models/Chapter')
const Release = use('App/Models/Release')
const Page = use('App/Models/Page')

var processando = false
// var categories = true
// var series = true
// var scanlators = true
// var chapters = true
// var pages = true

const multibar = new _cliProgress.MultiBar({
  barsize: 100,
  format: '{label} [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
  hideCursor: true,
  clearOnComplete: true,

}, _cliProgress.Presets.shades_grey);

class Manga extends Task {
  static get schedule() {
    return '*/1 * * * *'
  }

  async handle() {
    if (!processando) {
      processando = true
      // await this.categories()
      // await this.series()
      // await this.scanlators()
      await this.chapters()
      await this.pages()
      processando = false
    }
  }


  async categories() {
    await axios.get(`/categories/categories_series_list.json`)
      .then(async (response) => {
        const bar_categories = multibar.create(response.data.category_series.length, 0, { label: _.padEnd('Steal Categories', 45) })

        for (const categoryJSON of response.data.category_series) {
          await Category.findOrCreate(
            { id_category: categoryJSON.id_category },
            {
              id_category: categoryJSON.id_category,
              domain: categoryJSON.domain,
              name: categoryJSON.name,
            }
          )
          bar_categories.increment()
        }
      })
  }

  async series() {
    const categories = await Category.query().where('id_category', '>', 0).fetch()
    const bar_series = multibar.create(categories.toJSON().length + 1, 0, { label: _.padEnd('Processing Categories', 45) })

    for (const category of categories.toJSON()) {
      var page = 1
      const bar_series_category = multibar.create(page, 0, { label: _.padEnd(`  > ${category.name}`, 45) })
      while (page > 0) {
        await axios.get(`/categories/series_list.json?page=${page}&id_category=${category.id_category}`)
          .then(async (response) => {
            if (response.data.series.length == 0) {
              multibar.remove(bar_series_category)
              page = -1
            } else {
              for (const serieJSON of response.data.series) {
                const serie = await Serie.findOrCreate(
                  { id_serie: serieJSON.id_serie },
                  {
                    id_serie: serieJSON.id_serie,
                    name: serieJSON.name,
                    author: serieJSON.author,
                    artist: serieJSON.artist,
                    description: serieJSON.description,
                    is_complete: serieJSON.is_complete,
                    cover: serieJSON.cover
                  }
                )

                await serie.categories().attach([category.id_category])
              }
              bar_series_category.update(page)
              bar_series_category.setTotal(page + 1)
            }
          })
        page += 1
      }
      bar_series.increment()
    }
  }

  async scanlators() {
    // scanlators = false
    // console.log(`/scanlators/scanlators_list.json`)
    await axios.get(`/scanlators/scanlators_list.json`)
      .then(async (response) => {
        const bar_scanlators = multibar.create(response.data.scanlators_list.length + 1, 0, { label: _.padEnd('Scanlators', 45) })

        for (const scanlatorJSON of response.data.scanlators_list) {
          const scanlator = await Scanlator.findOrCreate(
            { id_scanlator: scanlatorJSON.id_scanlator },
            {
              id_scanlator: scanlatorJSON.id_scanlator,
              name: scanlatorJSON.name,
              label: scanlatorJSON.label,
              value: scanlatorJSON.value,
              image: scanlatorJSON.image
            }
          )

          for (const categoryJSON of scanlatorJSON.categories) {
            const category = await Category.findOrCreate(
              { id_category: categoryJSON.id_category },
              {
                id_category: categoryJSON.id_category,
                domain: categoryJSON.domain || '',
                name: categoryJSON.name,
              }
            )
            await scanlator.categories().attach([category.id_category])
          }
          bar_scanlators.increment()
        }
      })
    // .then(() => {
    //   console.log('Scanlators END')
    // })
  }

  async chapters() {
    const series = await Serie.all()
    const bar_chapters = multibar.create(series.toJSON().length + 1, 0, { label: _.padEnd('Processing series', 50) })

    _.chunk(series.toJSON(), 500).forEach(async chunk => {

      for (const serie of chunk) {
        var page = 1
        const bar_series_chapter = multibar.create(chunk.length, 0, { label: _.padEnd(`  > ${serie.name}`, 100) })
        while (page > 0) {
          await axios.get(`/series/chapters_list.json?id_serie=${serie.id_serie}&page=${page}`)
            .then(async (response) => {
              if (response.data.chapters === false) {
                multibar.remove(bar_series_chapter)
                page = -1
              } else {
                for (const chapterJSON of response.data.chapters) {
                  const chapter = await Chapter.findOrCreate(
                    { id_chapter: chapterJSON.id_chapter },
                    {
                      id_chapter: chapterJSON.id_chapter,
                      serie_id: chapterJSON.id_serie,
                      chapter_name: chapterJSON.chapter_name,
                      number: chapterJSON.number,
                      date: chapterJSON.date,
                      date_created: chapterJSON.date_created,
                    }
                  )
  
                  var attrRelease = Object.keys(chapterJSON.releases)[0]
                  var id_scanlator = Object.keys(chapterJSON.releases)[0].match(/\d/)
                  if (id_scanlator) {
                    id_scanlator = id_scanlator[0]
                  } else {
                    id_scanlator = null
                  }
  
                  Release.findOrCreate(
                    { id_release: chapterJSON.releases[attrRelease].id_release },
                    {
                      id_release: chapterJSON.releases[attrRelease].id_release,
                      scanlator_id: id_scanlator,
                      chapter_id: chapter.id_chapter,
                      link: chapterJSON.releases[attrRelease].link,
                    }
                  )
                }
                bar_series_chapter.update(page)
                // bar_series_chapter.setTotal(page + 1)
              }
            })
          page += 1
        }
        bar_chapters.increment()
      }
    })
    // console.log("Chapters END")
  }

  async pages() {
    // pages = false
    const releases = await Release.all()
    const bar_pages = multibar.create(releases.toJSON().length + 1, 0, { label: 'pages' })

    for (const release of releases.toJSON()) {

      var key = ''

      // console.log(release.link)
      await axios.get(release.link, {
        headers: ''
      })
        .then(function (response) {
          key = response.data.match(/(?<=this.page.identifier = ").*(?=")/g)[0]
        })
        .then(async () => {
          // console.log(`/leitor/pages/${release.id_release}.json?key=${key}`)
          await axios.get(`/leitor/pages/${release.id_release}.json?key=${key}`)
            .then(async (response) => {
              for (const [image, index] of response.data.images) {
                await Page.findOrCreate(
                  { number: index, release_id: release.id_release },
                  {
                    number: index,
                    release_id: release.id_release,
                    link: image
                  }
                )
              }
            })
        })
      bar_pages.increment()
    }
    // console.log("Pages END")

  }
}

module.exports = Manga
