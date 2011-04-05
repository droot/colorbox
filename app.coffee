class ColorBoxModel extends Backbone.Model
    initialize: ->
        @set {'color': 'blue', 'width': '100', 'height': '100'}

class ColorBoxView extends Backbone.View
    tagName: 'li'
    initialize: ->
         @template = $('#color-box-template').template()
         @model.bind('change', @render)
         @model.view = @

    render: =>
         $(@el).html($.tmpl(@template, @model.toJSON()))
         return @

class ColorInputView extends Backbone.View
    initialize: ->
       @model.view = @
    
    events:
        'keyup #color-input': "updateColor"
        'keyup #height-input': "updateColor"
        'keyup #width-input': "updateColor"

    updateColor: (e)=>
       @model.set({'color': $('#color-input').val() , 'width': $('#width-input').val(), 'height': $('#height-input').val()})

class ColorBoxController extends Backbone.Controller
    initialize: ->
       model = new ColorBoxModel
       color_input = new ColorInputView {'el': $('#color-input-box'), 'model': model}
       for x in [1..5]
          view = new ColorBoxView {model: model}
          $('#color-boxes').append(view.render().el)

init = ->
    cbl = new ColorBoxController

$(document).ready init