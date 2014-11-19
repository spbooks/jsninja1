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
