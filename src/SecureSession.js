const nacl = require('libsodium-wrappers');

let ClientKey = null;
let keypair = null;
(async () => {
    await nacl.ready;
    keypair = nacl.crypto_kx_keypair();

})();

module.exports.setClientPublicKey = function SetClientPublicKey(ClientPublicKey){

        if (ClientKey == null ||ClientKey == ClientPublicKey ) {
            ClientKey = ClientPublicKey;
        }
        else {
            throw 'client public key already set';
        }

};

module.exports.serverPublicKey = async ()=>{
    return keypair.publicKey;
};

module.exports.decrypt = async (cyphertext, nonce)=>{
    await nacl.ready;
    let sharedkey = nacl.crypto_kx_server_session_keys(
        keypair.publicKey,
        keypair.privateKey,
        ClientKey
    );
    return nacl.crypto_secretbox_open_easy(cyphertext,nonce,sharedkey.sharedRx);
};

module.exports.encrypt = async (msg)=>{
    await nacl.ready;
    let sharedkey = nacl.crypto_kx_server_session_keys(
        keypair.publicKey,
        keypair.privateKey,
        ClientKey
    );
    let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
    let cypher = nacl.crypto_secretbox_easy(msg,nonce,sharedkey.sharedTx);
    return {ciphertext: cypher,nonce: nonce};
};