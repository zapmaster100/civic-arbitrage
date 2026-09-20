# Civic Arbitrage --- Playas de México

## Developer source package

**Working title:** Civic Arbitrage\
**Map / edition:** Playas de México\
**Status:** pre-playtest / evolving prototype\
**Purpose of this package:** preserve the design conversation well
enough for another AI/code agent to begin a playable web prototype
without access to the original ChatGPT thread.

> **Important:** This is not a finished rulebook. `CURRENT_RULES.md`
> distinguishes established current decisions from unresolved items. Do
> not silently fill gaps. `DESIGN_HISTORY.md` records
> rejected/superseded ideas so they are not accidentally reintroduced.

## One-sentence pitch

Competing developers speculate on land in one shared city, manipulate
the political feasibility of rezoning through the city they collectively
create, build projects for cash, and sell land whose value is heavily
determined by everyone else's zoning decisions.

## Intended player experience

The game is intended to be a medium-heavy economic game with **high
indirect interaction and essentially no direct player interaction**.
Players do not attack, trade with, vote for, or negotiate binding deals
with one another. Instead, every developer changes the same city.

The desired table moments are things like:

-   "Don't build that there---you'll make my parcel worth a fortune."
-   "Please go Medium there."
-   "You just made my Council application easier."
-   "I thought you were broke; how much cash were you hiding?"
-   "I bought this land because I knew you were going to develop beside
    it."

The design target is:

> **Profit from the city your opponents create.**

A player's six ownership tokens are not meant to become six permanent
engine slots. They are bets on where value will emerge. A strong player
should be willing to buy, entitle, build, sell, recover a token, and
redeploy it.

## Core design philosophy

1.  **Externalities are the interaction.** Zoning near another player's
    parcel can increase that parcel's value and improve its future
    Council odds.
2.  **Zoning and buildings do different jobs.** Zoning stores
    land/equity value. Building creates immediate cash and changes the
    physical city.
3.  **Players may skip development levels.** If Council will approve
    Medium or High on a Greenfield parcel, the rules should not
    artificially force Low first.
4.  **Incremental development should be economically tempting, not
    mandatory.** The current direction is equal base cash for every
    completed private building plus any market subsidy on its card.
5.  **The city should be readable.** Zoning is represented by use/color
    and 1/2/3 circles. Buildings communicate use and density through
    art/height. Avoid redundant icons and numbers.
6.  **General rules over exceptions.** Several earlier fixes were
    rejected because they solved an exploit by adding special cases.
7.  **Hidden wealth, visible city.** Cash is intended to be hidden.
    Board state and transactions are public. There should be uncertainty
    about who is winning until final liquidation.
8.  **The game ends through civic development, not a score track.** The
    last Municipal building being built ends the game.
9.  **Waterfront is an economic automata neighbour.** Ocean/river can
    amplify the adjacent parcel's zoning value for valuation without
    becoming actual zoning or helping Council.

## The hook

The mechanisms are intentionally tight rather than flashy. The hook is
the emergent economic entanglement:

> **You don't build your city. You build everyone else's property
> values.**

A developer can profit from another player's rezoning, roads, building
prerequisites, growth progression, and civic projects. A seemingly
dominant visible portfolio may lose to a player who has already
extracted and hidden more cash.

## Files

-   `CURRENT_RULES.md` --- current rules, with unresolved points
    explicitly marked.
-   `GAME_SYSTEMS.md` --- mechanic-by-mechanic description and
    interactions.
-   `GAME_FLOW.md` --- setup, turns, actions, resolution, endgame.
-   `COMPONENTS_AND_DATA.md` --- data model and component inventory
    needed for implementation.
-   `UI_REQUIREMENTS.md` --- information architecture and interaction
    needs for a web game.
-   `DESIGN_HISTORY.md` --- superseded ideas, rejected fixes, and why.
-   `OPEN_QUESTIONS.md` --- decisions still requiring design/playtest
    work.
-   `CHAT_TRANSCRIPT.md` --- reconstructed Civic Arbitrage design
    conversation available to this package.
-   `assets/` --- conversation-provided/generated visual references
    available in the working environment.

## Implementation caution

Do **not** treat numbers mentioned in simulations as canonical unless
`CURRENT_RULES.md` marks them current. In particular, private building
payouts evolved from density-based `$3/$7/$12` to a later **equal-payout
direction**, with `$5` used as the prototype example; the exact equal
payout has not yet been formally locked.
