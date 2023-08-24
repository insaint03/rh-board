let utils = {
    url: (hostname, pathname, params, hash) => {
        let pathes = pathname.split('/')
            .filter((t)=>t && 0<t.trim().length)
            .join('/');
        let ln = new URL(`${hostname}/${pathes}`);
        ln.hostname = hostname;
        ln.pathname = pathes;
        ln.search = params 
            ? '?'+Object.entries(params)
                .map(([k,v])=>`:${k}=${v}`)
                .join('&')
            : '';
        ln.hash = hash ? `#${encodeURIComponent(hash)}` : '';
        return ln.href; 
    },
    include: (url)=>(new Promise((rs)=>{
        let el = document.querySelector(`script[src*="${url}"]`)
        if(el) { 
            rs(); 
        } else {
            el = document.createElement('script');
            el.src = url;
            el.async = true;
            el.addEventListener('load', rs);

            document.body.appendChild(el);
        }
    })),
    until: ((validation, timeout, lookups)=>{
        timeout = Math.min(timeout || 60e3, 60e3);
        lookups = Math.max(timeout/1e3, 100);
        let _intv;
        return new Promise((rs,rj)=>{
            let till = Date.now();

            _intv = setInterval(()=>{
                // timeout
                if(Date.now() <= till) {
                    rj('timeout');
                }
                let v = validation();
                // resolve validation truethy
                if(v) {
                    rs(v);
                }
                // reject when validation "false"
                else if(v===false) {
                    rj();
                }
            }, lookups);
        }).finally(()=>clearInterval(_intv));
    }),
    read: (location)=>{
        return new Promise((rs)=>{
            let reader = new FileReader();
            reader.addEventListener('load', ()=>{
                rs(reader.result);
            });
            reader.readAsText(location);
        });
    },
    gets: (pathname, params)=> {
        return new Promise((rs,rj)=>{
            let xhr = new XMLHttpRequest();
            let location = new URL(`${window.location.protocol}//${window.location.host}${process.env.BASE_URL}`);
            location.pathname = pathname;
            Object.entries(params || {})
                .forEach((ps)=>location.searchParams(...ps));
            xhr.addEventListener('load', ()=>{
                rs(xhr);
            });
            xhr.addEventListener('error', rj)
            xhr.open('GET',location);
            xhr.send();
        })
    },
    // loads: (...scripts) => {
    //     return Object.fromEntries(scripts.map((src)=>[
    //         src, new Promise((rs,rj)=>{
    //             let e = document.querySelector(`script[src*="${src}"]`);
    //             if(e!=null) { rs(e); }
    //             else {
    //                 e = Object.assign(document.createElement('script'), {
    //                     src,
    //                     async: true,
    //                 });
    //                 e.addEventListener('load', rs);
    //                 e.addEventListener('error', rj);
    //                 (document.head || document.documentElement)
    //                     .appendChild(e);
    //             }
    //         })
    //     ]));
    // }
}

utils.install = function(Vue) {
    Vue.prototype.utils = utils;
}

export default utils;