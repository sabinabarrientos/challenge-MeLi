var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
* Gets the detail of a given product id
* @params id - Product ID
*/

router.get('/:id', async function (req, res) {

    const itemId = req.params.id;
    (async function getItemDetail() {
        res.header('Access-Control-Allow-Origin', "*");

        try {
            const item = await axios.get(
                `https://api.mercadolibre.com/items/${itemId}`
            );

            const {
                id,
                title,
                category_id,
                price,
                currency_id,
                sold_quantity,
                condition,
                pictures,
                descriptions: [],
                shipping: { free_shipping }
            } = item.data;

            const itemDetail = await axios.get(
                `https://api.mercadolibre.com/items/${id}/description`
            );

            const {
                plain_text
            } = itemDetail.data;

            let categories = await axios.get(
                `https://api.mercadolibre.com/categories/${category_id}`
            );

            categories = categories.data.path_from_root.map(
                (category) => category.name
            );

            const data = {
                author: {
                    name: "Sabina",
                    lastname: "Barrientos",
                },
                item: {
                    id,
                    title,
                    price: {
                        currency: currency_id,
                        amount: parseInt(price),
                        decimals: parseInt(price.toFixed(2).toString().split('.')[1]),
                    },
                    picture: pictures[0].secure_url,
                    condition,
                    free_shipping,
                    sold_quantity,
                    description: plain_text,
                    categories,
                },
            };
            res.send(data);

        } catch (error) {
            console.error(error);
        }
    })();
});

module.exports = router;

