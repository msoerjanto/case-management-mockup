// DraggableState.jsx
import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Move } from 'lucide-react';

export function DraggableState({ state, moveState, handleStateClick, onPositionChange }) {
  const stateRef = useRef(null);

  useEffect(() => {
    if (stateRef.current) {
      const rect = stateRef.current.getBoundingClientRect();
      onPositionChange(state.id, rect);
    }
  }, [state.position, state.row]);

  const [{ isDragging }, drag] = useDrag({
    type: 'STATE',
    item: { id: state.id, row: state.row, position: state.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(stateRef);

  return (
    <div 
      ref={stateRef}
      style={{
        width: '200px',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div 
        className={`
          relative z-10 px-6 py-3 rounded-lg border-2 cursor-move
          transition-all duration-200 ease-in-out hover:shadow-md
          ${state.color}
        `}
        onClick={(e) => {
          e.preventDefault();
          handleStateClick(state);
        }}
      >
        <div className="font-medium flex items-center gap-2">
          <Move className="w-4 h-4" />
          {state.name}
        </div>
      </div>
    </div>
  );
}