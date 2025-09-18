import React from 'react';
import { useAppStore } from '../store/useAppStore';

const CommentsSection = () => {
  const selectedElements = useAppStore(state => state.selectedElements)
  const comments = useAppStore(state => state.comments)
  const updateComment = useAppStore(state => state.updateComment)
  if (selectedElements.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-200 p-4">
      <div className="grid grid-cols-12">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 col-span-3">Element Part ID</h3>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 col-span-9">Comments</h3>
</div>
      
      
      {/* <div className="space-y-4 grid grid-cols-12 gap-4"> */}
        {selectedElements.map((element) => {
          const comment = comments.find(c => c.elementId === element.id);
          // return (
          //   <div key={element.id} className="border border-gray-200 rounded-lg p-4">
          //     <div className="mb-2">
          //       <span className="font-medium text-gray-700">{element.id}</span>
          //     </div>
          //     <textarea
          //       value={comment?.comment || ''}
          //       onChange={(e) => updateComment(element.id, e.target.value)}
          //       placeholder="Write your comment"
          //       className="w-full h-20 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          //     />
          //   </div>
          // );
          return (
            <div key={element.id} className="grid grid-cols-12 gap-4 flex items-center mt-2">
              <div className="col-span-3">
                <span className="font-medium text-gray-700">{element.id}</span>
              </div>
              <input
                value={comment?.comment || ''}
                onChange={(e) => updateComment(element.id, e.target.value)}
                placeholder="Write your comment"
                className="text-black w-full p-2 border border-gray-300 roundedocus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 col-span-9"
              />
            </div>
          );
        })}
      {/* </div> */}
    </div>
  );
};

export default CommentsSection;
