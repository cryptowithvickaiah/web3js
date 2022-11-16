const express = require('express')
const app = express()
const axios = require('axios');
var bodyParser  = require('body-parser');
const fs = require('fs')
var Tx = require('ethereumjs-tx');
const os = require('os');


var Web3 = require("web3")
const http = require('http');
var Accounts = require('web3-eth-accounts');
const requestPromise = require('request-promise');
const { resolveNaptr } = require('dns/promises');


console.log('hostname ' + os.hostname)

const API_alchemy = '';
const web3 = new Web3(new Web3.providers.HttpProvider(`https://eth-mainnet.alchemyapi.io/v2/${API_alchemy}`));


var account = web3.eth.accounts.create();
var address = account.address;
var privateKey = account.privateKey;


console.log('Address: ' + address);
console.log('Private key ' + privateKey);





let minABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]


const tokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; //Contract address
const walletAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // Wallet address, Kindly no this is for testing purposes do not send funds here

const contract =  new web3.eth.Contract(minABI, tokenAddress);

console.log(contract.methods.totalSupply().call((err,result) => {
    if(err){
        console.error('Error: ', err);
    }else{

        contract.methods.decimals().call(function(err,d){
            console.log("decimals:",d);
            contract.methods.totalSupply().call(function(err,result){
                console.log(result/(10 ** d))
                var dec = result.substr(-d)
                var dec_ = result.length - d
                console.log("Total supply of :"  + result.substring(0,dec_)+'.'+dec)

            })
           
        })  
        var win = contract.methods.name().call(function(err,result){
            console.log(result)
        }) 
        contract.methods.symbol().call(function(err,result){
            console.log('Symbol: '+result)
        })         
        contract.methods.totalSupply().call(function(err,result){
            var dec = result.substr(-6)
            var dec_ = result.lenght - d
            console.log("Total" +parseFloat(dec).toFixed(6))
            console.log("Total" +result.length)
        })
       
    }
    
    
}))

async function getBalance() {
  const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  
  const format = web3.utils.fromWei(result, 'ether');// 29803630.997051883414242659
  
  console.log('Balance: ' +format*(10 ** 6));
}

getBalance(); 

async function getTokenBalance() {
    let result = await contract.methods.balanceOf('0x7830c87c02e56aff27fa8ab1241711331fa86f43').call();

    console.log(result)

    const formattedResult = web3.utils.fromWei(result, "ether");

    console.log('Balance' +formattedResult);
}

getTokenBalance();



const c_address = "0xdac17f958d2ee523a2206206994597c13d831ec7"
const contract = new web3.eth.Contract(minABI, c_address)
contract.methods.totalSupply().call((err, result) => {
     console.log( web3.utils.fromWei(result, 'ether')) 
    
})

contract.methods.totalSupply().call((err, result) => {
    if(err){
      console.error('Error: ', err);
      // handle the error here
    }
  
    let supply = web3.utils.fromWei(result, 'ether');
    // You can add supply now to whatever part
    // of your page you want it displayed
  });




async function eth_transaction(){
    const value = web3.utils.toWei('0.1', 'ether');
    const data = contract.methods.transfer('0xF0109fC8DF283027b6285cc889F5aA624EaC1F55', value).encodeABI();
    const SignedTransaction = await web3.eth.accounts.signTransaction({

        to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        value: value,
        gas: 2000000,
        data: data
    }, '0xba7ad5df982638898e066d4c40f795f9212415c84f0348ed90f0eef42a4addbc')
           
        web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction, function(err, result){
                if(!err){console.log(result)}
                else{console.log(err.message)}
        })        
}
eth_transaction()


//kindly change to your desired port but do not include in production
app.listen(3008, () => {
    console.log('Server running on port 3008');
});

