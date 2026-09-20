# GAME FLOW

## Setup

1.  Place the selected map / Playas de México board.
2.  Establish the neutral starting town:
    -   Plaza Mayor;
    -   Low Residential north and south;
    -   Low Commercial east and west;
    -   starting road loop/extensions;
    -   separate Low beach house near the coast.
3.  Set Greenfield parcels and starting zoning/buildings.
4.  Prepare Residential and Commercial growth tracks and Municipal
    project sequence. **Exact counts/data OPEN.**
5.  Prepare the private building supply/bag and two market rows of five.
6.  Prepare the dedicated Municipal staging space.
7.  Give each player six ownership tokens.
8.  Randomize first player.
9.  Snake draft two unowned starting parcels for free.
10. Give every player **\$5 hidden cash**.
11. Begin with first player.

## Player turn

A player receives **2 actions**.

The action menu currently consists of: - acquire/sell property; -
Council zoning application; - take a market building and either
construct it or discard it; - extend roads.

The exact atomicity of some actions remains to be formalized for code.
In particular, confirm whether taking a building and constructing it are
always one action, and whether selling and acquiring can be combined.

## Council action

1.  Choose owned parcel and proposed zoning use/density.
2.  Examine four orthogonal neighbours.
3.  For each neighbour:
    -   add two Yes/No cubes from density difference;
    -   add one Yes/No cube from type match.
4.  Bag contains 12 cubes.
5.  Draw 7.
6.  4+ Yes → zoning changes immediately.
7.  Failure → applicant may stop or pay redraw cost based on proposed
    density.
8.  If redrawing, return/reconstruct as required and draw again. Exact
    hard cap **OPEN**.

## Market/build action

1.  Choose one of the two market rows.
2.  Select a card.
3.  Pay \$1 onto each earlier/skipped card in that row.
4.  Take selected card and collect all money already on it.
5.  Choose:
    -   **build** it if zoning/frontage/neighbour prerequisites are met;
        or
    -   **discard** it and keep the collected market money.
6.  If built:
    -   receive the universal base development payout (**prototype
        example \$5; exact value OPEN**);
    -   place/replace the building on the parcel;
    -   discard/recycle any demolished previous building;
    -   advance the appropriate Residential or Commercial growth
        requirement.
7.  Collapse/refill market row according to final implementation.
8.  Resolve any Municipal card movement/unlock triggered by growth.

## Growth resolution

When a building advances its Residential/Commercial requirement: 1.
Remove/advance the required number of cubes for its intensity according
to the growth model. 2. If insufficient cubes remain in the current
level, spill the remainder into the next level. 3. That development type
is then locked from further construction until the opposite type reaches
the same completed boundary. 4. When both types complete the level,
immediately unlock the next Municipal building. 5. Put it into the
dedicated Municipal staging space. 6. Municipal cannot be discarded. 7.
When its market-entry condition occurs, move it to position #5 of the
appropriate row. **Exact row rule OPEN.**

## Road action

Extend shared road infrastructure according to map/legal placement
rules. Roads create frontage for construction. Exact cost and placement
range are **OPEN**.

## Sell / liquidation action

When a player sells: 1. Calculate current zoning-based parcel value: -
own zoning; - four orthogonal neighbours; - applicable waterfront mirror
value. 2. Receive that value in hidden cash. 3. Release/recover
ownership token. 4. Existing zoning/building is expected to remain in
the city as neutral development based on prior simulations; this should
be explicitly confirmed in implementation rules.

This persistence is important because sold development continues to
affect Council, values, and prerequisites.

## Endgame

When the **last Municipal building is built**, the game ends
immediately.

Then: 1. reveal/total hidden cash; 2. calculate liquidation value of all
remaining owned parcels; 3. add those values to cash; 4. highest wealth
wins.

Tie breaker **OPEN**.

## Expected strategic rhythms

Possible valid patterns: - **Land speculator:** acquire → zone → wait
for others → sell. - **Fast developer:** obtain a lucrative zoning level
→ build once → sell/redeploy. - **Incremental developer:** Low build →
later Medium → later High, collecting a base payout at each completed
project. - **Market opportunist:** harvest subsidized cards, sometimes
discarding them. - **Civic/endgame player:** position around growth
thresholds and Municipal projects. - **Waterfront speculator:** use the
value-mirror rule but accept politically Greenfield surroundings and
token lock-up risk.

No one pattern is intended to be mandatory.
