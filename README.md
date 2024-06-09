<h1>Desarrollo de un modelo de incentivos en blockchains permisionadas basado en tokens y oráculos </h1>

Este repositorio forma parte del Trabajo de Final de Máster del Máster en Ciberseguridad y Privacidad de la Universidad Oberta de Catalunya (UOC) en el ámbito de Blockchain.

Las versiones utilizadas para el desarrollo de este proyecto son:

-	Nvm v0.39.7
-	Node.js v16.20.2
-	Hardhat v2.22.4
-	Yarn v1.22.22
-	Compilador Solidity ^0.8.0
-	Besu v24.3.3
-	Java v17.0.4.1

Para la puesta en marcha de la plataforma se siguen los siguientes pasos:
 
1-	`Instalación de dependencias`<br>
&nbsp;&nbsp;&nbsp;&nbsp;a.	Con la terminal en el directorio raíz del proyecto utiliza la herramienta yarn para instalar las dependencias de este. Para hacerlo ejecutar el siguiente comando y comprobar que al finalizar se ha generado correctamente el directorio node_modules:
>yarn init

2-	`Inicio de la red blockchain`<br>
&nbsp;&nbsp;&nbsp;&nbsp;a.	Situar la terminal en el directorio besu/QBFT-Network/Node-1.<br>
&nbsp;&nbsp;&nbsp;&nbsp;b.	Iniciar el primer nodo como bootnode con el siguiente comando:
>besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN,WEB3 --host-allowlist="*" --rpc-http-cors-origins="all" --min-gas-price=0

&nbsp;&nbsp;&nbsp;&nbsp;c.	Durante el arranque del nodo podemos ver que genera una URL enode, copiar esta para iniciar el resto de nodos. En este caso la URL generada es: 
>enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303

&nbsp;&nbsp;&nbsp;&nbsp;d.	Situar la terminal en el directorio besu/QBFT-Network/Node-2 e iniciar el segundo nodo indicando la URL del enodo del Nodo 1 obtenida anteriormente con el siguiente comando:
>besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN,WEB3  --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --min-gas-price=0

&nbsp;&nbsp;&nbsp;&nbsp;e.	Situar la terminal en el directorio besu/QBFT-Network/Node-3 e iniciar el tercer nodo indicando la URL del enodo del Nodo 1 obtenida anteriormente con el siguiente comando:
>besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN,WEB3  --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547 --min-gas-price=0

&nbsp;&nbsp;&nbsp;&nbsp;f.	Situar la terminal en el directorio besu/QBFT-Network/Node-4 e iniciar el cuarto nodo indicando la URL del enodo del Nodo 1 obtenida anteriormente con el siguiente comando:
>besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://09a2ae8979e957b2c80103a01386cd403424f42126b690991b32c61c4466fad0b41c091363c3ad14e50a511491b8c55fe47cac9d9b8fd9648ab9d7f4990e4a69@127.0.0.1:30303 --p2p-port=30302 --rpc-http-enabled --rpc-http-api=ETH,NET,QBFT,ADMIN,WEB3  --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8548 --min-gas-price=0

&nbsp;&nbsp;&nbsp;&nbsp;g.	Utilizar la herramienta Curl desde la terminal para verificar que la red se ha iniciado correctamente con cuatro validadores mediante el siguiente comando:
>curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}' localhost:8545

3-	`Despliegue de Smart Contracts`<br>
&nbsp;&nbsp;&nbsp;&nbsp;a.	Desde el directorio raíz del proyecto compilar y desplegar en la red Besu los Smart Contracts mediante el siguiente comando:
>npx hardhat run --network besu scripts/deploy.js

&nbsp;&nbsp;&nbsp;&nbsp;b.	Al finalizar la ejecución de deploy.js se debe ver en la terminal las direcciones de despliegue. 

4-	`Iniciar el servidor para gestionar las solicitudes mediante el siguiente comando ejecutado en el directorio raíz del proyecto`:
>node scripts/server.js

5-	`Realizar una petición de actualización de datos y realización de transferencias utilizando el siguiente comando desde el directorio raíz del proyecto`:
>node scripts/update-data.js

6-	`Verificar que la terminal donde se está ejecutando server.js indica que se reciben las solicitudes y se realiza el trabajo de búsqueda, calculo y transferencia de tokens`.




