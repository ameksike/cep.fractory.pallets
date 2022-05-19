function axios() {
    return {
        data: {
            provider: 'SOME-A1',
            description: 'other description',
            totalCost: {
                value: 11,
                currency: 'EUR'
            }
        }
    };
}
module.exports = axios;