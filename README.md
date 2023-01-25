# Sending ETH to many addresses

Web3 script that sends eth to multiple addresses.

## How it works

The program will 
- read sender's private key from an env file
- read a list of ethereum addresses from a JSON file.
- read the amount of eth to send passed as an argument
- make a gas estimation of the total cost
- prompt the user for confirmation
- build, sign and send 1 tx for every destination address


## Usage:

1. npm install
2. create .env file with the following variables:
   ```
    - PRIVATE_KEY
    - INFURA_KEY
    - WEB3_PROVIDER (i.e. "http://127.0.0.1:7545")
    ```
3. Create json file with a list of addresses to send ether to. Example:
   ```
    [
	"0x0000000000000000000000000000000000000001",
	"0x0000000000000000000000000000000000000002",
	"0x0000000000000000000000000000000000000003"
	]
   ```
4. Run the script with the following command:
   ```
    node sendeth.js <amount> <path to json file>	
    ```

## Example output

```
❯ node sendeth.js 10 addresses.json
Loading addresses from addresses.json...
Setting provider...
Getting chain id...
Getting gas price...
Estimating gas cost...
You are about to send 10 ETH to 3 addresses. This will cost 0.00042 ETH per address. Do you want to continue? (y/n)
y
Sending 10 ETH to 0x71517f86711B4BFf4D789Ad6FEE9a58D8AF1c6bB...
Balance for 0x71517f86711B4BFf4D789Ad6FEE9a58D8AF1c6bB before: 119.9073613600010002 ETH
Balance for 0x71517f86711B4BFf4D789Ad6FEE9a58D8AF1c6bB after: 129.9073613600010002 ETH
{
  transactionHash: '0xf5c7852113d75dffeacb33488195e343c9adf1936e145c2db2404af9b65e86ac',
  transactionIndex: 0,
  blockHash: '0xd355406a9207ad758e85af4431a7c04575f7224c37c9f0f8970f4e0c3a4bd6b2',
  blockNumber: 522,
  from: '0xa6d2799a4b465805421bd10247386a708f01db03',
  to: '0x71517f86711b4bff4d789ad6fee9a58d8af1c6bb',
  gasUsed: 21000,
  cumulativeGasUsed: 21000,
  contractAddress: null,
  logs: [],
  status: true,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
}
Sending 10 ETH to 0x78483031ddFe7779A64ddda044bfE98EE48131A5...
Balance for 0x78483031ddFe7779A64ddda044bfE98EE48131A5 before: 99.84876986 ETH
Balance for 0x78483031ddFe7779A64ddda044bfE98EE48131A5 after: 109.84876986 ETH
{
  transactionHash: '0xc3692ff1580dfc3bc475df73a805844cfddbf8434e648d62ab3452f020c2368a',
  transactionIndex: 0,
  blockHash: '0x61df1e30480968f94912f5769308e539903f56529614ffa26454fa32ee9875c2',
  blockNumber: 523,
  from: '0xa6d2799a4b465805421bd10247386a708f01db03',
  to: '0x78483031ddfe7779a64ddda044bfe98ee48131a5',
  gasUsed: 21000,
  cumulativeGasUsed: 21000,
  contractAddress: null,
  logs: [],
  status: true,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
}
Sending 10 ETH to 0x44b7fE75d9f0911B8B00A517617D613a4fd584C0...
Balance for 0x44b7fE75d9f0911B8B00A517617D613a4fd584C0 before: 99.94408062 ETH
Balance for 0x44b7fE75d9f0911B8B00A517617D613a4fd584C0 after: 109.94408062 ETH
{
  transactionHash: '0xdac766742fde660c59eff751c0a639c3c7326d078dd3a7c2511d65fe9f2772c1',
  transactionIndex: 0,
  blockHash: '0xbc060415b62f17a796699de1cf9c4725f46b6f36b36e1a18740e95067797e511',
  blockNumber: 524,
  from: '0xa6d2799a4b465805421bd10247386a708f01db03',
  to: '0x44b7fe75d9f0911b8b00a517617d613a4fd584c0',
  gasUsed: 21000,
  cumulativeGasUsed: 21000,
  contractAddress: null,
  logs: [],
  status: true,
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
}
```