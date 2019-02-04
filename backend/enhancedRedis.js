const Redis = require('ioredis')

class EnhancedRedis extends Redis {
  set(key, value, options = {}) {
    if (options.ttl)
      return super.set(key, value, 'ex', options.ttl)    

    return super.set(key, value)
  }
}

module.exports = EnhancedRedis
