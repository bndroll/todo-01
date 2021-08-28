import React, {useState} from "react"

import addSvg from '../../../assets/img/add.svg'
import axios from "axios";


export const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
    }

    const addTask = () => {
        const taskObj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)

        axios.post('http://localhost:3001/tasks', taskObj)
            .then(r => {
                onAddTask(list.id, r.data)
                toggleFormVisible()
            }).catch(() => {
                alert('Произошла какая-то ошибка')
            }).finally(() => {
                setIsLoading(false)
        })
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input value={inputValue}
                           className="field"
                           type="text"
                           placeholder="Текст задачи"
                           onChange={e => setInputValue(e.target.value)} />
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">
                        Отмена
                    </button>
                </div>
            )}
        </div>
    )
}