/**
 * @typedef LineIdentity Identity of line
 * @property {string} file Path to file
 * @property {number} line Line index
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
 * @typedef LineCommit Line commit details
 * @property {string} hash Hash
 * @property {string} author Author
 * @property {Date} date Date
 * @property {number} line Line
 */
