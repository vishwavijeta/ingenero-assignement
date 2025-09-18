import { useAppStore } from '../store/useAppStore'

export const useActionButtons = () => {
  const selectedElements = useAppStore(state => state.selectedElements)
  const selectedChecklistCount = useAppStore(state => state.selectedChecklistCount)
  const showConfirmationModal = useAppStore(state => state.showConfirmationModal)

  const hasSelectedElements = selectedElements.length > 0

  const handleSendToRepair = () => {
    showConfirmationModal('repair')
  }

  const handleReadyToAssemble = () => {
    showConfirmationModal('assemble')
  }

  const isSendToRepairEnabled = selectedChecklistCount > 0
  const isReadyToAssembleEnabled = selectedChecklistCount === 0

  return {
    hasSelectedElements,
    isSendToRepairEnabled,
    isReadyToAssembleEnabled,
    handleSendToRepair,
    handleReadyToAssemble
  }
}
