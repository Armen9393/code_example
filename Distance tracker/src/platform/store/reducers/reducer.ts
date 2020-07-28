import { actionTypes } from '../actions/action-types';
import { IDBData, IState } from 'src/platform/interfaces/index';



export const initialState: IState = {
  items: [],
  modalHidden: false,
  deleteModalHidden: false,
  itemID: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.SORT_BY_DATE:
      return {
        ...state,
        items: state.items.sort((item: IDBData, item2: IDBData) => {
          const a = new Date(item.date).getTime();
          const b = new Date(item2.date).getTime();
          return a < b ? -1 : a > b ? 1 : 0;
        })
      };
    case actionTypes.SORT_BY_DISTANCE:
      return {
        ...state,
        items: state.items.sort((item: IDBData, item2: IDBData) => {
          const a = item.distance;
          const b = item2.distance;
          return a < b ? -1 : a > b ? 1 : 0;
        })
      };
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modalHidden: action.payload,
        item: !action.payload ? null : state.itemID
      };
    case actionTypes.TOGGLE_DELETE_MODAL:
      return {
        ...state,
        deleteModalHidden: action.payload,
      };
    case actionTypes.DELETE_ITEM:
      const deleteIndex = state.items.findIndex((item) => item.id === state.itemID);
      state.items.splice(deleteIndex, 1);
      return {
        ...state,
        itemID: null,
      };
    case actionTypes.GET_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case actionTypes.GET_ITEM:
      return {
        ...state,
        itemID: action.payload
      }
    case actionTypes.EDIT_ITEM:
      const index = state.items.findIndex((item) => item.id === state.itemID);
      state.items[index].date = action.payload.date;
      state.items[index].distance = +action.payload.distance;
      return {
        ...state,
        items: state.items,
        itemID: null,
      }
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    default:
      return state;
  }
}