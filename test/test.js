var requests = require('supertest');
var app = require('../index.js');
describe('GET /will', function(){
    it('respond with hello world', function(done){
        requests(app).get('/will').expect('{"response": "Hello World!"}', done);
    });
});

describe('GET /nosql-injection', function(){
    it('should respond with successful login for valid credentials', function(done){
        requests(app).get('/nosql-injection?username=admin&password=password123')
            .expect('{\"response\": \"Login successful for user admin\"}', done);
    });

    it('should respond with successful login (bypassed with NoSQL injection) for NoSQL injection payload', function(done){
        requests(app).get('/nosql-injection?username=admin&password[$ne]=null')
            .expect('{\"response\": \"Login successful (bypassed with NoSQL injection) for user admin\"}', done);
    });
});