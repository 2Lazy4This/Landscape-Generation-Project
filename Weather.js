/*By: Nathan Coggins and KateLynn Pullen
Last Modified 1 May 201
Project URL: http://arden.cs.unca.edu/~ncoggins/CSCI346.Spring2018/FinalProject/*/

class Weather {

//I think this is going to return already-made meshes, for ease of movement of the objects?

constructor(cloudiness) {
        this.maxClouds = 200;
        this.positionArray = [];
        this.meshArray = [];
        this.cloudAmount = cloudiness * this.maxClouds;
        this.cloudSize = 0.5;
        this.tau = 2 * Math.PI;
}

generate() {
for (var i = 0; i < this.cloudAmount; i++) {
        //var cloudGeo = new THREE.SphereGeometry(0.25 * this.cloudSize + 0.75 * Math.random() * this.cloudSize, Math.floor(Math.random() * 3 + 3), Math.floor(Math.random() * 3 + 3));
        //begin cloud shape
        var shape = new THREE.Shape();
        var cloudWidth = this.cloudSize * 2 * Math.random() + 0.5;
        var cloudHeight1 = this.cloudSize* Math.random() + 0.25;
        var cloudHeight2 = this.cloudSize* Math.random() + 0.25;
        shape.moveTo(0, 0);
        shape.lineTo(-cloudWidth/8, cloudHeight1/2);
        shape.lineTo(0, cloudHeight1);          //begin cloud top
        shape.lineTo(cloudWidth * 1/8, cloudHeight1 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 2/8, cloudHeight1 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 3/8, cloudHeight1 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 4/8, (cloudHeight1 + cloudHeight2)/2 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 5/8, cloudHeight2 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 6/8, cloudHeight2 + 0.2 * Math.random());
        shape.lineTo(cloudWidth * 7/8, cloudHeight2 + 0.2 * Math.random());
        shape.lineTo(cloudWidth, cloudHeight2);     //end cloud top
        shape.lineTo(cloudWidth * 9/8, cloudHeight2/2);
        shape.lineTo(cloudWidth, 0);
        shape.lineTo(0, 0);
        //end cloud shape
        var extrudeSettings = {
        	steps: 4,
        	amount: 0.25 + Math.random() * 0.75,
        	bevelEnabled: true,
        	bevelThickness: 0.25,
        	bevelSize: 0.25,
        	bevelSegments: 1
        };
        var cloudGeo = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var cloudMat = new THREE.MeshToonMaterial({
                color: new THREE.Color(0.5, 0.5, 0.5),
                transparent: true,
                opacity: 0.68,
                side: THREE.DoubleSide,
                flatShading: true,
                depthWrite: false,
        });

        var cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.x = Math.random() * 15 - 7.5; //random position larger than viewport because faraway clouds
        cloud.position.y = Math.random() * 2.25 + 0.75; //vertical position, 0.75 lower cloud level
        cloud.position.z = Math.random() * - 25 + 5; //generates faraway clouds as well as close
        cloud.position.y -= (cloud.position.z)/(-25) * 2; //curves clouds downward as they go further - to simulate curvature of the planet
        cloud.rotation.y = Math.random() * this.tau; //clouds can face different direactions
        this.meshArray.push(cloud);
}
}

cycle(amount, winddir) {
for (var i = 0; i < this.cloudAmount; i++) {
//TODO: UPDATE POSITION ARRAY
}
}


}
