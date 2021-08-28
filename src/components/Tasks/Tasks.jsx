import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import {Task} from "./Task/Task"
import {AddTaskForm} from "./AddTaskForm/AddTaskForm"
import editSvg from '../../assets/img/edit.svg'
import './Tasks.scss'


export const Tasks = ({list, onEditTitle, withoutEmpty, onEditTask, onRemoveTask, onCompleteTask, onAddTask}) => {
    const editTitle = () => {
        const newTitle = window.prompt('Введите новое название', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)

            axios.patch(`http://localhost:3001/lists/${list.id}`, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось изменить название')
            })
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={editSvg} alt="Edit icon" />
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && (
                    <h2>Задачи отсутствуют</h2>
                )}
                {list.tasks &&
                list.tasks.map(task => (
                    <Task
                        key={task.id}
                        list={list}
                        onEdit={onEditTask}
                        onRemove={onRemoveTask}
                        onComplete={onCompleteTask}
                        {...task}
                    />
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}