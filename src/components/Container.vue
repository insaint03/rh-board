<template>
    <!-- wrapper root -->
    <div>
        <!-- container -->
        <div class="md-layout" v-for="row,ri in cards" :key="`c-row-${ri}`">
            <!-- card section -->
            <div class="md-layout-item" v-for="cell,ci in row" :key="`it-cell-${ri}.${ci}`">
                <!-- cell tableau -->
                <template v-if="cell.tableau">
                    <tableau-card :path="cell.tableau" />
                </template>
                <template v-else-if="cell.d3">
                    <graph-card v-bind="cell" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import tableauCard from '@/components/TableauCard'
import graphCard from '@/components/GraphCard'

export default {
    name: 'containerSection',
    components: {
        tableauCard,
        graphCard,
    },
    data() {
        return {
            cards: this.cardboards(this.$route.path),
        };
    }
}
</script>