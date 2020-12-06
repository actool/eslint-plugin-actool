module.exports.commit1 = {
    author: "Ilya Azin",
    date: "2020-11-02 09:51:49+0300",
    commit: "b6988094"
};
module.exports.commit2 = {
    author: "Ilya Azin",
    date: "2020-11-02 10:05:41+0300",
    commit: "a0e08b6b"
};
module.exports.commit3 = {
    author: "Ilya Azin",
    date: "2020-11-02 11:51:49+0300",
    commit: "c6988094"
};
module.exports.commit4 = {
    author: "Ilya Azin",
    date: "2020-11-02 13:40:49+0300",
    commit: "e0e08b6b"
};
module.exports.commit5 = {
    author: "Ilya Azin",
    date: "2020-12-02 16:00:49+0300",
    commit: "f6988094"
};

module.exports.commitsHistory = [
    module.exports.commit1,
    module.exports.commit2,
    module.exports.commit3,
    module.exports.commit4,
    module.exports.commit5,
];

module.exports.lineRevision = [
    `b6988094 (Ilya Azin 2020-11-02 09:51:49 +0300  1) import React from "react";`,
    `a0e08b6b (Ilya Azin 2020-11-02 10:05:41 +0300  2) import { Button } from "antd";`,
    `b6988094 (Ilya Azin 2020-11-02 09:51:49 +0300  3) import { useAuth } from "../hooks";`,
];

module.exports.lineRevisionFullData = [
    {
        line: `b6988094 (Ilya Azin 2020-11-02 09:51:49 +0300  1) import React from "react";`,
        data: {
            hash: 'b6988094',
            author: 'Ilya Azin',
            date: new Date('2020-11-02 09:51:49 +0300'),
            line: 1,
        },
    },
    {
        line: `e411fb43 (Ilya Azin 2020-11-29 06:52:45 +0300 20)     "publish:minor": "npm version minor && npm publish",`,
        data: {
            hash: 'e411fb43',
            author: 'Ilya Azin',
            date: new Date('2020-11-29 06:52:45 +0300'),
            line: 20,
        },
    },
]

module.exports.rangeSamples = [
    {
        from: 0,
        to: 5,
        array: [0,1,2,3,4],
    },
    {
        from: -3,
        to: -2,
        array: [-3],
    },
    {
        from: -2,
        to: 3,
        array: [-2,-1,0,1,2],
    },
]

module.exports.validateDays = [
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/30/2020"),
        diff: 12, 
        result: false,
    },
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/12/2020"),
        diff: 1, 
        result: true,
    },
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/30/2020"),
        diff: 50, 
        result: true,
    },
]

module.exports.validateCommits = [
    {
        commit1: {
            date: new Date("9/11/2020"),
        },
        commit2: {
            date: new Date("9/11/2020"),
        },
        diff: 1,
        result: true,
    }
]