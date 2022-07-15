
class Parser {
  static parseInt (parameter) {
    if (parameter === null || parameter === undefined) return undefined
    return parseInt(parameter, 10)
  }

  static parseFloat (parameter) {
    if (parameter === null || parameter === undefined) return undefined
    return parseFloat(parameter)
  }

  static parseBoolean (parameter) {
    if (parameter === 'true' || parameter === 'false') return (parameter === 'true')
    return parameter
  }

  static parseArrayObject (parameter) {
    if ((/^\[|\{/gu).test(parameter)) return JSON.parse(parameter)
    return parameter
  }
}

module.exports = Parser
