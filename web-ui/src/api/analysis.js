var analysisArr = [];
var delay = 300;

export const setAnalysis = (analysis) => {
    analysisArr = analysis.analysis.map(anal => (
        {
            id: anal.id,
            name: anal.name,
            url: anal.url,
            date: anal.date
       }
    ));
};

export const fetchAnalysis = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(analysisArr), delay)
   })
}