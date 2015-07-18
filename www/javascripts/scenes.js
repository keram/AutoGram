/*global $, window, Autodesk, doc */

'use strict';

var viewers = {};

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
    viewer.impl.setLightPreset(0);
}

function initScene(holder, name) {
    viewers[name] = new Autodesk.Viewing.Viewer3D(holder);

    console.log('holder', holder, name, viewers);

    return viewers[name];
}

function initScenes(scenes_names, holder, token_url, urn) {
    scenes_names.map(function (name) {
        return initScene(
            holder.getElementsByClassName(name + '-scene')[0],
            name
        );
    });

    return viewers;
}


function initializeViewer(viewerContainer, documentId, role) {
    var _viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerContainer);

    _viewer.start();
    applyViewerDefaultSettings(_viewer);

    Autodesk.Viewing.Document.load(documentId,
        function (document) {
            var rootItem = document.getRootItem();
            var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(
                    rootItem,
                    { 'type': 'geometry', 'role': role },
                    true);

            _viewer.load(document.getViewablePath(geometryItems[0]));
        },

        function (msg) {
            console.log('Error loading document: ' + msg);
        }
    );

    return _viewer;
}
