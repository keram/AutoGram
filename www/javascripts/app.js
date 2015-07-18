/*global $, window, Autodesk, doc */

(function () {
    'use strict';

    var doc = $(document),

        adn_config = {
            environment : 'AutodeskProduction', // 'AutodeskProduction' | 'AutodeskStaging'
            viewerType: 'Viewer3D'
        },

        scenes_names = ['back'],

        viewer = Autodesk.ADN.Toolkit.Viewer,
        tokenurl = '/www/data/token.json',
        urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRuLWdhbGxlcnktdHJ4L2NiN2ItNjVmYS0xYjZmLWUzODctYzkzMi5mM2Q=';


    function onViewerInitialized(viewer) {
        console.log('Viewer initialized', viewer);
    }

    function onError(error) {
        console.log(error);
    }

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

    function initAdnViewerManager(tokenurl, holder, config) {
        return new viewer.AdnViewerManager(tokenurl, holder, config);
    }

    function initScene(holder) {
        var adnViewerMng = initAdnViewerManager(tokenurl, holder, adn_config);

        adnViewerMng.loadDocument(urn, onViewerInitialized, onError);
        return adnViewerMng;
    }

    function initScenes(scenes_names, holder) {
        return scenes_names.map(function (name) {
            return initScene(holder.getElementsByClassName(name + '-scene')[0]);
        });
    }

    doc.on('click', '#fullscreen-anchor', function () {
        fullscreen(
            document.getElementById('scene-holder')
        );
    });

    $(function () {
        var holder = document.getElementById('scene-holder');

        initScenes(scenes_names, holder);
    });
}());
