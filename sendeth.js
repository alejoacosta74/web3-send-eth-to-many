/*
web3 script that sends ether from one account to mutliple accounts
Pre-requisites:
1. npm install
2. create .env file with the following variables:
    - PRIVATE_KEY
    - ADDRESS
    - INFURA_KEY
    - NETWORK
    - AMOUNT
3. Create json file with a list of addresses to send ether to. Example:
    [
	"0x0000000000000000000000000000000000000001",
	"0x0000000000000000000000000000000000000002",
	"0x0000000000000000000000000000000000000003"
	]
4. Run the script with the following command:
    node sendeth.js <amount> <path to json file>	

*/

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const dotenv = require('dotenv');
const fs = require('fs');
var readline = require('readline');
dotenv.config();

const web3 = new(Web3)
var BN = web3.utils.BN;
const gasLimit = 6721975;
const key = process.env.PRIVATE_KEY;
const privateKey = Buffer.from(
	key,
	'hex',
      )

let sender , amount, addresses, gasPrice, account, chainId;

// set http provider from env variable
setProvider = () => {
	if (process.env.INFURA_KEY) {
		web3.setProvider(new Web3.providers.HttpProvider(`https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`));
	} else if (process.env.WEB3_PROVIDER) {
		web3.setProvider(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
	} else {
		console.log('No provider found. Please set INFURA_KEY or WEB3_PROVIDER in .env file');
		process.exit(1);
	}
}

// check private key is valid
const checkPrivateKey = () => {
	try {
		account = web3.eth.accounts.privateKeyToAccount("0x"+privateKey.toString('hex'));
		sender = account.address;
		
	} catch (e) {
		console.log('Invalid private key: ' + e);
		process.exit(1);
	}
}

// get chain id
const getChainId = async () => {
	chainId = await web3.eth.net.getId();
}


// load and verify addresses from json file
const loadAddresses = (path) => {
	    let data = fs.readFileSync(path);
	    addresses = JSON.parse(data);
	    addresses.forEach((address) => {
			    	if (!web3.utils.isAddress(address)) {
	    		console.log(`Invalid address: ${address}`);
	    		process.exit(1);
	    	}
	    })		
}

// estimate gas cost for sending ether to 1 address
const estimateGas = async (address) => {
	gasPrice = await web3.eth.getGasPrice();
	const nonce = "0x0"
	const txData = {
		nonce: web3.utils.toHex(nonce+1),
		gasPrice: web3.utils.toHex(gasPrice),
		gasLimit: web3.utils.toHex(gasLimit),
		to: address,
		value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
		chainId: chainId,
	}
	const gas = await web3.eth.estimateGas(txData);
	const totalGasCost = BN(gas).mul(BN(gasPrice));
	return totalGasCost
}
// send ether to address
const sendEth = async (address) => {
	// get current balance for destination address
	const curBalance = await web3.eth.getBalance(address);

	// send ether
	gasPrice = await web3.eth.getGasPrice();
	const nonce = await web3.eth.getTransactionCount(sender);
	const txData = {
		nonce: web3.utils.toHex(nonce),
		gasPrice: web3.utils.toHex(gasPrice),
		gasLimit: web3.utils.toHex(gasLimit),
		to: address,
		value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
		chainId: chainId,
	}

	const tx = new Tx(txData);
	tx.sign(privateKey);
	const serializedTx = tx.serialize();
	const raw = '0x' + serializedTx.toString('hex');
	const receipt = await web3.eth.sendSignedTransaction(raw);

	// check updated balance for destination address
	const newBalance = await web3.eth.getBalance(address);
	console.log(`Balance for ${address} before: ${web3.utils.fromWei(curBalance, 'ether')} ETH`);
	console.log(`Balance for ${address} after: ${web3.utils.fromWei(newBalance, 'ether')} ETH`);

	// print receipt
	console.log(receipt);
}

const main = async () => {
	// check private key is valid
	checkPrivateKey();

	// check if the user has provided the correct number of arguments
	if (process.argv.length < 4) {
		console.log('Usage: node sendeth.js <amount> <path to json file>');
		process.exit(1);
	}
	amount = process.argv[2];
	let jsonPath = process.argv[3];

	// load addresses from json file
	console.log(`Loading addresses from ${jsonPath}...`);
	loadAddresses(jsonPath);

	//set http provider (infura or custom)
	console.log('Setting provider...');
	setProvider();

	// get chain id
	console.log('Getting chain id...');
	getChainId();

	//get gas price
	console.log('Getting gas price...');
	gasPrice = await web3.eth.getGasPrice();

	// estimate gas cost for sending ether to 1 address
	console.log('Estimating gas cost...');
	let gasCostEstimate = await estimateGas(addresses[0]);

	// prompt user for confirmation and send ether
	console.log(`You are about to send ${amount} ETH to ${addresses.length} addresses. This will cost ${web3.utils.fromWei(gasCostEstimate, 'ether')} ETH per address. Do you want to continue? (y/n)`);
	const rl = readline.createInterface({

		input: process.stdin,
		output: process.stdout
	});
	rl.question('', async (answer) => {
		if (answer === 'y') {
			for (let address of addresses) {
				console.log(`Sending ${amount} ETH to ${address}...`);
				await sendEth(address);
			}
		} else {
			console.log('Exiting...');
			process.exit(1);
		}
		rl.close();
	});
}

main()