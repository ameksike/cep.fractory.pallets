/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class DefaultController extends KsMf.app.Controller {

    async init() {
        this.logger = this.helper.get('logger');
        this.service = this.helper.get('MyAPI');
    }


    /**
     * 
     * @param {ARRAY} parts 
     * @returns {NUMBER}
     */
    getPallets(parts) {

        const {
            LONGER_SIDE,
            SHORTER_SIDE,
            QUARTER_HEIGHT,
            HALF_HEIGHT,
            FULL_HEIGHT
        } = this.service.getSpecs();

        const pallets = [];

        parts.sort((a, b) => {
            if (a.width + a.height > b.width + b.height) {
                return 1;
            } else {
                return -1;
            }
        });

        function resetPallet() {
            return {
                pallet: [],
                palletHeight: SHORTER_SIDE,
                palletWidth: LONGER_SIDE,
                fullHeight: FULL_HEIGHT
            }
        }

        let target = resetPallet();

        for (let part of parts) {

            let palletHeight = target.palletHeight - part.height;
            let palletWidth = target.palletWidth - part.width;
            let fullHeight = target.fullHeight - 10;

            if (palletHeight > 0 && palletWidth > 0 || fullHeight > 0) {
                target.pallet.push(part);
                target.palletHeight = palletHeight;
                target.palletWidth = palletWidth;
                target.fullHeight = fullHeight;
            } else {
                pallets.push(target);
                target = resetPallet();
                target.palletHeight = target.palletHeight - part.height;
                target.palletWidth = target.palletWidth - part.width;
                target.fullHeight = target.fullHeight - 10;
                target.pallet.push(part);
            }
        }
        if (target.pallet.length > 0) {
            pallets.push(target);
        }

        return pallets.length;
    }

    /**
     * @description list data 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     */
    async pallets(req, res) {
        this.logger.info('params', req.query);

        //... get data 
        const data = req.body && req.body.parts ? req.body.parts : null;
        if (!data) {
            res.status(400).json({
                code: 'error',
                message: 'parts are required!'
            });
        }
        //... check parts
        const {
            LONGER_SIDE,
            SHORTER_SIDE,
            QUARTER_HEIGHT,
            HALF_HEIGHT,
            FULL_HEIGHT
        } = this.service.getSpecs();

        for (let part of data) {
            if (part.width > LONGER_SIDE || part.height > SHORTER_SIDE) {
                res.status(400).json({
                    code: 'error',
                    message: 'the part do not fit on pallet'
                });
            }
        }

        //... get pallets
        const pallets = this.getPallets(data);

        //... call external services 
        const result = await this.service.getPrice({
            countryCode: 'GB',
            postalCode: 'PE20 3PW',
            pallets
        });

        if (result.error) {
            res.status(401).json({
                code: 'unauthorized',
                message: result.error.message
            });
        } else {
            res.json(result.data);
        }
    }

}

module.exports = DefaultController;