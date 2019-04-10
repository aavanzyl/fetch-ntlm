const ntlm = require('./../main/ntlm');


let _options = {

    domain: 'nov',
    workstation: '',
    username: 'username',
    password: 'password',
    url: 'http://localhost:8231/',
};

var type1msg = ntlm.createType1Message(_options);