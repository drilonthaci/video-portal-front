class ObservableState {
    constructor(initialValue) {
      this.value = initialValue;
      this.subscribers = [];
    }
  
    next(value) {
      this.value = value;
      this.subscribers.forEach(subscriber => subscriber(value));
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
      callback(this.value);
  
      return {
        unsubscribe: () => {
          this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
        }
      };
    }
  }
  export default ObservableState;