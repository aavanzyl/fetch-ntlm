const express = require('express');
const ntlm = require('express-ntlm');
const bodyParser = require('body-parser');
const cors = require('cors');

// let _options = {

// 	domain: 'nov',
// 	workstation: '',
// 	username: 'anton',
// 	password: 'password',
// 	url: 'http://localhost:8231/',
// };


module.exports = class NtlmEndpoint {

    constructor() {

    }

    start() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        var _corsOptions = {
            exposedHeaders: 'www-authenticate'
        };

        this.app.use(cors(_corsOptions));
        this.app.use(
            ntlm({
                // No authentication enabled - accept any username and password
                debug: function () {
                    var args = Array.prototype.slice.apply(arguments);
                    console.log.apply(null, args);
                }
            })
        );


        this.app.get('/', function (req, res) {
            res.send('Hello World! NTLM: ' + JSON.stringify(req.ntlm));
        });

        this.app.get('/get.json', function (req, res) {
            res.json({
                ntlm: req.ntlm,
                success: true
            });
        });

        this.app.get('/get-multi-byte-chars.json', function (req, res) {
            res.json({
                ntlm: req.ntlm,
                success: true,
                message: '€æ©'
            });
        });

        this.app.post('/post.json', function (req, res) {
            res.json({
                ntlm: req.ntlm,
                body: req.body
            });
        });

        this.server = this.app.listen(8231, function () {
            console.log("Starting NTLM endpoint", "http://localhost:8231");
        });

    }

    stop() {
        this.server.close();
    }

}