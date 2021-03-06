/*By: Nathan Coggins and KateLynn Pullen
Last Modified 1 May 201
Project URL: http://arden.cs.unca.edu/~ncoggins/CSCI346.Spring2018/FinalProject/*/

//unimplemented class

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
    var bWidth = (.75 * width) + (.25 * Math.random() * width) * 1/depth;
    var tWidth = (.50 * width) + (.25 * Math.random() * width) * 1/depth;

    vertArray = calculateVerts(height, bWidth, tWidth);

    objArray.push(new plantObject(this.color1, vertArray, faceArray));
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

  calculateVerts(height, bWidth, tWidth) {


  }

  map(r, c) {
    //TODO
  }
}
