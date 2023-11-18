// EventEmitter.js
class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }

    off(eventName, callback) {
        const callbacks = this.events[eventName];
        if (callbacks) {
          this.events[eventName] = callbacks.filter(cb => cb !== callback);
        }
      }
  
    emit(eventName, data) {
      const callbacks = this.events[eventName];
      if (callbacks) {
        callbacks.forEach(callback => callback(data));
      }
    }
  }
  
  const eventEmitter = new EventEmitter();
  export default eventEmitter;
  