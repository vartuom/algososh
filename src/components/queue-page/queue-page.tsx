import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {animationDelay} from "../../utils/utils";

const queue = new Queue<string>(4);

export const QueuePage: React.FC = () => {

    const [queueArr, setQueueArr] = useState(queue.getQueue());
    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isHighlight, setIsHighlight] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const enqueue = async () => {
        setIsPending(true);
        queue.enqueue(value);
        setValue('')
        setQueueArr([...queue.getQueue()]);
        setIsHighlight(true)
        await animationDelay(500);
        setIsHighlight(false);
        setIsPending(false);
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={styles.inputForm} onSubmit={e => {
                e.preventDefault()
            }}>
                <Input value={value} onChange={onChange} placeholder={"Введите текст"} maxLength={4}
                       isLimitText={true}/>
                <Button text={"Добавить"} isLoader={isPending} onClick={enqueue}/>
                <Button text={"Удалить"} isLoader={isPending} onClick={() => {}}/>
                <Button text={"Очистить"} isLoader={isPending} onClick={() => {
                    queue.clear();
                    setQueueArr(queue.getQueue);
                }}/>
            </form>
            <div className={styles.circleRow}>
                {queueArr.map((item, index: number, array) => {
                    return (
                        <Circle
                            key={index}
                            index={index}
                            letter={item}
                            state={isHighlight ? index === queue.getTail() - 1 % queue.getSize() ? ElementStates.Changing : ElementStates.Default : ElementStates.Default}
                            //state={ElementStates.Default}
                            head={queue.isEmpty() ? "" : queue.getHead() === index ? "head" : ""}
                            tail={queue.isEmpty() ? "" : queue.getTail() - 1 === index ? "tail" : ""}
                        />)
                })}
            </div>
        </SolutionLayout>
    );
};
