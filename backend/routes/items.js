var express = require('express');
var router = express.Router();
var axios = require('axios');

// get items data
router.get('/', async (req, res) => {

    (async function getItems() {
        res.header('Access-Control-Allow-Origin', "*");
        const { q } = req.query || ' ';
        console.log(q);

        try {
            const { data } = await axios.get(
                `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
            );

            const itemsList = [];

            data.results.map(element => {
                itemsList.push(
                    {
                        id: element.id,
                        title: element.title,
                        price:
                        {
                            currency: element.currency_id,
                            amount: parseInt(element.price),
                            decimals: parseInt(element.price.toFixed(2).toString().split('.')[1]),
                        },
                        picture: element.thumbnail,
                        condition: element.condition,
                        free_shipping: element.shipping.free_shipping,
                        city: element.address.city_name
                    }
                )
            });


            let categories = [];

            if (data.filters.length) {
                categories = data.filters[0].values[0].path_from_root.map(
                    (category) => category.name
                );
            } else {
                let firstCategory = data.available_filters[0]?.values;
                firstCategory = firstCategory[0].id;
            }

            const product = {
                author: {
                    name: 'Sabina',
                    lastname: 'Barrientos'
                },
                categories,
                items: itemsList,
            }

            res.send(product);
        } catch (error) {
            console.log(error);

        };
    })();
});



module.exports = router;

