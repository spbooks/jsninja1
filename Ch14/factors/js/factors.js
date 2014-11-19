function factorsOf(n) {

  if (n < 0) {
    throw new RangeError("Argument Error: Number must be positive");
  }

  if (Math.floor(n) !== n) {
    throw new RangeError("Argument Error: Number must be an integer");
  }
  
  var factors = [];
  for (var i=1 , max = Math.sqrt(n); i <= max ; i++) {
    if (n%i === 0){
      factors.push(i,n/i);
    }
  }
  return factors.sort(function(a,b) { return a > b; });
}

self.addEventListener('message', function(event) {
  
  var factors = String(factorsOf(Number(event.data)));
  self.postMessage(factors);
  self.close();

}, false);



