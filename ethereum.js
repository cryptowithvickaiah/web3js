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

const web3 = new Web3(new Web3.providers.HttpProvider('https://eth-mainnet.alchemyapi.io/v2/VWFdC9xvAJ9xN6TOqFsgX2H3zbtDn901'));
// const web3 = new Web3("https://near-testnet.infura.io/v3/e61cb766a5bf4e368983a987d660b3cc")
// https://cloudflare-eth.com
// https://ropsten.infura.io/v3/e61cb766a5bf4e368983a987d660b3cc
// https://eth-mainnet.alchemyapi.io/v2/VWFdC9xvAJ9xN6TOqFsgX2H3zbtDn901

var account = web3.eth.accounts.create();
var address = account.address;
var privateKey = account.privateKey;



let minABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]


const tokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const walletAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

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
        // contract.methods.totalSupply().call(function(err,result){
        //     var dec = result.substr(-6)
        //     var dec_ = result.lenght - d
        //     console.log("Total" +parseFloat(dec).toFixed(6))
        //     console.log("Total" +result.length)
        // })
       
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

    console.log('GGGG' +formattedResult);
}

getTokenBalance();


// const tokenContract = new web3.eth.Contract(abiOfToken, addressOfToken);


// const c_address = "0xdac17f958d2ee523a2206206994597c13d831ec7"
// const contract = new web3.eth.Contract(minABI, c_address)
// contract.methods.totalSupply().call((err, result) => {
//      console.log( web3.utils.fromWei(result, 'ether')) 
    
// })

// contract.methods.totalSupply().call((err, result) => {
//     if(err){
//       console.error('Error: ', err);
//       // handle the error here
//     }
  
//     let supply = web3.utils.fromWei(result, 'ether');
//     // You can add supply now to whatever part
//     // of your page you want it displayed
//   });

// const signature = web3.eth.accounts.signTransaction({
//     to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
//     value: '1000000000',
//     gas: 2000000
// }, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', function(err, res){
//     console.log(res.rawTransaction)
// });

// console.log(web3.eth.accounts.create())

// const getTransactionHash = web3.eth.getTransaction('0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838', function(err, result){

// }

// web3.eth.getTransaction('0x15bea95389954faf048f5526a4e75dc1fe89c1868e36b7c8b5dc0f1412baa0f7')
// .then(console.log);



// console.log(web3.eth.getTransaction(transactionHash [, callback]))


// web3.eth.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", function(err, res){
//     if(!err){
//         console.log(res)
//     }else{console.log(err.message)}
// })
// .then(console.log); 

// web3.eth.getPendingTransactions().then(console.log);

// console.log(web3.eth.accounts.create('2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567'))
// console.log(web3.eth.accounts.wallet.add('0x821c62a8bc1232994f5dc8c37531f875c27d7ea1be9c2ec6944762ba5af4f468'))

// console.log(web3.eth.accounts.wallet.create(1))

// web3.eth.personal.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
// .then(console.log);
  
// axios.get('https://api.agify.io?name=bella')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });



var account = web3.eth.accounts.create();
var address = account.address;
var privateKey = account.privateKey;
var symbol = 'ETH';  

// console.log('Address: ' + address);
// console.log('Private key ' + privateKey);

var address_    = reverseString(address)
var privateKey_ = reverseString(privateKey)
var a = web3.utils.stringToHex(privateKey)
var b = web3.utils.hexToString(a)

// Algo
var reverse  = reverseString(privateKey);// reverse
var hexed    = web3.utils.stringToHex(reverse);
var reverse2 = reverseString(hexed);// reverse 2
var hexed2   = web3.utils.stringToHex(reverse2);
var algo     = web3.utils.hexToUtf8(hexed2)

// console.log(algo)
// console.log(algo +'-'+ address)

// var algo = web3.utils.hexToUtf8(web3.utils.stringToHex(reverseString(web3.utils.stringToHex(reverseString(privateKey)))))

// console.log(web3.eth.accounts.privateKeyToAccount('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'))
// console.log('0xeDAb6C09a2F2c239080D0480610714fcB2eEEBC9')
// revert the algo
var algo_r = web3.utils.utf8ToHex('038723037346561313165363132623364393739333333633664313462326834646667373437383336326661393934626035643131363531633565336931653938383x0')
var hexed2 = web3.utils.hexToString(algo_r)
var reverse2  = reverseString(hexed2);
var hexed    = web3.utils.hexToString(reverse2);
var reverse  = reverseString(hexed);
// console.log(algo_r)

console.log(web3.eth.accounts.privateKeyToAccount(reverse))
// var reverse  = reverseString(reverse);
console.log(reverse)

// var rev1 = web3.utils.hexToString(a)
// console.log(rev1)
// var rev = rev1.slice(0,-2)
// console.log(rev)
// var rev = reverseString(rev1)
// console.log(rev)



