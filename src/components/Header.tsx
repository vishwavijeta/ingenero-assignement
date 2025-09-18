import React from 'react';

const Header = () => {
  return (
    // add div with display flex and flex-col
    <div className="text-black flex flex-col gap-2">
      <div className="flex justify-between items-center bg-zinc-400 p-4  px-8">
        <div>
          <h1 className="text-xl font-semibold">Tephram Assent Management Solution</h1>
        </div>
        {/* <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-300">CC-MS → TEPHRAM Diaphragm</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-sm font-semibold">
              JD
            </div>
            <div className="text-sm">
              <div>Diso</div>
              <div className="text-gray-300">Cell Renewal Group</div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-2 bg-zinc-400 p-2  px-4">
        <h3 className="text-lg">Disassembly Electrolyzer</h3>
      </div>
    </div>
  );
};

export default Header;
