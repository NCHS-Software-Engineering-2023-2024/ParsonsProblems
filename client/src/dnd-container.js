import React, { useState, useEffect } from "react";


export const DndContainer = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'first',
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
    const [newItemName, setNewItemName] = useState("");

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
            items.splice(currentIndex, 1);
            items.splice(targetIndex, 0, draggingItem);
            setItems(items);
        }
    };

    const handleNameChange = (e) => {
        setNewItemName(e.target.value);
    };

    return (
        <>
            <div className="sortable-list">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className=
                        {`item ${item === draggingItem ?
                            'dragging' : ''
                            }`}
                        draggable="true"
                        onDragStart={(e) =>
                            handleDragStart(e, item)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, item)}
                    >
                        <div className="details">
                            <span>{item.name}</span>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}
export default DndContainer;