const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall'
];

/* The graph of all the routes in the town will be represented as a an object with keys for each starting point and values in the form of arrays holding all locations you can get to from the starting point */

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    // If there's no edge, create an array and add the first location to it
    if (graph[from] == null) graph[from] = [to];
    // else just add to the existing array
    else graph[from].push(to);
  }

  // Split each edge into an array of from and to
  // Use [from, to] to deconstruct the array into vars
  // Store edges from both directions
  for (let [from, to] of edges.map(edge => edge.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    // the robot’s current location and the collection of undelivered parcels
    this.place = place;
    this.parcels = parcels;
    // each of the parcels has a current location and a destination address
    // parcel = [place, address]
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    }

    let parcels = this.parcels
      .map(parcel => {
        // the parcels that are not at the current place stay where they are
        if (parcel.place != this.place) return parcel;

        /* the parcels that are at the current place but need to be delivered to somehwere else get their current location update to the destination */
        return { place: destination, address: parcel.address };
      })
      .filter(parcel => parcel.place != parcel.address);
    // filtering delivers the packages after the moving to the new location

    return new VillageState(destination, parcels);
  }
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];

  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;

    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);

    parcels.push({ place, address });
  }

  return new VillageState('Post Office', parcels);
};

// let first = new VillageState('Post Office', [
//   {
//     place: 'Post Office',
//     address: "Alice's House"
//   }
// ]);

// let next = first.move("Alice's House");

// console.log(next.place);
// // → Alice's House
// console.log(next.parcels);
// // → []
// console.log(first.place);
// // → Post Office

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    //console.log(`Moved to ${action.direction}`);
  }
}

// random Robot start
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// a robot that picks a random direction to go into
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}
// random Robot end

// fixed route Robot start
const mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office'
];

/* a robot that will follow the mailRoute which at worst will take 2 * 13 turns to complete */
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }

  return { direction: memory[0], memory: memory.slice(1) };
}
// fixed route Robot end

// goal oriented Robot start
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];

    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];

    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
// goal oriented Robot end

function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false
        };
      }
    });

    // This determines the precedence a route gets when choosing
    // Route length counts negatively, routes that pick up a package
    // get a small bonus

    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }
  return { direction: route[0], memory: route.slice(1) };
}

runRobot(VillageState.random(), lazyRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
  let results = {
    robot1: 0,
    robot2: 0
  };

  for (let i = 0; i < 100; i++) {
    let task = VillageState.random();
    results['robot1'] += runRobot(task, routeRobot, memory1);
    results['robot2'] += runRobot(task, goalOrientedRobot, memory2);
  }

  let robot1Avg = Math.floor(results['robot1'] / 100);
  let robot2Avg = Math.floor(results['robot2'] / 100);

  console.log(`Robot1: ${robot1Avg}    Robot2: ${robot2Avg}`);
}

//compareRobots(goalOrientedRobot, [], roboRobot, []);
