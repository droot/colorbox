class ConfigModel extends Backbone.Model
    initialize: ->
        @set 'color': 'blue', 'width': '100', 'height': '100'

class ColorBoxView extends Backbone.View
    tagName: 'li'
    initialize: ->
         @template = $('#color-box-template').template()
         @model.bind 'change', @render
         @model.view = @

    render: =>
         $(@el).html $.tmpl @template, @model.toJSON()
         return @

class ConfigInputView extends Backbone.View
    initialize: ->
       @model.view = @
    
    events:
        'keyup #color-input': "updateConfig"
        'keyup #width-input': "updateConfig"

    updateConfig: (e)=>
       @model.set 'color': $('#color-input').val() , 'width': $('#width-input').val(), 'height': $('#width-input').val()

class ColorBoxController extends Backbone.Controller
    initialize: ->
       model = new ConfigModel
       color_input = new ConfigInputView 'el': $('#config-input'), 'model': model
       for x in [1..5]
          view = new ColorBoxView {model: model}
          $('#color-boxes').append view.render().el

init = ->
    cbl = new ColorBoxController

$(document).ready init