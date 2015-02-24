// Generated by CoffeeScript 1.4.0
(function() {
  "use strict";
  var Walkthrough, exports, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  var exports = (_ref = window.chat) != null ? _ref : window.chat = {};

  /*
   * Walks first time users through the basics of CIRC.
   *
   * TODO: It would be awesome if this was implemented as a script.
  */


  Walkthrough = (function(_super) {

    __extends(Walkthrough, _super);

    /*
       * Number of ms to wait after joining a server so the MTOD and other output can be displayed.
    */


    Walkthrough.SERVER_OUTPUT_DELAY = 1000;

    /*
       * @param {{getCurrentContext: function(), displayMessage: function()}}
       *     messageDisplayer
       * @param {Storage} storageState The current state of what's loaded from storage
    */


    function Walkthrough(messageDisplayer, storageState) {
      this._handleIRCEvent = __bind(this._handleIRCEvent, this);
      Walkthrough.__super__.constructor.apply(this, arguments);
      this._messageDisplayer = messageDisplayer;
      this._steps = ['start', 'server', 'channel', 'end'];
      this._findWalkthroughPoisition(storageState);
      this._beginWalkthrough();
    }

    /*
       * Determine which step the user is on in the walkthrough. They may have left
       * half way through.
    */


    Walkthrough.prototype._findWalkthroughPoisition = function(storageState) {
      if (storageState.channelsLoaded) {
        this._currentStep = 3;
      } else if (storageState.serversLoaded) {
        this._currentStep = 2;
      } else if (storageState.nickLoaded) {
        this._currentStep = 1;
      } else {
        this._currentStep = 0;
      }
      return this._startingStep = this._currentStep;
    };

    /*
       * Based on where the user is in the walkthrough, determine the first message
       * the user sees.
    */


    Walkthrough.prototype._beginWalkthrough = function() {
      var step;
      step = this._steps[this._currentStep];
      if (step === 'end') {
        this.emit('tear_down');
        return;
      }
      if (step === 'channel') {
        /*
               * Wait for the server to connect before displaying anything.
        */

        this._currentStep--;
        return;
      }
      return this._displayStep(step);
    };

    /*
       * @param {EventEmitter} ircEvents
    */


    Walkthrough.prototype.listenToIRCEvents = function(ircEvents) {
      return ircEvents.on('server', this._handleIRCEvent);
    };

    Walkthrough.prototype._handleIRCEvent = function(event) {
      this._context = event.context;
      switch (event.name) {
        case 'nick':
          return this._displayWalkthrough('server');
        case 'connect':
          return this._displayWalkthrough('channel');
        case 'joined':
          return this._displayWalkthrough('end');
      }
    };

    Walkthrough.prototype._displayWalkthrough = function(type) {
      var position;
      position = this._steps.indexOf(type);
      if (position > this._currentStep) {
        this._currentStep = position;
        return this._displayStep(type);
      }
    };

    Walkthrough.prototype._displayStep = function(name) {
      var _ref1;
      return this["_" + name + "Walkthrough"]((_ref1 = this._context) != null ? _ref1 : this._messageDisplayer.getCurrentContext());
    };

    Walkthrough.prototype._isFirstMessage = function() {
      return this._currentStep === this._startingStep;
    };

    /*
       * Display a message to the user.
    */


    Walkthrough.prototype._message = function(msg, style) {
      var context;
      if (style == null) {
        style = 'system';
      }
      context = this._messageDisplayer.getCurrentContext();
      return this._messageDisplayer.displayMessage(style, context, msg);
    };

    Walkthrough.prototype._startWalkthrough = function() {
      return this._message("To get started, set your nickname with /nick <my_nick>.");
    };

    Walkthrough.prototype._serverWalkthrough = function() {
      if (this._isFirstMessage()) {
        this._message("Join a server by typing /server <server> [port].");
      } else {
        this._message("Great! Now join a server by typing /server <server> [port].");
      }
      return this._message("For example, you can connect to freenode by typing " + "/server chat.freenode.net.");
    };

    Walkthrough.prototype._channelWalkthrough = function(context) {
      /*
           * Display after a delay to allow for MOTD and other output to be displayed.
      */

      var _this = this;
      return setTimeout((function() {
        return _this._displayChannelWalkthough(context);
      }), Walkthrough.SERVER_OUTPUT_DELAY);
    };

    Walkthrough.prototype._displayChannelWalkthough = function(context) {
      this._message("You've successfully connected to " + context.server + ".");
      return this._message("Join a channel with /join <#channel>.");
    };

    Walkthrough.prototype._endWalkthrough = function(context) {
      if (!this._isFirstMessage()) {
        this._message("Awesome, you've connected to " + context.channel + ".");
      }
      this._message("If you're ever stuck, type /help to see a list of all commands.");
      this._message("You can switch windows with alt+[0-9] or click in the channel " + "list on the left.");
      return this.emit('tear_down');
    };

    return Walkthrough;

  })(EventEmitter);

  exports.Walkthrough = Walkthrough;

}).call(this);
