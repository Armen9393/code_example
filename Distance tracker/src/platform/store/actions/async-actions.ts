import axios, { AxiosResponse } from 'axios';
import { actionCreator } from 'src/platform/store/actions/action-creator';
import { IDBData } from 'src/platform/interfaces';

const asyncActions = {

    fetchItems: () => {
        return (dispatch: any) => {
            axios.get("http://localhost:4000/walking")
                .then((res: AxiosResponse<Array<IDBData>>) => {
                    dispatch(actionCreator.getItems(res.data))
                })
        }
    },
    addItem: (item: IDBData) => {
        return (dispatch: any) => {
            axios.post(`http://localhost:4000/walking/`, item)
                .then((res: AxiosResponse) => {
                    if (res.status) {
                        dispatch(actionCreator.addItem(item))
                    }
                })
        }
    },
    editItem: (item: IDBData) => {
        return (dispatch: any) => {
            axios.put(`http://localhost:4000/walking/${item.id}`, item)
                .then((res: AxiosResponse) => {
                    if (res.status) {
                        dispatch(actionCreator.editItem(item))
                    }
                })
        }
    },
    deleteItem: (itemID: number) => {
        return (dispatch: any) => {
            axios.delete(`http://localhost:4000/walking/${itemID}`)
                .then((res: AxiosResponse) => {
                    if (res.status) {
                        dispatch(actionCreator.deleteItem())
                    }
                })
        }
    },

}

export { asyncActions };