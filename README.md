Grill House - Dynamic Ordering App

I built this as a solo project during the Scrimba Front-End Development path to practice DOM manipulation and intermediate JavaScript concepts. My goal was to move beyond static sites and create a functional, event-driven application that handles real-time data.

Tech Specs

Used a central array to track cart items and calculate totals dynamically.

Integrated the uuid library to ensure every order item has a unique, trackable ID.

Built a custom validation layer for the checkout form to ensure names and card details follow specific patterns.

Features

Instead of attaching listeners to every "Add" button, I used a single global event listener. This optimizes memory usage and ensures that dynamically rendered items are automatically functional.

Kept the menu data separate in data.js to simulate how a real application would pull information from an external API or database.

Used modern JavaScript methods like .map(), .filter(), and .reduce() to handle data transformations cleanly and concisely.

Tech Stack

HTML5
CSS3
JavaScript

How to run this project

1. Clone the repository: Bash git clone https://github.com/Eric-Ochir/[repository-name].git

2. Install dependencies: Bash npm install

3. Launch the development server: Bash npm run dev

4. Build for production: Bash npm run build

Author
Erdene-Ochir Ochirgarav 
