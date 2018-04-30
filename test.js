var land;
var sea;
var textures;
var paused = true;
var tau = Math.PI * 2;
var plRotx, plRoty, plRotz;
var celestialObj = 5; //between 1 and 5, inclusive
var renderer;
var time;
var atmosTheme;


function main() {
  //set render to canvas Element
  renderer = new THREE.WebGLRenderer({canvas: drawCanvas});
  renderer.setSize(drawCanvas.width, drawCanvas.height);
  renderer.shadowMap.enabled = true;
  renderer.autoClear = false;
  renderer.antialias = true;
  initialize();
  draw();
  //setInterval(cycle, 100);
}

function randomize() {
  renderer.renderLists.dispose();
  renderer.clear();
  renderer.dispose();
  initialize();
  draw();
}

function enterValues() {

}

function initialize() {
    var landscapeResolution = document.getElementById("lwSize").value;
    var landSkew = document.getElementById("mapSize").value;
    var timeofDay = document.getElementById("landHeight").value;
    var waveHeight = document.getElementById("waterHeight").value;
    var cloudiness = document.getElementById("waterSkew").value;
    var atmosHue = document.getElementById("windDir").value;

    atmosTheme = new THREE.Color("hsl( " + atmosHue + ", 10%, 50%)");
    atmosLight = new THREE.Color("hsl( " + atmosHue + ", 10%, 75%)");

    time = timeofDay/100 * tau - Math.PI;

    land = new Landscape(129, 1, 5 * landSkew/100 + 1, 0.4 * landscapeResolution/100 + 0.1);
    sea = new Water(129, 0.1, waveHeight/1000, 0.4 * landscapeResolution/100 + 0.1, Math.PI / 2);
    weather = new Weather(cloudiness/100);
    textures = new GenTextures();

    weather.generate();
    land.generate();
    sea.generate();
    sea.maptoArray();

    plRotx = Math.PI / 4000 * Math.random() - Math.PI / 8000;
    plRoty = Math.PI / 4000 * Math.random() - Math.PI / 8000;
    plRotz = Math.PI / 4000 * Math.random() - Math.PI / 8000;
}

