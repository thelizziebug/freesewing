import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'
import * as utils from './utils.mjs'

export function Stack(name = null) {
  // Non-enumerable properties
  utils.__addNonEnumProp(this, 'freeId', 0)
  utils.__addNonEnumProp(this, 'layout', { move: { x: 0, y: 0 } })

  // Enumerable properties
  this.attributes = new Attributes()
  this.parts = new Set()
  this.name = name
  this.topLeft = false
  this.bottomRight = false
  this.width = false
  this.height = false

  return this
}

/* Adds a part to the stack */
Stack.prototype.addPart = function (part) {
  if (part) this.parts.add(part)

  return this
}

/* Returns a stack object suitbale for renderprops */
Stack.prototype.asProps = function () {
  return {
    ...this,
    parts: [...this.parts],
  }
}

/* Returns a list of parts in this stack */
Stack.prototype.getPartList = function () {
  return [...this.parts]
}

/* Returns a list of names of parts in this stack */
Stack.prototype.getPartNames = function () {
  return [...this.parts].map((p) => p.name)
}

/** Calculates the stack's bounding box and sets it */
Stack.prototype.home = function () {
  if (this.topLeft) return this // Cached
  this.topLeft = new Point(Infinity, Infinity)
  this.bottomRight = new Point(-Infinity, -Infinity)
  for (const part of this.getPartList()) {
    part.__boundary()

    const { tl, br } = utils.getTransformedBounds(part, part.attributes.getAsArray('transform'))

    if (!tl) {
      continue
    }

    // get the top left, the minimum x and y values of any corner
    this.topLeft.x = Math.min(this.topLeft.x, tl.x)
    this.topLeft.y = Math.min(this.topLeft.y, tl.y)
    // get the bottom right, the maximum x and y values of any corner
    this.bottomRight.x = Math.max(this.bottomRight.x, br.x)
    this.bottomRight.y = Math.max(this.bottomRight.y, br.y)
  }

  // Fix infinity if it's not overwritten
  if (this.topLeft.x === Infinity) this.topLeft.x = 0
  if (this.topLeft.y === Infinity) this.topLeft.y = 0
  if (this.bottomRight.x === -Infinity) this.bottomRight.x = 0
  if (this.bottomRight.y === -Infinity) this.bottomRight.y = 0

  // Add margin
  let margin = 0
  for (const set in this.context.settings) {
    if (this.context.settings[set].margin > margin) margin = this.context.settings[set].margin
    if (this.context.settings[set].paperless && margin < 10) margin = 10
  }
  this.topLeft.x -= margin
  this.topLeft.y -= margin
  this.bottomRight.x += margin
  this.bottomRight.y += margin

  // Set dimensions
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y
  this.width = this.bottomRight.x - this.topLeft.x
  this.height = this.bottomRight.y - this.topLeft.y

  // Add transform
  //this.anchor = this.getAnchor()
  // FIXME: Can we be certain this is always (0,0) /
  this.anchor = new Point(0, 0)

  if (this.topLeft.x === this.anchor.x && this.topLeft.y === this.anchor.y) return this
  else {
    this.attr(
      'transform',
      `translate(${this.anchor.x - this.topLeft.x}, ${this.anchor.y - this.topLeft.y})`
    )
    this.layout.move.x = this.anchor.x - this.topLeft.x
    this.layout.move.y = this.anchor.y - this.topLeft.y
  }

  return this
}

/** Finds the anchor to align parts in this stack */
Stack.prototype.getAnchor = function () {
  let anchorPoint = true
  let gridAnchorPoint = true
  const parts = this.getPartList()
  for (const part of parts) {
    if (typeof part.points.anchor === 'undefined') anchorPoint = false
    if (typeof part.points.gridAnchor === 'undefined') gridAnchorPoint = false
  }

  if (anchorPoint) return parts[0].points.anchor
  if (gridAnchorPoint) return parts[0].points.gridAnchor

  return new Point(0, 0)
}

/** Adds an attribute. This is here to make this call chainable in assignment */
Stack.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/**
 * Generates the transforms for a stack and sets them as attributes
 * @param  {Object} transforms a transform config object
 * @param  {Object} transforms.move x and y coordinates for how far to translate the stack
 * @param  {Number} transfroms.rotate the number of degrees to rotate the stack around its center
 * @param  {Boolean}  tranforms.flipX whether to flip the stack along the X axis
 * @param  {Boolean}  transforms.flipY whether to flip the stack along the Y axis
 */
Stack.prototype.generateTransform = function (transforms) {
  const { move, rotate, flipX, flipY } = transforms
  const generated = utils.generateStackTransform(move?.x, move?.y, rotate, flipX, flipY, this)

  this.attributes.remove('transform')
  generated.forEach((t) => this.attr('transform', t))

  return this
}

export default Stack
