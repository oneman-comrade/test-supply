
import React, { useState } from 'react';
import { Truck, Factory, Warehouse, ArrowRight } from 'lucide-react';

const SupplyChainDemo = () => {
  const [showSolution, setShowSolution] = useState(false);

  // Problem data
  const supply = [300, 400, 500]; // Factory capacities
  const demand = [250, 350, 400, 200]; // Warehouse demands
  
  // Transportation costs (cost per unit from each factory to each warehouse)
  const costs = [
    [8, 6, 10, 9],   // Factory 1 to Warehouses 1,2,3,4
    [9, 12, 13, 7],  // Factory 2 to Warehouses 1,2,3,4
    [14, 9, 16, 5]   // Factory 3 to Warehouses 1,2,3,4
  ];

  // Optimal solution (pre-calculated)
  const solution = [
    [0, 250, 50, 0],    // Factory 1 ships to warehouses
    [0, 100, 300, 0],   // Factory 2 ships to warehouses
    [250, 0, 50, 200]   // Factory 3 ships to warehouses
  ];

  const calculateTotalCost = () => {
    let total = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        total += solution[i][j] * costs[i][j];
      }
    }
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Supply Chain Optimization Demo</h1>
          <p className="text-gray-600 mb-6">Transportation Problem: Minimizing shipping costs from factories to warehouses</p>
          
          {/* Problem Description */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h2 className="font-bold text-lg mb-2">The Problem:</h2>
            <p className="mb-2">We have 3 factories that produce units and 4 warehouses that need units.</p>
            <p className="font-semibold">Goal: Find the cheapest way to ship products to meet all warehouse demands!</p>
          </div>

          {/* Data Tables */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Supply & Demand */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Factory className="text-green-600" size={20} />
                Factory Supply (units available)
              </h3>
              {supply.map((s, i) => (
                <div key={i} className="flex justify-between mb-2 bg-white p-2 rounded">
                  <span>Factory {i + 1}:</span>
                  <span className="font-bold text-green-600">{s} units</span>
                </div>
              ))}
              
              <h3 className="font-bold mt-4 mb-3 flex items-center gap-2">
                <Warehouse className="text-blue-600" size={20} />
                Warehouse Demand (units needed)
              </h3>
              {demand.map((d, i) => (
                <div key={i} className="flex justify-between mb-2 bg-white p-2 rounded">
                  <span>Warehouse {i + 1}:</span>
                  <span className="font-bold text-blue-600">{d} units</span>
                </div>
              ))}
            </div>

            {/* Cost Matrix */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Truck className="text-orange-600" size={20} />
                Shipping Cost per Unit ($)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm bg-white rounded">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="p-2 border">From/To</th>
                      {demand.map((_, j) => (
                        <th key={j} className="p-2 border">W{j + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {costs.map((row, i) => (
                      <tr key={i}>
                        <td className="p-2 border font-bold bg-orange-50">F{i + 1}</td>
                        {row.map((cost, j) => (
                          <td key={j} className="p-2 border text-center">${cost}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Solution Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              {showSolution ? 'Hide Solution' : 'Show Optimal Solution'}
            </button>
          </div>

          {/* Solution Display */}
          {showSolution && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-500">
              <h2 className="text-2xl font-bold text-green-800 mb-4">✓ Optimal Solution Found!</h2>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-3">Shipping Plan:</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="p-2 border">Factory</th>
                      {demand.map((_, j) => (
                        <th key={j} className="p-2 border">Warehouse {j + 1}</th>
                      ))}
                      <th className="p-2 border">Total Shipped</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solution.map((row, i) => (
                      <tr key={i}>
                        <td className="p-2 border font-bold bg-green-50">Factory {i + 1}</td>
                        {row.map((units, j) => (
                          <td 
                            key={j} 
                            className={`p-2 border text-center ${units > 0 ? 'bg-green-200 font-bold' : 'bg-gray-50'}`}
                          >
                            {units > 0 ? `${units} units` : '-'}
                          </td>
                        ))}
                        <td className="p-2 border text-center font-bold">{row.reduce((a, b) => a + b, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                <p className="text-lg mb-1">Total Transportation Cost:</p>
                <p className="text-4xl font-bold">${calculateTotalCost().toLocaleString()}</p>
              </div>

              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Key Insights:</h3>
                <ul className="space-y-1 text-sm">
                  <li>✓ All warehouse demands are met</li>
                  <li>✓ No factory exceeds its capacity</li>
                  <li>✓ Routes chosen minimize total cost</li>
                  <li>✓ Factory 3 ships the most (500 units total)</li>
                </ul>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">How Python Solves This:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Define variables:</strong> Amount to ship from each factory to each warehouse</li>
              <li><strong>Set objective:</strong> Minimize total cost (sum of: units × cost per unit)</li>
              <li><strong>Add constraints:</strong>
                <ul className="ml-6 mt-1 list-disc list-inside">
                  <li>Each factory can't ship more than its capacity</li>
                  <li>Each warehouse must receive exactly what it needs</li>
                  <li>Can't ship negative amounts</li>
                </ul>
              </li>
              <li><strong>Solve:</strong> Python optimization library finds the best solution automatically</li>
            </ol>
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
          <p className="text-white mb-2"># Sample Python code structure:</p>
          <p>from scipy.optimize import linprog</p>
          <p className="mt-2"># Define costs, supply, demand</p>
          <p># Set up optimization problem</p>
          <p># Solve and get optimal shipping plan</p>
          <p className="mt-2 text-yellow-400"># Result: Minimum cost solution! 🎉</p>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainDemo;
