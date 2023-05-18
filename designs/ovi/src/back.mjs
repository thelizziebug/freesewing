function draftBack({
  store,
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  macro,
  sa,
  complete,
  Snippet,
  snippets,
  part,
}) {
  let oviWidth = (measurements.wrist * options.widthRatio) / 2
  let oviPalm = measurements.wrist * options.lengthRatio
  let oviArm = (oviPalm / 2) * options.wristCoverRatio
  let oviLength = oviPalm + oviArm
  let oviBody = oviLength - oviWidth / 2

  //add the measurements into store
  store.set('width', oviWidth)
  store.set('length', oviLength)

  // Build the rounded tip of the oven mitt from right to left
  points.ptTopRight = new Point(oviWidth / 2, 0)
  points.ptTopMiddle = new Point(0, 0 - oviWidth / 2)
  points.ptTopLeft = points.ptTopRight.flipX()

  points.ptTopRightCp1 = points.ptTopRight.shift(90, points.ptTopMiddle.dy(points.ptTopRight) / 2)
  points.ptTopRightCp2 = points.ptTopMiddle.shift(0, points.ptTopMiddle.dx(points.ptTopRight) / 2)
  points.ptTopLeftCp1 = points.ptTopRightCp1.flipX()
  points.ptTopLeftCp2 = points.ptTopRightCp2.flipX()

  //Build the body of the oven mitt
  points.ptBottomRight = new Point(oviWidth / 2, oviBody)
  points.ptBottomLeft = points.ptBottomRight.flipX()

  paths.backBody = new Path()
    .move(points.ptTopRight)
    .curve(points.ptTopRightCp1, points.ptTopRightCp2, points.ptTopMiddle)
    .curve(points.ptTopLeftCp2, points.ptTopLeftCp1, points.ptTopLeft)
    .line(points.ptBottomLeft)
    .line(points.ptBottomRight)
    .line(points.ptTopRight)
    .close()
    .addClass('fabric')

  if (sa) {
    paths.sa = paths.backBody.offset(sa).attr('class', 'fabric sa')
  }

  //add complete action
  if (complete) {
    // Add a logo
    points.logo = new Point(0, 0)
    snippets.logo = new Snippet('logo', points.logo)

    // Add a title
    points.title = points.logo.shift(-90, 45)

    macro('title', {
      at: points.title,
      nr: 1,
      title: 'Ovi - Back piece',
      scale: 0.7,
    })
  }

  return part
}

export const back = {
  name: 'ovi.back',
  draft: draftBack,
  measurements: ['wrist'],
  options: {
    widthRatio: { pct: 120, min: 100, max: 150, menu: 'fit' },
    lengthRatio: { pct: 100, min: 80, max: 130, menu: 'fit' },
    wristCoverRatio: { pct: 50, min: 0, max: 100, menu: 'fit' },
  },
}
