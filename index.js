const Neo = require('@cityofzion/neon-js')
const rpc = Neo.rpc
const Neon = Neo.default

// const privateKey = Neo.default.create.privateKey()
// const wif = Neo.default.get.WIFFromPrivateKey(privateKey)
// const acc = Neo.default.create.account(privateKey)
// console.log(privateKey)
// console.log(wif)
// console.log(acc)

let publicKey = '0361e09663f44ae15dff4f59064575af7a9095fed9205480d2cf6cc225bae66213'
let contractAddr = '0x3510a9094c23494c84ff5753a1e38800427135e9'
let addr = 'ARzQtbm8zms994dCXJvwGAzdz5smrBk7J7'
let nodeURL = 'http://127.0.0.1:30333'

//========================= CREATE rpcClient to INTERACT WITH NEO PRIVATE NET =========================
const client = Neon.create.rpcClient(nodeURL, '2.3.2')
client.getBlockCount().then(res => {
    console.log("Lastest block:", res)
}).catch(error => {
    console.log("Error". error.message)
})

//====================== INVOKE SMART CONTRACT IN NEO PRIVATE NET ======================================
// Single Call
const props = {
    scriptHash: '3510a9094c23494c84ff5753a1e38800427135e9', // Scripthash for the contract
    operation: 'name', // name of operation to perform.
    args: [Neo.u.reverseHex('')] // any optional arguments to pass in. If null, use empty array.
  }

const SingleScript = Neon.create.script(props)

// rpc.Query.invokeScript(SingleScript)
//   .execute(nodeURL)
//   .then(res => {
//     console.log("Token name:", Neo.u.hexstring2str(res.result.stack[0].value)) 
// })


// Multiple Call
const scriptHash = '3510a9094c23494c84ff5753a1e38800427135e9' // Scripthash for the contract

const getName = { scriptHash, operation: 'name', args: [] }
const getDecimals = { scriptHash, operation: 'decimals', args: [] }
const getSymbol = { scriptHash, operation: 'symbol', args: [] }
const getTotalSupply = { scriptHash, operation: 'totalSupply', args: [] }

const MultipleScript = Neon.create.script(getName) + Neon.create.script(getDecimals) + Neon.create.script(getSymbol) + Neon.create.script(getTotalSupply)

console.log(MultipleScript)

rpc.Query.invokeScript(MultipleScript)
  .execute(nodeURL)
  .then(res => {
    console.log("Token name:", Neo.u.hexstring2str(res.result.stack[0].value))
    console.log("Token decimals:", res.result.stack[1].value)
    console.log("Token symbol:", Neo.u.hexstring2str(res.result.stack[2].value))
    console.log("Token totalSupply:", res.result.stack[3].value)
})
