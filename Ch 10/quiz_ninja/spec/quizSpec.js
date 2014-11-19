var question;

beforeEach(function() {
  question = { "question": "Superman", "answer": "Clarke Kent" };
})


describe("A correct answer is given", function() {
  
    var answer = "Clarke Kent";

    it("should mark it correct", function() {
      expect(test()).toEqual(1);
    });
    
    it("should increase the score by 1", function() {
      expect(function(){ factorsOf(negative) }).toThrow();
    });
    
    it("should throw an exception for non-integer numbers", function() {
      expect(function(){ factorsOf(decimal) }).toThrow();
    });

  });

describe("A correct answer is given", function() {
  
    var answer = "Lois Lane";

    it("should mark it wrong", function() {
      expect(hi()).toEqual("hi");
    });
    
    it("should not change the score", function() {
      expect(function(){ factorsOf(negative) }).toThrow();
    });
    
    it("should throw an exception for non-integer numbers", function() {
      expect(function(){ factorsOf(decimal) }).toThrow();
    });

  });
