#Author: Sergio Arévalo Roa 
#Description: Script for create directories for Besu private network

#!/bin/bash


Help()
{
   echo
   echo "Script for create directories for Hyperledger Besu private Network"
   echo
   echo "Structure Type:"
   echo "       QBFT-Network/"
   echo "       ├── Node-1"
   echo "       │   └── data"
   echo "       ├── Node-2"
   echo "       │   └── data"
   echo "       ├── Node-3"
   echo "       │   └── data"
   echo "       └── Node-4"
   echo "        └── data"
   echo
   echo "Usage: ./mk-node-directories.sh <number-of-nodes>"
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

#Verify if number of nodes is specified
if [ $# -eq 0 ]; then
    echo "Please specify number of nodes."
    exit 1
else
    nodes=$1
    echo "Creating structure for $nodes"

    mkdir -p QBFT-Network

    for ((i = 1; i<= $nodes; i++))
    do
            mkdir -p QBFT-Network/Node-$i/data
    done
fi

#if qbftConfigFile.json exist move it to QBFT-Network directory

if [ -f "./qbftConfigFile.json" ]; then
        cp qbftConfigFile.json QBFT-Network
else
        echo "Remember to create the file qbftConfigFile.json" 
fi

