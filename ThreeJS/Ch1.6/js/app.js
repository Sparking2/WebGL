// Just waiting for your beautiful creation

let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init()
{
    container = document.querySelector('#container');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();

    renderer.setAnimationLoop( () => {
        update();
        render();    
    });

}

function createCamera()
{
    camera = new THREE.PerspectiveCamera(
        35,                                             //FOV
        container.clientWidth / container.clientHeight, //aspect
        0.1,                                            // near clipping plane
        100,                                            //far clipping plane
    );
    camera.position.set(-5,5,7);
}

function createControls()
{
    controls = new THREE.OrbitControls(camera,container);
}

function createLights()
{
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff,   // bright sky color
        0x202020,   // dim ground color
        5,          // intensity
    );

    const mainLight = new THREE.DirectionalLight(0xffffff, 5);
    mainLight.position.set(10,10,10);

    scene.add(ambientLight,mainLight);
}

function createMaterials()
{
    const body = new THREE.MeshStandardMaterial({
        color: 0xff3333, // red
        flatShading: true,
    });

    // just as with textures, we need to put colors into linear color space
    body.color.convertSRGBToLinear();

    const detail = new THREE.MeshStandardMaterial({
        color: 0x333333, // darkgrey
        flatShading: true,
    });

    detail.color.convertSRGBToLinear();

    return{
        body,
        detail,
    };
}

function createGeometries()
{

}

function createMeshes()
{
    // create a Group to hold the pieces of the train
    const train = new THREE.Group();
    scene.add( train );

    const materials = createMaterials();
    const geometries = createGeometries();
}

function createRenderer()
{
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.clientWidth,container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);
}

function update()
{

}

function render()
{
    renderer.render(scene,camera);
}

function onWindowResize()
{
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
init();