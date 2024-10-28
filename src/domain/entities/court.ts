import { STATUS } from '@/utils/enums/status'

type CourtProps = {
  number: number
  status: STATUS
  isField: boolean
  photo?: string
}

export class Court {
  private _number: number
  private _status: STATUS
  private _isField: boolean
  private _photo?: string

  constructor({ number, status, isField, photo }: CourtProps) {
    this._number = number
    this._status = status
    this._isField = isField
    this._photo = photo
  }

  // Getters and Setters

  get number() {
    return this._number
  }

  set number(number: number) {
    this._number = number
  }

  get status() {
    return this._status
  }

  set status(status: STATUS) {
    this._status = status
  }

  get isField() {
    return this._isField
  }

  set isField(isField: boolean) {
    this._isField = isField
  }

  get photo() {
    return this._photo || ''
  }

  set photo(photo: string) {
    this._photo = photo
  }
}
