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
showTest.style.display = "none";
assessorAuthentication.style.display = "none";
testCode.style.display = "none";

function studentAccess() {
  if(Check.value == "0xEfB332f4c211a590e57413a9341e9CEcd71A2ff5") {
      Message.innerHTML = "Yes! <br> The Learning Provider's database shows you are enrolled for this test.<br> Please enter the one-time assessment code that has been generated for you. <br>";
      stuAccess.style.display = "none";
      testCode.style.display = "block";
      testCodeFunc();
    }
  else {
    Message.innerHTML = "You are not authorised for this assessment at this time.";
  }
}

function testCodeFunc() {
    showTest.style.display = "none";
    testCode.style.display = "block";

    if(testCodeInstance.value == "1234") {
        assessorAccess();
    }
    else if(testCodeInstance.value == "") {
        codeChoice.innerHTML = "";
    }
    else {
        codeChoice.innerHTML = "Incorrect code";
    }
}

function assessorAccess() {
    assessorAuthentication.style.display = "block";
    Message.style.display = "none";
    testCode.style.display = "none";
    Check.style.display = "none";
    stuAccess.style.display = "none";
}

function checkAssessor() {
    if(assessorAddress.value == "0x0D1Ba01D6F5eA78b6e936a760d024E36b7884cD8") {
            startTest();
        }
    else if(testCodeInstance.value == "") {
            assessorResponse.innerHTML = "";
        }
        else {
            assessorResponse.innerHTML = "Incorrect code";
        }
    }

function startTest() {
    assessorAuthentication.style.display = "none";
    showTest.style.display = "block";
}

async function getERC20Balance() {
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
        document.getElementById("output2").innerHTML = adjustedBalance + "%";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}


