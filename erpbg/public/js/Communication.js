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
		}
	},
});