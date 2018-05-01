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
    this.planetContext[0] = this.planetTextureCanvas[0].getContext('2d');
    this.planetContext[1] = this.planetTextureCanvas[1].getContext('2d');
    this.planetContext[2] = this.planetTextureCanvas[2].getContext('2d');
    this.planetContext[3] = this.planetTextureCanvas[3].getContext('2d');
    this.planetContext[4] = this.planetTextureCanvas[4].getContext('2d');
  }

  generateSky() {
    this.skyContext.fillStyle = "hsla(180, 5%, 5%, 1.0)";
    this.skyContext.fillRect(0, 0, this.skyTextureCanvas.height, this.skyTextureCanvas.width); //almost-black background/void of space
    var starDensity = 4000;
    for (var i = 0; i < starDensity; i++) {
      this.skyContext.fillStyle = "hsla(" + (Math.random() * 180) + ", 25%, 50%, 1.0)";
      var pixelSize = Math.random() * 2;
      this.skyContext.fillRect(Math.floor(Math.random() * 1026 - 1), Math.floor(Math.random() * 1026 - 1), pixelSize, pixelSize);
    }
    var tex = new THREE.Texture(skyTextureCanvas);
		tex.needsUpdate = true; //required to grab canvas
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set( 4, 2 );
    return tex;
  }

  generatePlanet(number, startColor, saturation) {
    this.planetContext[number].clearRect(0,0,this.planetTextureCanvas[number].width,this.planetTextureCanvas[number].height);

    var centerX = this.planetTextureCanvas[number].width/2;
    var centerY = this.planetTextureCanvas[number].height/2;
    var temp = this.planetTextureCanvas[number].width/4 - 5; //sets maximum radius/2 to be slightly less than 1/4th of the width/height. Prevents outer circle below from drawing outside canvas
    var radius = temp + temp * Math.random(); //generates random radius between maximum radius/2 and maximum radius

    this.planetContext[number].beginPath(); //background circle begin
    this.planetContext[number].arc(centerX, centerY, radius + 5, 0, 2 * Math.PI, false);
    this.planetContext[number].fillStyle = "hsla(" + startColor + ", " + saturation + "%, 50%, 1.0)";
    this.planetContext[number].fill(); //background circle end

    var pixelSize = radius/10; //pixel size scales so no jagged edges to the planet from overflowing squares
    for(var i = 0; i < 1500; i++) {
      this.planetContext[number].fillStyle = "hsla(" + (startColor + Math.random() * 60) + ", " + saturation + "%, " + (50 + Math.random() * 10) + "%, 1.0)";
      var theta = Math.random() * Math.PI * 2; //random angle between 0, 360 degrees
      var ranRadius = radius * Math.random() * 0.93; //random distance out from 0,0 in the direction of the angle
      this.planetContext[number].fillRect(ranRadius * Math.sin(theta) + centerX - pixelSize/2, ranRadius * Math.cos(theta) + centerY - pixelSize/2, pixelSize, pixelSize);
    }


    this.planetContext[number].beginPath(); //outer circle (smooths edges) begin
    this.planetContext[number].arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.planetContext[number].lineWidth = 5;
    this.planetContext[number].strokeStyle = "hsla(" + startColor + ", " + saturation + "%, 46%, 0.5)"
    this.planetContext[number].stroke(); //outer circle end

    var tex = new THREE.Texture(this.planetTextureCanvas[number])
    tex.needsUpdate = true; //required to grab canvas
    return tex;
  }










}
