import nanoid from 'nanoid';
import {sign} from 'jsonwebtoken';
import auth from 'http-auth';
const https = require('https');

const basicAuth = auth.basic({realm: "Private Area"}, (username, password, callback) => {
    callback(username === process.env.USER_NAME && password === process.env.USER_PASSWORD);
});

export default app => {
    if (process.env.USER_NAME && process.env.USER_PASSWORD) {
        app.use(auth.connect(basicAuth));
    }

    app.get('/workato-jwt', (req, res) => {
        const token = sign(
            {
                sub: `${process.env.WK_API_KEY}:${process.env.WK_USER_ID}`,
                jti: nanoid()
            },
            process.env.WK_JWT_PRIVATE_KEY,
            {algorithm: 'RS256'}
        );

        res.json(token);
    });

    app.get('/workato-connections', (req, resp) => {
        const options = {
            headers: {
                'x-user-email': process.env.WK_USER_EMAIL,
                'x-user-token': process.env.WK_USER_TOKEN
            }
        };

        // https.get(`${process.env.VUE_APP_WK_HOST}/api/managed_users/${process.env.WK_USER_ID}/connections`, options, (res) => {
        //     if (res.statusCode !== 200) {
        //         const error = `Request Failed. Status code: ${res.statusCode}.Message: ${res.statusMessage}`;
        //         res.resume();
        //         sendError(error, resp);
        //         return;
        //     }
        //
        //     res.setEncoding('utf8');
        //     let rawData = '';
        //     res.on('data', (chunk) => { rawData += chunk; });
        //     res.on('end', () => {
        //         try {
        //             const parsedData = JSON.parse(rawData);
        //             console.log(parsedData);
        //             resp.json(parsedData.result);
        //         } catch (e) {
        //             sendError(e.message, resp);
        //         }
        //     });
        // }).on("error", (err) => {
        //     sendError("Error: " + err.message, resp);
        // });

        resp.json([
            {
                "id": 30,
                "name": "My Salesforce account",
                "provider": "salesforce",
                "authorization_status": "success",
                "authorized_at": "2019-09-10T18:19:43.018-07:00",
                "created_at": "2019-09-10T18:19:12.902-07:00",
                "updated_at": "2019-09-10T18:19:43.021-07:00"
            },
            {
                "id": 62,
                "name": "My Box account",
                "provider": "box",
                "authorization_status": "",
                "authorized_at": "2019-09-10T18:20:08.854-07:00",
                "created_at": "2019-09-10T18:19:57.437-07:00",
                "updated_at": "2019-09-10T18:20:08.859-07:00"
            },
            {
                "id": 61,
                "name": "My Salesforce account",
                "provider": "salesforce",
                "authorization_status": "success",
                "authorized_at": "2019-09-10T18:19:43.018-07:00",
                "created_at": "2019-09-10T18:19:12.902-07:00",
                "updated_at": "2019-09-10T18:19:43.021-07:00"
            }
        ])

    })
}


function sendError(error, res) {
    console.error(error);
    res.status(500).send({
        message: error
    });
}
