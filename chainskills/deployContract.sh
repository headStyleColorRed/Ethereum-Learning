truffle migrate --compile-all --reset --network ganache
rm website/src/assets/ChainList.json
cp build/contracts/ChainList.json website/src/assets