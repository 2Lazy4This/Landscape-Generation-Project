class PlantGenus {

  constructor(height, width, branch, flex, leafshape, leafprob, skew, angle, leafstart, maxdepth, color1, color2, color3) {
    this.height = height;
    this.width = width;
    this.branch = branch;
    this.flex = flex;
    tihs.leafshape = leafshape;
    this.leafprob = leafprob;
    this.skew = skew;
    this.angle = angle;
    this.leafstart = leafstart;
    this.maxdepth = maxdepth;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
  }

  generateNewPlant(locx, locy, locz) {
    var newPlant = new Plant(locx, locy, locz, this);
    this.plantArray.push(newPlant);
  }


}
