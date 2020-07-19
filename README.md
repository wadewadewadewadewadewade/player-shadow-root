# player-shadow-root

I'm writing an audio/video player in TypeScript to compile down to a standard browser library that can be run outside of Node.js via a generic `<script>` tag.

Currently `npm run build` works to build everythign to JS via TypeScript -> babel -> rollup, but this is not the end goal.
* I'd like to change to just use rollup alone, as that seems cleaner
* Also, the player code itself doesn't work yet