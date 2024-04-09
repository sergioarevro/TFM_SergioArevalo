#!/bin/bash

Help()
{
   echo
   echo ""
   echo
   echo "./start-nodes.sh"
   echo
   echo "Options:"
   echo "       -h     Print this Help."
   echo
}

while getopts ":h" option; do
   case $option in
     h) Help
        exit;;
   esac
done

qbftnet_dir="../besu/QBFT-Network"

cd $qbftnet_dir

#First node as a bootnode
cd Node-1
osascript -e 'tell app "Terminal" to do script "besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN --host-allowlist='*' --rpc-http-cors-origins='all'\""'

#Second node
cd ../Node-2
osascript -e 'tell app "Terminal" to do script "besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN --host-allowlist='*' --rpc-http-cors-origins='all' --rpc-http-port=8546\""'

#Third node
cd ../Node-3
osascript -e 'tell app "Terminal" to do script "besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN --host-allowlist='*' --rpc-http-cors-origins='all' --rpc-http-port=8547\""'

#Fourth node
cd ../Node-4
osascript -e 'tell app "Terminal" to do script "besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30306 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN --host-allowlist='*' --rpc-http-cors-origins='all' --rpc-http-port=8548\""'

#Check
osascript -e 'tell app "Terminal" to do script "curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"qbft_getValidatorsByBlockNumber\",\"params\":[\"latest\"], \"id\":1}' localhost:8545\""'

