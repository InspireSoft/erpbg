#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import json
from frappe import _



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    doc = frappe.db.sql("""SELECT * FROM `tab"""+doctype+"""` WHERE `name`=%s""", (docname), as_dict=True)
    doc = doc[0]
    meta = frappe.get_meta(doc.doctype)
    format = meta.default_print_format
    html = frappe.get_print(doctype, docname, format, doc=doc)

    from werkzeug.wrappers import Response
    response = Response()
    response.mimetype = 'application/msword'
    response.charset = 'utf-8'
    response.name = "test.doc"
    response.data = html
    return response