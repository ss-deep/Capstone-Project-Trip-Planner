require('dotenv').config()
const {API_KEY}=process.env
const axios = require('axios')

module.exports = {
    getAttractions: async (req, res) => {
        try {
            // const data = req.body
            // console.log(req.body.properties.place_id)
            // res.status(200).send(`sending hi from controller ${data}`)
            //call places api
            // let apiKey = "2edeea4d1a3e45f19e07523fdc852c2b";
            // console.log(req.body.properties.place_id);

            let url = `https://api.geoapify.com/v2/places?categories=entertainment,national_park,natural&filter=place:${req.body.properties.place_id}&limit=2&format=json&apiKey=2edeea4d1a3e45f19e07523fdc852c2b`;
            const attractionsList = await axios.get(`${url}`)
            // console.log(attractionsList.data);
            res.status(200).send(attractionsList.data);
        } catch (error) {
            console.error("ERROR GETTING DATA", error);
            res.sendStatus(400);
        }
    }
}