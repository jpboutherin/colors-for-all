colorConvertor={_autor:'aliasDmc',_siteDoc:'http://zonecss.fr/cours_css_javascript/les-couleurs-en-javascript.html',_sRegHsl:/^hsla?\(\s*(\d+),\s*(\d+)%\s*,\s*(\d+)%\s*,?\s*(\d+\.?\d+?)?\s*\)$/i,_sRegHexa:/^#([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})?$/i,_sRegRgb:/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*(\d+\.?\d+?)?\s*\)$/i,_sRegAlphaRgbHsl:/^(rgb|hsl)(?:a)(\(\d+,\s*\d+%?,\s*\d+%?)(?:,\s*\d+\.?\d+?)(\))$/i,_sRegAlphaHexa:/^#(?:[0123456789abcdef]{2})([0123456789abcdef]{6})$/i,_FORMAT_RGB_:'rgb',_FORMAT_HSL_:'hsl',_FORMAT_HEXA_:'#',_findFormat:function(sColor){if(this._sRegHexa.test(sColor)){return this._FORMAT_HEXA_;}else if(this._sRegRgb.test(sColor)){return this._FORMAT_RGB_;}else if(this._sRegHsl.test(sColor)){return this._FORMAT_HSL_;}
return false;},_uniforme:function(sColor){return sColor.replace(/ /g,'');},_format:function(sColor){return sColor.replace(/,/g,', ');},_hasAlpha:function(sStr){return sStr!=undefined&&sStr!='';},toRgb:function(sColor,bSupAlpha){var sColor=this._uniforme(sColor),sType=this._findFormat(sColor),bSupAlpha=bSupAlpha||false;switch(sType){case this._FORMAT_HEXA_:return this._hexaToRgb(sColor,bSupAlpha);case this._FORMAT_HSL_:return this._hslToRgb(sColor,bSupAlpha);case this._FORMAT_RGB_:return this.toAlpha(sColor,bSupAlpha);}
return undefined;},toHexa:function(sColor,bSupAlpha){var sColor=this._uniforme(sColor),sType=this._findFormat(sColor),bSupAlpha=bSupAlpha||false;switch(sType){case this._FORMAT_HEXA_:return this.toAlpha(sColor,bSupAlpha);case this._FORMAT_HSL_:return this._rgbToHexa(this._hslToRgb(sColor,bSupAlpha),bSupAlpha);case this._FORMAT_RGB_:return this._rgbToHexa(sColor,bSupAlpha);}
return undefined;},toHsl:function(sColor,bSupAlpha){var sColor=this._uniforme(sColor),sType=this._findFormat(sColor),bSupAlpha=bSupAlpha||false;switch(sType){case this._FORMAT_HEXA_:return this._rgbToHsl(this._hexaToRgb(sColor,bSupAlpha),bSupAlpha);case this._FORMAT_HSL_:return this.toAlpha(sColor,bSupAlpha);case this._FORMAT_RGB_:return this._rgbToHsl(sColor,bSupAlpha);}
return undefined;},toAlpha:function(sColor,bSupAlpha){bSupAlpha=bSupAlpha||false;if(bSupAlpha==false){return this._format(sColor);}
var sType=this._findFormat(sColor);if(sType==this._FORMAT_HEXA_){if(this._sRegAlphaHexa.test(sColor)==false){return sColor;}else{return sColor.replace(this._sRegAlphaHexa,'#$1');}}else if(sType==this._FORMAT_HSL_||sType==this._FORMAT_RGB_){if(this._sRegAlphaRgbHsl.test(sColor)==false){return this._format(sColor);}else{return this._format(sColor.replace(this._sRegAlphaRgbHsl,'$1$2$3'));}}
return undefined;},_hexaToRgb:function(sColor,bSupAlpha){var aRgb=sColor.match(this._sRegHexa),a=undefined,iDecale=0,bAlpha;if(aRgb!=null&&aRgb.length==5){bAlpha=this._hasAlpha(aRgb[4]);if(bAlpha==true){iDecale=1;a=aRgb[1];}
return (bAlpha==true&&bSupAlpha==false?'a':'')+"["+parseInt(aRgb[1+iDecale],16)+", "+parseInt(aRgb[2+iDecale],16)+", "+parseInt(aRgb[3+iDecale],16)+""+(bAlpha==true&&bSupAlpha==false?', '+(Math.round((parseInt(a,16)/255)*10)/10):'')+"]";}
return undefined;},_rgbToHexa:function(sColor,bSupAlpha){var aHexa=sColor.match(this._sRegRgb),bAlpha;if(aHexa!=null&&aHexa.length==5){bAlpha=this._hasAlpha(aHexa[4]);aHexa[4]=aHexa[4]!=undefined?Math.round(aHexa[4]*255):255;return"#"+(bAlpha==true&&bSupAlpha==false?parseInt(aHexa[4]).toString(16):'')+parseInt(aHexa[1]).toString(16)+""+parseInt(aHexa[2]).toString(16)+""+parseInt(aHexa[3]).toString(16)+"";}
return undefined;},_hueToRgb:function(p,q,h){if(h<0){h+=1;}else if(h>1){h-=1;}
if((h*6)<1){return p+(q-p)*h*6;}
else if((h*2)<1){return q;}
else if((h*3)<2){return p+(q-p)*((2/3)-h)*6;}
else{return p;}},_hslToRgb:function(sColor,bSupAlpha){var h,s,l,a,q,p,tr,tg,tb,bAlpha,aRgb=sColor.match(this._sRegHsl);if(aRgb!=null&&aRgb.length==5){h=parseInt(aRgb[1])/360;s=parseInt(aRgb[2])/100;l=parseInt(aRgb[3])/100;a=aRgb[4]!=undefined?parseInt(aRgb[4])/100:undefined;bAlpha=this._hasAlpha(aRgb[4]);if(s<0){s=0;}
if(l<=0.5){q=l*(1+s);}else{q=l+s-(l*s);}
p=2*l-q;tr=h+(1/3);tg=h;tb=h-(1/3);return (bAlpha==true&&bSupAlpha==false?'a':'')+Math.round(this._hueToRgb(p,q,tr)*255)+", "+Math.round(this._hueToRgb(p,q,tg)*255)+", "+Math.round(this._hueToRgb(p,q,tb)*255)+""+(bAlpha==true&&bSupAlpha==false?', '+(Math.round(aRgb[4]*10)/10):'');}
return undefined;},_rgbToHsl:function(sColor,bSupAlpha){var aHsl=sColor.match(this._sRegRgb);if(aHsl!=null&&aHsl.length==5){var a=aHsl[4]||undefined,r=aHsl[1]/255,g=aHsl[2]/255,b=aHsl[3]/255,bAlpha=this._hasAlpha(aHsl[4]);;var max=Math.max(r,g,b),min=Math.min(r,g,b);var h,s,l=(max+min)/2;if(max==min){h=s=0;}else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}
h/=6;}
return "hsl"+(bAlpha==true&&bSupAlpha==false?'a':'')+"("+Math.round(h*360)+", "+Math.round(s*100)+"%, "+Math.round(l*100)+"%"+(bAlpha==true&&bSupAlpha==false?", "+a:'')+")";
/*ONLY Lightness is returned*/
/*return Math.round((l)*100);*/
}
return undefined;}};

