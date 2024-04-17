<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      locations: [],
    };
  },
  async mounted() {
    const route = useRoute();
    const id = route.params.id;
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const response = await fetch(`http://localhost:3000/v1/itinerary/${id}`);
    const data = await response.json();
    this.locations = data.iaResponse;

    console.log(this.locations);

    const markers = this.locations.map((location) => {
      return L.marker([
        location.location.latitude,
        location.location.longitude,
      ]).addTo(map);
    });

    const group = new L.featureGroup(markers);
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
