# CURRENT RULES

## Civic Arbitrage --- current design state

This file gives precedence to the **latest decisions** in the design
conversation. Where a value or procedure is not fully resolved, it is
marked **OPEN** rather than invented.

## 1. Goal and victory

Players are competing property developers in one shared city.

Players create wealth through: - acquiring/holding land; - obtaining
zoning approvals; - benefiting from neighbouring zoning; - constructing
buildings for immediate development income; - collecting market
subsidies; - selling parcels to realize their zoning-based land value.

**Cash is hidden.**

The game ends **immediately when the final Municipal building is
built**.

Final wealth is intended to be **hidden cash plus the liquidation value
of remaining properties**. Property value is zoning/land value; building
payouts are received when buildings are constructed rather than being
stored as a printed building value. Exact final liquidation procedure
should be confirmed in playtest implementation.

## 2. Player state

Current known player state: - **6 ownership tokens** per player. - **\$5
starting cash**, hidden. - Two starting parcels are received through a
**free snake draft**; players do not pay for them.

For four players with order A/B/C/D: `A → B → C → D → D → C → B → A`

After the draft, give each player \$5 and begin.

## 3. Starting city

Current discussed starting layout: - **Plaza Mayor** in the starting
town. - Low Residential immediately **north and south**. - Low
Commercial immediately **east and west**. - Road runs around the
starting market/plaza block, with roads extending outward along the
cardinal directions so the starting area can satisfy frontage. - A
separate/lonely **Low Residential beach house** exists near the coast. -
Exact map geometry, distances, and full parcel grid are **OPEN**.

The starting neutral buildings/zoning remain part of the city and affect
valuation, Council, and prerequisites.

## 4. Turn structure

Each player gets **2 actions on their turn**.

Established action families include: - acquire / sell property; - submit
a zoning application to Council; - take a building from the market and
build or discard it; - extend roads.

Whether acquire and sell are one combined action category or separate
actions in all cases is **not fully formalized**.

## 5. Zoning

Uses: - **Residential** --- yellow-orange family. - **Commercial** ---
blue-green family. - **Municipal** --- red-violet family. - **Greenfield
/ ocean / river** --- no zoning.

Density/intensity: - Greenfield = **0** - Low = **1 circle** - Medium =
**2 circles** - High = **3 circles**

A zoning tile is larger than the building tile. The building overlays
the left/top/bottom of the zoning tile while leaving the right-side
zoning information visible.

Current visual language: - zoning use icon at bottom right; - 1/2/3
white circles indicate Low/Medium/High; - no circle =
Greenfield/ocean; - buildings use their facade/height to show density; -
zoning remains visible underneath buildings.

**Players may apply directly for Medium or High zoning if Council can
approve it.** There is no rule requiring Low or Medium buildings to be
constructed first.

## 6. Council

Council approval is determined by the **four orthogonal neighbouring
parcels** around the proposed parcel.

Each neighbour contributes **3 cubes**, creating a 12-cube Yes/No bag.

There are **no neutral cubes**.

### Density comparison --- 2 cubes

Compare proposed zoning density to the neighbour's zoning density: -
difference 0 → **2 Yes** - difference 1 → **1 Yes + 1 No** - difference
2 or more → **2 No**

### Use comparison --- 1 cube

Compare zoning use: - same zoning type → **1 Yes** - different zoning
type → **1 No**

Greenfield has density 0 and no zoning type. Ocean/river remain
Greenfield for Council even when they provide waterfront value.

After all four neighbours are evaluated: - draw **7 cubes** from the
12-cube bag; - **4 or more Yes = approved**; - otherwise the application
fails.

### Redraws

The initial draw is part of the application. After failure, the
applicant may pay to redraw: - Low application: **\$1** - Medium
application: **\$2** - High application: **\$3**

The latest discussion treated redraws as repeatable while the player is
willing/able to keep paying. A hard maximum number of redraws is
**OPEN** because "retry 3 times" was discussed but not locked.

Council agency is intended to come primarily from **changing the
neighbourhood before applying**, not from influence tokens or stuffing
the bag. Direct player influence over Council was considered and
explicitly left out for now.

## 7. Land/property value

**Value comes from zoning, not buildings.**

Base land value of a parcel is: - its own zoning value (0/1/2/3), - plus
the zoning value of each of its four orthogonal neighbouring parcels.

Ownership does not matter to the calculation.

Example: own Medium (2) + north Medium (2) + west Low (1) + east High
(3) + south Greenfield (0) = **8**.

### Waterfront value

Ocean and river frontage marked with the waterfront value reminder
symbol (working shorthand **`≋$`**) adds the adjacent parcel's **own
zoning value again** when valuing that parcel.

Thus waterfront behaves like an automatic value-only neighbour: - Low
parcel → waterfront adds +1 - Medium → +2 - High → +3

Water does **not** become zoned and contributes as Greenfield to
Council.

This rule is intended to make waterfront desirable because zoning there
extracts more value, without imposing a special acquisition surcharge.

Whether a parcel can benefit from more than one waterfront edge and
whether bonuses stack is **OPEN**.

## 8. Buildings and development income

Buildings are distinct from zoning.

A building: - physically represents what is currently built; -
communicates use and density; - can satisfy development prerequisites
for neighbouring parcels; - contributes to city growth; - pays immediate
cash when constructed.

### Latest economic direction

