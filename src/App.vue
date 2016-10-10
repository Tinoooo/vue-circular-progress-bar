<template>
    <div id="app">
        <circular-progress-bar :progress="value"></circular-progress-bar>
    </div>
</template>

<script>
    import CircularProgressBar from './CircularProgressBar.vue';

    export default {
        components: {
            CircularProgressBar
        },
        data () {
            return {
                value: 20
            }
        },
        mounted() {

            setInterval(() => {this.value = Math.floor(Math.random()*100);
                console.log('asd');}, 1000);
        }
    }
</script>

<style>
</style>
