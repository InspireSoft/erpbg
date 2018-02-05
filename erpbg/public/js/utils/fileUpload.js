
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



frappe.socketio.socket.on('upload-end', (data) => {
    console.log(data);
    this.reader = null;
    this.file = null;
    if (data.file_url.substr(0, 7)==='/public') {
        data.file_url = data.file_url.substr(7);
    }
    this.callback(data);
});



frappe.ui.form.ControlAttach.prototype.onclick = function() {
    var me = this;
    if(this.doc) {
        var doc = this.doc.parent && frappe.model.get_doc(this.doc.parenttype, this.doc.parent) || this.doc;
        if (doc.__islocal) {
            frappe.msgprint(__("Please save the document before uploading."));
            return;
        }
    }
    if(!this.dialog) {
        this.dialog = new frappe.ui.Dialog({
            title: __(this.df.label || __("Upload")),
            fields: [
                {fieldtype:"HTML", fieldname:"upload_area"},
                {fieldtype:"HTML", fieldname:"or_attach", options: __("Or")},
                {fieldtype:"Select", fieldname:"select", label:__("Select from existing attachments") },
                {fieldtype:"Button", fieldname:"clear",
                    label:__("Clear Attachment"), click: function() {
                        me.clear_attachment();
                        me.dialog.hide();
                    }
                },
                {
                    "fieldtype": "Link" ,
                    "fieldname": "file" ,
                    "label": __("Select uploaded file"),
                    "options": "File",
                    onchange: function() {
                        frappe.call({
                            'method': 'frappe.client.get_value',
                            'args': {
                                'doctype': 'File',
                                'fieldname': ['file_url','file_name','is_private'],
                                'filters': {
                                    'name': me.dialog.get_value("file")
                                }
                            },
                            callback: function(r){
                                if(!r.message) {
                                    me.dialog.$wrapper.find('[name="file_url"]').val("");
                                    return;
                                }
                                me.dialog.$wrapper.find('[name="file_url"]').val(r.message.file_url);
                                me.dialog.$wrapper.find('.private-file input').prop('checked', r.message.is_private);
                                opts.args.filename = r.message.file_name;
                            }
                        });
                    }
                },
            ]
        });
    }

    this.dialog.show();

    this.dialog.get_field("upload_area").$wrapper.empty();
    this.dialog.get_field("file").toggle(true);

    // select from existing attachments
    var attachments = this.frm && this.frm.attachments.get_attachments() || [];
    var select = this.dialog.get_field("select");
    if(attachments.length) {
        attachments = $.map(attachments, function(o) { return o.file_url; });
        select.df.options = [""].concat(attachments);
        select.toggle(true);
        this.dialog.get_field("or_attach").toggle(true);
        select.refresh();
    } else {
        this.dialog.get_field("or_attach").toggle(false);
        select.toggle(false);
    }
    select.$input.val("");

    // show button if attachment exists
    this.dialog.get_field('clear').$wrapper.toggle(this.get_model_value() ? true : false);

    this.set_upload_options();
    frappe.upload.make(this.upload_options);
}