/*global $ */

function getViewingOptions(token_url) {
    'use strict';

    return {
        env: 'AutodeskProduction',
        getAccessToken: function (onSuccess) {
            $.getJSON(token_url).then(function (accessTokenResponse) {
                onSuccess(
                    accessTokenResponse.access_token,
                    accessTokenResponse.expires_in
                );
            });
        }
    };
}
