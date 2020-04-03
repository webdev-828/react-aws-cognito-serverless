var collegeArr = [];
var delay = 300;

export const setCollege = (colleges) => {
    collegeArr = colleges.college.map(coll => (
        {
            id: coll.id,
            name: coll.name,
            url: coll.url,
            date: coll.date
        }
    ));
};

export const fetchCollege = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(collegeArr), delay)
    })
}