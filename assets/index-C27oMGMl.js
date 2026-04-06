var Fo=Object.defineProperty;var Po=(t,o,a)=>o in t?Fo(t,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[o]=a;var A=(t,o,a)=>Po(t,typeof o!="symbol"?o+"":o,a);import{r as w,j as R}from"./index-eaCpO0PK.js";const po=1920*1080*4;let Wo=class{constructor(o,a,e,s,r=0,i=0,l=2,f=po){A(this,"parentElement");A(this,"canvasElement");A(this,"gl");A(this,"program",null);A(this,"uniformLocations",{});A(this,"fragmentShader");A(this,"rafId",null);A(this,"lastRenderTime",0);A(this,"totalFrameTime",0);A(this,"speed",0);A(this,"providedUniforms");A(this,"hasBeenDisposed",!1);A(this,"resolutionChanged",!0);A(this,"textures",new Map);A(this,"minPixelRatio");A(this,"maxPixelCount");A(this,"isSafari",Ro());A(this,"uniformCache",{});A(this,"initProgram",()=>{const o=Eo(this.gl,zo,this.fragmentShader);o&&(this.program=o)});A(this,"setupPositionAttribute",()=>{const o=this.gl.getAttribLocation(this.program,"a_position"),a=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,a);const e=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(e),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(o),this.gl.vertexAttribPointer(o,2,this.gl.FLOAT,!1,0,0)});A(this,"setupUniforms",()=>{const o={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([a,e])=>{if(o[a]=this.gl.getUniformLocation(this.program,a),e instanceof HTMLImageElement){const s=`${a}_aspect_ratio`;o[s]=this.gl.getUniformLocation(this.program,s)}}),this.uniformLocations=o});A(this,"renderScale",1);A(this,"parentWidth",0);A(this,"parentHeight",0);A(this,"resizeObserver",null);A(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([a])=>{a!=null&&a.borderBoxSize[0]&&(this.parentWidth=a.borderBoxSize[0].inlineSize,this.parentHeight=a.borderBoxSize[0].blockSize),this.handleResize()}),this.resizeObserver.observe(this.parentElement),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange);const o=this.parentElement.getBoundingClientRect();this.parentWidth=o.width,this.parentHeight=o.height,this.handleResize()});A(this,"resizeRafId",null);A(this,"handleVisualViewportChange",()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId),this.resizeRafId=requestAnimationFrame(()=>{this.resizeRafId=requestAnimationFrame(()=>{this.handleResize()})})});A(this,"handleResize",()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId);const o=(visualViewport==null?void 0:visualViewport.scale)??1,a=visualViewport?visualViewport.width*visualViewport.scale:window.innerWidth,e=Math.round(1e4*window.outerWidth/a)/1e4,s=this.isSafari?devicePixelRatio:devicePixelRatio/e,i=Math.max(s,this.minPixelRatio)*e*o,l=this.parentWidth*i,f=this.parentHeight*i,c=Math.sqrt(this.maxPixelCount)/Math.sqrt(l*f),n=i*Math.min(1,c),d=Math.round(this.parentWidth*n),h=Math.round(this.parentHeight*n);(this.canvasElement.width!==d||this.canvasElement.height!==h||this.renderScale!==n)&&(this.renderScale=n,this.canvasElement.width=d,this.canvasElement.height=h,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});A(this,"render",o=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}const a=o-this.lastRenderTime;this.lastRenderTime=o,this.speed!==0&&(this.totalFrameTime+=a*this.speed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.totalFrameTime*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.speed!==0?this.requestRender():this.rafId=null});A(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});A(this,"setTextureUniform",(o,a)=>{if(!a.complete||a.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${o} must be fully loaded`);const e=this.textures.get(o);e&&this.gl.deleteTexture(e);const s=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,a);const r=this.gl.getError();if(r!==this.gl.NO_ERROR||s===null){console.error("Paper Shaders: WebGL error when uploading texture:",r);return}this.textures.set(o,s);const i=this.uniformLocations[o];if(i){const l=this.textures.size-1;this.gl.useProgram(this.program),this.gl.activeTexture(this.gl.TEXTURE0+l),this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.uniform1i(i,l);const f=`${o}_aspect_ratio`,c=this.uniformLocations[f];if(c){const n=a.naturalWidth/a.naturalHeight;this.gl.uniform1f(c,n)}}});A(this,"areUniformValuesEqual",(o,a)=>o===a?!0:Array.isArray(o)&&Array.isArray(a)&&o.length===a.length?o.every((e,s)=>this.areUniformValuesEqual(e,a[s])):!1);A(this,"setUniformValues",o=>{this.gl.useProgram(this.program),Object.entries(o).forEach(([a,e])=>{if(this.areUniformValuesEqual(this.uniformCache[a],e))return;const s=this.uniformLocations[a];if(!s){console.warn(`Uniform location for ${a} not found`);return}if(e instanceof HTMLImageElement)this.setTextureUniform(a,e);else if(Array.isArray(e)){let r=null,i=null;if(e[0]!==void 0&&Array.isArray(e[0])){const l=e[0].length;if(e.every(f=>f.length===l))r=e.flat(),i=l;else{console.warn(`All child arrays must be the same length for ${a}`);return}}else r=e,i=r.length;switch(i){case 2:this.gl.uniform2fv(s,r);break;case 3:this.gl.uniform3fv(s,r);break;case 4:this.gl.uniform4fv(s,r);break;case 9:this.gl.uniformMatrix3fv(s,!1,r);break;case 16:this.gl.uniformMatrix4fv(s,!1,r);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof e=="number"?this.gl.uniform1f(s,e):typeof e=="boolean"?this.gl.uniform1i(s,e?1:0):console.warn(`Unsupported uniform type for ${a}: ${typeof e}`);this.uniformCache[a]=e})});A(this,"getCurrentFrameTime",()=>this.totalFrameTime);A(this,"setFrame",o=>{this.totalFrameTime=o,this.lastRenderTime=performance.now(),this.render(performance.now())});A(this,"setSpeed",(o=1)=>{this.speed=o,this.rafId===null&&o!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&o===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});A(this,"setMaxPixelCount",(o=po)=>{this.maxPixelCount=o,this.handleResize()});A(this,"setMinPixelRatio",(o=2)=>{this.minPixelRatio=o,this.handleResize()});A(this,"setUniforms",o=>{this.setUniformValues(o),this.providedUniforms={...this.providedUniforms,...o},this.render(performance.now())});A(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(o=>{this.gl.deleteTexture(o)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),this.uniformLocations={},this.parentElement.paperShaderMount=void 0});if(o instanceof HTMLElement)this.parentElement=o;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(!document.querySelector("style[data-paper-shader]")){const d=document.createElement("style");d.innerHTML=Qo,d.setAttribute("data-paper-shader",""),document.head.prepend(d)}const c=document.createElement("canvas");this.canvasElement=c,this.parentElement.prepend(c),this.fragmentShader=a,this.providedUniforms=e,this.totalFrameTime=i,this.minPixelRatio=l,this.maxPixelCount=f;const n=c.getContext("webgl2",s);if(!n)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=n,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),this.setSpeed(r),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this}};const zo=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize, vec2 maxBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize, maxBoxSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
    v_objectHelperBox = uv;
    v_objectHelperBox *= objectWorldScale;
    v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize, maxBoxSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
    v_responsiveHelperBox = uv;
    v_responsiveHelperBox *= responsiveBoxScale;
    v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize, maxBoxSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
    v_patternHelperBox = uv;
    v_patternHelperBox *= patternBoxScale;
    v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV += .5;

  // ===================================================

}`;function mo(t,o,a){const e=t.createShader(o);return e?(t.shaderSource(e,a),t.compileShader(e),t.getShaderParameter(e,t.COMPILE_STATUS)?e:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(e)),t.deleteShader(e),null)):null}function Eo(t,o,a){const e=mo(t,t.VERTEX_SHADER,o),s=mo(t,t.FRAGMENT_SHADER,a);if(!e||!s)return null;const r=t.createProgram();return r?(t.attachShader(r,e),t.attachShader(r,s),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?(t.detachShader(r,e),t.detachShader(r,s),t.deleteShader(e),t.deleteShader(s),r):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(r)),t.deleteProgram(r),t.deleteShader(e),t.deleteShader(s),null)):null}const Qo=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
}`;function yt(t){return"paperShaderMount"in t}function Ro(){const t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}const N=`
in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;`,Do=`
in vec2 v_objectBoxSize;
in vec2 v_objectHelperBox;
in vec2 v_responsiveBoxSize;
in vec2 v_responsiveHelperBox;
in vec2 v_patternBoxSize;
in vec2 v_patternHelperBox;`,Co=`
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;`,Uo=`

  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  #ifdef USE_PIXELIZATION
    float pxSize = u_pxSize * u_pixelRatio;
    vec2 pxSizeUv = gl_FragCoord.xy;
    pxSizeUv -= .5 * u_resolution;
    pxSizeUv /= pxSize;
    uv = floor(pxSizeUv) * pxSize / u_resolution.xy;    
    uv += .5;
  #endif
  uv -= .5;

  
  // ===================================================
  // sizing params shared between objects and patterns
  
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  
  // ===================================================
  // Sizing api for objects (graphics with fixed ratio)

  #ifdef USE_OBJECT_SIZING
    float fixedRatio = 1.;
    vec2 fixedRatioBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
    );
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = fixedRatio * min(fixedRatioBoxGivenSize.x / fixedRatio, fixedRatioBoxGivenSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = fixedRatio * min(maxBoxSize.x / fixedRatio, maxBoxSize.y);
    } else if (u_fit == 2.) {  // fit = cover
      objectBoxSize.x = fixedRatio * max(maxBoxSize.x / fixedRatio, maxBoxSize.y);
    }
    objectBoxSize.y = objectBoxSize.x / fixedRatio;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;
  
    #ifdef ADD_HELPERS
      vec2 objectHelperBox = gl_FragCoord.xy / u_resolution.xy;
      objectHelperBox -= .5;
      objectHelperBox *= objectWorldScale;
      objectHelperBox += boxOrigin * (objectWorldScale - 1.);  
    #endif
  
    vec2 objectUV = uv;
    objectUV *= objectWorldScale;
    objectUV += boxOrigin * (objectWorldScale - 1.);
    objectUV += vec2(-u_offsetX, u_offsetY);
    objectUV /= u_scale;
    objectUV = graphicRotation * objectUV;
  #endif
  
  // ===================================================
 
  // ===================================================
  // Sizing api for patterns (graphics respecting u_worldWidth / u_worldHeight ratio)
  
  #ifdef USE_PATTERN_SIZING
    float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
    vec2 patternBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
    );
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) {  // fit = contain
      patternBoxSize.x = patternBoxRatio * min(maxBoxSize.x / patternBoxRatio, maxBoxSize.y);
    } else if (u_fit == 2.) {  // fit = cover
      patternBoxSize.x = patternBoxRatio * max(maxBoxSize.x / patternBoxRatio, maxBoxSize.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;
  
    #ifdef ADD_HELPERS  
      vec2 patternHelperBox = gl_FragCoord.xy / u_resolution.xy;
      patternHelperBox -= .5;
      patternHelperBox *= patternWorldScale;
      patternHelperBox += boxOrigin * (patternWorldScale - 1.);  
    #endif
  
    vec2 patternUV = uv;
    patternUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    patternUV += boxOrigin;
    patternUV -= boxOrigin / patternWorldScale;
    patternUV *= u_resolution.xy;
    patternUV /= u_pixelRatio;
    if (u_fit > 0.) {
      patternUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    patternUV /= u_scale;
    patternUV = graphicRotation * patternUV;
    patternUV += boxOrigin / patternWorldScale;
    patternUV -= boxOrigin;
    patternUV += .5;
  #endif
`,Io=`
  vec2 worldBoxDist = abs(helperBox);
  float boxStroke = (step(max(worldBoxDist.x, worldBoxDist.y), .5) - step(max(worldBoxDist.x, worldBoxDist.y), .495));
  color.rgb = mix(color.rgb, vec3(1., 0., 0.), boxStroke);
  opacity += boxStroke;

  vec2 boxOriginCopy = vec2(.5 - u_originX, u_originY - .5);
  vec2 boxOriginDist = helperBox + boxOriginCopy;
  boxOriginDist.x *= (boxSize.x / boxSize.y);
  float boxOriginPoint = 1. - smoothstep(0., .05, length(boxOriginDist));
  
  vec2 graphicOriginPointDist = helperBox + vec2(-u_offsetX, u_offsetY);
  graphicOriginPointDist.x *= (boxSize.x / boxSize.y);
  float graphicOriginPoint = 1. - smoothstep(0., .05, length(graphicOriginPointDist));
  
  color.rgb = mix(color.rgb, vec3(0., 1., 0.), boxOriginPoint);
  opacity += boxOriginPoint;
  color.rgb = mix(color.rgb, vec3(0., 0., 1.), graphicOriginPoint);
  opacity += graphicOriginPoint;
`,_={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},g={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},T={none:0,contain:1,cover:2},L=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,oo=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,io=`
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
`,ro=`
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
`,J=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,eo=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,ho={maxColorCount:10},Vo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${ho.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;

${N}

out vec4 fragColor;

${L}
${oo}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 shape_uv = v_objectUV;

  shape_uv += .5;

  float t = .5 * u_time;

  float radius = smoothstep(0., 1., length(shape_uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    shape_uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., shape_uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., shape_uv.y));
    shape_uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., shape_uv.x));
  }

  vec2 uvRotated = shape_uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${ho.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t);
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = 0.;
    if (mod(float(i), 2.) > 1.) {
      dist = length(shape_uv - pos);
    } else {
      dist = length(uvRotated - pos);
    }

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= totalWeight;
  opacity /= totalWeight;

  ${J}

  fragColor = vec4(color, opacity);
}
`,no={maxColorCount:10,maxNoiseIterations:8},To=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${no.maxColorCount}];
uniform float u_colorsCount;

uniform float u_thickness;
uniform float u_radius;
uniform float u_innerShape;
uniform float u_noiseScale;
uniform float u_noiseIterations;

${N}

out vec4 fragColor;

${L}

float random(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, uv).r;
}

${ro}

float fbm(in vec2 n) {
  float total = 0.0, amplitude = .4;
  for (int i = 0; i < ${no.maxNoiseIterations}; i++) {
    if (i >= int(u_noiseIterations)) break;
    total += valueNoise(n) * amplitude;
    n *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}

float getNoise(vec2 uv, vec2 pUv, float t) {
  float noiseLeft = fbm(pUv + .03 * t);
  pUv.x = mod(pUv.x, u_noiseScale * TWO_PI);
  float noiseRight = fbm(pUv + .03 * t);
  return mix(noiseRight, noiseLeft, smoothstep(-.25, .25, uv.x));
}

float getRingShape(vec2 uv) {
  float radius = u_radius;
  float thickness = u_thickness;

  float distance = length(uv);
  float ringValue = 1. - smoothstep(radius, radius + thickness, distance);
  ringValue *= smoothstep(radius - pow(u_innerShape, 3.) * thickness, radius, distance);

  return ringValue;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = u_time;

  float cycleDuration = 3.;
  float localTime1 = mod(.1 * t + cycleDuration, 2. * cycleDuration);
  float localTime2 = mod(.1 * t, 2. * cycleDuration);
  float timeBlend = .5 + .5 * sin(.1 * t * PI / cycleDuration - .5 * PI);

  float atg = atan(shape_uv.y, shape_uv.x) + .001;
  float l = length(shape_uv);
  vec2 polar_uv1 = vec2(atg, localTime1 - (.5 * l) + 1. / pow(l, .5));
  polar_uv1 *= u_noiseScale;
  float noise1 = getNoise(shape_uv, polar_uv1, t);

  vec2 polar_uv2 = vec2(atg, localTime2 - (.5 * l) + 1. / pow(l, .5));
  polar_uv2 *= u_noiseScale;
  float noise2 = getNoise(shape_uv, polar_uv2, t);

  float noise = mix(noise1, noise2, timeBlend);

  shape_uv *= (.8 + 1.2 * noise);

  float ringShape = getRingShape(shape_uv);

  float mixer = pow(ringShape, 3.) * (u_colorsCount - 1.);
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${no.maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;
      float localT = clamp(mixer - float(i - 1), 0., 1.);
      vec4 c = u_colors[i];
      c.rgb *= c.a;
      gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * ringShape;
  float opacity = gradient.a * ringShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,Mo=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;


${N}

out vec4 fragColor;

${oo}

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 shape_uv = v_patternUV;

  shape_uv *= .0013;

  float t = .5 * u_time;

  float noise = neuroShape(shape_uv, t);

  noise = (1. + u_brightness) * pow(noise, 2.);
  noise = pow(noise, .7 + 6. * u_contrast);
  noise = min(1.4, noise);

  float blend = smoothstep(0.7, 1.4, noise);

  vec4 frontC = u_colorFront;
  frontC.rgb *= frontC.a;
  vec4 midC = u_colorMid;
  midC.rgb *= midC.a;
  vec4 blendFront = mix(midC, frontC, blend);

  float safeNoise = max(noise, 0.0);
  vec3 color = blendFront.rgb * safeNoise;
  float opacity = clamp(blendFront.a * safeNoise, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,go={maxColorCount:10},Ho=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${go.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_spreading;

${N}

out vec4 fragColor;

${L}
${io}
${oo}

vec2 random2(vec2 p) {
  return vec2(random(p), random(200. * p));
}

vec3 voronoiShape(vec2 uv, float time) {
  vec2 i_uv = floor(uv);
  vec2 f_uv = fract(uv);

  float spreading = .25 * clamp(u_spreading, 0., 1.);

  float minDist = 1.;
  vec2 randomizer = vec2(0.);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 tileOffset = vec2(float(x), float(y));
      vec2 rand = random2(i_uv + tileOffset);
      vec2 cellCenter = vec2(.5 + 1e-4);
      cellCenter += spreading * cos(time + TWO_PI * rand);
      cellCenter -= .5;
      cellCenter = rotate(cellCenter, random(vec2(rand.x, rand.y)) + .1 * time);
      cellCenter += .5;
      float dist = length(tileOffset + cellCenter - f_uv);
      if (dist < minDist) {
        minDist = dist;
        randomizer = rand;
      }
      minDist = min(minDist, dist);
    }
  }

  return vec3(minDist, randomizer);
}

void main() {

  vec2 shape_uv = v_patternUV;
  shape_uv += .5;
  shape_uv *= .015;

  float t = u_time;

  vec3 voronoi = voronoiShape(shape_uv, t) + 1e-4;

  float radius = .25 * clamp(u_size, 0., 1.) - .5 * clamp(u_sizeRange, 0., 1.) * voronoi[2];
  float dist = voronoi[0];
  float edgeWidth = fwidth(dist);
  float dots = smoothstep(radius + edgeWidth, radius - edgeWidth, dist);

  float shape = voronoi[1];

  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${go.maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;
      float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
      localT = round(localT * steps) / steps;
      vec4 c = u_colors[i];
      c.rgb *= c.a;
      gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 color = gradient.rgb * dots;
  float opacity = gradient.a * dots;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,Oo=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colorFill;
uniform vec4 u_colorStroke;
uniform float u_dotSize;
uniform float u_gapX;
uniform float u_gapY;
uniform float u_strokeWidth;
uniform float u_sizeRange;
uniform float u_opacityRange;
uniform float u_shape;

${N}

out vec4 fragColor;

${L}
${eo}

float polygon(vec2 p, float N, float rot) {
  float a = atan(p.x, p.y) + rot;
  float r = TWO_PI / float(N);

  return cos(floor(.5 + a / r) * r - a) * length(p);
}

void main() {

  vec2 shape_uv = v_patternUV;
  shape_uv += .5;

  vec2 grid = fract(shape_uv / vec2(u_gapX, u_gapY)) + 1e-4;
  vec2 grid_idx = floor(shape_uv / vec2(u_gapX, u_gapY));
  float sizeRandomizer = .5 + .8 * snoise(2. * vec2(grid_idx.x * 100., grid_idx.y));
  float opacity_randomizer = .5 + .7 * snoise(2. * vec2(grid_idx.y, grid_idx.x));

  vec2 center = vec2(0.5) - 1e-3;
  vec2 p = (grid - center) * vec2(u_gapX, u_gapY);

  float baseSize = u_dotSize * (1. - sizeRandomizer * u_sizeRange);
  float strokeWidth = u_strokeWidth * (1. - sizeRandomizer * u_sizeRange);

  float dist;
  if (u_shape < 0.5) {
    // Circle
    dist = length(p);
  } else if (u_shape < 1.5) {
    // Diamond
    strokeWidth *= 1.5;
    dist = polygon(1.5 * p, 4., .25 * PI);
  } else if (u_shape < 2.5) {
    // Square
    dist = polygon(1.03 * p, 4., 1e-3);
  } else {
    // Triangle
    strokeWidth *= 1.5;
    p = p * 2. - 1.;
    p *= .9;
    p.y = 1. - p.y;
    p.y -= .75 * baseSize;
    dist = polygon(p, 3., 1e-3);
  }

  float edgeWidth = fwidth(dist);
  float shapeOuter = smoothstep(baseSize + edgeWidth, baseSize - edgeWidth, dist - strokeWidth);
  float shapeInner = smoothstep(baseSize + edgeWidth, baseSize - edgeWidth, dist);
  float stroke = shapeOuter - shapeInner;

  float dotOpacity = max(0., 1. - opacity_randomizer * u_opacityRange);
  stroke *= dotOpacity;
  shapeInner *= dotOpacity;

  stroke *= u_colorStroke.a;
  shapeInner *= u_colorFill.a;

  vec3 color = vec3(0.);
  color += stroke * u_colorStroke.rgb;
  color += shapeInner * u_colorFill.rgb;
  color += (1. - shapeInner - stroke) * u_colorBack.rgb * u_colorBack.a;

  float opacity = 0.;
  opacity += stroke;
  opacity += shapeInner;
  opacity += (1. - opacity) * u_colorBack.a;

  fragColor = vec4(color, opacity);
}
`,No={circle:0,diamond:1,square:2,triangle:3},vo={maxColorCount:10},Go=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${vo.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_softness;

${N}

out vec4 fragColor;

${eo}

float getNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

float steppedSmooth(float t, float steps, float softness) {
    float stepT = floor(t * steps) / steps;
    float f = t * steps - floor(t * steps);

    float fw = 0.005 / u_scale;
    float smoothed = smoothstep(.5 - softness * .5 - fw, .5 + softness * .5 + fw, f);

    return stepT + smoothed / steps;
}

void main() {
  vec2 shape_uv = v_patternUV;

  shape_uv *= .001;

  float t = .2 * u_time;

  float shape = .5 + .5 * getNoise(shape_uv, t);

  bool u_extraSides = true;

  float mixer = shape * (u_colorsCount - 1.);
  if (u_extraSides == true) {
    mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  }

  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${vo.maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;

      float localT = clamp(mixer - float(i - 1), 0., 1.);
      localT = steppedSmooth(localT, steps, u_softness);

      vec4 c = u_colors[i];
      c.rgb *= c.a;
      gradient = mix(gradient, c, localT);
  }

  if (u_extraSides == true) {
   if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
     float localT = mixer + 1.;
     if (mixer > (u_colorsCount - 1.)) {
       localT = mixer - (u_colorsCount - 1.);
     }
     localT = steppedSmooth(localT, steps, u_softness);
     vec4 cFst = u_colors[0];
     cFst.rgb *= cFst.a;
     vec4 cLast = u_colors[int(u_colorsCount - 1.)];
     cLast.rgb *= cLast.a;
     gradient = mix(cLast, cFst, localT);
   }
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${J}

  fragColor = vec4(color, opacity);
}
`,lo={maxColorCount:8,maxBallsCount:20},Xo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${lo.maxColorCount}];
uniform float u_colorsCount;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_count;

${N}

out vec4 fragColor;

${L}

float hash(float x) {
  return fract(sin(x) * 43758.5453123);
}
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}

float getBallShape(vec2 uv, vec2 c, float p) {
  float s = .5 * length(uv - c);
  s = 1. - clamp(s, 0., 1.);
  s = pow(s, p);
  return s;
}

void main() {
  vec2 shape_uv = v_objectUV;

  shape_uv += .5;

  float t = .2 * u_time + 1.;

  vec3 totalColor = vec3(0.);
  float totalShape = 0.;
  float totalOpacity = 0.;

  for (int i = 0; i < ${lo.maxBallsCount}; i++) {
    if (i >= int(ceil(u_count))) break;

    float idxFract = float(i) / float(${lo.maxBallsCount});
    float angle = TWO_PI * idxFract;

    float speed = 1. - .2 * idxFract;
    float noiseX = noise(angle * 10. + float(i) + t * speed);
    float noiseY = noise(angle * 20. + float(i) - t * speed);

    vec2 pos = vec2(.5) + 1e-4 + .9 * (vec2(noiseX, noiseY) - .5);

    int safeIndex = i % int(u_colorsCount + 0.5);
    vec4 ballColor = u_colors[safeIndex];
    ballColor.rgb *= ballColor.a;

    float sizeFrac = 1.;
    if (float(i) > floor(u_count - 1.)) {
      sizeFrac *= fract(u_count);
    }

    float shape = getBallShape(shape_uv, pos, 45. - 30. * u_size * sizeFrac);
    shape *= pow(u_size, .2);
    shape = smoothstep(0., 1., shape);

    totalColor += ballColor.rgb * shape;
    totalShape += shape;
    totalOpacity += ballColor.a * shape;
  }

  totalColor /= max(totalShape, 1e-4);
  totalOpacity /= max(totalShape, 1e-4);

  float edge_width = fwidth(totalShape);
  float finalShape = smoothstep(.4, .4 + edge_width, totalShape);

  vec3 color = totalColor * finalShape;
  float opacity = totalOpacity * finalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,Yo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_proportion;
uniform float u_softness;
uniform float u_octaveCount;
uniform float u_persistence;
uniform float u_lacunarity;

${N}

out vec4 fragColor;

${L}

uint hash(uint x, uint seed) {
  const uint m = 0x5bd1e995U;
  uint hash = seed;
    // process input
    uint k = x;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}

uint hash(uvec3 x, uint seed){
    const uint m = 0x5bd1e995U;
    uint hash = seed;
    // process first vector element
    uint k = x.x;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // process second vector element
    k = x.y;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // process third vector element
    k = x.z;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}


vec3 gradientdy(uint hash) {
    switch (int(hash) & 15) { // look at the last four bits to pick a gradient dy
    case 0:
        return vec3(1, 1, 0);
    case 1:
        return vec3(-1, 1, 0);
    case 2:
        return vec3(1, -1, 0);
    case 3:
        return vec3(-1, -1, 0);
    case 4:
        return vec3(1, 0, 1);
    case 5:
        return vec3(-1, 0, 1);
    case 6:
        return vec3(1, 0, -1);
    case 7:
        return vec3(-1, 0, -1);
    case 8:
        return vec3(0, 1, 1);
    case 9:
        return vec3(0, -1, 1);
    case 10:
        return vec3(0, 1, -1);
    case 11:
        return vec3(0, -1, -1);
    case 12:
        return vec3(1, 1, 0);
    case 13:
        return vec3(-1, 1, 0);
    case 14:
        return vec3(0, -1, 1);
    case 15:
        return vec3(0, -1, -1);
    }
}

float interpolate(float value1, float value2, float value3, float value4, float value5, float value6, float value7, float value8, vec3 t) {
    return mix(
        mix(mix(value1, value2, t.x), mix(value3, value4, t.x), t.y),
        mix(mix(value5, value6, t.x), mix(value7, value8, t.x), t.y),
        t.z
    );
}

vec3 fade(vec3 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec3 position, uint seed) {
    position += 1e+4;
    vec3 floorPosition = floor(position);
    vec3 fractPosition = fract(position);
    uvec3 cellCoordinates = uvec3(floorPosition);
    float value1 = dot(gradientdy(hash(cellCoordinates, seed)), fractPosition);
    float value2 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 0, 0)), seed)), fractPosition - vec3(1, 0, 0));
    float value3 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 1, 0)), seed)), fractPosition - vec3(0, 1, 0));
    float value4 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 1, 0)), seed)), fractPosition - vec3(1, 1, 0));
    float value5 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 0, 1)), seed)), fractPosition - vec3(0, 0, 1));
    float value6 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 0, 1)), seed)), fractPosition - vec3(1, 0, 1));
    float value7 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 1, 1)), seed)), fractPosition - vec3(0, 1, 1));
    float value8 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 1, 1)), seed)), fractPosition - vec3(1, 1, 1));
    return interpolate(value1, value2, value3, value4, value5, value6, value7, value8, fade(fractPosition));
}

