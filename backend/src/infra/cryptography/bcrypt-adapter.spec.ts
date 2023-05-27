import bcrypt from 'bcrypt'
import { describe, expect, it, vi } from 'vitest'
import { BcryptAdapter } from './bcrypt-adapter'

vi.mock('bcrypt', () => {
  return {
    default: {
      hash(): string {
        return 'hash'
      },
      compare(): boolean {
        return true
      },
    },
  }
})

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt adapter', () => {
  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = vi.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    it('Should throw if hash throws', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'hash').mockRejectedValueOnce(
        Promise.resolve(new Error()),
      )
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = vi.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    it('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    it('Should return false when compare fails', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    it('Should throw if compare throws', async () => {
      const sut = makeSut()
      vi.spyOn(bcrypt, 'compare').mockRejectedValueOnce(
        Promise.resolve(new Error()),
      )
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
