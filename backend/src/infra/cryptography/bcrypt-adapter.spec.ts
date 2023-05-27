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

// vi.mock('bcrypt', () => ({
//   async hash(): Promise<string> {
//     return 'hash'
//   },

//   async compare(): Promise<boolean> {
//     return true
//   },
// }))

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
})
