function draftFrontTop({
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
  let oviFrontTop = measurements.wrist * options.lengthRatio
  let oviDepth = (oviFrontTop - oviWidth / 2) / 2
  let oviFinger = (oviFrontTop - oviWidth / 2) / 2

  // Build the rounded tip of the oven mitt from right to left
  points.ptTopRight = new Point(oviWidth / 2, 0)
  points.ptTopMiddle = new Point(0, 0 - oviWidth / 2)
  points.ptTopLeft = points.ptTopRight.flipX()

  points.ptTopRightCp1 = points.ptTopRight.shift(90, points.ptTopMiddle.dy(points.ptTopRight) / 2)
  points.ptTopRightCp2 = points.ptTopMiddle.shift(0, points.ptTopMiddle.dx(points.ptTopRight) / 2)
  points.ptTopLeftCp1 = points.ptTopRightCp1.flipX()
  points.ptTopLeftCp2 = points.ptTopRightCp2.flipX()

  //add interior finger to the frontTop part
  points.ptBottomRight = new Point(oviWidth / 2, oviDepth)
  points.ptFingerTip = new Point(0, oviDepth + oviFinger)
  points.ptBottomLeft = points.ptBottomRight.flipX()

  points.ptFingerRightCp1 = points.ptBottomRight.shift(
    0,
    points.ptFingerTip.dy(points.ptBottomRight) / 1.5
  )
  points.ptFingerRightCp2 = points.ptFingerTip.shift(
    0,
    points.ptFingerTip.dx(points.ptBottomRight) / 1.5
  )
  points.ptFingerLeftCp1 = points.ptFingerRightCp1.flipX()
  points.ptFingerLeftCp2 = points.ptFingerRightCp2.flipX()

  paths.frontTopBody = new Path()
    .move(points.ptTopRight)
    .curve(points.ptTopRightCp1, points.ptTopRightCp2, points.ptTopMiddle)
    .curve(points.ptTopLeftCp2, points.ptTopLeftCp1, points.ptTopLeft)
    .line(points.ptBottomLeft)
    .curve(points.ptFingerLeftCp1, points.ptFingerLeftCp2, points.ptFingerTip)
    .curve(points.ptFingerRightCp2, points.ptFingerRightCp1, points.ptBottomRight)
    .line(points.ptTopRight)
    .close()
    .addClass('fabric')

  if (sa) {
    paths.sa = paths.frontTopBody.offset(sa).attr('class', 'fabric sa')
  }

  return part
}

export const frontTop = {
  name: 'ovi.frontTop',
  draft: draftFrontTop,
  measurements: ['wrist'],
  options: {
    widthRatio: { pct: 120, min: 100, max: 150, menu: 'fit' },
    lengthRatio: { pct: 100, min: 80, max: 130, menu: 'fit' },
    wristCoverRatio: { pct: 50, min: 0, max: 100, menu: 'fit' },
  },
}
