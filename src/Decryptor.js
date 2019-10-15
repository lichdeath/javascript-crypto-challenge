const nacl = require('libsodium-wrappers');

let key = null;

module.exports.decrypt = async function decrypt(cyphertext, nonce) {
    await nacl.ready;
    if (key == null){
        throw "no key";
    }else{
        return nacl.crypto_secretbox_open_easy(cyphertext,nonce,key);

    }
};

module.exports.setKey = async function setKey(msg) {
   key = msg;
};
