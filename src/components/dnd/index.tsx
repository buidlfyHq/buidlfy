import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data } from "./data";

const Dnd = () => {
  const [items, setItems] = useState([]);

  const onDragEnd = (result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      // dispatch({
      //   type: "MOVE",
      //   from: result.source.droppableId,
      //   to: result.destination.droppableId,
      //   fromIndex: result.source.index,
      //   toIndex: result.destination.index,
      // });
      if (
        result.source.droppableId === "component" &&
        result.destination.droppableId === "builder"
      ) {
        setItems([...items, data[result.source.index]]);
      }
    }
  };

  return (
    <div className="flex flex-row h-screen p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="component" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  `bg-zinc-600 w-1/3 px-4 min-w-1/4 max-w-1/2 ` +
                  (snapshot.isDraggingOver && "bg-gray-100")
                }
              >
                {data?.map((person, index) => {
                  return (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100 ` +
                              (snapshot.isDragging && "bg-gray-300")
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex items-center space-x-3 text-base">
                              <div className="inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700" />
                              <span>
                                {person.name.first} {person.name.last}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Droppable droppableId="builder" type="PERSON">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={
                  `bg-pink-600 w-1/3 px-4 min-w-1/4 max-w-1/2 ` +
                  (snapshot.isDraggingOver && "bg-gray-100")
                }
              >
                {items?.map((person, index) => {
                  return (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100 ` +
                              (snapshot.isDragging && "bg-gray-300")
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex items-center space-x-3 text-base">
                              <div className="inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700" />
                              <span>
                                {person.name.first} {person.name.last}
                              </span>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dnd;
