var requests = require('supertest');
var app = require('../index.js');
describe('GET /will', function(){
    it('respond with hello world', function(done){
        requests(app).get('/will').expect('{"response": "Hello World!"}', done);
    });
});