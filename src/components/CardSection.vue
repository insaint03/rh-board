<template>
    <md-card>
        <md-card-media>
            <slot></slot>
        </md-card-media>
        <md-card-media-actions>
            <md-card-actions>
                <md-icon>favorite</md-icon>
            </md-card-actions>
        </md-card-media-actions>
    </md-card>
</template>

<script>
export default {
    name: 'CardSection',
    data() {
        return {

        };
    }
}
</script>
