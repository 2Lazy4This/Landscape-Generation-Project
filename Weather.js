class Weather {

  //I think this is going to return already-made meshes, for ease of movement of the objects?

  constructor(cloudiness) {
    this.maxClouds = 200;
    this.positionArray = [];
    this.meshArray = [];
    this.cloudAmount = cloudiness * this.maxClouds;
    this.cloudSize = 1;
    //TODO INITIALIZE MATERIALS
  }

  generate() {
    for (var i = 0; i < this.cloudAmount; i++) {
      var cloudGeo = new THREE.SphereGeometry(0.25 * this.cloudSize + 0.75 * Math.random() * this.cloudSize, 32, 32, Math.PI, Math.PI * 2);
      var cloudMat = new THREE.MeshBasicMaterial ({color: 0xFFFFFF, side:THREE.DoubleSide});
      var cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.x = 0;
      cloud.position.y = 0;
      cloud.position.z = 0;
      this.meshArray.push(cloud);
    }
  }

  cycle(amount, winddir) {
    for (var i = 0; i < this.cloudAmount; i++) {
      //TODO: UPDATE POSITION ARRAY
    }
  }


}
