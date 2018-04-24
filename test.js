var land;
var sea;

function main() {
    initialize();
    draw();
    //setInterval(cycle, 100);
}

function cycle() {
  sea.cycle(0.1, 0);
  console.log("loop");
  draw();
}

function initialize() {
  land = new Landscape(65, 1, .5, 0.040);
  sea = new Water(65, 0.1, 0.1, 0.040, Math.PI/2);
  land.generate();
  sea.generate();
  sea.maptoArray();
}

function draw() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1.0, 0.1, 1000);

  //set render to canvas Element
  var renderer = new THREE.WebGLRenderer({canvas: drawCanvas});
  renderer.setSize(drawCanvas.width, drawCanvas.height);
  renderer.shadowMap.enabled = true;


  var skySphereGeometry = new THREE.SphereGeometry(1000,20,20);  //radius, width segments, height segments
  var skyMaterial = new THREE.MeshBasicMaterial ({color: 0x8888FF, side:THREE.DoubleSide});
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
      shadowSide: THREE.BackSide
  });

  var seaMesh = new THREE.Mesh(seaGeometry, seaMaterial);
  seaMesh.position.x = 0;
  seaMesh.position.y = -0.5;
  seaMesh.position.z = 0;
  seaMesh.rotation.x = Math.PI / 1.8;
  scene.add(seaMesh);

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

  var render = function () {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
  };
  render();
}
