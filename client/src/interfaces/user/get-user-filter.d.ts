import { OrderFilters, OrderSort } from '../../constants'
import { User } from './user'
export interface UserFilterParams {
  isBlocked?: boolean
  limit?: number
  orderFilter?: OrderFilters
  order?: OrderSort
  offset?: number
  limit?: number
  isBlocked?: boolean
}

export interface UserSearchParams {
  userName?: string
  document?: string
}

export interface UserFilterResponse {
  items: User[]
  totalCount: number
}
