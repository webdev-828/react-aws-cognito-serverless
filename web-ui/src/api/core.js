var cores = [];
var delay = 300;

export const setCore = (core) => {
    cores = core.core.map(cor => (
        {
            id: cor.id,
            name: cor.name,
            url: cor.url,
            date: cor.date
       }
    ));
};

export const fetchCore = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(cores), delay)
   })
}