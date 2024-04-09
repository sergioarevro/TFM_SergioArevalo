#Author: Sergio Arévalo Roa 
#!/bin/bash

Help()
{
   echo
   echo "Script para crear la estructura de directorios necesaria para el funcionamiento de los nodos de la red."
   echo
   echo "Estructura:"
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
   echo "Uso: ./mk-node-directories.sh"
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
qbft_config="../besu/QBFTConfigFile.json"
besu_dir="../besu"
nodes=4

if [ -d "$qbftnet_dir" ]; then
        echo "El directorio QBFT-Network ya existe. La estructura está creada."

else
        echo "Creando estructura de directorios para $nodes nodos."
        mkdir -p $qbftnet_dir

        for ((i = 1; i<= $nodes; i++))
        do
                mkdir -p $qbftnet_dir/Node-$i/data
        done
fi

if [ -f "$besu_dir/qbftConfigFile.json" ]; then
        cp $besu_dir/qbftConfigFile.json $qbftnet_dir
else
        if ! [ -f "$qbftnet_dir/qbftConfigFile.json" ]; then
                echo "AVISO. Recuerda creear el fichero qbftConfigFile.json y añadirlo al directorio QBFT-Network. En caso contrario el despliegue de la red fallará."
        fi
fi