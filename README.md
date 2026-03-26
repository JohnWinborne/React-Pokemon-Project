# React-Pokemon-Project
By John Winborne  

Background image from: https://wall.alphacoders.com/big.php?i=718222  

## Overview  

This project is a Pokémon web application built with React. It allows users to search for Pokémon, view a list of results, and click into a detailed page for each Pokémon. The app uses a GraphQL Pokémon API to fetch both summary and detailed data.

The application follows a two-step data fetching flow:
1. Fetch a list of Pokémon based on a search or initial load  
2. Fetch detailed information for a selected Pokémon  

## Features  

- Search for Pokémon by name  
- Display Pokémon in a grid layout (6 at a time)  
- Load more Pokémon button  
- Click a Pokémon to view detailed information  
- Display Pokémon types, stats, abilities, height, and weight  
- Responsive layout for desktop, tablet, and mobile  
- Loading states for API requests  

## Technologies Used  

- React  
- React Router  
- Axios  
- GraphQL Pokémon API (https://graphqlpokemon.favware.tech/v8)  
- CSS  

## Project Structure  

- `App.jsx` – Handles routing  
- `Home.jsx` – Landing page with search  
- `SearchResults.jsx` – Displays Pokémon list and filters  
- `PokemonDetails.jsx` – Shows detailed Pokémon data  
- `PokemonCard.jsx` – Individual Pokémon card component  
- `PokemonGrid.jsx` – Grid layout and load more functionality  
- `pokemonApi.js` – Handles API requests  


## How It Works  

- The home page allows users to search for a Pokémon  
- The app fetches a list of Pokémon from the GraphQL API  
- Results are displayed in a grid (6 at a time)  
- Clicking a Pokémon routes to `/pokemon/:id`  
- A second API call fetches detailed data for that Pokémon  
- The details page displays stats, abilities, and other information  
