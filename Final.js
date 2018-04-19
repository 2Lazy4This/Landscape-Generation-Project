/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function main() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1.0, 0.1, 1000);

    //set render to canvas Element
    var renderer = new THREE.WebGLRenderer({canvas: drawCanvas});
    renderer.setSize(drawCanvas.width, drawCanvas.height);
    renderer.shadowMap.enabled = true;

    var skySphereGeometry = new THREE.SphereGeometry(1000, 20, 20);  //radius, width segments, height segments
    var skyMaterial = new THREE.MeshBasicMaterial({color: 0x8888FF, side: THREE.DoubleSide});
    var skySphere = new THREE.Mesh(skySphereGeometry, skyMaterial);
    skySphere.position.x = 0;
    skySphere.position.y = 0;
    skySphere.position.z = 0;
    scene.add(skySphere);

    var land = new Landscape(9, 100, 5, 20);
    land.generate();
    var array = land.getarray;
    for(var i = 0; i < 81; i++) {
      if(i%9 == 0) {
        console.log("----");
      }
      console.log(array[(i * 3) + 2]);
    }

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
}
