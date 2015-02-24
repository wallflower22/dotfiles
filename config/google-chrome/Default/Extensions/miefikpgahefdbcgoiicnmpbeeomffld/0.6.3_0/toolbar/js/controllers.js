/*global angular*/

(function (angular) {
    "use strict";

    function populateSlots(toolbar, collabTokens) {
        var i, j, updatedSlots,
            found = false;

        for (j = 0; j < collabTokens.length; j += 1) {
            updatedSlots = collabTokens[j].profileSlots;
            for (i = 0; i < updatedSlots.length; i += 1) {
                if (updatedSlots[i].id === toolbar.selected) {
                    toolbar.slot = updatedSlots[i];
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }

        if (!found) {
            toolbar.slot = updatedSlots[0];
        }
    }

    function updateSlot(toolbar, slot) {
        if (!toolbar.slot) {
            return;
        }

        if (toolbar.slot.id === slot.profileSlot) {
            toolbar.slot.label = slot.label;
        }
    }

    var statuses = {
        'ready'     : '',
        'aborted'   : 'Aborted',
        'waiting'   : '<i>Waiting...</i>',
        'profiling' : 'Profiling',
        'errored'   : 'Error',
        'completed' : 'Completed'
    };

    function setStatus($scope, toolbar, status, percentage, classes, infoMessage, url) {
        if ('.starting' === status.substr(-9)) {
            status = status.substr(0, status.length - '.starting'.length);
        }

        toolbar.status = status;

        if (undefined === statuses[status]) {
            console.error('Undefined status ' + status);
            return;
        }

        toolbar.statusHtml = $scope.sce.trustAsHtml(status === 'profiling' ? statuses[status] + ' ' + percentage + '%' : statuses[status]);

        toolbar.progressClass = classes;
        toolbar.percentage = percentage + '%';
        toolbar.flashClass = status;
        toolbar.flashUrl = url;

        if (null !== infoMessage && null !== infoMessage.details) {
            toolbar.flashMessage = infoMessage.details;
            toolbar.flashError = infoMessage.isError;
        } else {
            toolbar.flashMessage = null;
            toolbar.flashError = false;
        }

        if (toolbar.flashMessage) {
            bgMessage('toolbarSizeUp');
        } else {
            bgMessage('toolbarSizeDown');
        }
    }

    angular.module('toolbarApp', [])

        .config(function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        })

        .filter('formatSlotLabel', filters.formatSlotLabel)

        .controller('toolbarCtrl', function ($scope, $location, $sce) {
            $scope.toolbar = {
                selected: $location.search()['slot-id'],
                percentage: '0%',
                progressClass: [],
                slot: null,
                status: 'ready',
                statusHtml: '',
                flashMessage: null,
                flashClass: null,
                flashError: false,
                flashUrl: null
            };
            $scope.abort = function () {
                bgMessage('abortProfile');
            };
            $scope.sce = $sce;

            $scope.hide = function () {
                bgMessage('toolbarRemove');
            };

            bgMessage('getCollabTokens').then(function (data) {
                populateSlots($scope.toolbar, data.result.collabTokens);
                $scope.$digest();
            });

            function onSlotUpdated(msg, sendResponse) {
                updateSlot($scope.toolbar, msg.slot);
                $scope.$digest();
                sendResponse({success: true});
            }

            function toolbarSetStatus(msg, sendResponse) {
                setStatus($scope, $scope.toolbar, msg.status, msg.percentage, msg.classes, msg.infoMessage, msg.url);
                sendResponse({success: true});
                $scope.$digest();
            }

            window.installMessageListener({
                updateSlot      : onSlotUpdated,
                toolbarSetStatus: toolbarSetStatus
            });
        })

        .run(function () {
            bgMessage('toolbarLoaded');
        });
}(angular));
