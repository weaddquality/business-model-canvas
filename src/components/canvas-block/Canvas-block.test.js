import cases from 'jest-in-case'
import { headerSubString } from './Canvas-block'
import { textSubString } from './Canvas-block'

describe('Testing functions used in canvas-block', () => {
  cases(
    'testing headerSubString()',
    opts => {
      expect(headerSubString(opts.input)).toBe(opts.result)
    },
    [
      {
        name: 'cut at 34 characters and add 3 dots',
        input: 'This line will be cut off right about here',
        result: 'This line will be cut off right ab...',
      },
      {
        name: 'cut a character who is 35 characters',
        input: 'Should cut me ------------- 1234567',
        result: 'Should cut me ------------- 123456...',
      },
      {
        name: 'does not cut since 34 character only',
        input: 'Should not cut me --------- 123456',
        result: 'Should not cut me --------- 123456',
      },
    ]
  )

  cases(
    'testing textSubString()',
    opts => {
      expect(textSubString(opts.input)).toBe(opts.result)
    },
    [
      {
        name: 'cut a long string at 70 characters and add 3 dots',
        input:
          'Cut me ----------------------------------------------------------- 123456789001234567890',
        result: 'Cut me ----------------------------------------------------------- 123...',
      },
      {
        name: 'cut a character who is 71 characters',
        input: 'Should cut me ------------------------------------------------- 1234567',
        result: 'Should cut me ------------------------------------------------- 123456...',
      },
      {
        name: 'does not cut a character who is 70 characters',
        input: 'This line will be cut off after 70 characters ----------------- 123456',
        result: 'This line will be cut off after 70 characters ----------------- 123456',
      },
    ]
  )
})
