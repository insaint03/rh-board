<template>
    <CardSection :key="`d3-canvas.${latest}`">
        <div class="d3-canvas" ref="d3" style="min-height: 300px;">
        </div>
    </CardSection>
</template>

<script>
import CardSection from './CardSection.vue';
import utils from '@/utils';
import setup from '@/setup';

const _d3s = (vn, obj, setter)=>
    Object.entries(obj).reduce((g,en)=>g[setter || 'attr'](...en), vn);

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
            const _nodes = this.$props.data.nodes.map((d)=>({...d}));
            const _links = this.$props.data.links.map((d)=>({...d}));
            
            utils.until(()=>window.d3 && this.$refs.d3)
                .then(()=>{
                    this.width = this.$refs.d3.offsetWidth;
                    this.height = this.$refs.d3.offsetHeight;
                    const d3 = window.d3;
                    const _root = d3.select(this.$refs.d3);
                    const _dim = Math.max(this.width/10, this.height/10, 400);

                    this.canvas = _d3s(_root.append('svg'), {
                        width: this.width, 
                        height: this.height, 
                        viewBox: [0,0,_dim,_dim], 
                        style: 'max-width: 100%; min-height: 600px; height: auto;'
                    });
                    

                    //
                    this.links = _d3s(this.canvas.append('g'), {
                        stroke: '#999', 'stroke-opacity': .6,
                    }).selectAll().data(_links)
                        .join('line')
                        .attr('stroke-width', d=>Math.sqrt(d.value || d.weight || 1));
                    
                    // appending node symbols
                    // 
                    this.nodes = _d3s(this.canvas.append('g'), {
                        stroke: '#fff', 'stroke-width': 1.5
                    }).selectAll().data(_nodes).join('circle');

                    _d3s(this.nodes, {
                        r: (d)=>{ 
                            console.log('node', d);
                            return (d.r || d.size || 5)
                        },
                        fill: (d)=>(d.fill || d.color || '#999999'),
                        stroke: (d)=>(d.stroke || d.color || '#999999'),
                        'stroke-width': (d)=>(d['stroke-width'] || 1),
                    });


                    this.nodes.append('title').text(d=>d.name || d.label || d.id);
                    // this.nodes.call(d3.drag()
                    //     .on('start', this.on_dragstart)
                    //     .on('drag', this.on_dragging)
                    //     .on('end', this.on_dragend));

                    this.simulation = d3.forceSimulation(_nodes)
                        .force('link', d3.forceLink(_links).id(d=>d.id).strength(0.5))
                        .force('charge', d3.forceManyBody().strength(0.5))
                        .force('center', d3.forceCenter(_dim/2,_dim/2).strength(0.5))
                        .on('tick', ()=>{
                            _d3s(this.links, {
                                x1: d=>d.source.x, y1: d=>d.source.y,
                                x2: d=>d.target.x, y2: d=>d.target.y,
                            });
                            _d3s(this.nodes, {
                                cx: d=>d.x, cy: d=>d.y,
                            });
                        });

                    // clear canvas & fill
                    this.$refs.d3.innerHTML = '';
                    this.$refs.d3.append(...this.canvas.nodes());

                });
        },
        on_dragstart(ev) {
            if(ev.active) {
                this.simulation.alphaTarget(0.3).restart();
            }
            ev.subject.fx = ev.subject.x;
            ev.subject.fy = ev.subject.y;
        },
        on_dragging(ev) {
            ev.subject.fx = ev.x;
            ev.subject.fy = ev.y;
        },
        on_dragend(ev) {
            if(!ev.active) {
                this.simulation.alphaTarget(0);
            }
            ev.subject.fx = null;
            ev.subject.fy = null;
        },
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
            canvas: null,
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