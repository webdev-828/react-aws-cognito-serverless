var careerArr = [];
var delay = 300;

export const setCareer = (careers) => {
    careerArr = careers.career.map(care => (
        {
            id: care.id,
            name: care.name,
            url: care.url,
            date: care.date
        }
    ));
};

export const fetchCareer = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(careerArr), delay)
    })
}