/*By: Nathan Coggins and KateLynn Pullen
Last Modified 1 May 201
Project URL: http://arden.cs.unca.edu/~ncoggins/CSCI346.Spring2018/FinalProject/*/

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
var seaTheme;


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
    var landscapeResolution = 50;
    var landSkew = document.getElementById("mapSize").value;
    var timeofDay = document.getElementById("landHeight").value;
    var waveHeight = 50;
    var cloudiness = document.getElementById("waterSkew").value;
    var atmosHue = document.getElementById("windDir").value;

    atmosTheme = new THREE.Color("hsl( " + atmosHue + ", 25%, 65%)");
    atmosLight = new THREE.Color("hsl( " + atmosHue + ", 15%, 75%)");
    seaTheme = new THREE.Color("hsl( " + Math.abs(atmosHue - 30 + 60 * Math.random()) + ", 15%, 25%)")

    time = timeofDay/100 * tau - Math.PI;

    land = new Landscape(129, 0.1, 2 * landSkew/100 + 2.5, 0.4 * landscapeResolution/100 + 0.1);
    sea = new Water(129, 0.1, waveHeight/2000, 0.4 * landscapeResolution/100 + 0.1, Math.PI / 2);
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

    var skySphereGeometry = new THREE.SphereGeometry(25, 20, 20);  //radius, width segments, height segments
    var skyMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: textures.generateSky()});
    var skySphere = new THREE.Mesh(skySphereGeometry, skyMaterial);
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
    var daySphereGeometry = new THREE.SphereGeometry(24, 20, 20);  //radius, width segments, height segments
    var dayMaterial = new THREE.MeshBasicMaterial({color: atmosTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.5 + 0.5 * skyVariable});
    var daySphere = new THREE.Mesh(daySphereGeometry, dayMaterial);
    bgscene.add(daySphere);

    var horizonGeometry = new THREE.BoxGeometry(45, 6, 1, 100);
    var horizonMaterial = new THREE.MeshBasicMaterial({color: seaTheme, side: THREE.DoubleSide, transparent: true, opacity: 0.8});
    var horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    horizon.position.y = -7.2;
    horizon.position.z = -23;
    scene.add(horizon);

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
    //begin arrays of objects required
    var sprite = [];
    var pivot = [];
    var spriteMaterial = [];
    var parent = [];
    var planetMov = [];
    var directionalL = [];
    //end arrays
    for (var i = 0; i < celestialObj; i++) { //for every planet being rendered (5)
        parent[i] = new THREE.Object3D(); //create parent
        parent[i + celestialObj] = new THREE.Object3D(); //create parent for lighting effect that'll be in the foreground scene
        bgscene.add(parent[i]); //add to background
        scene.add(parent[i + celestialObj]); //add to foreground

        pivot[i] = new THREE.Object3D();
        pivot[i + celestialObj] = new THREE.Object3D(); //create the background/foreground pivots

        var tempx = Math.random() * tau; //generate random rotations for random sky positions
        var tempy = Math.random() * tau;
        var tempz = Math.random() * tau;
        pivot[i].rotation.z = tempx;    //apply rotations to both pivots
        pivot[i].rotation.y = tempy;
        pivot[i].rotation.x = tempz;
        pivot[i + celestialObj].rotation.z = tempx;
        pivot[i + celestialObj].rotation.y = tempy;
        pivot[i + celestialObj].rotation.x = tempz; //end application of rotations

        parent[i].add(pivot[i]); //add pivot to parents, background and foreground
        parent[i + celestialObj].add(pivot[i + celestialObj]);

        var col = Math.floor(Math.random() * 300); //generate color for moon/light
        var sat = Math.floor(Math.random() * 55); //generate saturation
        spriteMaterial[i] = new THREE.SpriteMaterial({map: textures.generatePlanet(i, col, sat)}); //create spriteMaterial with color/sat texture
        sprite[i] = new THREE.Sprite(spriteMaterial[i]); //add material to sprite
        sprite[i].position.z = -9; //set straight-line distance/radius
        directionalL[i] = new THREE.DirectionalLight(new THREE.Color("hsl(" + col + ", " + sat + "%, 50%)"), 0.35); //create directional light with same color/sat
        directionalL[i].position.set(-10, 0, 0).normalize(); //set slightly behind planet
        directionalL[i].castShadow = true;
        pivot[i].add(sprite[i]); //add sprite to background
        pivot[i + celestialObj].add(directionalL[i]); //add directionalLight to foreground
        planetMov[i] = {xMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRotx), //create array that stores movement values for animation use
            yMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRoty),
            zMov: (Math.PI / 4000 * Math.random() - Math.PI / 8000 + plRotz),
            xRot: (tempx),
            yRot: (tempy),
            zRot: (tempz)};
    }
    //end planet gen

    //create landgeometry out of the faces generated by land.generate()
    var landGeometry = new THREE.Geometry();
    landGeometry.vertices = land.getVertices;
    landGeometry.faces = land.getFaces;
    landGeometry.computeFaceNormals();

    //create seageometry out of the faces generaetd by sea.generate()
    var seaGeometry = new THREE.Geometry();
    seaGeometry.vertices = sea.getVertices;
    seaGeometry.faces = sea.getFaces;
    seaGeometry.computeFaceNormals();


    var diffuseColor = new THREE.Color(0.3, 0.25, 0.2);
    var specularColor = new THREE.Color(0.6, 0.5, 0.4);
    var landMaterial = new THREE.MeshToonMaterial({
        color: diffuseColor,
        specular: specularColor,
        reflectivity: 0.95,
        shininess: 0.1,
        shadowSide: THREE.BackSide,
        flatShading: true,
    });

    var seaMaterial = new THREE.MeshToonMaterial({
        color: seaTheme,
        specular: new THREE.Color(1.0, 1.0, 1.0),
        reflectivity: 1,
        shininess: 1,
        shadowSide: THREE.BackSide,
        transparent: true,
        opacity: 0.55
    });

    var seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
    seaMesh.position.y = -3.5;
    seaMesh.rotation.x = Math.PI / 2; //rotate so that y is up
    scene.add(seaMesh);

    var landMesh = new THREE.Mesh(landGeometry, landMaterial);
    landMesh.position.y = -2.5;
    landMesh.rotation.x = Math.PI / 2; //rotate so that y is up
    scene.add(landMesh);

    for (var i = 0; i < weather.meshArray.length; i++) {
        scene.add(weather.meshArray[i]); //add all the clouds
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

    var animate = function () {
        if (!paused) {

            skySphere.rotation.x += plRotx;
            skySphere.rotation.y += plRoty;
            skySphere.rotation.z += plRotz;

            for (var i = 0; i < celestialObj; i++) {
                //Cleanup to avoid out of memory issues
                parent[i].rotation.dispose();
                parent[i].remove(pivot[i]);
                bgscene.remove(parent[i]);
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
        renderer.clearDepth(); 
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
