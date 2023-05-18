function draftFrontBottom({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  sa,
  complete,
  Snippet,
  snippets,
  part,
}) {
  let oviWidth = (measurements.wrist * options.widthRatio) / 2
  let oviPalm = measurements.wrist * options.lengthRatio
  let oviArm = (oviPalm / 2) * options.wristCoverRatio
  let oviDepth = (oviPalm - oviWidth / 2) / 2
  let oviFinger = (oviPalm - oviWidth / 2) / 2
  let oviLength = oviPalm - oviWidth / 2 - oviDepth + oviArm

  //add exterior finger to the frontBottom part
  points.ptTopRight = new Point(oviWidth / 2, 0)
  points.ptFingerTip = new Point(0, 0 - oviFinger)
  points.ptTopLeft = points.ptTopRight.flipX()

  points.ptFingerRightCp1 = points.ptTopRight.shift(
    180,
    points.ptFingerTip.dy(points.ptTopRight) / 1.5
  )
  points.ptFingerRightCp2 = points.ptFingerTip.shift(
    0,
    points.ptFingerTip.dx(points.ptTopRight) / 1.5
  )
  points.ptFingerLeftCp1 = points.ptFingerRightCp1.flipX()
  points.ptFingerLeftCp2 = points.ptFingerRightCp2.flipX()

  //add the bottom of the oven mitt
  points.ptBottomRight = new Point(oviWidth / 2, oviLength)
  points.ptBottomLeft = points.ptBottomRight.flipX()

  paths.frontBottomBody = new Path()
    .move(points.ptTopRight)
    .curve(points.ptFingerRightCp1, points.ptFingerRightCp2, points.ptFingerTip)
    .curve(points.ptFingerLeftCp2, points.ptFingerLeftCp1, points.ptTopLeft)
    .line(points.ptBottomLeft)
    .line(points.ptBottomRight)
    .line(points.ptTopRight)
    .close()
    .addClass('fabric')

  if (sa) {
    paths.sa = paths.frontBottomBody.offset(sa).attr('class', 'fabric sa')
  }

  return part
}

export const frontBottom = {
  name: 'ovi.frontBottom',
  draft: draftFrontBottom,
  measurements: ['wrist'],
  options: {
    widthRatio: { pct: 120, min: 100, max: 150, menu: 'fit' },
    lengthRatio: { pct: 100, min: 80, max: 130, menu: 'fit' },
    wristCoverRatio: { pct: 50, min: 0, max: 100, menu: 'fit' },
  },
}
