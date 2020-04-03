var dashboards = [];
var delay = 300;

export const setDashboard = (dashboard) => {
    dashboards = dashboard.dashboard.map(dash => (
        {
            id: dash.id,
            name: dash.name,
            url: dash.url,
            date: dash.date
       }
    ));
};

export const fetchDashboard = () => {
    return new Promise(resolve => {
        setTimeout(_=> resolve(dashboards), delay)
   })
}