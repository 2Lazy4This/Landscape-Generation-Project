class GenTextures {

  constructor() {
    this.planetTextureCanvas = [];
    this.planetContext = [];
    this.skyTextureCanvas = document.getElementById('skyTextureCanvas');
    this.planetTextureCanvas[0] = document.getElementById('planetTexture1Canvas');
    this.planetTextureCanvas[1] = document.getElementById('planetTexture2Canvas');
    this.planetTextureCanvas[2] = document.getElementById('planetTexture3Canvas');
    this.planetTextureCanvas[3] = document.getElementById('planetTexture4Canvas');
    this.planetTextureCanvas[4] = document.getElementById('planetTexture5Canvas');
    this.skyContext = skyTextureCanvas.getContext('2d');
    this.planetContext[0] = planetTexture1Canvas.getContext('2d');
    this.planetContext[1] = planetTexture2Canvas.getContext('2d');
    this.planetContext[2] = planetTexture3Canvas.getContext('2d');
    this.planetContext[3] = planetTexture3Canvas.getContext('2d');
    this.planetContext[4] = planetTexture3Canvas.getContext('2d');
  }

  generateSky() {
    this.skyContext.fillStyle = "hsla(180, 5%, 5%, 1.0)";
    this.skyContext.fillRect(0, 0, this.skyTextureCanvas.height, this.skyTextureCanvas.width);
    var starDensity = 4000;
    for (var i = 0; i < starDensity; i++) {
      this.skyContext.fillStyle = "hsla(" + (Math.random() * 180) + ", 25%, 50%, 1.0)";
      var pixelSize = Math.random() * 1.5;
      this.skyContext.fillRect(Math.floor(Math.random() * 1026 - 1), Math.floor(Math.random() * 1026 - 1), pixelSize, pixelSize * 2);
    }
    var tex = new THREE.Texture(skyTextureCanvas);
		tex.needsUpdate = true;
    return tex;
  }

  generatePlanet(number, startColor, saturation) {
    var centerX = this.planetTextureCanvas[number].width/2;
    var centerY = this.planetTextureCanvas[number].height/2;
    var temp = this.planetTextureCanvas[number].width/4 - 5;
    var radius = temp + temp * Math.random();

    this.planetContext[number].beginPath();
    this.planetContext[number].arc(centerX, centerY, radius + 5, 0, 2 * Math.PI, false);
    this.planetContext[number].fillStyle = "hsla(" + startColor + ", " + saturation + "%, 50%, 1.0)";
    this.planetContext[number].fill();

    var pixelSize = radius/10;
    for(var i = 0; i < 1500; i++) {
      this.planetContext[number].fillStyle = "hsla(" + (startColor + Math.random() * 60) + ", " + saturation + "%, " + (50 + Math.random() * 10) + "%, 1.0)";
      var theta = Math.random() * Math.PI * 2;
      var ranRadius = radius * Math.random() * 0.93;
      this.planetContext[number].fillRect(ranRadius * Math.sin(theta) + centerX - pixelSize/2, ranRadius * Math.cos(theta) + centerY - pixelSize/2, pixelSize, pixelSize);
    }

    this.planetContext[number].beginPath();
    this.planetContext[number].arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.planetContext[number].lineWidth = 5;
    this.planetContext[number].strokeStyle = "hsla(" + startColor + ", " + saturation + "%, 25%, 0.5)"
    this.planetContext[number].stroke();

    var tex = new THREE.Texture(this.planetTextureCanvas[number])
    tex.needsUpdate = true;
    return tex;
  }










}
