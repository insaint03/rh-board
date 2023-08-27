<template>
    <CardSection :key="`d3-canvas.${latest}`">
        <div class="d3-canvas" ref="d3" style="min-height: 300px;">
            <svg class="d3-canvas-svg" :viewBox="`0,0,${width},${height}`" :width="width" :height="height" style="max-width: 100%; height: auto;">
                <g v-bind="styles.background || {}">
                    <g v-bind="styles.nodes || {}">
                        <component v-for="node in nodes" :key="`d3-node.${node.id}`"
                            :is="node.shape || 'circle'" v-bind="node"
                            :cx="node.x" :cy="node.y"  />
                    </g>
                    <g v-bind="styles.links || {}">
                        <component v-for="link in links" :key="`d3-link.${link.id}`"
                            :is="link.shape || 'line'" v-bind="link"
                            :strokeWidth="link.weight || link.value || 1"
                            :x1="link.source.x" :y1="link.source.y"
                            :x2="link.target.x" :y2="link.target.y" />
                    </g>
                </g>
            </svg>
        </div>
    </CardSection>
</template>

<script>
import CardSection from './CardSection.vue';
import utils from '@/utils';
import setup from '@/setup';

export default {
    name: 'GraphCard',
    props: [
        'd3',
        'data',
    ],
    components: {
        CardSection,
    },
    methods: {
        refresh() {
            if(!this.nodes) {
                this.nodes = this.$props.data.nodes.map((d)=>({...d}));
                this.links = this.$props.data.links.map((d)=>({...d}));
            } 
            
            utils.until(()=>window.d3 && this.$refs.d3)
                .then(()=>{
                    this.width = this.$refs.d3.offsetWidth;
                    this.height = this.$refs.d3.offsetHeight;
                    const d3 = window.d3;
                    // copy node/link data
                    if(!this.simulation) {
                        this.simulation = d3.forceSimulation(this.nodes)
                            .force('link', d3.forceLink(this.links).id((d=>d.id)))
                            .force('charge', d3.forceManyBody())
                            .on('tick', ()=>{
                                this.updated = Date.now();
                            });
                    } else {
                        this.simulation.stop();
                    }

                    this.simulation
                        .force('center', d3.forceCenter(this.width/2, this.height/2));
                });
        },
        on_dragstart(ev) {
            console.log('start', ev);
            if(ev.active) {
                this.simulation.alphaTarget(0.3).restart();
            }
            ev.subject.fx = ev.subject.x;
            ev.subject.fy = ev.subject.y;
        },
        on_dragging(ev) {
            console.log('ing', ev);
            ev.subject.fx = ev.x;
            ev.subject.fy = ev.y;
        },
        on_dragend(ev) {
            console.log('end', ev);
            if(!ev.active) {
                this.simulation.alphaTarget(0);
            }
            ev.subject.fx = null;
            ev.subject.fy = null;
        }
    },
    mounted() {
        // start force simulation
        utils.include(setup.d3.src);
        this.refresh();
    },
    watch: {
        width() {
            this.refresh();
        },
    },
    // updated() {
    //     this.refresh();
    // },
    data() {
        let signature = Math.round(1e6 * Math.random()).toString().replace(/[^\d]+/g, '');
        return {
            simulation: null,
            nodes: null,
            links: null,
            width: null, 
            height: null,
            canvas_id: `d3-${signature}-${Date.now()}`,
            latest: Date.now(),
            styles: this.$props.styles || {},

        };
    }
}
</script>