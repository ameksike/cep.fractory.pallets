const KsMf = require('ksmf');
const app = new KsMf.app.WEB(__dirname + "/../../../").init();
const web = app.web;
const dao = app.helper.get('dao');

const supertest = require('supertest');
const req = supertest(web);

const baseUrl = '/api/v1/demo';
const models = {};
const header = { 'Authorization': 'Bearer ' };

describe('Demo_Default_Controller', () => {

    it('pallets', (done) => {
        req
            .get(baseUrl + '/reasons/test1')
            .end((error, res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(typeof(res.body.message) ).toBe('string');
                done();
            });
        done();
    });

    it('getPallets', (done) => {
        
    });

});

