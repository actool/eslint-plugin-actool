/**
 * Generate array by boundaries
 * @param {number} from
 * @param {number} to
 */
module.exports.range = function range(from, to) {
    return new Array(to - from).fill(null).map((_, it) => it + from);
};
