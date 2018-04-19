class Water {

  // var size, height, skew, distance;
  // var array, colorArray;

  constructor(size, height, skew, distance) {
    this.size = size; //size of map in any direction, in vertex points
    this.height = height; //maximum height of things on the map
    this.skew = skew; //the random value applied to each midpoint - higher values result in rougher terrain
    this.distance = distance; //how large the squares/triangles of the map
    //"real" map size is size * distance
  }

}
