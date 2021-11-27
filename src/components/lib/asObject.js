const asObject = (stringOrObject) => ({
  ...(typeof stringOrObject === 'object' && stringOrObject),
  name: typeof stringOrObject === 'object' ? stringOrObject.name : stringOrObject,
  value: typeof stringOrObject === 'object' ? stringOrObject.value : stringOrObject
})
export default asObject
