/**
 * @fileoverview Toolkit for code / comments actuality and relevance checking
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// import configs
module.exports.configs = {
    recommended: {
        plugins: ["actool"],
        rules: {
            "actool/max-tags": 2,
            "actool/relevant-comments": 2,
        },
    },
};