float p_noise(vec3 position, int octaveCount, float persistence, float lacunarity) {
    float value = 0.0;
    float amplitude = 1.0;
    float currentFrequency = 10.;
    uint currentSeed = uint(0);
    for (int i = 0; i < octaveCount; i++) {
        currentSeed = hash(currentSeed, 0x0U);
        value += perlinNoise(position * currentFrequency, currentSeed) * amplitude;
        amplitude *= persistence;
        currentFrequency *= lacunarity;
    }
    return value;
}

float get_max_amp(float persistence, float octaveCount) {
    persistence *= .999;
    return (1. - pow(persistence, octaveCount)) / (1. - persistence);
}

void main() {
  vec2 uv = v_patternUV;

  uv *= .005;
  float t = .2 * u_time;

  vec3 p = vec3(uv, t);

  float oct_count = max(0., floor(u_octaveCount));
  float persistence = clamp(u_persistence, 0., 1.);
  float noise = p_noise(p, int(oct_count), persistence, u_lacunarity);

  float max_amp = get_max_amp(persistence, oct_count);
  float noise_normalized = (noise + max_amp) / (2. * max_amp) + (u_proportion - .5);
  float sharpness = clamp(u_softness, 0., 1.);
  float smooth_w = 0.5 * fwidth(noise_normalized);
  float res = smoothstep(
    .5 - .5 * sharpness - smooth_w,
    .5 + .5 * sharpness + smooth_w,
    noise_normalized
  );

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,Ao={maxColorCount:5},Lo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${Ao.maxColorCount}];
uniform float u_colorsCount;

