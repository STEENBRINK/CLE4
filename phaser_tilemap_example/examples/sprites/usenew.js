
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('magenta', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDA4QzJDNzlFNjcxMTFFNjlGNDFFOTdDRDY2OEQ1NEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDA4QzJDN0FFNjcxMTFFNjlGNDFFOTdDRDY2OEQ1NEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDhDMkM3N0U2NzExMUU2OUY0MUU5N0NENjY4RDU0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MDhDMkM3OEU2NzExMUU2OUY0MUU5N0NENjY4RDU0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvQ13nMAAAAqSURBVHja7M1BAQAABASwo39nSvDbCqwmk0+dZwKBQCAQCAQCgeDKCjAAtVsCPk/ff1QAAAAASUVORK5CYII=');
    game.load.image('yellow', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDA4QzJDN0RFNjcxMTFFNjlGNDFFOTdDRDY2OEQ1NEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDA4QzJDN0VFNjcxMTFFNjlGNDFFOTdDRDY2OEQ1NEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDhDMkM3QkU2NzExMUU2OUY0MUU5N0NENjY4RDU0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MDhDMkM3Q0U2NzExMUU2OUY0MUU5N0NENjY4RDU0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgC2zEsAAAArSURBVHja7M1BDQAACASg0/6dNYUPNyhAzeRUJwKBQCAQCAQCgeBHsAIMALZaAj6d8qvhAAAAAElFTkSuQmCC');

}

function create() {

    game.stage.backgroundColor = '#ffffff';

    var magenta = game.add.sprite(0, 0, 'magenta');

    var yellow = game.add.sprite(16, 0, 'yellow');

    yellow.blendMode = Phaser.blendModes.MULTIPLY;

    var bmd = game.add.bitmapData(64, 32);

    bmd.ctx.fillStyle = 'magenta';
    bmd.ctx.fillRect(0, 0, 32, 32);

    bmd.ctx.fillStyle = 'yellow';
    bmd.ctx.globalCompositeOperation = 'multiply';
    bmd.ctx.fillRect(16, 0, 32, 32);

    bmd.addToWorld(0, 64);

}
