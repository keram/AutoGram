/*global $ */

function handleFail() {
    'use strict';

    document.write('<a href="javascript:window.location.reload();">reload</a>');
}

function getViewingOptions(token_url) {
    'use strict';

    return {
        env: 'AutodeskProduction',
        getAccessToken: function (onSuccess) {
            $.getJSON(token_url).then(function (accessTokenResponse) {
                console.log('getAccessToken success', accessTokenResponse);
                onSuccess(
                    accessTokenResponse.access_token,
                    accessTokenResponse.expires_in
                );
            }).fail(function (response) {
                console.log('getAccessToken error: ', response);
                handleFail();
            });
        }
    };
}


function getModel(documentData) {
    var geometry;

    geometry = Autodesk.Viewing.Document.getSubItemsWithProperties(
        documentData.getRootItem(),
        { 'type': 'geometry', 'role': '3d' },
        true
    );

    return documentData.getViewablePath(geometry);
}
