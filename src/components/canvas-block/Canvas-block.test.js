import cases from 'jest-in-case'
import { headerText } from './Canvas-block'
import { itemText } from './Canvas-block'
import { formatBlockHeader } from './Canvas-block'

cases(
  'Testing headerText()',
  opts => {
    expect(headerText(opts.input)).toBe(opts.result)
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
  'Testing itemText()',
  opts => {
    expect(itemText(opts.input)).toBe(opts.result)
  },
  [
    {
      name: 'cut a long string at 70 characters and add 3 dots',
      input: 'Cut me ----------------------------------------------------------- 123456789',
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
describe('Testing formatBlockHeader', () => {
  it('formats to lowercase, and " " to "-"', () => {
    expect(formatBlockHeader('Value Propositions')).toBe('value-propositions')
  })
})
