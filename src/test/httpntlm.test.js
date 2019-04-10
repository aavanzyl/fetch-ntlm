const fetchNtlm = require('./../main/fetch.ntlm');
const Endpoint = require('./ntlm-endpoint');
const nodeFetch = require('node-fetch');


global.fetch = nodeFetch;

let endpoint = new Endpoint();
endpoint.start();


let _options = {
    domain: 'nov',
    workstation: '',
    username: '',
    password: ''
};

fetchNtlm('http://localhost:8231/', _options).then(function(response){
    console.log(response);

}).finally(function(error){
    endpoint.stop();
})

//TODO Test is failing due to keep-alive