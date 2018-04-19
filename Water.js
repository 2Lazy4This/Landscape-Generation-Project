class Water {

  // var size, height, skew, distance;
  // var array, colorArray;

  constructor(size, height, skew, distance) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map
    this.skew = skew; //the random value applied to each midpoint - higher values result in rougher terrain
    this.distance = distance; //how large the squares/triangles of the map
    //"real" map size is size * distance
    this.degree = 0;
    this.tau = 2 * Math.PI;
    var array = [];
    var degreeArray = [];
    this.array = array;
    this.degreeArray = degreeArray;
  }

  generate() {

    for(var i = 0; i < this.size; i++) { //i value is row
      for(var j = 0; j < this.size; j++) { //j value is column
        var pos = (this.size * i * 3) + (j * 3);
        this.array[pos] = j * this.distance; //x position
        this.array[pos + 1] = i * this.distance; //y position
        this.array[pos + 2] = 0 //TODO: the degreeArray could be initialized here, and from that the height array, but need to think more on math
      }
    }


  }

  cycle(amount) {
    this.degree = this.degree + amount;
    var sizesq = this.size * this.size;
    for(var i = 0; i < sizesq; i++) {
      degreeArray[i] = degreeArray[i] + amount;
      if(degreeArray[i] > this.tau) {
        degreeArray[i] = degreeArray[i] - this.tau;
      }
      array[(i * 3) + 2] = Math.sin(degreeArray[i]) * this.height;
    }
  }

}
