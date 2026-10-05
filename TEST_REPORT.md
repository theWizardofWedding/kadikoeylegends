# Test report — 5 October 2026

- Lobby: all eight language selections, translated Wizard launch button and seven clearly non-playable planned cards passed.
- Wizard: all eight languages tested for preserved draft inputs, round labels, recap and charts; forbidden bids rejected; sample scores -10/20/20 passed.
- Reload, lobby navigation, undo, export, tied final results and locked finished inputs passed. All eight languages fit 320/375/768/1280-pixel viewports in entry and statistics views.
- Promotional page: eight language translations and locally served QR image passed.
- Legacy-compatible backup import, empty/invalid backup handling and retained existing games passed.
- Failed-save, undo and finish rollback checks passed; reduced-motion hides particles; Escape closes recap; singular card labels verified.

- Node core test passed 441 bid/trick combinations, complete 3–6-player game models, corrupted-score rejection and dictionary key/placeholder checks.
- 8 dictionaries contain 104 keys each, including promotional content and singular forms.
- Tests used local HTTP serving and headless Chromium. No live production deployment was performed.
- No Safari/Firefox/physical phone test or native-speaker translation review was performed.
- QR generation used ReportLab QR encoder (medium error correction) with exact production URL; PNG and SVG rendering preserve a four-module white quiet zone. Independent camera decoding remains to be checked.
