#version 300 es

precision mediump float;

// grab texcoords from vert shader
in vec2 vTexCoord;

// DEBBIE this should be out, since the color is going out, like i said in my email to you before, not in
// this should also be vec4 not vec2 (our output color is rgb + alpha)
// i also changed the name to how i had it in the email i sent you, you can't used that reserved name in the new glsl
// for reference you had:
// in vec2 gl_FragCoord;
out vec4 fragColor;

// our textures coming from p5
uniform sampler2D tex0;
uniform vec2 resolution;

// these two uniforms you're not using so you don't need
uniform float amount;

uniform float power;
//DEBBIE here the array was wrong I went ahead and fixed it, see if you notice the difference and see why yours wouldn't work:
//const vec3 palette[6] = vec3[](1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.5), vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), vec3(0.0, 0.5, 1.0), vec3(0.0, 0.0, 1.0));
//correct:
const vec3 palette[6] = vec3[](vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.5), vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), vec3(0.0, 0.5, 1.0), vec3(0.0, 0.0, 1.0));
const bool PALETTE_MODE = false;

vec2 characterSize = vec2(10.0, 50.0);

// again, not using
float amt = 0.1; // the amount of displacement, higher is more
float squares = 20.0; // the number of squares to render vertically

void main() {

      vec2 windowSizeInCharacters = resolution.xy / characterSize;
      vec2 uv = floor((gl_FragCoord.xy / resolution.xy) * windowSizeInCharacters) / windowSizeInCharacters;

      vec3 webcamPixel = texture(tex0, uv).rgb; //DEBBIE you need to change cam to tex0 here
      vec3 outputColor = webcamPixel;

      if (PALETTE_MODE) {
          float minimumError = 5.0; // Arbitrary value greater than 3 (the sum of all channels in the brightest color, white).
          for (int color=0; color < palette.length(); color++) {
              vec3 colorError = abs(palette[color] - webcamPixel); // Absolute difference between the actual color and palette color.
              float totalError = colorError.r + colorError.g + colorError.b;
              if (totalError < minimumError) {
                  minimumError = totalError;
                  outputColor = palette[color];
              }
          }
      }
      //DEBBIE changed the output name here too
      fragColor = vec4(outputColor, 1.0);
}
//} //DEBBIE <---- you have an extra curly bracket that doesn't match with anything. it won't compile with this, comment it out
