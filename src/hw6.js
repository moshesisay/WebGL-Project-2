// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// This defines the initial distance of the camera, you may ignore this as the camera is expected to be dynamic
camera.applyMatrix4(new THREE.Matrix4().makeTranslation(-5, 3, 110));
camera.lookAt(0, -4, 1)


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// helper function for later on
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


// Here we load the cubemap and pitch images, you may change it

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'src/pitch/right.jpg',
  'src/pitch/left.jpg',
  'src/pitch/top.jpg',
  'src/pitch/bottom.jpg',
  'src/pitch/front.jpg',
  'src/pitch/back.jpg',
]);
scene.background = texture;





// TODO: Texture Loading
// We usually do the texture loading before we start everything else, as it might take processing time
const ballTexture = new THREE.TextureLoader().load("src/textures/soccer_ball.jpg");
const redCardTexture = new THREE.TextureLoader().load("src/textures/red_card.jpg");
const yellowCardTexture = new THREE.TextureLoader().load("src/textures/yellow_card.jpg");

// TODO: Add Lighting
//2 Directional Lights above the start and the end of the routes.
const directionalLightstart = new THREE.DirectionalLight( 0xffffff, 1.4 );
directionalLightstart.position.set(0,0,100)
scene.add(directionalLightstart)

const directionalLightend = new THREE.DirectionalLight( 0xffffff, 1.4 );
directionalLightend.position.set(0,0,0)
scene.add(directionalLightend)
//Ambient Light
const ambientLighting = new THREE.AmbientLight( 0x404040, 1.5 ); 
scene.add(ambientLighting);



// TODO: Goal
// You should copy-paste the goal from the previous exercise here
/**
 * 	******************************************    Goal CREATION PART   ****************************
 */

// Add here the rendering of your goal
const goal = new THREE.Group();
const skeleton = new THREE.Group();

//create Skeleton
let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
let height = 9;
let radialSegments = 32;


//Crossbar
const crossbarGeometry = new THREE.CylinderGeometry(1, 1, 21, radialSegments);
const crossbar = new THREE.Mesh(crossbarGeometry, material);
const crossbarMatrix = new THREE.Matrix4()
crossbarMatrix.set( 0, -1, 0, 0,
					0, 0, -1, 9, 
					1, 0, 0, 0,
					0,0,0,1 );
crossbar.applyMatrix4(crossbarMatrix)
skeleton.add(crossbar)

//post Right
const posts1Geometry = new THREE.CylinderGeometry(1, 1, height, radialSegments);
const posts1 = new THREE.Mesh(posts1Geometry, material);
const translationMatrix1 = new THREE.Matrix4().makeTranslation(10,4.5, 0);
posts1.applyMatrix4(translationMatrix1);
skeleton.add(posts1);

//Rings To posts Right
const ringPostGeometryRight = new THREE.TorusGeometry(1, 1, 16, 50)
const ringPostRight = new THREE.Mesh(ringPostGeometryRight,material);
const ringPostRightMatrix = new THREE.Matrix4()
ringPostRightMatrix.set( 1, 0, 0, 10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0,
						0,0,0,1 );
ringPostRight.applyMatrix4(ringPostRightMatrix)
skeleton.add(ringPostRight)


//post Left
const posts2Geometry = new THREE.CylinderGeometry(1, 1, height, radialSegments);
const posts2 = new THREE.Mesh(posts2Geometry, material);
const translationMatrix2 = new THREE.Matrix4().makeTranslation(-10, 4.5, 0);
posts2.applyMatrix4(translationMatrix2);
skeleton.add(posts2);

//Rings To posts Left
const ringPostGeometryLeft = new THREE.TorusGeometry(1, 1, 16, 50)
const ringPostLeft = new THREE.Mesh(ringPostGeometryLeft,material);
const ringPostLeftMatrix = new THREE.Matrix4()
ringPostLeftMatrix.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0,
						0,0,0,1 );
ringPostLeft.applyMatrix4(ringPostLeftMatrix)
skeleton.add(ringPostLeft)


//Back supports Right
const backSupportsGeometryR = new THREE.CylinderGeometry(1, 1, 14, radialSegments);
const backSupportsR = new THREE.Mesh(backSupportsGeometryR, material);
const backSupportsMatrixR = new THREE.Matrix4()
backSupportsMatrixR.set( 1, 0, 0, 10,
						0, Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 4.5, 
						0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)*9,
						0,0,0,1 );
backSupportsR.applyMatrix4(backSupportsMatrixR);
skeleton.add(backSupportsR);

//Rings To Back supports Right
const ringbackSupportsGeometryR = new THREE.TorusGeometry(1, 1, 16, 50)
const ringbackSupportsR = new THREE.Mesh(ringbackSupportsGeometryR, material);
const ringbackSupportsMatrixR = new THREE.Matrix4()
ringbackSupportsMatrixR.set( 1, 0, 0, 10,
							0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
							0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), -11,
							0,0,0,1 );
ringbackSupportsR.applyMatrix4(ringbackSupportsMatrixR);
skeleton.add(ringbackSupportsR);


