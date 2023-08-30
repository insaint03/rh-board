// import {url} from '@/utils';

const setup = {
    tableau: {
        host: 'https://public.tableau.com',
        src: 'https://public.tableau.com/javascripts/api/tableau-2.9.2.min.js',
        endpoint(pathname, host){
            return `${host || this.host}/views/${pathname}`;
        },
        params: {
            hideTabs: true,
            hideToolbar: true,
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
        show_label_interval: 15, // 15초, <0 perpetual
        update_frame: 100, // 0.1 초 화면 갱신
    },
    datafile: process.env.BASE_URL+'boards.json',
    includes: [
    ],
};

setup.install = function(Vue) {
    Vue.prototype.setup = setup;
}

export default setup;