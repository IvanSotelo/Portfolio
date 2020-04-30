import * as THREE from 'three'
import EffectComposer, {
  RenderPass,
  ShaderPass
} from '@johh/three-effectcomposer'

const store = {
  ww: window.innerWidth,
  wh: window.innerHeight,
  isDevice: navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
}

var uMouse = new THREE.Vector2(0, 0)

document.addEventListener('mousemove', (e) => {
  e.preventDefault()
  // mousemove / touchmove
  // uMouse.x = (e.clientX / window.innerWidth)
  // uMouse.y = 1.0 - (e.clientY / window.innerHeight)
})

export default class Gl {
  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.OrthographicCamera(
      store.ww / -2,
      store.ww / 2,
      store.wh / 2,
      store.wh / -2,
      1,
      10
    )
    // this.camera = new THREE.PerspectiveCamera(70, store.ww / store.wh, 0.1, 10)
    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 1

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setPixelRatio(1.5)
    this.renderer.setSize(store.ww, store.wh)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setClearColor(0xffffff, 0)

    this.init()

    // post processing
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    var myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        resolution: { value: new THREE.Vector2(1.0, window.innerHeight / window.innerWidth) },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uVelo: { value: 0 }
      },
      vertexShader: 'varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}',
      fragmentShader: `uniform float time;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        uniform vec2 uMouse;
        float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=resolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }
        void main()  {
            vec2 newUV = vUv;
            float c = circle(vUv, uMouse, 0.0, 0.2);
            float r = texture2D(tDiffuse, newUV.xy += c * (0.04 * .5)).x;
            float g = texture2D(tDiffuse, newUV.xy += c * (0.04 * .525)).y;
            float b = texture2D(tDiffuse, newUV.xy += c * (0.04 * .55)).z;
            vec4 color = vec4(r, g, b, 1.);
            gl_FragColor = color;
        }`
    }

    this.customPass = new ShaderPass(myEffect)
    this.customPass.renderToScreen = true
    this.composer.addPass(this.customPass)
  }

  render () {
    // this.renderer.render(this.scene, this.camera)
    this.customPass.uniforms.uMouse.value = uMouse
    this.composer.render()
  }

  init () {
    const div = document.querySelector('.site-footer')
    const domEl = this.renderer.domElement
    domEl.classList.add('dom-gl')
    div.appendChild(domEl)
  }
}
