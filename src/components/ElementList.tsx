import React from 'react';
import { useAppStore } from '../store/useAppStore';
import type { ElementPart } from '../types';
import RightPanel from './RightPanel';

const ElementList = () => {
  const selectedElectrolyzer = useAppStore(state => state.selectedElectrolyzer)
  const selectedElements = useAppStore(state => state.selectedElements)
  const selectElement = useAppStore(state => state.selectElement)
  const selectAllElements = useAppStore(state => state.selectAllElements)
  const isAllSelected = useAppStore(state => state.isAllSelected)


  if (!selectedElectrolyzer) {
    return null
  }

  const getStatusButton = (element: ElementPart) => {
    if (element.status === 'ready-for-repair') {
      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">Ready for Repair</span>
      );
    }
    if (element.status === 'ready-for-assemble') {
      return (
        <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">Ready for Assemble</span>
      );
    }
    return null;
  };

  return (
    <div className='bg-white flex flex-col'>
      <h4 className="text-lg font-semibold text-gray-800 bg-zinc-400 px-4 py-2">
        Electrolyzer Id: {selectedElectrolyzer.id}
      </h4>
      <div className="flex flex-row gap-4">
        {/* Element Table */}
        {/* <div style={{ flex: 3 }} className=" bg-zinc-200 rounded-lg shadow-sm border border-gray-200 overflow-hidden"> */}
        <div style={{ flex: 2.5 }} className=" bg-zinc-200 overflow-hidden">

          {/* <div className="px-4 py-3 border-b border-gray-200"> */}
          <div className="pl-4 py-3">

            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2 font-semibold text-black text-sm">Position</div>
              <div className="col-span-4 font-semibold text-black text-sm">Element part ID</div>
              <div className="col-span-6 font-semibold text-black text-sm flex items-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={selectAllElements}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-black text-sm"
                />
                Select all
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {selectedElectrolyzer.elements.map((element) => {
              const isSelected = selectedElements.some(sel => sel.id === element.id);
              const isDisabled = element.status !== 'default';

              return (
                <div
                  key={element.id}
                  className={`pl-4 py-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-orange-50' : ''
                    } ${isDisabled ? 'opacity-60' : ''}`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 text-gray-700 text-center">{element.position}</div>
                    <div className="col-span-4 flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => selectElement(element)}
                        disabled={isDisabled}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className={`font-medium ${isSelected ? 'text-orange-800' : 'text-gray-700'}`}>
                        {element.id}
                      </span>
                    </div>
                    <div className="col-span-6">
                      {getStatusButton(element)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 5 }}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default ElementList;
