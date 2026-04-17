import React, { useState, useEffect } from "react";

const CustomTicketBuilder = ({ onTicketCreated, onClose }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentRow, setCurrentRow] = useState(0); // 0, 1, 2
  const [ticketRows, setTicketRows] = useState([
    Array(9).fill(0),
    Array(9).fill(0),
    Array(9).fill(0)
  ]);
  const [error, setError] = useState("");
  const [ticketPrice] = useState(50);

  // Column ranges as per Tambola rules
  const columnRanges = [
    { min: 1, max: 9 },      // Column 0
    { min: 10, max: 19 },    // Column 1
    { min: 20, max: 29 },    // Column 2
    { min: 30, max: 39 },    // Column 3
    { min: 40, max: 49 },    // Column 4
    { min: 50, max: 59 },    // Column 5
    { min: 60, max: 69 },    // Column 6
    { min: 70, max: 79 },    // Column 7
    { min: 80, max: 90 }     // Column 8 (11 numbers)
  ];

  // Generate available numbers for each column
  const getColumnNumbers = (colIndex) => {
    const range = columnRanges[colIndex];
    const numbers = [];
    for (let i = range.min; i <= range.max; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  // Check if number is already used in ticket
  const isNumberUsed = (number) => {
    return ticketRows.some(row => row.includes(number));
  };

  // Get row count for a specific row
  const getRowCount = (rowIndex) => {
    return ticketRows[rowIndex].filter(num => num !== 0).length;
  };

  // Get column count for a specific column
  const getColumnCount = (colIndex) => {
    return ticketRows.reduce((count, row) => {
      return count + (row[colIndex] !== 0 ? 1 : 0);
    }, 0);
  };

  // Handle number selection
  const handleNumberSelect = (rowIndex, colIndex, number) => {
    // Check if number already used
    if (isNumberUsed(number)) {
      setError("This number is already used in your ticket!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Check row limit (max 5 numbers per row)
    if (getRowCount(rowIndex) >= 5 && !ticketRows[rowIndex][colIndex]) {
      setError(`Row ${rowIndex + 1} already has 5 numbers!`);
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Check column limit (max 3 numbers per column)
    if (getColumnCount(colIndex) >= 3 && !ticketRows[rowIndex][colIndex]) {
      setError(`Column ${colIndex + 1} already has 3 numbers!`);
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Update ticket
    const newRows = [...ticketRows];
    newRows[rowIndex][colIndex] = number;
    setTicketRows(newRows);
    setSelectedNumbers([...selectedNumbers, number]);
  };

  // Handle number removal
  const handleNumberRemove = (rowIndex, colIndex) => {
    const number = ticketRows[rowIndex][colIndex];
    if (number === 0) return;

    const newRows = [...ticketRows];
    newRows[rowIndex][colIndex] = 0;
    setTicketRows(newRows);
    setSelectedNumbers(selectedNumbers.filter(n => n !== number));
  };

  // Random ticket generation (as per rules)
  const generateRandomTicket = () => {
    const newRows = [
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0)
    ];
    const usedNumbers = new Set();

    // Generate 15 numbers (5 per row)
    for (let row = 0; row < 3; row++) {
      // Select 5 random columns for this row
      const availableCols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const selectedCols = [];
      
      while (selectedCols.length < 5) {
        const randomIndex = Math.floor(Math.random() * availableCols.length);
        const col = availableCols[randomIndex];
        
        // Check column limit (max 3 numbers per column)
        const colCount = newRows.reduce((count, r) => count + (r[col] !== 0 ? 1 : 0), 0);
        if (colCount < 3) {
          selectedCols.push(col);
          availableCols.splice(randomIndex, 1);
        }
      }

      // Assign random numbers to selected columns
      selectedCols.forEach(col => {
        const range = columnRanges[col];
        let number;
        do {
          number = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        } while (usedNumbers.has(number));
        
        usedNumbers.add(number);
        newRows[row][col] = number;
      });
    }

    // Sort numbers within each column (ascending order)
    for (let col = 0; col < 9; col++) {
      const colNumbers = [
        newRows[0][col],
        newRows[1][col],
        newRows[2][col]
      ].filter(n => n !== 0).sort((a, b) => a - b);
      
      let index = 0;
      for (let row = 0; row < 3; row++) {
        if (newRows[row][col] !== 0) {
          newRows[row][col] = colNumbers[index++];
        }
      }
    }

    setTicketRows(newRows);
    setSelectedNumbers(Array.from(usedNumbers));
  };

  // Validate complete ticket
  const validateTicket = () => {
    // Check 15 numbers total
    const totalNumbers = ticketRows.flat().filter(n => n !== 0).length;
    if (totalNumbers !== 15) {
      setError(`Ticket must have exactly 15 numbers (currently ${totalNumbers})`);
      return false;
    }

    // Check 5 per row
    for (let row = 0; row < 3; row++) {
      const rowCount = getRowCount(row);
      if (rowCount !== 5) {
        setError(`Row ${row + 1} must have exactly 5 numbers (currently ${rowCount})`);
        return false;
      }
    }

    // Check column limits (max 3)
    for (let col = 0; col < 9; col++) {
      const colCount = getColumnCount(col);
      if (colCount > 3) {
        setError(`Column ${col + 1} has too many numbers (max 3)`);
        return false;
      }
    }

    // Check ascending order in columns
    for (let col = 0; col < 9; col++) {
      const colNumbers = [
        ticketRows[0][col],
        ticketRows[1][col],
        ticketRows[2][col]
      ].filter(n => n !== 0);
      
      for (let i = 1; i < colNumbers.length; i++) {
        if (colNumbers[i] <= colNumbers[i - 1]) {
          setError(`Column ${col + 1} numbers must be in ascending order`);
          return false;
        }
      }
    }

    setError("");
    return true;
  };

  // Create ticket
  const handleCreateTicket = () => {
    if (validateTicket()) {
      const ticketData = {
        id: Date.now(),
        numbers: ticketRows,
        isCustom: true,
        price: ticketPrice,
        createdAt: new Date().toISOString()
      };
      onTicketCreated(ticketData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4]">
                🎫 Create Your Custom Ticket
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-1">
                Select 15 numbers (5 per row) • Column rules apply
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              ✕
            </button>
          </div>

          {/* Row Selector */}
          <div className="flex gap-2 mt-4">
            {[0, 1, 2].map((row) => (
              <button
                key={row}
                onClick={() => setCurrentRow(row)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                  currentRow === row
                    ? 'bg-[#FBEFA4] text-[#004296]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Row {row + 1} ({getRowCount(row)}/5)
              </button>
            ))}
            <button
              onClick={generateRandomTicket}
              className="ml-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-sm"
            >
              🎲 Random Ticket
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Ticket Builder */}
        <div className="p-4 sm:p-6">
          {/* Current Ticket Preview */}
          <div className="bg-white rounded-2xl p-4 mb-6">
            <h3 className="text-[#004296] font-bold mb-3">Your Ticket</h3>
            <div className="space-y-2">
              {ticketRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-9 gap-1">
                  {row.map((num, colIndex) => (
                    <div
                      key={colIndex}
                      onClick={() => num !== 0 && handleNumberRemove(rowIndex, colIndex)}
                      className={`aspect-square flex items-center justify-center text-sm font-bold rounded border-2 transition-all cursor-pointer
                        ${num !== 0 
                          ? 'bg-[#004296] text-[#FBEFA4] border-[#FBEFA4] hover:bg-red-500 hover:text-white' 
                          : 'bg-gray-100 text-gray-400 border-gray-300'
                        }`}
                    >
                      {num !== 0 ? num : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-2 text-center">
              Click on a number to remove it
            </p>
          </div>

          {/* Number Selector Grid */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-[#FBEFA4]/30">
            <h3 className="text-[#FBEFA4] font-bold mb-3">
              Select Numbers for Row {currentRow + 1}
            </h3>
            
            <div className="grid grid-cols-9 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((colIndex) => {
                const numbers = getColumnNumbers(colIndex);
                const currentValue = ticketRows[currentRow][colIndex];
                const isColFull = getColumnCount(colIndex) >= 3;
                
                return (
                  <div key={colIndex} className="space-y-1">
                    <p className="text-white/60 text-[10px] text-center">
                      Col {colIndex + 1}
                    </p>
                    <select
                      value={currentValue || ''}
                      onChange={(e) => {
                        const num = parseInt(e.target.value);
                        if (num) {
                          handleNumberSelect(currentRow, colIndex, num);
                        }
                      }}
                      disabled={isColFull && !currentValue}
                      className={`w-full p-1 text-xs rounded border ${
                        currentValue 
                          ? 'bg-[#FBEFA4] text-[#004296] border-[#004296]'
                          : 'bg-white/10 text-white border-white/20'
                      } ${isColFull && !currentValue ? 'opacity-50' : ''}`}
                    >
                      <option value="">--</option>
                      {numbers.map((num) => (
                        <option
                          key={num}
                          value={num}
                          disabled={isNumberUsed(num)}
                          className={isNumberUsed(num) ? 'text-gray-400' : ''}
                        >
                          {num} {isNumberUsed(num) ? '(Used)' : ''}
                        </option>
                      ))}
                    </select>
                    <p className="text-white/40 text-[8px] text-center">
                      {columnRanges[colIndex].min}-{columnRanges[colIndex].max}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rules Summary */}
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <h4 className="text-[#FBEFA4] font-bold text-sm mb-2">📋 Ticket Rules:</h4>
            <ul className="text-white/80 text-xs space-y-1">
              <li>• Each row must have exactly 5 numbers</li>
              <li>• Each column can have maximum 3 numbers</li>
              <li>• Numbers in each column must be in ascending order</li>
              <li>• No number can be repeated in the ticket</li>
              <li>• Total 15 numbers in the ticket</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreateTicket}
              className="flex-1 bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-3 rounded-xl font-bold text-lg"
            >
              Create Ticket • ₹{ticketPrice}
            </button>
            <button
              onClick={onClose}
              className="px-6 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTicketBuilder;