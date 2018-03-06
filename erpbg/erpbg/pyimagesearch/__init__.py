import cv2

pyimagesearch["dataset1"] = "/home/frappe/frappe-bench-dimela/sites/dimela/public/files"
pyimagesearch["dataset2"] = "/home/frappe/frappe-bench-dimela/sites/dimela/private/files"
pyimagesearch["index"] = "/home/frappe/frappe-bench-dimela/sites/dimela/private/files"
pyimagesearch["result_path"] = "/home/frappe/frappe-bench-dimela/sites/dimela/private/files"

@frappe.whitelist()
def update_dataset():
    # USAGE
    # python index.py --dataset dataset --index index.csv

    # import the necessary packages
    import glob

    # initialize the color descriptor
    cd = ColorDescriptor((8, 12, 3))

    # open the output index file for writing
    output = open(pyimagesearch["index"], "w")

    # use glob to grab the image paths and loop over them
    for imagePath in glob.glob(pyimagesearch["dataset1"] + "/*.png"):
        # extract the image ID (i.e. the unique filename) from the image
        # path and load the image itself
        imageID = imagePath[imagePath.rfind("/") + 1:]
    # use glob to grab the image paths and loop over them
    for imagePath in glob.glob(pyimagesearch["dataset2"] + "/*.png"):
        # extract the image ID (i.e. the unique filename) from the image
        # path and load the image itself
        imageID = imagePath[imagePath.rfind("/") + 1:]
    for imagePath in glob.glob(pyimagesearch["dataset1"] + "/*.jpg"):
        # extract the image ID (i.e. the unique filename) from the image
        # path and load the image itself
        imageID = imagePath[imagePath.rfind("/") + 1:]
    for imagePath in glob.glob(pyimagesearch["dataset2"] + "/*.jpg"):
        # extract the image ID (i.e. the unique filename) from the image
        # path and load the image itself
        imageID = imagePath[imagePath.rfind("/") + 1:]
    image = cv2.imread(imagePath)

    # describe the image
    features = cd.describe(image)

    # write the features to file
    features = [str(f) for f in features]
    output.write("%s,%s\n" % (imageID, ",".join(features)))

    # close the index file
    output.close()


@frappe.whitelist()
def search_dataset(doctype, docname, attached_imgname):
    # initialize the image descriptor
    cd = ColorDescriptor((8, 12, 3))

    # load the query image and describe it
    query = cv2.imread(attached_imgname)
    features = cd.describe(query)

    # perform the search
    searcher = Searcher(pyimagesearch["index"])
    results = searcher.search(features)

    finalResults = []

    # loop over the results
    for (score, resultID) in results:
        # TODO: build result page from example code bellow
        finalResults.append(resultID)
        #    # load the result image and display it
        # result = cv2.imread(pyimagesearch["result_path"] + "/" + resultID)
        # cv2.imshow("Result", result)
    return '<br/>'.join(finalResults)


@frappe.whitelist()
def search_test_dataset():
    # initialize the image descriptor
    cd = ColorDescriptor((8, 12, 3))

    # load the query image and describe it
    query = cv2.imread("http://sys.dimeladesign.com:8003/private/files/Adv.%20dogovor%20.jpg")
    features = cd.describe(query)

    # perform the search
    searcher = Searcher(pyimagesearch["index"])
    results = searcher.search(features)

    finalResults = []

    # loop over the results
    for (score, resultID) in results:
        # TODO: build result page from example code bellow
        finalResults.append("private/files/"+resultID)
        #    # load the result image and display it
        # result = cv2.imread(pyimagesearch["result_path"] + "/" + resultID)
        # cv2.imshow("Result", result)
    return '<br/>'.join(finalResults)
