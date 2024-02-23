import React, { useState, useEffect, useCallback } from "react";
import { DndItem } from "./dnd-item.js"
import { update } from "immutability-helper"

export const DndContainer = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'firstasdjkahsaskakskdjasjkdjkakjsssssssssssssskjskkdasd aasdasdakslk',
        },
        {
            id: 2,
            name: 'second',
        },
        {
            id: 3,
            name: 'third',
        },
    ]);
    const [draggingItem, setDraggingItem] = useState(null);

    const handleDragStart = (e, item) => {
        setDraggingItem(item);
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetItem) => {
        if (!draggingItem) return;

        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);

        if (currentIndex !== -1 && targetIndex !== -1) {
            setItems((prevItems) =>
                update(prevItems, {
                    $splice: [
                        [currentIndex, 1],
                        [targetIndex, 0, draggingItem],
                    ]
            }));
        }
    };

 
    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setItems((prevItems) =>
          update(prevItems, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevItems[dragIndex]],
            ],
          })
        );
      }, []);
    const renderItem = useCallback((item, index, classN, dragStartN, onDropN) => {
        return (
            <>
                <DndItem
                    key={item.id}
                    index={index}
                    id={item.id}
                    text={card.name}
                    moveItem={moveItem}
                    className={classN}
                    onDragStart={dragStartN}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={onDropN}
                />
            </>
        );
    }, []);

    return (
        <>
            <div className="sortable-list">
                {items.map((item, index) => (
                    renderItem(
                        item, 
                        index, 
                        `item ${item === draggingItem ?
                        'dragging' : ''}`,
                        (e) => handleDragStart(e, item),
                        (e) => handleDrop(e, item)),
                ))}
            </div>
        </>
    );
}
export default DndContainer;