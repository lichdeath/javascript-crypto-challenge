const nacl = require('libsodium-wrappers');

let ClientKey = null;
let keypair = null;
(async () => {
    await nacl.ready;
    keypair = nacl.crypto_kx_keypair();

})();

module.exports.setClientPublicKey = async function SetClientPublicKey(ClientPublicKey){
    ClientKey = ClientPublicKey;
};

module.exports.ServerPublickKey = async ()=>{
    return keypair.publicKey;
};