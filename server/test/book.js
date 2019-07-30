import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);

chai.should()

describe('Bookings', () => {
  describe('GET/', () => {
    it('it should display all bookings', done => {
        chai.request(app).get('/api/v1/bookings').end((err, res) => {
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

   describe('POST /', () => {
    it('it should book a seat', done => {
        chai.request(app).post('/api/v1/bookings').end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data').be.a('array');
          done()
        })
    });



  })

   describe('DELETE /', () => {
 it('it should cancel booking ', done => {
        chai.request(app).delete('/api/v1/bookings/1/delete/').end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql('success');
       
          done()
        })
    });

  })

  
  
})
