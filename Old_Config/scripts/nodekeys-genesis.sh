#Author: Sergio Arévalo Roa
#!/bin/bash

Help()
{
   echo
   echo "Script que genera las claves de cada nodo y el fichero genesis."
   echo "Después de generarlos mueve cada fichero a su respectivo directorio."  
   echo
   echo "./nodekeys-genesis.sh"
   echo
   echo "Opciones:"
   echo "       -h     Imprime esta ayuda."
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

#Generación de las keys de los nodos y el fichero genesis
besu operator generate-blockchain-config --config-file=qbftConfigFile.json --to=networkFiles --private-key-file-name=key

if [ ! -f "networkFiles/genesis.json" ]; then
    echo "ERROR: $qbftnet_dir/networkFiles/genesis.json no se ha creado."
    exit 1
fi

if [ ! -d "networkFiles/keys" ]; then
    echo "ERROR: $qbftnet_dir/networkFiles/keys no se han creado"
    exit 1
fi

cp networkFiles/genesis.json .

node_number=1
keys_dir="./networkFiles/keys"

for dir in "$keys_dir"/*; do
    if [ -d "$dir" ]; then
        # Comprobación de que el directorio es del tipo 0x...
        if [[ "$(basename "$dir")" =~ ^0x[0-9a-fA-F]+$ ]]; then
            # Se crea si no existe
            mkdir -p "Node-$node_number/data"
            
            cp "$dir/key" "$dir/key.pub" "Node-$node_number/data/"
            
            echo "Ficheros copiados correctametne a Node-$node_number/data"
            
            ((node_number++))
        fi
    fi
done

