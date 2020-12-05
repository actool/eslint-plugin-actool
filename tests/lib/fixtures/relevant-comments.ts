type DictionariesAPI = {
    getSchedules: () => any;
    getVehicles: () => any;
    /** Method comment */
    getIssueStatuses: () => any;
}

// TODO: fix types
const API = {} as DictionariesAPI;

/** data preprocess
 * with a lot of whitespaces
 */



function processData(some: any) {
    return some;
};

/**
 * Get schedules from server
 */
const getSharedDictionaries = async () => {
    /**
     * some note
     * TODO: some todo
     */
    const { data: schedules } = await API.getSchedules();
    const { data: vehicles } = await API.getVehicles();
    // FIXME: optimize
    const { data: issueStatuses } = await API.getIssueStatuses();

    return {
        schedules: processData(schedules),
        vehicles: processData(vehicles),
        issueStatuses: processData(issueStatuses),
    }
}

/**
 * TODO: simplify fetching
 * FIXME: types
 * UPD: new info
 */