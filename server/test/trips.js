import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);

chai.should()

describe('Trips', () => {
  describe('GET/', () => {
    it('it should display all available trips', done => {
        chai.request(app).get('/api/v1/trips').end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data').be.a('array');
          done()
        })
    });

    it('it should get specific trip ', done => {
        chai.request(app).get('/api/v1/trips/1').end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data').be.a('object');
          done()
        })
    });



  })

   describe('POST/', () => {
    it('it should display all available trips', done => {
        chai.request(app).post('/api/v1/trips').end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data').be.a('array');
          done()
        })
    });



  })

   describe('PATCH/', () => {
 it('it should cancel trip ', done => {
        chai.request(app).patch('/api/v1/trips/1/cancel/').end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
       
          done()
        })
    });

  })

  
  
})
