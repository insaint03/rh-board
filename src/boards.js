{
    tableau: {
        host: 'https://public.tableau.com',
        params: {
            display_static_image: 'y',
            bootstrapWhenNotified: true,
            embed: true,
            language: 'ko-KR',
            showVizHome: 'n',
            apiID: 'host0#navType=2',
            navSrc: 'Parse',
        }
    },
    routes: {
        '/': [
            [
                {
                    cols: '12',
                    width: null,
                    height: '50vh',
                    tableau: 'MakeoverMonday2023Week31-DrinkingFountainsinMilan/MM2023W31',
                },
            ],
            [
                {
                    d3: 'network',
                    width: null,
                    height: null,
                    data: {
                        nodes: [
                            {id: 1, label: 'One', shape: 'circle', style: {r: 5, fill: '#e0e0e0', stroke: '#000', 'stroke-width': 1} },
                            {id: 2, label: 'Two', shape: 'rect', style: { width: 5, height: 5, rx: 1.5, ry: 1.5, fill: '#e0e0e0'} },
                            {id: 3, label: 'Tri', shape: 'ellipse', style: {rx: 7.5, ry: 5, fill: '#e0e0e0'} },
                        ],
                        links: [
                            {id: 'first', source: 1, target: 2, style: {}},
                            {id: 'second', source: 2, target: 3, style: {}},
                            {id: 'third', source: 3, target: 1, style: {}},
                        ],
                    }
                }
            ]
        ],
    }
}