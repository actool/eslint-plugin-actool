/**
 * Generate array by boundaries
 * @param {number} from
 * @param {number} to
 */
const range = (from, to) => {
    return new Array(to - from).fill(null).map((_, it) => it + from);
};

module.exports ={
    range,
};
