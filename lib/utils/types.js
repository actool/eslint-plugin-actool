/**
 * @typedef LineIndex
 * @property {number} line Line index
 */

/**
 * @typedef FileIndex
 * @property {string} file Path to file
 */

/**
 * @typedef {LineIndex & FileIndex} LineIdentity Identity of line
 */

/**
 * @typedef BaseLoc Base location of block
 * @property {{ line: number }} start Start line
 * @property {{ line: number }} end End line
 */
/**
 * @typedef BlockIdentity Identity of block
 * @property {string} file Path to file
 * @property {BaseLoc} loc Block location (from context)
 */

/**
 * @typedef Commit Commit details
 * @property {string} hash Hash
 * @property {string} author Author
 * @property {Date} date Date
 */

/**
 * @typedef {Commit & LineIndex} LineCommit Line commit details
 */
