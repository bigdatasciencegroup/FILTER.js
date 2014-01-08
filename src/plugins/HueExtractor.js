/**
*
* Hue Extractor Plugin
* @package FILTER.js
*
**/
(function(FILTER){

    var notSupportClamp=FILTER._notSupportClamp,
        IMG=FILTER.ImArray, clamp=FILTER.Color.clampPixel,
        RGB2HSV=FILTER.Color.RGB2HSV, HSV2RGB=FILTER.Color.HSV2RGB, Color2RGBA=FILTER.Color.Color2RGBA
        ;
    
    // a plugin to extract regions based on a HUE range
    FILTER.HueExtractorFilter = FILTER.Create({
        
        // filter parameters
        range : null,
        background : 0,
        
        name : "HueExtractorFilter",
        
        // constructor
        init : function(range, background) {
            this.range=range;
            this.background=background||0;
        },
        
        
        // this is the filter actual apply method routine
        apply: function(im, w, h/*, image*/) {
            // im is a copy of the image data as an image array
            // w is image width, h is image height
            // image is the original image instance reference, generally not needed
            // for this filter, no need to clone the image data, operate in-place
            
            if (!this.range || !this.range.length) return im;
            
            var r, g, b, br, bg, bb, ba,
                i, l=im.length, background, hue,
                hMin=this.range[0], hMax=this.range[this.range.length-1]
                ;
            
            background = Color2RGBA(this.background||0);
            br = ~~clamp(background.r); 
            bg = ~~clamp(background.g); 
            bb = ~~clamp(background.b); 
            ba = ~~clamp(background.a);
            
            for (i=0; i<l; i+=4)
            {
                r = im[i]; g = im[i+1]; b = im[i+2];
                hue = RGB2HSV({r:r, g:g, b:b}).h;
                
                if (hue<hMin || hue>hMax) 
                {  
                    im[i] = br; im[i+1] = bg; im[i+2] = bb; im[i+3] = ba; 
                }
            }
            
            // return the new image data
            return im;
        }
    });
    
})(FILTER);