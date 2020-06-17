const routersscholl = app => {
//Rutas
  app.get('/', (req, res) => {
    res.status(200).send('Hello')
  });

  // Query selector
  app.get('/country', (req, res) => {
    console.log('req.query', req.query);
    res.json({
      status: 'OK',
      data: {
        result: req.query,
        metodo: 'Metodo utilizado query params'
      }
    });
  })

  // Parametros
  app.get('/country1/:country', (req, res) => {
    console.log('req.params', req.params);
    const country = req.params.country;
    if (req.params) {
      res.json({
        status: 'OK',
        data: {
          result: country,
          metodo: 'Metodo utilizado paramametros'
        }
      })
    } else {
      res
        .status(404)
        .json(
          {
            status: 'Not Found',
            message: 'parametro ' + country
          }
        )
    }
  });

  app.get('*', (_req,res) => {
    res.status(404).send('Not Found')
  });
};

module.exports = routersscholl;
