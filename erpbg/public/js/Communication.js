
function communication_make_button_fix() {
    if(chosen_language != "" && chosen_language != "en" &&jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').length) {
        console.log("changing Make to bg for current language: "+chosen_language);
        jQuery('div[data-label="Създаване"]').css('display','none');
        jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').html('Създаване <span class="caret"></span>');
        jQuery('div[data-label="Make"] button[data-toggle="dropdown"]').addClass('btn-primary');
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
            let confirm_msg = "Are you sure you want to create {0} from this email";
            frm.add_custom_button(__("Quotation"), () => {
                frappe.confirm(__(confirm_msg, [__("Quotation")]), () => {
                    frappe.new_doc("Quotation")
                })
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