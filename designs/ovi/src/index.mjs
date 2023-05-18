//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { back } from './back.mjs'
import { frontTop } from './frontTop.mjs'
import { frontBottom } from './frontBottom.mjs'

// Create new design
const Ovi = new Design({
  data,
  parts: [back, frontTop, frontBottom],
})

// Named exports
export { back, frontTop, frontBottom, Ovi }
