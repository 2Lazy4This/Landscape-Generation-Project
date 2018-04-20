class Water {

  // var size, height, skew, distance;
  // var array, colorArray;

  constructor(size, height, skew, distance, winddir) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map/altitude
    this.skew = skew; //closeness of the waves to each other/wavelength
    this.distance = distance; //how large the squares/triangles of the map
    //"real" map size is size * distance
    this.degree = 0;
    this.tau = 2 * Math.PI;
    var array = [];
    var degreeArray = [];
    this.array = array;
    this.degreeArray = degreeArray;
    this.winddir = winddir;
  }

  generate() {
    for(var i = 0; i < this.size; i++) { //i value is row
      for(var j = 0; j < this.size; j++) { //j value is column
        var pos = (this.size * i * 3) + (j * 3);
        this.array[pos] = j * this.distance; //x position
        this.array[pos + 1] = i * this.distance; //y position
        this.degreeArray[(i * 9) + j] = ((Math.cos(winddir) * i) + (Math.sin(winddir) * j))/skew; //<--- this should produce waves that match the wind direction
        this.array[pos + 2] = Math.sin(degreeArray[i]) * this.height;
      }
    }
  }

  cycle(amount, winddir) {
    this.degree = this.degree + amount;
    var sizesq = this.size * this.size;
    for(var i = 0; i < sizesq; i++) {
      degreeArray[i] = degreeArray[i] + amount;
      if(degreeArray[i] > this.tau) {
        degreeArray[i] = degreeArray[i] - this.tau;
      }
      if(this.winddir != winddir) {
        //insert reaction to real-time wind changes here
      }
      array[(i * 3) + 2] = Math.sin(degreeArray[i]) * this.height;
    }
  }

}
