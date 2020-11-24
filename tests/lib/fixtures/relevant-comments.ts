// TODO: fix types
const API = {} as any;

/**
 * Get schedules from server
 */
const getDictionaries = async () => {
    const { data: schedules } = await API.getSchedules();
    return schedules;
}

/**
 * TODO: simplify fetching
 * FIXME: types
 */