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
      var cloudGeo = new THREE.SphereGeometry(0.25 * this.cloudSize + 0.75 * Math.random() * this.cloudSize, 4, 4, 0, Math.PI * 2);
      var diffuseColor = new THREE.Color(1.0, 1.0, 1.0);
      var specularColor = new THREE.Color(1.0, 1.0, 1.0);
      var cloudMat = new THREE.MeshStandardMaterial({
          color: diffuseColor,
          specular: specularColor,
          reflectivity: 0.01,
          shininess: 0.01
      });
      var cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.x = 0;
      cloud.position.y = 0;
      cloud.position.z = 0;
      cloud.rotation.y = Math.PI;
      cloud.rotation.x = Math.PI;
      cloud.rotation.z = Math.PI;
      this.meshArray.push(cloud);
    }
  }

  cycle(amount, winddir) {
    for (var i = 0; i < this.cloudAmount; i++) {
      //TODO: UPDATE POSITION ARRAY
    }
  }


}
