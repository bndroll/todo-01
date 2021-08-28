import React from "react"
import classNames from "classnames"
import axios from "axios"

import {Badge} from "../Badge/Badge"
import removeSvg from '../../assets/img/remove.svg'
import './List.scss'


export const List = ({items, isRemovable, onClick, activeItem, onCLickItem, onRemove}) => {
    const removeList = todoObj => {
        axios.delete(`http://localhost:3001/lists/${todoObj.id}`)
            .then(() => onRemove(todoObj.id))
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items?.map((todoObj, id) => {
                    return (
                        <li onClick={onCLickItem ? () => onCLickItem(todoObj) : null}
                            key={`${todoObj.name}_${id}`}
                            className={classNames(todoObj.className, {
                                active: todoObj.active ? todoObj.active : activeItem && activeItem.id === todoObj.id
                            })} >
                            <i>
                                {todoObj.icon ? todoObj.icon : <Badge color={todoObj.color.name} />}
                            </i>
                            <span>{todoObj.name}</span>
                            {isRemovable && (<img className='list__remove-icon'
                                                  onClick={() => removeList(todoObj)}
                                                  src={removeSvg}
                                                  alt="remove icon" />)}
                        </li>)
                })
            }
        </ul>
    )
}