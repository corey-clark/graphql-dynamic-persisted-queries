module.exports = {
  1: `query Greeting($name: String) {
        greeting(name: $name) {
          name
          text
        }
    }`
}
