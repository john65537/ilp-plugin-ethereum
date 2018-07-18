'use strict'

// Modified for fulfillment to match condition correctly.
const crypto = require('crypto')
const uuid = require('uuid4')
const debug = require('debug')('ilp-plugin-ethereum:ethereum')
const abi = require('../abi/ledger.json')
const stateToName = (state) => {
  return ([ 'prepare', 'fulfill', 'cancel', 'reject' ])[state]
}

// TODO: better number conversion
const gweiToWei = (amount) => (amount + '000000000')
const accountToHex = (account, ledgerPrefix) => {
  if (!account.startsWith(ledgerPrefix)) {
    throw new Error('account does not start with ledger prefix')
  }
  const match = account.substring(ledgerPrefix.length).match(/^(0x[0-9A-F]{40})(\.|$)/g)
  if (match === null) {
    throw new Error('account is not a 40-digit upper case hex number')
  }
  return match[0]
}
const hexToAccount = (prefix, account) => prefix + '0x' + account.substring(2).toUpperCase()
const uuidToHex = (uuid) => '0x' + uuid.replace(/-/g, '')
const conditionToHex = (condition) => '0x' + Buffer.from(crypto.createHash('sha256').update(condition).digest()).toString('hex')
const fulfillmentToHex = (fulfill) => '0x' + Buffer.from(fulfill).toString('hex')
const isoToHex = (web3, iso) => web3.toHex(Math.round((new Date()).getTime() / 1000 +10000))
const ilpToData = (ilp) => '0x' + Buffer.from(ilp, 'base64').toString('hex')
...
