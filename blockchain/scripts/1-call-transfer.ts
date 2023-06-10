import {Address, toNano, WalletTypes} from "locklift";
const { program } = require('commander');


async function main() {
  program
    .option('-r, --recipient <char>')
    .option('-a, --amount <char>');

  program.parse();

  const options = program.opts();

  const pk = 'afd6feab3aeaf862f9db3f2a4d3edc5376c8327ee11040d58a105d666eebe01d'
  const owner = new Address('0:9080ef4369fd6becd3a0f6133bd54bb29f5f3921108343a0acb11c414c3e94f8');
  const rec = new Address(options.recipient);
  await locklift.keystore.addKeyPair({
    publicKey: pk,
    secretKey: 'f210b54cfc551b1741f04b06eba7fd98209bf76af88abd81ae8f10028e7067fc'
  });

  const addr = new Address('0:51b040ef9df22a399177add4a3d201282b3f7bcadb8f8bf33f914ce2da36bfd9');
  const wallet = await locklift.factory.getDeployedContract('TokenWalletUpgradeable', addr);

  const acc = await locklift.factory.accounts.addExistingAccount({
    type: WalletTypes.EverWallet, address: owner
  });

  await locklift.tracing.trace(wallet.methods.transfer({
    amount: options.amount, recipient: rec, payload: '', notify: false, deployWalletValue: toNano(0.1), remainingGasTo: acc.address
  }).send({from: acc.address, amount: toNano(1)}), {allowedCodes: {compute: [51]}});

}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
