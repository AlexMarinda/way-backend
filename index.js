<<<<<<< HEAD

import express from 'express';

  const app = express();
const port = process.env.PORT || 3000;
=======
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

import dotenv from 'dotenv';

dotenv.config();

  const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.use(routes);
>>>>>>> Initial commit
app.use('*', (req, res) => res.status(404).send({
        status: 404,
    message: 'URL NOT FOUND!',
  }));
     
  app.listen(port, () => console.log(`listening on port ${port}`));
  
  export default app;


