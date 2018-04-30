
function imageEditor(attachment) {
//    if(!attachment.x_end) {
//        // no data set (first time loading)
//        jQuery('div[data-fieldname="imageeditor"]').html(getCssImageEditor(attachment)+"<img id='imgjqueryeditor' src='"+attachment.attachment+"' alt='' />");
//        attachment.y_end = jQuery('img#imgjqueryeditor').height();
//        attachment.x_end = jQuery('img#imgjqueryeditor').width();
//        attachment.y_start = 0;
//        attachment.x_start = 0;
//        attachment.height = attachment.y_end;
//    } else {
//        // on data change
//        jQuery('div[data-fieldname="imageeditor"]').html(getCssImageEditor(attachment)+"<img id='imgjqueryeditor' src='"+attachment.attachment+"' alt='' />");
//    }
}
//
//function getCssImageEditor() {
//    return "<style>"+
//            "" +
//           "</style>;
//}
//
//
//frappe.ui.form.on("Quotation Attachment", "y_start", function (frm, cdt, cdn) {
//    imageEditor(frm[cdt][cdn]);
//}
//frappe.ui.form.on("Quotation Attachment", "x_start", function (frm, cdt, cdn) {
//    imageEditor(frm[cdt][cdn]);
//}
//frappe.ui.form.on("Quotation Attachment", "y_end", function (frm, cdt, cdn) {
//    imageEditor(frm[cdt][cdn]);
//}
frappe.ui.form.on("Quotation Attachment", "attachment", function (frm, cdt, cdn) {
    frm[cdt][cdn].filename = frm[cdt][cdn].attachment.replace(/^.*[\\\/]/, '');
}