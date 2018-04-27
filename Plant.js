class Plant {

  constructor(locx, locy, locz, pl) {
    this.locx = locx;
    this.locy = locy;
    this.locz = locz;
    this.objArray = [];
    this.pl = pl;
    rGenerate(0, 0, 0, 0, 0);
  }

  //pl has the following attributes: height, width, branch, flex, leafshape, leafprob, skew, angle, leafstart, maxdepth, color1, color2, color3
  rGenerate(locx, locy, locz, depth, xyAngle, zAngle) {

    var height = (.75 * height) + (.25 * Math.random() * height) * 1/depth;
    var bWidth =
    var tWidth =

    objArray.push(new plantObject(colorArray, vertArray, faceArray));
    if (depth < pl.maxdepth) {
      var branches = [];
      var leaves = [];
      depth++;
      //TODO
      for (i = 0; i < branches.length; i = i + 5) {
        rGenerate(branches[i], branches[i+1], branches[i+2], branches[i+3], branches[i+4], depth);
      }
    }
  }
}
