
import "./dnd-container.css";

import {
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState, useMemo } from "react";

import { fuckfuckfuck } from "./parsons.js";

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    background: props.grade,
    userSelect:"none"
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
  var initial = "# Your Name\n" 
    + "# 8/15/20**\n" 
    + "# Countdown\n" 
    + "print(\"Five...\")\n" 
    + "print(\"Four...\")\n" 
    + "print(\"Three...\")\n" 
    + "print(\"Two...\")\n" 
    + "print(\"One...\")\n" 
    + "print(\"Blastoff!\")\n" 
    + "input(\"\n\nPress the enter key to exit\")"; 
  var parsonsPuzzle = new fuckfuckfuck.ParsonsWidget(
    { "sortableId": "sortable", 
    "max_wrong_lines": 10, 
    "grader": fuckfuckfuck.ParsonsWidget._graders.LineBasedGrader, 
    "exec_limit": 2500, 
    "can_indent": true, 
    "x_indent": 50, 
    "lang": "en", 
    "show_feedback": true }); 
  useEffect(() => {
    parsonsPuzzle.init(initial); 
    parsonsPuzzle.shuffleLines(); 
  }, [])

  function handleShuffle(event) {
    event.preventDefault();
    parsonsPuzzle.shuffleLines(); 
  } 
  function handleGrade(event) { 
    event.preventDefault(); 
    parsonsPuzzle.getFeedback();  
  } 

  return (
    <>
      <body>
        <main id="content" class="main-content" role="main">
          { 

          }
        </main>
      </body>

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