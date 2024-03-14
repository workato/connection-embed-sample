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
        const {WK_API_KEY, WK_CUSTOMER_ID, WK_USER_ID, WK_CUSTOM_VENDOR_ORIGIN, WK_JWT_PRIVATE_KEY} = process.env;
        const subParams = [WK_API_KEY, WK_CUSTOMER_ID];

    if (WK_USER_ID) {
      subParams.push(WK_USER_ID);
    }

    const token = sign(
      {
        sub: subParams.join(':'),
        jti: nanoid(),
        origin: WK_CUSTOM_VENDOR_ORIGIN
      },
      WK_JWT_PRIVATE_KEY,
      {algorithm: 'RS256'}
    );


        res.json(token);
    });

    app.get('/workato-connections', (req, resp) => {
        const options = {
            headers: {
                'Authorization': `Bearer ${process.env.WK_API_TOKEN}`
            }
        };

        https.get(`${process.env.VUE_APP_WK_HOST}/api/managed_users/${process.env.WK_USER_ID}/connections?include_runtime_connections=true`, options, (res) => {
            if (res.statusCode !== 200) {
                const error = `Request Failed. Status code: ${res.statusCode}.Message: ${res.statusMessage}`;
                res.resume();
                sendError(error, resp);
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    resp.json(parsedData.result);
                } catch (e) {
                    sendError(e.message, resp);
                }
            });
        }).on("error", (err) => {
            sendError("Error: " + err.message, resp);
        });

    })
}


function sendError(error, res) {
    console.error(error);
    res.status(500).send({
        message: error
    });
}
