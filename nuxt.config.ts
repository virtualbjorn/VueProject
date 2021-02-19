import { Configuration } from '@nuxt/types'
import { ProvidePlugin, NormalModuleReplacementPlugin } from 'webpack'
import PrerenderSPAPlugin from 'prerender-spa-plugin'
import path from 'path'
import axios from 'axios'
const colors = require('vuetify/es5/util/colors').default
const tags = require('./config/meta.json')
const apiStaging = require('./environment/defaults.staging.json')
const apiProd = require('./environment/defaults.prod.json')
const keywords: Array<string> = require('./config/keywords.json').keywords

const config: Configuration = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: keywords.join(',') }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
		'@/assets/style/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/global-component.js',
    '~/plugins/helpers.ts',
    '~/plugins/bodyScrollLock.ts',
    '~/plugins/query-string.ts'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-5XRH4QL'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
		'@nuxtjs/vuetify',
    '@nuxtjs/axios',
    'nuxt-lazy-load'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      /typed-vuex/
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (process.env.NODE_STAGING == 'true') {
        config.plugins!.push( new NormalModuleReplacementPlugin(
					/environment\/defaults\.json/,
					'@/environment/defaults.staging.json'
				))
      } else if (process.env.NODE_ENV == 'production') {
				config.plugins!.push( new NormalModuleReplacementPlugin(
					/environment\/defaults\.json/,
					'@/environment/defaults.prod.json'
				))
			}
			if (process.env.PRERENDER == 'true') {
        let api = process.env.NODE_STAGING ? apiStaging : apiProd
				config.plugins!.push(new PrerenderSPAPlugin({
					staticDir: path.join(__dirname, 'dist'),
					outputDir: path.join(__dirname, 'dist_render'),
          indexPath: path.join(__dirname, 'dist', 'index.html'),
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            injectProperty: '__PRERENDER_INJECTED',
            inject: { state: 'true' },
            maxConcurrentRoutes: 5
          }),
					routes: Object.keys(tags),
					postProcess(context) {
						let OGImage: string = tags[context.route].image || '/art.png'
						context.route = context.originalRoute
	
						if (tags[context.route].title) {
							context.html = context.html.replace(
								/<meta.+og:title.+">/i,
								`<meta property="og:title" content="${tags[context.route].title}">`
							)
						}
						if (tags[context.route].description) {
							context.html = context.html.replace(
								/<meta.+og:description.+">/i,
								`<meta property="og:description" content="${tags[context.route].description}">`
							)
            }
            if (tags[context.route].pageTitle) {
              context.html = context.html.replace(
                /<title>.+<\/title>/i,
                `<title>${tags[context.route].pageTitle}</title>`
              )
            }
						context.html = context.html.replace(
							/<meta.+og:image.+">/i,
							`<meta property="og:image" content="${api.baseUrl}${OGImage}">`
						)
						if (context.route.endsWith('.html')) {
							context.outputPath = path.join(__dirname, 'dist', context.route)
						}
	
						return context
					}
				}))
			}
		},
		plugins: [
			new ProvidePlugin({
				'_': 'lodash'
      })
		]
	},
	env: {
		nodeEnv: process.env.NODE_ENV || ''
	}
}

export default config