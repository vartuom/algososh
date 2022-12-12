import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {animationDelayWithAbort} from "../../utils/utils";

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {

    const [queueArr, setQueueArr] = useState(queue.getQueue());
    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState("");
    const [isHighlight, setIsHighlight] = useState(false);
    const [curr, setCurr] = useState(-1);
    const [tail, setTail] = useState(queue.getTail())

    const controller = new AbortController();
    const signal = controller.signal;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const enqueue = async () => {
        setIsPending("enqueue");
        setTail(queue.getTail() % queue.getSize());
        setCurr(queue.getTail() % queue.getSize());
        queue.enqueue(value);
        setQueueArr([...queue.getQueue()]);
        setValue('')
        setIsHighlight(true)
        await animationDelayWithAbort(500, null, signal);
        setCurr(-1)
        setIsHighlight(false);
        setIsPending("");
        console.log(tail);
    }

    const dequeue = async () => {
        setIsPending("dequeue");
        setIsHighlight(true)
        setCurr(queue.getHead() % queue.getSize());
        await animationDelayWithAbort(500, null, signal);
        setIsHighlight(false);
        queue.dequeue();
        setQueueArr([...queue.getQueue()]);
        setCurr(queue.getHead());
        setCurr(-1);
        setIsPending("");
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <fieldset className={styles.controlSet} disabled={isPending === "" ? false : true}>
                    <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                           isLimitText={true} extraClass={styles.inputField}/>
                    <Button text={"Добавить"} isLoader={isPending === "enqueue" ? true : false}
                            disabled={value.trim().length === 0 || queue.getSize() === queue.getLength() ? true : false} onClick={enqueue}/>
                    <Button text={"Удалить"} isLoader={isPending === "dequeue" ? true : false}
                            disabled={queue.getLength() === 0 ? true : false} onClick={dequeue}/>
                    <Button text={"Очистить"} disabled={queue.getLength() === 0 ? true : false} onClick={() => {
                        queue.clear();
                        setQueueArr(queue.getQueue);
                    }}/>
                </fieldset>
            </form>
            <div className={styles.circleRow}>
                {queueArr.map((item, index: number) => {
                    return (
                        <Circle
                            key={index}
                            index={index}
                            letter={item}
                            state={isHighlight ? index === curr ? ElementStates.Changing : ElementStates.Default : ElementStates.Default}
                            //state={ElementStates.Default}
                            head={queue.isEmpty() ? "" : queue.getHead() % queue.getSize() === index ? "head" : ""}
                            tail={queue.isEmpty() ? "" : tail === index ? "tail" : ""}
                        />)
                })}
            </div>
        </SolutionLayout>
    );
};
