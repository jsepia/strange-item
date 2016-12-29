var assert = require('assert')
var StrangeItem = require('..')

describe('Strange Item sanity tests', () => {

  it('returns a class', () => {
    assert.strictEqual(typeof(StrangeItem), 'function') // prototypal inheritance
  })

  it('can be instanced', () => {
    var mySI = new StrangeItem()
    assert.ok(mySI instanceof StrangeItem)
  })

  it('instances have a value property', () => {
    var mySI = new StrangeItem()
    assert.ok(mySI.hasOwnProperty('value'))
  })
})

describe('Strange Item get/set tests', () => {
  var mySI = null

  beforeEach(() => {
    mySI = new StrangeItem('foo')
  })

  it('StrangeItem(value)', () => {
    assert.strictEqual(mySI.value, 'foo')
  })

  it('StrangeItem.set(value)', () => {
    mySI.set('bar')
    assert.strictEqual(mySI.value, 'bar')
  })

  it('StrangeItem.get()', () => {
    assert.strictEqual(mySI.get(), 'foo')
  })
})

describe('Strange Item binding tests', () => {
  var mySI = null
  var mockDOMElement = null

  beforeEach(() => {
    mySI = new StrangeItem('foo')
    mockDOMElement = {
      innerHTML: '',
      value: ''
    }
  })

  it('creates a binding', () => {
    mySI.bind(mockDOMElement)
    assert.strictEqual(mySI.bindings.length, 1)
    assert.deepStrictEqual(mySI.bindings[0].element, mockDOMElement)
    assert.strictEqual(mySI.bindings[0].attribute, 'innerHTML')
  })

  it('initializes the DOM element', () => {
    mySI.bind(mockDOMElement)
    assert.strictEqual(mockDOMElement.innerHTML, 'foo')
  })

  it('updates the DOM element when the value is changed', () => {
    mySI.bind(mockDOMElement)
    mySI.set('bar')
    assert.strictEqual(mockDOMElement.innerHTML, 'bar')
  })

  it('works for properties other than innerHTML', () => {
    mySI.bind(mockDOMElement, 'value')
    assert.strictEqual(mockDOMElement.value, 'foo')
    mySI.set('bar')
    assert.strictEqual(mockDOMElement.value, 'bar')
  })
})

describe('Strange Item autoUpdate tests', () => {

  describe('initializes', () => {
    it('has autoUpdate enabled by default', () => {
      var mySI = new StrangeItem('foo')
      assert.ok(mySI.hasOwnProperty('autoUpdate'))
      assert.ok(mySI.autoUpdate)
    })

    it('can be passed autoUpdate from the constructor', () => {
      var mySI = new StrangeItem('foo', { autoUpdate: false })
      assert.ok(!mySI.autoUpdate)
    })
  })

  describe('usage with autoUpdate = false', () => {
    var mySI = null
    var mockDOMElement = null

    beforeEach(() => {
      mySI = new StrangeItem('foo')
      mockDOMElement = {
        innerHTML: 'bar',
        value: ''
      }
      mySI.autoUpdate = false
      mySI.bind(mockDOMElement)
    })

    it('does not update the DOM element when bind is called and autoUpdate is false', () => {
      assert.strictEqual(mockDOMElement.innerHTML, 'bar')
    })

    it('does not update the DOM element when set is called and autoUpdate is false', () => {
      mySI.set('qux')
      assert.strictEqual(mockDOMElement.innerHTML, 'bar')
    })

    it('updates the DOM element when update is called even with autoUpdate = false', () => {
      mySI.set('qux')
      mySI.update()
      assert.strictEqual(mockDOMElement.innerHTML, 'qux')
    })
  })
})

describe('Strange Item insanity tests', () => {

  it('supports toString', () => {
    var mySI = new StrangeItem('foo')
    assert.strictEqual(mySI.toString(), 'foo')
    assert.strictEqual(mySI + '', 'foo')
  })

  it('supports method chaining', () => {
    var mySI = new StrangeItem('foo')
    assert.deepStrictEqual(mySI.bind({}), mySI)
    assert.deepStrictEqual(mySI.set('bar'), mySI)
    assert.deepStrictEqual(mySI.update(), mySI)
  })
})
