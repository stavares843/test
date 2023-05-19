import { faker } from "@faker-js/faker"
 
const randomEmail = faker.internet.email()
const randomPassword = faker.internet.password(10)
const bip39 = require('bip39')

describe('setup', () => {
    before(() => {
        cy.clearCookies()
    })

    it('sets up metamask', () => {
        cy.setupMetamask(bip39.generateMnemonic(), 'mainnet')
        cy.disconnectMetamaskWalletFromAllDapps()
    })

  it("user should not be able to connect an already used", () => {
    cy.visit("/sign-up")
    cy.addMetamaskNetwork({
      networkName: 'Polygon Network',
      rpcUrl: 'https://polygon-rpc.com',
      chainId: '137',
      symbol: 'MATIC',
      blockExplorer: 'https://polygonscan.com',
      isTestnet: false,
    }).then(networkAdded => {
      expect(networkAdded).to.be.true
    })

    console.log(seed)
    cy.createMetamaskAccount()

    cy.setupMetamask(
      seed, // Pass the seed instead of the mnemonic
      'sepolia',
      'Tester@1234',
    ).then(setupFinished => {
      expect(setupFinished).to.be.true
    })
   
    cy.visit("/sign-up")
    cy.contains("Sign up").click()
    cy.get("#Email-input").type(randomEmail)
    cy.get("#Password-input").type(randomPassword)
    cy.contains(/^Sign Up$/).should("be.visible").click()
    // code removed
    cy.contains("Continue").click()
    cy.contains("MetaMask").click()
    cy.acceptMetamaskAccess()
  })    
})