const mercadopago = require('mercadopago');

module.exports = {
    pago: async (req, res) => {
        mercadopago.configure({
            access_token: process.env.TOKEN_MP
        });

        const preference = {
            items: [
                {
                    title: 'Test',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: 10.5
                }
            ]
        };
    }
}