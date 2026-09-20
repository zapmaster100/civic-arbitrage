# COMPONENTS AND DATA — v0.1

## Global configuration
Keep playtest constants centralized rather than hard-coded through UI logic.

- mapWidth: 12
- mapHeight: 7
- actionsPerTurn: 2
- ownershipTokensPerPlayer: 6
- startingCash: 5
- roadCost: 1
- privateBuildPayout: 5
- councilDraw: 7
- councilPassYes: 4
- councilRedrawCost: {low:1, medium:2, high:3}
- growthByDensity: {low:1, medium:2, high:3}
- growthThresholds: [4,9,15]
- frontage:
  - residential: {low:2, medium:2, high:3}
  - commercial: {low:2, medium:3, high:4}
  - municipal: {low:2, medium:3, high:4}

## Parcel state
Each parcel needs ID, row/column, orthogonal and diagonal neighbours, owner, zoning use/density, building, road edges, waterfront edges, starting/neutral flags, purchasability and calculated land value.

## Player state
ID/name/color, hidden cash, six-token supply, owned parcels, turn order and public transaction log. No lobbying/influence resource.

## Zoning
Uses: Greenfield, Residential, Commercial, Municipal. Densities 0/1/2/3. Residential uses yellow-orange, Commercial blue-green, Municipal red-violet. Red/green remain available for Council No/Yes.

## Council
Exactly 12 generated Yes/No cubes per application from four orthogonal neighbours. Draw 7; 4+ Yes passes. Redraw costs 1/2/3. v0.1 unlimited paid redraws.

## Private building definitions
Six mechanical classes: Low/Medium/High Residential and Low/Medium/High Commercial. All pay $5 on construction.

Prerequisites:
- LR: none
- LC: none
- MR: built LC within 8 surrounding parcels
- MC: built LR within 8
- HR: built MC within 8
- HC: built MR within 8

Growth equals density 1/2/3. Frontage comes from the global configuration.

## Market
Two arrays of five cards plus Municipal staging slot. Each card runtime state includes accumulated subsidy. Selecting position n costs $1 onto positions 1..n-1. Removed card collapses row. Refill position 5 from staged Municipal if present, otherwise private supply. Private discard pile recycles when supply empties.

## Roads
Roads are shared edge segments. Cost $1. New segment must connect to road network. Each road edge contributes one frontage to each adjacent parcel. Waterfront edge contributes one frontage to its parcel.

## Waterfront
Ocean/river edge has ≋$ flag. For valuation it mirrors that parcel's own zoning value. For Council it is Greenfield. v0.1 multiple waterfront edges stack.

## Growth
Population and Jobs numeric progress with paired thresholds [4,9,15], leading-side construction lock, and overshoot retention.

## Municipals
Ordered sequence:
1. Mercado Municipal — density 1, frontage 2
2. Ayuntamiento — density 2, frontage 3
3. Municipal #3 — density 3, frontage 4, finalProject true

No special powers or growth. Cannot discard. On construction city buys parcel at current land value and returns owner token.

## Map 001
12×7 rectangular coordinate system. Plaza Mayor/start town must be at least four parcel depths from waterfront. Exact irregular coastline, starting roads and neutral coordinates are prototype map data still to be authored.

## Supply
Private supply count/ratio remains a playtest variable. The earlier candidate 50-card 60/40 Residential/Commercial mix may be used only if explicitly selected for implementation.
