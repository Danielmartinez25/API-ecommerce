const mercadopago = require('mercadopago');

module.exports = {
    createOrder: async (req, res) => {
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
            ],
            notification_url :process.env.NOTIFICATION_URL
        };
        mercadopago.preferences.create(preference)
        .then((r) => {
            res.json(r)
        })
        .catch((error) => console.log(error))
    },
    OrderNotification : async(req,res) =>{
        const data = req.query
        console.log(data);
        res.status(200)
    }
}