<template>
    <md-card>
        <!-- expansion -->
        <md-card-actions md-alignment="space-between">
            <div>
                <md-button
                    v-for="act,ai in (actions||[])" :key="`card.${ai}`" 
                    v-bind="act" :class="act.icon ? 'md-icon-button' : ''">
                    <md-icon v-if="act.icon">{{ act.icon }}</md-icon>
                    <template v-else>{{ act.title || act.label || act.text }}</template>
                </md-button>
            </div>

            <div class="md-title" v-if="title!=null">{{ title }}</div>
            <!--
            <md-card-expand-trigger>
                <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
            </md-card-expand-trigger>
            -->
        </md-card-actions>
        <md-card-media>
            <slot></slot>
        </md-card-media>
    </md-card>
</template>

<script>
export default {
    name: 'CardSection',
    props: {
        title: String,
        subtitle: String,
        description: String,
        actions: Array,

    },
    mounted() {
        // console.log(this.$props);
    },
    data() {
        return {

        };
    }
}
</script>
