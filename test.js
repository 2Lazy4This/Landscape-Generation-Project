var land;
var sea;

function main() {
    initialize();
    draw();
    //setInterval(cycle, 100);
}

function cycle() {
    sea.cycle(0.1, 0);
    sea.maptoArray();
    sea1.maptoArray();
    sea2.maptoArray();
    console.log("loop");
    draw();
}

function initialize() {
    var lwSize = document.getElementById("lwSize").value;
    var mapSize = document.getElementById("mapSize").value;
    var landHeight = document.getElementById("landHeight").value;
    var waterHeight = document.getElementById("waterHeight").value;
    var waterSkew = document.getElementById("waterSkew").value;
    var windDir = document.getElementById("windDir").value;

    land = new Landscape(129, 2, 0.75, 0.1);
    sea = new Water(129, 0.1, 0.1, 0.1, Math.PI / 2);
    sea1 = new Water(129, 0.1, 0.1, 0.1, Math.PI / 2);
    sea2 = new Water(129, 0.1, 0.1, 0.1, Math.PI / 2);

    land.generate();
    sea.generate();
    sea.maptoArray();
    sea1.generate();
    sea1.maptoArray();
    sea2.generate();
    sea2.maptoArray();

}

function draw() {
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

    var landGeometry = new THREE.Geometry();
    landGeometry.vertices = land.getVertices;
    landGeometry.faces = land.getFaces;
    landGeometry.computeFaceNormals();

    var seaGeometry = new THREE.Geometry();
    seaGeometry.vertices = sea.getVertices;
    seaGeometry.faces = sea.getFaces;
    seaGeometry.computeFaceNormals();
    var seaGeometry1 = new THREE.Geometry();
    seaGeometry1.vertices = sea1.getVertices;
    seaGeometry1.faces = sea1.getFaces;
    seaGeometry1.computeFaceNormals();
    var seaGeometry2 = new THREE.Geometry();
    seaGeometry2.vertices = sea2.getVertices;
    seaGeometry2.faces = sea2.getFaces;
    seaGeometry2.computeFaceNormals();

    var diffuseColor = new THREE.Color(0.6, 0.5, 0.4);
    var specularColor = new THREE.Color(1.0, 1.0, 1.0);
    var landMaterial = new THREE.MeshPhongMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.001,
        shininess: 0.0015,
        shadowSide: THREE.BackSide
    });

    var diffuseColor = new THREE.Color(0.15, 0.51, 0.8);
    var specularColor = new THREE.Color(1.0, 1.0, 1.0);
    var seaMaterial = new THREE.MeshPhongMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.01,
        shininess: 0.15,
        shadowSide: THREE.BackSide,
        transparent: true,
        opacity: 0.4
    });
    var seaMaterial1 = new THREE.MeshPhongMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.01,
        shininess: 0.15,
        shadowSide: THREE.BackSide,
        transparent: true,
        opacity: 0.7
    });
    var seaMaterial2 = new THREE.MeshPhongMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.01,
        shininess: 0.15,
        shadowSide: THREE.BackSide,
        transparent: true,
        opacity: 1
    });

    var seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
    seaMesh.position.x = 0;
    seaMesh.position.y = -0.5;
    seaMesh.position.z = 0;
    seaMesh.rotation.x = Math.PI / 1.8;
    scene.add(seaMesh);

    var seaMesh1 = new THREE.Mesh(seaGeometry1, seaMaterial1);
    seaMesh1.position.x = 0;
    seaMesh1.position.y = -0.55;
    seaMesh1.position.z = 0;
    seaMesh1.rotation.x = Math.PI / 1.8;
    scene.add(seaMesh1);

    var seaMesh2 = new THREE.Mesh(seaGeometry2, seaMaterial2);
    seaMesh1.position.x = 0;
    seaMesh1.position.y = -0.6;
    seaMesh1.position.z = 0;
    seaMesh1.rotation.x = Math.PI / 1.8;
    scene.add(seaMesh2);

    var landMesh = new THREE.Mesh(landGeometry, landMaterial);
    landMesh.position.x = 0;
    landMesh.position.y = 0;
    landMesh.position.z = 0;
    landMesh.rotation.x = Math.PI / 1.8;
    scene.add(landMesh);

    camera.position.z = 3;

    scene.add(new THREE.AmbientLight(0x222222));
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 100, 100).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

