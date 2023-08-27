// import {url} from '@/utils';

const setup = {
    tableau: {
        host: 'https://public.tableau.com',
        src: 'https://public.tableau.com/javascripts/api/tableau-2.9.2.min.js',
        endpoint(pathname, host){
            return `${host || this.host}/views/${pathname}`;
        },
        params: {
            display_static_image: 'y',
            bootstrapWhenNotified: 'true',
            embed: 'true',
            language: 'ko-KR',
            showVizHome: 'n',
            apiID: 'host0#navType=2',
            navSrc: 'Parse',
        },
    },
    d3: {
        src: 'https://cdn.jsdelivr.net/npm/d3@7',
    },
    datafile: process.env.BASE_URL+'boards.json',
    includes: [
    ],
};

setup.install = function(Vue) {
    Vue.prototype.setup = setup;
}

export default setup;