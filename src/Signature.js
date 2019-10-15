const nacl = require('libsodium-wrappers');

let keypair = null;
(async () => {
    await nacl.ready;
    keypair = nacl.crypto_sign_keypair();

})();

module.exports.verifyingKey = async function verifyingKey() {
    await nacl.ready;
    return keypair.publicKey;
};

module.exports.sign = async function sign(msg) {
    await nacl.ready;
    return nacl.crypto_sign(msg, keypair.privateKey);
};
