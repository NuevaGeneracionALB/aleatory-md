const usedCommandRecently = new Set()

/**
 * Check is number filtered
 * @param  {String} from
 */
const isFiltered = (sender) => !!usedCommandRecently.has(sender)

/**
 * Add number to filter
 * @param  {String} from
 */
const addFilter = (sender) => {
    usedCommandRecently.add(sender)
    setTimeout(() => usedCommandRecently.delete(sender), 5000) 
}

module.exports = {
    isFiltered,
    addFilter
}
