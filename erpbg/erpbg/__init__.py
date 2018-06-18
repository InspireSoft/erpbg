#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from frappe.website.render import build_page
from werkzeug.wrappers import Response



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    doc = frappe.db.sql("""SELECT * FROM `tab"""+doctype+"""` WHERE `name`=%s""", (docname), as_dict=True)
    doc = doc[0]
    # meta = frappe.get_meta(doc.doctype)
    # format = get_print_format_doc(None, meta)
    format = "DimelaSalesOrder"

    frappe.local.form_dict.doctype = doctype
    frappe.local.form_dict.name = docname
    frappe.local.form_dict.format = format
    frappe.local.form_dict.style = None
    frappe.local.form_dict.doc = doc
    frappe.local.form_dict.no_letterhead = 0

    html = frappe.build_page("printview")
    return html

    response = Response()
    response.mimetype = 'application/msword'
    response.charset = 'utf-8'
    response.filename = "{name}.doc".format(name=doc.title.replace(" ", "-").replace("/", "-"))
    response.data = html
    return response