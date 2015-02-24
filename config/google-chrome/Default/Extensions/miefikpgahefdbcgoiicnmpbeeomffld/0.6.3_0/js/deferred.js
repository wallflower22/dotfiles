/*global window */
/*global Q */

(function (window, Q) {
    "use strict";

    function createDeferred() {
        return Q.defer();
    }

    window.createDeferred = createDeferred;
}(window, Q));
