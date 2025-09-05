import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Product categories with their GST rates and conditions
interface Category {
  id: string;
  name: string;
  products: Product[];
}

const PRODUCT_CATEGORIES: Category[] = [
  {
    id: 'food-beverages',
    name: 'Food & Beverages',
    products: [
      { name: 'UHT Milk', rate: 0, conditions: 'Exempt' },
      { name: 'Plant-Based Milk Drinks', rate: 5, conditions: 'e.g., almond, oat milk' },
      { name: 'Soya Milk Drinks', rate: 5, conditions: '' },
      { name: 'Indian Breads', rate: 0, conditions: 'e.g., roti, paratha, porotta' },
      { name: 'Food Preparations', rate: 5, conditions: 'not elsewhere specified' },
      { name: 'Paneer (Cottage Cheese)', rate: 0, conditions: 'pre-packaged & labelled form' },
      { name: 'Natural Honey', rate: 0, conditions: 'promotional rate - exempt to promote over artificial honey' },
      { name: 'Carbonated Beverages with Fruit Juice', rate: 40, conditions: 'sin goods' },
      { name: 'Other Non-Alcoholic Beverages', rate: 40, conditions: 'luxury goods' },
      { name: 'Toilet Soap Bars', rate: 5, conditions: 'daily use items' },
      { name: 'Tendu Leaves', rate: 5, conditions: 'minor forest produce' }
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    products: [
      { name: 'Agricultural Machinery', rate: 5, conditions: 'e.g., sprinklers, harvesters' },
      { name: 'Small Agricultural Tractors', rate: 5, conditions: '' },
      { name: 'Raw Cotton', rate: 5, conditions: 'reverse charge mechanism' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Pharmaceuticals',
    products: [
      { name: 'Medicines/Drugs', rate: 5, conditions: 'concessional rate' },
      { name: 'Medical Devices', rate: 5, conditions: 'e.g., surgical apparatus' },
      { name: 'Face Powder & Shampoos', rate: 5, conditions: 'daily use items' },
      { name: 'Toothpaste, Toothbrush, Dental Floss', rate: 5, conditions: 'basic dental hygiene' },
      { name: 'Shaving Cream', rate: 5, conditions: 'daily use item' },
      { name: 'Mouthwash', rate: 18, conditions: 'not considered basic hygiene' }
    ]
  },
  {
    id: 'automobiles',
    name: 'Automobiles & Transportation',
    products: [
      { 
        name: 'Small Cars', 
        rate: 18, 
        conditions: 'Petrol/LPG/CNG: ≤1200cc & ≤4000mm; Diesel: ≤1500cc & ≤4000mm',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true },
          { name: 'Length (mm)', type: 'number', required: true },
          { name: 'Fuel Type', type: 'select', required: true, options: ['Petrol', 'Diesel', 'LPG', 'CNG'] }
        ]
      },
      { 
        name: 'Mid-size, Large Cars & SUVs', 
        rate: 40, 
        conditions: 'engine >1500cc or length >4000mm; SUVs must also have ground clearance ≥170mm',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true },
          { name: 'Length (mm)', type: 'number', required: true },
          { name: 'Ground Clearance (mm)', type: 'number', required: false },
          { name: 'Vehicle Type', type: 'select', required: true, options: ['Sedan', 'SUV', 'Hatchback'] }
        ]
      },
      { name: 'Three-Wheelers', rate: 18, conditions: '' },
      { name: 'Buses', rate: 18, conditions: 'vehicles for 10+ persons' },
      { name: 'Ambulances', rate: 18, conditions: '' },
      { name: 'Goods Transport Vehicles', rate: 18, conditions: 'lorries, trucks' },
      { 
        name: 'Tractors', 
        rate: 5, 
        conditions: 'except road tractors for semi-trailers >1800cc',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true }
        ]
      },
      { 
        name: 'Road Tractors for semi-trailers', 
        rate: 18, 
        conditions: 'engine >1800cc',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true }
        ]
      },
      { 
        name: 'Motorcycles (≤350cc)', 
        rate: 18, 
        conditions: '',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true }
        ]
      },
      { 
        name: 'Motorcycles (>350cc)', 
        rate: 40, 
        conditions: '',
        parameters: [
          { name: 'Engine Capacity (cc)', type: 'number', required: true }
        ]
      },
      { name: 'Bicycles & Parts', rate: 5, conditions: '' }
    ]
  },
  {
    id: 'electronics',
    name: 'Consumer Durables & Electronics',
    products: [
      { name: 'Air Conditioners', rate: 18, conditions: '' },
      { name: 'Dishwashers', rate: 18, conditions: '' },
      { name: 'TVs and Monitors', rate: 18, conditions: 'uniform rate' },
      { name: 'Lithium-ion Batteries', rate: 18, conditions: '' },
      { name: 'Other Batteries', rate: 18, conditions: '' },
      { name: 'Spectacles & Goggles (vision correction)', rate: 5, conditions: '' },
      { name: 'Spectacles & Goggles (non-vision)', rate: 18, conditions: '' }
    ]
  },
  {
    id: 'textiles',
    name: 'Textiles & Leather',
    products: [
      { name: 'Job Work for Hides, Skins, Leather', rate: 5, conditions: 'Chapter 41' },
      { name: 'Imitation Zari', rate: 18, conditions: 'from metallised plastic film' }
    ]
  },
  {
    id: 'renewable',
    name: 'Renewable Energy & Infrastructure',
    products: [
      { name: 'Renewable Energy Equipment', rate: 5, conditions: '' },
      { name: 'Marble, Travertine, Granite Blocks', rate: 5, conditions: 'intermediate goods' },
      { name: 'Coal', rate: 12, conditions: 'merged rate - no additional burden from cess removal' },
    ]
  },
  {
    id: 'other',
    name: 'Other Goods',
    products: [
      { name: 'Cigarettes, Tobacco Products', rate: 40, conditions: 'sin goods - special rate' },
      { name: 'Beedi', rate: 40, conditions: 'sin goods - special rate' }
    ]
  }
];

