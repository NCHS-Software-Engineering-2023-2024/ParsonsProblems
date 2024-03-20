import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./index.css";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useState } from "react";
import { fileContext } from "./fileContext";
function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.id.name}
    </div>
  );
}
export const DndContainer = () => {
  const {file, setFile} = useContext(fileContext);
  
  const [items, setitems] = useState(file);
  
  var arr = [];
  for (const f in file){
    arr.push(f);
  }
  useEffect(() => setitems(file), [file]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragOver(event, targetItem) {

    const { active, over } = event;

    if (activeId !== over.id) {
      setitems((items) => {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
        <DndContext
          sensors={sensors}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          modifiers={[restrictToVerticalAxis]}
        >
          <div className="sortable-list">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item} id={item} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
  );

}
export default DndContainer;