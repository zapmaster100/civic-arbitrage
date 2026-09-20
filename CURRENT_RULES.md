# CURRENT RULES

## Civic Arbitrage — Playas de México v0.1

This file is the canonical rules source for the first playable prototype. Values below marked **v0.1** are intentionally tunable playtest constants.

## Goal and victory
Players are competing property developers in one shared city. Cash is hidden. The game ends immediately when Municipal #3 is built. Final wealth = hidden cash + current land value of every parcel still owned. Highest wealth wins.

## Player state and setup
- 4-player local prototype.
- 6 ownership tokens per player.
- Free snake draft of 2 starting parcels: A-B-C-D-D-C-B-A.
- After the draft, each player receives $5 hidden cash.
- Board coordinate system: 12 columns × 7 rows.
- The starting town is genuinely inland: Plaza Mayor is at least four parcel depths from the waterfront.
- Neutral starting town contains Plaza Mayor, two Low Residential and two Low Commercial buildings/zones, with a small connected starting road network.
- A separate neutral Low Residential beach house exists near the coast.
- Exact Map 001 coordinates/coastline are prototype data and may change without changing the rules.

## Turn structure
Each player takes exactly 2 actions. The same action may be repeated.

Actions:
1. **Acquire parcel** — place an available ownership token on any unowned purchasable parcel and pay its current land value to the bank. No adjacency restriction.
2. **Sell parcel** — receive its current land value, remove your ownership token, and return the parcel immediately to the open market. Zoning, buildings and infrastructure remain.
3. **Build Road** — pay $1 and add one road segment connected to the existing shared road network.
4. **Zone/Rezone** — make one Council application on a parcel you own.
5. **Take Building** — take one market building, paying skip costs; either legally construct it immediately or discard it. Taking and constructing are one action.

## Zoning
Uses: Residential, Commercial, Municipal. Greenfield has no use.
Density: Greenfield 0; Low 1; Medium 2; High 3.
Players may apply directly for any density. There is no mandatory Low→Medium→High ladder.

## Council
Council is generated from the four orthogonal neighbours. Each contributes 3 cubes, for 12 total.

Density comparison contributes 2:
- difference 0: YY
- difference 1: YN
- difference 2+: NN

Use comparison contributes 1:
- same type: Y
- different type: N
- Greenfield has no type and therefore never matches.

Ocean/river are Greenfield for Council.

Draw 7 of 12. 4+ Yes passes. Initial draw is free. After failure, redraw cost is based on proposed density: Low $1, Medium $2, High $3. **v0.1: redraws are unlimited while the player can pay.**

## Land value
Buildings never add resale value.

Land value = own zoning value + zoning values of all four orthogonal neighbours + applicable waterfront mirror value.

Zoning values: Greenfield 0, Low 1, Medium 2, High 3.

A waterfront edge marked ≋$ adds the parcel's own zoning value again for valuation only. Water remains Greenfield for Council.

**v0.1: multiple waterfront edges stack.** This is explicitly a playtest parameter.

## Roads and frontage
Roads lie on parcel edges and are shared public infrastructure.
- Build Road costs $1 and 1 action.
- New roads must connect to the existing road network.
- A road edge gives each adjacent parcel 1 frontage.
- An ocean/river edge gives its adjacent parcel 1 frontage.

Private frontage requirements:
- Low Residential: 2
- Low Commercial: 2
- Medium Residential: 2
- Medium Commercial: 3
- High Residential: 3
- High Commercial: 4

Municipal frontage: Low 2, Medium 3, High 4.

## Private buildings
All private buildings pay **$5 base development income** immediately when constructed, regardless of density, plus any money accumulated on the market card.

Required zoning must match the building use and be at least the building density.

Neighbour prerequisites use the surrounding 8 parcels:
- Low R / Low C: none
- Medium R needs built Low C
- Medium C needs built Low R
- High R needs built Medium C
- High C needs built Medium R

Redevelopment replaces the existing private building; the removed building enters the discard/recycle system. Players may skip density levels.

## Building market
Two rows of five cards/tiles plus one Municipal staging space.

To take a deeper card, put $1 on every card before it in that row. Take the selected card and collect all money already on it. Then either:
- construct it immediately if legal, receiving its $5 base payout; or
- discard it and keep the collected market money.

Discarding solely to harvest market money is legal.

**v0.1 market procedure:** after a card is removed, cards behind it slide toward position 1 and a replacement is drawn into position 5. Private discards and demolished buildings form a discard pile; when the private supply empties, shuffle/recycle the discard pile.

## Growth
Residential construction advances Population; Commercial construction advances Jobs.
- Low = 1 growth
- Medium = 2
- High = 3

Thresholds are **4 → 9 → 15**.

If one side crosses a threshold before the other, further construction of that leading type is frozen until the other side catches up. Overshoot is retained. When both sides have reached a threshold, the corresponding Municipal building unlocks immediately.

## Municipal buildings
Three ordered civic projects:
1. Mercado Municipal — Low Municipal, frontage 2
2. Ayuntamiento — Medium Municipal, frontage 3
3. Municipal #3 — High Municipal, frontage 4; building it ends the game immediately

Names are thematic only; Municipal #3's final name is not locked and it has no waterfront requirement.

Municipal zoning uses the normal Council rules with no exception or approval bonus. To build a Municipal project, a player must own a legal parcel with sufficient Municipal zoning/frontage and acquire the unlocked Municipal tile through the market procedure.

When a Municipal building is built, the city immediately purchases that parcel for its current land value. The player receives the money and recovers the ownership token. The Municipal zoning/building remains permanently in the city.

Municipal buildings have no special powers, no growth contribution and cannot be discarded.

**v0.1 staging rule:** an unlocked Municipal occupies the dedicated staging space. The next time either market row removes a card, that row collapses and the Municipal enters its position 5 instead of drawing a private replacement.

## Open items intentionally left for playtest
- Exact Map 001 parcel/coastline/starting-road coordinates.
- Private building supply mix/counts.
- Tie breaker.
- Final thematic name/art for Municipal #3.
- Whether unlimited redraws, stacking waterfront edges, thresholds and numeric economy survive testing.
- Edge case if another Municipal unlocks while one is still staged/in the market.

## Design guardrails
No direct player trading, attacks, lobbying or player votes. No public VP track. Do not add exceptions to fix hypothetical exploits before playtesting. The central interaction is externalities: other players' zoning, roads, buildings and civic development alter your opportunities and property values.