// Service categories
const SERVICE_CATEGORIES: Category[] = [
  {
    id: 'transportation',
    name: 'Transportation Services',
    products: [
      { name: 'General Passenger Transport', rate: 5, conditions: 'No ITC' },
      { name: 'Air Passenger Transport (Economy)', rate: 5, conditions: '' },
      { name: 'Air Passenger Transport (Other)', rate: 18, conditions: '' },
      { name: 'Goods Transport (GTA)', rate: 5, conditions: 'No ITC' },
      { name: 'Container Train Operator', rate: 5, conditions: 'No ITC' }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance Services',
    products: [
      { name: 'Life Insurance', rate: 0, conditions: 'Exempt' },
      { name: 'Health Insurance', rate: 0, conditions: 'Exempt' }
    ]
  },
  {
    id: 'jobwork',
    name: 'Job Work Services',
    products: [
      { name: 'Pharmaceutical Products', rate: 5, conditions: 'with ITC' },
      { name: 'Hides, Skins, Leather', rate: 5, conditions: 'with ITC' },
      { name: 'Alcoholic Liquor', rate: 18, conditions: 'with ITC' },
      { name: 'Residuary Job Work', rate: 18, conditions: '' }
    ]
  },
  {
    id: 'other-services',
    name: 'Other Services',
    products: [
      { name: 'Hotel Accommodation (≤₹7500)', rate: 5, conditions: 'No ITC' },
      { name: 'Beauty & Wellness Services', rate: 5, conditions: 'No ITC' },
      { name: 'Offshore Oil & Gas', rate: 18, conditions: '' },
      { name: 'Gambling, Casinos', rate: 40, conditions: 'sin goods' },
      { name: 'Lottery, Gaming', rate: 40, conditions: 'sin goods' },
      { name: 'Sporting Events (IPL)', rate: 40, conditions: '' },
      { name: 'Recognized Sporting Events (≤₹500)', rate: 0, conditions: 'Exempt' },
      { name: 'Recognized Sporting Events (>₹500)', rate: 18, conditions: '' }
    ]
  }
];

interface Product {
  name: string;
  rate: number;
  conditions: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    options?: string[];
  }>;
  category?: string;
}

interface Result {
  originalAmount: number;
  gstAmount: number;
  totalAmount: number;
  gstRate: number;
  productName: string;
}

const GSTPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [productParameters, setProductParameters] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<Result | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'goods' | 'services'>('goods');

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductParameters({});
    setResult(null);
  };

  // Handle parameter changes
  const handleParameterChange = (paramName: string, value: string) => {
    setProductParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Calculate dynamic GST rate based on parameters
  const calculateDynamicRate = (product: Product): number => {
    if (!product.parameters) {
      return product.rate;
    }

    // Special cases for automobiles
    if (product.name === 'Small Cars') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      const length = parseFloat(productParameters['Length (mm)'] || '0');
      const fuel = productParameters['Fuel Type'] || '';
      
      if ((fuel === 'Petrol' && engine <= 1200 && length <= 4000) ||
          (fuel === 'LPG' && engine <= 1200 && length <= 4000) ||
          (fuel === 'CNG' && engine <= 1200 && length <= 4000) ||
          (fuel === 'Diesel' && engine <= 1500 && length <= 4000)) {
        return 18;
      } else {
        return 40; // Large car rate
      }
    }
    
    if (product.name === 'Mid-size, Large Cars & SUVs') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      const length = parseFloat(productParameters['Length (mm)'] || '0');
      const groundClearance = parseFloat(productParameters['Ground Clearance (mm)'] || '0');
      const vehicleType = productParameters['Vehicle Type'] || '';
      
      if (engine > 1500 || length > 4000 || (vehicleType === 'SUV' && groundClearance >= 170)) {
        return 40;
      } else {
        return 18; // Small car rate
      }
    }
    
    if (product.name === 'Tractors') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      if (engine > 1800) {
        return 18; // Road tractor rate
      } else {
        return 5;
      }
    }
    
    if (product.name === 'Road Tractors for semi-trailers') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      if (engine > 1800) {
        return 18;
      } else {
        return 5; // Regular tractor rate
      }
    }
    
    if (product.name === 'Motorcycles (≤350cc)') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      if (engine > 350) {
        return 40; // Large motorcycle rate
      } else {
        return 18;
      }
    }
    
    if (product.name === 'Motorcycles (>350cc)') {
      const engine = parseFloat(productParameters['Engine Capacity (cc)'] || '0');
      if (engine <= 350) {
        return 18; // Small motorcycle rate
      } else {
        return 40;
      }
    }

    // Default to product's base rate
    return product.rate;
  };

  // Pipeline animation for calculation steps
  const calculateGST = () => {
    if (!amount || !selectedProduct) return;
    
    setIsCalculating(true);
    setResult(null);
    
    // Simulate calculation delay for animation
    setTimeout(() => {
      const amt = parseFloat(amount);
      const dynamicRate = calculateDynamicRate(selectedProduct);
      const gstAmount = (amt * dynamicRate) / 100;
      const totalAmount = amt + gstAmount;
      
      setResult({
        originalAmount: amt,
        gstAmount: gstAmount,
        totalAmount: totalAmount,
        gstRate: dynamicRate,
        productName: selectedProduct.name
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  // Reset form
  const resetForm = () => {
    setSelectedCategory('');
    setSelectedProduct(null);
    setAmount('');
    setProductParameters({});
    setResult(null);
  };

  // Get categories based on active tab
  const categories: Category[] = activeTab === 'goods' ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Advanced GST Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate accurate GST amounts based on product type, specifications, and current rates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product/Service Selection with glass design */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Product/Service</h2>
            
            {/* Tabs with glass design */}
            <div className="flex mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
              <button
                onClick={() => {
                  setActiveTab('goods');
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition glass-button ${
                  activeTab === 'goods' 
                    ? 'bg-white/80 text-indigo-600 shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Goods
              </button>
              <button
                onClick={() => {
                  setActiveTab('services');
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition glass-button ${
                  activeTab === 'services' 
                    ? 'bg-white/80 text-indigo-600 shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Services
              </button>
            </div>
            
            {/* Category Selection with glass design */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedProduct(null);
                  setResult(null);
                }}
                className="w-full px-4 py-3 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition glass-button"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Product/Service Selection with glass design */}
            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeTab === 'goods' ? 'Product' : 'Service'}
                </label>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                        {categories
                        .find(cat => cat.id === selectedCategory)
                        ?.products.map((product, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => handleProductSelect(product)}
                              className={`w-full text-left p-4 rounded-lg border transition glass-button ${
                                selectedProduct?.name === product.name
                                  ? 'border-indigo-500 bg-indigo-50/50'
                                  : 'border-gray-200/50 hover:border-indigo-300 hover:bg-indigo-50/30'
                              }`}
                            >
                              <div className="font-medium text-gray-800">{product.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{product.conditions}</div>
                              <div className="text-sm font-semibold text-indigo-600 mt-2">
                                {product.rate}% GST
                              </div>
                            </button>
                          </motion.div>
                        ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Calculator and Results with glass design */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Calculator Section with glass design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate GST</h2>
              
              {selectedProduct ? (
                <div className="space-y-6">
                  <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100/50">
                    <h3 className="font-bold text-indigo-800">{selectedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{selectedProduct.conditions}</p>
                  </div>
                  
                  {/* Product-specific parameters with glass design */}
                  {selectedProduct.parameters && selectedProduct.parameters.map((param, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {param.name}
                      </label>
                      {param.type === 'select' ? (
                        <select
                          value={productParameters[param.name] || ''}
                          onChange={(e) => handleParameterChange(param.name, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition glass-button"
                        >
                          <option value="">Select {param.name}</option>
                          {param.options && param.options.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={param.type}
                          value={productParameters[param.name] || ''}
                          onChange={(e) => handleParameterChange(param.name, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition glass-button"
                          placeholder={`Enter ${param.name}`}
                        />
                      )}
                    </div>
                  ))}
                  
                  {/* Amount Input with glass design */}
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition glass-button"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  {/* Dynamic Rate Display with glass design */}
                  {selectedProduct && (
                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Applicable GST Rate:</span>
                        <span className="font-bold text-blue-700">
                          {calculateDynamicRate(selectedProduct)}%
                        </span>
                      </div>
                      {selectedProduct.parameters && (
                        <p className="text-sm text-gray-600 mt-2">
                          Rate calculated based on provided specifications
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={calculateGST}
                      disabled={!amount || isCalculating}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition glass-button ${
                        !amount || isCalculating
                          ? 'bg-gray-300/50 cursor-not-allowed'
                          : 'bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 hover:bg-white/40'
                      }`}
                    >
                      {isCalculating ? 'Calculating...' : 'Calculate GST'}
                    </button>
                    
                    <button
                      onClick={resetForm}
                      className="py-3 px-6 bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 rounded-lg font-medium transition glass-button hover:bg-white/40"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a product or service</h3>
                  <p className="text-gray-500">
                    Choose a category and product/service to begin calculating GST
                  </p>
                </div>
              )}
              
              {/* Pipeline Animation */}
              {isCalculating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Calculating...</h3>
                  <div className="space-y-4">
                    {['Validating input', 'Calculating dynamic GST rate', 'Computing tax amount', 'Preparing results'].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 }}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Results with glass design */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Calculation Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200/50">
                      <span className="font-medium text-gray-600">Product/Service:</span>
                      <span className="font-semibold">{result.productName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/50">
                      <span className="font-medium text-gray-600">Original Amount:</span>
                      <span className="font-semibold">₹{result.originalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/50">
                      <span className="font-medium text-gray-600">GST ({result.gstRate}%):</span>
                      <span className="font-semibold text-indigo-600">₹{result.gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-gray-600">Total Amount:</span>
                      <span className="font-bold text-xl text-indigo-700">₹{result.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* GST Information Section with glass design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">GST Information</h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Goods and Services Tax (GST) is a comprehensive, multi-stage, destination-based tax 
                  levied on every value addition. Here's a summary of common GST rates:
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Common GST Slabs</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-blue-50/50 p-4 rounded-lg text-center border border-blue-100/50">
                      <h4 className="font-bold text-blue-700">0%</h4>
                      <p className="text-sm text-gray-600">Exempted Goods</p>
                    </div>
                    <div className="bg-green-50/50 p-4 rounded-lg text-center border border-green-100/50">
                      <h4 className="font-bold text-green-700">5%</h4>
                      <p className="text-sm text-gray-600">Essential Items</p>
                    </div>
                    <div className="bg-yellow-50/50 p-4 rounded-lg text-center border border-yellow-100/50">
                      <h4 className="font-bold text-yellow-700">12%</h4>
                      <p className="text-sm text-gray-600">Standard Rate</p>
                    </div>
                    <div className="bg-orange-50/50 p-4 rounded-lg text-center border border-orange-100/50">
                      <h4 className="font-bold text-orange-700">18%</h4>
                      <p className="text-sm text-gray-600">Common Goods</p>
                    </div>
                    <div className="bg-red-50/50 p-4 rounded-lg text-center border border-red-100/50">
                      <h4 className="font-bold text-red-700">28%</h4>
                      <p className="text-sm text-gray-600">Luxury Items</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50/50 p-4 rounded-lg mb-6 border border-indigo-100/50">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-2">Special Rate</h3>
                  <p className="text-gray-700">
                    <span className="font-bold">40% GST</span> applies to "sin goods" like tobacco products, 
                    gambling, and luxury cars to discourage consumption.
                  </p>
                </div>
                
                <div className="border-t border-gray-200/50 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>GST rates vary based on product type, size, engine capacity, and other specifications</li>
                    <li>Dynamic rate calculation considers multiple parameters for accurate taxation</li>
                    <li>Input Tax Credit (ITC) mechanism prevents cascading taxation</li>
                    <li>Some products have different rates based on specific criteria like engine size or price</li>
                    <li>Exports are zero-rated, while imports are treated as domestic supplies</li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100/50">
                    <h4 className="font-semibold text-blue-800 mb-2">Official GST Rate Information</h4>
                    <p className="text-gray-700 mb-3">
                      For complete and official GST rates, please refer to the Government of India's notification:
                    </p>
                    <a 
                      href="https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202593627501.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium underline glass-button py-2 px-4 rounded-lg"
                    >
                      Download Official GST Rates PDF
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GSTPage;