//Back supports Left
const backSupportsGeometryL = new THREE.CylinderGeometry(1, 1, 14, radialSegments);
const backSupportsL = new THREE.Mesh(backSupportsGeometryL, material);
const backSupportsMatrixL = new THREE.Matrix4()
backSupportsMatrixL.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 4.5, 
						0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)*9,
						0,0,0,1 );
backSupportsL.applyMatrix4(backSupportsMatrixL);
skeleton.add(backSupportsL);

//Rings To Back supports Left
const ringbackSupportsGeometryL = new THREE.TorusGeometry(1, 1, 16, 50)
const ringbackSupportsL = new THREE.Mesh(ringbackSupportsGeometryL, material);
const ringbackSupportsMatrixL = new THREE.Matrix4()
ringbackSupportsMatrixL.set( 1, 0, 0, -10,
						0, Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0, 
						0, Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), -11,
						0,0,0,1 );
ringbackSupportsL.applyMatrix4(ringbackSupportsMatrixL);
skeleton.add(ringbackSupportsL);


//Nets Goal Right
// Define the vertices of the triangle
const verticesR = [
	new THREE.Vector3(10, 0, 0),  // Vertex 1 
	new THREE.Vector3(10, 0, -11),  // Vertex 2 
	new THREE.Vector3(10, 9, 0)   // Vertex 3
  ];
  
  // Create a new BufferGeometry
  const geometry1 = new THREE.BufferGeometry();
  
  // Set the vertices of the triangle
  const positions = [];
  verticesR.forEach(vertex => {
	positions.push(vertex.x, vertex.y, vertex.z);
  });
  geometry1.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
  // Create a material for the triangle
  const material1 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });

  
  // Create a mesh using the geometry and material
  const netRight = new THREE.Mesh(geometry1, material1);
  
  // Add the triangle to the scene
  scene.add(netRight);
  


//Nets Goal Left
// Define the vertices of the triangle
const verticesL = [
	new THREE.Vector3(-10, 0, 0),  // Vertex 1 
	new THREE.Vector3(-10, 0, -11),  // Vertex 2 
	new THREE.Vector3(-10, 9, 0)   // Vertex 3
  ];
  
  // Create a new BufferGeometry
  const geometry2 = new THREE.BufferGeometry();
  
  // Set the vertices of the triangle
  const positions2 = [];
  verticesL.forEach(vertex => {
	positions2.push(vertex.x, vertex.y, vertex.z);
  });
  geometry2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3));
  
  // Create a material for the triangle
  const material2 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide });

  
  // Create a mesh using the geometry and material
  const netLeft = new THREE.Mesh(geometry2, material2);
  
  // Add the triangle to the scene
  scene.add(netLeft);
  

//Nets Goal Back1
// Define the vertices of the plane
const verticesFront1 = [
	new THREE.Vector3(-10, 0, -11),     // Vertex 1
	new THREE.Vector3(10, 0, -11),   // Vertex 2
	new THREE.Vector3(-10, 9,0),   // Vertex 3
  ];

  // Create a new BufferGeometry
const geometry3 = new THREE.BufferGeometry();

// Set the vertices of the plane
const positions3 = [];
verticesFront1.forEach(vertex => {
  positions3.push(vertex.x, vertex.y, vertex.z);
});
geometry3.setAttribute('position', new THREE.Float32BufferAttribute(positions3, 3));

// Create a material for the plane
const material3 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });

// Create a mesh using the geometry and material
const netFront1 = new THREE.Mesh(geometry3, material3);

// Add the triangle to the scene
scene.add(netFront1);


 
//Nets Goal Back2
// Define the vertices of the plane
const verticesFront2 = [
	new THREE.Vector3(10, 9, 0),     // Vertex 1
	new THREE.Vector3(-10, 9, 0),   // Vertex 2
	new THREE.Vector3(10, 0,-11),   // Vertex 3
  ];

  // Create a new BufferGeometry
const geometry4 = new THREE.BufferGeometry();

// Set the vertices of the plane
const positions4 = [];
verticesFront2.forEach(vertex => {
  positions4.push(vertex.x, vertex.y, vertex.z);
});
geometry4.setAttribute('position', new THREE.Float32BufferAttribute(positions4, 3));

// Create a material for the plane
const material4 = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });

// Create a mesh using the geometry and material
const netFront2 = new THREE.Mesh(geometry4, material4);

// Add the triangle to the scene
scene.add(netFront2);




/**
 * ******************************     Goal IS DONE!!!!! ***********************************
 */
goal.add(skeleton)
scene.add(goal)


// TODO: Ball
// You should add the ball with the soccer.jpg texture here
/* ******************************    Ball CREATION PART!!!!! ***********************************
*/
const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const ballMaterial = new THREE.MeshBasicMaterial({map:ballTexture})  
const ball = new THREE.Mesh( geometry, ballMaterial ); 
const ballMatrix = new THREE.Matrix4().makeTranslation(0,0,100)
ball.applyMatrix4(ballMatrix)
scene.add( ball );