uniform float u_stepsPerColor;
uniform vec4 u_colorGlow;
uniform vec4 u_colorGap;
uniform float u_distortion;
uniform float u_gap;
uniform float u_glow;

${N}

out vec4 fragColor;

${L}

vec2 hash(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, uv).gb;
}

vec4 voronoi(vec2 x, float t) {
  vec2 ip = floor(x);
  vec2 fp = fract(x);

  vec2 mg, mr;
  float md = 8.;
  float rand = 0.;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 raw_hash = hash(ip + g);
      vec2 o = hash(ip + g);
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      float d = dot(r, r);

      if (d < md) {
        md = d;
        mr = r;
        mg = g;
        rand = raw_hash.x;
      }
    }
  }

  md = 8.;
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 g = mg + vec2(float(i), float(j));
      vec2 o = hash(ip + g);
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      if (dot(mr - r, mr - r) > .00001) {
        md = min(md, dot(.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  return vec4(md, mr, rand);
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .0125;

  float t = u_time;

  vec4 voronoiRes = voronoi(shape_uv, t);

  float shape = clamp(voronoiRes.w, 0., 1.);
  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${Ao.maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;
      float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
      localT = round(localT * steps) / steps;
      vec4 c = u_colors[i];
      c.rgb *= c.a;
      gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 cellColor = gradient.rgb;
  float cellOpacity = gradient.a;

  float glows = length(voronoiRes.yz * u_glow + .1);
  glows = pow(glows, 1.5);

  vec3 color = mix(cellColor, u_colorGlow.rgb * u_colorGlow.a, u_colorGlow.a * glows);
  float opacity = cellOpacity + u_colorGlow.a * glows;

  float edge = voronoiRes.x;
  float smoothEdge = .02 / (2. * u_scale) * (1. + .5 * u_gap);
  edge = smoothstep(u_gap - smoothEdge, u_gap + smoothEdge, edge);

  color = mix(u_colorGap.rgb * u_colorGap.a, color, edge);
  opacity = mix(u_colorGap.a, opacity, edge);

  fragColor = vec4(color, opacity);
}
`,Ko=`#version 300 es
precision mediump float;

uniform float u_scale;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_shape;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_spacing;
uniform float u_proportion;
uniform float u_softness;

${N}

out vec4 fragColor;

${L}
${oo}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .04;

  float wave = .5 * cos(shape_uv.x * u_frequency * TWO_PI);
  float zigzag = 2. * abs(fract(shape_uv.x * u_frequency) - .5);
  float irregular = sin(shape_uv.x * .25 * u_frequency * TWO_PI) * cos(shape_uv.x * u_frequency * TWO_PI);
  float irregular2 = .75 * (sin(shape_uv.x * u_frequency * TWO_PI) + .5 * cos(shape_uv.x * .5 * u_frequency * TWO_PI));

  float offset = mix(zigzag, wave, smoothstep(0., 1., u_shape));
  offset = mix(offset, irregular, smoothstep(1., 2., u_shape));
  offset = mix(offset, irregular2, smoothstep(2., 3., u_shape));
  offset *= 2. * u_amplitude;

  float spacing = .02 + .98 * u_spacing;
  float shape = .5 + .5 * sin((shape_uv.y + offset) * PI / spacing);

  float edge_width = .01 + .1 * abs(min(u_scale, 1.) - 1.);
  edge_width += .5 * max(0., u_softness);
  float dc = 1. - clamp(u_proportion, 0., 1.);
  float res = smoothstep(dc - edge_width, dc + edge_width, shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,xo={maxColorCount:10},qo=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${xo.maxColorCount}];
uniform float u_colorsCount;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

${N}

out vec4 fragColor;

${L}
${io}
${oo}
${ro}


void main() {
  vec2 uv = v_patternUV;
  uv *= .005;

  float t = 0.0625 * u_time;

  float n1 = valueNoise(uv * 1. + t);
  float n2 = valueNoise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterationsNumber = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterationsNumber; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);

  float shape = 0.;
  if (u_shape < .5) {
    vec2 checksShape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checksShape_uv.x) * cos(checksShape_uv.y);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripesShape_uv = uv * (2. * u_shapeScale);
    float f = fract(stripesShape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float shapeScaling = 5. * (1. - u_shapeScale);
    shape = smoothstep(.45 - shapeScaling, .55 + shapeScaling, 1. - uv.y + .3 * (proportion - .5));
  }

  float mixer = shape * (u_colorsCount - 1.);
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${xo.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localMixer = clamp(mixer - float(i - 1), 0.0, 1.0);

    float localMixerStart = floor(localMixer);
    float smoothed = smoothstep(.5 - u_softness * .5, .5 + u_softness * .5, localMixer - localMixerStart);
    float localTStepped = localMixerStart + smoothed;

    localMixer = mix(localTStepped, localMixer, u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localMixer);
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${J}

  fragColor = vec4(color, opacity);
}
`,jo={checks:0,stripes:1,edge:2},Bo={maxColorCount:5},Zo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorBloom;
uniform vec4 u_colors[${Bo.maxColorCount}];
uniform float u_colorsCount;

uniform float u_density;
uniform float u_spotty;
uniform float u_midSize;
uniform float u_midIntensity;
uniform float u_intensity;
uniform float u_bloom;

${N}

out vec4 fragColor;

${L}
${io}
${oo}
${ro}

float hash(float n) {
  return fract(sin(n * 43758.5453123) * 43758.5453123);
}

float raysShape(vec2 uv, float r, float freq, float intensity, float radius) {
  float a = atan(uv.y, uv.x);
  vec2 left = vec2(a * freq, r);
  vec2 right = vec2(mod(a, TWO_PI) * freq, r);
  float n_left = pow(valueNoise(left), intensity);
  float n_right = pow(valueNoise(right), intensity);
  float shape = mix(n_right, n_left, smoothstep(-.15, .15, uv.x));
  return shape;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = .2 * u_time;

  float radius = length(shape_uv);
  float spots = 5. * abs(u_spotty);

  float intensity = 4. - 3. * clamp(u_intensity, 0., 1.);

  float delta = 1. - smoothstep(0., 1., radius);

  float midSize = 10. * abs(u_midSize);
  float middleShape = pow(u_midIntensity, .3) * smoothstep(midSize, 0.02 * midSize, 3.0 * radius);
  middleShape = pow(middleShape, 5.0);

  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;

  for (int i = 0; i < ${Bo.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 rotatedUV = rotate(shape_uv, float(i) + 1.0);

    float r1 = radius * (1.0 + 0.4 * float(i)) - 3.0 * t;
    float r2 = 0.5 * radius * (1.0 + spots) - 2.0 * t;
    float density = 6. * u_density + step(.5, u_density) * pow(4.5 * (u_density - .5), 4.);
    float f = mix(1.0, 3.0 + 0.5 * float(i), hash(float(i) + 10.0)) * density;

    float ray = raysShape(rotatedUV, r1, 5.0 * f, intensity, radius);
    ray *= raysShape(rotatedUV, r2, 4.0 * f, intensity, radius);
    ray += (1. + 4. * ray) * middleShape;
    ray = clamp(ray, 0.0, 1.0);

    float srcAlpha = u_colors[i].a * ray;
    vec3 srcColor = u_colors[i].rgb * srcAlpha;

    vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * srcColor;
    float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * srcAlpha;

    vec3 addBlendColor = accumColor + srcColor;
    float addBlendAlpha = accumAlpha + srcAlpha;

    accumColor = mix(alphaBlendColor, addBlendColor, u_bloom);
    accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_bloom);
  }

  float overlayAlpha = u_colorBloom.a;
  vec3 overlayColor = u_colorBloom.rgb * overlayAlpha;

  vec3 colorWithOverlay = accumColor + accumAlpha * overlayColor;
  accumColor = mix(accumColor, colorWithOverlay, u_bloom);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;

  vec3 color = accumColor + (1. - accumAlpha) * bgColor;
  float opacity = accumAlpha + (1. - accumAlpha) * u_colorBack.a;
  color = clamp(color, 0., 1.);
  opacity = clamp(opacity, 0., 1.);

  ${J}

  fragColor = vec4(color, opacity);
}
`,Jo=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_density;
uniform float u_distortion;
uniform float u_strokeWidth;
uniform float u_strokeCap;
uniform float u_strokeTaper;

uniform float u_noiseFrequency;
uniform float u_noisePower;
uniform float u_softness;

${N}

out vec4 fragColor;

${L}
${eo}

void main() {
  vec2 shape_uv = v_patternUV * .02;

  float t = u_time;

  float l = length(shape_uv);
  float angle = atan(shape_uv.y, shape_uv.x) - 2. * t;
  float angle_norm = angle / TWO_PI;

  angle_norm += .125 * u_noisePower * snoise(.5 * u_noiseFrequency * shape_uv);

  float offset = pow(l, 1. - clamp(u_density, 0., 1.)) + angle_norm;

  float stripe_map = fract(offset);
  stripe_map -= .5 * u_strokeTaper * l;

  stripe_map += .25 * u_noisePower * snoise(u_noiseFrequency * shape_uv);

  float shape = 2. * abs(stripe_map - .5);
  float test = step(.5, stripe_map);

  shape *= (1. + u_distortion * sin(4. * l - t) * cos(PI + l + t));

  float stroke_width = clamp(u_strokeWidth, fwidth(l), 1. - fwidth(l));

  float edge_width = min(fwidth(l), fwidth(offset));

  float mid = 1. - smoothstep(.0, .9, l);
  mid = pow(mid, 2.);
  shape -= .5 * u_strokeCap * mid;

  float res = smoothstep(stroke_width - edge_width - u_softness, stroke_width + edge_width + u_softness, shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = bgColor * res;
  float opacity = bgOpacity * res;

  color += fgColor * (1. - opacity);
  opacity += fgOpacity * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,wo={maxColorCount:10},$o=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${wo.maxColorCount}];
uniform float u_colorsCount;
uniform float u_bandCount;
uniform float u_twist;
uniform float u_softness;
uniform float u_noisePower;
uniform float u_noiseFrequency;

${N}

out vec4 fragColor;

${L}
${eo}
${oo}

void main() {
  vec2 shape_uv = v_objectUV;

  float l = length(shape_uv);

  float t = u_time;

  float angle = ceil(u_bandCount) * atan(shape_uv.y, shape_uv.x) + t;
  float angle_norm = angle / TWO_PI;

  float twist = 3. * clamp(u_twist, 0., 1.);
  float offset = pow(l, -twist) + angle_norm;

  float shape = fract(offset);
  shape = 1. - abs(2. * shape - 1.);
  shape += u_noisePower * snoise(pow(u_noiseFrequency, 2.) * shape_uv);

  float mid = smoothstep(.2, .4, pow(l, twist));
  shape = mix(0., shape, mid);

  shape = clamp(shape - .5 / u_colorsCount, 0., 1.);

  float edge_w = fwidth(shape);
  
  float totalShape = smoothstep(0., u_softness + 2. * edge_w, clamp(shape * u_colorsCount, 0., 1.));
  float mixer = shape * (u_colorsCount - 1.);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${wo.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    float localT = clamp(mixer - float(i - 1), 0., 1.);
    localT = smoothstep(.5 - .5 * u_softness, .5 + .5 * u_softness + edge_w, localT);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * totalShape;
  float opacity = gradient.a * totalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,oe=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

${Co}

uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;

out vec4 fragColor;

${eo}
${L}
${io}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
  0,  8,  2, 10,
 12,  4, 14,  6,
  3, 11,  1,  9,
 15,  7, 13,  5
);

const int bayer8x8[64] = int[64](
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(mod(uv, float(size)));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  #define USE_PATTERN_SIZING
  #define USE_OBJECT_SIZING
  #define USE_PIXELIZATION
  // #define ADD_HELPERS

  ${Uo}

  vec2 dithering_uv = pxSizeUv;
  vec2 ditheringNoise_uv = uv;
  vec2 shape_uv = objectUV;
  if (u_shape < 3.5) {
    shape_uv = patternUV;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shape_uv *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shape_uv, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shape_uv *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shape_uv.x += 0.6 / i * cos(i * 2.5 * shape_uv.y + t);
      shape_uv.y += 0.6 / i * cos(i * 1.5 * shape_uv.x + t);
    }

    shape = .15 / abs(sin(t - shape_uv.y - shape_uv.x));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shape_uv *= .05;

    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = fract(sin(stripeIdx * 12.9898) * 43758.5453);

    float speed = sign(rand - .5) * ceil(2. + rand);
    shape = sin(shape_uv.x) * cos(shape_uv.y + speed * t);
    shape = pow(shape, 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shape_uv *= 4.;

    float wave = cos(.5 * shape_uv.x - 2. * t) * sin(1.5 * shape_uv.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shape_uv);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shape_uv);
    float angle = 6. * atan(shape_uv.y, shape_uv.x) + 4. * t;
    float twist = 1.2;
    float offset = pow(l, -twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shape_uv *= 2.;

    vec3 pos = vec3(shape_uv, sqrt(1. - pow(length(shape_uv), 2.)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(random(ditheringNoise_uv), shape);
    } break;
    case 2:
      dithering = getBayerValue(dithering_uv, 2);
      break;
    case 3:
      dithering = getBayerValue(dithering_uv, 4);
      break;
    default:
      dithering = getBayerValue(dithering_uv, 8);
      break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  #ifdef ADD_HELPERS
    vec2 helperBox = objectHelperBox;
    vec2 boxSize = objectBoxSize;
    if (u_shape < 3.5) {
      helperBox = patternHelperBox;
      boxSize = patternBoxSize;
    }
    ${Io}
  #endif

  fragColor = vec4(color, opacity);
}
`,ee={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},te={random:1,"2x2":2,"4x4":3,"8x8":4},_o={maxColorCount:7},ae=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${_o.maxColorCount}];
uniform float u_colorsCount;
uniform float u_softness;
uniform float u_intensity;
uniform float u_noise;
uniform float u_shape;

${N}
${Do}
${Co}

out vec4 fragColor;

${L}
${eo}
${oo}

float randomGeneric(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float random(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, uv).r;
}
${ro}
float fbm(in vec2 n) {
  float total = 0.0, amplitude = .2;
  for (int i = 0; i < 3; i++) {
    total += valueNoise(n) * amplitude;
    n += n;
    amplitude *= 0.6;
  }
  return total;
}


vec2 truchet(vec2 uv, float idx){
    idx = fract(((idx - .5) * 2.));
    if (idx > 0.75) {
        uv = vec2(1.0) - uv;
    } else if (idx > 0.5) {
        uv = vec2(1.0 - uv.x, uv.y);
    } else if (idx > 0.25) {
        uv = 1.0 - vec2(1.0 - uv.x, uv.y);
    }
    return uv;
}

void main() {

  float t = .1 * u_time;
    
  vec2 shape_uv = vec2(0.);
  vec2 grain_uv = vec2(0.);

  if (u_shape > 3.5) {
    shape_uv = v_objectUV;
    grain_uv = shape_uv;

    // apply inverse transform to grain_uv so it respects the originXY
    float r = u_rotation * 3.14159265358979323846 / 180.;
    mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
    vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);    
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    grain_uv -= graphicOffset;
    grain_uv *= v_objectBoxSize;
    grain_uv *= .7;
  } else {
    shape_uv = .005 * v_patternUV;
    grain_uv = v_patternUV;
    
    // apply inverse transform to grain_uv so it respects the originXY
    float r = u_rotation * 3.14159265358979323846 / 180.;
    mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
    vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);    
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    if (u_fit > 0.) {
      vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
      givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
      float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
      vec2 patternBoxGivenSize = vec2(
        (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
        (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
      );
      patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
      float patternBoxNoFitBoxWidth = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
      grain_uv /= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
    }
    vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
    grain_uv -= graphicOffset / patternBoxScale;
    grain_uv *= 1.6;
  }


  float shape = 0.;

  if (u_shape < 1.5) {
    // Sine wave

    float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

  } else if (u_shape < 2.5) {
    // Grid (dots)

    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = fract(sin(stripeIdx * 12.9898) * 43758.5453);

    float speed = sign(rand - .5) * ceil(2. + rand);
    shape = sin(shape_uv.x) * cos(shape_uv.y + speed * t);
    shape = pow(shape, 4.);

  } else if (u_shape < 3.5) {
    // Truchet pattern
    
    float n2 = valueNoise(shape_uv * .4 - 3.75 * t);
    shape_uv.x += 10.;
    shape_uv *= .6;

    vec2 tile = truchet(fract(shape_uv), randomGeneric(floor(shape_uv)));

    float distance1 = length(tile);
    float distance2 = length(tile - vec2(1.));

    n2 -= .5;
    n2 *= .1;
    shape = smoothstep(.2, .55, distance1 + n2) * smoothstep(.8, .45, distance1 - n2);
    shape += smoothstep(.2, .55, distance2 + n2) * smoothstep(.8, .45, distance2 - n2);

    shape = pow(shape, 1.5);

  } else if (u_shape < 4.5) {
    // Corners

    shape_uv *= .6;
    vec2 outer = vec2(.5);

    vec2 bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * sin(5.25 * t)));
    vec2 tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape = 1. - bl.x * bl.y * tr.x * tr.y;

    shape_uv = -shape_uv;
    bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * cos(5.25 * t)));
    tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape -= bl.x * bl.y * tr.x * tr.y;

    shape = 1. - smoothstep(0., 1., shape);

  } else if (u_shape < 5.5) {
    // Ripple

    shape_uv *= 2.;
    float dist = length(.4 * shape_uv);
    float waves = sin(pow(dist, 1.2) * 5. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Blob

    t *= 2.;

    vec2 f1_traj = .25 * vec2(1.3 * sin(t), .2 + 1.3 * cos(.6 * t + 4.));
    vec2 f2_traj = .2 * vec2(1.2 * sin(-t), 1.3 * sin(1.6 * t));
    vec2 f3_traj = .25 * vec2(1.7 * cos(-.6 * t), cos(-1.6 * t));
    vec2 f4_traj = .3 * vec2(1.4 * cos(.8 * t), 1.2 * sin(-.6 * t - 3.));

    shape = .5 * pow(1. - clamp(0., 1., length(shape_uv + f1_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f2_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f3_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f4_traj)), 5.);

    shape = smoothstep(.0, .9, shape);
    float edge = smoothstep(.25, .3, shape);
    shape = mix(.0, shape, edge);

  } else {
    // Sphere

    shape_uv *= 2.;
    float d = length(shape_uv);
    float z = sqrt(1.0 - clamp(pow(d, 2.0), 0.0, 1.0));
    vec3 pos = vec3(shape_uv, z);
    vec3 lightPos = normalize(vec3(cos(4.5 * t), 0.8, sin(3.75 * t)));
    float lighting = dot(lightPos, pos);
    float edge = smoothstep(1., .97, d);
    shape = mix(.1, .5 + .5 * lighting, edge);
  }

  float simplex = snoise(grain_uv * .5);
  float grainDist = simplex * snoise(grain_uv * .2) - fbm(.002 * grain_uv + 10.) - fbm(.003 * grain_uv);
  float noise = clamp(.65 * simplex - fbm(rotate(.4 * grain_uv, 2.)) - fbm(.001 * grain_uv), 0., 1.);

  shape += u_intensity * 2. / u_colorsCount * (grainDist + .5);
  shape += u_noise * 10. / u_colorsCount * noise;

  float edge_w = fwidth(shape);

  shape = clamp(shape - .5 / u_colorsCount, 0., 1.);
  float totalShape = smoothstep(0., u_softness + 2. * edge_w, clamp(shape * u_colorsCount, 0., 1.));
  float mixer = shape * (u_colorsCount - 1.);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${_o.maxColorCount}; i++) {
    if (i > int(u_colorsCount) - 1) break;

    float localT = clamp(mixer - float(i - 1), 0., 1.);
    localT = smoothstep(.5 - .5 * u_softness, .5 + .5 * u_softness + edge_w, localT);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * totalShape;
  float opacity = gradient.a * totalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`,re={wave:1,dots:2,truchet:3,corners:4,ripple:5,blob:6,sphere:7},se=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorTint;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_shape;

${N}

out vec4 fragColor;

${L}
${oo}
${eo}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {

  float ch = mix(c2, c1, smoothstep(.0, blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));
  
  // Tint color is applied with color burn blending
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

void main() {

  float t = .1 * u_time;

  vec2 uv = v_objectUV;
  uv += .5;
  uv.y = 1. - uv.y;

  float cycleWidth = .5 * u_repetition;

  float mask = 1.;
  float contOffset = 1.;

  if (u_shape < 1.) {

    vec2 borderUV = v_responsiveUV + .5;
    float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
    vec2 edge = min(borderUV, 1. - borderUV);
    vec2 pixel_thickness = 250. / v_responsiveBoxGivenSize;
    float maskX = smoothstep(0.0, pixel_thickness.x, edge.x);
    float maskY = smoothstep(0.0, pixel_thickness.y, edge.y);
    maskX = pow(maskX, .25);
    maskY = pow(maskY, .25);
    mask = clamp(1. - maskX * maskY, 0., 1.);

    uv = v_responsiveUV;
    if (ratio > 1.) {
      uv.y /= ratio;
    } else {
      uv.x *= ratio;
    }
    uv += .5;
    uv.y = 1. - uv.y;

    cycleWidth *= 2.;
    contOffset = 1.5;

  } else if (u_shape < 2.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= .67;
    mask = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
  } else if (u_shape < 3.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= 1.68;

    float r = length(shapeUV) * 2.;
    float a = atan(shapeUV.y, shapeUV.x) + .2;
    r *= (1. + .05 * sin(3. * a + 2. * t));
    float f = abs(cos(a * 3.));
    mask = smoothstep(f, f + .7, r);
    mask = pow(mask, 2.);

    uv *= .8;
    cycleWidth *= 1.6;

  } else if (u_shape < 4.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= 1.3;
    mask = 0.;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float speed = 4.5 + 2. * sin(fi * 12.345);
      float angle = -fi * 1.5;
      vec2 dir1 = vec2(cos(angle), sin(angle));
      vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
      vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
      float d = length(shapeUV + traj);
      mask += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
    }
    mask = 1. - smoothstep(.65, .9, mask);
    mask = pow(mask, 4.);
  }

  float opacity = 1. - smoothstep(.8, .82, mask);

  float ridge = .15 * (smoothstep(.0, .15, uv.y) * smoothstep(.4, .15, uv.y));
  ridge += .05 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));
  mask += ridge;

  float diagBLtoTR = uv.x - uv.y;
  float diagTLtoBR = uv.x + uv.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);


  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  mask += (1. - mask) * u_distortion * noise;

  direction += diagBLtoTR;

  float contour = u_contour * smoothstep(0., contOffset, mask) * smoothstep(contOffset, 0., mask);
  direction -= 14. * noise * contour;

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - mask) * bump);
  direction *= smoothstep(1., .2, mask);


  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;


  float colorDispersion = (1. - bump);
  float dispersionRed = colorDispersion;
  dispersionRed += bump * noise;
  float dispersionBlue = colorDispersion;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = u_softness / 15. + .3 * contour;

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., mask + bump);
  float stripe_r = mod(direction + dispersionRed, 1.);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur, bump, u_colorTint.r);
  float stripe_g = mod(direction, 1.);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur, bump, u_colorTint.g);
  float stripe_b = mod(direction - dispersionBlue, 1.);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur, bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,ie={none:0,circle:1,daisy:2,metaballs:3},co={maxColorCount:5,maxSpotsPerColor:5},ne=`#version 300 es
precision lowp float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${co.maxColorCount}];
uniform float u_colorsCount;
uniform float u_roundness;
uniform float u_thickness;
uniform float u_softness;
uniform float u_intensity;
uniform float u_spotSize;
uniform float u_spotsPerColor;
uniform float u_pulse;
uniform float u_smoke;
uniform float u_smokeSize;

uniform sampler2D u_pulseTexture;
uniform sampler2D u_noiseTexture;

${N}

out vec4 fragColor;

${L}

float roundedBox(vec2 uv, vec2 halfSize, float radius, float distance, float edgeSoftness) {
    
    float borderDistance = abs(distance) - .5 * u_thickness;
    float border = 1. - smoothstep(-.5 * edgeSoftness, .5 * edgeSoftness, borderDistance);
    border *= border;

    vec2 v0 = uv + halfSize;
    vec2 v1 = uv - vec2(-halfSize.x, halfSize.y);
    vec2 v2 = uv - vec2(halfSize.x, -halfSize.y);
    vec2 v3 = uv - halfSize;

    float mult = (.07 - .25 * radius);
    float m0 = mult * clamp(pow(1. - abs(v0.x - v0.y), 20.), 0., 1.);
    float m1 = mult * clamp(pow(1. - abs(v1.x + v1.y), 20.), 0., 1.);
    float m2 = mult * clamp(pow(1. - abs(v2.x + v2.y), 20.), 0., 1.);
    float m3 = mult * clamp(pow(1. - abs(v3.x - v3.y), 20.), 0., 1.);

    float l = edgeSoftness * .5 + .75 * u_thickness;
    float fade0 = 1. - clamp(length(v0) / l, 0., 1.);
    float fade1 = 1. - clamp(length(v1) / l, 0., 1.);
    float fade2 = 1. - clamp(length(v2) / l, 0., 1.);
    float fade3 = 1. - clamp(length(v3) / l, 0., 1.);

    m0 *= fade0;
    m1 *= fade1;
    m2 *= fade2;
    m3 *= fade3;

    float fillFix = m0 + m1 + m2 + m3;
    fillFix *= step(distance, 0.);
    fillFix *= (1. + 3. * u_thickness);
    fillFix *= (1.5 - .5 * smoothstep(0., .5, edgeSoftness));
    fillFix = clamp(fillFix, 0., 1.);

    return border + fillFix;
}

float roundedBoxSmoke(vec2 uv, vec2 halfSize, float radius, float distance, float size) {
    float borderDistance = abs(distance);
    float border = 1. - smoothstep(-.75 * size, .75 * size, borderDistance);
    border *= border;

    vec2 v0 = uv + halfSize;
    vec2 v1 = uv - vec2(-halfSize.x, halfSize.y);
    vec2 v2 = uv - vec2(halfSize.x, -halfSize.y);
    vec2 v3 = uv - halfSize;

    float l_mask = .5;
    float mask = smoothstep(0., 1., length(v0) / l_mask);
    mask *= smoothstep(0., 1., length(v1) / l_mask);
    mask *= smoothstep(0., 1., length(v2) / l_mask);
    mask *= smoothstep(0., 1., length(v3) / l_mask);

    return border * mask;
}

float random(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, uv).g;
}
vec2 rand2(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, uv).gb;
}

${ro}

float getWaveformValue(float time) {
  float dur = 5.;
  float wrappedTime = mod(time, dur);
  float normalizedTime = wrappedTime / dur;
  float value = texture(u_pulseTexture, vec2(normalizedTime, 0.5)).r;
  return value * 2. - 1.;
}

void main() {

  float t = .5 * u_time + 20.;

  vec2 borderUV = v_responsiveUV;

  float angle = atan(borderUV.y, borderUV.x) / TWO_PI;


  float borderRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  borderUV.x *= borderRatio;
  vec2 halfSize = vec2(.5);
  halfSize.x *= borderRatio;
  float radius = min(.5 * u_roundness, halfSize.x);
  vec2 d = abs(borderUV) - halfSize + radius;
  float outsideDistance = length(max(d, 0.)) - radius;
  float insideDistance = min(max(d.x, d.y), 0.0);
  float distance = outsideDistance + insideDistance;

  float border = roundedBox(borderUV, halfSize, radius, distance, .5 * u_softness);

  float pulse = u_pulse * getWaveformValue(.18 * u_time);

  border *= (1. + .1 * pulse);
  border *= (1. + u_intensity);

  vec2 smokeUV = .001 * u_smokeSize * v_patternUV;
  float smoke = clamp(3. * valueNoise(2.7 * smokeUV + .5 * t), 0., 1.);
  smoke -= valueNoise(3.4 * smokeUV - .5 * t);
  smoke *= roundedBoxSmoke(borderUV, halfSize, radius, distance, u_smoke);
  smoke = 50. * pow(smoke, 2.);
  smoke *= u_smoke;
  smoke *= (.8 + .4 * pulse);
  smoke = clamp(smoke, 0., 1.);

  border += smoke;

  float sectorsTotal = 0.;

  vec3 color = vec3(0.);
  float opacity = 0.;

  vec3 accumColor = vec3(0.);
  float accumAlpha = 0.;

  for (int i = 0; i < ${co.maxSpotsPerColor}; i++) {
    if (i >= int(u_spotsPerColor)) break;
    float idx = float(i);

    for (int j = 0; j < ${co.maxColorCount}; j++) {
      if (j >= int(u_colorsCount)) break;
      float colorIdx = float(j);

      vec2 randVal = rand2(vec2(idx * 10. + 2., 40. + colorIdx));
  
      float time = (.1 + .15 * abs(sin(idx * (2. + colorIdx)) * cos(idx * (2. + 2.5 * colorIdx)))) * t + randVal.x * 3.;
      time *= mix(1., -1., step(.5, randVal.y));

      float mask = .2 + mix(
        sin(t + idx * (5. - 1.5 * colorIdx)),
        cos(t + idx * (3. + 1.3 * colorIdx)),
        step(mod(colorIdx, 2.), .5)
      );

      mask += pulse;
      if (mask < 0.) continue;

      float atg1 = fract(angle + time);
      float sector = smoothstep(.5 - u_spotSize, .5, atg1) * smoothstep(.5 + u_spotSize, .5, atg1);
      sector *= border;
      sector *= mask;
      sector = clamp(sector, 0., 1.);

      sectorsTotal += sector;

      float alpha = sector * u_colors[j].a;
      accumColor += u_colors[j].rgb * alpha;
      accumAlpha += alpha;
    }
  }

  color = accumColor;
  opacity = clamp(accumAlpha, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`,fo={maxColorCount:7},le=`#version 300 es
precision lowp float;

uniform float u_time;

uniform vec4 u_colors[${fo.maxColorCount}];
uniform float u_colorsCount;
uniform vec4 u_colorBack;
uniform float u_density;
uniform float u_angle1;
uniform float u_angle2;
uniform float u_length;
uniform float u_blur;
uniform float u_fadeIn;
uniform float u_fadeOut;
uniform float u_gradient;

${N}

out vec4 fragColor;

${L}

vec2 getPanel(float angle, vec2 uv, float invLength) {
  float sinA = sin(angle);
  float cosA = cos(angle);

  float denom = sinA - uv.y * cosA;
  if (abs(denom) < 1e-5) return vec2(0.);

  float z = uv.y / denom;
  float zLimit = 0.5;

  if (z < 0. || z > zLimit) return vec2(0.);

  float zRatio = z / zLimit;
  float panelMap = 1.0 - zRatio;
  float x = uv.x * (cosA * z + 1.) * invLength;

  float zOffset = zRatio - .5;
  float left = -.5 + zOffset * u_angle1;
  float right = .5 - zOffset * u_angle2;

  float blurFactor = (1. - panelMap) * clamp((abs(angle / TWO_PI - .5) - .01) / (-.01), 0., 1.);;
  float blurX = .15 * blurFactor + panelMap * u_blur;

  float leftEdge1 = left - .5 * blurX;
  float leftEdge2 = left + blurX;
  float rightEdge1 = right - blurX;
  float rightEdge2 = right + .5 * blurX;

  float panel = smoothstep(leftEdge1, leftEdge2, x) * (1.0 - smoothstep(rightEdge1, rightEdge2, x));

  return vec2(panel, clamp(panelMap, 0., 1.));
}

vec4 blendColor(vec4 colorA, float panelMask, float panelMap) {
  float fade = smoothstep(-.2 * (1. - u_fadeOut), u_fadeOut, panelMap)
   * (1. - smoothstep(1. - u_fadeIn, 1., panelMap));

  vec3 blendedRGB = mix(vec3(0.), colorA.rgb, fade);
  float blendedAlpha = mix(0., colorA.a, fade);

  return vec4(blendedRGB, blendedAlpha) * panelMask;
}

void main() {
  vec2 uv = v_objectUV;
  uv *= 1.25;

  float t = .05 * u_time;
  t = fract(t);
  bool reverseTime = (t < 0.5);

  vec3 color = vec3(0.);
  float opacity = 0.;

  int colorsCount = int(u_colorsCount);

  vec4 premultipliedColors[${fo.maxColorCount}];
  for (int i = 0; i < ${fo.maxColorCount}; i++) {
    if (i >= colorsCount) break;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    premultipliedColors[i] = c;
  }

  float invLength = 1.5 / (u_length + 0.001);

  float totalColorWeight = 0.;
  int panelsNumber = 12;

  float densityNormalizer = 1.;
  if (colorsCount == 4) {
    panelsNumber = 16;
    densityNormalizer = 1.34;
  } else if (colorsCount == 5) {
    panelsNumber = 20;
    densityNormalizer = 1.67;
  } else if (colorsCount == 7) {
    panelsNumber = 14;
    densityNormalizer = 1.17;
  }

  float fPanelsNumber = float(panelsNumber);

  float totalPanelsShape = 0.;
  float panelGrad = 1. - clamp(u_gradient, 0., 1.);

  for (int set = 0; set < 2; set++) {
    bool isForward = (set == 0 && !reverseTime) || (set == 1 && reverseTime);
    if (!isForward) continue;

    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 1) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(t + offset);
      float angleNorm = densityFract / u_density;
      if (densityFract >= .5 || angleNorm >= .3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((.3 - angleNorm) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength);
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      if (panelMask <= .001) continue;
      float panelMap = panel[1];

      int colorIdx = idx % colorsCount;
      int nextColorIdx = (idx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }


    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 0) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(-t + offset);
      float angleNorm = -densityFract / u_density;
      if (densityFract >= .5 || angleNorm < -.3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((angleNorm + .3) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength);
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      if (panelMask <= .001) continue;
      float panelMap = panel[1];

      int colorIdx = (colorsCount - (idx % colorsCount)) % colorsCount;
      if (colorIdx < 0) colorIdx += colorsCount;
      int nextColorIdx = (colorIdx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }
  }

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${J}

  fragColor = vec4(color, opacity);
}
`;function x(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:uo;if(typeof t!="string")return uo;let o,a,e,s=1;if(t.startsWith("#"))[o,a,e,s]=ce(t);else if(t.startsWith("rgb"))[o,a,e,s]=fe(t);else if(t.startsWith("hsl"))[o,a,e,s]=pe(ue(t));else return console.error("Unsupported color format",t),uo;return[so(o,0,1),so(a,0,1),so(e,0,1),so(s,0,1)]}function ce(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(r=>r+r).join("")),t.length===6&&(t=t+"ff");const o=parseInt(t.slice(0,2),16)/255,a=parseInt(t.slice(2,4),16)/255,e=parseInt(t.slice(4,6),16)/255,s=parseInt(t.slice(6,8),16)/255;return[o,a,e,s]}function fe(t){const o=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return o?[parseInt(o[1]??"0")/255,parseInt(o[2]??"0")/255,parseInt(o[3]??"0")/255,o[4]===void 0?1:parseFloat(o[4])]:[0,0,0,1]}function ue(t){const o=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return o?[parseInt(o[1]??"0"),parseInt(o[2]??"0"),parseInt(o[3]??"0"),o[4]===void 0?1:parseFloat(o[4])]:[0,0,0,1]}function pe(t){const[o,a,e,s]=t,r=o/360,i=a/100,l=e/100;let f,c,n;if(a===0)f=c=n=l;else{const d=(v,u,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<.16666666666666666?v+(u-v)*6*p:p<.5?u:p<.6666666666666666?v+(u-v)*(.6666666666666666-p)*6:v),h=l<.5?l*(1+i):l+i-l*i,m=2*l-h;f=d(m,h,r+1/3),c=d(m,h,r),n=d(m,h,r-1/3)}return[f,c,n,s]}const so=(t,o,a)=>Math.min(Math.max(t,o),a),uo=[0,0,0,1];function ao(t=0){if(typeof window>"u")throw new Error("Paper Shaders: can’t create a texture on the server");let o="";t===0?o="data:image/png;base64,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":t===1&&(o="data:image/png;base64,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");const a=new Image;return a.src=o,a}function me(t){const o=w.useRef(void 0),a=w.useCallback(e=>{const s=t.map(r=>{if(r!=null){if(typeof r=="function"){const i=r,l=i(e);return typeof l=="function"?l:()=>{i(null)}}return r.current=e,()=>{r.current=null}}});return()=>{s.forEach(r=>r==null?void 0:r())}},t);return w.useMemo(()=>t.every(e=>e==null)?null:e=>{o.current&&(o.current(),o.current=void 0),e!=null&&(o.current=a(e))},t)}async function bo(t){const o={},a=[],e=r=>{try{return r.startsWith("/")||new URL(r),!0}catch{return!1}},s=r=>{try{return r.startsWith("/")?!1:new URL(r,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(t).forEach(([r,i])=>{if(typeof i=="string"){if(!e(i)){console.warn(`Uniform "${r}" has invalid URL "${i}". Skipping image loading.`);return}const l=new Promise((f,c)=>{const n=new Image;s(i)&&(n.crossOrigin="anonymous"),n.onload=()=>{o[r]=n,f()},n.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${i}`),c()},n.src=i});a.push(l)}else o[r]=i}),await Promise.all(a),o}const D=w.forwardRef(function({fragmentShader:o,uniforms:a,webGlContextAttributes:e,speed:s=0,frame:r=0,minPixelRatio:i,maxPixelCount:l,...f},c){const[n,d]=w.useState(!1),h=w.useRef(null),m=w.useRef(null);w.useEffect(()=>((async()=>{const p=await bo(a);h.current&&!m.current&&(m.current=new Wo(h.current,o,p,e,s,r,i,l),d(!0))})(),()=>{var p;(p=m.current)==null||p.dispose(),m.current=null}),[o,e]),w.useEffect(()=>{(async()=>{var B;const p=await bo(a);(B=m.current)==null||B.setUniforms(p)})()},[a,n]),w.useEffect(()=>{var u;(u=m.current)==null||u.setSpeed(s)},[s,n]),w.useEffect(()=>{var u;(u=m.current)==null||u.setMaxPixelCount(l)},[l,n]),w.useEffect(()=>{var u;(u=m.current)==null||u.setMinPixelRatio(i)},[i,n]),w.useEffect(()=>{var u;(u=m.current)==null||u.setFrame(r)},[r,n]);const v=me([h,c]);return R.jsx("div",{ref:v,...f})});D.displayName="ShaderMount";function K(t,o){var a,e,s;for(const r in t){if(r==="colors"){const i=Array.isArray(t.colors),l=Array.isArray(o.colors);if(!i||!l){if(Object.is(t.colors,o.colors)===!1)return!1;continue}if(((a=t.colors)==null?void 0:a.length)!==((e=o.colors)==null?void 0:e.length)||!((s=t.colors)!=null&&s.every((f,c)=>{var n;return f===((n=o.colors)==null?void 0:n[c])})))return!1;continue}if(Object.is(t[r],o[r])===!1)return!1}return!0}const j={name:"Default",params:{..._,speed:1,frame:4e4,colors:["#5100ff","#00ff80","#ffcc00","#ea00ff"],distortion:.8,swirl:.1}},de={name:"Purple",params:{..._,speed:.6,frame:100,colors:["#aaa7d7","#3c2b8e","#f4eabb","#c99cd5"],distortion:.3,swirl:.5}},he={name:"Beach",params:{..._,speed:.1,frame:0,colors:["#bcecf6","#80c3e4","#f3eccb","#f3d987"],distortion:.8,swirl:.35}},St=[j,de,he],kt=w.memo(function({speed:o=j.params.speed,frame:a=j.params.frame,colors:e=j.params.colors,distortion:s=j.params.distortion,swirl:r=j.params.swirl,fit:i=j.params.fit,rotation:l=j.params.rotation,scale:f=j.params.scale,originX:c=j.params.originX,originY:n=j.params.originY,offsetX:d=j.params.offsetX,offsetY:h=j.params.offsetY,worldWidth:m=j.params.worldWidth,worldHeight:v=j.params.worldHeight,...u}){const p={u_colors:e.map(x),u_colorsCount:e.length,u_distortion:s,u_swirl:r,u_fit:T[i],u_rotation:l,u_scale:f,u_offsetX:d,u_offsetY:h,u_originX:c,u_originY:n,u_worldWidth:m,u_worldHeight:v};return R.jsx(D,{...u,speed:o,frame:a,fragmentShader:Vo,uniforms:p})},K),U={name:"Default",params:{..._,speed:.4,frame:0,colorBack:"#ffffff",colors:["#136c5e","#0f0224"],noiseScale:5,noiseIterations:10,radius:.5,thickness:.25,innerShape:1.2}},ge={name:"Poison",params:{..._,speed:1,frame:0,colorBack:"#003d00",colors:["#d4ff00","#077d52","#aaff00"],noiseScale:3.3,noiseIterations:3,radius:.4,thickness:.2,innerShape:4}},ve={name:"Line",params:{..._,frame:0,colorBack:"#000000",colors:["#1fe8ff","#4540a4"],noiseScale:1.1,noiseIterations:2,radius:.38,thickness:.01,innerShape:.88,speed:4}},Ae={name:"Cloud",params:{..._,frame:0,colorBack:"#3b9bff",colors:["#ffffff"],noiseScale:3,noiseIterations:10,radius:.5,thickness:.65,innerShape:.9,speed:.5}},Ft=[U,ve,ge,Ae],Pt=w.memo(function({speed:o=U.params.speed,frame:a=U.params.frame,colorBack:e=U.params.colorBack,colors:s=U.params.colors,noiseScale:r=U.params.noiseScale,thickness:i=U.params.thickness,radius:l=U.params.radius,innerShape:f=U.params.innerShape,noiseIterations:c=U.params.noiseIterations,fit:n=U.params.fit,scale:d=U.params.scale,rotation:h=U.params.rotation,originX:m=U.params.originX,originY:v=U.params.originY,offsetX:u=U.params.offsetX,offsetY:p=U.params.offsetY,worldWidth:B=U.params.worldWidth,worldHeight:b=U.params.worldHeight,...C}){const y=typeof window<"u"&&{u_noiseTexture:ao()},G={u_colorBack:x(e),u_colors:s.map(x),u_colorsCount:s.length,u_noiseScale:r,u_thickness:i,u_radius:l,u_innerShape:f,u_noiseIterations:c,...y,u_fit:T[n],u_scale:d,u_rotation:h,u_offsetX:u,u_offsetY:p,u_originX:m,u_originY:v,u_worldWidth:B,u_worldHeight:b};return R.jsx(D,{...C,speed:o,frame:a,fragmentShader:To,uniforms:G})},K),X={name:"Default",params:{...g,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#bf9eff",colorBack:"#000000",brightness:.3,contrast:.6}},Wt=[X],zt=w.memo(function({speed:o=X.params.speed,frame:a=X.params.frame,colorFront:e=X.params.colorFront,colorMid:s=X.params.colorMid,colorBack:r=X.params.colorBack,brightness:i=X.params.brightness,contrast:l=X.params.contrast,fit:f=X.params.fit,scale:c=X.params.scale,rotation:n=X.params.rotation,originX:d=X.params.originX,originY:h=X.params.originY,offsetX:m=X.params.offsetX,offsetY:v=X.params.offsetY,worldWidth:u=X.params.worldWidth,worldHeight:p=X.params.worldHeight,...B}){const b={u_colorFront:x(e),u_colorMid:x(s),u_colorBack:x(r),u_brightness:i,u_contrast:l,u_fit:T[f],u_scale:c,u_rotation:n,u_offsetX:m,u_offsetY:v,u_originX:d,u_originY:h,u_worldWidth:u,u_worldHeight:p};return R.jsx(D,{...B,speed:o,frame:a,fragmentShader:Mo,uniforms:b})},K),M={name:"Default",params:{...g,speed:2,frame:0,colorBack:"#000000",colors:["#D2822D","#0C3D80","#B41A57","#37A166"],size:.9,sizeRange:0,spreading:1,stepsPerColor:2}},Et=[M],Qt=w.memo(function({speed:o=M.params.speed,frame:a=M.params.frame,colorBack:e=M.params.colorBack,colors:s=M.params.colors,size:r=M.params.size,sizeRange:i=M.params.sizeRange,spreading:l=M.params.spreading,stepsPerColor:f=M.params.stepsPerColor,fit:c=M.params.fit,scale:n=M.params.scale,rotation:d=M.params.rotation,originX:h=M.params.originX,originY:m=M.params.originY,offsetX:v=M.params.offsetX,offsetY:u=M.params.offsetY,worldWidth:p=M.params.worldWidth,worldHeight:B=M.params.worldHeight,...b}){const C={u_colorBack:x(e),u_colors:s.map(x),u_colorsCount:s.length,u_size:r,u_sizeRange:i,u_spreading:l,u_stepsPerColor:f,u_fit:T[c],u_scale:n,u_rotation:d,u_offsetX:v,u_offsetY:u,u_originX:h,u_originY:m,u_worldWidth:p,u_worldHeight:B};return R.jsx(D,{...b,speed:o,frame:a,fragmentShader:Ho,uniforms:C})},K),E={name:"Default",params:{...g,colorBack:"#000000",colorFill:"#ffffff",colorStroke:"#dd5500",size:2,gapX:50,gapY:50,strokeWidth:0,sizeRange:0,opacityRange:0,shape:"circle"}},xe={name:"Macrodata",params:{...g,colorBack:"#15212d",colorFill:"#5794ff",colorStroke:"#0000ff",size:3,gapX:25,gapY:25,strokeWidth:0,sizeRange:.25,opacityRange:.9,shape:"circle"}},Be={name:"Triangles",params:{...g,colorBack:"#ffffff",colorFill:"#ffffff",colorStroke:"#808080",size:5,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"triangle"}},we={name:"Bubbles",params:{...g,colorBack:"#002c9e80",colorFill:"#ffffff",colorStroke:"#000000",size:15,gapX:60,gapY:60,strokeWidth:12,sizeRange:.7,opacityRange:1.3,shape:"circle"}},_e={name:"Tree line",params:{...g,colorBack:"#f4fce7",colorFill:"#052e19",colorStroke:"#000000",size:8,gapX:20,gapY:90,strokeWidth:0,sizeRange:1,opacityRange:.6,shape:"circle"}},be={name:"Diamonds",params:{...g,colorBack:"#ffffff",colorFill:"#ff0000",colorStroke:"#000000",size:15,gapX:30,gapY:30,strokeWidth:0,sizeRange:0,opacityRange:2,shape:"diamond"}},Ce={name:"Wallpaper",params:{...g,colorBack:"#204030",colorFill:"#000000",colorStroke:"#bd955b",size:9,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"diamond"}},ye={name:"Enter the Matrix",params:{...g,colorBack:"#000000",colorFill:"#47ffea",colorStroke:"#000000",size:2,gapX:10,gapY:10,strokeWidth:.5,sizeRange:.25,opacityRange:1,shape:"triangle"}},Se={name:"Waveform",params:{...g,colorBack:"#ffffff",colorFill:"#0934b8",colorStroke:"#000000",size:100,gapX:2,gapY:215,strokeWidth:0,sizeRange:1,opacityRange:0,shape:"square"}},Rt=[E,xe,Be,we,_e,be,Ce,ye,Se],Dt=w.memo(function({colorBack:o=E.params.colorBack,colorFill:a=E.params.colorFill,colorStroke:e=E.params.colorStroke,size:s=E.params.size,gapX:r=E.params.gapX,gapY:i=E.params.gapY,strokeWidth:l=E.params.strokeWidth,sizeRange:f=E.params.sizeRange,opacityRange:c=E.params.opacityRange,shape:n=E.params.shape,fit:d=E.params.fit,scale:h=E.params.scale,rotation:m=E.params.rotation,originX:v=E.params.originX,originY:u=E.params.originY,offsetX:p=E.params.offsetX,offsetY:B=E.params.offsetY,worldWidth:b=E.params.worldWidth,worldHeight:C=E.params.worldHeight,maxPixelCount:y=6016*3384,...G}){const $={u_colorBack:x(o),u_colorFill:x(a),u_colorStroke:x(e),u_dotSize:s,u_gapX:r,u_gapY:i,u_strokeWidth:l,u_sizeRange:f,u_opacityRange:c,u_shape:No[n],u_fit:T[d],u_scale:h,u_rotation:m,u_offsetX:p,u_offsetY:B,u_originX:v,u_originY:u,u_worldWidth:b,u_worldHeight:C};return R.jsx(D,{...G,maxPixelCount:y,fragmentShader:Oo,uniforms:$})},K),Z={name:"Default",params:{...g,speed:1,frame:0,colors:["#40a0bf","#bf4040","#ffcc00"],stepsPerColor:3,softness:0}},Ut=[Z],It=w.memo(function({speed:o=Z.params.speed,frame:a=Z.params.frame,colors:e=Z.params.colors,stepsPerColor:s=Z.params.stepsPerColor,softness:r=Z.params.softness,fit:i=Z.params.fit,scale:l=Z.params.scale,rotation:f=Z.params.rotation,originX:c=Z.params.originX,originY:n=Z.params.originY,offsetX:d=Z.params.offsetX,offsetY:h=Z.params.offsetY,worldWidth:m=Z.params.worldWidth,worldHeight:v=Z.params.worldHeight,...u}){const p={u_colors:e.map(x),u_colorsCount:e.length,u_stepsPerColor:s,u_softness:r,u_fit:T[i],u_scale:l,u_rotation:f,u_offsetX:d,u_offsetY:h,u_originX:c,u_originY:n,u_worldWidth:m,u_worldHeight:v};return R.jsx(D,{...u,speed:o,frame:a,fragmentShader:Go,uniforms:p})},K),q={name:"Default",params:{..._,scale:1,speed:1,frame:0,colorBack:"#103086",colors:["#FFC802","#FF5601","#FFC206"],count:7,size:.75}},Vt=[q],Tt=w.memo(function({speed:o=q.params.speed,frame:a=q.params.frame,colorBack:e=q.params.colorBack,colors:s=q.params.colors,size:r=q.params.size,count:i=q.params.count,fit:l=q.params.fit,rotation:f=q.params.rotation,scale:c=q.params.scale,originX:n=q.params.originX,originY:d=q.params.originY,offsetX:h=q.params.offsetX,offsetY:m=q.params.offsetY,worldWidth:v=q.params.worldWidth,worldHeight:u=q.params.worldHeight,...p}){const B={u_colorBack:x(e),u_colors:s.map(x),u_colorsCount:s.length,u_size:r,u_count:i,u_fit:T[l],u_rotation:f,u_scale:c,u_offsetX:h,u_offsetY:m,u_originX:n,u_originY:d,u_worldWidth:v,u_worldHeight:u};return R.jsx(D,{...p,speed:o,frame:a,fragmentShader:Xo,uniforms:B})},K),H={name:"Default",params:{...g,scale:1,colorFront:"#ffffff",colorBack:"#102c70",shape:0,frequency:.5,amplitude:.6,spacing:.65,proportion:.15,softness:.05}},ke={name:"Groovy",params:{...g,scale:5,rotation:90,colorFront:"#fcfcee",colorBack:"#ff896b",shape:3,frequency:.2,amplitude:.25,spacing:1.17,proportion:.57,softness:0}},Fe={name:"Tangled up",params:{...g,scale:.5,rotation:0,colorFront:"#133a41",colorBack:"#c2d8b6",shape:3,frequency:.44,amplitude:.57,spacing:1.05,proportion:.75,softness:.02}},Pe={name:"Ride the wave",params:{...g,scale:1.7,rotation:0,colorFront:"#fdffe6",colorBack:"#1f1f1f",shape:2.25,frequency:.2,amplitude:1,spacing:1.25,proportion:1,softness:0}},Mt=[H,ke,Fe,Pe],Ht=w.memo(function({colorFront:o=H.params.colorFront,colorBack:a=H.params.colorBack,shape:e=H.params.shape,frequency:s=H.params.frequency,amplitude:r=H.params.amplitude,spacing:i=H.params.spacing,proportion:l=H.params.proportion,softness:f=H.params.softness,fit:c=H.params.fit,scale:n=H.params.scale,rotation:d=H.params.rotation,offsetX:h=H.params.offsetX,offsetY:m=H.params.offsetY,originX:v=H.params.originX,originY:u=H.params.originY,worldWidth:p=H.params.worldWidth,worldHeight:B=H.params.worldHeight,maxPixelCount:b=6016*3384,...C}){const y={u_colorFront:x(o),u_colorBack:x(a),u_shape:e,u_frequency:s,u_amplitude:r,u_spacing:i,u_proportion:l,u_softness:f,u_fit:T[c],u_scale:n,u_rotation:d,u_offsetX:h,u_offsetY:m,u_originX:v,u_originY:u,u_worldWidth:p,u_worldHeight:B};return R.jsx(D,{...C,fragmentShader:Ko,uniforms:y})},K),k={name:"Default",params:{...g,speed:.5,frame:0,colorBack:"#262626",colorFront:"#d9d9d9",proportion:.35,softness:.1,octaveCount:2,persistence:1,lacunarity:1.5}},We={name:"Nintendo Water",params:{...g,scale:1/.2,speed:.4,frame:0,colorBack:"#2d69d4",colorFront:"#d1eefc",proportion:.42,softness:0,octaveCount:2,persistence:.55,lacunarity:1.8}},ze={name:"Colony",params:{...g,scale:1/.15,speed:0,frame:0,colorBack:"#f4f0ae",colorFront:"#0a1a5e",octaveCount:6,persistence:1,lacunarity:2.55,proportion:.65,softness:.35}},Ee={name:"Phosphenes",params:{...g,scale:1/.03,speed:.15,frame:0,colorBack:"#ec7c8b",colorFront:"#66cc99",proportion:.45,softness:.45,octaveCount:6,persistence:.3,lacunarity:3}},Qe={name:"Moss",params:{...g,scale:1/.15,speed:.02,frame:0,colorBack:"#05ff4a",colorFront:"#262626",proportion:.65,softness:.35,octaveCount:6,persistence:1,lacunarity:2.55}},Re={name:"Worms",params:{...g,scale:1/2,speed:0,frame:0,colorBack:"#ffffff",colorFront:"#595959",proportion:.5,softness:0,octaveCount:1,persistence:1,lacunarity:1.5}},Ot=[k,We,ze,Ee,Qe,Re],Nt=w.memo(function({speed:o=k.params.speed,frame:a=k.params.frame,colorFront:e=k.params.colorFront,colorBack:s=k.params.colorBack,proportion:r=k.params.proportion,softness:i=k.params.softness,octaveCount:l=k.params.octaveCount,persistence:f=k.params.persistence,lacunarity:c,fit:n=k.params.fit,worldWidth:d=k.params.worldWidth,worldHeight:h=k.params.worldHeight,scale:m=k.params.scale,rotation:v=k.params.rotation,originX:u=k.params.originX,originY:p=k.params.originY,offsetX:B=k.params.offsetX,offsetY:b=k.params.offsetY,...C}){const y={u_colorBack:x(s),u_colorFront:x(e),u_proportion:r,u_softness:i??k.params.softness,u_octaveCount:l??k.params.octaveCount,u_persistence:f??k.params.persistence,u_lacunarity:c??k.params.lacunarity,u_fit:T[n],u_scale:m,u_rotation:v,u_offsetX:B,u_offsetY:b,u_originX:u,u_originY:p,u_worldWidth:d,u_worldHeight:h};return R.jsx(D,{...C,speed:o,frame:a,fragmentShader:Yo,uniforms:y})},K),I={name:"Default",params:{...g,speed:.5,frame:0,colors:["#e65c1a","#e6c31a","#1aace6"],stepsPerColor:2,colorGlow:"#5500ff",colorGap:"#ffffff",distortion:.42,gap:.06,glow:0}},De={name:"Cells",params:{...g,scale:.5,speed:.5,frame:0,colors:["#ffffff"],stepsPerColor:1,colorGlow:"#ffffff",colorGap:"#ff0073",distortion:.5,gap:.03,glow:.8}},Gt=[I,De],Xt=w.memo(function({speed:o=I.params.speed,frame:a=I.params.frame,colors:e=I.params.colors,stepsPerColor:s=I.params.stepsPerColor,colorGlow:r=I.params.colorGlow,colorGap:i=I.params.colorGap,distortion:l=I.params.distortion,gap:f=I.params.gap,glow:c=I.params.glow,fit:n=I.params.fit,scale:d=I.params.scale,rotation:h=I.params.rotation,originX:m=I.params.originX,originY:v=I.params.originY,offsetX:u=I.params.offsetX,offsetY:p=I.params.offsetY,worldWidth:B=I.params.worldWidth,worldHeight:b=I.params.worldHeight,...C}){const y=typeof window<"u"&&{u_noiseTexture:ao()},G={u_colors:e.map(x),u_colorsCount:e.length,u_stepsPerColor:s,u_colorGlow:x(r),u_colorGap:x(i),u_distortion:l,u_gap:f,u_glow:c,...y,u_fit:T[n],u_scale:d,u_rotation:h,u_offsetX:u,u_offsetY:p,u_originX:m,u_originY:v,u_worldWidth:B,u_worldHeight:b};return R.jsx(D,{...C,speed:o,frame:a,fragmentShader:Lo,uniforms:G})},K),Q={name:"Default",params:{...g,rotation:0,speed:1,frame:0,colors:["#262626","#2e383d","#64a5ce","#ffffff"],proportion:.45,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:"checks"}},Ue={name:"The Abyss",params:{...g,scale:3,rotation:2,speed:.6,frame:0,colors:["#15122e","#7b89f2","#ffffff"],proportion:0,softness:1,distortion:.09,swirl:.48,swirlIterations:5,shapeScale:.85,shape:"edge"}},Ie={name:"Cauldron Pot",params:{...g,scale:.9,rotation:160,speed:10,frame:0,colors:["#a7e58b","#324472","#0a180d"],proportion:.64,softness:1.5,distortion:.2,swirl:.86,swirlIterations:7,shapeScale:.6,shape:"edge"}},Ve={name:"Filtered Light",params:{...g,scale:.3,rotation:45,speed:3.2,frame:0,colors:["#171714","#d4d8be","#f9f9e0"],proportion:.4,softness:1,distortion:.09,swirl:.1,swirlIterations:0,shapeScale:.1,shape:"stripes"}},Te={name:"Iceberg",params:{...g,scale:.8,rotation:190,offsetX:.3,speed:.5,frame:0,colors:["#ffffff","#324771","#0a180d"],proportion:.3,softness:1.2,distortion:.2,swirl:.86,swirlIterations:7,shapeScale:0,shape:"checks"}},Me={name:"Live Ink",params:{...g,scale:1.2,rotation:44,offsetY:-.3,speed:2.5,frame:0,colors:["#111314","#9faeab","#f3fee7","#f3fee7"],proportion:.05,softness:0,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.28,shape:"checks"}},He={name:"Kelp",params:{...g,scale:.65,rotation:50,speed:20,frame:0,colors:["#dbff8f","#404f3e","#091316"],proportion:.67,softness:.05,distortion:0,swirl:.15,swirlIterations:0,shapeScale:.74,shape:"stripes"}},Oe={name:"Nectar",params:{...g,scale:2,offsetY:.6,rotation:0,speed:4.2,frame:0,colors:["#151310","#d3a86b","#f0edea"],proportion:.24,softness:1,distortion:.21,swirl:.57,swirlIterations:10,shapeScale:.75,shape:"edge"}},Ne={name:"Passion",params:{...g,scale:2.5,rotation:1.35,speed:3,frame:0,colors:["#3b1515","#954751","#ffc085"],proportion:.5,softness:1,distortion:.09,swirl:.9,swirlIterations:6,shapeScale:.25,shape:"checks"}},Ge={name:"Phantom",params:{...g,scale:1.2,rotation:180,offsetY:-.2,speed:12.5,frame:0,colors:["#12112c","#7b89f2","#d7dcfb"],proportion:.5,softness:1,distortion:.2,swirl:.3,swirlIterations:7,shapeScale:.1,shape:"checks"}},Xe={name:"Silk",params:{...g,scale:2,rotation:0,speed:5,frame:0,colors:["#141111","#665551","#baaea9"],proportion:0,softness:1,distortion:.3,swirl:.6,swirlIterations:11,shapeScale:.25,shape:"stripes"}},Yt=[Q,Ue,Ie,Ve,Te,Me,He,Oe,Ne,Ge,Xe],Lt=w.memo(function({speed:o=Q.params.speed,frame:a=Q.params.frame,colors:e=Q.params.colors,proportion:s=Q.params.proportion,softness:r=Q.params.softness,distortion:i=Q.params.distortion,swirl:l=Q.params.swirl,swirlIterations:f=Q.params.swirlIterations,shapeScale:c=Q.params.shapeScale,shape:n=Q.params.shape,fit:d=Q.params.fit,scale:h=Q.params.scale,rotation:m=Q.params.rotation,originX:v=Q.params.originX,originY:u=Q.params.originY,offsetX:p=Q.params.offsetX,offsetY:B=Q.params.offsetY,worldWidth:b=Q.params.worldWidth,worldHeight:C=Q.params.worldHeight,...y}){const G={u_colors:e.map(x),u_colorsCount:e.length,u_proportion:s,u_softness:r,u_distortion:i,u_swirl:l,u_swirlIterations:f,u_shapeScale:c,u_shape:jo[n],u_scale:h,u_rotation:m,u_fit:T[d],u_offsetX:p,u_offsetY:B,u_originX:v,u_originY:u,u_worldWidth:b,u_worldHeight:C};return R.jsx(D,{...y,speed:o,frame:a,fragmentShader:qo,uniforms:G})},K),W={name:"Default",params:{..._,offsetX:-.4,offsetY:-.4,colorBack:"#002238",colorBloom:"#555522",colors:["#ffcd66","#ffb899","#a8fffb"],density:.55,spotty:.28,midIntensity:1,midSize:.4,intensity:.3,bloom:0,speed:1,frame:0}},Ye={name:"Aurora",params:{..._,offsetY:1,colorBack:"#404040",colorBloom:"#ff8888",colors:["#666eff","#66ff99","#66d9ff"],density:.5,spotty:.9,midIntensity:.8,midSize:.2,intensity:.5,bloom:1,speed:.5,frame:0}},Le={name:"Warp",params:{..._,colorBack:"#000000",colorBloom:"#222288",colors:["#ff00c4","#ff8c00","#ffffff"],density:.45,spotty:.15,midIntensity:0,midSize:0,intensity:.79,bloom:.4,speed:2,frame:0}},Ke={name:"Linear",params:{..._,offsetX:.2,offsetY:-.7,colorBack:"#000000",colorBloom:"#eeeeee",colors:["#ffffff1f","#ffffff3d","#ffffff29"],density:.41,spotty:.25,midSize:.1,midIntensity:.75,intensity:.79,bloom:1,speed:.5,frame:0}},qe={name:"Ether",params:{..._,offsetX:-.6,colorBack:"#090f1d",colorBloom:"#ffffff",colors:["#148effa6","#c4dffebe","#232a47"],density:.3,spotty:.77,midSize:.1,midIntensity:.5,intensity:.6,bloom:.6,speed:1,frame:0}},Kt=[W,Ye,Le,Ke,qe],qt=w.memo(function({speed:o=W.params.speed,frame:a=W.params.frame,colorBloom:e=W.params.colorBloom,colorBack:s=W.params.colorBack,colors:r=W.params.colors,density:i=W.params.density,spotty:l=W.params.spotty,midIntensity:f=W.params.midIntensity,midSize:c=W.params.midSize,intensity:n=W.params.intensity,bloom:d=W.params.bloom,fit:h=W.params.fit,scale:m=W.params.scale,rotation:v=W.params.rotation,originX:u=W.params.originX,originY:p=W.params.originY,offsetX:B=W.params.offsetX,offsetY:b=W.params.offsetY,worldWidth:C=W.params.worldWidth,worldHeight:y=W.params.worldHeight,...G}){const $={u_colorBloom:x(e),u_colorBack:x(s),u_colors:r.map(x),u_colorsCount:r.length,u_density:i,u_spotty:l,u_midIntensity:f,u_midSize:c,u_intensity:n,u_bloom:d,u_fit:T[h],u_scale:m,u_rotation:v,u_offsetX:B,u_offsetY:b,u_originX:u,u_originY:p,u_worldWidth:C,u_worldHeight:y};return R.jsx(D,{...G,speed:o,frame:a,fragmentShader:Zo,uniforms:$})},K),F={name:"Default",params:{...g,colorBack:"#fafafa",colorFront:"#808080",density:0,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noiseFrequency:0,noisePower:0,softness:.01,speed:1,frame:0}},je={name:"Noisy",params:{...g,colorBack:"#a1ef2a",colorFront:"#288918",scale:1.3,density:.5,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:.5,noiseFrequency:.1,noisePower:1,softness:0,speed:1,frame:0}},Ze={name:"Droplet",params:{...g,colorBack:"#effafe",colorFront:"#bf40a0",scale:.65,density:0,distortion:0,strokeWidth:.05,strokeTaper:0,strokeCap:1,noiseFrequency:0,noisePower:0,softness:0,speed:1,frame:0}},Je={name:"Sand",params:{...g,colorBack:"#dedede",colorFront:"#a09560",scale:.75,density:0,distortion:0,strokeWidth:.15,strokeTaper:0,strokeCap:0,noiseFrequency:30,noisePower:1,softness:.2,speed:0,frame:0}},$e={name:"Swirl",params:{...g,colorBack:"#b3e6d9",colorFront:"#1a2b4d",scale:4,density:.8,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noiseFrequency:0,noisePower:0,softness:.5,speed:1,frame:0}},ot={name:"Hook",params:{...g,colorBack:"#85c2e0",colorFront:"#000000",scale:.8,density:0,distortion:0,strokeWidth:.5,strokeTaper:.5,strokeCap:0,noiseFrequency:0,noisePower:0,softness:.02,speed:3,frame:0}},et={name:"Vinyl",params:{...g,colorBack:"#c2babb",colorFront:"#262626",density:0,distortion:.3,strokeWidth:.95,strokeTaper:0,strokeCap:1,noiseFrequency:0,noisePower:0,softness:.11,speed:1,frame:0}},jt=[F,je,Ze,$e,Je,ot,et],Zt=w.memo(function({speed:o=F.params.speed,frame:a=F.params.frame,colorBack:e=F.params.colorBack,colorFront:s=F.params.colorFront,density:r=F.params.density,distortion:i=F.params.distortion,strokeWidth:l=F.params.strokeWidth,strokeTaper:f=F.params.strokeTaper,strokeCap:c=F.params.strokeCap,noiseFrequency:n=F.params.noiseFrequency,noisePower:d=F.params.noisePower,softness:h=F.params.softness,fit:m=F.params.fit,rotation:v=F.params.rotation,scale:u=F.params.scale,originX:p=F.params.originX,originY:B=F.params.originY,offsetX:b=F.params.offsetX,offsetY:C=F.params.offsetY,worldWidth:y=F.params.worldWidth,worldHeight:G=F.params.worldHeight,...$}){const to={u_colorBack:x(e),u_colorFront:x(s),u_density:r,u_distortion:i,u_strokeWidth:l,u_strokeTaper:f,u_strokeCap:c,u_noiseFrequency:n,u_noisePower:d,u_softness:h,u_fit:T[m],u_scale:u,u_rotation:v,u_offsetX:b,u_offsetY:C,u_originX:p,u_originY:B,u_worldWidth:y,u_worldHeight:G};return R.jsx(D,{...$,speed:o,frame:a,fragmentShader:Jo,uniforms:to})},K),V={name:"Default",params:{..._,scale:2.28,offsetX:-.4,offsetY:.3,speed:.32,frame:0,colorBack:"#452424",colors:["#0b7f05","#ffe785","#ff335c"],bandCount:5,twist:.11,softness:.01,noiseFrequency:1.2,noisePower:.46}},tt={name:"Opening",params:{..._,offsetX:-.4,offsetY:.86,speed:.6,frame:0,colorBack:"#8b2e5f",colors:["#b14467","#e67a62","#ffbdb3"],bandCount:3,twist:.3,softness:0,noiseFrequency:2,noisePower:0}},at={name:"007",params:{..._,speed:1,frame:0,colorBack:"#000000",colors:["#2e2e2e","#000000","#ffffff"],bandCount:4,twist:.4,softness:0,noiseFrequency:0,noisePower:0}},rt={name:"Candy",params:{..._,speed:1,frame:0,colorBack:"#ffcd66",colors:["#6bbceb","#8a1fff","#ff9fff"],bandCount:2.5,twist:.2,softness:1,noiseFrequency:0,noisePower:0}},Jt=[V,tt,at,rt],$t=w.memo(function({speed:o=V.params.speed,frame:a=V.params.frame,colorBack:e=V.params.colorBack,colors:s=V.params.colors,bandCount:r=V.params.bandCount,twist:i=V.params.twist,softness:l=V.params.softness,noiseFrequency:f=V.params.noiseFrequency,noisePower:c=V.params.noisePower,fit:n=V.params.fit,rotation:d=V.params.rotation,scale:h=V.params.scale,originX:m=V.params.originX,originY:v=V.params.originY,offsetX:u=V.params.offsetX,offsetY:p=V.params.offsetY,worldWidth:B=V.params.worldWidth,worldHeight:b=V.params.worldHeight,...C}){const y={u_colorBack:x(e),u_colors:s.map(x),u_colorsCount:s.length,u_bandCount:r,u_twist:i,u_softness:l,u_noiseFrequency:f,u_noisePower:c,u_fit:T[n],u_scale:h,u_rotation:d,u_offsetX:u,u_offsetY:p,u_originX:m,u_originY:v,u_worldWidth:B,u_worldHeight:b};return R.jsx(D,{...C,speed:o,frame:a,fragmentShader:$o,uniforms:y})},K),Y={name:"Default",params:{...g,speed:1,frame:0,colorBack:"#252531",colorFront:"#b59f82",shape:"simplex",type:"4x4",pxSize:2}},st={name:"Warp",params:{...g,speed:1,frame:0,colorBack:"#2f6e83",colorFront:"#dceae8",shape:"warp",type:"4x4",pxSize:2}},it={name:"Sine Wave",params:{...g,speed:1,frame:0,colorBack:"#730d54",colorFront:"#00becc",shape:"wave",type:"4x4",pxSize:11}},nt={name:"Bugs",params:{...g,speed:1,frame:0,colorBack:"#000000",colorFront:"#008000",shape:"dots",type:"random",pxSize:9}},lt={name:"Ripple",params:{..._,speed:1,frame:0,colorBack:"#603520",colorFront:"#c67953",shape:"ripple",type:"2x2",pxSize:3}},ct={name:"Swirl",params:{..._,speed:1,frame:0,colorBack:"#000000",colorFront:"#89a7b8",shape:"swirl",type:"8x8",pxSize:2}},ft={name:"Sphere",params:{..._,speed:1,frame:0,colorBack:"#301c2a",colorFront:"#56ae6c",shape:"sphere",type:"4x4",pxSize:2.5}},oa=[Y,ft,it,st,lt,nt,ct],ea=w.memo(function({speed:o=Y.params.speed,frame:a=Y.params.frame,colorBack:e=Y.params.colorBack,colorFront:s=Y.params.colorFront,shape:r=Y.params.shape,type:i=Y.params.type,pxSize:l=Y.params.pxSize,fit:f=Y.params.fit,scale:c=Y.params.scale,rotation:n=Y.params.rotation,originX:d=Y.params.originX,originY:h=Y.params.originY,offsetX:m=Y.params.offsetX,offsetY:v=Y.params.offsetY,worldWidth:u=Y.params.worldWidth,worldHeight:p=Y.params.worldHeight,...B}){const b={u_colorBack:x(e),u_colorFront:x(s),u_shape:ee[r],u_type:te[i],u_pxSize:l,u_fit:T[f],u_scale:c,u_rotation:n,u_offsetX:m,u_offsetY:v,u_originX:d,u_originY:h,u_worldWidth:u,u_worldHeight:p};return R.jsx(D,{...B,speed:o,frame:a,fragmentShader:oe,uniforms:b})}),O={name:"Default",params:{...g,speed:1,frame:0,colorBack:"#000a0f",colors:["#c4730b","#bdad5f","#d8ccc7"],softness:.7,intensity:.15,noise:.5,shape:"wave"}},ut={name:"Dots",params:{...g,scale:.6,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f0000","#0080ff","#f2ebc9"],softness:.75,intensity:.15,noise:.7,shape:"dots"}},pt={name:"Truchet",params:{...g,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f2200","#eabb7c","#39b523"],softness:0,intensity:.2,noise:1,shape:"truchet"}},mt={name:"Corners",params:{..._,speed:1,frame:0,colorBack:"#031018",colors:["#00aeff","#00ffcc","#ffc800"],softness:.4,intensity:.35,noise:.35,shape:"corners"}},dt={name:"Ripple",params:{..._,scale:.5,speed:1,frame:0,colorBack:"#140a00",colors:["#6f2d00","#88ddae","#2c0b1d"],softness:.5,intensity:.5,noise:.5,shape:"ripple"}},ht={name:"Blob",params:{..._,scale:1.3,speed:1,frame:0,colorBack:"#0f0e18",colors:["#3e6172","#a49b74","#568c50"],softness:0,intensity:.15,noise:.5,shape:"blob"}},gt={name:"Moon",params:{..._,scale:.6,speed:1,frame:0,colorBack:"#000000",colors:["#000000","#28272d","#ffeccc"],softness:1,intensity:.56,noise:1,shape:"sphere"}},ta=[mt,O,ut,pt,dt,ht,gt],aa=w.memo(function({speed:o=O.params.speed,frame:a=O.params.frame,colorBack:e=O.params.colorBack,colors:s=O.params.colors,softness:r=O.params.softness,intensity:i=O.params.intensity,noise:l=O.params.noise,shape:f=O.params.shape,fit:c=O.params.fit,scale:n=O.params.scale,rotation:d=O.params.rotation,originX:h=O.params.originX,originY:m=O.params.originY,offsetX:v=O.params.offsetX,offsetY:u=O.params.offsetY,worldWidth:p=O.params.worldWidth,worldHeight:B=O.params.worldHeight,...b}){const C=typeof window<"u"&&{u_noiseTexture:ao()},y={u_colorBack:x(e),u_colors:s.map(x),u_colorsCount:s.length,u_softness:r,u_intensity:i,u_noise:l,u_shape:re[f],...C,u_fit:T[c],u_scale:n,u_rotation:d,u_offsetX:v,u_offsetY:u,u_originX:h,u_originY:m,u_worldWidth:p,u_worldHeight:B};return R.jsx(D,{...b,speed:o,frame:a,fragmentShader:ae,uniforms:y})}),z={name:"Default",params:{..._,speed:1,frame:0,colorBack:"#ffffff",colorTint:"#ffffff",softness:.3,repetition:3,shiftRed:.3,shiftBlue:.3,distortion:.3,contour:.88,shape:"metaballs"}},vt={name:"Full Screen",params:{..._,speed:1,frame:0,colorBack:"#111111",colorTint:"#ffffff",softness:.3,repetition:3,shiftRed:.3,shiftBlue:.3,distortion:.07,contour:0,shape:"none",worldWidth:0,worldHeight:0}},At={name:"Sphere",params:{..._,scale:.7,speed:2,frame:0,colorBack:"#ffffff",colorTint:"#d1e0ff",softness:.45,repetition:4,shiftRed:1,shiftBlue:.3,distortion:.1,contour:.4,shape:"circle"}},xt={name:"Drops",params:{..._,scale:2.2,speed:1,frame:0,colorBack:"#00042e",colorTint:"#5b4dc7",softness:.45,repetition:4,shiftRed:-.5,shiftBlue:-1,distortion:.1,contour:1,shape:"metaballs"}},ra=[z,At,xt,vt],sa=w.memo(function({colorBack:o=z.params.colorBack,colorTint:a=z.params.colorTint,speed:e=z.params.speed,frame:s=z.params.frame,softness:r=z.params.softness,repetition:i=z.params.repetition,shiftRed:l=z.params.shiftRed,shiftBlue:f=z.params.shiftBlue,distortion:c=z.params.distortion,contour:n=z.params.contour,shape:d=z.params.shape,fit:h=z.params.fit,scale:m=z.params.scale,rotation:v=z.params.rotation,originX:u=z.params.originX,originY:p=z.params.originY,offsetX:B=z.params.offsetX,offsetY:b=z.params.offsetY,worldWidth:C=z.params.worldWidth,worldHeight:y=z.params.worldHeight,...G}){const $={u_colorBack:x(o),u_colorTint:x(a),u_softness:r,u_repetition:i,u_shiftRed:l,u_shiftBlue:f,u_distortion:c,u_contour:n,u_shape:ie[d],u_fit:T[h],u_scale:m,u_rotation:v,u_offsetX:B,u_offsetY:b,u_originX:u,u_originY:p,u_worldWidth:C,u_worldHeight:y};return R.jsx(D,{...G,speed:e,frame:s,fragmentShader:se,uniforms:$})},K),S={name:"Default",params:{..._,scale:.85,speed:1,frame:0,colorBack:"#000000",colors:["#f2244f","#4da6e6"],roundness:.5,thickness:.02,softness:.5,intensity:2.4,spotsPerColor:4,spotSize:.15,pulse:0,smoke:1,smokeSize:1.3}},Bt={name:"Circle",params:{..._,worldWidth:200,worldHeight:200,scale:.5,speed:1,frame:0,colorBack:"#0f191f",colors:["#ffdd33","#ff8c00","#ff002b"],roundness:1,thickness:.03,softness:.2,intensity:2,spotsPerColor:4,spotSize:.15,pulse:0,smoke:0,smokeSize:1}},wt={name:"Inner Border",params:{..._,speed:1,frame:0,colorBack:"#181821",colors:["#2294d9","#79fac5","#e39e22"],roundness:0,thickness:.05,softness:1,intensity:2,spotsPerColor:3,spotSize:.15,pulse:.5,smoke:0,smokeSize:0}},ia=[S,Bt,wt],na=w.memo(function({speed:o=S.params.speed,frame:a=S.params.frame,colors:e=S.params.colors,colorBack:s=S.params.colorBack,roundness:r=S.params.roundness,thickness:i=S.params.thickness,softness:l=S.params.softness,intensity:f=S.params.intensity,spotsPerColor:c=S.params.spotsPerColor,spotSize:n=S.params.spotSize,pulse:d=S.params.pulse,smoke:h=S.params.smoke,smokeSize:m=S.params.smokeSize,fit:v=S.params.fit,rotation:u=S.params.rotation,scale:p=S.params.scale,originX:B=S.params.originX,originY:b=S.params.originY,offsetX:C=S.params.offsetX,offsetY:y=S.params.offsetY,worldWidth:G=S.params.worldWidth,worldHeight:$=S.params.worldHeight,...to}){const yo=typeof window<"u"&&{u_noiseTexture:ao(0)},So=typeof window<"u"&&{u_pulseTexture:ao(1)},ko={u_colorBack:x(s),u_colors:e.map(x),u_colorsCount:e.length,u_roundness:r,u_thickness:i,u_softness:l,u_intensity:f,u_spotsPerColor:c,u_spotSize:n,u_pulse:d,u_smoke:h,u_smokeSize:m,...So,...yo,u_fit:T[v],u_rotation:u,u_scale:p,u_offsetX:C,u_offsetY:y,u_originX:B,u_originY:b,u_worldWidth:G,u_worldHeight:$};return R.jsx(D,{...to,speed:o,frame:a,fragmentShader:ne,uniforms:ko})},K),P={name:"Default",params:{..._,speed:1,frame:0,colors:["#ff4000","#00ffd4","#5500ff","#eaff00","#aa00ff"],colorBack:"#080808",angle1:.1,angle2:.1,length:1,blur:.25,fadeIn:.85,fadeOut:.3,gradient:0,density:2}},la=[P],ca=w.memo(function({speed:o=P.params.speed,frame:a=P.params.frame,colors:e=P.params.colors,colorBack:s=P.params.colorBack,angle1:r=P.params.angle1,angle2:i=P.params.angle2,length:l=P.params.length,blur:f=P.params.blur,fadeIn:c=P.params.fadeIn,fadeOut:n=P.params.fadeOut,density:d=P.params.density,gradient:h=P.params.gradient,fit:m=P.params.fit,scale:v=P.params.scale,rotation:u=P.params.rotation,originX:p=P.params.originX,originY:B=P.params.originY,offsetX:b=P.params.offsetX,offsetY:C=P.params.offsetY,worldWidth:y=P.params.worldWidth,worldHeight:G=P.params.worldHeight,...$}){const to={u_colors:e.map(x),u_colorsCount:e.length,u_colorBack:x(s),u_angle1:r,u_angle2:i,u_length:l,u_blur:f,u_fadeIn:c,u_fadeOut:n,u_density:d,u_gradient:h,u_fit:T[m],u_scale:v,u_rotation:u,u_offsetX:b,u_offsetY:C,u_originX:p,u_originY:B,u_worldWidth:y,u_worldHeight:G};return R.jsx(D,{...$,speed:o,frame:a,fragmentShader:le,uniforms:to})},K);export{ca as ColorPanels,ea as Dithering,Dt as DotGrid,Qt as DotOrbit,qt as GodRays,aa as GrainGradient,sa as LiquidMetal,kt as MeshGradient,Tt as Metaballs,zt as NeuroNoise,Nt as PerlinNoise,na as PulsingBorder,D as ShaderMount,It as SimplexNoise,Pt as SmokeRing,Zt as Spiral,$t as Swirl,Xt as Voronoi,Lt as Warp,Ht as Waves,fo as colorPanelsMeta,la as colorPanelsPresets,oa as ditheringPresets,Rt as dotGridPresets,go as dotOrbitMeta,Et as dotOrbitPresets,x as getShaderColorFromString,Bo as godRaysMeta,Kt as godRaysPresets,_o as grainGradientMeta,ta as grainGradientPresets,yt as isPaperShaderElement,ra as liquidMetalPresets,ho as meshGradientMeta,St as meshGradientPresets,lo as metaballsMeta,Vt as metaballsPresets,Wt as neuroNoisePresets,Ot as perlinNoisePresets,co as pulsingBorderMeta,ia as pulsingBorderPresets,vo as simplexNoiseMeta,Ut as simplexNoisePresets,no as smokeRingMeta,Ft as smokeRingPresets,jt as spiralPresets,wo as swirlMeta,Jt as swirlPresets,Ao as voronoiMeta,Gt as voronoiPresets,xo as warpMeta,Yt as warpPresets,Mt as wavesPresets};
