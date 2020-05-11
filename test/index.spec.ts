/* tslint:disable */
import { expect } from 'chai'
import { models } from '../src/index'

describe('Index', function () {
  it('存在 models', function () {
    expect(models).is.not.null
    expect(models).is.not.undefined
  })
})
