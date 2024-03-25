import * as THREE from 'https://github.com/Thaisalessandra/portfolio/blob/main/node_modules/three/build/three.module.js';

const img ='./Assets/imagembg.jpg';
const img2 = './Assets/imgBG.jpg';
// Setup
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
const container = document.querySelector('#bg-3d');
const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera
(75, window.innerWidth / window.innerHeight, 0.1, 1000);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  
  Array(200).fill().forEach(addStar);
  renderer.setSize(window.innerWidth,window.innerHeight);
  // Background
  
  const  backgroundImg = new THREE.TextureLoader().load(img2);
  scene.background = backgroundImg;
  




const geometry = new THREE.PlaneGeometry(25,10,25,10);
const texture = loader.load( img2 );


const material = new THREE.MeshBasicMaterial( {
    map: texture,
    
} );

const mesh = new THREE.Mesh(geometry,material); 
scene.add(mesh);

camera.position.y=-0;
camera.position.z=5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();
function animate(){
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        const anim1 = 0.25*Math.sin(x+time*0.7);
        geometry.attributes.position.setZ(i,anim1);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
        
    }
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    renderer.setSize(window.innerWidth,window.innerHeight);
}
animate();
