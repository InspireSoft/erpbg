#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from werkzeug.wrappers import Response



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    try:
        doc = frappe.db.sql("""SELECT * FROM `tab"""+doctype+"""` WHERE `name`=%s""", (docname), as_dict=True)
        doc = doc[0]
        # meta = frappe.get_meta(doc.doctype)
        # format = get_print_format_doc(None, meta)
        format = "DimelaSalesOrder"

        html = frappe.get_print(doctype=doctype, name=docname, print_format=None, as_pdf=False, doc=doc, output=None, no_letterhead=0)
        return html

        response = Response()
        response.mimetype = 'application/msword'
        response.charset = 'utf-8'
        response.filename = "{name}.doc".format(name=doc.title.replace(" ", "-").replace("/", "-"))
        response.data = html
    except Exception as e:
        return [str(e)]
    return response