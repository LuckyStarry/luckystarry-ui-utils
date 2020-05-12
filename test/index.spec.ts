/* tslint:disable */
import { expect } from 'chai'
import DEFAULT, { models, utils } from '../src/index'

describe('/index.ts', function () {
  it('存在 models', function () {
    expect(models).is.not.null
    expect(models).is.not.undefined

    expect(DEFAULT.models).is.equal(models)
  })

  it('存在 utils', function () {
    expect(utils).is.not.null
    expect(utils).is.not.undefined

    expect(DEFAULT.utils).is.equal(utils)
  })
})
