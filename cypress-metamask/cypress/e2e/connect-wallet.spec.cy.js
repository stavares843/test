import { faker } from "@faker-js/faker"
 
const randomEmail = faker.internet.email()
const randomPassword = faker.internet.password(10)
const bip39 = require('bip39')


describe("metamask wallet", () => {
  let mnemonic
  let seed

  beforeEach(() => {
    mnemonic = bip39.generateMnemonic()
    seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
  })

  it("user should not be able to connect an already used", () => {
    cy.disconnectMetamaskWalletFromAllDapps()
    cy.setupMetamask(bip39.generateMnemonic(), 'mainnet')
    
    cy.visit("/sign-up")
    cy.disconnectMetamaskWalletFromAllDapps()
    cy.setupMetamask(bip39.generateMnemonic(), 'mainnet')

    cy.disconnectMetamaskWalletFromAllDapps()
    cy.setupMetamask(bip39.generateMnemonic(), 'mainnet')

    cy.disconnectMetamaskWalletFromAllDapps()
    cy.setupMetamask(bip39.generateMnemonic(), 'mainnet')
    
    // duplicated for testing purposes
    // the disconnectMetamaskWalletFromAllDapps runs, the setupMetamask is ignored

    cy.createMetamaskAccount(bip39.generateMnemonic()) // doesn't work, seed is always from a specific tree

    cy.visit("/sign-up")
    cy.contains("Sign up").click()
    cy.get("#Email-input").type(randomEmail)
    cy.get("#Password-input").type(randomPassword)
    cy.contains(/^Sign Up$/).should("be.visible").click()
    // code removed
    cy.contains("MetaMask").click()
    cy.acceptMetamaskAccess()
  })    
})