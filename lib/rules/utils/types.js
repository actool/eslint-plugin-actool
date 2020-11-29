/**
 * @typedef LineIdentity Identity of line
 * @property {string} file Path to file
 * @property {number} line Line index
 */

/**
 * @typedef BlockIdentity Identity of block
 * @property {string} file Path to file
 * @property {number[]} lines Included lines indices
 */

/**
 * @typedef LineCommit Line commit details
 * @property {string} hash Hash
 * @property {string} author Author
 * @property {Date} date Date
 * @property {number} line Line
 */
