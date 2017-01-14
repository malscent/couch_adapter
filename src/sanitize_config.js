"use strict";

const aliases = ["PASS", "USER", "PWD", "PASSWORD", "USERNAME"];

const sanitize = function (config) {
    for (let prop in config) {
        // first check if property is an object.  If it is we need to go deeper!
        if ((typeof config[prop] === "object") && (config[prop] !== null)) {
            sanitize(config[prop]);
        } else if (aliases.indexOf(prop.toUpperCase()) >= 0) { // if we detect any of the aliases, we can perform the swap.
            config[prop] =  new Array(config[prop].length + 1).join("*");
        }
    }
    return config;
};

module.exports = sanitize;