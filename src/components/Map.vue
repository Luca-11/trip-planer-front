<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute } from "vue-router";

export default {
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },

  // A lifecycle hook that is called when the component is mounted
  async mounted() {
    const route = useRoute();
    const id = route.params.id;
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Adding a tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,

      // Adding an attribution to the map
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Fetching the itinerary by id from the server
    // const response = await fetch(`http://localhost:3000/v1/itinerary/${id}`);
    // const data = await response.json();
    // this.locations = data.iaResponse;

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
  z-index: 0;
  height: 40vh;
  width: 100%;
}
</style>
