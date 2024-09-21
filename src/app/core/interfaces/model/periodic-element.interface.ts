export type ColumnKeys<T> = Array<keyof T>

export interface IPeriodicElement {
  id: number
  name: string
  weight: number
  symbol: string
  action?: string
}