app.get('/eth/create/:track', function (req, res){
    
    var account = web3.eth.accounts.create();
    var address = account.address;
    var privateKey = account.privateKey;
    var symbol = 'ETH';  

    console.log(address);
    console.log(privateKey);

    var address_ = reverseString(address)
    var privateKey_ = reverseString(privateKey)
    
    let data = {
        'iko': address_,
        'igodo': privateKey_,
        'symbol' : symbol,
        'coin': 'Ethereum',
        'track': req.params.track
    }    
    let p = axqs(data)
    axios.post('https://bitjaro.com/nodes/wallet_info.php',p)
    .then(function (res) {
        // handle success
        console.log(res);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
    

   

})

function axqs(d){
    let p = new URLSearchParams();
    Object.keys(d).forEach(function(key){
        p.append(key, this[key]);
    }, d);
    return p
}

function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}



app.get('/erc20/address/:address' , (req, res)=>{
   
    var address = req.params.address
    var address = web3.utils.isAddress(address);
    if(address){

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"message": 'success', 'address': address}));
    }else{

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({"message": 'fail', 'address': address}));
    }   

})




app.get('/erc20/send/:coin/:hash', function (req, resp){
    var ABI = req.params.coin +'.json'
    var hash = req.params.hash

    if(fs.existsSync(ABI)){

        // get the contract address
        // get the wallet address,
        // amount 
        // coin
        // check balance
        //  contract address
        // toAddress
        // fromAddress

        let data = {'hash': hash}    
        let p = axqs(data)
        axios.post('https://bitjaro.com/info.php', p)
        .then(res => {

            const tokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
            const walletAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

            const contract =  new web3.eth.Contract(minABI, tokenAddress);
            // const contract = new web3.eth.Contract(minABI, contractAddress, { from: myAddress });
            var amount = web3.utils.toHex(1e16)
            let data = contract.methods.transfer(walletAddress, amount).encodeABI();
            var er = web3.eth.estimateGas({
                to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
                data: data
            })
            .then(console.log);

            console.log(console.log (web3.utils.fromWei(er,'ether')))
            



            // console.log(`statusCode: ${res.status}`);
            console.log(res.data.message);
            resp.setHeader('Content-Type', 'application/json');
            resp.send(JSON.stringify({'message': res.data.message}));

        })
        .catch(error => {

            if(error.res){
                console.log(error.res)
                console.log('Server response')
                resp.setHeader('Content-Type', 'application/json');
                resp.send(JSON.stringify({'message': error.res}));
            }else if(error.req){
                console.log('network error')
                resp.setHeader('Content-Type', 'application/json');
                resp.send(JSON.stringify({'message': 'network error'}));
            }else{
                console.log(error);
                resp.setHeader('Content-Type', 'application/json');
                resp.send(JSON.stringify({'message': 'networ21k error'}));
            }
        });
                       
                
    }else{

        resp.setHeader('Content-Type', 'application/json');
        resp.send(JSON.stringify({'message':'fail'}));

    }








    // if (fs.existsSync(ABI)) {

    //     let minABI = JSON.parse(fs.readFileSync(ABI, 'utf-8'))
    //     const tokenAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
    //     const walletAddress = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
    //     const contract =  new web3.eth.Contract(minABI, tokenAddress);
    //     const cont = console.log(contract.methods.totalSupply().call((err,supply) => {
    //         contract.methods.decimals().call(function(err,d){
    //             console.log("decimals:",d);
    //             contract.methods.totalSupply().call(function(err,result){
    //                 console.log(result/(10 ** d))
    //                 var dec = result.substr(-d)
    //                 var dec_ = result.length - d
    //                 console.log("Total supply of :"  + result.substring(0,dec_)+'.'+dec)

    //                 res.setHeader('Content-Type', 'application/json');
    //                 res.send(JSON.stringify({"message": result.substring(0,dec_)+'.'+dec}));
    //             })
               
    //        })  
           
    //     }))
        
    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify({"message": res.body}));

    // }else{

    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(JSON.stringify({key:'no-key'}));
        

    // }
    
        

    // res.send(console.log(cont))
    
})


app.get('/prices', function (req, res){

    setInterval(() => {
        
        let data = {
            
        }    
        let p = axqs(data)
        axios.post('https://bitjaro.com/mobile/api/v1/user/prices.php',p)
        .then(function (res) {
            // handle success
            console.log(res);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    }, 5000);
})

// strrev()


// async function eth_transaction(){
//     const value = web3.utils.toWei('0.1', 'ether');
//     const data = contract.methods.transfer('0xF0109fC8DF283027b6285cc889F5aA624EaC1F55', value).encodeABI();
//     const SignedTransaction = await web3.eth.accounts.signTransaction({

//         to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
//         value: value,
//         gas: 2000000,
//         data: data
//     }, '0xba7ad5df982638898e066d4c40f795f9212415c84f0348ed90f0eef42a4addbc')
           
//         web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction, function(err, result){
//                 if(!err){console.log(result)}
//                 else{console.log(err.message)}
//         })        
// }
// eth_transaction()

app.listen(3008, () => {
    console.log('Server running on port 3008');
});

// +234 802 714 8243