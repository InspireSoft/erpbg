
function communication_make_button_fix() {
    if(chosen_language != "" && chosen_language != "en" &&jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').length) {
        setTimeout(function(){
            jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').html('Създаване <span class="caret"></span>');
            jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').addClass('btn-primary');
            jQuery('div[data-label="Създаване"]').css("display","none");
        }, 100);
    }
}

var chosen_language = "";
function get_chosen_language(user, callback) {
    frappe.call({
        method: "erpbg.erpbg.user.get_user_lang",
        args: { "user": frappe.session.user },
        callback: function (r) {
            if (r.message !== undefined) {
                chosen_language = r.message;
                communication_make_button_fix();
            }
        }
    });
}

frappe.ui.form.on("Communication", {
	refresh: (frm) => {
		// setup custom Make button only if Communication is Email
		if(frm.doc.communication_medium == "Email" && frm.doc.sent_or_received == "Received") {
            frm.add_custom_button(__("Quotation"), () => {
                frappe.new_doc("Quotation")
            }, "Make");
            frm.add_custom_button(__("Quick Quotation"), () => {
                quick_quotation(frm);
            }, "Make");
            communication_make_button_fix();
		}
	},
});

frappe.ui.form.on("Communication", "onload_post_render", function (frm, cdt, cdn) {
    if(chosen_language == "") {
        get_chosen_language(user);
    } else {
        communication_make_button_fix();
    }
});


function quick_quotation(frm) {
    var dialog = new frappe.ui.Dialog({
        title: __('Fill in data for Quick Quotation'),
        fields: [
            {label: "Client", fieldtype:'Data', fieldname: 'cilent', description: __('Name of new client'), "default": frm.doc.sender_full_name, reqd: 1},
            {label: "Contact", fieldtype:'Data', fieldname: 'contact', description: __('Name of contact for client'), "default": frm.doc.sender_full_name, reqd: 1},
            {label: "E-mail", fieldtype:'Data', fieldname: 'contact_email', description: __('E-mail of contact for client'), "default": frm.doc.sender },
        ],
        primary_action: function() {
            var data = dialog.get_values();
            frappe.call({
                method: 'erpbg.erpbg.quotation.make_quick_quotation',
                args: {
                    customer_name: data.cilent,
                    contact_name: data.contact,
                    email: data.contact_email,
                    communication: frm.doc.name
                },
                freeze: true,
                callback: function(r) {
                    console.log("response in dialog");
                    console.log(r);
                    if(typeof r.message != typeof "") {
                        frappe.msgprint({
                            message: __('Documents Created:<br/><br/> {0}',
                                [
                                    __("Quotation: ") + repl('<b><a href="#Form/Quotation/%(name)s">%(name)s</a></b>', {name:r.message[0]}) + "<br/>" +
                                    __("Client: ") +    repl('<b><a href="#Form/Client/%(name)s">%(name)s</a></b>',    {name:r.message[1]}) + "<br/>" +
                                    __("Contact: ") +   repl('<b><a href="#Form/Contact/%(name)s">%(name)s</a></b>',   {name:r.message[2]})
                                ]),
                            indicator: 'green'
                        })
                    } else {
                        frappe.msgprint({
                            message: __('Error while creating quick quotation:<br/><br/> {0}',
                            [r.message]),
                            indicator: 'red'
                        })
                    }
                    dialog.hide();
                }
            });
        },
        primary_action_label: __('Make')
    });
    dialog.show();
}