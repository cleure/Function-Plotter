
/*

function f(x) {
    return Math.cos((x*16)%0.7)-0.6;
}

*/

/*

TODO: Move padding outside of Scalar (should be view process, not calculation process).

*/

(function(window) {
    'use strict';
 
    var Cartesian = require('./cartesian')(1.0),
        Scalar = require('./scalar')(0.01),
        FnInputHandler = require('./event-limiter')(update, 300),
        FnInputField = window.document.querySelector('[name="function"]'),
        ResolutionInputField = window.document.querySelector('[name="resolution"]'),
        SampleInputField = window.document.querySelector('[name="sample-rate"]'),
        //SketchSelector = window.document.querySelector('[name="sketch-loader"]'),
        //SketchNameField = window.document.querySelector('[name="sketch-name"]'),
        Canvas = window.document.querySelector('#screen'),
        Context = Canvas.getContext('2d'),
        Sketches;
 
    // Init
    loadSketches();
    FnInputField.addEventListener('keyup', FnInputHandler);
    FnInputField.addEventListener('blur', FnInputHandler);
    ResolutionInputField.addEventListener('keyup', FnInputHandler);
    SampleInputField.addEventListener('keyup', FnInputHandler);
    update();
 
    /**
     *
     *
     *
     *
     **/
    function loadSketches() {
        Sketches = [];
 
        try {
            Sketches = JSON.parse(localStorage.getItem('sketches'));
        } catch (e) {}
 
        // FIXME: Set values in SketchSelector
    }
 
    /**
     *
     *
     *
     *
     **/
    function saveSketches() {
        localStorage.setItem('sketches', JSON.stringify(Sketches));
    }
 
    /**
     *
     *
     *
     *
     **/
    function plotBackground(params) {
        var numTicks = params.numTicks * 2;
 
        // Clear screen
        Context.fillStyle = '#000';
        Context.fillRect(0, 0, params.width, params.height);
 
        // Draw graph
        Context.strokeStyle = '#fff';
        for (var i = 0; i < numTicks; i++) {
            var y = Scalar.out(Scalar.in(i, numTicks), params.height),
                x = Scalar.out(Scalar.in(i, numTicks), params.width);
 
            Context.beginPath();
            Context.moveTo(Scalar.out(0.495, params.width), y);
            Context.lineTo(Scalar.out(0.505, params.width), y);
            Context.stroke();
 
            Context.beginPath();
            Context.moveTo(x, Scalar.out(0.495, params.height));
            Context.lineTo(x, Scalar.out(0.505, params.height));
            Context.stroke();

        }
    }
 
    /**
     *
     *
     *
     *
     **/
    function plotFunction(params) {
        var points = [],
            samples = params.samples * 2,
            fn = params.fn,
            i;
 
        for (i = 0; i < samples; i++) {
            var x = (1.0 / samples) * i,
                out = Cartesian.inY(fn(Cartesian.outY(x))),
                canvasX = Scalar.out(x, params.width),
                canvasY = Scalar.out(out, params.height);
 
            points.push([canvasX, canvasY]);
        }
 
        Context.beginPath();
        Context.moveTo(points[0][0], points[0][1]);
 
        for (i = 1; i < Math.round(points.length / 2); i++) {
            var a = points[i*2+0],
                b = points[i*2+1];
 
            Context.quadraticCurveTo(
                a[0],
                a[1],
                b[0],
                b[1]
            );
        }
 
        Context.stroke();
    }
 
    /**
     *
     *
     *
     *
     **/
    function update() {
        var width = Context.canvas.width = Context.canvas.offsetWidth,
            height = Context.canvas.height = Context.canvas.offsetHeight,
            fn;
 
        plotBackground({
            'numTicks': ResolutionInputField.valueAsNumber,
            'width': width,
            'height': height
        });
 
        try {
            /*jshint evil:true */
            fn = (new Function('return ' + FnInputField.value + ';'))();
        } catch (e) {
            console.error('Failed to compile function');
            return;
        }
 
        plotFunction({
            'width': width,
            'height': height,
            'samples': SampleInputField.valueAsNumber,
            'fn': fn
        });
 
        // FIXME: Auto-save sketches?
    }

})(window);
