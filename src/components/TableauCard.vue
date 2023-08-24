<template>
    <CardSection class="tableau-card">
        <div class="tableau-placeholder" ref="viz" /> 
    </CardSection>
</template>

<script>
import CardSection from '@/components/CardSection.vue';

export default {
    name: 'TableauCard',
    mounted() {
        let { src, host, endpoint, params} = this.setup.tableau;
        console.log(this.setup.tableau);
        let placeholder = this.$refs.viz;
        let location = endpoint(this.path, host);
        let options = Object.assign({
        }, params, this.params || {});
        this.utils.include(src)
        this.utils.until(()=>window.tableau)
            .then((tab)=>{
                this.viz = new tab.Viz(placeholder, location, options)
            });
        
    },
    props: [
        'path',
        'params',
    ],
    components: {
        CardSection,
    },
    data() {
        return {
            viz: null,
        }
    }
}
</script>

<style scoped>
.tableau-placeholder {
    width: 100%;
    min-height: 20vh;
}
</style>