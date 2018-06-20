#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from werkzeug.wrappers import Response
import sys, traceback
from frappe.desk.reportview import get_match_cond, get_filters_cond
from frappe.utils import nowdate


@frappe.whitelist()
def get_item_image(item_code):
    item = frappe.db.sql("""SELECT `image` FROM `tabItem` WHERE `item_code`=%s""", (item_code), as_dict=True)
    if len(item) > 1:
        item = item[0]
    return item


@frappe.whitelist()
def add_attachment_from_item(doctype, docname, item_code):
    item_file_url = frappe.db.sql("""SELECT `image` FROM `tabItem` WHERE `item_code`=%s""", (item_code), as_dict=True)
    if len(item_file_url) <= 0:
        return False
    item_file_url = item_file_url[0].image

    existing_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`=%s AND `file_url`=%s AND `attached_to_name`=%s""", (doctype, item_file_url, docname), as_dict=True)
    if len(existing_attachments) > 0:
        return "None"

    file = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `file_url`=%s""", (item_file_url), as_dict=True)
    if len(file) <= 0:
        return "None"
    file = file[0]

    attachment = frappe.new_doc("File")
    attachment.update(file)
    attachment.name = None
    attachment.attached_to_name = docname
    attachment.attached_to_doctype = doctype
    attachment.save(ignore_permissions=True)
    frappe.db.commit()

    return attachment


@frappe.whitelist()
def copy_attachments_from_doc(from_doctype, from_docname, to_doctype, to_docname):
    from_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`=%s AND `attached_to_name`=%s""", (from_doctype, from_docname), as_dict=True)
    if len(from_attachments) <= 0:
        return "None"

    to_attachments = frappe.db.sql("""SELECT * FROM `tabFile` WHERE `attached_to_doctype`=%s AND `attached_to_name`=%s""", (to_doctype, to_docname), as_dict=True)
    new_attachments = []
    if len(to_attachments)>0:
        for from_attachment in from_attachments:
            is_new = True
            for to_attachment in to_attachments:
                if from_attachment.file_url == to_attachment.file_url:
                    is_new = False
            if is_new:
                attachment = frappe.new_doc("File")
                attachment.update(from_attachment)
                attachment.name = None
                attachment.attached_to_name = to_docname
                attachment.attached_to_doctype = to_doctype
                attachment.save(ignore_permissions=True)
                new_attachments.append(attachment)
                frappe.db.commit()
    else:
        for from_attachment in from_attachments:
            attachment = frappe.new_doc("File")
            attachment.update(from_attachment)
            attachment.name = None
            attachment.attached_to_name = to_docname
            attachment.attached_to_doctype = to_doctype
            attachment.save(ignore_permissions=True)
            new_attachments.append(attachment)
            frappe.db.commit()
    return new_attachments

@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    # http://sys.dimeladesign.com:8003/?cmd=erpbg.erpbg.get_doc_from_print&docname=SO-00012&doctype=Sales%20Order
    try:
        doc = frappe.get_doc(doctype, docname)
        html = frappe.get_print(doctype=doc.doctype, name=doc.name, doc=doc)

        frappe.local.response.filename = "{name}.doc".format(name=docname.replace(" ", "-").replace("/", "-"))
        frappe.local.response.filecontent = html
        frappe.local.response.type = "download"
    except Exception as e:
        return traceback.format_exc().splitlines()

@frappe.whitelist()
def item_query(doctype, txt, searchfield, start, page_length, filters, as_dict=False):
	conditions = []
	return frappe.db.sql("""select
            item_code,
            item_name,
            type,
            if(length(cdescription) > 40,
                concat(substr(cdescription, 1, 40), "..."), cdescription) as cdecription
		from `tabItem`
		where docstatus < 2
			and has_variants=0
			and disabled=0
			and (end_of_life > %(today)s or ifnull(end_of_life, '0000-00-00')='0000-00-00')
			and (item_code LIKE %(txt)s
			    or type LIKE %(txt)s
				or item_name LIKE %(txt)s
				or cdescription LIKE %(txt)s)
			{fcond} {mcond}
		order by item_name
		limit %(start)s, %(page_len)s """.format(key=searchfield,
			fcond=get_filters_cond(doctype, filters, conditions).replace('%', '%%'),
			mcond=get_match_cond(doctype).replace('%', '%%')),
			{
				"today": nowdate(),
				"txt": "%%%s%%" % txt,
				"_txt": txt.replace("%", ""),
				"start": int(start),
				"page_len": int(page_length)
			}, as_dict=as_dict)
