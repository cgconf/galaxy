define("mvc/collection/collection-view-edit",["exports","mvc/collection/collection-view","mvc/collection/collection-model","mvc/collection/collection-li-edit","mvc/base-mvc","mvc/tag","ui/fa-icon-button","utils/localization","ui/editable-text"],function(t,e,i,o,l,n,s,a){"use strict";function d(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var c=d(e),r=(d(i),d(o)),m=(d(l),d(n)),u=(d(s),d(a)),f=c.default.CollectionView,C=f.extend({DatasetDCEViewClass:r.default.DatasetDCEListItemEdit,NestedDCDCEViewClass:r.default.NestedDCDCEListItemEdit,initialize:function(t){f.prototype.initialize.call(this,t)},_setUpBehaviors:function(t){if(t=t||this.$el,f.prototype._setUpBehaviors.call(this,t),this.model&&Galaxy.user&&!Galaxy.user.isAnonymous()){this.tagsEditorShown=!0;var e=this;t.find("> .controls .name").attr("title",(0,u.default)("Click to rename collection")).tooltip({placement:"bottom"}).make_text_editable({on_finish:function(t){var i=e.model.get("name");t&&t!==i?(e.$el.find("> .controls .name").text(t),e.model.save({name:t}).fail(function(){e.$el.find("> .controls .name").text(e.model.previous("name"))})):e.$el.find("> .controls .name").text(i)}}),this.tagsEditor=new m.default.TagsEditor({model:this.model,el:t.find(".tags-display"),onshowFirstTime:function(){this.render()},usePrompt:!1}),this.tagsEditor.toggle(!0)}},toString:function(){return"CollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),h=C.extend({DatasetDCEViewClass:r.default.DatasetDCEListItemEdit,toString:function(){return"ListCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),E=h.extend({toString:function(){return"PairCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),w=E.extend({_setUpBehaviors:function(t){f.prototype._setUpBehaviors.call(this,t)},toString:function(){return"NestedPairCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),g=C.extend({NestedDCDCEViewClass:r.default.NestedDCDCEListItemEdit.extend({foldoutPanelClass:w}),toString:function(){return"ListOfPairsCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}}),D=C.extend({NestedDCDCEViewClass:r.default.NestedDCDCEListItemEdit.extend({foldoutPanelClass:w}),toString:function(){return"ListOfListsCollectionViewEdit("+(this.model?this.model.get("name"):"")+")"}});t.default={CollectionViewEdit:C,ListCollectionViewEdit:h,PairCollectionViewEdit:E,ListOfPairsCollectionViewEdit:g,ListOfListsCollectionViewEdit:D}});