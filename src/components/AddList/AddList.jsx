import React, {useEffect, useState} from "react"
import axios from "axios"

import {List} from "../List/List"
import {Badge} from "../Badge/Badge"
import closeSvg from '../../assets/img/close.svg'
import './AddList.scss'


export const AddList = ({colors, onAddList}) => {
    const [inputValue, setInputValue] = useState('')
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(0)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (inputValue) {
            setIsLoading(true)

            axios.post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            }).then(r => {
                const color = colors.filter(color => color.id === selectedColor)[0]
                const listObj = { ...r.data, color, tasks: [] }
                onAddList(listObj)
                onClose()
            }).catch(() => {
                alert('Ошибка при добавлении списка')
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            alert('Введите название списка')
        }
    }

    return (
        <div className='add__list'>
            <List onClick={() => setVisiblePopup(true)} items={[{
                className: 'list__add-button',
                icon: (
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 1V15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 8H15"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ),
                name: 'Добавить список'
            }]}/>
            {visiblePopup && (<div className="add-list__popup">
                <img onClick={onClose}
                     src={closeSvg}
                     alt="Close button"
                     className="add-list__popup-close-btn" />

                <input value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       className="field"
                       type="text"
                       placeholder="Название списка" />

                <div className="add-list__popup-colors">
                    {colors.map(color => (
                        <Badge onClick={() => setSelectedColor(color.id)}
                               key={color.id}
                               color={color.name}
                               className={selectedColor === color.id && 'active'} /> ))}
                </div>
                <button onClick={addList}
                        className="button">{isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>)}
        </div>
    )
}