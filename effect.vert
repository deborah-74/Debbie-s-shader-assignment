#version 300 es

// our vertex data
in vec3 aPosition; //DEBBIE you need to say in for both of these, i.e. in vec3 aPosition;

//DEBBIE same here as above
// but also you're not using this is the frag shader, FYI
in vec2 aTexCoord;

// same as above not using in frag shader
// lets get texcoords just for fun!
out vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
