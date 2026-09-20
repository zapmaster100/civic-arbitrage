# DESIGN HISTORY

## Important evolution and rejected ideas

This file exists to prevent an implementation agent from resurrecting
superseded mechanics.

## 1. Name

Earlier working concept: Development / Playas de México.

The accepted working title became **Civic Arbitrage**. The user liked
its strength even though it sounded somewhat mean. `Playas de México`
functions naturally as the map/edition subtitle.

## 2. Council originally had more lookup overhead

Earlier thinking used precomputed zoning combinations/booklets and
included a neutral cube category / special cases.

A major simplification was discovered: - only compare **density
difference** for two cubes; - compare **type match** for one cube.

Neutral cubes were explicitly removed.

Current Council therefore uses only Yes/No cubes and a 12-cube bag from
four neighbours.

## 3. Council manipulation / bag stuffing

The idea of giving players more direct say in Council---"stuff the bag a
little"---was considered.

Decision: **leave it out for now.**

Agency should come from choosing where/what/when to apply and shaping
the city, plus paid redraws.

## 4. Draw count

Council draw settled at **7 cubes** from 12, giving an odd majority and
making bag composition more meaningful.

## 5. Redraws

Redraw price was tied to proposed density: - Low \$1 - Medium \$2 - High
\$3.

Discussion showed repeated redraws dramatically increase eventual
success, especially for a 6/6 bag. Exact maximum retries was not finally
locked.

## 6. Zoning/building information overload

Earlier zoning/building tiles carried more icons and values.

The design was simplified: - zoning tile shows use icon and 1/2/3
circles; - building height/art shows built density/type; - zoning tile
is larger and remains visible to the right of the building; - no circle
is reserved for Greenfield/ocean.

Later, once building money became a construction payout, the **built
side no longer needed a building dollar value**.

## 7. Market size

The chosen working market is **two rows of five**, with a separate
Municipal staging space.

## 8. Market discard money --- rejected restriction

A problem was identified: a passive player could take a subsidized card
from the `$0` slot just for its money.

A proposed fix was: \> If you discard the building, you do not collect
its money.

This was later **rejected** because it causes market-clearing problems.

Current decision: \> A player may take a market card for its accumulated
money and discard the building.

Therefore the incentive to actually build must come from the building
payout and strategic effects, not from forbidding cash-harvesting.

## 9. Earlier building values: \$3 / \$7 / \$12

Buildings were initially treated as having Low/Medium/High sale/build
values of approximately: - Low \$3 - Medium \$7 - High \$12.

This created a problem: - building Low/Medium felt like wasted actions
if those buildings were later demolished; - optimal play risked zoning
upward and only building at High; - escalating payouts could make "hold
until High" too obvious.

## 10. Mandatory development ladder --- rejected

A proposed fix: \> zoning can be at most one level higher than the
current building / must build Low before Medium and Medium before High.

Rejected by the user.

Reason: \> If a Greenfield parcel has a politically viable High
Residential application, Council should be able to approve it. The game
should not impose an artificial bungalow/apartment ladder.

Current rule permits direct Medium/High zoning.

## 11. Incremental payout difference --- rejected as insufficient

Another proposal: - building payout equals new improvement value minus
old improvement value.

This failed because direct Medium from empty would still pay the same
total as Low then Medium while using fewer actions, leaving Low
development pointless.

## 12. Building payout as immediate cash

The design then shifted: - zoning = stored land value/equity; - building
= immediate development cash.

An intermediate proposal paid full density-based amounts every time: -
Low +\$3 - Medium +\$7 - High +\$12.

This successfully rewarded incremental development but created a new
concern: escalating High payouts could make players ride parcels to the
top.

## 13. Equal building payout --- latest direction

Latest design direction: \> all private buildings pay the **same base
amount** when completed.

`$5` was used as the simulation prototype, but exact value is not
locked.

Why: - incremental building is still rewarded because each completed
project pays; - skipping levels is allowed but forfeits skipped
payouts; - no sunk-cost feeling forcing a player to hold until High; -
market subsidy becomes the variable bonus; - players are freer to
sell/redeploy at Low or Medium.

This also removed the need for a persistent dollar value on the
built-side tile.

## 14. Waterfront value evolution

Concern: counting beach as one frontage was not enough; these towns
exist because of waterfront value.

Proposed concept evolved into: \> Waterfront mirrors the adjacent
parcel's own zoning value for **valuation only**.

Example: - Greenfield beachfront beside Low zoning may initially be
worth only the Low neighbour's contribution; - after zoning the parcel
Medium, own zoning contributes 2 and ocean mirrors another 2.

A proposed **+\$1 waterfront acquisition premium** was rejected as
clunky.

Reason: - waterfront value is analogous to a neighbouring parcel
increasing your value; - the value is unrealized until sale; - the ocean
acts like an automata neighbour; - land banking should remain a
legitimate speculative strategy.

The same rule was extended to **river frontage**.

## 15. Waterfront icon

Circles were rejected for water because circles mean zoning and would
confuse Council.

Working reminder became **`≋$`**: waves/value, meaning "for property
valuation, add this parcel's zoning value again."

Water remains Greenfield for Council.

## 16. Beach camping concern

Potential exploit: - snake-draft/acquire waterfront; - hold it; - wait
for city development.

Rather than immediately nerfing it, the design recognized: - ownership
tokens are scarce; - zoning still requires actions/Council; - waterfront
remains politically Greenfield; - value is unrealized until sale; -
wrong geographic bets strand tokens.

Decision: **test the land-baron strategy rather than patch it
preemptively.**

## 17. Starting parcels

To make speculation fair from turn zero, setup moved to a **two-parcel
snake draft**.

Important correction: - players **do not pay** for drafted starting
parcels; - after draft, everyone receives the same **\$5** cash.

## 18. Starting city

Starting town evolved to: - Plaza Mayor; - Low R north/south; - Low C
east/west; - roads around/through cardinal approaches; - lonely Low
Residential beach house.

This gives multiple growth fronts and political precedents.

## 19. Growth-track anti-stall rule

Concern: a player might deliberately avoid taking the final cube in a
Residential/Commercial level to deny the next player access to the
Municipal unlock.

Solution: - a project may consume the last cube(s) in current level and
spill into the next; - that type then locks until the other type catches
up; - when both boundaries are completed, Municipal unlocks immediately.

This removed spiteful timing around "who empties the row."

## 20. Municipal timing

Municipal project: - unlocks immediately when both growth sides complete
the level; - goes into a dedicated market/staging space; - cannot be
discarded; - ultimately moves into market position #5 according to row
movement; - final Municipal built ends game.

Exact Municipal dataset remains unresolved.

## 21. Hidden money

The user prefers games where the winner is uncertain until the end
rather than a visible score track showing a hopeless deficit.

Decision: - cash hidden; - public board state; - final
reveal/liquidation.

## 22. Direct vs indirect interaction

Explicit design recognition: \> There is essentially no direct
interaction; it is all indirect.

This is not currently treated as a flaw. The shared city is meant to
produce high interaction through externalities.

Do not add trading, take-that, direct votes, hostile cards, or property
theft without a deliberate new design decision.

## 23. Art direction

Early art iterations moved from more dimensional/isometric ideas to: -
flat facade; - main-street row; - wood-block-print style; - happy but
not cute; - globally reusable art system with local architecture swapped
per edition.

Zoning colors: - Municipal red-violet - Residential yellow-orange -
Commercial blue-green

Roads: black wooden sticks in physical prototype.
