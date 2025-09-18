import React from 'react'
import { useAppStore } from '../store/useAppStore'
import DisassemblyChecklist from './DisassemblyChecklist'
import CommentsSection from './CommentsSection'
import ActionButtons from './ActionButtons'

const RightPanel = () => {
  const selectedElectrolyzer = useAppStore(state => state.selectedElectrolyzer)
  const cutOutComments = useAppStore(state => state.cutOutComments)
  const updateCutOutComments = useAppStore(state => state.updateCutOutComments)

  if (!selectedElectrolyzer) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-600">
          <p>Select an electrolyzer to view checklist and comments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cut Out Comments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cut Out Comments</h3>
        <textarea
          value={cutOutComments}
          onChange={(e) => updateCutOutComments(e.target.value)}
          placeholder="Cut out Comments here"
          className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
      </div>

      {/* Disassembly Checklist */}
      <DisassemblyChecklist />

      {/* Comments Section */}
      <CommentsSection />

      {/* Action Buttons */}
      <ActionButtons />
    </div>
  )
}

export default RightPanel
