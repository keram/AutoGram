/*global $, window, Autodesk, doc, initScenes, getViewingOptions */

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
            document.getElementById('main')
        );
    });

    doc.on('click', '#togglecubes-anchor', function () {
        $('#main').toggleClass('cubes-off');
    });

    function getToken(url) {
        return $.getJSON(url);
    }

    var urn_url = 'https://developer.api.autodesk.com/viewingservice/v1/';

    function initialize(urn, credentials) {
        var options = {
                env: 'AutodeskProduction',
                accessToken: credentials['access_token'],
                refreshToken: credentials['access_token']
            },
            // scenes_names = ['control', 'back', 'right', 'front', 'left'],
            // scenes_names = ['control'],
            scenes_names = [],
            documentId = urn_url + urn;

        Autodesk.Viewing.Initializer(options, function () {
            var avp = Autodesk.Viewing.Private,
                viewers;

            avp.GPU_OBJECT_LIMIT = 100;
            avp.onDemandLoading = false;

            viewers = scenes_names.map(function (name) {
                return initializeViewer(
                    document.getElementsByClassName(name + '-scene')[0],
                    documentId,
                    '3d'
                );
            });

            // var c = viewers[0];

            window.viewers = viewers;
            // console.log('-t- viewers: ', c);
        });
    }

    $(function () {
        var urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmtfbWVkL0NsaW5pY19Cb2lsZXJSb29tLnJ2dA==',
            token_url = 'http://localhost:4567/token.json';

        getToken(token_url).then(function (response) {
            initialize(urn, response);
        });
    });


    // $(function () {
    //     var holder = document.getElementById('scene-holder'),
    //         scenes_names = ['control', 'back'],
    //         // urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLWdhbGxlcnktdHJ4L2NiN2ItNjVmYS0xYjZmLWUzODctYzkzMi5mM2Q=',
    //         urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmtfbWVkL0NsaW5pY19Cb2lsZXJSb29tLnJ2dA==',
    //         token_url = 'http://localhost:4567/token.json',
    //         viewing_options = getViewingOptions(token_url),
    //         scenes;

    //     Autodesk.Viewing.Initializer(viewing_options, function (test) {
    //         var avp = Autodesk.Viewing.Private;

    //         avp.GPU_OBJECT_LIMIT = 1000;
    //         avp.onDemandLoading = false;

    //         console.log('-t- test', urn);

    //         var doc = loadDocument(urn);

    //         avp.GPU_OBJECT_LIMIT = 1000;
    //         avp.onDemandLoading = false;

    //         // scenes = initScenes(scenes_names, holder, token_url, urn);
    //         // scenes.control.start();
    //         // applyViewerDefaultSettings(scenes.control);
    //     });

    //     // function runScenes(scenes_names) {
    //     //     scenes_names['control'].
    //     //     try {
    //     //         viewers[name].start();
    //     //         applyViewerDefaultSettings(viewers[name]);
    //     //     } catch (e) {
    //     //         console.log('-t- e', e);
    //     //     }
    //     // }

    // });
}());
