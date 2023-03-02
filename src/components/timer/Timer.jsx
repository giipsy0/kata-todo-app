import { useState, useEffect } from "react"

export default function Timer(props) {
    const {timer, updateTime, status} = props
    const [timeStarted, switchTimer] = useState(false)
    const [time, setTime] = useState(null)
    const [tick, setTick] = useState(timer)

    const format = (sec) => [Math.floor((sec / 60) % 60), Math.floor(sec % 60)]
        .join(':')
        .replace(/\b(\d)\b/g, '0$1')

    const timerTick = () => {
        if (!timeStarted) return
        if (status === 'completed') {
            setTime(clearInterval(time))
            switchTimer(() => false)
        } else if (tick === 0) {
            switchTimer(() => false)
            setTime(clearInterval(time))
        } else {
            setTick((s) => s - 1)
        }
    }

    useEffect(() => {
        updateTime(tick)
    }, [tick])

    useEffect(() => {
        const counter = setInterval(() => timerTick(), 1000)
        return () => clearInterval(counter)
    })

    const onStart = () => switchTimer(() => true)

    const onStop = () => switchTimer(() => false)

    return (
        <span className="description">
                <div className="container">
                <button
                className="icon icon-play"
                type="button"
                onClick={onStart}/>
                <button
                className="icon icon-pause"
                type="button"
                onClick={onStop}/>
                <div className="timer">{format(tick)}</div>
                </div>
            </span>
    )
}