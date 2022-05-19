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

    it('pallets with bad request', (done) => {
        req
            .post(baseUrl + '/pallets')
            .send({
                parts: [
                    {width:100, height: 20},
                    {width:900, height: 450}
                ]
            })
            .end((error, res) => {
                expect(res.status).toBe(400);
                done();
            });
    });

    it('getPallets', (done) => {
        done();
    });
});

