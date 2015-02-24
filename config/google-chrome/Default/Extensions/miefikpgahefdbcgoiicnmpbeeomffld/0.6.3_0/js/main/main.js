/*global browser */
/*global jQuery */
/*global window */
/*global chrome */
/*global slDebug */
/*global document */
/*global getCurrentTab */
/*global ProfilerApi */
/*global ProfilerClient */
/*global handleApiError */
/*global createDeferred */
/*global main */
/*global profiler */
/*global bgMessage */
/*global LocalStorage */
/*global RavenClient */
/*global Q */

(function (window, $, angular, RavenClient, Q) {
    "use strict";

    var storage = new LocalStorage(),
        STORAGE_SELECTED_SLOT_KEY = 'selected-slot',
        STORAGE_SELECTED_WAITING_SCOPE = 'selected-waiting-scope',
        statuses = {
            'ready'     : '',
            'aborted'   : 'Aborted',
            'waiting'   : '<i>Waiting...</i>',
            'profiling' : 'Profiling',
            'errored'   : 'Error',
            'completed' : 'Completed'
        };

    function displayAlert($scope, classname, message, closable) {
        $scope.alert.closable = undefined === closable ? true : !!closable;
        $scope.alert.classname = 'alert ' + classname;
        $scope.alert.message = $scope.sce.trustAsHtml(message);
        $scope.$digest();
    }

    function removeAlerts($scope) {
        $scope.alert.closable = false;
        $scope.alert.classname = 'alert';
        $scope.alert.message = null;
    }

    function handleError(error) {
        if (!error instanceof Array && 'object' === typeof error) {
            RavenClient.captureException(error);

            return;
        }

        var $scope = error[0],
            param1 = error[1],
            param2 = error[2],
            data = handleApiError(param1, param2);

        displayAlert($scope, data.classname, data.msg, data.closable);
    }

    function apiCall($scope, name, fresh) {
        var deferred = createDeferred();

        bgMessage(name, {fresh: (fresh === undefined ? false : fresh) })
            .then(function (data) {
                if (!data.success) {
                    deferred.reject([$scope, data.exception, JSON.parse(data.jqXHR)]);
                    return;
                }
                return deferred.resolve([$scope, data.result]);
            })
            .fail(RavenClient.captureException);

        return deferred.promise;
    }

    function gotoProfile($scope, event) {
        chrome.tabs.create({
            url    : $scope.slots.current._links.graph_url.href + '?source=companion',
            active : (!event.metaKey && !event.ctrlKey)
        });
    }

    function requestProfile(tab, options, slot) {
        var deferred = createDeferred();

        bgMessage('doProfile', {"tab": tab, "options" : options, "slot": slot})
            .then(deferred.resolve)
            .fail(RavenClient.captureException);

        return deferred.promise;
    }

    function profileNextRequest(tab, options, slot) {
        var deferred = createDeferred();

        bgMessage('doProfileNextRequest', {"tab": tab, "options" : options, "slot": slot})
            .then(deferred.resolve)
            .fail(RavenClient.captureException);

        return deferred.promise;
    }

    function isProfiling() {
        var deferred = createDeferred();

        bgMessage('isProfiling')
            .then(deferred.resolve)
            .fail(RavenClient.captureException);

        return deferred.promise;
    }

    function getLastProfile() {
        return bgMessage("getLastProfile");
    }

    function profileCurrentTab($scope) {
        var profileMethod = requestProfile;

        if ($scope.profiling_mode === 'next') {
            profileMethod = profileNextRequest;
            $scope.options.profile_title = '';
        } else {
            $scope.options.profile_title = $scope.tab.title.trim();
        }

        profileMethod($scope.tab, $scope.options, $scope.slots.current)
            .then(function (result) {
                if (!result.success) {
                    slDebug.warn('profiling', 'Profiling session could not start. Another might already been running');
                    displayAlert($scope, 'alert-failure', 'Profiling session could not start. Another might already been running');
                } else {
                    window.close();
                }
            })
            .fail(RavenClient.captureException);
    }

    function showProgress($scope, status, progress) {
        $scope.profiling.percentage = progress;
        $scope.profiling.status = status;
        $scope.profiling.statusHTML = $scope.sce.trustAsHtml(statuses[status]);

        if (status !== 'profiling') {
            if ('aborted' === status || 'errored' === status) {
                $scope.profiling.percentage = 100;
            } else {
                $scope.profiling.percentage = 0;
            }
        }
    }

    function signinFailure($scope, msg) {
        slDebug.log('profiling', 'signin lose ', msg);
        displayAlert($scope, 'alert-failure', 'Error while contacting ' + msg.url);
    }

    function onCredentials($scope, credentials) {
        $scope.credentials = credentials;
    }

    function onAuthenticated(result) {
        var $scope = result[0],
            tab = result[1],
            credentials = result[2],
            profilingData = result[3];

        $scope.tab = tab;
        $scope.credentials = credentials[1];

        if (profilingData.result) {
            showProgress($scope, profilingData.status, 0);
        }


        return Q.all([apiCall($scope, 'getCollabTokens'), apiCall($scope, 'getMe'), bgMessage("getDebugConfiguration"), storage.get(STORAGE_SELECTED_SLOT_KEY), storage.get(STORAGE_SELECTED_WAITING_SCOPE)]);
    }

    function onProfileFinish($scope, msg) {
        showProgress($scope, 'ready', 0);
    }

    function onProfileProgress($scope, msg) {
        showProgress($scope, msg.status, msg.data.percentage);
    }

    function onProfileStart($scope, msg) {
        showProgress($scope, msg.status, 0);
    }

    function lazyLoadError($scope, msg) {
        handleError([$scope, msg.exception, msg.jqXHR]);
    }

    function onIdentity($scope, identity) {
        $scope.identity = identity;
    }

    $(document).ready(function () {
        $('#more-options').bind('click', function () {
            if ($(this).attr('disabled')) {
                return false;
            }
            $('#profiling-options').fadeToggle(200);

            return false;
        });

        chrome.extension.connect({name: "popup-detection"});
    });

    function onCollabTokens($scope, collabTokenResult) {
        populateSlots($scope, collabTokenResult);
    }

    function populateSlots($scope, collabTokensResult) {
        var tokenNames = {};

        function getName(collabToken) {
            return collabToken.name || "Your slots";
        }

        function formatName(collabToken) {
            var name = getName(collabToken);

            if (tokenNames[name].count <= 1) {
                return name;
            }

            tokenNames[name].current += 1;

            return name + ' #' + tokenNames[name].current;
        }

        collabTokensResult.collabTokens.forEach(function (collabToken) {
            var name = getName(collabToken);

            if (undefined === tokenNames[name]) {
                tokenNames[name] = { count: 1, current: 0 };
            } else {
                tokenNames[name].count += 1;
            }
        });

        collabTokensResult.collabTokens.forEach(function (collabToken) {
            var token = { id: collabToken.collabToken, name: formatName(collabToken) };
            collabToken.profileSlots.forEach(function (slot) {
                $scope.slots.push(angular.extend({}, { collabToken: token }, slot));
            });
        });
    }

    function SlotsManager() {
        this.slots = [];
        this.slotsMap = {};
        this._current = null;
    }

    SlotsManager.prototype = {
        push: function (slot) {
            // slot is known, lets replace properties
            if (undefined !== this.slotsMap[slot.id]) {
                Object.keys(slot).forEach(function (key){
                    this.slots[this.slotsMap[slot.id]][key] = slot[key];
                }.bind(this));
            } else {
                this.slotsMap[slot.id] = this.slots.length;
                this.slots.push(slot);
            }
            if (null === this._current) {
                this.select(slot.id);
            }
        },
        has: function (id) {
            return undefined !== this.slotsMap[id];
        },
        count: function () {
            return this.slots.length;
        },
        select: function (id) {
            if (null === id) {
                console.error('weird');
                return;
            }
            if (!this.has(id)) {
                throw "This id is unknown (" + id + ")";
            }
            this._current = id;
        },
        all: function () {
            return this.slots;
        },
        get current() {
            return this.slots[this.slotsMap[this._current]];
        },
        set current(slotId) {
            this.select(slotId);
        },
        get selectedId() {
            if (!this._current) {
                return null;
            }
            return this.slots[this.slotsMap[this._current]].id;
        },
        set selectedId(slotId) {
            this.select(slotId);
        }
    };

    angular.module('popupApp', [])

        .config(function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        })

        .filter('formatSlotLabel', filters.formatSlotLabel)
        .filter('isProfilable', filters.isProfilable)

        .controller('popupCtrl', function ($scope, $sce) {
            window.installMessageListener({
                profileFinish     : onProfileFinish,
                profileProgress   : onProfileProgress,
                profileStart      : onProfileStart,
                signinFailure     : signinFailure,
                credentialsUpdate : onCredentials,
                onIdentity        : onIdentity,
                onCollabTokens    : onCollabTokens,
                credentialsError  : lazyLoadError
            }, $scope);

            $scope.sce = $sce;
            $scope.manifest = chrome.runtime.getManifest();
            $scope.version = $scope.manifest.version + (window.SLP_DIST ? ' - ' + window.SLP_DIST : '');
            $scope.slots = new SlotsManager();
            $scope.loadableDisabled = ['loading-disabled'];
            $scope.identity = null;
            $scope.renaming = false;
            $scope.tab = null;
            $scope.credentials = null;
            $scope.slDebug = {};
            $scope.bodyClass = [];
            $scope.profiling = {status: 'ready', percentage: null, statusHTML: ''};
            $scope.alert = {closable:false, classname: 'alert alert-failure', message: null};
            $scope.toolbarTesterStatus = 'aborted';
            $scope.toolbarTesterIsError = false;

            Object.keys(slDebug.available).forEach(function (key) {
                $scope.slDebug[slDebug.available[key]] = { name: slDebug.available[key], enabled: true };
            });

            $scope.$watch('slDebug', function (newval, oldval) {
                Object.keys(newval).forEach(function(key) {
                    if (!oldval[key] || oldval[key].enabled !== newval[key].enabled) {
                        if (newval[key].enabled) {
                            bgMessage("enableDebug", {type: newval[key].name});
                        } else {
                            bgMessage("disableDebug", {type: newval[key].name});
                        }
                    }
                });
            }, true);

            $scope.toggleRename = function ($event, save) {
                $event.preventDefault();
                $scope.renaming = save ? $scope.slots.current.label : false;
            };
            $scope.profileCurrentTab = function ($event) {
                $event.preventDefault();
                removeAlerts($scope);
                profileCurrentTab($scope);
            };
            $scope.abortProfile = function ($event) {
                $event.preventDefault();
                showProgress($scope, 'ready', 0);
                bgMessage("abortProfile", {tab: $scope.tab});
            };
            $scope.gotoProfile = function ($event) {
                $event.preventDefault();
                gotoProfile($scope, $event);
            };
            $scope.editProfile = function ($event) {
                $event.preventDefault();
                editProfile($scope);
            };
            $scope.selectSlot = function ($event) {
                storage.set(STORAGE_SELECTED_SLOT_KEY, $scope.slots.selectedId)
            };
            $scope.removeAlert = function ($event) {
                removeAlerts($scope);
            };
            $scope.testToolbar = function ($event, method) {
                $event.preventDefault();
                bgMessage("setStatus", {
                    slot: $scope.slots.current,
                    method: method,
                    status: $scope.toolbarTesterStatus,
                    percentage: 25,
                    infoMessage: new InfoMessage('Une belle info', 'Un beau message', $scope.toolbarTesterIsError)
                });
            };
            $scope.renameSlot = function () {
                var newval = $('#profile-name').val(),
                    oldval = $scope.renaming;

                if (oldval === newval) {
                    $scope.renaming = false;
                    return;
                }

                bgMessage("updateProfileSlotLabel", { slot: $scope.slots.current, payload: { label: newval }})
                    .then(function (data) {
                        if (!data.success) {
                            $scope.slots.current.label = oldval;
                        }
                    });

                $scope.renaming = false;
            };

            function interfaceReady(result) {
                var collabTokensResult = result[0],
                    me = result[1],
                    debugConfiguration = result[2],
                    selectedSlotId = result[3],
                    selectedWaitScope = result[4];

                populateSlots($scope, collabTokensResult[1]);

                (function(selectedSlotId) {
                    if (!$scope.slots.has(selectedSlotId)) {
                        return;
                    }
                    $scope.slots.current = selectedSlotId;
                }(selectedSlotId));

                Object.keys(debugConfiguration.conf).forEach(function (key) {
                    $scope.slDebug[debugConfiguration.conf[key].type]['enabled'] = debugConfiguration.conf[key].enabled;
                });

                $scope.bodyClass = $scope.credentials.is_impersonating ? ['impersonating'] : [];
                $scope.identity = me[1];
                $scope.loadableDisabled = false;

                var alphaOptions = $scope.credentials.is_alpha ? 1 : 0;

                $scope.profiling_mode = 'standard';
                $scope.previous_aggregation = 10;
                $scope.options = {
                    wait_scope: selectedWaitScope ? selectedWaitScope : '',
                    aggreg_samples: 10,
                    flag_cpu: 1,
                    flag_memory: 1,
                    flag_nw: 1,
                    flag_fn_args: alphaOptions,
                    flag_pdo: alphaOptions,
                    flag_objects: alphaOptions,
                    flag_refs: alphaOptions,
                    flag_php_errors: alphaOptions,
                    profile_title: ''
                };
                $scope.$watch('profiling_mode', function (newval, oldval) {
                    if (newval === 'next') {
                        $scope.previous_aggregation = $scope.options.aggreg_samples;
                        $scope.options.aggreg_samples = 1;
                    } else {
                        $scope.options.aggreg_samples = $scope.previous_aggregation;
                    }
                });
                $scope.$watch('options.wait_scope', function (newval, oldval) {
                    storage.set(STORAGE_SELECTED_WAITING_SCOPE, newval);
                });

                $scope.$digest();
            }

            Q.all([$scope, profiler.getCurrentTab(), apiCall($scope, 'fetchCredentials'), isProfiling()])
                .then(onAuthenticated)
                .then(interfaceReady)
                .fail(handleError);
        })

        .run(function () {

        });
}(window, jQuery, angular, RavenClient, Q));
