import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { Form, Formik, Field, FormikValues } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import Loader from 'src/platform/components/loader/loader';
import { actionCreator } from 'src/platform/store/actions/action-creator';
import * as Yup from 'yup';
import { asyncActions } from 'src/platform/store/actions/async-actions';
import { IDBData, IState } from 'src/platform/interfaces/index';

let validationSchema = Yup.object().shape({
    date: Yup.date().required(),
    distance: Yup.number().required(),
});

const EditModal: React.SFC = () => {

    const state = useSelector((state: IState) => state);
    const dispatch = useDispatch();

    const toggleModal = useCallback(() => {
        dispatch(actionCreator.toggleModal(false));
    }, [])


    const submitForm = useCallback((values: FormikValues) => {
        const body: IDBData = {
            id: state.itemID,
            date: values.date,
            distance: values.distance,
        }
        if (state.item) {
            dispatch(asyncActions.editItem(body));
        } else {
            body.id = Date.now();
            dispatch(asyncActions.addItem(body));
        }
        toggleModal()
    }, [state.item])

    return <Modal
        isOpen={state.modalHidden}
        onRequestClose={toggleModal}
        style={{
            content: {
                width: "450px",
                height: "250px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
            },
        }}>
        <div className="G-column P-sidebar-modal">
            <Formik
                initialValues={{
                    date: "",
                    distance: "",
                }}
                onSubmit={submitForm}
                validationSchema={validationSchema}
                render={({ errors, touched, isSubmitting, setFieldValue, values }) => (
                    <Form className="P-form">
                        <div className="P-form-input">
                            <div className="P-field P-field-add G-mb-2">
                                <DatePicker
                                    autoComplete="off"
                                    name="date"
                                    showYearDropdown
                                    maxDate={new Date()}
                                    selected={values.date}
                                    placeholderText={"Дата"}
                                    onChange={(e: React.SyntheticEvent) => {
                                        setFieldValue('date', e)
                                    }}
                                    className={`P-select ${touched.date && errors.date ? "G-error" : ""}`}
                                />
                            </div>
                            <div className="P-field P-field-add G-mb-2">
                                <Field
                                    type="text"
                                    name="distance"
                                    placeholder={"Расстояние"}
                                    className={touched.distance && errors.distance ? "G-error" : ""}
                                />
                            </div>
                        </div>
                        <div className="G-flex G-justify-between G-mt-6">
                            <button className="G-mr-2" onClick={toggleModal}>Отмена</button>
                            <button
                                type="submit"
                                className="G-mt-auto G-button P-button"
                            > {isSubmitting ? <Loader /> : state.item ? "Изменить" : "Добавить"}
                            </button>
                        </div>
                    </Form>
                )}
            />
        </div>
    </Modal>
}

export default React.memo(EditModal);