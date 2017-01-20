<template>
    <div id="app">
        <circular-progress-bar :value="80"></circular-progress-bar>
    </div>
</template>

<script>
    import CircularProgressBar from './CircularProgressBar.vue';

    export default {
        name: 'app',
        components: {
            CircularProgressBar
        }
    }
</script>

<style>
</style>
