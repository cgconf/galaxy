define("mvc/tool/tool-form-base",["exports","utils/utils","utils/deferred","mvc/ui/ui-misc","mvc/form/form-view","components/citations.vue","libs/vue"],function(e,t,i,n,o,r,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});a(t);var l=a(i),d=a(n),u=a(o),c=a(r),f=a(s);e.default=u.default.extend({initialize:function(e){var t=this;this.deferred=new l.default,u.default.prototype.initialize.call(this,e),this._update(this.model.get("initialmodel")),this.model.get("listen_to_history")&&parent.Galaxy&&parent.Galaxy.currHistoryPanel&&this.listenTo(parent.Galaxy.currHistoryPanel.collection,"change",function(){t.model.get("onchange")()}),this.$el.on("remove",function(){t._destroy()})},_update:function(e){var t=this;(e=e||this.model.get("buildmodel"))?(this.deferred.reset(),this.deferred.execute(function(i){e(i,t),i.then(function(){t._render()})})):this._render()},_destroy:function(){var e=this;this.$el.off().hide(),this.deferred.execute(function(){u.default.prototype.remove.call(e),Galaxy.emit.debug("tool-form-base::_destroy()","Destroy view.")})},_render:function(){var e=this,t=this.model.attributes;this.model.set({title:t.fixed_title||"<b>"+t.name+"</b> "+t.description+" (Galaxy Version "+t.version+")",operations:!t.hide_operations&&this._operations(),onchange:function(){e.deferred.reset(),e.deferred.execute(function(t){e.model.get("postchange")(t,e)})}}),this.render(),this.model.get("collapsible")||this.$el.append($("<div/>").addClass("ui-margin-top-large").append(this._footer())),this.show_message&&this.message.update({status:"success",message:"Now you are using '"+t.name+"' version "+t.version+", id '"+t.id+"'.",persistent:!1}),this.show_message=!0},_operations:function(){var e=this,t=this.model.attributes,i=new d.default.ButtonMenu({icon:"fa-cubes",title:!t.narrow&&"Versions"||null,tooltip:"Select another tool version"});if(!t.sustain_version&&t.versions&&t.versions.length>1)for(var n in t.versions){var o=t.versions[n];o!=t.version&&i.addMenu({title:"Switch to "+o,version:o,icon:"fa-cube",onclick:function(){e.model.set("id",t.id.replace(t.version,this.version)),e.model.set("version",this.version),e._update()}})}else i.$el.hide();var r=new d.default.ButtonMenu({id:"options",icon:"fa-caret-down",title:!t.narrow&&"Options"||null,tooltip:"View available options"});return t.biostar_url&&(r.addMenu({icon:"fa-question-circle",title:"Question?",onclick:function(){window.open(t.biostar_url+"/p/new/post/")}}),r.addMenu({icon:"fa-search",title:"Search",onclick:function(){window.open(t.biostar_url+"/local/search/page/?q="+t.name)}})),r.addMenu({icon:"fa-share",title:"Share",onclick:function(){prompt("Copy to clipboard: Ctrl+C, Enter",window.location.origin+Galaxy.root+"root?tool_id="+t.id)}}),Galaxy.user&&Galaxy.user.get("is_admin")&&r.addMenu({icon:"fa-download",title:"Download",onclick:function(){window.location.href=Galaxy.root+"api/tools/"+t.id+"/download"}}),t.requirements&&t.requirements.length>0&&r.addMenu({icon:"fa-info-circle",title:"Requirements",onclick:function(){!this.requirements_visible||e.portlet.collapsed?(this.requirements_visible=!0,e.portlet.expand(),e.message.update({persistent:!0,message:e._templateRequirements(t),status:"info"})):(this.requirements_visible=!1,e.message.update({message:""}))}}),t.sharable_url&&r.addMenu({icon:"fa-external-link",title:"See in Tool Shed",onclick:function(){window.open(t.sharable_url)}}),$.getJSON("/api/webhooks/tool-menu/all",function(e){_.each(e,function(e){e.activate&&e.config.function&&r.addMenu({icon:e.config.icon,title:e.config.title,onclick:function(){new Function("options",e.config.function)(t)}})})}),{menu:r,versions:i}},_footer:function(){var e=this.model.attributes,t=$("<div/>").append(this._templateHelp(e));if(e.citations){var i=f.default.extend(c.default),n=document.createElement("div");t.append(n),new i({propsData:{id:e.id,source:"tools"}}).$mount(n)}return t},_templateHelp:function(e){var t=$("<div/>").addClass("ui-form-help").append(e.help);return t.find("a").attr("target","_blank"),t},_templateRequirements:function(e){var t=e.requirements.length;if(t>0){var i="This tool requires ";_.each(e.requirements,function(e,n){i+=e.name+(e.version?" (Version "+e.version+")":"")+(n<t-2?", ":n==t-2?" and ":"")});var n=$("<a/>").attr("target","_blank").attr("href","https://galaxyproject.org/tools/requirements/").text("here");return $("<span/>").append(i+". Click ").append(n).append(" for more information.")}return"No requirements found."}})});