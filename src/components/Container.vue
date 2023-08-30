<template>
    <!-- wrapper root -->
    <div>
        <!-- container -->
        <div class="md-layout" v-for="row,ri in cards" :key="`c-row-${ri}`">
            <!-- card section -->
            <div class="md-layout-item" v-for="cell,ci in row" :key="`it-cell-${ri}.${ci}`">
                <!-- cell tableau -->
                <component :is="binding_component(cell)" v-bind="cell" />
            </div>
        </div>
    </div>
</template>

<script>
import tableauCard from '@/components/TableauCard'
// import graphCard from '@/components/GraphCard'
import networkCard from '@/components/NetworkCard'

export default {
    name: 'containerSection',
    components: {
        tableauCard,
        // graphCard,
        networkCard,
    },
    methods: {
        binding_component(cell) {
            switch(true) {
                case cell.tableau!=null: return 'tableau-card';
                case cell.d3 != null: return 'network-card';
                case cell.text != null: return 'pre';
                default: return 'div';
            }
        },
        binding_attributes(cell) {
            const excepts = ['tableau','d3','text'];
            return Object.fromEntries(Object.entries(cell)
                .filter(([k,])=>!excepts.includes(k)));
        },
    },
    data() {
        return {
            cards: this.cardboards(this.$route.path),
        };
    }
}
</script>