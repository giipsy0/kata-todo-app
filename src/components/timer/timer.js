import { Component } from "react";

import { getPadTime } from '../../utilities';

export default class Timer extends Component {
    formatTime = (timeState) => {
        const min = getPadTime(Math.floor(timeState / 60));
        const sec = getPadTime(timeState - min * 60);
        return `${min}:${sec}`;
    };

    render() {
        const { onTimerStart, onTimerStop, time } = this.props;
        const displayTime = this.formatTime(time);
        return (
            <span className="description">
                <div className="container">
                <button
                className="icon icon-play"
                type="button"
                onClick={onTimerStart}/>
                <button
                className="icon icon-pause"
                type="button"
                onClick={onTimerStop}/>
                <div className="timer">{displayTime}</div>
                </div>
            </span>
        )
    }
}