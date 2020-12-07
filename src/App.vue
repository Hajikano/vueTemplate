<template>
    <div id="app">
        <router-view :hidden="$route.path !== item.path" v-for="item in stack" :key="item.path"></router-view>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {},
    data() {
        return {
            stack: this.$iDCRouter.stack,
        };
    },
    mounted() {},
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
