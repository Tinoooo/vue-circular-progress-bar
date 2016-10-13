<template>
    <div class="circular-progress-bar">
        <span><slot>{{value}}</slot></span>
        <div class="slice" :class="{'greater-than-50':greaterThan50}">
            <div class="bar" :style="{transform: 'rotate(' + progress/100*360 + 'deg)', backgroundColor: barColor}"></div>
            <div v-show="greaterThan50" class="bar fill" :style="{backgroundColor: barColor}"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            value: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            barColor: {
                type: String,
                default: '#49802c'
            }
        },
        computed: {
            greaterThan50() {
                return this.progress > 50;
            },
            progress() {
                return Math.max(Math.min((this.value / (this.max - this.min)) * 100, 100), 0);
            }
        }
    }
</script>

<style rel="stylesheet/scss" type="text/css" lang="scss">
    @import 'mixins';

    .circular-progress-bar {
        @include circular-progress-bar(150px, .2);

        $circle-background-color: #cecece;
        $inner-background-color: #fff;
        $text-color: #000;
        $font-size: 25px;

        *, *:before, *:after {
            box-sizing: content-box;
        }

        border-radius: 100%;
        background: $circle-background-color;

        .slice.greater-than-50 {
            clip: rect(auto, auto, auto, auto) !important;
        }

        &:after {
            display: block;
            content: " ";
            border-radius: 50%;
            background-color: $inner-background-color;
        }

        > span {
            font-size: $font-size;
            z-index: 1;
            left: 0;
            top: 0;
            text-align: center;
            color: $text-color;
            display: block;
            white-space: nowrap;
        }

        .bar {
            border-radius: 50%;
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
