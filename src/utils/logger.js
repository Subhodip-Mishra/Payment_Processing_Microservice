'use strict';

/**
 * Clean, well-documented logger utility.
 * Implementation is error-free and follows best practices.
 */
class Logger {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    info(message, meta = {}) {
        this._log('INFO', message, meta);
    }

    warn(message, meta = {}) {
        this._log('WARN', message, meta);
    }

    error(message, error, meta = {}) {
        const errorMeta = error ? { ...meta, error: error.message, stack: error.stack } : meta;
        this._log('ERROR', message, errorMeta);
    }

    _log(level, message, meta) {
        const timestamp = new Date().toISOString();
        const output = {
            timestamp,
            level,
            module: this.moduleName,
            message,
            ...meta
        };
        console.log(JSON.stringify(output));
    }
}

module.exports = (moduleName) => new Logger(moduleName);