function draw() {

    var scene = new THREE.Scene();
    var bgscene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1.0, 0.1, 1000);

    var skySphereGeometry = new THREE.SphereGeometry(11, 20, 20);  //radius, width segments, height segments
    var skyMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: textures.generateSky()});
    var skySphere = new THREE.Mesh(skySphereGeometry, skyMaterial);
    skySphere.position.x = 0;
    skySphere.position.y = 0;
    skySphere.position.z = 0;
    bgscene.add(skySphere);


    var costime = Math.cos(time);
    var negative = false;
    if (costime < 0) {
      costime *= -1;
      negative = true;
    }
    var skyVariable = Math.pow(costime, 1/3);
    if (negative) {
      skyVariable *= -1;
    }
    //turn off for night
    var daySphereGeometry = new THREE.SphereGeometry(10, 20, 20);  //radius, width segments, height segments
    var dayMaterial = new THREE.MeshBasicMaterial({color: atmosTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.5 + 0.5 * skyVariable, depthWrite: false});
    var daySphere = new THREE.Mesh(daySphereGeometry, dayMaterial);
    skySphere.position.x = 0;
    skySphere.position.y = 0;
    skySphere.position.z = 0;
    bgscene.add(daySphere);

    var atmoSphereGeometry = new THREE.SphereGeometry(20, 20, 20);  //radius, width segments, height segments
    var atmoMaterial = new THREE.MeshBasicMaterial({color: atmosTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.2 * skyVariable, depthWrite: false});
    var atmoSphere = new THREE.Mesh(atmoSphereGeometry, atmoMaterial);

    var atmoSphereGeometry1 = new THREE.SphereGeometry(17, 20, 20);
    var atmoMaterial1 = new THREE.MeshBasicMaterial({color: atmosTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.125, depthWrite: false});
    var atmoSphere1 = new THREE.Mesh(atmoSphereGeometry1, atmoMaterial1);

    var atmoSphereGeometry2 = new THREE.SphereGeometry(14, 20, 20);
    var atmoMaterial2 = new THREE.MeshBasicMaterial({color: atmosTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.05, depthWrite: false});
    var atmoSphere2 = new THREE.Mesh(atmoSphereGeometry2, atmoMaterial2);

    scene.add(atmoSphere);
    scene.add(atmoSphere1);
    scene.add(atmoSphere2);

    //generates & adds planets and random rotations for them
    var sprite = [];
    var pivot = [];
    var spriteMaterial = [];
    var parent = [];
    var planetMov = [];
    var directionalL = [];
    for (var i = 0; i < celestialObj; i++) {
        parent[i] = new THREE.Object3D();
        parent[i + celestialObj] = new THREE.Object3D();
        bgscene.add(parent[i]);
        scene.add(parent[i + celestialObj]);
        pivot[i] = new THREE.Object3D();
        pivot[i + celestialObj] = new THREE.Object3D();
        var tempx = Math.random() * tau;
        var tempy = Math.random() * tau;
        var tempz = Math.random() * tau;
        pivot[i].rotation.z = tempx;
        pivot[i].rotation.y = tempy;
        pivot[i].rotation.x = tempz;
        pivot[i + celestialObj].rotation.z = tempx;
        pivot[i + celestialObj].rotation.y = tempy;
        pivot[i + celestialObj].rotation.x = tempz;
        parent[i].add(pivot[i]);
        parent[i + celestialObj].add(pivot[i + celestialObj]);
        var col = Math.floor(Math.random() * 300);
        var sat = Math.floor(Math.random() * 55);
        spriteMaterial[i] = new THREE.SpriteMaterial({map: textures.generatePlanet(i, col, sat)});
        sprite[i] = new THREE.Sprite(spriteMaterial[i]);
        sprite[i].position.z = -9;
        directionalL[i] = new THREE.DirectionalLight(new THREE.Color("hsl(" + col + ", " + sat + "%, 50%)"), 0.35);
        directionalL[i].position.set(-10, 0, 0).normalize();
        directionalL[i].castShadow = true;
        pivot[i].add(sprite[i]);
        pivot[i + celestialObj].add(directionalL[i]);
        planetMov[i] = {xMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRotx),
            yMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRoty),
            zMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRotz),
            xRot: (tempx),
            yRot: (tempy),
            zRot: (tempz)};
    }
    //end planet gen

    var landGeometry = new THREE.Geometry();
    landGeometry.vertices = land.getVertices;
    landGeometry.faces = land.getFaces;
    landGeometry.computeFaceNormals();

    var seaGeometry = new THREE.Geometry();
    seaGeometry.vertices = sea.getVertices;
    seaGeometry.faces = sea.getFaces;
    seaGeometry.computeFaceNormals();

    var diffuseColor = new THREE.Color(0.3, 0.25, 0.2);
    var specularColor = new THREE.Color(0.6, 0.5, 0.4);
    var landMaterial = new THREE.MeshToonMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.15,
        shininess: 0.1,
        shadowSide: THREE.BackSide,
        flatShading: true,
    });

    var diffuseColor = new THREE.Color(0.05, 0.20, 0.20);
    var specularColor = new THREE.Color(1.0, 1.0, 1.0);
    var seaMaterial = new THREE.MeshToonMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 1,
        shininess: 1,
        shadowSide: THREE.BackSide,
        transparent: true,
        opacity: 0.68
    });

    var seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
    seaMesh.position.x = 0;
    seaMesh.position.y = -3;
    seaMesh.position.z = 0;
    seaMesh.rotation.x = Math.PI / 2;
    scene.add(seaMesh);

    var landMesh = new THREE.Mesh(landGeometry, landMaterial);
    landMesh.position.x = 0;
    landMesh.position.y = -2;
    landMesh.position.z = 0;
    landMesh.rotation.x = Math.PI / 2;
    scene.add(landMesh);

    for (var i = 0; i < weather.meshArray.length; i++) {
        scene.add(weather.meshArray[i]);
    }

    camera.position.z = 3;

    scene.add(new THREE.AmbientLight(atmosTheme));
    var starParent = new THREE.Object3D();
    var starPivot = new THREE.Object3D();
    scene.add(starParent);
    //if you add 2PI to them, you'll get back to where you started
    //therefore, %time * 2PI plus starting position (0) should get you where you want to be
    //timeofDay/100 * tau - Math.PI
    starPivot.rotation.z = time;
    starPivot.rotation.y = time;
    starPivot.rotation.x = time;
    starParent.add(starPivot);
    var directionalLight = new THREE.DirectionalLight(atmosLight, 0.5 + 0.5 * skyVariable);
    directionalLight.position.set(-45, 0, 0).normalize();
    directionalLight.castShadow = true;
    starPivot.add(directionalLight);

    bgscene.add(new THREE.AmbientLight(0x222222));

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
        if (!paused) {
            // seaMesh.geometry.dispose();
            // scene.remove(seaMesh);
            // sea.cycle(0.1, 0);
            // sea.maptoArray();
            // seaGeometry = new THREE.Geometry();
            // seaGeometry.vertices = sea.getVertices;
            // seaGeometry.faces = sea.getFaces;
            // seaGeometry.computeFaceNormals();
            // seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
            // seaMesh.position.x = 0;
            // seaMesh.position.y = -0.5;
            // seaMesh.position.z = 0;
            // seaMesh.rotation.x = Math.PI / 1.8;
            // scene.add(seaMesh);

            skySphere.rotation.x += plRotx;
            skySphere.rotation.y += plRoty;
            skySphere.rotation.z += plRotz;
            for (var i = 0; i < celestialObj; i++) {
                //parent[i].rotation.dispose();
                parent[i].remove(pivot[i]);
                pivot[i].dispose();
                bgscene.remove(parent[i]);
                parent[i].dispose();

                planetMov[i].xRot += planetMov[i].xMov;
                planetMov[i].yRot += planetMov[i].yMov;
                planetMov[i].zRot += planetMov[i].zMov;
                parent[i] = new THREE.Object3D();
                bgscene.add(parent[i]);
                pivot[i] = new THREE.Object3D();
                pivot[i].rotation.z = planetMov[i].xRot;
                pivot[i].rotation.y = planetMov[i].yRot;
                pivot[i].rotation.x = planetMov[i].zRot;
                parent[i].add(pivot[i]);
                pivot[i].add(sprite[i]);
                //console.log(planetMov[i].xMov);
            }
            render();
        }
    };

    var render = function () {
        renderer.renderLists.dispose();
        renderer.clear();
        requestAnimationFrame(render);
        renderer.render(bgscene, camera);
        renderer.clearDepth(); // important! clear the depth buffer
        renderer.render(scene, camera);
        setTimeout(animate, 200);
    };

    render();
}

function switchPause() {
    paused = !paused;
    if (paused) {
        document.getElementById('pauseButton').innerText = "Unpause";
    } else {
        document.getElementById('pauseButton').innerText = "Pause";
    }
}
