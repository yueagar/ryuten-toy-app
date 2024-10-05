import { create } from "zustand";

const store = create((set) => ({
    regions: {
        as: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        eu: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        na: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        sa: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    },
    time: new Date().toLocaleTimeString(),
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
            },
            time: new Date().toLocaleTimeString()
        };
    })
}));

const get = (region, id) => {
    return fetch(`https://${region}.ryuten.io/server-0${id}/info`, {
        mode: 'cors'
    }).then(response => response.json());
};

const getAll = () => {
    console.log("* Getting all servers' data");
    ["as", "eu", "na", "sa"].forEach(region => {
        for (let id = 1; id <= 5; id++) {
            get(region, id)
                .then(data => !compare(store.getState().regions[region][id - 1], { ...data, id }) && store.getState().setServer(region, id, data));
        }
    });
}

const getOne = (region, id) => {
    get(region, id)
        .then(data => !compare(store.getState().regions[region][id - 1], { ...data, id }) && store.getState().setServer(region, id, data));

}

const compare = (a, b) => a.id === b.id && a.alive === b.alive && a.players === b.players;

const autoUpdateInterval = setInterval(() => {
    getAll();
}, 60000);

export default { store, get, getAll, getOne, autoUpdateInterval };