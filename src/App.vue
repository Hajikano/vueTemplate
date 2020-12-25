<template>
    <div id="app">
        <router-view :hidden="item.routeID !== $iDCRouter.getTopRoute().routeID" v-for="item in $iDCRouter.stack" :key="item.routeID"> </router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    mounted() {},
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
