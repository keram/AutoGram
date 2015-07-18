/*global $, window, Autodesk, doc */

'use strict';

var viewers = {};

                // if (!_viewerLeft) {
                //     _viewerLeft = new Autodesk.Viewing.Viewer3D($('#viewerLeft')[0]);
                //     _viewerLeft.start();

                //     // The settings are loaded by the 2nd viewer automatically
                //     _viewerLeft.setQualityLevel(false, false);
                //     _viewerLeft.setGroundShadow(true);
                //     _viewerLeft.setGroundReflection(false);
                //     _viewerLeft.setGhosting(false);
                // }


function onViewerInitialized(viewer) {
    console.log('Viewer initialized', viewer);
}

function onError(error) {
    console.log(error);
}

function applyViewerDefaultSettings(viewer) {
    viewer.setQualityLevel(false, false);
    viewer.setGroundShadow(false);
    viewer.setGroundReflection(false);
    viewer.setGhosting(false);
    // viewer.impl.setLightPreset(0);
}

function initScene(holder, name) {
    viewers[name] = new Autodesk.Viewing.Viewer3D(holder);

    // viewers[name].start();
    // applyViewerDefaultSettings(viewers[name]);

    return viewers[name];
}

function initScenes(scenes_names, holder, token_url, urn) {
    return scenes_names.map(function (name) {
        return initScene(
            holder.getElementsByClassName(name + '-scene')[0],
            name
        );
    });
}
