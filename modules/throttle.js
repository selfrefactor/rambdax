function throttle (callback, limit) {
    let wait = false       
    return function () {   
        if (!wait) {       
            callback.call()
            wait = true    
            setTimeout(function () {
                wait = false        
            }, limit)
        }
    }
}

module.exports = throttle