function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    return (luminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
         / (luminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
}
// minimal recommended contrast ratio is 4.5 (from 11px in normal), or 3 for larger font-sizes (above 18px with bold or above 24px in normal)
function generatePalette() {         
  
  var cellWidth = 100/(colors.length+1)+"vw";
  var sizes = [11,19,24];
  var ratio = "";
  var text = "";
  var i;
  var j;
  var s;
  // For each range of sizes
  for (s = 0; s < sizes.length; s++) {
          // We display the size range
          if(s === 0) {
            // If it's the first range, font-weight is normal
            var sizeRange="<span style='white-space: nowrap;'>"+sizes[s]+"&rarr;23 px</span> normal";
          }
          if(s === 1) {
            // If it's the second range, font-weight is bold
            var sizeRange="<span style='white-space: nowrap;'>"+sizes[s]+"&rarr;23 px</span> bold";
          }
          if(s === 2) {
            // If it's the last range, we display only the last size and above, for all font-weights
            var sizeRange="+"+sizes[s]+" px <span style='white-space: nowrap;'>all weights</span>";
      }
      // We build the title
      text += "<h3>"+sizeRange+"</h3>";
      // We build the header
      text += "<table id='table"+s+"' class='sticky-header'><thead><tr><th style='width:"+cellWidth+";background-color:#FFFFFF;'>"+sizeRange+"</th>";
      // We create one column per color 
      for (i = 0; i < colors.length; i++) {
          text += "<th style='width:"+cellWidth+";background-color:"+colors[i]+";'><div class='rotate'>" + colors[i] + "</div></th>";
      }
      // End of thead + start body
      text += "</tr></thead><tbody>";
      // We create one row per color 
      for (i = 0; i < colors.length; i++) {
          text += "<tr id='table"+s+"-row"+i+"'><th style='width:"+cellWidth+";background-color:"+colors[i]+"'>" + colors[i] + "</th>";
          // We create all cells combining foreground/background colors
          for (j = 0; j < colors.length; j++) {
              var LtextColor = convertToArray(colorConvertor.toRgb(colors[i]));
              var LbackgroundColor = convertToArray(colorConvertor.toRgb(colors[j]));
              var ratio=calculateRatio(contrast(LtextColor, LbackgroundColor));
              var strRatio=displayRatio(ratio);
              var strLevel=displayWCAGLevel(sizes[s],ratio);
              var compliance="Not compliant, ratio "+strRatio+" is too weak at this size";
              if(strLevel === "<span class='tagOK'>AA<span class='ratio'>"+ratio+"</span></span>"){
                compliance="Compliant AA";
              }
              if(strLevel === "<span class='tagOK'>AAA<span class='ratio'>"+ratio+"</span></span>"){
                compliance="Compliant AAA";
              }
              text += "<td aria-label='"+compliance+"' title='"+strRatio+"' style='width:"+cellWidth+";background-color:"+colors[i]+";color:"+colors[j]+";'>"+strLevel+"</td>";
          }
          // End of row
          text += "</tr>";  
      }
      // End of table (one range)
      text += "</tbody></table>";
  }
  document.getElementById("palette").innerHTML = text;
}
function convertToArray(color){
    color=color.slice(1,-1);
    return color.split(", ").map(Number);
 }
 function calculateRatio(contrast){
    var ratio=1/contrast;
    if (ratio<1){
        ratio=1/ratio;
    }
    ratio=ratio.toFixed(2);
    return ratio;
 }
 function displayRatio(ratio){
    return ratio+":1";
 }
 function displayWCAGLevel(size,ratio){
    var level="<span class='tagKO'>&#xd7;<span class='ratio'>"+ratio+"</span></span>";
    if (size>=11){
        if (ratio>=4.5){
           if (ratio>=7){
            level="AAA";
           } else{
            level="AA";
           }
           level="<span class='tagOK'>"+level+"<span class='ratio'>"+ratio+"</span></span>";
        }
    }
    if (size>=18){
        if (ratio>=3){
           if (ratio>=4.5){
            level="AAA";
           } else{
            level="AA";
           }
           level="<span class='tagOK'>"+level+"<span class='ratio'>"+ratio+"</span></span>";
        }
    }
    if (size>=24){
        if (ratio>=3){
           if (ratio>=4.5){
            level="AAA";
           } else{
            level="AA";
           }
           level="<span class='tagOK'>"+level+"<span class='ratio'>"+ratio+"</span></span>";
        }
    }   
    return level;
 }