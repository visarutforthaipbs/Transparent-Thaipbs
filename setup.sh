#!/bin/bash

# Create .env file
echo "Creating .env file..."
if [ ! -f .env ]; then
  echo "MONGODB_URI=mongodb+srv://visarutsankham:35mydVrXrfLSXeKP@thaipbs-budget-ideas-66.u4ryaqn.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-budget-ideas-66" > .env
  echo "PORT=3000" >> .env
  echo ".env file created successfully."
else
  echo ".env file already exists."
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server
echo "Starting server..."
echo "You can access the application at http://localhost:3000"
npm run dev 