import { useEffect, useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import "./App.css";

// fake JSON data for currency rates
const rates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  KES: 109.57,
  JPY: 109.93,
  CNY: 6.46,
};

// a custom hook to get and set values in localstorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredvalue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredvalue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// the main component for the app
const App = () => {
  // state variables for the input and output currencies and amounts
  const [inputCurrency, setInputCurrency] = useLocalStorage(
    "inputCurrency",
    "USD"
  );
  const [outputCurrency, setOutputCurrency] = useLocalStorage(
    "outputCurrency",
    "KES"
  );
  const [inputAmount, setInputAmount] = useLocalStorage("inputAmount", 1);
  const [outputAmount, setOutputAmount] = useLocalStorage("outputAmount", 0);

  // a function to convert the input to the output amount using the rates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const convert = () => {
    const inputRate = rates[inputCurrency];
    const outputRate = rates[outputCurrency];
    const result = (inputAmount * outputRate) / inputRate;
    setOutputAmount(result.toFixed(2));
  };

  // a function to swap the input and output currencies and amounts
  const swap = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  // a function to handle the change of the input currency
  const handleInputCurrencyChange = (e) => {
    setInputCurrency(e.target.value);
  };

  // a function to handle the change of the output currency
  const handleOutputCurrencyChange = (e) => {
    setOutputCurrency(e.target.value);
  };

  // a function to handle the change of the input amount
  const handleInputAmountChange = (e) => {
    setInputAmount(e.target.value);
  };

  // a function to handle the change of the output amount
  const handleOutputAmountChange = (e) => {
    setOutputAmount(e.target.value);
  };

  useEffect(() => {
    convert();
  }, [convert, inputCurrency, outputCurrency]);
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-100 to-gray-300">
      <h1 className="text-4xl font-bold text-center mb-4">
        Currency Converter
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-64">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="input-currency"
          >
            From
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
              value={inputCurrency}
              id="input-currency"
              onChange={handleInputCurrencyChange}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <IoSwapHorizontal className="fill-current h-4 w-4" />
            </div>
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
            htmlFor="input-amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="input-amount"
            min="0"
            step="0.01"
            value={inputAmount}
            onChange={handleInputAmountChange}
          />

          <button
            className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
            type="button"
            onClick={swap}
          >
            Swap
          </button>
          <div className="w-64">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="output-currency"
            >
              To
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500"
                value={outputCurrency}
                id="output-currency"
                onChange={handleOutputCurrencyChange}
              >
                {Object.keys(rates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoSwapHorizontal className="fill-current h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="w-64">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-4"
              htmlFor="output-amount"
            >
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="output-amount"
              type="number"
              min="0"
              step="0.01"
              value={outputAmount}
              onChange={handleOutputAmountChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
