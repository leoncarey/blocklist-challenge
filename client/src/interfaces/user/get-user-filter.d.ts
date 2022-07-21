import { OrderFilters, OrderSort } from '../../constants'
import { User } from './user'
export interface UserFilterParams {
  isBlocked?: boolean
  limit?: number
  orderFilter?: OrderFilters
  order?: OrderSort
  offset?: number
  limit?: number
}

export interface UserSearchParams {
  userName?: string | null
  document?: string | null
}

export interface UserFilterResponse {
  items: User[]
  totalCount: number
}