Earlier buildings had stored/sale values of Low `$3`, Medium `$7`, High
`$12`. This was superseded.

The latest direction is:

> **All private building densities should pay the same base amount when
> built.**

`$5` was used as the prototype/example value in the latest simulation,
but the exact equal base payout is **OPEN / not formally locked**.

The reason for equal payouts: - no escalating High-density jackpot that
makes holding one parcel obviously optimal; - players can exit a parcel
at any stage without feeling they abandoned a sunk future payout; -
market subsidy becomes the variable reward; - Low and Medium can be
worthwhile without mandatory development ladders.

When a building is constructed: - receive the base development payout; -
also receive any money currently on that market card; - the old
building, if redeveloping, is discarded/recycled according to the
building supply rules; - the built side no longer needs a dollar value
printed on it.

A player may skip densities. Example: - direct Medium → one building
payout; - Low then Medium → two building payouts, but more
actions/Council exposure.

## 9. Building prerequisites

Current established concept: - building requires
**matching/equal-or-sufficient zoning** for the building density/use; -
building requires sufficient **frontage**; - Medium/High buildings
require an appropriate **opposite-use built neighbour** in the
surrounding 8 parcels.

Known neighbour rule: - Low Residential / Low Commercial: **no neighbour
prerequisite**. - Medium Residential: nearby **built Low Commercial**. -
Medium Commercial: nearby **built Low Residential**. - High Residential:
nearby **built Medium Commercial**. - High Commercial: nearby **built
Medium Residential**.

The neighbour check uses the **8 surrounding parcels** (orthogonal +
diagonal).

Frontage: - **Low Residential requires 2 frontage**. - Roads provide
frontage. - Beach/ocean frontage was discussed as counting toward
frontage. - Exact frontage requirements for every other building
type/density are **OPEN** in the currently recoverable record.

## 10. Building market

Current market: - **two rows of five** private building cards/tiles. - A
dedicated/single **Municipal staging space** sits at the end/side of the
rows.

Market acquisition uses a Pax-style subsidy mechanism: - taking the
front / `$0` position requires no payment to skipped cards; - to take a
deeper card, place `$1` on each card skipped before it; - money stays on
those cards; - when a player takes a card, they collect the money on
that card.

**Current decision:** a player **may take a building card just for the
money and discard the building**. This is necessary to prevent market
clogging. A previous proposal to forfeit the card money when discarding
was rejected.

If the card is actually built, the player receives: - money accumulated
on the card; - plus the base building payout.

Exact row refill/collapse procedure should follow the physical concept
of cards moving toward the `$0` slot, but implementation details are
**OPEN** where not explicitly established.

Discarded private building cards and demolished private buildings were
discussed as returning to a discard pool and being returned to the
bag/supply when the building bag empties. Exact recycle timing should be
confirmed.

## 11. Growth tracks and Municipal unlocks

Residential and Commercial construction advance paired city-growth
requirements/tracks (population/jobs concept).

Important current anti-stall rule: - if one type has only one cube
remaining in the current level and a building would require two, it may
take the remaining cube **and continue taking the required amount from
the next level**; - however, once that type has advanced ahead, **no
more buildings of that type may be built until the other type catches up
to the same boundary**; - this prevents a player from deliberately
refusing to finish a row/level just to deny the next Municipal unlock.

When **both Residential and Commercial have emptied/completed the
relevant growth level**, the next Municipal building unlocks
**immediately**.

The unlocked Municipal building goes into the dedicated Municipal
market/staging space immediately.

**Municipal buildings cannot be discarded.**

The concept discussed was that when the relevant market row next shifts,
the Municipal card moves into the row's `#5` space. Exact
row-selection/movement wording is not fully formalized.

The **final Municipal building being built ends the game immediately**.
Players may therefore accelerate or delay the end indirectly.

Exact number of growth levels, cubes per level, Municipal buildings, and
Municipal build/payout values are **OPEN / need recovery or
confirmation**.

## 12. Roads and frontage

Roads are physical network/infrastructure. - Physical prototype concept:
**black wooden sticks**, similar in form factor to Catan roads. - Roads
provide building frontage. - Zoning itself is not dependent on roads;
**building is dependent on frontage**. - A player may therefore obtain
zoning on land that cannot yet be built. - Road construction can create
public-good externalities by making other players' land developable.

Exact road-building action cost/range and exact frontage requirements by
building density/use remain **OPEN**.

## 13. Sale / liquidation

Selling realizes the zoning-based property value and returns the
ownership token for redeployment.

Buildings no longer carry a persistent sale-price number under the
latest economic direction; their development cash was paid when
constructed.

High-density parcels are often natural exit points because no higher
building payout remains, although holding may still be rational if
neighbouring zoning is expected to increase the land value.

Exact acquisition pricing rule for non-starting parcels and whether
selling/acquiring can be combined into one action need formal
confirmation.

## 14. Hidden information

-   Cash should be **hidden**, likely behind player screens in physical
    play.
-   Ownership, zoning, buildings, roads, market state, Council bag
    composition, and transactions are public.
-   The intention is that players can estimate but not precisely know
    who is winning.
-   No public VP track is desired.

## 15. Endgame

Trigger: **final Municipal building is built**.

Scoring direction: - hidden cash; - plus liquidation value of remaining
owned parcels using current zoning-based valuation.

Highest total wealth wins.

Exact handling of unsold parcels, tied wealth, and any
Municipal-specific endgame payout is **OPEN**.
