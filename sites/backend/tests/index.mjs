import { userTests } from './user.mjs'
import { accountTests } from './account.mjs'
import { apikeyTests } from './apikey.mjs'
import { personTests } from './person.mjs'
import { patternTests } from './pattern.mjs'
import { setup } from './shared.mjs'

const runTests = async (...params) => {
  await userTests(...params)
  await apikeyTests(...params)
  await accountTests(...params)
  await personTests(...params)
  await patternTests(...params)
}

// Load initial data required for tests
const { chai, config, expect, store } = await setup()

// Note run the tests using this data
runTests(chai, config, expect, store)
