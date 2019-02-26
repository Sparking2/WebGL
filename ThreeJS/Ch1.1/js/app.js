// Just waiting for your beautiful creation

const container = document.querySelector('#container');

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.set(0, 0, 10);

const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({color: 0x800080});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff,5.0);
light.position.set(0,3,3);
scene.add(light);

renderer = new THREE.WebGLRenderer({antialias: true});

//const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

function animate()
{
    requestAnimationFrame(animate);

    mesh.rotation.z += 0.01;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene,camera);
}

animate();