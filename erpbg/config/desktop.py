# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "ERPBG",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": _("ERPBG")
		},
		{
			"module_name": "Accounts",
			"color": "#009248",
			"icon": "octicon octicon-mortar-board",
			"type": "page",
			"link": "List/Sales Invoice",
			"label": _("Sales Invoice")
		},
		{
			"module_name": "Selling",
			"color": "#DE2B37",
			"icon": "octicon octicon-mortar-board",
			"type": "page",
			"link": "List/Quotation",
			"label": _("Quotation")
		}
	]
