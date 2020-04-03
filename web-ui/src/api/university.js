let universities = [];

export const fetchUniversities = (data) => {
    const client = data[0];
    const query = data[1];
    const variable = data[2];
    return new Promise(resolve => {
        client.query({query: query, variables: {usersub: variable}}).then( res => {
            universities = res.data.universities;
            resolve(universities)
        });
    });    
};

export const addUniversity = (data) => {
    const client = data[0];
    const mutation = data[1];
    const variable = data[2];
    return new Promise(resolve => {
        client.mutate({mutation: mutation, variables: {university: variable}}).then( res => {
            universities.push(res.data.university.returning[0]);
            resolve(universities);
        });
    });
};

export const editUniversity = (data) => {
    const client = data[0];
    const mutation = data[1];
    const variable = data[2];
    return new Promise(resolve => {
        client.mutate({mutation: mutation, variables: {university: variable}}).then( res => {
            const result = res.data.university.returning[0];
            const university = universities.filter(u => u.id === result.id)[0];
            if (!university) {
                return Promise.reject(Error('no university'));
            };
            university.value = result.value;
            resolve(universities);
        });
    });
};