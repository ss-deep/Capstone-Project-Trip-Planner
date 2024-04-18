require('dotenv').config()
const { CONNECTION_STRING } = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING)

const {API_KEY}=process.env
const axios = require('axios')

module.exports = {
    checkUserData: (req, res) => { 
         // Read query parameters
        const loginUserName = req.query.loginUserName;
        const loginPassword = req.query.loginPassword;

        // Your logic here (e.g., authentication)
        console.log('Received loginUserName:', loginUserName);
        console.log('Received loginPassword:', loginPassword);
        sequelize.query(`
        select * from users where username = '${loginUserName}' and password = '${loginPassword}';
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
         }).catch(err => console.log('error checking data', err))

    },


    insertUserData: (req, res) => { 
        const {signupUserName,signupEmail,signupPassword} = req.body;
        // // Your logic here (e.g., authentication)
        console.log('Received signupUserName:', signupUserName);
        // // console.log('Received loginPassword:', loginPassword);
        //const { name, rating, countryId } = req.body

        sequelize.query(`
        insert into users (username, password, email)
        values (${signupUserName}, ${signupEmail}, ${signupPassword});
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
         }).catch(err => console.log('error inserting data', err))
    },

    getAttractions: async (req, res) => {
        try {
            if (req.body.properties.place_id!=='undefined') {
                let url = `https://api.geoapify.com/v2/places?categories=entertainment,national_park,natural&filter=place:${req.body.properties.place_id}&limit=3&format=json&apiKey=2edeea4d1a3e45f19e07523fdc852c2b`;
                const attractionsList = await axios.get(`${url}`)
                res.status(200).send(attractionsList.data);
            } else {
                console.log("Enter the city name");
            }
        } catch (error) {
            // console.error("ERROR GETTING DATA", error);
            // res.sendStatus(400);
        }
    }
}