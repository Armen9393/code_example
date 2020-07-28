import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { IDBData, IState } from 'src/platform/interfaces/index';
import * as moment from 'moment';
import 'moment/locale/ru';
import './index.scss';

const Chart: React.SFC = () => {

    const state = useSelector((state: IState) => state);

    let distanceNumbersArr = useCallback(state.items.map((item: IDBData) => {
        return Number(item.distance);
    }), [state]);

    let dateNumbersArr = useCallback(state.items.map((item: IDBData) => {
        return moment(item.date).format("DD.MM.YYYY");
    }), [state]);

    let largest = Math.max.apply(Math, distanceNumbersArr);
    let smallest = Math.min.apply(Math, distanceNumbersArr);

    let sum = useCallback(distanceNumbersArr.reduce((a: number, b: number) => { return a + b; }, 0),
        [distanceNumbersArr]);

    return (
        <div className="P-chart">
            <div className="P-top">Суммарная активность</div>
            <div className="P-body">
                <Line
                    height={140}
                    data={{
                        labels: dateNumbersArr,
                        datasets: [
                            {
                                label: "Расстояние",
                                data: distanceNumbersArr,
                                backgroundColor: "transparent",
                                borderColor: "#EC174F",
                                pointBackgroundColor: "#EC174F",
                                borderWidth: 4,
                                lineTension: 0,
                                pointHitRadius: 50,
                                pointRadius: 4,
                                pointHoverRadius: 10,
                            }
                        ],
                    }}
                />
            </div>
            <div className="P-bottom">
                <div className="G-flex">
                    <p className="G-mr-2">Минимум: {smallest} метров</p>
                    <p>Максимум: {largest} метров</p>
                </div>
                <div className="G-column G-align-end">
                    <p>Суммарно за {distanceNumbersArr.length} дней:</p>
                    <p>{sum}</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Chart);