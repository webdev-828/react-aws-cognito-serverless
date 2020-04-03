var implementations = [];
var delay = 300;

export const setImplementation = (implementation) => {
    implementations = implementation.implementation.map(cor => (
        {
            id: cor.id,
            name: cor.name,
            url: cor.url,
            date: cor.date
       }
    ));
};

export const fetchImplementation = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(implementations), delay)
   })
}