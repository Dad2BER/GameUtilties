export class BackGround {
    constructor(id1, id2, width, height) {
        this.patternDrawOffset = 0;
        this.patternDirection = 1;
        this.width = width;
        this.height = height;
        this.image1 = document.getElementById(id1); //lightFog
        this.image2 = document.getElementById(id2); //darkFog
    }

    update(deltaTime ) {
      // increse offset/position of image1
      this.patternDrawOffset += this.patternDirection*0.3;
      /*
      if (this.patternDrawOffset > 500 || this.patternDrawOffset < 0) {
        this.patternDirection *= -1;
      }
      */
    }

    draw(ctx) {        
      let pat= ctx.createPattern(this.image2,"repeat");  // repeat the image as a pattern
      ctx.fillStyle=pat;   // set the fill style to pattern
      ctx.fillRect(0,0,this.width, this.height);   // fill a rect with the pattern
  
      ctx.save(); // save context as we will translate it to offset the draw patter of the light clouds to create a movement effect
      ctx.translate(this.patternDrawOffset, 0);
      pat = ctx.createPattern(this.image1,"repeat");  // repeat the image as a pattern
      ctx.fillStyle = pat;   // set the fill style
      ctx.fillRect(-this.patternDrawOffset,0,this.width, this.height);  // fill rect with the pattern, but offset the draw as context was translated
      ctx.restore(); // restore context
    }
  }