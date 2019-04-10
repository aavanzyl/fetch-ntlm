# fetch-ntlm

A Browser Based library to do fetch based NTLM authentication

It's a rewrite of [httpntlm](https://www.npmjs.com/package/httpntlm)

## Install

    npm install fetch-ntlm

## How to use

```js

const fetchNtlm = require('fetch-ntlm');

let _options = {

    //Normal Fetch Options
    method: 'GET',

    // NTLM Specific Options
    domain: '',
    workstation: '',
    username: '',
    password: ''
};

fetchNtlm('http://localhost:80/', _options).then(function(response){
    console.log(response);
});


```

## pre-encrypt the password
```js

var httpntlm = require('httpntlm');
var ntlm = httpntlm.ntlm;
var lm = ntlm.create_LM_hashed_password('Azx123456');
var nt = ntlm.create_NT_hashed_password('Azx123456');
console.log(lm);
console.log(Array.prototype.slice.call(lm, 0));
lm = new Buffer([ 183, 180, 19, 95, 163, 5, 118, 130, 30, 146, 159, 252, 1, 57, 81, 39 ]);
console.log(lm);

console.log(nt);
console.log(Array.prototype.slice.call(nt, 0));
nt = new Buffer([150, 27, 7, 219, 220, 207, 134, 159, 42, 60, 153, 28, 131, 148, 14, 1]);
console.log(nt);


httpntlm.get({
    url: "https://someurl.com",
    username: 'm$',
    lm_password: lm,
    nt_password: nt,
    workstation: 'choose.something',
    domain: ''
}, function (err, res){
    if(err) return err;

    console.log(res.headers);
    console.log(res.body);
});

/* you can save the array into your code and use it when you need it

<Buffer b7 b4 13 5f a3 05 76 82 1e 92 9f fc 01 39 51 27>// before convert to array
[ 183, 180, 19, 95, 163, 5, 118, 130, 30, 146, 159, 252, 1, 57, 81, 39 ]// convert to array
<Buffer b7 b4 13 5f a3 05 76 82 1e 92 9f fc 01 39 51 27>//convert back to buffer

<Buffer 96 1b 07 db dc cf 86 9f 2a 3c 99 1c 83 94 0e 01>
[ 150, 27, 7, 219, 220, 207, 134, 159, 42, 60, 153, 28, 131, 148, 14, 1 ]
<Buffer 96 1b 07 db dc cf 86 9f 2a 3c 99 1c 83 94 0e 01>
*/

```


## Options

- `url:`      _{String}_   URL to connect. (Required)
- `username:` _{String}_   Username. (Required)
- `password:` _{String}_   Password. (Required)
- `workstation:` _{String}_ Name of workstation or `''`.
- `domain:`   _{String}_   Name of domain or `''`.

if you already got the encrypted password,you should use this two param to replace the 'password' param.

- `lm_password` _{Buffer}_ encrypted lm password.(Required)
- `nt_password` _{Buffer}_ encrypted nt password. (Required)

You can also pass along all other options of [httpreq](https://github.com/SamDecrock/node-httpreq), including custom headers, cookies, body data, ... and use POST, PUT or DELETE instead of GET.


## More information

* [python-ntlm](https://code.google.com/p/python-ntlm/)
* [httpntlm](https://www.npmjs.com/package/httpntlm/)
* [NTLM Authentication Scheme for HTTP](http://www.innovation.ch/personal/ronald/ntlm.html)
* [LM hash on Wikipedia](http://en.wikipedia.org/wiki/LM_hash)


## License (MIT)

Copyright (c) Anton Van Zyl <https://github.com/aavanzyl/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
