import React from 'react';
import { useAppStore } from '../store/useAppStore';

const ConfirmationModal = () => {
  const showModal = useAppStore(state => state.showModal)
  const modalType = useAppStore(state => state.modalType)
  const selectedElements = useAppStore(state => state.selectedElements)
  const confirmAction = useAppStore(state => state.confirmAction)
  const hideModal = useAppStore(state => state.hideModal)

  if (!showModal || !modalType) {
    return null
  }
  const elementIds = selectedElements.map(el => el.id).join(', ');
  const statusText = modalType === 'repair' ? 'Ready for Repair' : 'Ready for Assembly';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header Section */}
        <div className="flex justify-between items-center  border-b border-gray-300 px-4">
          <h3 className="text-lg font-semibold text-gray-800">Confirm Status</h3>
          <button
            onClick={hideModal}
            className="text-gray-400 hover:text-gray-600 text-xl font-light bg-white hover:border-none focus:border-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content Section */}
        <div className="py-6 px-4">
          <p className="text-gray-700">
            Update Status of Element Part ID <span className="font-bold">{elementIds}</span> to "<span className="font-bold">{statusText}</span>"
          </p>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-end pt-4 border-t border-gray-300 px-4 py-4">
          <button
            onClick={hideModal}
            className="px-4 py-2 text-orange-500 rounded-md transition-colors bg-white hover:border-none focus:border-none"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors ml-3"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //     <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
  //       <div className="flex justify-between items-center">
  //         <h3 className="text-lg font-semibold text-gray-800">Confirm Status</h3>
  //         <button
  //           onClick={hideModal}
  //           className="text-gray-400 hover:text-gray-600 text-xl bg-white"
  //         >
  //           ×
  //         </button>
  //       </div>

  //       {/* add horizontal line */}
  //       <div className="border-t border-gray-400"></div>

  //       <div className="mb-6">
  //         <p className="text-gray-700">
  //           Update Status of Element Part ID {elementIds} to "{statusText}"
  //         </p>
  //       </div>

  //       <div className="border-t border-gray-400"></div>

  //       <div className="flex justify-end">
  //         <button
  //           onClick={hideModal}
  //           className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           onClick={confirmAction}
  //           className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
  //         >
  //           Confirm
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ConfirmationModal;
