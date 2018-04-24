class PlantGenus {

  constructor(height, branch, flex, leafshape, leafprob, color1, color2, color3) {

  }

  generateNewPlant(locx, locy, locz) {
    var newPlant = new Plant(this.height, this.branch, this.flex, this.leafshape, this.leafprob, this.color1, this.color2, this.color3);
    this.plantArray.push(newPlant);
  }


}
