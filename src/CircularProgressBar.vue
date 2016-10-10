<template>
    <div class="circular-progress-bar">
        <span><slot>{{progress}}%</slot></span>
        <div class="slice" :class="{'greater-than-50':greaterThan50}">
            <div class="bar" :style="{transform: 'rotate(' + progress/100*360 + 'deg)'}"></div>
            <div v-show="greaterThan50" class="bar fill"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            progress: {
                type: Number,
                required: true,
                validator(value) {
                    return value <= 100 && value >= 0;
                }
            }
        },
        computed: {
            greaterThan50() {
                return this.progress > 50
            }
        }
    }
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">
    @import "./variables";

    .circular-progress-bar {

        *, *:before, *:after {
            box-sizing: content-box;
        }

        width: $circle-diameter;
        height: $circle-diameter;
        border-radius: 100%;
        background: $circle-background-color;

        .slice {
            clip: rect(0, $circle-diameter, $circle-diameter, $circle-diameter/2);

            &.greater-than-50 {
                clip: rect(auto, auto, auto, auto) !important;
            }
        }

        &:after {
            top: ($circle-diameter - ($circle-diameter*(1-$border-width-ratio)))/2;
            left: ($circle-diameter - ($circle-diameter*(1-$border-width-ratio)))/2;
            display: block;
            content: " ";
            border-radius: 50%;
            background-color: $inner-background-color;
            width: $circle-diameter*(1-$border-width-ratio);
            height: $circle-diameter*(1-$border-width-ratio);
        }

        > span {
            font-size: $font-size;
            z-index: 1;
            left: 0;
            top: 0;
            text-align: center;
            color: $text-color;
            line-height: $circle-diameter;
            display: block;
            white-space: nowrap;
        }

        .bar {
            background-color: $bar-color;
            border-radius: 50%;
            clip: rect(0, $circle-diameter/2, $circle-diameter, 0);
        }

        .fill {
            transform: rotate(180deg) !important;
        }

        &, .slice, &:after, > span, .bar {
            position: absolute;
        }

        .slice, > span, .bar {
            width: 100%;
            height: 100%;
        }
    }

</style>
