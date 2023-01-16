const axios = require('axios')
const abiDecoder = require('abi-decoder')

const DATA = '0x414bf389000000000000000000000000b4fbf271143f4fbf7b91a5ded31805e42b2208d60000000000000000000000003cb3d2655db27d0ef62f0b77e0e13c06630317ef0000000000000000000000000000000000000000000000000000000000000bb800000000000000000000000016d4d83ddcaaa62b4aa0cc62c6a9a2bd518e8b8a0000000000000000000000000000000000000000000000000000000063c4ff7c00000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
const CONTRACT_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
//const CONTRACT_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

const API_KEY = 'KVUMUUP32IYHFV5I15ZPHC221K4BIUUY5B'
const URL = "https://api.etherscan.io/api?module=contract&action=getabi&address="+CONTRACT_ADDRESS+"&apikey="+API_KEY
//const URL = "https://api.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${API_KEY}"

const getAbi = async () => {
    console.log('Executing getAbi()')
    console.log('========================================================================================')
    console.log('URL', URL)
    console.log('========================================================================================')
    const  RES = await axios.get(URL)
    // console.log('RES', RES)
    // console.log('========================================================================================')
    // console.log("RES.data.result", RES.data.result)
    // console.log('========================================================================================')
    return JSON.parse(RES.data.result)
}

const main = async () => {
//    console.log('DATA', DATA)
    const ABI = await getAbi()
//    console.log('ABI', ABI)

    console.log('Executing addAbi()')
    abiDecoder.addABI(ABI)
    const decodedData = abiDecoder.decodeMethod(DATA)
    console.log('decodedData:', JSON.stringify(decodedData, null, 1))

    console.log('======================================')
    const INNER_DATA = decodedData.params[0].value
    console.log('INNER_DATA:', INNER_DATA)

    const innerDecodedData = abiDecoder.decodeMethod(INNER_DATA)
    console.log('innerDecodedData:', JSON.stringify(innerDecodedData, null, 1))
}

main()