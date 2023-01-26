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
Loading addresses from addresses.json...
Setting provider...
Getting chain id...
Getting gas price...
Estimating gas cost...
You are about to send 0.1 ETH to 3 addresses. This will cost 0.00042 ETH (0.679539 USD) per address. Do you want to continue? (y/n)
y
Sending 0.1 ETH to 0x71517f86711B4BFf4D789Ad6FEE9a58D8AF1c6bB...
Balance for address: 0x71517f86711B4BFf4D789Ad6FEE9a58D8AF1c6bB
        before: 140.1073613600010002 ETH
        after: 140.2073613600010002 ETH

Sending 0.1 ETH to 0x78483031ddFe7779A64ddda044bfE98EE48131A5...
Balance for address: 0x78483031ddFe7779A64ddda044bfE98EE48131A5
        before: 120.04876986 ETH
        after: 120.14876986 ETH

Sending 0.1 ETH to 0x44b7fE75d9f0911B8B00A517617D613a4fd584C0...
Balance for address: 0x44b7fE75d9f0911B8B00A517617D613a4fd584C0
        before: 120.14408062 ETH
        after: 120.24408062 ETH
```