var int, negative, decimal;

beforeEach(function() {
  int = Math.floor(100*Math.random());
  negative = int*-1;
  decimal = Math.floor + 0.5;
});


describe("The factorsOf() function", function() {

    it("should find the factors of 12", function() {
      expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
    });
    
    it("should throw an exception for negative numbers", function() {
      expect(function(){ factorsOf(negative) }).toThrow();
    });
    
    it("should throw an exception for non-integer numbers", function() {
      expect(function(){ factorsOf(decimal) }).toThrow();
    });

  });

describe("The isPrime() function", function() {

    it("should say 2 is prime", function() {
      expect(isPrime(2)).toBe(true);
    });
        
    it("should say 10 is not prime", function() {
      expect(isPrime(10)).not.toBe(true);
    });
    
    it("should say a negative number is not prime", function() {
      expect(isPrime(negative)).toBe(false);
    });

    it("should say a non-integer is not prime", function() {
      expect(isPrime(decimal)).toBe(false);
    });

  });
