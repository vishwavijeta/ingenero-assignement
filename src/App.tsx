import React from 'react'
import { useAppStore } from './store/useAppStore'
import Header from './components/Header'
import ElectrolyzerList from './components/ElectrolyzerList'
import ElementList from './components/ElementList'
import ConfirmationModal from './components/ConfirmationModal'

function App() {
  const selectedElectrolyzer = useAppStore(state => state.selectedElectrolyzer)

  return (
    <div className="h-screen w-screen bg-neutral-50 flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Electrolyzer List */}
        <div className="w-80 bg-gray-50 border-r border-gray-300 p-6 overflow-auto">
          <ElectrolyzerList />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Panel - Element List */}
          <div className="flex-1  p-6 overflow-auto">
            {selectedElectrolyzer ? (
              <ElementList />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="bg-indigo-400 rounded-lg p-4">

                    <p className="text-black font-bold">
                      Select an Electrolyzer ID and then Select one or more element part ID to start disassembly
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  )
}

export default App
