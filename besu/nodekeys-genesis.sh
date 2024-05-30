#Author: Sergio Arévalo Roa
#Description: Script that generate node keys and genesis file. After this, move each file to its directory
#!/bin/bash

Help()
{
   echo
   echo "Script that generates node keys and a genesis file. After this, it moves each file to its directory."
   echo
   echo "./nodekeys-genesis.sh"
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

cd QBFT-Network

#Generate node keys and genesis file
besu operator generate-blockchain-config --config-file=qbftConfigFile.json --to=networkFiles --private-key-file-name=key

#Check if last execution is correct
if [ ! -f "networkFiles/genesis.json" ]; then
    echo "Error: networkFiles/genesis.json does not exist."
    exit 1
fi

if [ ! -d "networkFiles/keys" ]; then
    echo "Error: networkFiles/keys does not exist."
    exit 1
fi

# If all ok. Move genesis file and node private keys 
cp networkFiles/genesis.json .

node_number=1
keys_dir="./networkFiles/keys"

for dir in "$keys_dir"/*; do
    if [ -d "$dir" ]; then
        # Check if directory name is like 0x...
        if [[ "$(basename "$dir")" =~ ^0x[0-9a-fA-F]+$ ]]; then
            # mkdir if not exist
            mkdir -p "Node-$node_number/data"
            
            cp "$dir/key" "$dir/key.pub" "Node-$node_number/data/"
            
            echo "Files moved succesfully to Node-$node_number/data"
            
            ((node_number++))
        fi
    fi
done

