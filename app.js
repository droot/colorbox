(function() {
  var ColorBoxController, ColorBoxModel, ColorBoxView, ColorInputView, init;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ColorBoxModel = (function() {
    function ColorBoxModel() {
      ColorBoxModel.__super__.constructor.apply(this, arguments);
    }
    __extends(ColorBoxModel, Backbone.Model);
    ColorBoxModel.prototype.initialize = function() {
      return this.set({
        'color': 'blue',
        'width': '100',
        'height': '100'
      });
    };
    return ColorBoxModel;
  })();
  ColorBoxView = (function() {
    function ColorBoxView() {
      this.render = __bind(this.render, this);;      ColorBoxView.__super__.constructor.apply(this, arguments);
    }
    __extends(ColorBoxView, Backbone.View);
    ColorBoxView.prototype.tagName = 'li';
    ColorBoxView.prototype.initialize = function() {
      this.template = $('#color-box-template').template();
      this.model.bind('change', this.render);
      return this.model.view = this;
    };
    ColorBoxView.prototype.render = function() {
      $(this.el).html($.tmpl(this.template, this.model.toJSON()));
      return this;
    };
    return ColorBoxView;
  })();
  ColorInputView = (function() {
    function ColorInputView() {
      this.updateColor = __bind(this.updateColor, this);;      ColorInputView.__super__.constructor.apply(this, arguments);
    }
    __extends(ColorInputView, Backbone.View);
    ColorInputView.prototype.initialize = function() {
      return this.model.view = this;
    };
    ColorInputView.prototype.events = {
      'keyup #color-input': "updateColor",
      'keyup #width-input': "updateColor"
    };
    ColorInputView.prototype.updateColor = function(e) {
      return this.model.set({
        'color': $('#color-input').val(),
        'width': $('#width-input').val(),
        'height': $('#width-input').val()
      });
    };
    return ColorInputView;
  })();
  ColorBoxController = (function() {
    function ColorBoxController() {
      ColorBoxController.__super__.constructor.apply(this, arguments);
    }
    __extends(ColorBoxController, Backbone.Controller);
    ColorBoxController.prototype.initialize = function() {
      var color_input, model, view, x, _results;
      model = new ColorBoxModel;
      color_input = new ColorInputView({
        'el': $('#color-input-box'),
        'model': model
      });
      _results = [];
      for (x = 1; x <= 5; x++) {
        view = new ColorBoxView({
          model: model
        });
        _results.push($('#color-boxes').append(view.render().el));
      }
      return _results;
    };
    return ColorBoxController;
  })();
  init = function() {
    var cbl;
    return cbl = new ColorBoxController;
  };
  $(document).ready(init);
}).call(this);
