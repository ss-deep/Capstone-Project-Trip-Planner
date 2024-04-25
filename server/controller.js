require('dotenv').config()
const { CONNECTION_STRING } = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING)

const {API_KEY}=process.env
const axios = require('axios')

module.exports = {
    checkUserData: async(req, res) => { 
         // Read query parameters
        const loginUserName = req.query.loginUserName;
        const loginPassword = req.query.loginPassword;

        // Your logic here (e.g., authentication)
        console.log('Received loginUserName:', loginUserName);
        console.log('Received loginPassword:', loginPassword);
        let checkUser=await sequelize.query(`
        select user_id from users where username = '${loginUserName}' and password = '${loginPassword}';
        `)
        console.log("checkUser[0][0]['user_id']" ,checkUser[0][0]['user_id']);
        if (checkUser) {
            // console.log("hey");
            let record=await sequelize.query(`
            SELECT u.user_id, u.username, t.trip_name, t.date
            FROM users u
            JOIN trip t ON u.user_id = t.user_id
            WHERE u.user_id = ${checkUser[0][0]['user_id']};
            `)
            res.status(200).send(record[0])
        }
        else {
            console.log("eeeerrrrrooooorrrr");
            res.status(400).send()
        }

        //     .then((dbRes) => {
        //     res.status(200).send(dbRes[0])
        //  }).catch(err => console.log('error checking data', err))

    },

    insertUserData: (req, res) => { 
        const {signupUserName,signupEmail,signupPassword} = req.body;
        console.log('Received signupUserName:', signupUserName);

        sequelize.query(`
        insert into users (username, password, email)
        values ('${signupUserName}', '${signupPassword}', '${signupEmail}');
        `).then((dbRes) => {
            res.status(200).send("Successful!")
         }).catch(err => console.log('error inserting data', err))
    },

    insertPlannerData: (req, res) => {

        console.log("inside insertPlannerData");
        const {userId,username,tripName,tripDates} = req.body;
        console.log('Received tripDates:', tripDates);
        // res.status(200).send("going back");
        sequelize.query(`
        insert into trip (user_id, trip_name, date)
        values (${userId}, '${tripName}', '${tripDates}');
        `).then((dbRes) => {
            res.status(200).send("Successful!")
         }).catch(err => console.log('error inserting trip planner data', err))
    },

    getAttractions: async (req, res) => {
        try {
            if (req.body.properties.place_id!=='undefined') {
                let url = `https://api.geoapify.com/v2/places?categories=entertainment,national_park,natural&filter=place:${req.body.properties.place_id}&limit=4&format=json&apiKey=2edeea4d1a3e45f19e07523fdc852c2b`;
                const attractionsList = await axios.get(`${url}`)
                res.status(200).send(attractionsList.data);
            } else {
                console.log("Enter the city name");
            }
        } catch (error) {
            // console.error("ERROR GETTING DATA", error);
            // res.sendStatus(400);
        }
    },
    getUserTripDetails: (req, res) => { 
        let {userId}=req.body
        // console.log("inside getUserTripDetails ",userId );
        const userTripData = sequelize.query(`
        SELECT u.username, t.trip_name, t.date
        FROM users u
        JOIN trip t ON u.user_id = t.user_id
        WHERE u.user_id = ${userId};

        `).then((dbRes) => {
            // console.log("DAta: : ",dbRes[0]);
            res.status(200).send(dbRes[0])
         }).catch(err => console.log('error retriving data', err))

    }
}

