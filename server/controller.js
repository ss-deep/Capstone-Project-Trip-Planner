require('dotenv').config()
const {API_KEY}=process.env
// const axios = require('axios')

module.exports = {
    getAttractions: async (req, res) => {
        try {
            const data = req.body
            console.log(req.body)
            res.status(200).send(`sending hi from controller ${data}`)
            //call places api
            // let apiKey = "2edeea4d1a3e45f19e07523fdc852c2b";
            let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&format=json&apiKey=${API_KEY}`;
    
            const attractionsList = await axios.get(`${url}`)
            res.status(200).send(attractionsList);
        } catch (error) {
            console.error("ERROR GETTING DATA", error);
            res.sendStatus(400);
        }
    }
}