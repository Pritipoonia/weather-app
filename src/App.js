import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/ForeCast';
import Input from './components/Inputs';
import TemperatureandDetails from './components/TempratureDetails';
import Timeandlocation from './components/TimeAndLocation';
import Topbuttons from './components/TopButton';
import getFormattedWeatherData from './Services/WeatherService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "istanbul" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-blue-500 to-fuchsia-500";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-blue-500 to-fuchsia-500";

    return "from-yellow-800 to-orange-500";
  };

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const changetheme = () => {
    document.body.classList.toggle("dark-mode");

    let theme = "light";
    if (document.body.classList.contains("dark-mode")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  };

  if (localStorage.getItem("theme") === "dark") {
    var element = document.body;
    element.classList.add("dark-mode");
  }

  return (
    <div>

      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
        <div className='flex items-end justify-end -mx-32'>
          <button onClick={changetheme} data-tooltip-target="button-loader-example-toggle-dark-mode-tooltip" type="button" data-toggle-dark="light" className="transition ease-out flex items-center p-2 mr-2 text-xs focus:scale-105 font-medium text-gray-700 bg-white rounded-lg border border-gray-200 toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <svg aria-hidden="true" data-toggle-icon="moon" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg aria-hidden="true" data-toggle-icon="sun" class="hidden w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <Topbuttons setQuery={setQuery} />
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <Timeandlocation weather={weather} />
            <TemperatureandDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    </div>
  );
}

export default App;