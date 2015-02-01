define(["mvc/list/list-item","ui/loading-indicator","mvc/base-mvc","utils/localization","ui/search-input"],function(d,f,b,c){var e=Backbone.View.extend(b.LoggableMixin).extend({viewClass:d.ListItemView,collectionClass:Backbone.Collection,tagName:"div",className:"list-panel",fxSpeed:"fast",emptyMsg:c("This list is empty"),noneFoundMsg:c("No matching items found"),searchPlaceholder:c("search"),multiselectActions:[],initialize:function(g,h){g=g||{};if(g.logger){this.logger=g.logger}this.log(this+".initialize:",g);this.fxSpeed=_.has(g,"fxSpeed")?(g.fxSpeed):(this.fxSpeed);this.filters=[];this.searchFor=g.searchFor||"";this.indicator=new f(this.$el);this.selecting=(g.selecting!==undefined)?g.selecting:true;this.selected=g.selected||[];this.lastSelected=null;this.dragItems=g.dragItems||false;this.viewClass=g.viewClass||this.viewClass;this.views=[];this.collection=g.collection||(new this.collectionClass([]));this.filters=g.filters||[];this.$scrollContainer=g.$scrollContainer||this.$scrollContainer;this.title=g.title||"";this.subtitle=g.subtitle||"";this.multiselectActions=g.multiselectActions||this.multiselectActions;this.actionsPopup=null;this._setUpListeners()},freeViews:function(){_.each(this.views,function(g){g.off()});this.views=[];return this},_setUpListeners:function(){this.off();this.on("error",function(h,k,g,j,i){console.error(h,k,g,j,i)},this);this.on("loading",function(){this._showLoadingIndicator("loading...",40)},this);this.on("loading-done",function(){this._hideLoadingIndicator(40)},this);this.once("rendered",function(){this.trigger("rendered:initial",this)},this);if(this.logger){this.on("all",function(g){this.log(this+"",arguments)},this)}this._setUpCollectionListeners();this._setUpViewListeners();return this},_setUpCollectionListeners:function(){this.log(this+"._setUpCollectionListeners",this.collection);this.collection.off();this.collection.on("error",function(h,k,g,j,i){this.trigger("error",h,k,g,j,i)},this);this.collection.on("reset",function(){this.renderItems()},this);this.collection.on("add",this.addItemView,this);this.collection.on("remove",this.removeItemView,this);if(this.logger){this.collection.on("all",function(g){this.info(this+"(collection)",arguments)},this)}return this},_setUpViewListeners:function(){this.log(this+"._setUpViewListeners");this.on("view:selected",function(g,h){if(h&&h.shiftKey&&this.lastSelected){var i=this.viewFromModelId(this.lastSelected);if(i){this.selectRange(g,i)}}else{if(h&&h.altKey&&!this.selecting){this.showSelectors()}}this.selected.push(g.model.id);this.lastSelected=g.model.id},this);this.on("view:de-selected",function(g,h){this.selected=_.without(this.selected,g.model.id)},this)},render:function(h){this.log(this+".render",h);var g=this._buildNewRender();this._setUpBehaviors(g);this._queueNewRender(g,h);return this},_buildNewRender:function(){this.debug(this+"(ListPanel)._buildNewRender");var g=$(this.templates.el({},this));this._renderControls(g);this._renderTitle(g);this._renderSubtitle(g);this._renderSearch(g);this.renderItems(g);return g},_renderControls:function(h){this.debug(this+"(ListPanel)._renderControls");var g=$(this.templates.controls({},this));h.find(".controls").replaceWith(g);return g},_renderTitle:function(g){},_renderSubtitle:function(g){},_queueNewRender:function(h,i){i=(i===undefined)?(this.fxSpeed):(i);var g=this;g.log("_queueNewRender:",h,i);$(g).queue("fx",[function(j){this.$el.fadeOut(i,j)},function(j){g._swapNewRender(h);j()},function(j){this.$el.fadeIn(i,j)},function(j){g.trigger("rendered",g);j()}])},_swapNewRender:function(g){this.$el.empty().attr("class",this.className).append(g.children());if(this.selecting){this.showSelectors(0)}return this},_setUpBehaviors:function(g){g=g||this.$el;g.find(".controls [title]").tooltip({placement:"bottom"});return this},$scrollContainer:function(){return this.$el.parent().parent()},$list:function(g){return(g||this.$el).find("> .list-items")},$messages:function(g){return(g||this.$el).find("> .controls .messages")},$emptyMessage:function(g){return(g||this.$el).find("> .empty-message")},renderItems:function(i){i=i||this.$el;var g=this;g.log(this+".renderItems",i);var h=g.$list(i);g.views=g._filterCollection().map(function(j){return g._createItemView(j).render(0)});h.empty();if(g.views.length){g._attachItems(i);g.$emptyMessage(i).hide()}else{g._renderEmptyMessage(i).show()}return g.views},_filterCollection:function(){var g=this;return g.collection.filter(_.bind(g._filterItem,g))},_filterItem:function(h){var g=this;return(_.every(g.filters.map(function(i){return i.call(h)})))&&(!g.searchFor||h.matchesAll(g.searchFor))},_createItemView:function(i){var j=this._getItemViewClass(i),h=_.extend(this._getItemViewOptions(i),{model:i}),g=new j(h);this._setUpItemViewListeners(g);return g},_getItemViewClass:function(g){return this.viewClass},_getItemViewOptions:function(g){return{fxSpeed:this.fxSpeed,expanded:false,selectable:this.selecting,selected:_.contains(this.selected,g.id),draggable:this.dragItems}},_setUpItemViewListeners:function(h){var g=this;h.on("all",function(){var i=Array.prototype.slice.call(arguments,0);i[0]="view:"+i[0];g.trigger.apply(g,i)});h.on("draggable:dragstart",function(l,i){var j={},k=this.getSelectedModels();if(k.length){j=k.toJSON()}else{j=[i.model.toJSON()]}l.dataTransfer.setData("text",JSON.stringify(j))},this);return g},_attachItems:function(g){this.$list(g).append(this.views.map(function(h){return h.$el}));return this},_renderEmptyMessage:function(g){this.debug("_renderEmptyMessage",g,this.searchFor);var h=this.searchFor?this.noneFoundMsg:this.emptyMsg;return this.$emptyMessage(g).text(h)},expandAll:function(){_.each(this.views,function(g){g.expand()})},collapseAll:function(){_.each(this.views,function(g){g.collapse()})},addItemView:function(j,k,i){this.log(this+".addItemView:",j);var h=this;if(!h._filterItem(j)){return undefined}var g=h._createItemView(j);$(g).queue("fx",[function(l){h.$emptyMessage().fadeOut(h.fxSpeed,l)},function(l){h._attachView(g);l()}]);return g},_attachView:function(h){var g=this;g.views.push(h);g.$list().append(h.render(0).$el.hide());g.trigger("view:attached",h);h.$el.slideDown(g.fxSpeed,function(){g.trigger("view:attached:rendered")})},removeItemView:function(j,k,i){this.log(this+".removeItemView:",j);var h=this,g=h.viewFromModel(j);if(!g){return undefined}h.views=_.without(h.views,g);h.trigger("view:removed",g);$({}).queue("fx",[function(l){g.$el.fadeOut(h.fxSpeed,l)},function(l){g.remove();h.trigger("view:removed:rendered");if(!h.views.length){h._renderEmptyMessage().fadeIn(h.fxSpeed,l)}else{l()}}]);return g},viewFromModelId:function(h){for(var g=0;g<this.views.length;g++){if(this.views[g].model.id===h){return this.views[g]}}return undefined},viewFromModel:function(g){if(!g){return undefined}return this.viewFromModelId(g.id)},viewsWhereModel:function(g){return this.views.filter(function(h){var j=h.model.toJSON();for(var i in g){if(g.hasOwnProperty(i)){if(j[i]!==h.model.get(i)){return false}}}return true})},viewRange:function(j,i){if(j===i){return(j)?([j]):([])}var h=this.views.indexOf(j),g=this.views.indexOf(i);if(h===-1||g===-1){if(h===g){return[]}return(h===-1)?([i]):([j])}return(h<g)?this.views.slice(h,g+1):this.views.slice(g,h+1)},_renderSearch:function(g){g.find(".controls .search-input").searchInput({placeholder:this.searchPlaceholder,initialVal:this.searchFor,onfirstsearch:_.bind(this._firstSearch,this),onsearch:_.bind(this.searchItems,this),onclear:_.bind(this.clearSearch,this)});return g},_firstSearch:function(g){this.log("onFirstSearch",g);return this.searchItems(g)},searchItems:function(g){this.searchFor=g;this.trigger("search:searching",g,this);this.renderItems();this.$("> .controls .search-query").val(g);return this},clearSearch:function(g){this.searchFor="";this.trigger("search:clear",this);this.renderItems();this.$("> .controls .search-query").val("");return this},showSelectors:function(g){g=(g!==undefined)?(g):(this.fxSpeed);this.selecting=true;this.$(".list-actions").slideDown(g);_.each(this.views,function(h){h.showSelector(g)})},hideSelectors:function(g){g=(g!==undefined)?(g):(this.fxSpeed);this.selecting=false;this.$(".list-actions").slideUp(g);_.each(this.views,function(h){h.hideSelector(g)});this.selected=[];this.lastSelected=null},toggleSelectors:function(){if(!this.selecting){this.showSelectors()}else{this.hideSelectors()}},selectAll:function(g){_.each(this.views,function(h){h.select(g)})},deselectAll:function(g){this.lastSelected=null;_.each(this.views,function(h){h.deselect(g)})},selectRange:function(i,h){var g=this.viewRange(i,h);_.each(g,function(j){j.select()});return g},getSelectedViews:function(){return _.filter(this.views,function(g){return g.selected})},getSelectedModels:function(){return new this.collection.constructor(_.map(this.getSelectedViews(),function(g){return g.model}))},_showLoadingIndicator:function(h,g,i){this.debug("_showLoadingIndicator",this.indicator,h,g,i);g=(g!==undefined)?(g):(this.fxSpeed);if(!this.indicator){this.indicator=new f(this.$el,this.$el.parent());this.debug("\t created",this.indicator)}if(!this.$el.is(":visible")){this.indicator.show(0,i)}else{this.$el.fadeOut(g);this.indicator.show(h,g,i)}},_hideLoadingIndicator:function(g,h){this.debug("_hideLoadingIndicator",this.indicator,g,h);g=(g!==undefined)?(g):(this.fxSpeed);if(this.indicator){this.indicator.hide(g,h)}},scrollPosition:function(){return this.$scrollContainer().scrollTop()},scrollTo:function(h,g){g=g||0;this.$scrollContainer().animate({scrollTop:h},g);return this},scrollToTop:function(g){return this.scrollTo(0,g)},scrollToItem:function(g,i){if(!g){return this}var h=g.$el.position().top;return this.scrollTo(h,i)},scrollToId:function(h,g){return this.scrollToItem(this.viewFromModelId(h),g)},events:{"click .select-all":"selectAll","click .deselect-all":"deselectAll"},toString:function(){return"ListPanel("+this.collection+")"}});e.prototype.templates=(function(){var h=b.wrapTemplate(["<div>",'<div class="controls"></div>','<div class="list-items"></div>','<div class="empty-message infomessagesmall"></div>',"</div>"]);var g=b.wrapTemplate(['<div class="controls">','<div class="title">','<div class="name"><%= view.title %></div>',"</div>",'<div class="subtitle"><%= view.subtitle %></div>','<div class="actions"></div>','<div class="messages"></div>','<div class="search">','<div class="search-input"></div>',"</div>",'<div class="list-actions">','<div class="btn-group">','<button class="select-all btn btn-default"','data-mode="select">',c("All"),"</button>",'<button class="deselect-all btn btn-default"','data-mode="select">',c("None"),"</button>","</div>","</div>","</div>"]);return{el:h,controls:g}}());var a=e.extend({modelCollectionKey:"contents",initialize:function(g){e.prototype.initialize.call(this,g);this.selecting=(g.selecting!==undefined)?g.selecting:false;this.setModel(this.model,g)},setModel:function(h,g){g=g||{};this.debug(this+".setModel:",h,g);this.freeModel();this.freeViews();if(h){var i=this.model?this.model.get("id"):null;this.model=h;if(this.logger){this.model.logger=this.logger}this._setUpModelListeners();this.collection.off();this.collection=(this.model[this.modelCollectionKey])?this.model[this.modelCollectionKey]:(g.collection||(new this.collectionClass([])));this._setUpCollectionListeners();if(i&&h.get("id")!==i){this.trigger("new-model",this)}}return this},freeModel:function(){if(this.model){this.stopListening(this.model)}return this},_setUpModelListeners:function(){this.log(this+"._setUpModelListeners",this.model);this.model.on("error",function(){var g=Array.prototype.slice.call(arguments,0);g.unshift("error");this.trigger.apply(this,g)},this);return this},_renderControls:function(h){this.debug(this+"(ListPanel)._renderControls");var i=this.model?this.model.toJSON():{},g=$(this.templates.controls(i,this));h.find(".controls").replaceWith(g);return g},toString:function(){return"ModelListPanel("+this.model+")"}});a.prototype.templates=(function(){var g=b.wrapTemplate(['<div class="controls">','<div class="title">','<div class="name"><%= model.name %></div>',"</div>",'<div class="subtitle"><%= view.subtitle %></div>','<div class="actions"></div>','<div class="messages"></div>','<div class="search">','<div class="search-input"></div>',"</div>",'<div class="list-actions">','<div class="btn-group">','<button class="select-all btn btn-default"','data-mode="select">',c("All"),"</button>",'<button class="deselect-all btn btn-default"','data-mode="select">',c("None"),"</button>","</div>","</div>","</div>"]);return _.extend(_.clone(e.prototype.templates),{controls:g})}());return{ListPanel:e,ModelListPanel:a}});