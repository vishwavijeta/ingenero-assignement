import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { useElectrolyzers } from '../hooks/useElectrolyzers';

const ElectrolyzerList = () => {
  const selectedElectrolyzer = useAppStore(state => state.selectedElectrolyzer)
  const searchTerm = useAppStore(state => state.searchTerm)
  const setSearchTerm = useAppStore(state => state.setSearchTerm)
  const selectElectrolyzer = useAppStore(state => state.selectElectrolyzer)
  
  const filteredElectrolyzers = useElectrolyzers();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Electrolyzers ID</h3>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Electrolyzer ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          // className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black bg-white"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black bg-white text-zinc-600"
        />
      </div>

      {/* Electrolyzer List */}
      <div className="flex flex-col gap-2">
        {filteredElectrolyzers.map((electrolyzer) => (
          <button
            key={electrolyzer.id}
            onClick={() => selectElectrolyzer(electrolyzer)}
            style={{
              width: '200px',
            }}
            className={`p-3 text-left rounded-lg border-2 transition-all duration-200  focus:outline-none   ${
              selectedElectrolyzer?.id === electrolyzer.id
                ? 'bg-rose-100 border-rose-400 border-dashed text-rose-800'
                : 'bg-zinc-300 border-gray-200 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span className="font-medium">{electrolyzer.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElectrolyzerList;
