

// Comprehensive city database for demo
const mockCities = [
  { name: "Addis Ababa", country: "Ethiopia", region: "Addis Ababa" },
  { name: "Dire Dawa", country: "Ethiopia", region: "Dire Dawa" },
  { name: "Mekelle", country: "Ethiopia", region: "Tigray" },
  { name: "Gondar", country: "Ethiopia", region: "Amhara" },
  { name: "Hawassa", country: "Ethiopia", region: "SNNPR" },
  { name: "Bahir Dar", country: "Ethiopia", region: "Amhara" },
  { name: "Jimma", country: "Ethiopia", region: "Oromia" },
  { name: "Dessie", country: "Ethiopia", region: "Amhara" },
  { name: "Nairobi", country: "Kenya", region: "Nairobi" },
  { name: "Mombasa", country: "Kenya", region: "Coast" },
  { name: "Cairo", country: "Egypt", region: "Cairo" },
  { name: "Alexandria", country: "Egypt", region: "Alexandria" },
  { name: "Lagos", country: "Nigeria", region: "Lagos" },
  { name: "Abuja", country: "Nigeria", region: "FCT" },
  { name: "Accra", country: "Ghana", region: "Greater Accra" },
  { name: "Kumasi", country: "Ghana", region: "Ashanti" },
  { name: "London", country: "United Kingdom", region: "England" },
  { name: "New York", country: "United States", region: "New York" },
  { name: "Paris", country: "France", region: "Île-de-France" },
  { name: "Tokyo", country: "Japan", region: "Tokyo" },
  { name: "Dubai", country: "UAE", region: "Dubai" },
  { name: "Sydney", country: "Australia", region: "NSW" },
]

// Realistic weather data for different cities
const mockWeatherData = {
  "addis ababa": {
    city: "Addis Ababa",
    country: "Ethiopia",
    temperature: 20,
    condition: "Partly Cloudy",
    humidity: 45,
    windSpeed: 8,
    pressure: 1015,
    visibility: 12,
    feelsLike: 22,
    icon: "partly-cloudy",
  },
  "dire dawa": {
    city: "Dire Dawa",
    country: "Ethiopia",
    temperature: 28,
    condition: "Sunny",
    humidity: 35,
    windSpeed: 12,
    pressure: 1012,
    visibility: 15,
    feelsLike: 31,
    icon: "sunny",
  },
  mekelle: {
    city: "Mekelle",
    country: "Ethiopia",
    temperature: 18,
    condition: "Clear",
    humidity: 40,
    windSpeed: 6,
    pressure: 1018,
    visibility: 14,
    feelsLike: 20,
    icon: "clear",
  },
  nairobi: {
    city: "Nairobi",
    country: "Kenya",
    temperature: 22,
    condition: "Sunny",
    humidity: 40,
    windSpeed: 10,
    pressure: 1018,
    visibility: 15,
    feelsLike: 24,
    icon: "sunny",
  },
  cairo: {
    city: "Cairo",
    country: "Egypt",
    temperature: 32,
    condition: "Clear",
    humidity: 25,
    windSpeed: 15,
    pressure: 1010,
    visibility: 18,
    feelsLike: 36,
    icon: "sunny",
  },
  lagos: {
    city: "Lagos",
    country: "Nigeria",
    temperature: 29,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 14,
    pressure: 1008,
    visibility: 10,
    feelsLike: 34,
    icon: "partly-cloudy",
  },
  london: {
    city: "London",
    country: "United Kingdom",
    temperature: 15,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 18,
    pressure: 1020,
    visibility: 8,
    feelsLike: 13,
    icon: "cloudy",
  },
  "new york": {
    city: "New York",
    country: "United States",
    temperature: 18,
    condition: "Partly Cloudy",
    humidity: 55,
    windSpeed: 12,
    pressure: 1015,
    visibility: 12,
    feelsLike: 20,
    icon: "partly-cloudy",
  },
}

