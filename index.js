
import express from 'express';

  const app = express();
const port = process.env.PORT || 3000;
app.use('*', (req, res) => res.status(404).send({
        status: 404,
    message: 'URL NOT FOUND!',
  }));
     
  app.listen(port, () => console.log(`listening on port ${port}`));
  
  export default app;


