import assert from 'assert';

describe('Array', () => {
  describe('#indexOf', () => {
    it('it should return -1 is item is not found', done => {
        assert.equal([1,2,3,5].indexOf(5), 3);
        done()
    })
  })
  
})
