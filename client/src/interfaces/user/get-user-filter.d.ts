import { User } from './user'

export enum OrderFilters {
  ORDER = 'order',
  BLOCKED = 'blocked',
  DOCUMENT = 'document',
  DOCUMENT_TYPE = 'documentType',
  NAME = 'name',
  CREATE_AT = 'createAt',
  UPDATE_AT = 'updateAt',
}

export enum OrderSort {
  ASC = 1,
  DESC = -1,
}

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
