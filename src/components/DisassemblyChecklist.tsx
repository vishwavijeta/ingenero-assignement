import React from 'react';
import { useAppStore } from '../store/useAppStore';

const DisassemblyChecklist = () => {
  const checklist = useAppStore(state => state.checklist)
  const selectedChecklistCount = useAppStore(state => state.selectedChecklistCount)
  const toggleChecklistItem = useAppStore(state => state.toggleChecklistItem)
  const clearChecklistSelection = useAppStore(state => state.clearChecklistSelection)
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          Disassembly Checklist
          {selectedChecklistCount > 0 && (
            <div className="ml-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
              {selectedChecklistCount}
            </div>
          )}
        </h3>
        {selectedChecklistCount > 0 && (
          <button
            onClick={clearChecklistSelection}
            className="text-blue-600 hover:text-blue-800 text-sm underline bg-white hover:border-none focus:border-none"
          >
            Clear Selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {checklist.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleChecklistItem(item.id)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${item.isSelected
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisassemblyChecklist;
