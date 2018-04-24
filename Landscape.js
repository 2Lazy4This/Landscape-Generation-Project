class Landscape {

  // var size, height, skew, distance;
  // var array, colorArray;

  constructor(size, height, skew, distance) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map
    this.skew = skew; //the random value applied to each midpoint - higher values result in rougher terrain
    this.distance = distance; //how large the squares/triangles of the map
    var array = [];
    this.array = array;
    //"real" map size is size * distance
  }



  generate() {
    //I love it when questions are asked in StackOverflow and the response is "You don't need to do this, do [x that doesn't work with your implementation] instead!".
    //1D array representation size 5
    //   0 1 2 3 4
    // 0 a b c d e
    // 1 f g h i j
    // 2 k l m n o
    // 3 p q r s t
    // 4 u v w x y
    // would be represented in a 1D array as:
    // a (position 0) b c d e f (position size) g h i j k (position size* 2) l m n o p (position size * 3) q r s t u (position size * 4) v w x y
    //position of row n will be size * n, where n begins at 0
    //position of column m will be size * n + m, where m begins at 0
    //1D array representation with offset of 3, size 3
    //   0  -  -  1  -  -  2  -  -
    // 0 a  a1 a2 b  b1 b2 c  c1 c2
    // 1 d  d1 d2 e  e1 e2 f  f1 f2
    // 2 g  g1 g2 h  h1 h2 i  i1 i2
    //1D array:
    //a (position 0) a1 a2 b (position 3) b1 b2 c (position 6) c1 c2 d (position 9) d1 d2 e (position 12) e1 e2 f f1 f2 g g1 g2 h h1 h2 i i1 i2
    //position of row n will be size * n * 3, where n begins at 0
    //position of column m BASE VALUES (a, b, c, etc) will be (size * n * 3) + (m * 3)
    //position of column m SECONDARY VALUES (a1, a2, b1, etc) will be (size * n * 3) + (m * 3) + x, where x is what number of secondary value you want (a1 will be 1, b2 is 2)

    var halfdis = (this.distance * this.size)/2;

    for(var i = 0; i < this.size; i++) { //i value is row
      for(var j = 0; j < this.size; j++) { //j value is column
        var pos = (this.size * i * 3) + (j * 3);
        this.array[pos] = j * this.distance - halfdis; //x position
        this.array[pos + 1] = i * this.distance - halfdis; //y position
        this.array[pos + 2] = 0; //heightmap/z value not generated yet, so initialized to 0
      }
    }
    //z values in particular will be at (size * i * 3) + (j * 3) + 2 for i, 0 -> size and j, 0 -> size
    //go ahead and generate the array values of the z for the first four corners of the map
    var position1 = 2; //(size * 0 * 3) + (0 * 3) + 2 - top left
    var position2 = ((this.size - 1) * 3) + 2; //(size * 0 * 3) + ((size -1) * 3) + 2 - top right
    var position4 = (this.size * (this.size - 1) * 3) + 2; //(size * (size - 1) * 3) + (0 * 3) + 2 - bottom left
    var position3 = (this.size * (this.size - 1) * 3) + ((this.size - 1) * 3) + 2; //(size * (size - 1) * 3) + ((size - 1) * 3) + 2 - bottom right

    this.array[position1] = Math.random() * this.height; //pick random height values for the starting edges
    this.array[position2] = Math.random() * this.height;
    this.array[position3] = Math.random() * this.height;
    this.array[position4] = Math.random() * this.height;

    this.fillArray(position1, position2, position3, position4, 1);

    var total = this.size * this.size * 3;
    var gridVertices = [];
    for(var i = 0; i < total; i = i + 3) {
        //console.log(this.array[i] + "," + this.array[i + 1] + "," + this.array[i + 2]);
        gridVertices.push(new THREE.Vector3(this.array[i], this.array[i + 1], this.array[i + 2]));
    }

    //console.log(gridVertices);

    var gridTriangles = [];
    for (var r = 0; r < this.size - 1; r++) {
        for (var c = 0; c < this.size - 1; c++) {
            gridTriangles.push(new THREE.Face3(this.map(r, c), this.map(r + 1, c), this.map(r + 1, c + 1)));
            gridTriangles.push(new THREE.Face3(this.map(r, c), this.map(r + 1, c + 1), this.map(r, c + 1)));
            //console.log(gridTriangles);
        }//col
    }//row
    this.gridVertices = gridVertices;
    this.gridTriangles = gridTriangles;
  }

  map(r, c) {
      return (this.size * r) + c;
  };

  // pos1 - - - - posMU - - - - pos2
  // -                           -
  // -                           -
  // -                           -
  // -                           -
  // posL - - - - posCent - - - posR
  // -                           -
  // -                           -
  // -                           -
  // -                           -
  // pos4 - - - - posMD - - - - pos3

  fillArray(pos1, pos2, pos3, pos4, depth) {
    var posMU = this.rectCenter(pos1, pos2); //determines center location between two edge positions
    var posR = this.rectCenter(pos2, pos3);
    var posMD = this.rectCenter(pos3, pos4);
    var posL = this.rectCenter(pos4, pos1);

    if (posMU == -1 || posR == -1 || posMD == -1 || posL == -1) {
      return false;
    }

    //TODO ensure not -1 before moving forward. is this even necessary, though? do math.

    this.array[posMU] = this.rectAverage(pos1, pos2, depth); //determines average height at that point, plus some noise
    this.array[posR] = this.rectAverage(pos2, pos3, depth);
    this.array[posMD] = this.rectAverage(pos3, pos4, depth);
    this.array[posL] = this.rectAverage(pos4, pos1, depth);

    var posCent = this.diamondCenter(posMU, posR, posL, posMD); //finds centerpoint of four midpoints (diamond)
    if (posCent != -1) {
      this.array[posCent] = this.diamondAverage(posMU, posR, posL, posMD, depth);
      depth = depth + 1;
      this.fillArray(pos1, posMU, posCent, posL, depth); //recursively continues to set values based on centers
      this.fillArray(posMU, pos2, posR, posCent, depth); //stops when no more points are available to fill
      this.fillArray(posCent, posR, pos3, posMD, depth);
      this.fillArray(posL, posCent, posMD, pos4, depth);
    }
  }

  diamondCenter(pos1, pos2, pos3, pos4) {
    var newPos = (pos1 + pos2 + pos3 + pos4)/4;
    if (Number.isInteger(newPos)) {
      return newPos;
    } else {
      return -1; //if not integer, centerpoint is not a valid position
    }
  }

  rectCenter(pos1, pos2) {
    var newPos = (pos1 + pos2)/2;
    if (Number.isInteger(newPos)) {
      return newPos;
    } else {
      return -1; //if not integer, the points are next to each other, and that area has been filled
    }
  }

 rectAverage(edge1, edge2, depth) { //given two edges, returns the midpoint value +- some random skew
   var average = (this.array[edge1] + this.array[edge2])/2;
   //var nuskew = this.skew * Math.abs(edge1 - edge2)/(this.size * this.size * 3); Honestly makes really cool "strip mine" effects.
   var nuskew = this.skew * (1/(depth * depth));
   average = average + (Math.random() * nuskew) - nuskew/2;
   return average;
 }

  diamondAverage(edge1, edge2, edge3, edge4, depth) { //given four edges, returns the midpoint value +- some random skew
    var average = (this.array[edge1] + this.array[edge2] + this.array[edge3] + this.array[edge4])/4;
    //var nuskew = this.skew * Math.abs(edge1 - edge2)/(this.size * this.size * 3); Honestly makes really cool "strip mine" effects.
    var nuskew = this.skew * (1/(depth * depth));
    average = average + (Math.random() * nuskew) - nuskew/2;
    return average;
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
