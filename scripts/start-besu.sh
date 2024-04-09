#Author: Sergio Arévalo Roa 
#!/bin/bash

Help()
{
   echo
   echo "Script para inicializar la red Besu."
   echo
   echo "./start-besu.sh -h"
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

if [ -f "mk-node-directories.sh" ]; then
        chmod +x mk-node-directories.sh  
        ./mk-node-directories.sh
        echo "mk-node-direcories.sh ejecutado correctamente."
else
        echo "ERROR. No existe mk-node-directories.sh en este directorio."
fi

if [ -f "nodekeys-genesis.sh" ]; then
        chmod +x nodekeys-genesis.sh  
        ./nodekeys-genesis.sh
        echo "nodekeys-genesis.sh ejecutado correctamente."
else
        echo "ERROR. No existe nodekeys-genesis.sh en este directorio."
fi

#Faltará iniciar los nodos

#Get de Sirato block explorer

