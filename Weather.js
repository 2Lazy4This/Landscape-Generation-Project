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
var cloudGeo = new THREE.SphereGeometry(0.25 * this.cloudSize + 0.75 * Math.random() * this.cloudSize, Math.floor(Math.random() * 3 + 3), Math.floor(Math.random() * 3 + 3), Math.PI, Math.PI * 2);
        var diffuseColor = new THREE.Color(0.9, 0.9, 0.9);
        var cloudMat = new THREE.MeshBasicMaterial({
                color: diffuseColor,
                transparent: true,
                opacity: 0.7
        });
//        var cloudMat = new THREE.MeshLambertMaterial({
//        color: diffuseColor,
//                specular: specularColor
//        });
        var cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.x = Math.random() * 2 - 1;
        cloud.position.y = Math.random() * 0.25 + 0.75;
        cloud.position.z = Math.random() * 6 - 1;
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
