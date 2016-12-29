import StrangeItemBinding from './strange-item-binding'

export default class StrangeItem {
  constructor(value, options) {
    options = options || {}
    this.value = value
    this.autoUpdate = options.autoUpdate === false ? false : true
    this.bindings = []
  }

  /**
   * Bind this strange item to a DOM element or selector.
   * Whenever the value in the strange item changes (or
   * `StrangeItem.update` is called), the DOM element(s)
   * in question will be updated with the new value.
   * 
   * By default, `bind` updates the `innerHTML` property.
   * If you would like to update a different property
   * (such as `value` for text fields) you can pass it as
   * the second parameter.
   */
  bind(element, attribute) {
    attribute = attribute || 'innerHTML'
    this.bindings.push(new StrangeItemBinding(element, attribute))
    if (this.autoUpdate) {
      this.update() // initialize
    }
    return this // all jQuery style heck yeah
  }

  /**
   * Don't use this method. Just reference
   * `StrangeItem.value` directly. Trust me, it'll be ok.
   */
  get() {
    return this.value
  }

  /**
   * Changes the stored value and updates all bound DOM
   * elements (unless `StrangeItem.autoUpdate == false`)
   */
  set(value) {
    this.value = value
    if (this.autoUpdate) {
      this.update()
    }
    return this // chain me up baby
  }

  /**
   * Updates all bound DOM elements. This gets called
   * automatically if `StrangeItem.autoUpdate == true`
   */
  update() {
    this.bindings.forEach((binding) => {
      if (
        binding.element &&
        binding.attribute &&
        binding.element.hasOwnProperty(binding.attribute)
      ) {
        binding.element[binding.attribute] = this.value
      }
    })
    return this
  }

  /**
   * In case you want to do things like
   * `console.log(myStrangeItem)`
   */
  toString() {
    return this.value
  }
}
