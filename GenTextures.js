class GenTextures {

  constructor() {
    this.skyTextureCanvas = document.getElementById('skyTextureCanvas');
    this.planetTexture1Canvas = document.getElementById('planetTexture1Canvas');
    this.planetTexture2Canvas = document.getElementById('planetTexture2Canvas');
    this.planetTexture3Canvas = document.getElementById('planetTexture3Canvas');
    this.skyContext = skyTextureCanvas.getContext('2d');
    this.planetContext1 = planetTexture1Canvas.getContext('2d');
    this.planetContext2 = planetTexture2Canvas.getContext('2d');
    this.planetContext3 = planetTexture3Canvas.getContext('2d');
  }

  generateSky() {
    this.skyContext.fillStyle = "hsla(180, 5%, 5%, 1.0)";
    this.skyContext.fillRect(0, 0, 1024, 1024);
    var starDensity = 2000;
    for (var i = 0; i < starDensity; i++) {
      this.skyContext.fillStyle = "hsla(" + (Math.random() * 180) + ", 75%, 50%, 1.0)";
      this.skyContext.fillRect(Math.floor(Math.random() * 1025), Math.floor(Math.random() * 1025), 1, 2); //t is size
    }
    var tex = new THREE.Texture(skyTextureCanvas);
		tex.needsUpdate = true;
    return tex;
  }

  generatePlanet(number) {

  }










}
