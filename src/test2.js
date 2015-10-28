var test2 = 1;

// blank lines entered to test source map
class Friend {
  constructor() {
    throw Error("stack shows error from original source")
  }
}

new Friend()
