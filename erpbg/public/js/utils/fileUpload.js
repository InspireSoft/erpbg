
//frappe.socketio.SocketIOUploader.prototype.keep_alive = function() {
//    if (this.next_check) {
//        clearTimeout (this.next_check);
//    }
//    this.next_check = setTimeout (() => {
//        if (!this.started) {
//            // upload never started, so try fallback
//            if (this.fallback) {
//                this.fallback();
//            } else {
//                this.disconnect();
//            }
//        }
//        this.disconnect(false);
//    }, 3000);
//}