// DOM Elements
const elements = {
  app: document.getElementById("app"),
  searchForm: document.getElementById("search-form"),
  searchInput: document.getElementById("search-input"),
  suggestions: document.getElementById("suggestions"),
  noResults: document.getElementById("no-results"),
  noResultsQuery: document.getElementById("no-results-query"),
  loadingIcon: document.getElementById("loading-icon"),
  themeToggle: document.getElementById("theme-toggle"),
  loading: document.getElementById("loading"),
  currentWeather: document.getElementById("current-weather"),
  city: document.getElementById("city"),
  country: document.getElementById("country"),
  temperature: document.getElementById("temperature"),
  condition: document.getElementById("condition"),
  feelsLike: document.getElementById("feels-like"),
  weatherIcon: document.getElementById("weather-icon"),
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("wind-speed"),
  visibility: document.getElementById("visibility"),
  pressure: document.getElementById("pressure"),
  weeklyForecast: document.getElementById("weekly-forecast"),
}

// State
const state = {
  weatherData: {
    city: "Addis Ababa",
    country: "Ethiopia",
    temperature: 20,
    condition: "Partly Cloudy",
    humidity: 45,
    windSpeed: 8,
    pressure: 1015,
    visibility: 12,
    feelsLike: 22,
    icon: "partly-cloudy",
  },
  isLightningTheme: false,
  isLoading: false,
  suggestions: [],
  showSuggestions: false,
  selectedIndex: -1,
  query: "",
}

// Search cities function
function searchCities(query) {
  if (!query || query.length < 2) return []

  return mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase()) ||
      (city.region && city.region.toLowerCase().includes(query.toLowerCase())),
  )
}

