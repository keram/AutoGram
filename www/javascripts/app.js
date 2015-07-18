/*global $, window, Autodesk, doc, initScenes */

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

    doc.on('click', '#fullscreen-anchor', function () {
        fullscreen(
            document.getElementById('scene-holder')
        );
    });


    $(function () {
        var holder = document.getElementById('scene-holder'),
            scenes_names = ['back'],
            urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLWdhbGxlcnktdHJ4L2NiN2ItNjVmYS0xYjZmLWUzODctYzkzMi5mM2Q=',
            // urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmtfbWVkL0NsaW5pY19BLnJ2dA==';
            token_url = '',
            scenes;

        scenes = initScenes(scenes_names, holder, token_url, urn);

        console.log('-t- scenes: ', scenes);
    });
}());
