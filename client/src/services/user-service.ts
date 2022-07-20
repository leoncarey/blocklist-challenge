import { api } from '.'
import { UserFilterParams, UserFilterResponse, UserSearchParams } from '../interfaces/user/get-user-filter'
import { SaveUserParams } from '../interfaces/user/save-user'

class UserService {
  static async getUsers(filters: UserFilterParams, search: UserSearchParams): Promise<UserFilterResponse> {
    const options = {
      method: 'get',
      params: {
        ...filters,
        ...search,
      },
      url: '/users',
    }

    const { data } = await api(options)
    return data
  }

  static async saveUser(userParams: SaveUserParams): Promise<{ _id: string }> {
    const options = {
      method: 'post',
      data: userParams,
      url: '/users',
    }

    const { data } = await api(options)
    return data
  }

  static async deleteUser(userId: string): Promise<{ userDeleted: string }> {
    const options = {
      method: 'delete',
      url: `/users/:${userId}`,
    }

    const { data } = await api(options)
    return data
  }

  static async updateBlockUser(userId: string, blockSituation: boolean): Promise<{ _id: string }> {
    const options = {
      method: 'patch',
      data: {
        blocked: blockSituation,
      },
      url: `/users/:${userId}`,
    }

    const { data } = await api(options)
    return data
  }
}

export default UserService
