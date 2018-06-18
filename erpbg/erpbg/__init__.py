#!/usr/bin/env python
# -*- coding: utf-8 -*-

import frappe
from werkzeug.wrappers import Response
import sys, traceback



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
            item_name
            if(length(cdescription) > 40,
                concat(substr(cdescription, 1, 40), "..."), cdescription) as cdecription,
            item_code
		from tabItem
		where tabItem.docstatus < 2
			and tabItem.has_variants=0
			and tabItem.disabled=0
			and (tabItem.end_of_life > %(today)s or ifnull(tabItem.end_of_life, '0000-00-00')='0000-00-00')
			and (item_code LIKE %(txt)s
				or item_name LIKE %(txt)s
				or cdescription LIKE %(txt)s)
			{fcond} {mcond}
		order by
			if(locate(%(_txt)s, item_name), locate(%(_txt)s, item_name), 99999),
			idx desc, item_name
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
