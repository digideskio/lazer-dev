import Transform2D from 'components/Transform2D.js';
import MainLoop from 'system/MainLoop.js';
import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import CLS from 'canvas/graphics/Clear.js';
import DrawImage from 'canvas/DrawImage.js';
import Loader from 'loader/Loader.js';

export default class TransformTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.ctx = GetContext(this.canvas);

        this.sprite1 = new Transform2D({}, null, 0, 300);

        //  Loader
        this.image = null;
        this.loader = new Loader();
        this.loader.path = 'assets/';
        this.loader.image('mushroom2').then((file) => this.loadComplete(file));
        this.loader.start();

    }

    loadComplete (file) {

        this.image = file.data;

        this.loop = new MainLoop(60);

        this.loop.begin = (t => this.begin(t));
        this.loop.update = (delta => this.update(delta));
        this.loop.draw = (t => this.draw(t));

        this.loop.start();

    }

    begin () {

        CLS(this.ctx, true, 50, 50, 100);

    }

    update (delta) {

        this.sprite1.rotation += 0.05;

        this.sprite1.x += 100 * this.loop.physicsStep;

        if (this.sprite1.x > 800)
        {
            this.sprite1.x = 0;
        }

    }

    draw (i) {

        DrawImage(this.ctx, this.image, { 
            x: this.sprite1.x, 
            y: this.sprite1.y, 
            rotate: this.sprite1.rotation, 
            scaleX: this.sprite1.scaleX, 
            scaleY: this.sprite1.scaleY, 
            anchorX: 0.5, 
            anchorY: 0.5 
        });

    }

}

new TransformTest();
