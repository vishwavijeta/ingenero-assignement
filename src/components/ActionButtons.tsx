import React from 'react'
import { useActionButtons } from '../hooks/useActionButtons'

const ActionButtons = () => {
  const {
    hasSelectedElements,
    isSendToRepairEnabled,
    isReadyToAssembleEnabled,
    handleSendToRepair,
    handleReadyToAssemble
  } = useActionButtons()

  if (!hasSelectedElements) {
    return null
  }

  return (
    <div className="flex space-x-3 pt-4 border-t border-gray-200">
      <button
        onClick={handleSendToRepair}
        disabled={!isSendToRepairEnabled}
        className={`flex-1 px-4 py-3 font-semibold transition-colors ${isSendToRepairEnabled
            ? 'bg-black hover:bg-gray-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Send to Repair
      </button>
      <button
        onClick={handleReadyToAssemble}
        disabled={!isReadyToAssembleEnabled}
        className={`flex-1 px-4 py-3 font-semibold transition-colors ${isReadyToAssembleEnabled
            ? 'bg-black hover:bg-gray-800 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Ready to Assemble
      </button>
    </div>
  )
}

export default ActionButtons
