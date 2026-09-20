# COMPONENTS AND DATA

## Data needed for a playable implementation

This is a schema/inventory, not permission to invent missing values.

## 1. Map / parcel data

Each parcel should support: - `parcel_id` - grid/map coordinates -
orthogonal neighbour IDs - diagonal neighbour IDs - ownership: player ID
or neutral/unowned - zoning use: Greenfield / Residential / Commercial /
Municipal - zoning density: 0 / 1 / 2 / 3 - current building ID or
none - road edges / frontage edges - waterfront edges: - ocean - river -
whether edge has `≋$` value-mirror property - starting-state flag -
acquisition availability - current calculated land value

Map-specific data is **OPEN** beyond the starting-town concept.

## 2. Players

Per player: - player ID/name/color - hidden cash - six ownership tokens
total - tokens currently committed - owned parcel IDs - turn order - any
UI-only history/log

No player influence/lobbying resource is currently used.

## 3. Zoning

Uses/colors: - Residential --- yellow-orange - Commercial ---
blue-green - Municipal --- red-violet - Greenfield --- neutral/no
circles

Density: - 0 Greenfield - 1 Low - 2 Medium - 3 High

Zoning iconography: - use icon at bottom-right; - white circles for
intensity; - building overlays most of zoning tile but leaves zoning
strip visible.

## 4. Council cubes

Two cube types only: - Yes --- red/green color assignment was discussed
as **Yes/No using red and green**, but exact which color means which
should be confirmed from art assets/conversation. - No --- the other of
red/green.

No neutral cubes.

Per application: exactly 12 cubes generated from four neighbours.

Draw count: 7.

Redraw costs: - Low \$1 - Medium \$2 - High \$3

## 5. Private building data

Each building card/tile needs at minimum: - `building_id` - display
name - use: Residential / Commercial - density: Low / Medium / High -
art/facade asset - required zoning - frontage requirement -
built-neighbour prerequisite - growth contribution (Residential or
Commercial amount) - universal base build payout (global or card
field) - market subsidy tokens currently on card (runtime state)

### Known prerequisite mapping

-   Low Residential --- no built-neighbour prerequisite
-   Low Commercial --- no built-neighbour prerequisite
-   Medium Residential --- built Low Commercial within surrounding 8
-   Medium Commercial --- built Low Residential within surrounding 8
-   High Residential --- built Medium Commercial within surrounding 8
-   High Commercial --- built Medium Residential within surrounding 8

### Base payout

Latest direction: equal for all private buildings. - `$5` used in
simulation as prototype. - Exact amount **OPEN**.

### Earlier superseded values

Low/Medium/High `$3/$7/$12` were earlier stored/sale/building values.
They are **not current**.

## 6. Building names / thematic examples

The conversation developed Mexican-beach-themed Commercial examples and
generated art, but the exact accepted names are not fully recoverable
from the current transcript context. Do not invent them. See assets and
`CHAT_TRANSCRIPT.md`.

## 7. Market

Runtime data: - 2 rows - 5 private-card positions each - position index
1--5 / front-to-back - money accumulated on each card - one Municipal
staging slot - private building draw bag/supply - discard pile - recycle
behavior when supply empties (**exact timing OPEN**)

Market rule: - pay \$1 to every skipped earlier card; - take selected
card; - collect its accumulated cash; - build if legal or discard while
keeping market cash.

## 8. Roads

Physical prototype: - black wooden sticks similar to Catan road pieces.

Digital data: - road segment ID - edge endpoints / parcel edge -
connectivity - whether it provides frontage to adjacent parcel(s) -
owner? Current design treats roads primarily as shared infrastructure;
ownership/cost **OPEN**.

## 9. Frontage

Known: - Low Residential requires 2 frontage. - road edge counts as
frontage. - waterfront can count as frontage.

Unknown: - Low Commercial requirement - Medium Residential/Commercial
requirements - High Residential/Commercial requirements - Municipal
frontage requirements - whether river/ocean count identically for all
frontage checks.

## 10. Growth tracks

Need data fields for: - Residential requirement/cubes by level -
Commercial requirement/cubes by level - current remaining cubes per
level - spillover into next level - lock state when one type is ahead -
Municipal project unlocked by each completed paired level

Exact cube counts and level structure are **OPEN**.

## 11. Municipal buildings

Need: - ordered Municipal project deck/sequence - name -
density/intensity - zoning requirement - frontage requirement -
neighbour prerequisite if any - growth/civic effects - payout / purchase
/ sale behavior - art - final-project flag

Known: - unlock when both growth sides complete a level; - enters
special market slot immediately; - cannot be discarded; - final
Municipal building built = game end.

Exact Municipal names and monetary values are **OPEN / not safely
recoverable**.

## 12. Starting city entities

Known: - Plaza Mayor - neutral Low Residential north - neutral Low
Residential south - neutral Low Commercial east - neutral Low Commercial
west - road loop / cardinal road extensions - separate neutral Low
Residential beach house - coastline/ocean - possible river geography in
map system

## 13. Money

Money is both: - hidden player wealth; - physical/digital market subsidy
tokens placed on cards; - Council redraw expenditure; - property
acquisition/sale medium.

Denominations and total bank supply **OPEN**.

## 14. Visual assets available in package

The `assets/` directory includes generated/reference images from the
design workspace, including: - commercial density tile studies; - flat
facade/wood-block-print studies; - zoning/building block mockups; -
board/city-block mockups; - infographic/card layout references; -
user-provided/reference images.

Filenames are preserved from the working environment where possible.
These are source references, not necessarily final production art.
