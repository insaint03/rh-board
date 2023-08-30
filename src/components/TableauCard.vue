<template>
    <CardSection class="tableau-card" v-bind="bindings">
        <div class="tableau-placeholder" ref="viz" /> 
    </CardSection>
</template>

<script>
import CardSection from '@/components/CardSection.vue';

export default {
    name: 'TableauCard',
    mounted() {
        let { src, host, endpoint, params} = this.setup.tableau;
        let placeholder = this.$refs.viz;
        let location = endpoint(this.tableau, host);
        let options = Object.assign({}, params, this.params || {});

        console.log('tableau options', options);
        this.utils.include(src)
        this.utils.until(()=>window.tableau && placeholder)
            .then(()=>{
                this.viz = new window.tableau.Viz(placeholder, location, options)
            });
        
    },
    props: [
        'path',
        'params',
        'tableau',
        'title',
        'subtitle',
        'description',
    ],
    components: {
        CardSection,
    },
    computed: {
    },
    data() {
        return {
            viz: null,
            bindings: {
                title: this.title,
                actions: [
                    {icon: 'link', click: ()=>window.open(this.setup.tableau.host, '_blank')},
                    {icon: 'mail', click: ()=>alert(`tableau ${this.title}`)},
                ]
            }
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