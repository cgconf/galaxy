define("mvc/workflow/workflow-connector",["exports"],function(t){"use strict";function e(t,e){this.canvas=null,this.dragging=!1,this.inner_color="#FFFFFF",this.outer_color="#D8B365",t&&e&&this.connect(t,e)}Object.defineProperty(t,"__esModule",{value:!0}),$.extend(e.prototype,{connect:function(t,e){this.handle1=t,this.handle1&&this.handle1.connect(this),this.handle2=e,this.handle2&&this.handle2.connect(this)},destroy:function(){this.handle1&&this.handle1.disconnect(this),this.handle2&&this.handle2.disconnect(this),$(this.canvas).remove()},destroyIfInvalid:function(){this.handle1&&this.handle2&&!this.handle2.attachable(this.handle1)&&this.destroy()},redraw:function(){var t=$("#canvas-container");this.canvas||(this.canvas=document.createElement("canvas"),t.append($(this.canvas)),this.dragging&&(this.canvas.style.zIndex="300"));var e=function(e){return $(e).offset().left-t.offset().left},n=function(e){return $(e).offset().top-t.offset().top};if(this.handle1&&this.handle2){var h=e(this.handle1.element)+5,i=n(this.handle1.element)+5,s=e(this.handle2.element)+5,a=n(this.handle2.element)+5,l=Math.min(h,s),o=Math.max(h,s),r=Math.min(i,a),d=Math.max(i,a),c=Math.min(Math.max(Math.abs(d-r)/2,100),300),v=l-100,f=r-100,u=o-l+200,m=d-r+200;this.canvas.style.left=v+"px",this.canvas.style.top=f+"px",this.canvas.setAttribute("width",u),this.canvas.setAttribute("height",m),h-=v,i-=f,s-=v,a-=f;this.canvas.getContext("2d");var p=null,g=null,x=1;if(this.handle1&&this.handle1.isMappedOver()){p=[-6,-3,0,3,6];x=5}else p=[0];if(this.handle2&&this.handle2.isMappedOver()){g=[-6,-3,0,3,6];x=5}else g=[0];for(var y=this,M=0;M<x;M++){var _=5,b=7;(p.length>1||g.length>1)&&(_=1,b=3),y.draw_outlined_curve(h,i,s,a,c,_,b,p[M%p.length],g[M%g.length])}}},draw_outlined_curve:function(t,e,n,h,i,s,a,l,o){var l=l||0,o=o||0,r=this.canvas.getContext("2d");r.lineCap="round",r.strokeStyle=this.outer_color,r.lineWidth=a,r.beginPath(),r.moveTo(t,e+l),r.bezierCurveTo(t+i,e+l,n-i,h+o,n,h+o),r.stroke(),r.strokeStyle=this.inner_color,r.lineWidth=s,r.beginPath(),r.moveTo(t,e+l),r.bezierCurveTo(t+i,e+l,n-i,h+o,n,h+o),r.stroke()}}),t.default=e});