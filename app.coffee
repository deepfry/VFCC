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

blogPosts    = {}

separateBlogPostCats = (entry) ->
	blogPosts[entry.id] = []

separateBlogPosts = (entry) ->
	if entry.category != undefined
		for category in entry.category
			blogPosts[category.fields.id].push(entry)
	if entry.date != undefined
		days = ["","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		date = new Date(entry.date)
		entry.dateFormatted = {}
		entry.dateFormatted.day = date.getDate()
		entry.dateFormatted.dayName = days[date.getDay()]
		entry.dateFormatted.month = months[date.getMonth()]
		entry.dateFormatted.year = date.getFullYear()
		entry.dateFormatted.minutes = if date.getMinutes() < 10 then '0' + date.getMinutes() else date.getMinutes()

transformFunction = (entry) ->
	subPages[slugify(entry.title)] = entry

module.exports =
	output: 'public'
	env: 'en'
	locals:
		env: 'en'
		basedir: 'views'
		md: require 'marked'
		subPages:subPages
		blogPosts:blogPosts

	ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

	extensions: [
		js_pipeline(files: ['assets/js/*.js','assets/js/*.coffee']),
		css_pipeline(files: ['assets/css/*.css','assets/css/*.styl']),
		contentful
			access_token: '05bdbf71374ae276ef661f6984147a25b55c0fb5065e04ad91abb75e1f94497b'
			space_id: 'edu03zf33tsf'
			content_types:
				subPages:
					id:"subPage"
					template: "views/partials/_subPage.jade"
					path: (e) ->  "/#{e.url}"
					transform: transformFunction
				blogCats:
					id:"blogCategories"
					transform: separateBlogPostCats
				blogPosts:
					id:"blogPost"
					template: "views/partials/_blogPost.jade"
					path: (e) ->  "blog/#{e.url}"
					transform: separateBlogPosts
					filters:{
						'order':'-fields.date'
					}
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
