# Travel Planner AI

Dynamic travel planner to provide real-time route optimization and personalized travel itineraries.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time route optimization
- Personalized travel itineraries
- User authentication with Google
- Interactive map integration
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Swiper.js for carousels
  - React Router for navigation
  - Material-UI for UI components

- **Backend:**
  - Google APIs for location and travel data
  - Google Gemini API for personalized itinerary
  - UUID for unique identifiers

- **Development Tools:**
  - Vite for fast development
  - ESLint for code linting
  - PostCSS for CSS processing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zeeshaan28/travel-planner-ai.git
   cd travel-planner-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your Google API keys:
     ```
     VITE_GOOGLE_GENERATIVE_LANGUAGE_API_KEY=your_api_key
     VITE_GOOGLE_MAPS_API_KEY=your_api_key
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Sign in using your Google account to access personalized features.
- Explore the interactive map to find and plan your travel destinations.
- Create and manage your travel itineraries with ease.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

