//unimplemented class

class PlantGenus {

  constructor(height, width, branch, flex, leafshape, leafprob, skew, angle, leafstart, maxdepth, color1, color2, color3) {
    this.height = height;
    this.width = width;
    this.branch = branch;
    this.flex = flex;
    tihs.leafshape = leafshape;
    this.leafprob = leafprob;
    this.skew = skew;
    this.angle = angle;
    this.leafstart = leafstart;
    this.maxdepth = maxdepth;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
  }

  generateNewPlant(locx, locy, locz) {
    var newPlant = new Plant(locx, locy, locz, this);
    this.plantArray.push(newPlant);
  }


}

//unimplemented test.js plant support
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
