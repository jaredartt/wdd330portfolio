var cube = {
    
    faces: "RUFLDB",
    states: [],

    edges: {
        R: [28, 27, 26, 16, 23, 22, 4, 3, 2, 44, 43, 42],
        U: [18, 17, 16, 34, 33, 32, 42, 41, 40, 10, 9, 8],
        F: [30, 29, 28, 32, 39, 38, 2, 1, 0, 12, 11, 10],
        L: [24, 31, 30, 40, 47, 46, 0, 7, 6, 20, 19, 18],
        D: [46, 45, 44, 38, 37, 36, 22, 21, 20, 14, 13, 12],
        B: [26, 25, 24, 8, 15, 14, 6, 5, 4, 36, 35, 34]
    },

    reset: function () {
        cube.states = ["aaaaaaaabbbbbbbbccccccccddddddddeeeeeeeeffffffff"];
        
    },

    twist: function (state, move) {
        var i, k, previousState, face = move.charAt(0), faceIndex = cube.faces.indexOf(move.charAt(0)),
            turns = move.length > 1 ? (move.charAt(1) === "2" ? 2 : 3) : 1;
        state = state.split("");
        
        for (i = 0; i < turns; i++) {
            previousState = state.slice(0);
            for (k = 0; k < 8; k++) { state[(faceIndex * 8) + k] = previousState[(faceIndex * 8) + ((k + 6) % 8)]; }
            for (k = 0; k < 12; k++) { state[cube.edges[face][k]] = previousState[cube.edges[face][(k + 9) % 12]]; }
        }

        return state.join("");
    },

    // Scramble
    scramble: function () {
        var total = 25, count = 0, state, previousState = cube.states[cube.states.length - 1],
            move, moves = [], modifiers = ["", "'", "2"];

        while (count < total) {
            move = cube.faces[Math.floor(Math.random() * 6)] + modifiers[Math.floor(Math.random() * 3)];
            if (count > 0 && move.charAt(0) === moves[count - 1].charAt(0)) { continue; }
            if (count > 1 && move.charAt(0) === moves[count - 2].charAt(0) &&
                    moves[count - 1].charAt(0) === cube.faces.charAt((cube.faces.indexOf(move.charAt(0)) + 3) % 6)) {
                continue;
            }

            state = cube.twist(previousState, move);

            if (cube.states.indexOf(state) === -1) {
                moves[count] = move;
                cube.states[count] = state;
                count++;
                previousState = state;

            }
        }
        return moves;
    }
};

window.addEventListener("load", function () {
    function showScramble() {

        cube.reset();
        var i, scramble = cube.scramble(), len = scramble.length, result = "";

        for (i = 0; i < len; i += 5) {
            result += scramble.slice(i, i + 5).join("&nbsp;") + " ";
            
        }
        document.getElementById("scramble").innerHTML = result;
    }

    showScramble();

    document.getElementById("scramble-btn").addEventListener("click", showScramble);
});