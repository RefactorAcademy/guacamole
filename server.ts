const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // @ts-ignore
    server.get('/', (req, res) => {
      res.redirect('/welcome')
    })

    // @ts-ignore
    server.get('/content/:id', (req, res) => {
      const actualPage = '/content'
      const queryParams = {
        contentId: req.params.id,
      }
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/home/:page:category', (req, res) => {
      const actualPage = '/home'
      const queryParams = {
        page: req.params.page,
        category: req.params.category,
      }
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/courses/assessment', (req, res) => {
      const actualPage = '/comprehensive'
      const queryParams = {}
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/courses/reports', (req, res) => {
      const actualPage = '/reports'
      const queryParams = {}
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/courses/:id', (req, res) => {
      const actualPage = '/module'
      const queryParams = {
        moduleId: req.params.id,
      }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/test', (req, res) => {
      const actualPage = '/test'
      const queryParams = {
        moduleId: req.params.id,
      }
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/forgotPassword', (req, res) => {
      const actualPage = '/forgot'
      const queryParams = {}
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/changePassword/:token', (req, res) => {
      const actualPage = '/changepass'
      const queryParams = { token: req.params.token }
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('/signin/:fromReset', (req, res) => {
      const actualPage = '/signin'
      const queryParams = {
        fromReset: req.params.fromReset,
      }
      app.render(req, res, actualPage, queryParams)
    })

    // @ts-ignore
    server.get('*', (req, res) => {
      // const actualPage  = "/home";
      // const queryParams = {
      //     id       : req.params.id,
      //     moduleId : req.params.moduleId,
      //     auth     : req.query.t
      // };
      // app.render( req, res, actualPage, {} );
      return handle(req, res)
    })

    // @ts-ignore
    server.listen(process.env.PORT || 3000, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
