class Water {

  // var size, height, skew, distance;
  // var array, colorArray;

  constructor(size, height, skew, distance, winddir) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map/altitude
    this.skew = skew; //closeness of the waves to each other/wavelength
    this.distance = distance; //how large the squares/triangles of the map
    //"real" map size is size * distance
    this.tau = 2 * Math.PI;
    var array = [];
    var degreeArray = [];
    this.array = array;
    this.degreeArray = degreeArray;
    this.winddir = winddir;
  }

  maptoArray() {
    var total = this.size * this.size * 3;
    var gridVertices = [];
    for(var i = 0; i < total; i = i + 3) {
        gridVertices.push(new THREE.Vector3(this.array[i], this.array[i + 1], this.array[i + 2]));
    }
    var gridTriangles = [];
    for (var r = 0; r < this.size - 1; r++) {
        for (var c = 0; c < this.size - 1; c++) {
            gridTriangles.push(new THREE.Face3(this.map(r, c), this.map(r + 1, c), this.map(r + 1, c + 1)));
            gridTriangles.push(new THREE.Face3(this.map(r, c), this.map(r + 1, c + 1), this.map(r, c + 1)));
        }//col
    }//row
    this.gridVertices = gridVertices;
    this.gridTriangles = gridTriangles;
  }

  map(r, c) {
      return (this.size * r) + c;
  };

  generate() {
    var halfdis = (this.distance * this.size)/2;
    for(var i = 0; i < this.size; i++) { //i value is row
      for(var j = 0; j < this.size; j++) { //j value is column
        var pos = (this.size * i * 3) + (j * 3);
        this.array[pos] = j * this.distance - halfdis; //x position
        this.array[pos + 1] = i * this.distance - halfdis; //y position
        this.degreeArray[(i * 9) + j] = ((Math.cos(this.winddir) * i * this.skew) + (Math.sin(this.winddir) * j * this.skew)); //<--- this should produce waves that match the wind direction
      }
    }
    this.updateWaves();
  }

  updateWaves() {
    for(var i = 0; i < this.size; i++) { //i value is row
      for(var j = 0; j < this.size; j++) { //j value is column
        var pos = (this.size * i * 3) + (j * 3);
        this.array[pos + 2] = Math.sin(this.degreeArray[(i * 9) + j]) * this.height;
      }
    }
  }

  cycle(amount, winddir) {
    var sizesq = this.size * this.size;
    for(var i = 0; i < sizesq; i++) {
      this.degreeArray[i] = this.degreeArray[i] + amount;
      if(this.degreeArray[i] > this.tau) {
        this.degreeArray[i] = this.degreeArray[i] - this.tau;
      }
      if(this.winddir != winddir) {
        //insert reaction to real-time wind changes here
      }
    }
    this.updateWaves();
  }

  get getArray() {
    return this.array;
  }

  get getVertices() {
    return this.gridVertices;
  }

  get getFaces() {
    return this.gridTriangles;
  }

  get getColorArray() {
    return this.colorArray;
  }

}


//unimplemeneted support for water movement
// seaMesh.geometry.dispose();
// scene.remove(seaMesh);
// sea.cycle(0.1, 0);
// sea.maptoArray();
// seaGeometry = new THREE.Geometry();
// seaGeometry.vertices = sea.getVertices;
// seaGeometry.faces = sea.getFaces;
// seaGeometry.computeFaceNormals();
// seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
// seaMesh.position.x = 0;
// seaMesh.position.y = -0.5;
// seaMesh.position.z = 0;
// seaMesh.rotation.x = Math.PI / 1.8;
// scene.add(seaMesh);
