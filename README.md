# Description:
This is an SPA created to pass a coding challenge of Agrilution, a company that builds vertical farming devices with which a customer can grow plants. This app represents a user interface for users to get information about specific plants and modify the LED intensity.
Various color types have certain effects on the plants. Each plant requires a different mix of color spectrum, and expects a certain min and max range on the spectrum intensity. 
<br>
The colors are:
- blue
- white
- red
- far-red

## Deployed app
The deployed app is hosted on GitHub pages here:
<br>
https://mlatysheva.github.io/agrilution_app 

## API Endpoint 

The following api endpoint was used for this app:

Secured:
https://dev.api.agrilution.com/plantData.json

The endpoint returns an object with different fields. An example and explanation of these fields is shown below:

Example:
```json
"some_id": {
	"title": "Kale",
	"description": "abc",
	"images": ["url"],
	"light_settings": {
		"blue": [33, 74],
		"farred": [13, 94],
		"red": [3, 78],
		"white": [2, 79]
	},
	"price": "9.95",
	"tags": ["harvestweeks:3-4", "line:essentials"]
}
```

Explanation:
```
some_id = a unique id for each plant
title = the english title of the plant
description = a description for the plant
images = urls pointing to one or more images of the plant
light_settings = the range of light settings allowed in %. In this example, the plant can handle any blue light intensity between 33 and 74% 
price = the price for the plant in euros
tags = a list of tags which describe the plants
```

## Implemented functionality
- The data is retrieved from the above endpoint dynamically (the initial data is loaded from the json file contained within this repository)
- The UI implements the following features:
	- There is a list of all available plants
	- The user can select a specific plant
	- The selected plant is opened in a seperated route: /plants/:id.
  - The selected plant page provides the following functionality:
		- It showcases the features of the plant
		- Guides the user through the effects of different colors
		- Lets the user select a light intensity for each color that lies within the intensity range specified for this plant (e.g. "blue": [30, 100] means that the minimum intensity is 30% and the maximum intensity is 100%)
		- Ensures that the overall light value (all colours added up) does not exceed 300%
    - Enables the user to filter all plants by a given tag from the selected plant page. The list of the filtered plants is mounted in the selected plant page and the user can click on another plant in the filtered list, which will be opened in a separate route page

## Bonus Tasks implemented:
- Different urls based on the id are used for each selected plant
- Creative UIs and responsive design are implemented
- SCSS is used
- A tag search is implemented whereby the user can click on a tag on the plant specific page and see a list with all available plants that have the same tag, mounted into the selected plant page

## Stack used:
- Typescript
- React
- Redux: to store the information about the plants, the selected plant and its current light settings, as well as the selected tag and the plants filtered by the given tag
- SCSS
- axios: to fetch the data from the external API

## Installation and usage

1. Clone the repository to your local machine by running `git clone https://mlatysheva@bitbucket.org/agrilution-os/frontend_ws_latysheva.git` from your terminal
2. `cd` into the cloned repository
3. Run `npm install` from the terminal to install all the dependencies
4. Run `npm run start` to start the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.
5. Run `npm run build` to build the app for production to the `build` folder.\
The build is minified and the filenames include the hashes.\

## Functionality

- The app has `/`, `/*`, `/plants` and `/plants/:id` routes and corresponding pages rendered as an SPA
- The `/plants` page displays the list of available plants with the information kept and updated in the Redux store:
<br>

![Plants page](screeshotsUI/screenshot_plants.png)

![Plants page with Redux](screeshotsUI/screenshot_plants_redux.png)
<br>

- The `/plants:id' page displays the characteristics of the selected plant, a section where the user can click on a tag to see all plants with the given tag and a section where the user can change the LED settings. The information about the selected plant and its LED settings, as well as the selected tag and filtered plants is kept and updated in the Redux store:
<br>

![Selected plant page](screeshotsUI/screenshot_selected_plant.png)
<br>

- The list of the tags is interactive. If the user clicks on a tag, a list with the corresponding plants will be mounted into the selected plant page with the information kept in the Redux store:
<br>
![Selected plant page with tagged plants with Redux](screeshotsUI/screenshot_tagged_with_redux.png)
<br>

- If the total LED settings exceed 300, the user will be prompted to reduce the LED settings for other lights before increasing them for the desired light:
<br>

![Selected plant page with a message for the excess of 300 LED](screeshotsUI/screenshot_plant_error_with_redux.png)
<br>

- Responsive design is provided:
<br>
![Home screen mobile](screeshotsUI/screenshot_mobile_home.png)
![Plant card mobile](screeshotsUI/screenshot_mobile_plants.png)
![LED settings on mobile](screeshotsUI/screenshot_mobile_settings.png)
