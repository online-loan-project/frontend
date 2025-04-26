import BaseService from './BaseService'

let instance = null
class UserService extends BaseService {
  constructor() {
    super('borrower/request-loan')
  }

  static getInstance() {
    if (!instance) {
      instance = new UserService()
    }
    return instance
  }


  async index(payload = {}) {
    const filteredParams = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value != null),
    )
    const queryParams = new URLSearchParams(filteredParams).toString()

    return await this._get(`${this._prefix}?${queryParams}`, {})
  }


}

export default UserService
