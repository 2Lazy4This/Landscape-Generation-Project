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

    var land = new Landscape(9, 1, 0.005, 0.020);
    land.generate();
    var landGeometry = new THREE.Geometry();
    landGeometry.vertices = land.getVertices;
    landGeometry.faces = land.getFaces;
    landGeometry.computeFaceNormals();

    var diffuseColor = new THREE.Color(1.0, 0.0, 1.0);
    var specularColor = new THREE.Color(1.0, 1.0, 1.0);
    var material = new THREE.Material();
    material.color = diffuseColor;
    // var material = new THREE.MeshNormalMaterial({
    //     color: diffuseColor,
    //     //specular: specularColor,
    //     // reflectivity: 0.1,
    //     // shininess: 1.0,
    //     //
    //     // shadowSide: THREE.BackSide
    // });
    var mesh = new THREE.Mesh(landGeometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    console.log(mesh);
    scene.add(mesh);

// var geometry = new THREE.PlaneGeometry(200,200,32);
// var material = new THREE.MeshBasicMaterial ({color:0xffff00, side: THREE.DoubleSide});
// var plane = new THREE.Mesh(geometry,material);
// scene.add(plane);
// console.log(plane);

    //camera.position.z = 3;

//
    scene.add(new THREE.AmbientLight(0x222222));
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 100, 100).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);


// GROUND
    var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    var groundMat = new THREE.MeshPhongMaterial({color: 0x00ff00});

    var ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -33;
    scene.add(ground);
    ground.receiveShadow = true;

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
}
