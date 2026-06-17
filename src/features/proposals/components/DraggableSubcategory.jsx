import { memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';

const DraggableSubcategory = memo(({ sub, index }) => {
  return (
    <Draggable draggableId={sub.id} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-4 border-b border-gray-100 last:border-b-0 flex gap-4 items-start bg-white transition-colors ${snapshot.isDragging ? 'shadow-lg ring-1 ring-black/5 z-50' : 'hover:bg-gray-50'}`}
        >
          <span 
            {...provided.dragHandleProps} 
            className="text-gray-300 text-lg mt-0.5 cursor-grab active:cursor-grabbing hover:text-black"
          >
            ☰
          </span>
          <div className="flex-1">
            <h5 className="text-sm font-bold text-black">{sub.title}</h5>
            <p className="text-xs text-gray-600 mt-1 mb-2">{sub.description}</p>
            {sub.services && sub.services.length > 0 && (
              <ul className="ml-2 pl-3 border-l border-green-200 space-y-1">
                {sub.services.map(srv => (
                  <li key={srv.id} className="text-xs font-medium text-green-700">
                    • {srv.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
});

DraggableSubcategory.displayName = 'DraggableSubcategory';
export default DraggableSubcategory;