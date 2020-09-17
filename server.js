const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const express = require('express');
// var bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

app.use(express.static('.'));
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.end('Welcome to the Stripe setup app! Visit /create-session over POST to get kicking.')
})

app.post('/create-session', async (req, res) => {
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.productName,
                        // images: ['https://i.imgur.com/EHyR2nP.png'],
                    },
                    unit_amount: parseInt(req.body.payableAmount) * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: "https://thegeekylad.github.io/ecocart/#/success",
        cancel_url: "https://thegeekylad.github.io/ecocart/#/failure",
    });
    res.json({ id: session.id });
});
app.listen(process.env.PORT, () => console.log('Running Stripe setup server ...'));