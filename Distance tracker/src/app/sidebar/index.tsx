import React, { useCallback } from 'react';
import Note from './components/note';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'src/platform/store/actions/action-creator';
import DeleteModal from './components/modals/DeleteModal';
import EditModal from './components/modals/EditModal';
import './index.scss';
import { IDBData, IState } from 'src/platform/interfaces/index';

const Sidebar: React.SFC = () => {

    const state = useSelector((state: IState) => state);
    const dispatch = useDispatch();

    const sortByDate = useCallback(() => {
        dispatch(actionCreator.sortByDate());
    }, [])

    const sortByDistance = useCallback(() => {
        dispatch(actionCreator.sortByDistance());
    }, [])

    const toggleModal = useCallback(() => {
        dispatch(actionCreator.toggleModal(true));
    }, [])

    return (<div className="P-sidebar">
        <div className="P-top G-flex">
            <div className="G-flex P-left G-cursor"
                onClick={sortByDate}
            >
                <span className="G-mr-1">Дата</span >
                <span className="P-arrow" />
            </div>
            <div className="G-flex P-right G-cursor"
                onClick={sortByDistance}
            >
                <span className="G-mr-1">Дистанция</span>
                <span className="P-arrow" />
            </div>
        </div>
        <div className="P-body">
            {state.items.map((item: IDBData, index: number) =>
                <Note key={item.id} item={item}
                    isWhite={index % 2 === 0 ? true : false} />)}
        </div>
        <div className="P-bottom" onClick={toggleModal}>
            Добавить запись
        </div>
        <EditModal />
        <DeleteModal />
    </div>);
}

export default React.memo(Sidebar);