-not compiler safe atm-

class landscape {
  var size, height, skew, distance;
  var array, colorArray;
  constructor(size, height, skew, distance) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map
    this.skew = skew; //the random value applied to each midpoint - higher values result in rougher terrain
    this.distance = distance; //how large the squares/triangles of the map average
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

    for(i = 0; i < size; i++) { //i value is row
      for(j = 0; j < size; j++) { //j value is column
        var pos = (size * i * 3) + (j * 3);
        array[pos] = j * distance; //x position
        array[pos + 1] = i * distance; //y position
        array[pos + 2] = 0; //heightmap/z value not generated yet, so initialized to 0
      }
    }
    //z values in particular will be at (size * i * 3) + (j * 3) + 2 for i, 0 -> size and j, 0 -> size
    //go ahead and generate the array values of the z for the first four corners of the map
    position1 = 2; //(size * 0 * 3) + (0 * 3) + 2 - top left
    position2 = ((size - 1) * 3) + 2; //(size * 0 * 3) + ((size -1) * 3) + 2 - top right
    position3 = (size * (size - 1) * 3) + 2; //(size * (size - 1) * 3) + (0 * 3) + 2 - bottom left
    position4 = (size * (size - 1) * 3) + ((size - 1) * 3) + 2; //(size * (size - 1) * 3) + ((size - 1) * 3) + 2 - bottom right

    array[position1] = Math.random() * height; //pick random height values for the starting edges
    array[position2] = Math.random() * height;
    array[position3] = Math.random() * height;
    array[position4] = Math.random() * height;
  }

  fillArray(pos1, pos2, pos3, pos4) {
    var newPos = diamondCenter(pos1, pos2, pos3, pos4);
    if (newPos != -1) {
      array[newPos] = diamondAverage(array[pos1], array[pos2], array[pos3], array[pos4]);
      fillArray(pos1, pos2, pos3, newPos); //recursively continues to set values based on centers
      fillArray(pos1, pos2, newPos, pos4); //stops when no more points are available to fill
      fillArray(pos1, newPos, pos3, pos4);
      fillArray(newPos, pos2, pos3, pos4);
    }
  }

  diamondCenter(pos1, pos2, pos3, pos4) {
    return -1;
    //TODO calculate center point, return -1 if center point is only 1 offset from edges
  }

 rectangleAverage(edge1, edge2) { //given two edges, returns the midpoint value +- some random skew
   var average = (edge1 + edge2)/2;
   average = average + (Math.random() * skew) - skew/2;
   return average;
 }

  diamondAverage(edge1, edge2, edge3, edge4) { //given four edges, returns the midpoint value +- some random skew
    var average = (edge1 + edge2 + edge3 + edge4)/4;
    average = average + (Math.random() * skew) - skew/2;
    return average;
  }

  get array() {
    return this.array;
  }

  get colorArray() {
    return this.colorArray;
  }

}
