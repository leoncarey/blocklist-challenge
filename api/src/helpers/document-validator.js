const { cnpj, cpf } = require('cpf-cnpj-validator')

class DocumentValidator {
  static validateDocument (document) {
    if (typeof document !== 'string') return false

    if (document.length > 11) return cnpj.isValid(document)

    return cpf.isValid(document)
  }
}

module.exports = DocumentValidator
