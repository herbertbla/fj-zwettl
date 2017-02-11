/*load css depending on the used browser - START --------------------------------------------*/
var cssfile;
// include first the general stylesheet
cssfile = "../html/site-general.css";
var zeile="<link rel='stylesheet' href='"+cssfile+"' type='text/css'>";
document.write(zeile);

// then the specific stylesheet
if (navigator.appName=="Microsoft Internet Explorer")
{
        cssfile="../html/site-ie.css";
} else {
        cssfile="../html/site-ff.css";
}
zeile="<link rel='stylesheet' href='"+cssfile+"' type='text/css'>";
document.write(zeile);
//----------------------------- functions ---------------------------------------------------


// returns, depending on the loaded body the activated menuitem
function getNavID(refStr) {
        var navId = null;
        if (refStr.search("body_home")>=0) {
                navId = "homeNav";
        }
        else {
             if (refStr.search("erdgeschoss")>=0) {
                 navId = "ferienwohungerdgeschossNav";
             }
             else {
                  if (refStr.search("dachgeschoss")>=0) {
                         navId = "ferienwohungdachgeschossNav";
                  }
                  else {
                       if (refStr.search("anreiselage")>=0) {
                          navId = "anreiselageNav";
                       }
                       else {
                            if (refStr.search("body_kontakt")>=0) {
                                 navId = "kontaktNav";
                            }
                            else {
                                 if (refStr.search("body_impressum")>=0) {
                                    navId = "impressumNav";
                                 }
                                 else {
                                      if (refStr.search("body_links")>=0) {
                                         navId = "linksNav";
                                      }
                                      else {
                                          if (refStr.search("body_zweizimmer")>=0) {
                                             navId = "zweizimmerNav";
                                          }
                                     }
                                 }
                            }
                       }
                  }
             }
        }
        return navId;
}


//load css depending on the used browser - END --------------------------------------------

// onload function for body...
function onLoad(o) {

  // alert(o.location.href);
    redirectParent();
    var navId = getNavID(o.location.href);
    resetHeaderColors();
    resetFooterColors();
    setHeaderNavColor(navId);
    setFooterNavColor(navId);
}

// avoids, that just a frame will be loaded
function redirectParent() {
    // redirect, if only one frame was loaded - not the frameset
    if (parent.location.href==location.href) {
                   // it must not be the home.html
                   if (location.href.search("home") > 0) {
                           //if the body is loaded --> redirect it
                           if (location.href.search("body_home") > 0) {
                                   parent.location.href="../home.html";
                           }
                   }
                   else {
                          parent.location.href="../home.html";
                }
        }
}


//color set functions
function setActiveHeaderColor(o)  {
         if (o!=null) o.style.color="#800000"
}
function setInactiveHeaderColor(o)  {
         if (o!=null) o.style.color="#1F1F1F"
}

function setActiveFooterColor(o)  {
         if (o!=null) o.style.color="#800000";
}
function setInactiveFooterColor(o)  {
         if (o!=null) o.style.color="#1F1F1F";
}
// mouse event functions
function mouseInHeader(o) {
         var navId = getNavID(top.frames[4].location.href);
         if (navId != getNavID(o.toString())) setActiveHeaderColor(o);
}
function mouseOutHeader(o) {
         var navId = getNavID(top.frames[4].location.href);
         if (navId != getNavID(o.toString())) setInactiveHeaderColor(o);
}

function mouseInFooter(o) {
         var navId = getNavID(top.frames[4].location.href);
         if (navId != getNavID(o.toString())) setActiveFooterColor(o);
}

function mouseOutFooter(o) {
         var navId = getNavID(top.frames[4].location.href);
         if (navId != getNavID(o.toString())) setInactiveFooterColor(o);
}

// ---------------- end mouse events -------------------------------------------

// set the default header color - inactive
function resetHeaderColors () {
 header=top.frames[3].document;
         nHeaderNav = 5;
         headerNavs = new Array(nHeaderNav);
         if (header != null) {
                headerNavs[0] = header.getElementById('homeNav');
                headerNavs[1] = header.getElementById('ferienwohungerdgeschossNav');
                headerNavs[2] = header.getElementById('ferienwohungdachgeschossNav');
                headerNavs[3] = header.getElementById('zweizimmerNav');
                headerNavs[4] = header.getElementById('anreiselageNav');
                 for (i=0;i<nHeaderNav; i++) {
                        if (headerNavs[i] != null) setInactiveHeaderColor(headerNavs[i]);
                 }
         }

}
// set the active color for the header menu
function setHeaderNavColor (navButton) {
         var header=top.frames[3].document;
         if (navButton == null || header == null) return;

         // first - the header colors
         var actNav = header.getElementById(navButton);
         if (actNav!= null) setActiveHeaderColor(actNav);
}



// set the default color of the footer menu - inactive
function resetFooterColors() {
  // and now the footer colorsheaderNavs
        var footer=top.frames[5].document;
        //alert(footer.toString());
        if (footer == null) return;
        nFooterNav = 3;
        footerNavs = new Array(nFooterNav);
        if (footer != null) {

                footerNavs[0] = footer.getElementById('kontaktNav');
                footerNavs[1] = footer.getElementById('impressumNav');
                footerNavs[2] = footer.getElementById('linksNav');
        }
        for (i=0;i<nFooterNav; i++) {
                  if (footerNavs[i] != null) setInactiveFooterColor(footerNavs[i]);
        }
}


// set the active color for a footer menu item
function setFooterNavColor (navButton) {
        var footer=top.frames[5].document;
        if (navButton == null) return;
        if (footer == null) return;
        actNav = footer.getElementById(navButton);
        if (actNav!= null) setActiveFooterColor(actNav);
}

// picture functions
function mouseIn(inId) {
    setVisible("visible", inId);
}
function mouseOut(inId) {
    setVisible("hidden", inId);
}

function setVisible(inVisible, inId)
{
         inId = inId+"Gross";
         var obj = top.frames[4].document.getElementById(inId);
         //alert(inId);
         if (obj != null) {
            obj.style.visibility=inVisible;
         }
}

function headerResize()
{
         var header=top.frames[3].document;
         //alert(screen.availHeight+" "+top.frames[3].document.height);
         var logo= header.getElementById("logo");
         var menuDistFromLogo=40;
         var offset=30;
         // only clientHeight returns in IE6 the correct height
         // see Javascript reference manual page 306
         var logoTop = top.frames[3].document.body.clientHeight - menuDistFromLogo-offset;
         if (logoTop < 10) {
                 logoTop=10;
                 menuDistFromLogo=top.frames[3].document.body.clientHeight-logoTop-30;
                 if (menuDistFromLogo<20) {
                          menuDistFromLogo=20;
                 }
         }
         //alert(top.frames[3].document.documentElement.clientHeight);
         // only alert(top.frames[3].document.body.clientHeight+" "+top.frames[3].document.height);

         logo.style.top=logoTop;
           //alert(logo);
         var headerTop = logoTop+menuDistFromLogo;
         var menuItem=header.getElementById("homeNav");
         if (menuItem != null) menuItem.style.top=headerTop;
         menuItem=header.getElementById("ferienwohungerdgeschossNav");
         if (menuItem != null) menuItem.style.top=headerTop;
         menuItem=header.getElementById("ferienwohungdachgeschossNav");
         if (menuItem != null) menuItem.style.top=headerTop;
         menuItem=header.getElementById("zweizimmerNav");
         if (menuItem != null) menuItem.style.top=headerTop;
         menuItem=header.getElementById("anreiselageNav");
         if (menuItem != null) menuItem.style.top=headerTop;
}
//!--