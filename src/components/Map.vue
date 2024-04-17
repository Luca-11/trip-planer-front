<script>
// Importing Leaflet, a JavaScript library for interactive maps
import L from "leaflet";
// Importing the CSS for Leaflet
import "leaflet/dist/leaflet.css";
// Importing useRoute from vue-router to access the route parameters
import { useRoute } from "vue-router";

export default {
  // Defining the component's data
  data() {
    return {
      // An array to store the locations fetched from the server
      locations: [],
    };
  },
  // A lifecycle hook that is called when the component is mounted
  async mounted() {
    // Getting the current route
    const route = useRoute();
    // Extracting the id from the route parameters
    const id = route.params.id;
    // Creating a map and setting its view to a given latitude and longitude
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Adding a tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      // Adding an attribution to the map
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Fetching the itinerary by id from the server
    const response = await fetch(`http://localhost:3000/v1/itinerary/${id}`);
    // Parsing the response to JSON
    const data = await response.json();
    // Updating the locations with the data from the server
    this.locations = data.iaResponse;

    // Logging the locations for debugging purposes
    console.log(this.locations);

    // Creating markers for each location and adding them to the map
    const markers = this.locations.map((location) => {
      return L.marker([
        location.location.latitude,
        location.location.longitude,
      ]).addTo(map);
    });

    // Creating a feature group with the markers
    const group = new L.featureGroup(markers);
    // Adjusting the map to show all the markers
    map.fitBounds(group.getBounds());
  },
};
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 60svh;
  width: 100%;
  z-index: 0;
}
</style>
