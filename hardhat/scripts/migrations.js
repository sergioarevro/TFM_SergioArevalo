const hre = require("hardhat");
const { readdirSync } = require("fs");

async function main() {
  const scripts = readdirSync("scripts/migrations/").sort();
  for (const script of scripts) {
    if (script.endsWith(".js")) {
      console.log(`Ejecutando script de migración: ${script}`);
      await hre.run("run", "scripts/migrations/${script}");
      console.log(`Script de migración ${script} completado`);
    }
  }
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

