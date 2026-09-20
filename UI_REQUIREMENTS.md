# UI REQUIREMENTS

## Web implementation

The UI should make the shared-city externalities obvious without turning
the game into a spreadsheet.

## 1. Main board

Must show: - parcel grid/map; - ownership token/color; - zoning use and
density underneath buildings; - current building facade/use/density; -
roads; - ocean/river; - waterfront `≋$` reminder; - neutral vs
player-owned development; - Municipal buildings; - Plaza Mayor /
starting landmarks.

### Zoning readability

A zoning parcel should expose: - use icon at bottom right; - 1/2/3
circles for Low/Medium/High; - use color family.

When a building is on top, the zoning strip remains visible.

### Building readability

Built side should avoid unnecessary financial text. - facade art; -
height/massing indicates density; - use indicated through art/color
family; - no persistent building payout number needed after
construction.

## 2. Property inspector

On hover/tap/select, show: - owner; - zoning use/density; - current
building; - current land value; - a **breakdown** of that value: - own
zoning; - north/south/east/west zoning; - waterfront mirror
contribution; - frontage count and source; - eligible building types; -
built-neighbour prerequisite status; - likely Council bag for possible
applications.

The value breakdown is important because the game's interaction depends
on players seeing *who/what made their property valuable*.

## 3. Council application UI

Before committing: - choose use and density; - visually highlight four
orthogonal neighbours; - for each neighbour show: - density comparison
result (YY / YN / NN); - type comparison result (Y/N); - display final
12-cube bag composition; - do **not** hide odds if easily computed; the
physical design lets players inspect the bag.

Resolution: - animate/draw 7 cubes; - show 4+ Yes threshold; - on
failure, show redraw cost based on density; - allow stop/redraw
according to final redraw cap.

Ocean/river must clearly appear as Greenfield for Council even though
they may add property value.

## 4. Building market UI

Show: - two rows of five; - clear front / `$0` position; - money
accumulated on each card; - cost to reach each position; - building
use/density; - frontage requirement; - neighbour prerequisite; -
universal base development payout; - current total immediate cash if
built = subsidy + base payout; - option to discard after taking while
retaining subsidy.

Municipal staging slot must be visually distinct and communicate that
Municipal cannot be discarded.

## 5. Hidden cash

Each player sees: - own cash exactly; - own property list; - own
available ownership tokens.

Opponents: - cash total hidden; - public transactions visible in game
log; - public properties visible.

Do not create a public VP/wealth track.

## 6. Growth tracks

Display Residential and Commercial progress side by side.

Need to communicate: - current level; - cubes/requirements remaining; -
spillover into next level; - whether one development type is temporarily
locked; - next Municipal project; - whether a Municipal project is
unlocked/staged.

The anti-stall overflow rule should be handled automatically by code.

## 7. Turn/action UI

Show: - current player; - actions remaining (2); - legal actions; - why
an action is illegal.

Potential action buttons: - Acquire - Sell - Apply to Council - Take
Market Card - Build/Discard selected card - Build Road

Exact action decomposition is still open, so UI architecture should not
hard-code assumptions that cannot be changed.

## 8. Endgame

When final Municipal building is completed: - lock further actions; -
reveal cash; - calculate each player's remaining parcel liquidation
values with breakdown; - total final wealth; - show winner.

Because hidden-money reveal is part of the intended experience, present
the reveal dramatically rather than continuously forecasting final score
during play.

## 9. Art direction

Current art direction: - happy but **not cute**; - setting-neutral
visual system reusable across country/map editions; - local building
architecture changes by edition; - flat, non-isometric facades; -
buildings line up visually like a main street; - **wood-block print /
printmaking** feel; - no plastic-miniature aesthetic; - commercial:
blue-green; - residential: yellow-orange; - municipal: red-violet; -
intensity can progress light → dark; - roads black.

Commercial density massing study: - Low building roughly half tile
height; - Medium at least three-quarters; - High fills full tile height.

## 10. Accessibility / color

Because red and green were discussed for Yes/No cubes and zoning uses
have their own color families, digital implementation should not rely on
color alone: - label Yes/No cubes with symbols; - use zoning icons plus
color; - use circle count plus shade for density.
