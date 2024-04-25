import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import "./index.css";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { Grade, Shuffle } from "./dnd-grading";
import { fileContext } from "./fileContext.js";
import "./index.css";
import { snapGridModifier } from "./snapGridModifier.ts";

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
    transition,
    background: props.grade
  };

  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {"⠿ " + props.id.name}
    </div>
  );
}
export const DndContainer = () => {
  const {file, setFile} = React.useContext(fileContext);
  const [items, setItems] = useState(Shuffle(file));
  const [activeId, setActiveId] = useState(null);
  const [grade, setGrade] = useState(Grade(items));

  useEffect(() => { //randomize positions & reset grade for any change in the chosen file
    resetGrade();
    setItems(Shuffle(file));
  }, [file])

  function handleGrade() {
    setGrade(Grade(items));
  }
  function resetGrade() {
    setGrade(new Array(""));
  }
  function handleShuffle() {
    resetGrade();
    setItems(Shuffle(items));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragOver(event, targetItem) {

    const { active, over } = event;

    if (activeId !== over.id) {
      setItems((items) => {
        resetGrade();
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  /**
   * 1) correct num indents is stored in the problem file
   * 2) CURRENT num indents is .... known by....the items array?
   * 3) render flexbox to the left of the element 
   */
  return (
    <>
      <div className="sortable-list">
          <DndContext
            sensors={sensors}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            modifiers={[snapGridModifier]}
            
          >
              <SortableContext
                items={items}
              >
                {items.map((item, index) => (
                  <SortableItem 
                    key={item} 
                    id={item}
                    index={index}
                    grade={grade[item.id]}
                  />
                ))}
              </SortableContext>

          </DndContext>
          
      </div>

      <div class = "container text-center">
      <div class="row mt-3">
          <div class="col-md-2">
            <button 
              class = "button"
              onClick = {handleShuffle}
            >
              Shuffle
            </button>
          </div>
          <div class="col-md-2">
            <button 
              class = "button"
              onClick = {handleGrade}
            >
              Check
            </button>
          </div>
      </div>
      </div>
    </>
  );

}
export default DndContainer;