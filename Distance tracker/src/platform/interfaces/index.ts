export interface IDBData {
  id: number,
  date: string,
  distance: number,
}

export interface IState {
  items: IDBData[],
  modalHidden: boolean,
  deleteModalHidden: boolean,
  itemID: number,
}