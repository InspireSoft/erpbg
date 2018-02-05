
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

//function replaceBG(str) {
//	var letters = {
//    	"А": "A",
//    	"Б": "B",
//    	"В": "V",
//    	"Г": "G",
//    	"Д": "D",
//    	"E": "Е",
//    	"Ж": "Dz",
//    	"З": "Z",
//    	"И": "I",
//    	"Й": "I",
//    	"К": "K",
//    	"Л": "L",
//    	"М": "M",
//    	"Н": "N",
//    	"О": "O",
//    	"П": "P",
//    	"Р": "R",
//    	"С": "S",
//    	"Т": "T",
//    	"У": "Y",
//    	"Ф": "F",
//    	"Х": "H",
//    	"Ц": "Tc",
//        "Ч": "Ch",
//        "Ш": "Sh",
//        "Щ": "Sht",
//        "Ъ": "U",
//        "Ь": "U",
//        "Ю": "IY",
//        "Я": "Q",
//        " ": "_"
//    };
//    // Looping through
//    for (var key in letters) {
//        str = str.replace(new RegExp(key,  'g'), letters[key]);
//        if(key != " ") {
//            str = str.replace(new RegExp(key.toLowerCase(),  'g'), letters[key].toLowerCase());
//        }
//    };
//
//    return str;
//}

//function myFunction() {
//    var str = "Тест 1.png";
//    var n = str.lastIndexOf(".");
//    var sstr = replaceBG(str.substring(0, n));
//    var estr = str.substring(n);
//    document.getElementById("demo").innerHTML = sstr + estr;
//}


frappe.socketio.SocketIOUploader.prototype.start = function({file=null, is_private=0, filename='', callback=null, on_progress=null,
    chunk_size=24576, fallback=null} = {}) {

    if (this.reader) {
        frappe.throw(__('File Upload in Progress. Please try again in a few moments.'));
    }

    if (!frappe.socketio.socket.connected) {
        if (fallback) {
            fallback();
            return;
        } else {
            frappe.throw(__('Socketio is not connected. Cannot upload'));
        }
    }

    this.reader = new FileReader();
    this.file = file;
    this.chunk_size = chunk_size;
    this.callback = callback;
    this.on_progress = on_progress;
    this.fallback = fallback;
    this.started = false;

    var letters = {
    	"А": "A",
    	"Б": "B",
    	"В": "V",
    	"Г": "G",
    	"Д": "D",
    	"E": "Е",
    	"Ж": "Dz",
    	"З": "Z",
    	"И": "I",
    	"Й": "I",
    	"К": "K",
    	"Л": "L",
    	"М": "M",
    	"Н": "N",
    	"О": "O",
    	"П": "P",
    	"Р": "R",
    	"С": "S",
    	"Т": "T",
    	"У": "Y",
    	"Ф": "F",
    	"Х": "H",
    	"Ц": "Tc",
        "Ч": "Ch",
        "Ш": "Sh",
        "Щ": "Sht",
        "Ъ": "U",
        "Ь": "U",
        "Ю": "IY",
        "Я": "Q",
        " ": "_"
    };
    // Looping through
    for (var key in letters) {
        file.name = file.name.replace(new RegExp(key,  'g'), letters[key]);
        if(key != " ") {
            file.name = file.name.replace(new RegExp(key.toLowerCase(),  'g'), letters[key].toLowerCase());
        }
    };
    replaceBG(file.name);
    filename = file.name;

    this.reader.onload = () => {
        frappe.socketio.socket.emit('upload-accept-slice', {
            is_private: is_private,
            name: filename,
            type: this.file.type,
            size: this.file.size,
            data: this.reader.result
        });
        this.keep_alive();
    };

    var slice = file.slice(0, this.chunk_size);
    this.reader.readAsArrayBuffer(slice);
}



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