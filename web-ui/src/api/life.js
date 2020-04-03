var lifeArr = [];
var delay = 300;

export const setLife = (lifes) => {
    lifeArr = lifes.life.map(lif => (
        {
            id: lif.id,
            name: lif.name,
            url: lif.url,
            date: lif.date
        }
    ));
};

export const fetchLife = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(lifeArr), delay)
    })
}