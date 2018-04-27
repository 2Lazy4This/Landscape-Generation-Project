class Weather {

//I think this is going to return already-made meshes, for ease of movement of the objects?

constructor(cloudiness) {
this.maxClouds = 200;
        this.positionArray = [];
        this.meshArray = [];
        this.cloudAmount = cloudiness * this.maxClouds;
        this.cloudSize = 0.75;
}

generate() {
for (var i = 0; i < this.cloudAmount; i++) {
var cloudGeo = new THREE.SphereGeometry(0.25 * this.cloudSize + 0.75 * Math.random() * this.cloudSize, 4, 4, Math.PI, Math.PI * 2);
        var diffuseColor = new THREE.Color(0.9, 0.9, 0.9);
        var specularColor = new THREE.Color(1.0, 1.0, 1.0);
        var cloudMat = new THREE.MeshBasicMaterial({
        color: diffuseColor,
                specular: specularColor
        });
//        var cloudMat = new THREE.MeshLambertMaterial({
//        color: diffuseColor,
//                specular: specularColor
//        });
        var cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.x = Math.random() * 2 - 1;
        cloud.position.y = 0;
        cloud.position.z = Math.random() * 2 - 1;
        cloud.rotation.y = Math.PI * 2;
        cloud.rotation.x = Math.PI * 2;
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
