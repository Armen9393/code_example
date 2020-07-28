import React, { useCallback, useMemo } from 'react';
import { IDBData } from 'src/platform/interfaces';
import * as moment from 'moment';
import { useDispatch } from 'react-redux';
import { actionCreator } from 'src/platform/store/actions/action-creator';
import 'moment/locale/ru';
import './index.scss';


export interface NoteProps {
    item: IDBData,
    isWhite: boolean,
}

const Note: React.SFC<NoteProps> = ({ isWhite, item }) => {

    let day = moment(item.date).format('dddd');
    const dispatch = useDispatch();

    const toggleModal = useCallback(() => {
        dispatch(actionCreator.getItem(item.id));
        dispatch(actionCreator.toggleModal(true));
    }, [item.id])

    const toggleDeleteModal = useCallback((evt: React.SyntheticEvent) => {
        evt.stopPropagation();
        dispatch(actionCreator.getItem(item.id));
        dispatch(actionCreator.toggleDeleteModal(true));
    }, [item.id])

    const countDistance = useMemo(() => {
        return item.distance >= 1000 ?
            (item.distance % 1000 === 0 ?
                Math.floor(item.distance / 1000) + " километра" :
                `${Math.floor(item.distance / 1000)} километра ${item.distance % 1000} метров`
            )
            :
            `${item.distance} метров`
    }, [item.distance])

    return (
        <div className="P-note G-cursor"
            onClick={toggleModal}
            style={isWhite ? { backgroundColor: "#EFEFF0" } : null}>
            <div className="P-left">
                <p className="P-weekday">
                    {day[0].toUpperCase() +
                        day.slice(1)}
                </p>
                <p className="P-date">
                    {moment(item.date).format("DD.MM.YYYY")}
                </p>
            </div>
            <div className="P-right">
                {countDistance}
            </div>
            <i className="icon-ic_close G-ml-1 P-delete"
                onClick={toggleDeleteModal}
            />
        </div>
    )
}

export default Note;