// Get weather data function
function getWeatherByCity(cityName) {
  // Clean the city name for lookup
  const key = cityName.toLowerCase().replace(/,.*$/, "").trim()

  // Return specific data if available, otherwise generate realistic random data
  if (mockWeatherData[key]) {
    return mockWeatherData[key]
  }

  // Generate realistic weather based on city name patterns
  const isAfricanCity = ["ethiopia", "kenya", "egypt", "nigeria", "ghana"].some((country) =>
    cityName.toLowerCase().includes(country),
  )

  const baseTemp = isAfricanCity ? 25 : 18
  const tempVariation = Math.floor(Math.random() * 10) - 5

  return {
    city: cityName.split(",")[0].trim(),
    country: cityName.includes(",") ? cityName.split(",")[1].trim() : "Unknown",
    temperature: baseTemp + tempVariation,
    condition: ["Sunny", "Partly Cloudy", "Clear", "Cloudy"][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 30,
    windSpeed: Math.floor(Math.random() * 15) + 5,
    pressure: Math.floor(Math.random() * 30) + 1000,
    visibility: Math.floor(Math.random() * 10) + 10,
    feelsLike: baseTemp + tempVariation + Math.floor(Math.random() * 6) - 3,
    icon: ["sunny", "partly-cloudy", "clear", "cloudy"][Math.floor(Math.random() * 4)],
  }
}

// Get weather icon SVG
function getWeatherIconSVG(icon) {
  const iconMap = {
    sunny: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>`,
    "partly-cloudy": `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </svg>`,
    cloudy: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </svg>`,
    rainy: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
      <path d="M16 14v6"></path>
      <path d="M8 14v6"></path>
      <path d="M12 16v6"></path>
    </svg>`,
    clear: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>`,
  }

  return iconMap[icon] || iconMap.sunny
}

// Generate weekly forecast based on current weather
function generateWeeklyForecast(weatherData) {
  return [
    {
      day: "Today",
      high: weatherData.temperature + 2,
      low: weatherData.temperature - 8,
      condition: weatherData.condition,
      icon: weatherData.icon,
      precipitation: 20,
    },
    {
      day: "Tomorrow",
      high: weatherData.temperature + 3,
      low: weatherData.temperature - 6,
      condition: "Sunny",
      icon: "sunny",
      precipitation: 5,
    },
    {
      day: "Wednesday",
      high: weatherData.temperature - 2,
      low: weatherData.temperature - 10,
      condition: "Rainy",
      icon: "rainy",
      precipitation: 85,
    },
    {
      day: "Thursday",
      high: weatherData.temperature,
      low: weatherData.temperature - 8,
      condition: "Cloudy",
      icon: "cloudy",
      precipitation: 40,
    },
    {
      day: "Friday",
      high: weatherData.temperature + 1,
      low: weatherData.temperature - 7,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      precipitation: 15,
    },
    {
      day: "Saturday",
      high: weatherData.temperature + 4,
      low: weatherData.temperature - 5,
      condition: "Sunny",
      icon: "sunny",
      precipitation: 0,
    },
    {
      day: "Sunday",
      high: weatherData.temperature + 5,
      low: weatherData.temperature - 4,
      condition: "Sunny",
      icon: "sunny",
      precipitation: 0,
    },
  ]
}

// Render functions
function renderWeatherData() {
  elements.city.textContent = state.weatherData.city
  elements.country.textContent = state.weatherData.country
  elements.temperature.textContent = `${state.weatherData.temperature}°C`
  elements.condition.textContent = state.weatherData.condition
  elements.feelsLike.textContent = `Feels like ${state.weatherData.feelsLike}°C`
  elements.weatherIcon.innerHTML = getWeatherIconSVG(state.weatherData.icon)
  elements.humidity.textContent = `${state.weatherData.humidity}%`
  elements.windSpeed.textContent = `${state.weatherData.windSpeed} km/h`
  elements.visibility.textContent = `${state.weatherData.visibility} km`
  elements.pressure.textContent = `${state.weatherData.pressure} mb`
}

function renderWeeklyForecast() {
  const forecast = generateWeeklyForecast(state.weatherData)
  elements.weeklyForecast.innerHTML = ""

  forecast.forEach((day) => {
    const dayElement = document.createElement("div")
    dayElement.className =
      "flex items-center justify-between p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"

    dayElement.innerHTML = `
      <div class="flex items-center gap-4 flex-1">
        <span class="font-medium w-20">${day.day}</span>
        <div class="text-yellow-300 w-6 h-6">
          ${getWeatherIconSVG(day.icon).replace('width="96" height="96"', 'width="24" height="24"')}
        </div>
        <span class="text-sm opacity-80">${day.condition}</span>
      </div>

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-300">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
          </svg>
          <span class="text-sm">${day.precipitation}%</span>
        </div>
        <div class="text-right">
          <span class="font-semibold text-lg">${day.high}°</span>
          <span class="text-sm opacity-70 ml-2">${day.low}°</span>
        </div>
      </div>
    `

    elements.weeklyForecast.appendChild(dayElement)
  })
}

function renderSuggestions() {
  elements.suggestions.innerHTML = ""

  if (state.suggestions.length === 0) {
    elements.suggestions.classList.add("hidden")
    return
  }

  state.suggestions.forEach((city, index) => {
    const suggestionElement = document.createElement("div")
    suggestionElement.className = `flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
      index === state.selectedIndex ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
    }`

    suggestionElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-gray-400">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <div class="flex-1">
        <div class="font-medium">
          ${city.name}
          ${city.region ? `<span class="text-sm text-gray-500 ml-1">, ${city.region}</span>` : ""}
        </div>
        <div class="text-sm text-gray-500">${city.country}</div>
      </div>
    `

    suggestionElement.addEventListener("click", () => {
      handleSelectCity(city)
    })

    elements.suggestions.appendChild(suggestionElement)
  })

  elements.suggestions.classList.remove("hidden")

  // Position the suggestions dropdown
  const inputRect = elements.searchInput.getBoundingClientRect()
  elements.suggestions.style.top = `${inputRect.bottom + window.scrollY + 5}px`
  elements.suggestions.style.width = `${elements.searchInput.offsetWidth}px`
  elements.suggestions.style.left = `${inputRect.left}px`
}

function renderNoResults() {
  if (state.query.length < 2 || state.suggestions.length > 0) {
    elements.noResults.classList.add("hidden")
    return
  }

  elements.noResultsQuery.textContent = state.query
  elements.noResults.classList.remove("hidden")

  // Position the no results message
  const inputRect = elements.searchInput.getBoundingClientRect()
  elements.noResults.style.top = `${inputRect.bottom + window.scrollY + 5}px`
  elements.noResults.style.width = `${elements.searchInput.offsetWidth}px`
  elements.noResults.style.left = `${inputRect.left}px`
}

function renderLoadingState() {
  if (state.isLoading) {
    elements.loading.classList.remove("hidden")
    elements.currentWeather.classList.add("hidden")
  } else {
    elements.loading.classList.add("hidden")
    elements.currentWeather.classList.remove("hidden")
  }
}

function renderTheme() {
  if (state.isLightningTheme) {
    elements.app.classList.add("lightning-theme")
  } else {
    elements.app.classList.remove("lightning-theme")
  }
}

// Event handlers
function handleSearch(cityName) {
  state.isLoading = true
  renderLoadingState()

  setTimeout(() => {
    try {
      state.weatherData = getWeatherByCity(cityName)
      renderWeatherData()
      renderWeeklyForecast()
    } catch (error) {
      console.log("Search completed with fallback data")
    } finally {
      state.isLoading = false
      renderLoadingState()
    }
  }, 500) // Simulate API delay
}

function handleSelectCity(city) {
  const cityName = `${city.name}, ${city.country}`
  elements.searchInput.value = cityName
  state.showSuggestions = false
  state.selectedIndex = -1
  elements.suggestions.classList.add("hidden")
  handleSearch(cityName)
}

function handleThemeToggle() {
  state.isLightningTheme = !state.isLightningTheme
  renderTheme()
}

// Event listeners
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const query = elements.searchInput.value.trim()
  if (query) {
    elements.suggestions.classList.add("hidden")
    handleSearch(query)
  }
})

elements.searchInput.addEventListener("input", (e) => {
  state.query = e.target.value

  if (state.query.length >= 2) {
    elements.loadingIcon.classList.remove("hidden")

    // Debounce search
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      try {
        state.suggestions = searchCities(state.query)
        state.showSuggestions = true
        renderSuggestions()
        renderNoResults()
      } catch (error) {
        console.error("Search error:", error)
        state.suggestions = []
      } finally {
        elements.loadingIcon.classList.add("hidden")
      }
    }, 300)
  } else {
    state.suggestions = []
    state.showSuggestions = false
    elements.suggestions.classList.add("hidden")
    elements.noResults.classList.add("hidden")
  }
})

elements.searchInput.addEventListener("focus", () => {
  if (state.suggestions.length > 0) {
    elements.suggestions.classList.remove("hidden")
  }
})

elements.searchInput.addEventListener("keydown", (e) => {
  if (!state.showSuggestions || state.suggestions.length === 0) return

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault()
      state.selectedIndex = state.selectedIndex < state.suggestions.length - 1 ? state.selectedIndex + 1 : 0
      renderSuggestions()
      break
    case "ArrowUp":
      e.preventDefault()
      state.selectedIndex = state.selectedIndex > 0 ? state.selectedIndex - 1 : state.suggestions.length - 1
      renderSuggestions()
      break
    case "Enter":
      e.preventDefault()
      if (state.selectedIndex >= 0) {
        handleSelectCity(state.suggestions[state.selectedIndex])
      } else if (state.query.trim()) {
        handleSearch(state.query.trim())
        elements.suggestions.classList.add("hidden")
      }
      break
    case "Escape":
      elements.suggestions.classList.add("hidden")
      state.selectedIndex = -1
      break
  }
})

elements.themeToggle.addEventListener("click", handleThemeToggle)

// Close suggestions when clicking outside
document.addEventListener("mousedown", (event) => {
  if (!elements.suggestions.contains(event.target) && !elements.searchInput.contains(event.target)) {
    elements.suggestions.classList.add("hidden")
    elements.noResults.classList.add("hidden")
    state.selectedIndex = -1
  }
})

// Initialize app
function initApp() {
  // Load default weather
  handleSearch("Addis Ababa, Ethiopia")
}


document.addEventListener("DOMContentLoaded", initApp)
