
var filters = (function (filters) {
    "use strict";

    filters.formatSlotLabel = function () {
        return function (slot) {
            if (!slot) {
                return '';
            }
            var suffix = slot.metadata.status.name === 'empty' ? ' (Empty)' : '';

            if (slot.label) {
                return '#' + slot.number + '. ' + slot.label + suffix;
            }

            if (slot.metadata.metadata['profile-title']) {
                return '#' + slot.number + '. ' + slot.metadata.metadata['profile-title'] + suffix;
            }

            return '#' + slot.number + '. No name' + suffix;
        };
    };

    filters.isProfilable = function () {
        return function (tab) {
            if (!tab) {
                return true;
            }
            return 'http' ===  tab.url.split('://')[0].substr(0, 4);
        };
    };

    return filters;
}({}));
