<template>
    <card-section v-bind="bindings" :key="`d3-network.${latest}`">
        <div ref="d3">
            <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`"
                    @mousemove="drag_running"
                    @mouseup="drag_end">
                <g class="layer-links" v-if="0<links.length">
                    <line v-for="link in links" :key="`network-link.${link.id}`" v-bind="link.style"
                        :x1="link.source.x" :y1="link.source.y"
                        :x2="link.target.x" :y2="link.target.y"
                        :stroke="link.style.stroke || '#ccc'"
                        :stroke-opacity="link.style.strokeOpacity || 0.5"
                    />
                </g>
                <g class="layer-nodes" v-if="0<nodes.length">
                    <g v-for="node in nodes" :key="`network-node.${node.id}.shape`">
                        <component 
                            v-bind="node.style || {r: 10, stroke: '#ccc', fill: 'transparent'}"
                            :is="node.shape || 'circle'"
                            :cx="node.x" :cy="node.y" 
                            :x="node.x" :y="node.y"
                            @mouseover="hovering=node.id"
                            @mousedown="(ev)=>drag_start(ev, node)"
                        />
                        <text v-show="show_all_labels || (node.id == hovering)" :x="node.x+10" :y="node.y-10" :class="`label ${node.class || ''} node-${node.id}`">{{ node.title || node.label || node.id }}</text>
                    </g>
                </g>
            </svg>
        </div>
    </card-section>
</template>

<script>
import CardSection from '@/components/CardSection.vue'
import utils from '@/utils'
import setup from '@/setup'

export default {
    name: 'NetworkCard',
    props: [
        'd3',
        'network',
    ],
    components: {
        CardSection,
    },
    mounted() {
        utils.include(setup.d3.src);
        this.refresh();
    },
    methods: {
        refresh() {
            utils.until(()=>window.d3 && this.$refs.d3)
                .then(()=>{
                    const d3 = window.d3;
                    this.width = this.$refs.d3.offsetWidth;
                    this.height = Math.max(this.width*(.65), this.$refs.d3.offsetHeight);
                    this.dim = Math.max(this.width/4, this.height/4, 600);
                    if(this.simulation!=null) return;

                    // show labels while first 5sec.
                    const _interval = setup.d3.show_label_interval;
                    this.show_all_labels = true;
                    if(0<_interval) {
                        setTimeout(()=>this.show_all_labels = false, _interval*1e3);
                    }

                    this.simulation = d3.forceSimulation(this.nodes)
                        .force('link', d3.forceLink(this.links).id(d=>d.id).distance(Math.sqrt(this.nodes.length * this.dim)/2).strength(0.5))
                        .force('charge', d3.forceManyBody())
                        .force('center', d3.forceCenter(this.width/2, this.height/2))
                        .on('tick', ()=>{
                            const tick = Date.now();
                            if(setup.d3.update_frame < Math.abs(tick - this.latest))  {
                                // update tick
                                this.latest = tick;
                            }

                            //
                        });
                })
        },
        drag_start(ev, node) {
            this.simulation.stop();
            // start dragging active
            if(this.dragging!=null) {
                this.dragging = null;
                this.simulation.alpha(0.1).restart();
            }
            // stop simulation
            
            this.dragging = node;
            this.dragging.cx = this.dragging.x = ev.offsetX;
            this.dragging.cy = this.dragging.y = ev.offsetY;
            // console.log('start', ev, node);
        },
        drag_running(ev) {
            this.simulation.stop();
            if(this.dragging == null) {
                this.simulation.alpha(0.1).restart();
                return;
            }
            
            this.dragging.cx = this.dragging.x = ev.offsetX;
            this.dragging.cy = this.dragging.y = ev.offsetY;
            this.latest = Date.now();
        },
        drag_end(ev) {
            this.simulation.stop();
            if(this.dragging!=null) {
                this.dragging = null;
                this.simulation.alpha(0.1).restart();
            }
        }
    },
    data() {
        
        //
        return {
            width: null,
            height: null,
            dim: 0,
            nodes: this.$props.network.nodes.map((d)=>({...d})),
            links: this.$props.network.links.map((d)=>({...d})),
            latest: Date.now(),
            simulation: null,
            bindings: {
                title: this.$props.network.title || 'D3 Graph',
                actions: [],
            },
            show_all_labels: true,
            hovering: null,
            dragging: null,
        }
    }
}
</script>
<style scoped>
svg text.label {
    font-size: 12px;
    font-family: sans-serif;
    color: #ccc;
    opacity: 0.5;
}
</style>