//    var plantsIndex = 0;
//    var plantObjectsIndex = 0;
//    var plantsObjectFacesIndex = 0;
//    var colorsIndex = 0;
//
//    var plantsLength = plants.length; //will be whatever array name is used 
//    var objectsLength = plantObjects.length; //will be whatever array name is used
//    var facesLength = faces.length; //will be whatever array name is used
//    var colorsLength = colors.length; //will be whatever array name is used
//
//
////still needs the vertices to be added
//
////var vertices = new Float32Array( [
////	-1.0, -1.0,  1.0,
////	 1.0, -1.0,  1.0,
////	 1.0,  1.0,  1.0,
////
////	 1.0,  1.0,  1.0,
////	-1.0,  1.0,  1.0,
////	-1.0, -1.0,  1.0
////] );
////
////// itemSize = 3 because there are 3 values (components) per vertex
////geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
////
//
//    for (plantsIndex; plantsIndex < plantsLength; plantsIndex++) {
//        for (plantObjectsIndex; plantObjectsIndex < objectsLength; plantObjectsIndex++) {
//            var plantColor = new THREE.MeshBasicMaterial({color: colors[plantObjectsIndex]});
//            plant = new Three.BufferGeometry();
//            for (plantsObjectFacesIndex; plantsObjectFacesIndex < facesLength; plantsObjectFacesIndex++) {
//                plant.faces.push(faces[plantsObjectFacesIndex]);
//            }
//            var plantObject = new THREE.Mesh(geometry, material);
//            scene.add(plantObject);
//        }
//    }

    var animate = function () {
        seaMesh.geometry.dispose();
        scene.remove(seaMesh);

        seaMesh1.geometry.dispose();
        scene.remove(seaMesh1);

        seaMesh2.geometry.dispose();
        scene.remove(seaMesh2);

        sea.cycle(0.1, 0);
        sea.maptoArray();

        sea1.cycle(0.1, 0);
        sea1.maptoArray();

        sea2.cycle(0.1, 0);
        sea2.maptoArray();

        seaGeometry = new THREE.Geometry();
        seaGeometry.vertices = sea.getVertices;
        seaGeometry.faces = sea.getFaces;
        seaGeometry.computeFaceNormals();

        seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
        seaMesh.position.x = 0;
        seaMesh.position.y = -0.5;
        seaMesh.position.z = 0;
        seaMesh.rotation.x = Math.PI / 1.8;
        scene.add(seaMesh);

        seaGeometry1 = new THREE.Geometry();
        seaGeometry1.vertices = sea1.getVertices;
        seaGeometry1.faces = sea1.getFaces;
        seaGeometry1.computeFaceNormals();

        seaMesh1 = new THREE.Mesh(seaGeometry1, seaMaterial1);
        seaMesh1.position.x = 0;
        seaMesh1.position.y = -0.5;
        seaMesh1.position.z = 0;
        seaMesh1.rotation.x = Math.PI / 1.8;
        scene.add(seaMesh1);

        seaGeometry2 = new THREE.Geometry();
        seaGeometry2.vertices = sea2.getVertices;
        seaGeometry2.faces = sea2.getFaces;
        seaGeometry2.computeFaceNormals();

        seaMesh2 = new THREE.Mesh(seaGeometry, seaMaterial);
        seaMesh2.position.x = 0;
        seaMesh2.position.y = -0.5;
        seaMesh2.position.z = 0;
        seaMesh2.rotation.x = Math.PI / 1.8;
        scene.add(seaMesh2);

        //    scene.add(seaMesh1);
        //    scene.add(seaMesh2);

        render();
    };

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        setTimeout(animate, 1000);
    };
    render();
}
