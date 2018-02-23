## ERPBG

Custom app for Bulgaria

#### License

MIT


Hack fix for Items Image List js bug

pico apps/frappe/frappe/public/js/lib/photoswipe/photoswipe.js

Change (about line 433):

listeners[i].apply(self, args);

To:

if(typeof listeners[i] == "function") {
        listeners[i].apply(self, args);
}