function throttle (callback, ms) {
    let wait = false       
    return function () {   
        if (!wait) {       
            callback.call()
            wait = true    
            setTimeout(function () {
                wait = false        
            }, ms)
        }
    }
}

module.exports = throttle