#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
import json
from frappe import _



@frappe.whitelist()
def get_doc_from_print(doctype, docname):
    doc = frappe.db.sql("""SELECT * FROM `tab"""+doctype+"""` WHERE `name`=%s""", (docname), as_dict=True)
    doc = doc[0]
    # meta = frappe.get_meta(doc.doctype)
    # format = get_print_format_doc(None, meta)
    format = "DimelaSalesOrder"
    html = frappe.get_print(doctype, docname, format, doc=doc)

    from werkzeug.wrappers import Response
    response = Response()
    response.mimetype = 'application/msword'
    response.charset = 'utf-8'
    response.name = "test.doc"
    response.data = html
    return response



def get_print_format_doc(print_format_name, meta):
	"""Returns print format document"""
	if not print_format_name:
		print_format_name = frappe.form_dict.format \
			or meta.default_print_format or "Standard"

	if print_format_name == "Standard":
		return None
	else:
		try:
			return frappe.get_doc("Print Format", print_format_name)
		except frappe.DoesNotExistError:
			# if old name, return standard!
			return None