window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/5b5495ebc3bb41f98d7bf9abda4fca6c"));
    }
})

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

const assessorAuthentication = document.querySelector("#assessorAuthentication");
const testCode = document.querySelector("#testCode");
const testCodeInstance = document.querySelector("#testCodeInstance");
const Check = document.querySelector("#address");
const Message = document.querySelector("#currentMessage");
const showTest = document.querySelector("#showTest");
const codeChoice = document.querySelector("#codeChoice");
const assessorAddress = document.querySelector("#assessorAddress");
const assessorResponse = document.querySelector("#assessorResponse");
const stuAccess = document.querySelector("#stuAccess");

async function getERC20Balance() {
    stuAccess.style.display = "none";
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    address = document.getElementById("address").value
    contractAddress = "0xb58e0bf63fbe4e5565ab719d3369058707ab6a02";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals);
        adjustedName = await name;
        if(adjustedBalance == 0){
            document.getElementById("output2").innerHTML = "MAT 1.2 - Not yet assessed.";
        }
        else if(adjustedBalance > 100){
            document.getElementById("output2").innerHTML = "MAT 1.2 - Addition: Void";
        } else{
            document.getElementById("output2").innerHTML = "MAT 1.2 - Addition: " + adjustedBalance + "%";
        }
        
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
    getEngBalance();
}

async function getEngBalance() {
    stuAccess.style.display = "none";
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    address = document.getElementById("address").value
    contractAddress = "0x7a358856ef91f5cf4bb250254e3a60b0af4038a0";
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals);
        adjustedName = await name;
        var grade = "Pending";
        if(adjustedBalance == "0"){
            grade = "Not yet assessed";
        }
        else if(adjustedBalance == "1"){
            grade = "Achieved";
        }
        else if(adjustedBalance == "2"){
            grade = "Merit";
        }
        else if(adjustedBalance == "3"){
            grade = "Excellence";
        }
        else if(adjustedBalance > 4){
            grade = "Void";
        }
        document.getElementById("output3").innerHTML = "ENG 1.2 - Essay: " + grade;
    } catch (error) {
        document.getElementById("output3").innerHTML = error;
    }
}


