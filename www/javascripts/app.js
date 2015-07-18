/*global $, window, specle, doc */

(function () {
    'use strict';

    var doc = $(document);

    function fullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }

    // $(function () {
    // });

    doc.on('click', '#fullscreen-anchor', function () {
        fullscreen($('#scene-holder').get(0));
    });
}());
