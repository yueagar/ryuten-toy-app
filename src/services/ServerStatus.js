import { create } from "zustand";

const store = create((set) => ({
    regions: {
        as: [],
        eu: [],
        na: [],
        sa: []
    },
    setServer: (region, id, data) => set((state) => {
        // console.log(region, id, data);
        return {
            regions: {
                ...state.regions,
                [region]: state.regions[region].findIndex(server => server.id === id) > -1
                    ? state.regions[region].map(server => server.id === id
                        ? { ...data, id }
                        : server)
                    : state.regions[region].concat({ ...data, id })
            }
        };
    })
}));

const get = (region, id) => {
    return fetch(`https://${region}.ryuten.io/server-0${id}/info`, {
        mode: 'cors'
    }).then(response => response.json());
};

const getAll = () => {
    ["as", "eu", "na", "sa"].forEach(region => {
        for (let id = 1; id <= 5; id++) {
            get(region, id)
                .then(data => store.getState().setServer(region, id, data));
        }
    });
}

const autoUpdateInterval = setInterval(() => {
    getAll();
}, 60000);

export default { store, get, getAll, autoUpdateInterval };