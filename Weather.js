class Weather {

  //I think this is going to return already-made meshes, for ease of movement of the objects?

  constructor(cloudiness) {
    this.maxClouds = 200;
    this.positionArray = [];
    this.meshArray = [];
    this.cloudAmount = cloudiness * this.maxClouds;
    //TODO INITIALIZE MATERIALS
  }

  generate() {

  }

  cycle(amount, winddir) {
    for (i = 0; i < cloudAmount; i++) {
      //TODO: UPDATE POSITION ARRAY
    }
  }


}
