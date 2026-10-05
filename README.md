# Verzaubertes Wedding — Game Night, Phase 1

## What is shipped
A complete static app: language selection, game lobby, functional Wizard scorekeeper,
round celebrations, optional local audio, charts, backup export/import and promotional page.
Eight languages: German, Turkish, Norwegian Bokmal, French, English, Bavarian, Slovak and Italian.
Bavarian is a playful, readable dialect adaptation, not a standardized or region-neutral spelling.
Translations were authored and technically tested but not independently reviewed by eight native speakers.

Only Wizard is playable. It is a scorekeeper for real physical cards, not a virtual card-dealing engine.
Backgammon, Kniffel/Yahtzee, Ludo, Dominoes, Connect Four, Memory and Hearts are visibly PLANNED cards.
No dummy play buttons, no claimed online multiplayer and no hidden unfinished game engines.

## Deploy to your EXISTING Vercel project
Keep the SAME hostname: https://trollmannen-fr-oslo.vercel.app/
1. In your current app, export a backup before replacing files.
2. Keep a backup of your existing GitHub repository or its previous commit.
3. Unzip the release. Upload these files TOGETHER to the existing repository root:
   index.html, app.js, core.js, i18n.js, styles.css, icon.svg, vercel.json,
   promo.html, promo.js, qr.svg
4. Replace the old index.html/app.js/styles.css; add the other files. Do not upload the ZIP as the app.
5. Commit to the production branch connected to Vercel (usually main).
6. Wait for a Ready production deployment. Existing settings: Framework Other, no build command,
   Output Directory ., root directory containing index.html. No npm or environment variables needed.
7. Open your existing production URL and refresh. The start page should show a language menu and game cards.
8. Open the same URL in an incognito window to check access for friends.

The included vercel.json explicitly sets the static deployment settings. If project dashboard overrides
conflict with these settings, use Other / empty build command / output . in the dashboard too.
Do NOT create a new Vercel project or a new domain unless you intentionally want to change the address.

## Existing games
Storage key and JSON structure remain compatible: verzaubertes-wedding-games.
Same hostname + same browser + same storage retains the existing saved games.
Opening the lobby does not delete any games. Select Wizard to see the saved-game archive.
Different browsers/devices/domains do not share local storage.
Export/import transfers a backup. Existing IDs are skipped, not overwritten by older backups.
Malformed storage blocks writes rather than silently destroying unreadable data.

Language preference is stored under game-night-preferences. First visit defaults to English;
the selection is shown immediately in the header. Selecting another language updates the lobby,
Wizard interface, confirmation dialogs and statistics without clearing current slider values.
Player and game names are never translated. Sound defaults off on a new installation.

## Invitation and QR
QR destination (exact): https://trollmannen-fr-oslo.vercel.app/
The QR uses a four-module white quiet zone and high-contrast dark modules.
The standalone poster PNG/PDF can be sent or printed. Scan it once on a real phone before printing many copies.
Share the eight-language poster AFTER deploying this release, because the current old site is not yet multilingual.

After deployment, the advertising page will be:
https://trollmannen-fr-oslo.vercel.app/promo.html
It includes the same QR and has all eight language options.
The QR itself goes to the root lobby, not to the poster page.

## Rules retained
3 to 6 players. 60-card deck. Round r gives each player r cards.
Maximum rounds: floor(60 / player count).
Bids must not total the card count; tricks won must total the card count.
Exact prediction: 20 + 10 * predicted tricks.
Miss: -10 * absolute difference between prediction and tricks won.
Round win rate counts joint best scores as wins, as in your original app.
Finish and undo now require confirmation. Tied game winners are displayed together.

## Modules and future work
core.js: scoring, totals, statistics, timelines, validated backup schema.
i18n.js: translation dictionaries, interchangeable with a future JSON/module loader.
app.js: lobby, local state, Wizard UI, effects and backups.
promo.html/promo.js: invitation page, isolated from the game engine.
styles.css: common visual theme and responsive layouts.

Next sensible milestone: local Kniffel with validated categories and optional local dice.
Backgammon online multiplayer needs a separate synchronized game-room service and authoritative
move/dice validation. It is not part of this static release. Do not pretend each browser's local
storage is a shared multiplayer database.

## Optional local test
With Python: python -m http.server 8000
Open http://localhost:8000
With Node: node tests/core.test.cjs
No development dependencies or build are required.

## Test limitations
See TEST_REPORT.md. Automated browser tests ran in headless Chromium, including mobile viewports.
Safari, Firefox, physical touch devices, subjective audio quality and live Vercel deployment were not tested.
The page-fetch tool could not inspect your current production website; this package was tested locally.
An actual camera scan of the QR was not performed in this environment.
