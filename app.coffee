axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
contentful   = require 'roots-contentful'
slugify      = require 'slugify'

records      = require 'roots-records'
collections  = require 'roots-collections'
excerpt      = require 'html-excerpt'
moment       = require 'moment'

subPages     = {}

transformFunction = (entry) ->
	subPages[entry.id] = entry

module.exports =
	output: 'public'
	env: 'en'
	locals:
		env: 'en'
		basedir: 'views'
		md: require 'marked'
		subPages:subPages
		postExcerpt: (html, length, ellipsis) ->
			excerpt.text(html, length || 100, ellipsis || '...')
		dateFormat: (date, format) ->
			moment(date).format(format)

	ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

	extensions: [
		js_pipeline(files: ['assets/js/*.js','assets/js/*.coffee']),
		css_pipeline(files: ['assets/css/*.css','assets/css/*.styl'])
		records(
				characters: {
					file: "data/characters.json",
					template: "views/layouts/_data.jade",
					out: (characters) ->
						"/characters/#{slugify(characters.name)}"
						characters.slug = "/characters/#{slugify(characters.name)}"
					}
			),
		collections(
			folder: 'docs',
			layout: 'layouts/post',
			# permalink:(p)-> 'test/'+slugify(post.title)
			prepare:(docs) ->
				console.log(docs)
				docs.slug = '/test/'+slugify(docs.title)
			),
	]

	stylus:
		use: [axis(), rupture(), autoprefixer()]
		sourcemap: true

	'coffee-script':
		sourcemap: true

	jade:
		pretty: true

	server:
		clean_urls:true
