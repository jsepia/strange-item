import StrangeItem from '..'

const mySI1 = new StrangeItem()
const mySI2 = new StrangeItem(true)
const mySI3 = new StrangeItem(1.1)
const mySI4 = new StrangeItem('foo')
const mySI5 = new StrangeItem({ name: 'thomas' })
const mySI6 = new StrangeItem(mySI1)

let result: any
result = mySI1.value
result = mySI1.get()

const myObject: Object = {}
mySI1.bind(myObject)
mySI1.bind(myObject, 'innerHTML')

mySI1.set(true)
mySI1.set(3.14)
mySI1.set('baz')
mySI1.set({ surname: 'biskup' })
mySI1.set(mySI2)

let myNewSI: StrangeItem
myNewSI = mySI1.bind(myObject)
myNewSI = mySI1.set(true)
myNewSI = mySI1.update()

const myString: string = mySI1.toString()
