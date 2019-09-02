## e-Travel frontend assignment

The app lists all Star Wars movies from a provided endpoint with the following functionality:

* List of retrieved movies
* Filter movies based on a search term.
* Sort the movie list based on year an episode.
* Display details of a selected movie when it is clicked.
* Show a default message if no movie is selected.

Main project consists of three components, List, Dropdown and the generic App component. 
These components combined provide the requested result.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

Tests include:

* Initial test that App renders
* A generic test to check if a phrase exists in the container. 
* Test data are correctly rendered by the List component.
* When a movie is clicked, the description is shown
* Test that component Dropdown correctly toggles the class show on click
