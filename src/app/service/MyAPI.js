/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @require     axios
 * */
const axios = require('axios');
class MyAPI {

    constructor() {
        this.token = '';
        this.base = process.env.MyAPI_URL || 'https://reqres.in';
    }

    /**
     * 
     * @param {OBJECT} options 
     * @param {OBJECT} options.headers
     * @param {STRING} options.url 
     * @param {STRING} options.method 
     * @param {OBJECT} options.data 
     */
    async req(options) {
        options = options || {};
        const headers = Object.assign({
            'Authorization': this.token
        }, options.headers || {});
        const opt = {
            headers,
            url: this.base + options.url,
            method: options.method || 'post',
            data: options.data || {}
        }
        try {
            const result = await axios(opt);
            return {
                data: result.data
            };
        } catch (error) {
            return {
                error: error.message || error
            }
        }
    }

    /**
     * @description create user
     * @param {OBJECT} data 
     * @param {NUMBER} data.age 
     * @param {STRING} data.name 
     * @param {STRING} data.job
     * @returns {OBJECT} {
            "name": "morpheus",
            "job": "leader",
            "id": "629",
            "createdAt": "2022-05-19T03:08:32.718Z"
        }
     */
    async getPrice(data) {
        return await this.req({
            url: "/api/users", // /getprice/pallet
            method: 'post',
            data
        });
    }

    /**
     * 
     * @returns {OBJECT}
     */
    getSpecs() {
        return {
            LONGER_SIDE : 120,
            SHORTER_SIDE : 100,
            QUARTER_HEIGHT : 60,
            HALF_HEIGHT : 100,
            FULL_HEIGHT : 20//180
        }
    }
}

module.exports = MyAPI;