/**
* ******************************    Ball CREATION DONE!!!!! ***********************************
*/

// TODO: Bezier Curves
//controll points
let [R,C,L] = [[50, 0, 50], [0, 50, 50], [-50, 0, 50]].map(elem => {return new THREE.Vector3(...elem)}) //Right Winger,Center Forward,Left Winger are middle points for 3 curves
let startControllB = ball.getWorldPosition()
let endControllB = goal.getWorldPosition().clone() //cloning in order to not change Goal position obj
endControllB = endControllB.sub(endControllB.clone().normalize().multiplyScalar(1*0.8)) 

//create the curve:
// remember to delete the lines themselves!!! they are not needed for the curves to work
const curveBuilder = (middlePoints) => {
	let curvesList = []
	middlePoints.forEach(point => {
		const curve = new THREE.QuadraticBezierCurve3(startControllB, point, endControllB)
		const points = curve.getPoints( 50 );
		const geometry = new THREE.BufferGeometry().setFromPoints( points );
		const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
		
		// Create the final object to add to the scene
		const curveObject = new THREE.Line( geometry, material );
		//scene.add(curveObject) 		 // <- unmark here in order to see the curves
		curvesList.push(curve)
	})
	return curvesList
}
let curveList = curveBuilder([R,C,L])
 


 
// TODO: Camera Settings
// Set the camera following the ball here
camera.applyMatrix4(new THREE.Matrix4().makeTranslation(-5, 35, -10));
camera.lookAt(0, 0, 0)



// TODO: Add collectible cards with textures
const number_of_cards = 7;

function get_ts(t_coun){
    let ts = []
    for(var i = 0; i < t_coun; i++){
        ts.push(Math.random());
    }
    return ts
}

function get_texture(){
    const textures = [redCardTexture, yellowCardTexture];
    return textures[Math.floor(Math.random() * textures.length)];
}

function create_card_with_texture(){
    const geo = new THREE.PlaneGeometry(5, 5, 32);
    const mat = new THREE.MeshPhongMaterial( {map: get_texture()} );
    const card = new THREE.Mesh(geo, mat);
    return card
}

function create_cards_on_random_curve(curve){
    var card_ts = get_ts(number_of_cards);
    for(var i=0; i < number_of_cards; i++){
        let card = create_card_with_texture();
        let point = curve.getPoint(card_ts[i]);
        card.applyMatrix4(new THREE.Matrix4().makeTranslation(point.x, point.y, point.z));
        card_ts.push({card: card, t: card_ts[i]});
    }
    return card_ts;
}

function create_all_cards(curves){
    let curves_ts_cards = []
    for(var i=0; i< curves.length; i++){
        let cards_ts = create_cards_on_random_curve(curves[i])
        for (var j=0; j< cards_ts.length; j++){
            scene.add(cards_ts[j].card)
        }
        curves_ts_cards.push(cards_ts);
    }
    return curves_ts_cards;
}
const curves_cards_ts = create_all_cards(curveList);






// TODO: Add keyboard event
// We wrote some of the function for you
const handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
        current_curve_index = current_curve_index == 0 ? 2 : current_curve_index - 1;
	} else if (e.code == 'ArrowRight'){
		current_curve_index = current_curve_index == 2 ? 0 : current_curve_index + 1;
	}
}
document.addEventListener('keydown', handle_keydown);



var previous_t = 0;
var rate = 1000;
var current_curve_index = 0;
function move_ball_to_goal(){
    let current_position = ball.position;
    let t = (previous_t + (1 / rate));
    let next_position = curveList[current_curve_index].getPoint(t);
    previous_t = t;

    let new_x = next_position.x - current_position.x;
    let new_y = next_position.y - current_position.y;
    let new_z = next_position.z - current_position.z;
    ball.applyMatrix4(new THREE.Matrix4().makeTranslation(new_x, new_y, new_z));
    camera.applyMatrix4(new THREE.Matrix4().makeTranslation(0,
                                                            0,
                                                             new_z));
    camera.lookAt(0, 0, next_position.z);
    
    if (t > 1){
        window.alert("score");
        t = 0;
    }

}

function collision() {
    let cards_ts = curves_cards_ts[current_curve_index];
    for(var i=0; i< cards_ts.length; i++){
        console.log(cards_ts[i].t, previous_t)
        if (cards_ts[i].t == previous_t){
            console.log("collision");
        }
    }

}


const makeBallRotate = () => {
	let backCoordinates = ball.getWorldPosition().toArray()
	ball.applyMatrix4(new THREE.Matrix4().makeTranslation(...ball.getWorldPosition().clone().multiplyScalar(-1).toArray()))
	ball.applyMatrix4(new THREE.Matrix4().makeRotationY(0.01))
	ball.applyMatrix4(new THREE.Matrix4().makeTranslation(...backCoordinates))
	

}


function animate() {

	requestAnimationFrame( animate );

	// TODO: Animation for the ball's position

	makeBallRotate();

	// TODO: Test for card-ball collision
	move_ball_to_goal();
	collision();
	
	renderer.render( scene, camera );

}
animate()