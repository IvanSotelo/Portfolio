import * as THREE from 'three'
import GlObject from './GlObject'

const backgroundCoverUv = `
vec2 backgroundCoverUv(vec2 screenSize, vec2 imageSize, vec2 uv) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;

  vec2 newSize = screenRatio < imageRatio
      ? vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y)
      : vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x);

  vec2 newOffset = (screenRatio < imageRatio
      ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
      : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;

  return uv * screenSize / newSize + newOffset;
}
`

const vertexShader = `
precision mediump float;

uniform float uVelo;

varying vec2 vUv;

#define M_PI 3.1415926535897932384626433832795

void main(){
  vec3 pos = position;
  pos.x = pos.x + ((sin(uv.y * M_PI) * uVelo) * 0.125);

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}
`

const fragmentShader = `
precision mediump float;

${backgroundCoverUv}

uniform sampler2D uTexture;

uniform vec2 uMeshSize;
uniform vec2 uImageSize;

uniform float uVelo;
uniform float uScale;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec2 texCenter = vec2(0.5);
  vec2 texUv = backgroundCoverUv(uMeshSize, uImageSize, uv);
  vec2 texScale = (texUv - texCenter) * uScale + texCenter;
  vec4 texture = texture2D(uTexture, texScale);

  texScale.x += 0.15 * uVelo;
  if(uv.x < 1.) texture.g = texture2D(uTexture, texScale).g;

  texScale.x += 0.10 * uVelo;
  if(uv.x < 1.) texture.b = texture2D(uTexture, texScale).b;

  gl_FragColor = texture;
}
`

const planeGeo = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
const planeMat = new THREE.ShaderMaterial({
  transparent: true,
  fragmentShader,
  vertexShader
})

const loader = new THREE.TextureLoader()
loader.crossOrigin = 'anonymous'

export default class Plane extends GlObject {
  init (el) {
    super.init(el)

    this.geo = planeGeo
    this.mat = planeMat.clone()

    this.mat.uniforms = {
      uTime: { value: 0 },
      uTexture: { value: 0 },
      uMeshSize: { value: new THREE.Vector2(this.rect.width, this.rect.height) },
      uImageSize: { value: new THREE.Vector2(0, 0) },
      uScale: { value: 0.75 },
      uVelo: { value: 0 }
    }

    this.img = this.el.querySelector('img')
    this.texture = loader.load(this.img.src, (texture) => {
      texture.minFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      this.mat.uniforms.uTexture.value = texture
      this.mat.uniforms.uImageSize.value = [this.img.naturalWidth, this.img.naturalHeight]
    })

    this.mesh = new THREE.Mesh(this.geo, this.mat)
    this.mesh.scale.set(this.rect.width, this.rect.height, 1)
    this.add(this.mesh)
  }
}
