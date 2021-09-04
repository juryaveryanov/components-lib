export default function (component, args) {
  const stringifyArguments = (key, value) => {
    switch (typeof value) {
      case 'string':
        return `\n  ${key}="${value}"`
      case 'boolean':
        return value ? `\n  ${key}` : ''
      default:
        return `\n  :${key}="${value}"`
    }
  }

  let snippet = `<${component.__docgenInfo.displayName}`
  let innerContent = ''
  component.__docgenInfo.props.forEach((prop) => {
    if (args[prop.name]) {
      snippet += stringifyArguments(prop.name, args[prop.name])
    }
  })

  component.__docgenInfo.slots.forEach((slot) => {
    if (args[slot.name]) {
      if (slot.name === 'default') {
        innerContent += `  ${args[slot.name]}`
      } else {
        innerContent += `  <template v-slot:${slot.name}>${args[slot.name]}</template>\n`
      }
    }
  })
  if (innerContent) {
    snippet += '\n>\n'
    snippet += innerContent
    snippet += `\n</${component.__docgenInfo.displayName}>`
  } else {
    if (args) {
      snippet += '\n/>\n'
    } else {
      snippet += ' />\n'
    }
  }

  return snippet
}
