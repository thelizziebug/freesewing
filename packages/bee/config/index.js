import { version } from '../package.json'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'bee',
  version,
  design: 'PrudenceRabbit',
  code: ['bobgeorgethe3rd'],
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: [
      'topDepth',
      'bottomCupDepth',
      'sideDepth',
      'sideCurve',
      'frontCurve',
    ],
    style: [
      'ties',
      'neckTieWidth',
      'neckTieLength',
      'neckTieEnds',
      'neckTieColours',
      'bandTieWidth',
      'bandTieLength',
      'bandTieEnds',
      'bandTieColours',
      'crossBackTies',
      'bandLength',
    ],
    advanced: [
      { bella: [ 'chestEase', 'waistEase', 'bustSpanEase', 'bellaGuide' ] },
    ],
  },
  measurements: [
    'highBust',
    'chest',
    'underbust',
    'waist',
    'waistBack',
    'bustSpan',
    'neck',
    'hpsToBust',
    'hpsToWaistFront',
    'hpsToWaistBack',
    'shoulderToShoulder',
    'shoulderSlope',
    'bustPointToUnderbust',
    // FIXME: Measurement from waist up to armhole (for sleeveless)
  ],
  dependencies: {
    frontSideDart: 'back',
    bandTie: 'cup',
    cup: 'neckTie',
  },
  inject: { cup: 'frontSideDart' },
  hide: ['frontSideDart', 'back'],
  parts: [
    'back',
    'frontSideDart',
    'cup',
    'neckTie',
    'bandTie',
  ],
  options: {
    // Constants
    acrossBackFactor: 0.925,
    shoulderSlopeBack: 1.23,
    neckWidthBack: 0.197,
    neckWidthFront: 0.17,
    shoulderToShoulderCorrection: 0.995,
    backDartLocation: 0.145,
    backCenterWaistReduction: 0.35,
    collarFactor: 0.19,

    // Percentages
    backNeckCutout: { pct: 6, min: 3, max: 9 },
    waistEase: { pct: 5, min: 1, max: 20 },
    chestEase: { pct: 11, min: 5, max: 20 },
    bustSpanEase: { pct: 10, min: 0, max: 20 },
    backDartHeight: { pct: 46, min: 38, max: 54 },
    armholeDepth: { pct: 44, min: 38, max: 46 },
    backHemSlope: { deg: 2.5, min: 0, max: 5 },
    backArmholeSlant: { deg: 5, min: 1, max: 9 },
    backArmholeCurvature: { pct: 63, min: 50, max: 85 },
    frontArmholeCurvature: { pct: 63, min: 50, max: 85 },
    fullChestEaseReduction: { pct: 4, min: 0, max: 8 },
    frontShoulderWidth: { pct: 95, max: 98, min: 92 },
    frontArmholePitchDepth: { pct: 29, max: 31, min: 27 },
    backArmholePitchDepth: { pct: 35, max: 40, min: 30 },
    highBustWidth: { pct: 86, max: 92, min: 80 },
    bustDartLength: { pct: 90, min: 75, max: 100 },
    waistDartLength: { pct: 90, min: 75, max: 95 },
    bustDartCurve: { pct: 100, min: 0, max: 100 },
    // Bikini Top
    topDepth: { pct: 54, min: 50, max: 80 },
    //neckTieWidth: { mm: 13, min: 6, max: 30},
    neckTieWidth: {
      pct: 6,
      min: 2,
      max: 18,
      snap: {
        metric: [5, 7.5, 10, 12.5, 15, 20, 25, 30, 35, 40, 45, 50],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1],
      },
      ...pctBasedOn('bustSpan'),
    },
    neckTieLength: { pct: 80, min: 70, max: 100 },
    neckTieEnds: { dflt: 'straight', list: ['straight', 'pointed'] },
    neckTieColours: { dflt: 'one', list: ['one', 'two'] },
    //bandTieWidth: { mm: 13, min: 6, max: 30 },
    bandTieWidth: {
      pct: 3,
      min: 1,
      max: 9,
      snap: {
        metric: [5, 7.5, 10, 12.5, 15, 20, 25, 30, 35, 40, 45, 50],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1],
      },
      ...pctBasedOn('hpsToWaistFront'),
    },
    bandTieLength: { pct: 35, min: 30, max: 50 },
    bandTieEnds: { dflt: 'straight', list: ['straight', 'pointed'] },
    bandTieColours: { dflt: 'one', list: ['one', 'two'] },
    bottomCupDepth: { pct: 8, min: 0, max: 20 },
    sideDepth: { pct: 20.6, min: 0, max: 30 },
    sideCurve: { pct: 0, min: -50, max: 50 },
    frontCurve: { pct: 0, min: -50, max: 50 },
    bellaGuide: { bool: false },
    ties: { bool: true },
    crossBackTies: { bool: false },
    bandLength: { pct: 85, min: 75, max: 90 },
  },
}
