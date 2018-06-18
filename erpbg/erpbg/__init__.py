#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from werkzeug.wrappers import Response
import sys, traceback



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    try:
        doc = frappe.db.sql("""SELECT * FROM `tabSales Order` WHERE `name`=%s""", ("SO-00012"), as_dict=True)
        doc = doc[0]
        # meta = frappe.get_meta(doc.doctype)
        # format = get_print_format_doc(None, meta)
        format = "DimelaSalesOrder"

        html = frappe.get_print(doctype=doc.doctype, name=doc.name, doc=doc)
        return doc.doctype

        response = Response()
        response.mimetype = 'application/msword'
        response.charset = 'utf-8'
        response.filename = "{name}.doc".format(name=doc.title.replace(" ", "-").replace("/", "-"))
        response.data = html
    except Exception as e:
        return traceback.format_exc().splitlines()
    return response