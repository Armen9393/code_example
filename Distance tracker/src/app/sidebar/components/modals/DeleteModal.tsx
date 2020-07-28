import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreator } from 'src/platform/store/actions/action-creator';
import { asyncActions } from 'src/platform/store/actions/async-actions';
import { IState } from 'src/platform/interfaces/index';

const DeleteModal: React.SFC = () => {

    const state = useSelector((state: IState) => state);
    const dispatch = useDispatch();

    const toggleDeleteModal = useCallback(() => {
        dispatch(actionCreator.toggleDeleteModal(false));
    }, [])

    const deleteItem = useCallback(() => {
        dispatch(asyncActions.deleteItem(state.itemID));
        toggleDeleteModal();
    }, [state.itemID])

    return <Modal
        isOpen={state.deleteModalHidden}
        onRequestClose={toggleDeleteModal}
        style={{
            content: {
                width: "450px",
                height: "200px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
            },
        }}>
        <div className="G-column P-sidebar-modal">
            <h4>Вы уверены, что хотите удалить?</h4>
            <div className="G-flex G-justify-between P-bottom">
                <button className="G-mr-2"
                    onClick={toggleDeleteModal}>Отмена</button>
                <button
                    onClick={deleteItem}
                    className="G-mt-auto G-button P-button"
                > Удалить
                </button>
            </div>
        </div>
    </Modal>
}

export default React.memo(DeleteModal);