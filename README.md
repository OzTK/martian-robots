# Martian Robots

## Run it!

First install dependencies and build:

```
> npm install
> npm build
```

To run the Sample Input:

```
> npm start
```

Tests can also be run to check if the algorithm works:

```
> npm test
```

The input can be changed in index.ts by replacing the text 

## Problem's data

* R robots are sent to Mars (NO MAX)
* Mars is a grid of M location points (x, y) (MAX X: 50, MAX Y: 50)
* Mars is a flat planet (like Earth a few centuries ago) => grid is not circular
* Robots moving out of the grid => falls off => invisible wall preventing other robots to fall
* Robot = (x, y, orientation)
* Orientation = N | S | E | W
* Instruction = L | R | F
* Robots take turns to take a sequence of instructions (MAX: 100)

## Modeling Sample Input

### Mars

```
              N       
    ---------------------
    |   |   |   |   |   |
    ---------------------
  W |   |   |   |   |   | E
    ---------------------
    |   |   |   |   |   |
    ---------------------
              S
```

M = 15

### Robots

#### Initial positions and sequences

1. **R1 (1, 1, E)**: RFRFRFRF
2. **R2 (3, 2, N)**: FRRFLLFFRRFLL
3. **R3 (0, 3, W)**: LLFFFLFLFL

#### Landing!

```
              N       
    -------------------------
    | ← |   |   |   |   |   |
    -------------------------
    |   |   |   | ↑ |   |   | 
  W ------------------------- E
    |   | → |   |   |   |   |
    -------------------------
    |   |   |   |   |   |   |
    -------------------------
              S
```

#### R1 moving

```
              N       
    -------------------------
    | ← |   |   |   |   |   |
    -------------------------
    |   |   |   | ↑ |   |   | 
  W ------------------------- E
    |   | → |   |   |   |   |
    -------------------------
    |   |   |   |   |   |   |
    -------------------------
              S
```
Nice loop!


#### R2 moving

```
              N  LOST(R2)    
    -------------------------
    | ← |   |   |   |   |   |
    -------------------------
    |   |   |   |   |   |   | 
  W ------------------------- E
    |   | → |   |   |   |   |
    -------------------------
    |   |   |   |   |   |   |
    -------------------------
              S
```
Bye bye R2 (blip)


#### R3 moving

```
              N  LOST(R2)    
    -------------------------
    |   |   | ↓ |   |   |   |
    -------------------------
    |   |   |   |   |   |   | 
  W ------------------------- E
    |   | → |   |   |   |   |
    -------------------------
    |   |   |   |   |   |   |
    -------------------------
              S
```