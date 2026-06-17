import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DraggableSubcategory from './DraggableSubcategory';

export default function DraggableCategoryList({ categories, setFinalSelection }) {
  const [collapsedCats, setCollapsedCats] = useState(new Set());

  const toggleCollapseAll = useCallback(() => {
    if (collapsedCats.size === categories.length && categories.length > 0) {
      setCollapsedCats(new Set());
    } else {
      setCollapsedCats(new Set(categories.map(cat => cat.id)));
    }
  }, [categories, collapsedCats]);

  const toggleCollapse = useCallback((id) => {
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onDragEnd = useCallback((result) => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'category') {
      const newCats = Array.from(categories);
      const [removed] = newCats.splice(source.index, 1);
      newCats.splice(destination.index, 0, removed);
      setFinalSelection(newCats);
      return;
    }

    if (type === 'subcategory') {
      const sourceCatId = source.droppableId.replace('cat-', '');
      const destCatId = destination.droppableId.replace('cat-', '');

      if (sourceCatId !== destCatId) return;

      const catIndex = categories.findIndex(c => c.id === sourceCatId);
      const newCats = [...categories];
      const newSubs = Array.from(newCats[catIndex].subcategories);
      const [removed] = newSubs.splice(source.index, 1);
      newSubs.splice(destination.index, 0, removed);
      
      newCats[catIndex] = { ...newCats[catIndex], subcategories: newSubs };
      setFinalSelection(newCats);
    }
  }, [categories, setFinalSelection]);

  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Voci a Capitolato (Trascina per riordinare)
        </h3>
        <button 
          onClick={toggleCollapseAll} 
          className="text-xs font-medium text-gray-500 hover:text-black underline underline-offset-4"
        >
          {collapsedCats.size === categories.length && categories.length > 0 ? 'Espandi Tutto' : 'Comprimi Tutto'}
        </button>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="category">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps} 
              className="space-y-6 max-h-150 overflow-y-auto pr-4 custom-scrollbar"
            >
              {categories.map((cat, catIndex) => (
                <Draggable key={cat.id} draggableId={cat.id} index={catIndex}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`border border-gray-200 rounded-sm bg-white ${snapshot.isDragging ? 'shadow-xl ring-1 ring-black/10' : ''}`}
                    >
                      <div className="bg-gray-200 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span 
                            {...provided.dragHandleProps} 
                            className="text-gray-400 text-lg cursor-grab active:cursor-grabbing hover:text-black"
                          >
                            ☰
                          </span>
                          <h4 className="text-sm font-bold text-gray-700 uppercase">{cat.title}</h4>
                        </div>
                        <button 
                          onClick={() => toggleCollapse(cat.id)} 
                          className="text-gray-500 hover:text-black px-2 text-xs font-bold tracking-wider"
                        >
                          {collapsedCats.has(cat.id) ? '▼ ESPANDI' : '▲ COMPRIMI'}
                        </button>
                      </div>
                      
                      {!collapsedCats.has(cat.id) && (
                        <Droppable droppableId={`cat-${cat.id}`} type="subcategory">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col min-h-2.5">
                              {cat.subcategories.map((sub, subIndex) => (
                                <DraggableSubcategory key={sub.id} sub={sub} index={subIndex} />
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}