const assert = require('assert').strict
const { cnpj, cpf } = require('cpf-cnpj-validator')

const { DocumentValidator } = require('../../../src/helpers')

describe('Tests for Document Validator', function () {
  it('should return false if document type is not string', function () {
    const documentValidated = DocumentValidator.validateDocument(false)
    assert(!documentValidated)
  })

  describe('Tests for CPF', function () {
    it('should return true if CPF is valid', function () {
      const documentCPF = cpf.generate()
      const documentValidated = DocumentValidator.validateDocument(documentCPF)

      assert(documentValidated)
    })

    it('should return false with invalid document', function () {
      const documentCPF = '00000000000'
      const documentValidated = DocumentValidator.validateDocument(documentCPF)

      assert(!documentValidated)
    })
  })

  describe('Tests for CNJP', function () {
    it('should return true if CNPJ is valid', function () {
      const documentCNPJ = cnpj.generate()
      const documentValidated = DocumentValidator.validateDocument(documentCNPJ)

      assert(documentValidated)
    })

    it('should return false with document length smaller', function () {
      const documentCNPJ = '0000000000000'
      const documentValidated = DocumentValidator.validateDocument(documentCNPJ)

      assert(!documentValidated)
    })

    it('should return false with invalid document', function () {
      const documentCNPJ = '000000000000000'
      const documentValidated = DocumentValidator.validateDocument(documentCNPJ)

      assert(!documentValidated)
    })
  })
})
