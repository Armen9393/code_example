import { actionTypes } from './action-types';
import { IDBData } from './../../interfaces/index';

const actionCreator = {
  toggleModal: (arg: boolean) => {
    return {
      type: actionTypes.TOGGLE_MODAL,
      payload: arg,
    }
  },
  toggleDeleteModal: (arg: boolean) => {
    return {
      type: actionTypes.TOGGLE_DELETE_MODAL,
      payload: arg,
    }
  },
  getItems: (items: Array<IDBData>) => {
    return {
      type: actionTypes.GET_ITEMS,
      payload: items,
    }
  },
  getItem: (id: number) => {
    return {
      type: actionTypes.GET_ITEM,
      payload: id,
    }
  },
  editItem: (value: IDBData) => {
    return {
      type: actionTypes.EDIT_ITEM,
      payload: value,
    }
  },
  deleteItem: () => {
    return {
      type: actionTypes.DELETE_ITEM,
    }
  },
  addItem: (item: IDBData) => {
    return {
      type: actionTypes.ADD_ITEM,
      payload: item,
    }
  },
  sortByDistance: () => {
    return {
      type: actionTypes.SORT_BY_DISTANCE,
    }
  },
  sortByDate: () => {
    return {
      type: actionTypes.SORT_BY_DATE,
    }
  }
};

export { actionCreator };
